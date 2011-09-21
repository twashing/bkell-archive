
//  Register Page 
//  -> register: username, password, firstname, lastname, email, country, currency 
//    ** on success, server should log you in and redirect to Landing Page 

// there will be a RegisterModel that contains the User we are trying to create; ** howto SYNC with callback ? ** 
  // password should be MD5 hash'd 

//require("/test/test_core.js");

/*describe('Register', function () {
  
  
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
*/
 
describe('Register w/ server interaction', function () {
  
  var register;
  
  /**** 
   * BEFORE 
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
      },
      { silent: true });
    
    register.savek({}, function(model, response) { 
             
             console.log("success [bkeeping.models.Register] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             register["_id"] = response._id;
             register["id"] = response.username;

             expect(response).toBeDefined();
             expect(response.tag).toEqual("user");
             
             // now login & delete the user
             afterRun(); 

           }, null);
    
    // ** test adding a duplicate user 
    //register.savek();
    
  });
  
  /*
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
  */
  
});

/*describe('Login', function() { 

});
*/



