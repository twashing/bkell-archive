(function() {
  define(['js/bkeeping/models'], function(models) {
    return {
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
        /*
            acct.set(
              "counterWeight" : "debit"
              "name" : "revenue"
              "type" : "revenue"
              "id" : "revenue"
              "tag" : "account"
            )
            acct.saveS()
            
            acct.set(
              "counterWeight" : "debit"
              "name" : "accounts payable"
              "type" : "liability"
              "id" : "accounts payable"
              "tag" : "account"
            )
            acct.saveS()
            
            acct.set(
              "counterWeight" : "debit"
              "name" : "expense"
              "type" : "expense"
              "id" : "expense"
              "tag" : "account"
            )
            acct.saveS()
            */
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
        var acct;
        console.log("test_account.testD CALLED");
        acct = new models.Account();
        acct.set({
          "id": "accounts payable"
        });
        return acct.fetchS({
          success: function(model, response) {
            return acct.removeS();
          }
        });
      },
      testList: function() {
        var accounts;
        console.log("test_account.testList CALLED");
        accounts = new models.Accounts();
        return accounts.fetchS();
      }
    };
  });
}).call(this);
