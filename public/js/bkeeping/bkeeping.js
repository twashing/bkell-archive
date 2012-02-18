(function() {
  require.config({
    baseUrl: "/js",
    paths: {
      order: 'lib/order',
      domReady: 'lib/domReady',
      jQuery: 'lib/jquery-1.6.3',
      json2: 'lib/json2',
      Underscore: 'lib/underscore',
      Backbone: 'lib/backbone',
      pure: 'lib/pure'
    }
  });
  define(['order!lib/jquery-1.6.3', 'order!lib/json2', 'order!lib/underscore', 'order!lib/backbone', 'order!lib/pure', 'order!bkeeping/models'], function(jq, jsn, und, bbn, pur, models) {
    console.log('bkeeping LOADED');
    return {
      models: models,
      jQuery: jq,
      json2: jsn,
      Underscore: und,
      Backbone: bbn,
      pure: pure
    };
  });
}).call(this);
