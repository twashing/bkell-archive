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
      testR: function() {},
      testU: function() {},
      testD: function() {}
    };
  });
}).call(this);
