require.config(
  baseUrl: '/js',
)

define(['Backbone'], (Backbone) ->
  
  Account = Backbone.Model.extend(
    urlRoot : "/account",
  )
)



