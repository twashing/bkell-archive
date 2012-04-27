
define([], () ->
  
  
  ###
  # Grab the Backbone object 
  ###
  exists: (thing) ->
    
    if( (!(typeof thing == "undefined")) and (thing) )
      return true
    
    return false
  
  makeGenericDialog: (message, okfn) ->
  
    # confirm the delete 
    $(".modal-body").text(message)
    
    $("#modal-delete-ok").off("click")
    $("#modal-delete-ok").on("click", () ->
      
      console.log("OK delete clicked")
      $("#delete-confirm").modal("hide")

      okfn.apply()
    )
    
    
    $("#modal-delete-cancel").off("click")
    $("#modal-delete-cancel").on("click", () ->
      
      console.log("CANCEL delete clicked")
      $("#delete-confirm").modal("hide")
    )
    
    $("#delete-confirm").modal()
)


