require.config({
  baseUrl: "/js",
})

define( ['domReady!, domReady!bkeeping/models']
  (models) ->
    
    console.log('bkeeping LOADED')
    
    # return an object with the models in it 
    models : models
)

