
require 'baron/infeeds/abstractinputsource'
require 'baron/util/newfilefinder'

module Baron
	module InboundFeed
		class AbstractFileInputSource < AbstractInputSource
			def load_state
				super
				if ! @state['highestTime'] 
					@state['highestTime'] = Time.at(0)
				end
				if ! @state['cursorTime'] 
					@state['cursorTime'] = Time.at(0)
				end
			end
			def commit_state
				@state['cursorTime'] = @state['highestTime'] 
				super
			end
			def discover
				filefinder = Baron::Util::NewFileFinder.new(@localconfig['basedir'], @state['cursorTime'])
				@filelist = filefinder.filelist
				@state['highestTime'] = filefinder.highest_time
			end
			def load_raw_items
				## XXX: this feels like it should be floated up...
				@filelist.each do |x| 
					rawitem = self.load_raw_item(File.new(x))
					rawitem['__sourceFilename'] = x
					@items << rawitem
				end
			end
			def load_raw_item
				## XXX: this feels like it should be floated up...
				raise "concrete implementation must define load_raw_item"
			end
		end
	end
end

