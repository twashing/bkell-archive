(function() {
  require.config({
    baseUrl: "/js"
  });
  require(['domReady!'], function() {
    return console.log('hello');
  });
}).call(this);
