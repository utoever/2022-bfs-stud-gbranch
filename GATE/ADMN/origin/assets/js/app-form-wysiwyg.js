/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
	'use strict';

  App.textEditors = function( ){

    //Summernote
    $('#editor1').summernote({
      height: 300
    });
    
  };

  return App;
})(App || {});