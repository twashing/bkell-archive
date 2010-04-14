
$LOAD_PATH.unshift(File.dirname(File.expand_path($PROGRAM_NAME)) + '/lib')
require 'Baron'

thisdir = '/Users/joe.hohertz/baron-bits/sim-teamsite/680news_com'

myiter = Baron::Feed::NewFileSource.new(thisdir)

p myiter.filelist

__END__


