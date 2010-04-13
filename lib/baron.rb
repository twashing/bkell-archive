

module Baron
	class AppFrame
	end

	class InboundConfig
	end

	class OutboundConfig
	end

	class ContentItem
	end

	module Feed
		class NewFileSource
			def initialize(path)
				@basepath = path
				@returnitems = Array.new
				@thistime = Time.now			# we may record current time vs high mark for runs
				@lasttime = Time.at(@thistime.to_i() - 84600)	# XXX: fudged for the moment
				@highseentime = Time.at(0)
				self.crawlForNew(@basepath)
			end
			def crawlForNew(adir)
				Dir.foreach(adir) { |x|
					next if x == '.' || x == '..'
					thisfname = "#{adir}/#{x}"
					if File.directory?(thisfname)
						self.crawlForNew(thisfname)
					else
						if File.mtime(thisfname) > @highseentime
							@highseentime = File.mtime(thisfname)
						end
						if File.mtime(thisfname) > @lasttime
							@returnitems << thisfname
						end
					end
				}
			end
			def filelist
				@returnitems
			end
		end
	end
end

