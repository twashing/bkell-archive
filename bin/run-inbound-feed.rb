
# prototype inbound feed runner
# everything subject to change.

$BARON_BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
$LOAD_PATH.unshift($BARON_BASE + '/lib')

require 'pp'
require 'yaml'
require 'Baron'

configName = ARGV[0]
raise "Must specify configuration to run" if configName == nil || configName == ""

configFileName = $BARON_BASE + "/etc/infeeds/#{configName}.yaml"
raise "Unknown configuration #{configName}" if ! File.exists? configFileName

cfg = YAML.load_file(configFileName)

inboundSourceType = cfg['sourceAdapter']
sourceConfig = cfg[inboundSourceType]
pp sourceConfig

myiter = Baron::InboundFeed::factory(inboundSourceType, sourceConfig)

#myiter.each_with_index { |x,n| puts "#{n}: #{x}" }

myiter.collect { |x| "PREFIX: " + x } \
      .each_with_index { |x,n| puts "#{n}: #{x}" }


__END__


