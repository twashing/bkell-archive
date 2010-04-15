
require 'enumerator'
require 'yaml'

module Baron
	BARON_BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))

	# Not sure if we'll use this, but it's not uncommon to need a singleton-like
	# class to implement the sort of "global" details, and self-instrumentation
	# for an application. It manages, and ultimately contains the entire runtime
	# TODO: going to let the needs emerge, and not force anything in here.
	class AppFrame
	end

	# This class represents the runtime configuration of an inbound pipeline
	class InboundConfig
	end

	# This is a class representing the runtime configuation of an output pipeline
	# TODO: This is not an immediate concern at present
	class OutboundConfig
	end

	# This is to be a representation of the native Baron content record, matching
	# the representation details to be stuffed into CouchDB
	class ContentItem
	end

	# This class represents a "raw" representation of the native content object
	# The VERY first goal of an input item is to transcribe enough of the detail
	# into a property map, that while the properties themselves are specific
	# to an implementation of AbstractSource, are accessible to common paths
	# later in the pipeline
	class RawContentItem
	end

	module InboundFeed
		# module level method to load a feed by configuration file name
		def self.load_feed(configName)
			configFileName = Baron::BARON_BASE + "/etc/infeeds/#{configName}.yaml"
			raise "Unknown configuration #{configName}" if ! File.exists? configFileName
			sourceConfig = YAML.load_file(configFileName)
			inboundSourceType = sourceConfig['sourceAdapter']
			#sourceConfig = cfg[inboundSourceType]
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
			def initialize(sourceConfig)
				@config = sourceConfig
				@type = sourceConfig['sourceAdapter']
				@name = sourceConfig['sourceName']
				@localconfig = sourceConfig[@type]
				@stateFile = Baron::BARON_BASE + "/var/state/infeed/#{@name}.state"
				self.load_state
				@state['startTime'] = Time.now
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

		end

		class TeamsiteDcrFileSource < AbstractInputSource
			include Enumerable
			def initialize(sourceConfig)
				super
				filefinder = Baron::Util::NewFileFinder.new(@localconfig['basedir'], @state['cursorTime'])
				@filelist = filefinder.filelist
				@state['highestTime'] = filefinder.highest_time
			end
			def load_state
				super
				if ! @state['highestTime'] 
					@state['highestTime'] = Time.at(0)
				end
				if ! @state['cursorTime'] 
					@state['cursorTime'] = Time.at(0)
					#@state['cursorTime'] = Time.at(Time.now.to_i() - 84600)
					# XXX: above fudged for the moment should be zero time
					## done this way until state saving works to prevent the whole set coming in
				end
			end
			def each
				@filelist.each { |x| yield x }
			end
			def commit_state
				@state['cursorTime'] = @state['highestTime'] 
				self.save_state
			end
			
			def filelist
				@filelist
			end
		end
	end

	module Util
		class NewFileFinder
			def initialize(basepath, fromtime)
				@basepath = basepath 
				@fromtime = fromtime
				@returnitems = Array.new
				@highesttime = Time.at(0)
				self.crawlForNew(@basepath)
			end
			def crawlForNew(adir)
				Dir.foreach(adir) { |x|
					next if x == '.' || x == '..'
					thisfname = "#{adir}/#{x}"
					if File.directory?(thisfname)
						self.crawlForNew(thisfname)
					else
						if File.mtime(thisfname) > @highesttime
							@highesttime = File.mtime(thisfname)
						end
						if File.mtime(thisfname) > @fromtime
							@returnitems << thisfname
						end
					end
				}
			end
			def filelist
				@returnitems
			end
			def highest_time
				@highesttime
			end
		end
	end
end

