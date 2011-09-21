
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
  beforeEach(function() {
    register = new bkeeping.models.Register;
  });
  afterEach(function() {  
      
      // ** delete the user created on the DB 
  });
  
  // test creating a user 
  it("do a basic save, and error on duplication attempt", function () { 
   
    register.set( 
      { "tag": "user",
        "username": "stub", 
        "password": "stub", 
      },
      { silent: true });
    
    register.save ( {}, 
                    { success : function(model, response) { 
                        
                        console.log("success CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
                        
                        // assert that the success is getting called 
                        expect(response.responseText).toBeDefined();

                        // assert that the user is getting returned 
                        var ruser = eval(response.responseText);
                        expect(ruser.tag).toEqual("user");
                        
                        // ** assert that we got a 300 redirect to the landing page 
                        
                      },
                      error : function(model, response) { 
                        console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
                      }
                    }
                  );
    
    // ** test adding a duplicate user 
    register.save ( {}, 
                    { success : function(model, response) { 
                        
                        console.log("success CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
                        
                      },
                      error : function(model, response) { 
                        console.log("error CALLED > model["+ model +"] > response["+ response.responseText +"]"); 
                        
                        // ** assert that error is getting called
                        expect(response.responseText).toBeDefined();

                      }
                    }
                  );
    
  });
  
  // ** test with an empty password - should ERROR 
  it("empty password should return an error", function () { 
  });
  
  // ** test with an empty email - should ERROR 
  it("empty email should return an error", function () { 
  });
  
  // ** test retrieving a user 
  it("get the correct user", function () { 
  });
  
  // ** test updating a user 
  it("update the correct user", function () { 
  });
  
  // ** test deleting a user 
  it("delete the correct user", function () { 
  });
  
  
});

describe('Login', function() { 

});


