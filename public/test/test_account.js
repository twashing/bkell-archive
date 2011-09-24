
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
    expect(account.urlRoot).toEqual("/account"); 
  });
});
 

describe('Account w/ server interaction', function () {
  
  var account, register, login;
  
  var accountAsset = {  "tag":"account",
                        "type":"asset",
                        "name":"cash",
                        "counterWeight":"debit" }
  
  /**** 
   * BEFORE and AFTER 
   */
  beforeEach(function() {
    
    account = new bkeeping.models.Account;
    register = new bkeeping.models.Register;
    login = new bkeeping.models.Login;
     
    var inputUser = { "tag": "user",
                  "username": "stub", 
                  "password": "stub", 
                  "email": "tim@interrupt.com",
                }; 

    // delete the user created on the DB 
    register.savek( inputUser,  { success : 
                                    function(model, response) { 
                                      inputUser["password"] = "e8f65fd8d973f9985dc7ea3cf1614ae1";
                                      login.savek(inputUser);
                                    }
                                });


    // ** timer to wait for a second, for callbacks to finish 
    // ... 
    
  });
   
  // ** test ERROR on duplicate account creation
  it("should get an ERROR if I try to add a duplicate account", function() { 
    
    account = new bkeeping.models.Account;
    account.savek(accountAsset,
      { success : 
        function(model, response) { 
        
        var a2 = new bkeeping.models.Account;
        a2.savek( accountAsset, 
                  {
                    success : function(model, response) { 
                      console.log("Here 1 ... ");
                      expect(response).toBeNull(); // there should NOT be a success on the 2nd account add
                    }, 
                    error : function(model, response) { 
                      console.log("Here 2 ... ");
                      expect(response).toBeDefined(); // there SHOULD be an error if we try to add a duplicate account 
                    }
                  });
        }
      })
  });
  
  // ** test ERROR on creating w/out logging in
  // ** test creating an account 
  
  // ** test retrieving an account 
  // ** test retrieving a list of accounts
  
  // ** test updating an account 
  
  // ** test deleting an account 
  
});

