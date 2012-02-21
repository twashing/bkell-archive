(function() {
  define(['order!js/lib/jquery-1.6.3', 'order!js/lib/pure', 'order!js/lib/json2', 'order!js/lib/underscore', 'order!js/lib/backbone', 'bkeeping/models', 'bkeeping/views', 'order!js/lib/jquery.dataTables'], function(a, b, c, d, e, models, views, f) {
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
