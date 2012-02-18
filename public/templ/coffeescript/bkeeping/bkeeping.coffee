require.config({
  baseUrl: "/js",
  paths:
    js : '/js/'
    jQuery : '/js/lib/jquery-1.6.3'
    Underscore : '/js/lib/underscore'
    Backbone : '/js/lib/backbone_loader'
})

define( ['js/bkeeping/models', 'jQuery']
  (models) ->
    
    console.log('bkeeping LOADED')
    
    # return an object with the models in it 
    models : models
    jQuery: jQuery
)

