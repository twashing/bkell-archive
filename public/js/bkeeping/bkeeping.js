(function() {
  define(['bkeeping/models', 'bkeeping/views'], function(models, views) {
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
