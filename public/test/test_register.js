
//  Register Page 
//  -> register: username, password, firstname, lastname, email, country, currency 
//    ** on success, server should log you in and redirect to Landing Page 

// there will be a RegisterModel that contains the User we are trying to create; ** howto SYNC with callback ? ** 
  // password should be MD5 hash'd 

  // test with an empty password - should ERROR 

  // test with an empty email - should ERROR 


//phantom.exit()

describe('Register', function () {
  
  var counter = 0
  
  // test that a Register model exists
  it('can add a number', function () {
    counter = counter + 2;   // counter was 0 before
    expect(counter).toEqual(2);
  });

  it('can multiply some numbers', function () {
    counter = counter * 5;   // counter was 2 before
    expect(counter).toEqual(10);
  });
});

