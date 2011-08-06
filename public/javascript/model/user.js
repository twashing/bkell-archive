
  
window.Register = Backbone.Model.extend({
  urlRoot : "/user"
}); 

window.RegisterView = Backbone.View.extend({
  
  tagName : "div",
  className: "register",
  el: $('#register'),

  initialize: function(){
    _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
    this.render(); // not all views are self-rendering. This one is.
  },
  
  render: function() {},
  
  events: {
    'click button#registerbtn': 'registerUser', 
    //'click a' : 'registerUser'
  },
  
  registerUser: function() {
    
    //alert("In the name of science... you monster");
    
 registerModel.set( 
      {"tag":"user",
    "username":this.$("#username").val(), 
    "password":this.$("#password").val(), 
    "content":
    [{"tag":"profileDetails",
      "content":
      [{"tag":"profileDetail",
        "name":"first.name",
        "value": this.$("#firstname").val(), 
        "content":null},
       {"tag":"profileDetail",
        "name":"last.name",
        "value": this.$("#lastname").val(), 
        "content":null},
       {"tag":"profileDetail",
        "name":"email",
        "value": this.$("#email").val(), 
        "content":null},
       {"tag":"profileDetail",
        "name":"country",
        "value": this.$("#country").val(), 
        "content":null},
       {"tag":"profileDetail",
        "name":"currency",
        "value": this.$("#currency").val(), 
        "content":null}
          
          ]}]},
      {silent: true});
    registerModel.save( registerModel,
      {
        success : function(model, response) {
          
          // check if this is an ERROR
          // ... 
          
          // if success, make a login call 
          // ... 
          
          console.log("SUCCESS model: " + model.toJSON());
          console.log("SUCCESS response: " + response.toJSON());
        },   // handle a application error
        error : function(model, response) {
          console.log("ERROR model: " + model.toJSON());
          console.log("ERROR response: " + response.toJSON());
        }    // handle a 500 error 
      });
    }
});

registerModel = new Register
registerView = new RegisterView; 


