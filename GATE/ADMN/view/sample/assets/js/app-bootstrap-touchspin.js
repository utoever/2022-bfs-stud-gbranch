/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
	'use strict';

  App.bootstrapSpinner = function( ){
   
    $('input[name="postfix"]').TouchSpin({
      min: 0,
      max: 100,
      step: 0.1,
      decimals: 2,
      boostat: 5,
      maxboostedstep: 10,
      postfix: '%'
    });

    //Spinner with Postfix
  	$('input[name="postfix"]').TouchSpin({
      min: 0,
      max: 100,
      step: 0.1,
      decimals: 2,
      boostat: 5,
      maxboostedstep: 10,
      postfix: '%'
    });

  	//Spinner with Prefix
   	$("input[name='prefix']").TouchSpin({
      min: -1000000000,
      max: 1000000000,
      stepinterval: 50,
      maxboostedstep: 10000000,
      prefix: '$'
    });  	

    //Vertical Spinner
   	$("input[name='vertical']").TouchSpin({
      verticalbuttons: true,
    });

    //Spinner init with empty value
		$("input[name='empty']").TouchSpin();

	 	//Spinner with init value
	 	$("input[name='init']").TouchSpin({
      initval: 40
    });

	 	//Small spinner
		$("input[name='sm-spinner']").TouchSpin({
			postfix: "a button",
      postfix_extraclass: "btn btn-secondary btn-sm"
		});

		//Large spinner
		$("input[name='lg-spinner']").TouchSpin({
			postfix: "a button",
      postfix_extraclass: "btn btn-secondary btn-lg"
		});

		//Button group spinner
		$("input[name='btn-group-spinner']").TouchSpin({
			prefix: "pre",
      postfix: "post"
		});

		//Change spinner button class
		$("input[name='btn-class']").TouchSpin({
			buttondown_class: "btn btn-primary",
      buttonup_class: "btn btn-primary"
		});
	};

  return App;
})(App || {});
