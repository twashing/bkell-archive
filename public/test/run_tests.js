(function() {
  require.config({
    baseUrl: '/test',
    paths: {
      js: '/js/',
      jQuery: '/js/lib/jquery-1.6.3',
      Underscore: '/js/lib/underscore',
      Backbone: '/js/lib/backbone_loader'
    }
  });
  require(['test_account'], function(testAccount) {
    console.log("test_account loaded: " + testAccount);
    return testAccount.testD();
  });
  /*
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
