# Abstract implementation of feed source. Should provide a common
# interface for:
#   - initializing a source from a common configuration form
#   - stateful execution to fetch incrementally
#   - an interable/enumerable interface on found items
#   - a common mechanism/determination of success and resulting
#     committment to new state
#   - factory for dynamic instantiation from parameter data

require 'enumerator'
require 'yaml'
require 'baron'
require 'baron/content/rawitem'

module Baron
	module InboundFeed
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
	end
end

