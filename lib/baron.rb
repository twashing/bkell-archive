
require 'logger'

module Baron
	BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
	log = Logger.new(STDERR)
end

