
require 'yaml'

myconfig = 'etc/infeeds/www_canadianbusiness_com.yaml'

cfg = YAML.load_file(myconfig)

p cfg


