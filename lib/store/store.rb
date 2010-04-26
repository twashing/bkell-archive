require 'rubygems'
require 'active_support'
include Couch

Module Store
	
	class Store 
		
		## 
		# 1. get working directory from config file 
		# 2. get DB location from config file 
		# 3. specify type(s) to store: DCR, RSS, NewsML, all
		def execute(type) 
			
			raw_feed = File.read('feed.xml')
			server = Server.new("localhost", "5984")
			server.put("/cash/flare123", Hash.from_xml(raw_feed).to_json)
		end
	end
end
