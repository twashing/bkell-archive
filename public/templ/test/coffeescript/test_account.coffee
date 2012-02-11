require.config({
  baseUrl: '/test',
  paths:
    'src' : '/js'
});

require(['bkeeping/models'], (models) ->
  console.log("bkeeping/models loaded: #{models}")
);


