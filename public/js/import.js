/*
* import.js
*
* Copyright (c) 2011 TAGAWA Takao, dounokouno@gmail.com
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* https://github.com/dounokouno/import.js
*
*/

var require = function(jsfile, useUrlRaw) {
  
  var ufinal = jsfile; 
  if( typeof(useUrlRaw) == "undefined" || !useUrlRaw) { 
	var ary = document.getElementsByTagName('script');
	for (var i=0;i<ary.length;i++) {
      
      var each = ary[i];
      if(each.hasAttribute('src') && each.getAttribute('src').match(/import\.js$/)) {
        var jspath = each.getAttribute('src').match(/.+\//);
        ufinal = jspath + jsfile; 
      }
    }
  }
  var elem = document.createElement('script');
  elem.setAttribute('type', 'text/javascript');
  elem.setAttribute('src', ufinal);
  document.getElementsByTagName('head')[0].appendChild(elem);
}

// Add the following
//require('external.js');
