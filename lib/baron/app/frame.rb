
# class to implement the sort of "global" details, and self-instrumentation
# for an application. It manages, and ultimately contains the entire runtime

require 'baron'
require 'pp'

module Baron
module App

	# for an application. It manages, and ultimately contains the entire runtime
	# TODO: going to let the needs emerge, and not force anything in here.
	class Frame
		def initialize(config, *args)
			# NOTE: It's expected the implementors will have set @name
			raise "implementation must set @name before calling super" if ! @name
			@config = config
			@args = args
			@logfile = Baron::BASE + "/var/log/#{@name}.log"
			file = File.open(@logfile, File::WRONLY | File::APPEND | File::CREAT)
			@logger = Logger.new(file)
			# XXX still pondering how to effect a 'global' logger...
			#Baron::log = @logger
		end
		def run
			self.main
			self.shutdown
		end
		def main
			raise "application must define it's own main()"
		end
		def shutdown
			#Baron::log = Logger.new(STDERR)
			@logger.close
			@logger = nil
		end
	end

end	# module Baron::App
end	# module Baron

