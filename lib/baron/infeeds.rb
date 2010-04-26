
require 'baron/infeeds/teamsitedcrfilesource.rb'
require 'baron/infeeds/simplerssurlsource.rb'

module Baron
	module InboundFeed
		# module level method to load a feed by configuration file name
		def self.load_feed(configName)
			configFileName = Baron::BASE + "/etc/infeeds/#{configName}.yaml"
			raise "Unknown configuration #{configName}" if ! File.exists? configFileName
			sourceConfig = YAML.load_file(configFileName)
			inboundSourceType = sourceConfig['sourceAdapter']
			if inboundSourceType == nil || inboundSourceType == ""
				raise "must specify sourceAdapter in configuration #{configFileName}"
			end
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
				raise "Unknown sourceAdapter class #{sourceClassName}"
			end
		end

	end	# module InboundFeed

end	# module Baron

