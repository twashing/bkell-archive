
#require 'enumerator'
require 'baron'
#require 'parsedate'
require 'time'

module Baron
module Content

	# This class represents a "raw" representation of the native content object
	# The VERY first goal of an input item is to transcribe enough of the detail
	# into a property map, that while the properties themselves are specific
	# to an implementation of AbstractSource, are accessible to common paths
	# later in the pipeline
	class RawItem
		def initialize()
			@props = Hash.new
		end
		def get(prop)
			@props[prop]
		end
		alias [] get
		def set(prop, value)
			@props[prop] = value
		end
		alias []= set
		def hash
			@props
		end
		def as_time(prop)
			tval = @props[prop]
			Time.parse(tval)
		end
	end

end	# module Content
end	# module Baron


