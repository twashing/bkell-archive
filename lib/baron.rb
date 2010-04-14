

module Baron
	# Not sure if we'll use this, but it's not uncommon to need a singleton-like
	# class to implement the sort of "global" details, and self-instrumentation
	# for an application. It manages, and ultimately contains the entire runtime
	# TODO: going to let the needs emerge, and not force anything in here.
	class AppFrame
	end

	# This class represents the runtime configuration of an inbound pipeline
	class InboundConfig
	end

	# This is a class representing the runtime configuation of an output pipeline
	# TODO: This is not an immediate concern at present
	class OutboundConfig
	end

	# This is to be a representation of the native Baron content record, matching
	# the representation details to be stuffed into CouchDB
	class ContentItem
	end

	# This class represents a "raw" representation of the native content object
	# The VERY first goal of an input item is to transcribe enough of the detail
	# into a property map, that while the properties themselves are specific
	# to an implementation of AbstractSource, are accessible to common paths
	# later in the pipeline
	class RawContentItem
	end

	module InboundFeed
		# a factory for instantiating a feed by method/config
		def self.factory(sourceClassName, sourceConfigTree)
			case sourceClassName
				# There is probably a much slicker way to do this in Ruby's metaprogramming
				# can't find it right now. TODO: make this all Rubified...
			when "TeamsiteDcrFileSource"
				TeamsiteDcrFileSource.new(sourceConfigTree['basedir'])
			else
				raise "Unknown source class #{sourceClassName}"
			end
		end

		# Abstract implementation of feed source. Should provide a common
		# interface for:
		#   - initializing a source from a common configuration form
		#   - stateful execution to fetch incrementally
		#   - an interable/enumerable interface on found items
		#   - a common mechanism/determination of success and resulting
		#     committment to new state
		#   - factory for dynamic instantiation from parameter data
		class AbstractSource
		end

		class TeamsiteDcrFileSource < AbstractSource
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

