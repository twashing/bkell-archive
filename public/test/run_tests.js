(function() {
  require.config({
    baseUrl: "/test",
    paths: {
      'src': '/js'
    }
  });
  require(['test_account'], function(taccount) {
    return console.log("test_account loaded: " + taccount);
  });
  /*
  testAccount.testC
  testAccount.testR
  testAccount.testU
  testAccount.testD
  */
  /*
  testEntry = require('test_entry');
  testEntry.testC
  testEntry.testR
  testEntry.testU
  testEntry.testD
  */
}).call(this);
