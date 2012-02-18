
define( [ 'order!js/lib/jquery-1.7',
          'order!js/lib/pure',
          'order!js/lib/json2',
          'order!js/lib/underscore',
          'order!js/lib/backbone',
          'order!bkeeping/models', ]
  (jq, pur, jsn, und, bbn, models) ->
    
    console.log('bkeeping LOADED')
    
    # return an object with the models in it 
    models : models
    jQuery : jQuery.noConflict()
    pure : pur                      # pure and json2 objects are simply used in other libs. I don't need them directly
    json2 : jsn
    Underscore : _.noConflict()
    Backbone : Backbone.noConflict()
)

