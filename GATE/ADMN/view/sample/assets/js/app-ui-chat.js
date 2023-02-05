/*!
 * Amaretti v2.0.1-prerelease
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */

var App = (function () {
    'use strict';
    
    App.uiChat = function( ){
      var ps_page_chat_scroll;
      var ps_page_messages_scroll;

      function initPageChat(){
        ps_page_chat_scroll = App.scroller.initScroller($(".am-scroller-page-chat"));
        ps_page_messages_scroll = App.scroller.initScroller($(".am-scroller-page-messages"));    

        $(window).resize(function () {
          waitForFinalEvent(function(){
            App.scroller.updateScroller(ps_page_chat_scroll);
            App.scroller.updateScroller(ps_page_messages_scroll);
          }, 500);
        });
      }

      initPageChat();
    };
  
    return App;
  })(App || {});
  