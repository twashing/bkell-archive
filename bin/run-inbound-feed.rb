
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
#myiter = Baron::Util::NewFileFinder.new(sourceConfig['basedir'], Time.at(Time.now.to_i - 84600))
pp myiter.filelist

__END__


