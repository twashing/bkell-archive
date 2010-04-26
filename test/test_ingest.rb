
require 'test/unit' 
require 'yaml' 
require 'ingest/ingest' 

class TestIngest < Test::Unit::TestCase
	
	# test for 'locationURI' input 
	def test_input
		
		# check null 
		#assert_equal("i","i") 
		
		# check file exists 
		#assert true 
		
	end
	
	# test for 'working location' configuration 
	def test_config_work
		
		yamlF = YAML.load_file( 'baron.yaml' )
		
		assert_not_nil yamlF['dir.work']
		assert_not_nil yamlF['type.dcr']
		assert_not_nil yamlF['db.couch.url']
		assert_not_nil yamlF['db.couch.dir']
		
	end 
	
	# test retrieving files locally 
	def test_get_local
	end
	
	# test retrieving files remotely (over HTTP) 
	def test_get_remote
	end 
	
end
