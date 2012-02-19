
define( [ 'order!js/lib/jquery-1.7',
          'order!js/lib/pure',
          'order!js/lib/json2',
          'order!js/lib/underscore',
          'order!js/lib/backbone',
          'order!bkeeping/models', 
          'order!js/lib/jquery.dataTables',
          ]
  (jq, pur, jsn, und, bbn, models, dataTables) ->
    
    console.log('bkeeping LOADED')
    
    # return an object with the models in it 
    models : models
    jQuery : jQuery.noConflict()
    Underscore : _.noConflict()
    Backbone : Backbone.noConflict()
)

