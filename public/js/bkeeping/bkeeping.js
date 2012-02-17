(function() {
  require.config({
    baseUrl: "/js"
  });
  define(['domReady!, domReady!bkeeping/models'], function(models) {
    console.log('bkeeping LOADED');
    return {
      models: models
    };
  });
}).call(this);
