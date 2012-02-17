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
      },
      testU: function() {
        var entry;
        console.log("test_entry.testU CALLED");
        entry = new models.Entry();
        entry.set({
          "id": "testid"
        });
        return entry.fetchS({
          success: function(model, response) {
            entry.set({
              "date": "01\/01\/2012"
            });
            return entry.saveS({}, {
              type: 'POST'
            });
          }
        });
      }
      /*
        testD : ->
        
          console.log("test_entry.testD CALLED")
          entry = new models.Entry()
          entry.set( "id":"cash")
          entry.fetchS(  success: (model, response) ->
                          entry.removeS()
          )
          
        testList : ->
          
          console.log("test_entry.testList CALLED")
          
          entry = new models.Entry()
          entry.fetchS()
          
        */
    };
  });
}).call(this);
