
require 'open-uri'
require 'rss'

require 'baron/infeeds/abstractinputsource'

module Baron
	module InboundFeed
		class SimpleRssUrlSource < AbstractInputSource
			def discover
				@rssfeeds = Hash.new
				@localconfig['rssUrls'].each { |x| 
					rss_content = ""
					open(x) do |f|
						rss_content = f.read
					end
					rss = RSS::Parser.parse(rss_content, false)
					@rssfeeds[x] = rss
				}
			end
			def load_raw_items
				@rssfeeds.each do |url, rss| 
					rssTitle = rss.channel.title
					rssUrl = rss.channel.link
					rss.items.each do |rssItem|
						item = self.new_raw_item
						item['__rssTitle'] = rssTitle
						item['__rssUrl'] = rssUrl
						@localconfig['rssItemMappings'].each do |key,rssProp| 
							if rssItem.respond_to? "#{rssProp}"
								item[key] = rssItem.send("#{rssProp}").to_s
							else
								raise "unknown rss property method #{rssProp}"
							end
						end
						@items << item
					end
				end
			end
		end
	end

end

