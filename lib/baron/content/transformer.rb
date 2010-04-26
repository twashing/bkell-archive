
#require 'rexml/document'
require 'baron/content/item'

module Baron
	module Content

		# This class is used by the transform phase. It's job is to:
		#  - provide the implementation to execute a transform
		#    - input 1: The RawContentItem to transform
		#    - input 2: The transformRules from the feed configuration
		#    - output: a ContentItem proper
		# But perhaps more importantly, it provides the rule actions themselves
		# as methods of the form:
		#   def <action name>_action(*params)
		#
		# The rule processor main loop will go through an ordered list of
		# rules in the form of an array of arrays. each inner array is of
		# the form:
		#   ["command", "param1", "param2", ...]
		# We'll shift off the command, see if the method exists, and if so,
		# send() our parameters in.
		class Transformer
			attr_reader :item
			def initialize(ruleSet)
				@ruleSet = ruleSet
				@item = nil
			end
			def run_rules_on(rawItem)
				self.load_raw(rawItem)
				self.run_rules
			end
			def load_raw(rawItem)
				@rawItem = rawItem
				@item = Baron::Content::Item.new
			end
			def run_rules
				@ruleSet['ruleList'].each do |rule|
					command = rule[0]
					params = rule[1,rule.size]
					command += "_action"
					if self.respond_to? command
						self.send(command, *params)
					else
						raise "unknown action #{command}"
					end
				end
			end
			def copy_action(dstname, srcname)
				if item.respond_to? "#{dstname}="
					if @rawItem[srcname]
						item.send("#{dstname}=", @rawItem[srcname])
					else
						# XXX: seems harsh until we have better exceptions...
						# will need it as not all docs will express all attribs
						#raise "unknown source item #{srcname}"
					end
				else
					raise "unknown destination attribute #{dstname}"
				end
			end
		end
	end	# module Content
end	# module Baron

