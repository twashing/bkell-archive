
define(['order!js/lib/jquery-1.7', 
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

