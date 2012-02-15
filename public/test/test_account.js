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
        console.log("testC: saving... " + acct);
        return acct.save();
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
        return console.log("test_account.testU CALLED");
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
