if RUBY_PLATFORM =~ /java/
  require 'java'
end

require 'rubygems'
require 'nokogiri'


content = Nokogiri::XML(File.read(ARGV[0]))
stylesheet = Nokogiri::XSLT(File.read(ARGV[1]))

puts stylesheet.transform(content)