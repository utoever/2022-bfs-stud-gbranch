/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
  'use strict';

  App.emailCompose = function( ){

    //Select2 Tags
    $(".tags").select2({tags: 0,width: '100%'});

   //Summernote
    $('#email-editor').summernote({
      height: 200
    });
    
  };

  return App;
})(App || {});