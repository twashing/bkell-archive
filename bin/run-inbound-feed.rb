
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
pp configFileName
raise "Unknown configuration #{configName}" if ! File.exists? configFileName

cfg = YAML.load_file(configFileName)
pp cfg

inboundSourceType = cfg['sourceAdapter']
sourceConfig = cfg[inboundSourceType]
pp inboundSourceType
pp sourceConfig

myiter = Baron::InboundFeed::factory(inboundSourceType, sourceConfig)
pp myiter.filelist

__END__

thisdir = cfg['teamsiteDcrFiles']['basedir']
pp thisdir

myiter = Baron::InboundFeed::NewFileSource.new(thisdir)
pp myiter.filelist

