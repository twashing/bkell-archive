
phantom.injectJs("public/test/test_core.js")

//  Register Page 
//  -> register: username, password, firstname, lastname, email, country, currency 
//    ** on success, server should log you in and redirect to Landing Page 

// there will be a RegisterModel that contains the User we are trying to create; ** howto SYNC with callback ? ** 
  // password should be MD5 hash'd 

  // test with an empty password - should ERROR 

  // test with an empty email - should ERROR 


//phantom.exit()

describe('Register', function () {
  
  // test that a Register model exists
  it('can add a number', function () {
    //...
  });

  it('can multiply some numbers', function () {
    //...
  });
});

