# support both jruby and MRI
#if RUBY_PLATFORM =~ /java/
#  require 'java'
#end

require 'rexml/document'
require 'pp'
include REXML

# parse the XML feed content
doc = Document.new(File.new(ARGV[0]))

# store our content in a big hash
baron_representation = Hash.new

# use XPATH selectors to pull in content from source (DCR in this case)  
baron_representation['title'] = doc.root.elements["/record/item[@name='title']/value"].text


baron_representation['title'] = doc.root.elements["/record/item[@name='title']/value"].text
baron_representation['issue'] = doc.root.elements["/record/item[@name='issue']/value"].text
baron_representation['date'] = doc.root.elements["/record/item[@name='date']/value"].text
baron_representation['associated_section'] = doc.root.elements["/record/item[@name='associated_section']/value"].text
baron_representation['body_paragraph'] = doc.root.elements["/record//item[@name='body_paragraph']/value"].text

# print out our baron object
pp baron_representation

# parse the body content into a proper HTML document
# at this point we could cleanse the document and store
#puts Nokogiri::HTML(baron_representation['body_paragraph'])


