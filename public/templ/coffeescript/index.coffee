
/* Common handler for page transitions */
transitionPageHandler = (ctxt, purl, proute) -> 
  
  centreC = $("#centre-content")
  ctxtObj = $(ctxt)
  
  ctxtObj.click ->
    centreC.fadeOut(200, "linear", () ->
        centreC.load(purl, () -> 

          /* interruptRouter.navigate(proute) */
          centreC.fadeIn(500, "linear")
        )
      )

/* JQuery document ready handler */ 
$(document).ready -> 
  
  ### 
    Load the index content 
  ###
  $("#centre-content")
    .css('display', 'none')
    .load("/include/main.html")
    .fadeIn(500, "linear")
  
  ###
    Add handlers for 
      1. right menu items and 
      2. main ribbon 
  ###
  
  transitionPageHandler("#item-about", "/include/profile.html", "/profile")
  transitionPageHandler("#item-portfolio", "/include/portfolio.html", "/portfolio")
  transitionPageHandler("#item-main , #main-ribbon", "/include/main.html", "/")
  
  
  ###
    Backbone Router URLs
  ###
  interruptRouter = Backbone.Router.extend(
    routes: 
      "/" : "indexRoute"
      "/profile" : "profileRoute"
      "/portfolio" : "portfolioRoute"
  )
  
  indexRoute = -> 
    $("#item-main").click()
  profileRoute = -> 
    $("#item-about").click()
  portfolioRoute = -> 
    $("#item-portfolio").click()
  
  /* Backbone.history.start( pushState: true) */


