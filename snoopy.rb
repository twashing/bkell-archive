# support both jruby and MRI
if RUBY_PLATFORM =~ /java/
  require 'java'
end

require 'rubygems'
require 'nokogiri'
require 'pp'

# parse the XML feed content
content = Nokogiri::XML(File.read(ARGV[0]))

# store our content in a big hash
baron_representation = Hash.new

# use XPATH selectors to pull in content from source (DCR in this case)  
baron_representation['title'] = content.xpath("/record/item[@name='title']/value")[0].content
baron_representation['issue'] = content.xpath("/record/item[@name='issue']/value")[0].content
baron_representation['date'] = content.xpath("/record/item[@name='date']/value")[0].content
baron_representation['associated_section'] = content.xpath("/record/item[@name='associated_section']/value")[0].content
baron_representation['body_paragraph'] = content.xpath("/record//item[@name='body_paragraph']/value")[0].content

# print out our baron object
pp baron_representation

# parse the body content into a proper HTML document
# at this point we could cleanse the document and store
puts Nokogiri::HTML(baron_representation['body_paragraph'])