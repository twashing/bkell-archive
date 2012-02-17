
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
    
    # TODO - callback to handle {"message":"User is not authenticated","tag":"error"}
  
  testR : ->
  
    console.log("test_entry.testR CALLED")
    entry = new models.Entry()
    entry.set( "id":"testid")
    entry.fetchS()
    
  testU : ->
  
    console.log("test_entry.testU CALLED")
    entry = new models.Entry()
    entry.set( "id":"testid")
    entry.fetchS(  success: (model, response) ->
                    entry.set( "date":"01\/01\/2012" )
                    entry.saveS( {}, type : 'POST' )
    )
  
  testD : ->
  
    console.log("test_entry.testD CALLED")
    entry = new models.Entry()
    entry.set( "id":"testid")
    entry.fetchS(  success: (model, response) ->
                    entry.removeS()
    )
  
  testList : ->
    
    console.log("test_entry.testList CALLED")
    
    entrys = new models.Entries()
    entrys.fetchS()
)


