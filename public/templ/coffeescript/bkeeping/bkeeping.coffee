
define( [
          'bkeeping/models',
          'bkeeping/views',
          ]
  (models, views) ->
    
    console.log('bkeeping LOADED')
    
    # return an object with the models in it 
    models : models
    views : views
    jQuery : jQuery.noConflict()
    Underscore : _.noConflict()
    Backbone : Backbone.noConflict()
)

