require.config(
  baseUrl: '/test'
  paths:
    js : '/js/'
    jQuery : 'thing'
    Underscore : 'asdf'
    Backbone : 'fubar'
);


# CRUD account 

require(['test_account'], (taccount) ->
  console.log("test_account loaded: #{taccount}")
);


###
testAccount.testC
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


