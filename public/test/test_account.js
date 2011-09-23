
describe('Account', function () {
  
  
  var account;
  beforeEach(function () {
    account = new bkeeping.models.Account;
  });
  
  // test that a Account model exists
  it('bkeeping namespace exists', function () {
    expect(bkeeping).toBeDefined();
  });
  
  it('Account model should exist', function () {
    expect(bkeeping.models.Account).toBeDefined();
  });
  
  it("'backbone' Model should contain a 'urlRoot'", function () {
    expect(account.urlRoot).toEqual("/user"); 
  });
});
 

describe('Account w/ server interaction', function () {
  
  var account, login;
  
  /**** 
   * BEFORE and AFTER 
   */
  beforeEach(function() {
    
    account = new bkeeping.models.Account;
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
                  account.destroy();
                }, 
                function(model, response) { 
                });
  };
  
  // ** test ERROR on duplicate account creation
  // ** test ERROR on creating w/out loggin in
  // ** test creating an account 

  // ** test retrieving an account 
  // ** test retrieving a list of accounts
  
  // ** test updating an account 
  
  // ** test deleting an account 
  
  // test creating a user 
  it("do a basic save, and error on duplication attempt", function () { 
    
    account.set( 
      { "tag": "user",
        "username": "stub", 
        "password": "stub", 
        "email": "tim@interrupt.com",
      },
      { silent: true });
    
    account.savek({}, 
          function(model, response) { 
             
             console.log("success [bkeeping.models.Account] CALLED > model["+ model +"] > response["+ response +"]"); 
             
             account["_id"] = response._id;
             account["id"] = response.username;

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
    account.savek( {},
         function(model, response) { 
            expect(response).toBeNull(); // there should not be a success on duplicate user add 
            afterRun(); 
         },
         function(model, response) { 
            console.log("ERROR success [bkeeping.models.Account] CALLED > model["+ model +"] > response["+ response +"]"); 
            
            expect(response).toBeDefined();
            expect(response.tag).toEqual("error");
            
            // now delete the user (after logging in)
            afterRun(); 
            
         });
        
  });
  
});

