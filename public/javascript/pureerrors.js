
pd = {
  "tag" : "errors",
  "content" : [
	
    { "tag" : "error",  "message" : "Error 1" }, 
    { "tag" : "error",  "message" : "Error 2" } 
	
  ]
}

directive = { 
  
  ".error_content" : { 
    "each<-content" : {
      ".error" : "each.message", 
    }
  }

}

