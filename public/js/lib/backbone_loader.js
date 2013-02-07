
define(['order!js/lib/jquery-1.6.3', 
        'order!js/lib/underscore', 
        'order!js/lib/backbone'],
  function(){
    return {
      Backbone: Backbone.noConflict(),
      _: _.noConflict(),
      $: jQuery.noConflict()
    };
  }
);

