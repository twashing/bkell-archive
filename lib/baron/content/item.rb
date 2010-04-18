
#require 'enumerator'
require 'baron'

module Baron
module Content

	# This is to be a representation of the native Baron content record, matching
	# the representation details to be stuffed into CouchDB
	class Item
		attr_accessor :guid, :sourceAltId, :sourceId, :source, :type, :state,
			:createdBy, :lastModifiedBy, 
			:createdAt, :lastModifiedAt, :releaseAt, :expireAt,
			:subjectTags,
			:title, :altTitle, :abstract, :publishedDate,
			:contributors,
			:body
		#def initialize
			# ???
		#end
	end

end	# module Content
end	# module Baron

