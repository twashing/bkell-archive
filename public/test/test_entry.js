(function() {
  define(['js/bkeeping/models'], function(models) {
    return {
      testC: function() {
        var entry;
        console.log("test_entry.testC CALLED");
        entry = new models.Entry();
        entry.set({
          "tag": "entry",
          "id": "testid",
          "date": "03\/22\/2011",
          "content": [
            {
              "tag": "debit",
              "id": "dtS",
              "amount": 120.0,
              "accountid": "cash"
            }, {
              "tag": "credit",
              "id": "ctS",
              "amount": 120.0,
              "accountid": "accounts payable"
            }
          ]
        });
        return entry.saveS();
      },
      testR: function() {
        var entry;
        console.log("test_entry.testR CALLED");
        entry = new models.Entry();
        entry.set({
          "id": "testid"
        });
        return entry.fetchS();
      }
      /*
        testU : ->
        
          console.log("test_account.testU CALLED")
          entry = new models.Account()
          entry.set( "id":"cash")
          entry.fetchS(  success: (model, response) ->
                          entry.set( "counterWeight":"credit" )
                          entry.saveS( {}, type : 'POST' )
          )
        
        testD : ->
        
          console.log("test_account.testD CALLED")
          entry = new models.Account()
          entry.set( "id":"cash")
          entry.fetchS(  success: (model, response) ->
                          entry.removeS()
          )
          
        testList : ->
          
          console.log("test_account.testList CALLED")
          
          accounts = new models.Accounts()
          accounts.fetchS()
          
        */
    };
  });
}).call(this);
