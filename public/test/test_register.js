
//  Register Page 
//  -> register: username, password, firstname, lastname, email, country, currency 
//    ** on success, server should log you in and redirect to Landing Page 

// there will be a RegisterModel that contains the User we are trying to create; ** howto SYNC with callback ? ** 
  // password should be MD5 hash'd 

//require("/test/test_core.js");

describe('Register', function () {
  
  var register;
  beforeEach(function () {
    register = new bkeeping.models.Register;
  });
  
  // test that a Register model exists
  it('bkeeping namespace exists', function () {
    expect(bkeeping).toBeDefined();
  });
  
  it('Register model should exist', function () {
    expect(bkeeping.models.Register).toBeDefined();
  });
  
  it("'backbone' Model should contain a 'urlRoot'", function () {
    expect(register.urlRoot).toEqual("/user"); 
  });
  
  // test with an empty password - should ERROR 
  it("empty password should return an error", function () { 
   
    register.set( 
      { "tag": "user",
        "username": "stub", 
        "password": null, 
      },
      {silent: true});
    
    register.save ( {}, 
                    { success : function(model, response) { 
                        console.log("success CALLED > model["+ model +"] > response["+ response +"]"); 
                      }},
                    { error : function(model, response) { 
                        console.log("error CALLED > model["+ model +"] > response["+ response +"]"); 
                      }}
                  ); 
    
  });
  
  /*register.set( 
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
    */
  // test with an empty email - should ERROR 
  
});

describe('Login', function() { 

  /*it('this is a test', function() { 
    expect(1).toEqual(1);
  });
  */
});

