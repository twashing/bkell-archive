

describe("bk.user", function() { 
  
  // 1. test for existance
  it("should be present in the global namespace", function () {
    expect(bk.user).toBeDefined();
  });
  it("should be a 'backbone' Model", function () {
    expect(bk.user).toBeDefined();
  });

});


/*
describe("bk.userController", function() { 
  
  // 1. test for existance
  it("should be present in the global namespace", function () {
    expect(bk.userController).toBeDefined();
  });
  it("should be a 'backbone' Controller", function () {
    expect(bk.userController).toBeDefined();
  });
  // 2. test behavior
  it("should handle a SUCCESS login try", function() { 

  });
  it("should handle an ERROR login try", function() { 

  });

)};

describe("bk.userView", function() { 
  
  // 1. test for existance
  it("should be present in the global namespace", function () {
    expect(bk.userView).toBeDefined();
  });
  it("should be a 'backbone' Controller", function () {
    expect(bk.userView).toBeDefined();
  });
  // 2. test behavior
  it("should handle a SUCCESS login try", function() { 

  });
  it("should handle an ERROR login try", function() { 

  });

)};
*/

/*Home Page 
  -> login: username, password 
    { success -> Landing Page } 


Register Page 
  -> register: username, password, firstname, lastname, email, country, currency 
    ** on success, server should log you in and redirect to Landing Page 


Landing Page -> Ajax form requests to populate other page(s) 
  <- accounts  (userid) 
  <- account (accountid) 
  -> account: name, type 
    { success <- refresh accounts(userid) } 

  <- entries (userid) 
  <- entry (entryid) 
  -> entry: date { tag : debit | credit , amount , accountid } 
    { success <- refresh entries(userid) } 
*/

