
# prototype inbound feed runner
# everything subject to change.

$BARON_BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
$LOAD_PATH.unshift($BARON_BASE + '/lib')

require 'pp'
require 'Baron'

configName = ARGV[0]
raise "Must specify configuration to run" if configName == nil || configName == ""

myiter = Baron::InboundFeed.load_feed(configName)

myiter.each_with_index { |x,n| puts "--- #{n}: " ; pp x }

#myiter.collect { |x| "PREFIX: " + x } \
#      .each_with_index { |x,n| puts "#{n}: #{x}" }

myiter.commit_state

__END__


