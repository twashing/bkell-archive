require.config(
  baseUrl: '/test'
  paths:
    js : '/js/'
    jQuery : '/js/lib/jquery-1.6.3'
    Underscore : '/js/lib/underscore'
    Backbone : '/js/lib/backbone_loader'
)


require(['test_account'], (testAccount) ->
  
  console.log("test_account loaded: #{testAccount}")
  
  # CRUD account 
  
  # this is WORKING. just don't want to create duplicates
  #testAccount.testC()
  #testAccount.testR()
  #testAccount.testU()
  #testAccount.testD()
  
  # TODO - For some reason this only working when there's more than 1 account
  #testAccount.testList()
  
  
  # CRUD entry
  
  ###
  testEntry = require('test_entry');
  testEntry.testC
  testEntry.testR
  testEntry.testU
  testEntry.testD
  ###


)



