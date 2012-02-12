require.config(
  baseUrl: '/js',
)

define(['Backbone'], (bb) ->
  
  Backbone = bb.Backbone
  
  Account = Backbone.Model.extend(
    urlRoot : "/account",
  )
)



