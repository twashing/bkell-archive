(function() {
  require.config({
    baseUrl: '/test',
    paths: {
      'src': '/js'
    }
  });
  require(['bkeeping/models'], function(models) {
    return console.log("bkeeping/models loaded: " + models);
  });
}).call(this);
