
define(['js/lib/order!js/lib/jquery-1.6.3', 'js/lib/order!js/lib/underscore', 'js/lib/order!js/lib/backbone'],
  function(){
    return {
      Backbone: Backbone.noConflict(),
      _: _.noConflict(),
      $: jQuery.noConflict()
    };
  }
);

