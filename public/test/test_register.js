
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
});
 
describe('Register w/ server interaction', function () {
  
  var register;
  
  /**** 
   * BEFORE and AFTER 
   */
  beforeEach(function() {
    
    register = new bkeeping.models.Register;
    login = new bkeeping.models.Login;
  });


  // defining AFTER here so it can be put into a callback handler 
  var afterRun = function() {  
     
    // delete the user created on the DB 
    login.savek({ "tag": "user",
                  "username": "stub", 
                  "password": "e8f65fd8d973f9985dc7ea3cf1614ae1", 
                  "email": "tim@interrupt.com",
                }, 
                function(model, response) { 
                  register.destroy();
                }, 
                function(model, response) { 
                });
  };
  
  // test creating a user 
  it("do a basic save, and error on duplication attempt", function () { 
    
    register.set( 
      { "tag": "user",
        "username": "stub", 
        "password": "stub", 
        "email": "tim@interrupt.com",
      },
      { silent: true });
    
    register.savek({}, 
          function(model, response) { 
             
             console.log("success [bkeeping.models.Register] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             register["_id"] = response._id;
             register["id"] = response.username;

             expect(response).toBeDefined();
             expect(response.tag).toEqual("user");
             
             // now delete the user (after logging in)
             afterRun(); 

           }, 
          function(model, response) { 
            expect(response).toBeNull(); // there should be no errors
            afterRun(); 
          });
    
    // test adding a duplicate user 
    register.savek( {},
         function(model, response) { 
            expect(response).toBeNull(); // there should not be a success on duplicate user add 
            afterRun(); 
         },
         function(model, response) { 
            console.log("ERROR success [bkeeping.models.Register] CALLED > model["+ model +"] > response["+ response +"]"); 
            
            expect(response).toBeDefined();
            expect(response.tag).toEqual("error");

            // now delete the user (after logging in)
            afterRun(); 
            
         });
    
  });
  
  // test with an empty password - should ERROR 
  it("empty password should return an error", function () { 
    
    register.set( 
      { "tag": "user",
        "username": "stub", 
        "password": null, 
        "email": "tim@interrupt.com",
      },
      { silent: true });
    
    register.savek({}, 
          function(model, response) { 
            
            expect(response).toBeNull(); // this should not be successful 
            afterRun(); 
           }, 
          function(model, response) { 
            
            console.log("ERROR success [empty password] CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
            
            register["id"] = model.attributes["username"];
            
            expect(response).toBeDefined();
            expect(response.tag).toEqual("error");
            
            afterRun(); 
          });
    
  });
  
  // ** we want to see a 302 redirect code after successful registration
  it("a 302 redirect should be returned after successful registration", function () { 
    
    // ** maybe backbone History needs to be engaged for redirect to work 
    // http://stackoverflow.com/questions/6831110/backbone-js-global-error-handling
    
    register.set( 
      { "tag": "user",
        "username": "stub", 
        "password": "stub", 
        "email": "tim@interrupt.com",
      },
      { silent: true });
    
    register.savek({}, 
          function(model, response) { 
             
             console.log("success [on 302 register] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             register["_id"] = response._id;
             register["id"] = response.username;

             expect(response).toBeDefined();
             expect(response.tag).toEqual("user");
             
             // now delete the user (after logging in)
             afterRun(); 

           }, 
          function(model, response) { 
            expect(response).toBeNull(); // there should be no errors
            afterRun(); 
          });
    
    
  }); 
  
});

/*describe('Login', function() { 

});
*/



