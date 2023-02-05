////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
let sess={userDiv:'',userName:'비회원'};

///////////////////
const express=require('express');
const route=express.Router();

///////////////////
const {authRes}=require(rootDir+'ADMN/controller/ctrAuth.js');

///////////////////
route.get('/',function(req,res){
  res.redirect(301,'/stat/panel');
  //res.send(ut.dlr('/'));
});


///////////////////
route.get('/login',function(req,res){
  res.send(ut.dlr('/on/login/000'));
});
route.get('/login/:code',function(req,res){
  const errData={
    '000':{str:'정상 접근',msg:''},
    '101':{str:'무단 접근',msg:'회원 로그인이 필요한 페이지입니다.'},
    '105':{str:'기한 초과',msg:'로그인이 필요합니다.'},
    '109':{str:'권한 오류',msg:'로그인에 필요한 권한을 확인하지 못했습니다.'},
  };
  res.render('./onLogin.html',{code:req.params.code,str:errData[req.params.code].str,msg:errData[req.params.code].msg});
});

///////////////////
route.get('/error',function(req,res){
  res.render('./onError.html',{dir:'on',src:'error'});
});
route.get('/error/:code',function(req,res){
  const errData={
    '401':{str:'권한 없음',msg:'사용자 인증에 실패했습니다.'},
    '403':{str:'금지 영역',msg:'사용자 권한이 없습니다.'},
    '404':{str:'주소 오류',msg:'잘못된 주소입니다.'},
    '405':{str:'요청 오류',msg:'잘못된 요청입니다.'},
    '500':{str:'서버 오류',msg:'서버 내부의 오류입니다.'},
  };
  res.render('./onError.html',{code:req.params.code,str:errData[req.params.code].str+' : '+errData[req.params.code].msg,msg:''});
});

///////////////////
route.get('/popup',function(req,res){
  res.render('./onPopup.html',{
    sess:sess,
    dir:'on',
    src:'popup',
    GQ:ut.GQtrust(req.query)
  });
});
route.get('/icons',function(req,res){
  res.render('./onIcons.html',{
    sess:sess,
    dir:'on',
    src:'icons',
    GQ:ut.GQtrust(req.query)
  });
});
route.get('/graphs',function(req,res){
  res.render('./onGraphs.html',{
    sess:sess,
    dir:'on',
    src:'graphs',
    GQ:ut.GQtrust(req.query)
  });
});
route.get('/buttons',function(req,res){
  res.render('./onButtons.html',{
    sess:sess,
    dir:'on',
    src:'buttons',
    GQ:ut.GQtrust(req.query)
  });
});


///////////////////
module.exports=route;