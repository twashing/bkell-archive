
#require 'enumerator'

module Baron
	module Util
		class NewFileFinder
			def initialize(basepath, fromtime)
				@basepath = basepath 
				@fromtime = fromtime
				@returnitems = Array.new
				@highesttime = Time.at(0)
				self.crawlForNew(@basepath)
			end
			def crawlForNew(adir)
				Dir.foreach(adir) { |x|
					next if x == '.' || x == '..'
					thisfname = "#{adir}/#{x}"
					if File.directory?(thisfname)
						self.crawlForNew(thisfname)
					else
						if File.mtime(thisfname) > @highesttime
							@highesttime = File.mtime(thisfname)
						end
						if File.mtime(thisfname) > @fromtime
							@returnitems << thisfname
						end
					end
				}
			end
			def filelist
				@returnitems
			end
			def highest_time
				@highesttime
			end
		end
	end
end

