
require 'rexml/document'
require 'baron/infeeds/abstractfileinputsource'

module Baron
	module InboundFeed
		class TeamsiteDcrFileSource < AbstractFileInputSource
			def load_raw_item(resource)
				item = self.new_raw_item
				doc = REXML::Document.new(resource)
				@localconfig['xpathMappings'].each do |key,xpath| 
					ele = doc.root.elements[xpath]
					if ele != nil
						item[key] = ele.text
					end
				end
				item
			end
		end
	end
end

