
# prototype inbound feed runner
# everything subject to change.

$BARON_BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
$LOAD_PATH.unshift($BARON_BASE + '/lib')

require 'pp'
require 'Baron'

configName = ARGV[0]
raise "Must specify configuration to run" if configName == nil || configName == ""

myiter = Baron::InboundFeed.load_feed(configName)

#myiter.each_with_index { |x,n| puts "--- #{n}: " ; pp x }
myiter.commit_state

transformer = Baron::InboundFeed::Transformer.new(myiter.config['transformRules'])


myiter.each_with_index do |x,n| 
	puts "--- #{n} RAW: "
	pp x
	puts "--- #{n} NATIVE: "
	transformer.run_rules_on(x)
	pp transformer.item
end


__END__


