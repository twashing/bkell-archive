(function() {
  /* Common handler for page transitions */;
  var transitionPageHandler;
  transitionPageHandler = function(ctxt, purl, proute) {
    var centreC, ctxtObj;
    centreC = $("#centre-content");
    ctxtObj = $(ctxt);
    return ctxtObj.click(function() {
      return centreC.fadeOut(200, "linear", function() {
        return centreC.load(purl, function() {
          /* interruptRouter.navigate(proute) */;          return centreC.fadeIn(500, "linear");
        });
      });
    });
  };
  /* JQuery document ready handler */;
  $(document).ready(function() {
    /* 
      Load the index content 
    */
    var indexRoute, interruptRouter, portfolioRoute, profileRoute;
    $("#centre-content").css('display', 'none').load("/include/main.html").fadeIn(500, "linear");
    /*
        Add handlers for 
          1. right menu items and 
          2. main ribbon 
      */
    transitionPageHandler("#item-about", "/include/profile.html", "/profile");
    transitionPageHandler("#item-portfolio", "/include/portfolio.html", "/portfolio");
    transitionPageHandler("#item-main , #main-ribbon", "/include/main.html", "/");
    /*
        Backbone Router URLs
      */
    interruptRouter = Backbone.Router.extend({
      routes: {
        "/": "indexRoute",
        "/profile": "profileRoute",
        "/portfolio": "portfolioRoute"
      }
    });
    indexRoute = function() {
      return $("#item-main").click();
    };
    profileRoute = function() {
      return $("#item-about").click();
    };
    portfolioRoute = function() {
      return $("#item-portfolio").click();
    };
    return /* Backbone.history.start( pushState: true) */;
  });
}).call(this);
