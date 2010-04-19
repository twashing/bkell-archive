
# class to implement the sort of "global" details, and self-instrumentation
# for an application. It manages, and ultimately contains the entire runtime

require 'baron/app/frame'
require 'baron/content/transformer'
require 'baron/infeeds.rb'

module Baron
module App

	# for an application. It manages, and ultimately contains the entire runtime
	# TODO: going to let the needs emerge, and not force anything in here.
	class InboundFeed < Frame
		def initialize(appConfig, *args)
			@name = 'infeeds'	# used for prefixes in var/log/etc
			super
		end
		def main
			configName = @args[0]
			raise "must specify configuration to run" if configName == nil || configName == ""
			myiter = Baron::InboundFeed.load_feed(configName)
			transformer = Baron::Content::Transformer.new(myiter.config['transformRules'])

			# XXX: this is very nasty and prototype-y still...
			myiter.each_with_index do |x,n|
        			puts "--- #{n} RAW: "
        			pp x
        			puts "--- #{n} NATIVE: "
        			transformer.run_rules_on(x)
        			pp transformer.item
			end
			myiter.commit_state

		end
	end

end	# module Baron::App
end	# module Baron

