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
  require(['test_account', 'test_entry'], function(testAccount, testEntry) {
    console.log("test_account loaded: " + testAccount);
    console.log("test_entry loaded: " + testEntry);
    return testEntry.testD();
  });
}).call(this);
