
define([], () ->
  
  
  ###
  # Grab the Backbone object 
  ###
  exists: (thing) ->
    
    if( (!(typeof thing == "undefined")) and (thing) )
      return true
    
    return false

)


