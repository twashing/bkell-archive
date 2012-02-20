(function() {
  define(['order!js/lib/jquery-1.7', 'order!js/lib/pure', 'order!js/lib/json2', 'order!js/lib/underscore', 'order!js/lib/backbone', 'order!bkeeping/models', 'order!bkeeping/views', 'order!js/lib/jquery.dataTables', 'order!js/lib/jquery.serialScroll.js', 'order!js/lib/jquery.scrollTo.js'], function(jq, pur, jsn, und, bbn, models, views) {
    console.log('bkeeping LOADED');
    return {
      models: models,
      views: views,
      jQuery: jQuery.noConflict(),
      Underscore: _.noConflict(),
      Backbone: Backbone.noConflict()
    };
  });
}).call(this);
