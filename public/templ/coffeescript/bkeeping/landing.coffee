require.config({
  baseUrl: "/js",
});

require( ['domReady!']
        -> 
          console.log('hello')
);

