(function() {
  define(['js/bkeeping/models'], function(models) {
    return {
      ping: function() {
        return console.log("bkeeping/models loaded: " + models);
      },
      testC: function() {
        var acct;
        console.log("test_account.testC CALLED");
        acct = new models.Account();
        acct.set({
          "tag": "account",
          "type": "asset",
          "id": "cash",
          "name": "cash",
          "counterWeight": "debit"
        });
        return acct.saveS();
      },
      testR: function() {
        var acct;
        console.log("test_account.testR CALLED");
        acct = new models.Account();
        acct.set({
          "id": "cash"
        });
        return acct.fetchS();
      },
      testU: function() {
        var acct;
        console.log("test_account.testU CALLED");
        acct = new models.Account();
        acct.set({
          "id": "cash"
        });
        return acct.fetchS({
          success: function(model, response) {
            acct.set({
              "counterWeight": "credit"
            });
            return acct.saveS({}, {
              type: 'POST'
            });
          }
        });
      },
      testD: function() {
        return console.log("test_account.testD CALLED");
      },
      testList: function() {
        /*
            console.log("test_account.testList CALLED")
            
            accounts = new models.Accounts()
            accounts.fetchS()
            */
      }
    };
  });
}).call(this);
