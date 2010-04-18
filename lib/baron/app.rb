
# class to implement the sort of "global" details, and self-instrumentation
# for an application. It manages, and ultimately contains the entire runtime

require 'baron'
require 'baron/app/infeeds.rb'
#require 'baron/app/outfeeds.rb'
require 'yaml'
require 'pp'

module Baron
module App

# module level method to load an app by configuration file name
def self.load_app(configName, *args)
	configFileName = Baron::BASE + "/etc/app/#{configName}.yaml"
	raise "Unknown configuration #{configName}" if ! File.exists? configFileName
	sourceConfig = YAML.load_file(configFileName)
	# return the configuration via the lower-level factory
	Baron::App::factory(configName, sourceConfig, args)
end	

# a factory for instantiating an app by class name with config passing
def self.factory(appClassName, appConfigTree, args)
	case appClassName
	# There is probably a much slicker way to do this in Ruby's metaprogramming
	# can't find it right now. TODO: make this all Rubified...
	when "infeeds"
		InboundFeed.new(appConfigTree, args)
	#when "outfeeds"
	#	OutboundFeed.new(appConfigTree, args)
	else
		raise "Unknown app class #{appClassName}"
	end
end

end	# module Baron::App
end	# module Baron

