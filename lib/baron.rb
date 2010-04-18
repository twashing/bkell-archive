
require 'enumerator'
require 'logger'
require 'yaml'
require 'rexml/document'
require 'open-uri'
require 'rss'

require 'baron/content/item'
require 'baron/content/rawitem'
require 'baron/content/transformer'
require 'baron/util/newfilefinder'

module Baron
	BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
	log = Logger.new(STDERR)

	module InboundFeed
		# module level method to load a feed by configuration file name
		def self.load_feed(configName)
			configFileName = Baron::BASE + "/etc/infeeds/#{configName}.yaml"
			raise "Unknown configuration #{configName}" if ! File.exists? configFileName
			sourceConfig = YAML.load_file(configFileName)
			inboundSourceType = sourceConfig['sourceAdapter']
			# return the configuration via the lower-level factory
			Baron::InboundFeed::factory(inboundSourceType, sourceConfig)
		end

		# a factory for instantiating a feed by method/config
		def self.factory(sourceClassName, sourceConfigTree)
			case sourceClassName
			# There is probably a much slicker way to do this in Ruby's metaprogramming
			# can't find it right now. TODO: make this all Rubified...
			when "TeamsiteDcrFileSource"
				TeamsiteDcrFileSource.new(sourceConfigTree)
			when "SimpleRssUrlSource"
				SimpleRssUrlSource.new(sourceConfigTree)
			else
				raise "Unknown source class #{sourceClassName}"
			end
		end

		# Abstract implementation of feed source. Should provide a common
		# interface for:
		#   - initializing a source from a common configuration form
		#   - stateful execution to fetch incrementally
		#   - an interable/enumerable interface on found items
		#   - a common mechanism/determination of success and resulting
		#     committment to new state
		#   - factory for dynamic instantiation from parameter data
		class AbstractInputSource
			include Enumerable
			attr_accessor :config, :localconfig, :items
			def initialize(sourceConfig)
				@config = sourceConfig
				@type = sourceConfig['sourceAdapter']
				@name = sourceConfig['sourceName']
				@localconfig = sourceConfig[@type]
				@stateFile = Baron::BASE + "/var/state/infeed/#{@name}.state"
				@items = Array.new
				self.execute
			end
			def each
				@items.each { |x| yield x }
			end
			def load_state
				if File.exists?(@stateFile)
					@state = YAML.load_file(@stateFile)
				else
					@state = Hash.new
				end
			end
			def save_state
				File.open( @stateFile, 'w' ) do |out|
					YAML.dump( @state, out )
				end
			end
			def commit_state
				self.save_state
			end
			def execute
				self.load_state
				@state['startTime'] = Time.now
				#self.setup
				self.discover
				self.load_raw_items
				#self.transform
			end
			def new_raw_item
				item = Baron::Content::RawItem.new
				item['__adapterName'] = @name
				item['__adapterType'] = @type
				item
			end
			def discover
				raise "implementation must define discover"
			end
			def load_raw_items
				raise "implementation must define load_raw_items"
			end

		end

		class AbstractFileInputSource < AbstractInputSource
			def load_state
				super
				if ! @state['highestTime'] 
					@state['highestTime'] = Time.at(0)
				end
				if ! @state['cursorTime'] 
					@state['cursorTime'] = Time.at(0)
				end
			end
			def commit_state
				@state['cursorTime'] = @state['highestTime'] 
				super
			end
			def discover
				filefinder = Baron::Util::NewFileFinder.new(@localconfig['basedir'], @state['cursorTime'])
				@filelist = filefinder.filelist
				@state['highestTime'] = filefinder.highest_time
			end
			def load_raw_items
				@filelist.each do |x| 
					rawitem = self.load_raw_item(File.new(x))
					rawitem['__sourceFilename'] = x
					@items << rawitem
				end
			end
			def load_raw_item
				raise "concrete implementation must define load_raw_item"
			end
		end

		class TeamsiteDcrFileSource < AbstractFileInputSource
			def load_raw_item(resource)
				item = self.new_raw_item
				doc = REXML::Document.new(resource)
				@localconfig['xpathMappings'].each { |key,xpath| 
					ele = doc.root.elements[xpath]
					if ele != nil
						item[key] = ele.text
					end
				}
				item
			end
		end

		class SimpleRssUrlSource < AbstractInputSource
			def discover
				@rssfeeds = Hash.new
				@localconfig['rssUrls'].each { |x| 
					rss_content = ""
					open(x) do |f|
						rss_content = f.read
					end
					rss = RSS::Parser.parse(rss_content, false)
					@rssfeeds[x] = rss
				}
			end
			def load_raw_items
				@rssfeeds.each do |url, rss| 
					rssTitle = rss.channel.title
					rssUrl = rss.channel.link
					rss.items.each do |rssItem|
						item = self.new_raw_item
						item['__rssTitle'] = rssTitle
						item['__rssUrl'] = rssUrl
						@localconfig['rssItemMappings'].each do |key,rssProp| 
							if rssItem.respond_to? "#{rssProp}"
								item[key] = rssItem.send("#{rssProp}").to_s
							else
								raise "unknown rss property method #{rssProp}"
							end
						end
						@items << item
					end
				end
			end
		end
	end

end

