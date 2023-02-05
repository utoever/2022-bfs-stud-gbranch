/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
  'use strict';
  
  App.emailInbox = function( ){
    
    $(".am-select-all input").on('change',function(){
      var checkboxes = $(".email-list").find('input[type="checkbox"]');
      if( $(this).is(':checked') ) {
          checkboxes.prop('checked', true);
      } else {
          checkboxes.prop('checked', false);
      }
    });
    
  };

  return App;
})(App || {});