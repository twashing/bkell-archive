(function() {
  require.config({
    baseUrl: "/js"
  });
  require(['domReady!, domReady!bkeeping/bkeeping'], function(bkeeping) {
    return console.log('landing LOADED');
  });
}).call(this);
