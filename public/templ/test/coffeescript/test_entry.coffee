
define(['js/bkeeping/models'], (models) ->
  
  testC : ->
    
    console.log("test_entry.testC CALLED")
    
    entry = new models.Entry()
    entry.set(
      "tag" : "entry"
      "id" : "testid"
      "date" : "03\/22\/2011"
      "content" : [ { "tag":"debit" , "id":"dtS" , "amount":120.0 , "accountid":"cash" },
                    { "tag":"credit" , "id":"ctS" , "amount":120.0 , "accountid":"accounts payable" }
      ]
    )
    entry.saveS()
    
  ###
    # TODO - callback to handle {"message":"User is not authenticated","tag":"error"}
  
  testR : ->
  
    console.log("test_account.testR CALLED")
    acct = new models.Account()
    acct.set( "id":"cash")
    acct.fetchS()
    
  testU : ->
  
    console.log("test_account.testU CALLED")
    acct = new models.Account()
    acct.set( "id":"cash")
    acct.fetchS(  success: (model, response) ->
                    acct.set( "counterWeight":"credit" )
                    acct.saveS( {}, type : 'POST' )
    )
  
  testD : ->
  
    console.log("test_account.testD CALLED")
    acct = new models.Account()
    acct.set( "id":"cash")
    acct.fetchS(  success: (model, response) ->
                    acct.removeS()
    )
    
  testList : ->
    
    console.log("test_account.testList CALLED")
    
    accounts = new models.Accounts()
    accounts.fetchS()
    
  ###
)


