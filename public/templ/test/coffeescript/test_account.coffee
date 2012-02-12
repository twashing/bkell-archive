
define(['js/bkeeping/models'], (models) ->
  
  ping : -> 
    console.log("bkeeping/models loaded: #{models}")
  
  testC : -> 
    
    console.log("test_account.testC CALLED")
    
    acct = new models.Account()
    acct.set( 
      "tag":"account"
      "type":"asset"
      "id":"cash"
      "name":"cash"
      "counterWeight":"debit"
    )
    console.log("testC: saving... #{acct}")
    acct.save()
    
    # TODO - have AbstractK that accepts success and error callback handlers
    # TODO - callback to handle {"message":"User is not authenticated","tag":"error"}
    # TODO - create to POST
  
  testR : -> 
  
  testU : -> 
  
  testD : -> 
  
);


