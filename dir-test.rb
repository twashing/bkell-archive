
thisdir = '/Users/joe.hohertz/baron-bits/sim-teamsite/680news_com'

$returnitems = Array.new
$thistime = Time.now
$lasttime = Time.at(Time.now.to_i() - 84600)
$highseentime = Time.at(0)

def crawlForNew(adir)
	Dir.foreach(adir) { |x|
		next if x == '.' || x == '..'
		thisfname = "#{adir}/#{x}"
#		puts "Got #{thisfname}"
		if File.directory?(thisfname)
			crawlForNew(thisfname)
		else
			if File.mtime(thisfname) > $highseentime
				$highseentime = File.mtime(thisfname)
			end
			if File.mtime(thisfname) > $lasttime
				$returnitems << thisfname
			end
		end
	}
end

crawlForNew(thisdir)

p $thistime
p $highseentime
p $lasttime
p $returnitems


