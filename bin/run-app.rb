
# prototype, "app runner".
# everything subject to change.

$BARON_BASE = File.dirname(File.dirname(File.expand_path($PROGRAM_NAME)))
$LOAD_PATH.unshift($BARON_BASE + '/lib')

require 'pp'
require 'baron/app'

appName = ARGV[0]
raise "Must specify application to run" if appName == nil || appName == ""

app = Baron::App.load_app(appName, ARGV[1,ARGV.size])

app.run

__END__


