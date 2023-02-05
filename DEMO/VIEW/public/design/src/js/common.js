/*const screen1600=window.matchMedia("screen and (max-width: 1600px)");
const screen1024=window.matchMedia("screen and (max-width: 1024px)");
const screen768=window.matchMedia("screen and (max-width: 768px)");*/

const menuCloseAct=()=>{
  $('main').css('padding','40px 50px');
  $('nav').css('width','84px');

  //$('.user').css('margin-bottom','80px');
  $('.close-button').css('display','none');
  $('.menu-button').css('display','block');

  $('.user-greet').css('display','none');
  $('.user-menu>.title').css('display','none');
  $('.sub-menu').css('display','none');
  $('.user-menu-text').css('display','none');
  $('.menu-divide').css('display','none');
  $('.menu-input').css('display','none');

  $('.menu-tap').css('display','none');
  $('.menu-list').css('display','none');

  $('nav hr').css('width','20px');
  $('footer').css('padding','0 50px');

  $('main').css('left','84px');
  $('main').css('width','calc(100% - 84px)');
}

const menuAct=()=>{
  $('main').css('padding','40px 50px');
  $('nav').css('width','295px');

  $('.user').css('margin-bottom','0');
  $('.close-button').css('display','block');
  $('.menu-button').css('display','none');

  $('.user-greet').css('display','flex');
  $('.user-menu>.title').css('display','block');
  $('.sub-menu').css('display','block');
  $('.user-menu-text').css('display','block');
  $('.menu-divide').css('display','block');
  $('.menu-input').css('display','block');

  $('.menu-tap').css('display','block');
  $('.menu-list').css('display','block');

  $('nav hr').css('width','295px');
  $('footer').css('padding','0 50px');

  $('main').css('padding','40px 50px');
  $('main').css('left','295px');
  $('main').css('width','calc(100% - 295px)');
}

setTimeout(()=>{
  $('.menu-button').click(function(e){
    menuAct();
  })
  $('.close-button').click(function(e){
    menuCloseAct();
  });
  //menuCloseAct();
  menuAct();
},200);