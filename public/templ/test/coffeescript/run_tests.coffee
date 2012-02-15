require.config(
  baseUrl: '/test'
  paths:
    js : '/js/'
    jQuery : '/js/lib/jquery-1.6.3'
    Underscore : '/js/lib/underscore'
    Backbone : '/js/lib/backbone_loader'
)


# CRUD account 

require(['test_account'], (testAccount) ->
  
  console.log("test_account loaded: #{testAccount}")
  #testAccount.ping()
  
  # this is WORKING. just don't want to create duplicates
  #testAccount.testC()
  #testAccount.testR()
  #testAccount.testU()
  testAccount.testD()
  #testAccount.testList()
)


###
testAccount.testR
testAccount.testU
testAccount.testD
###


# CRUD entry

###
testEntry = require('test_entry');
testEntry.testC
testEntry.testR
testEntry.testU
testEntry.testD
###


