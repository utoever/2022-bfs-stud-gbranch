////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
const {saveLogPos}=require(rootDir+'ADMN/controller/logData.js');
let sess={};

///////////////////
const express=require('express');
const route=express.Router();


///////////////////
route.use((req,res,next)=>{
  const {authCo}=require(rootDir+'ADMN/controller/ctrAuth.js');
  authCo(req,res,(user)=>{
    sess=user;
    next();
  });
});


///////////////////
route.get('/',(req,res)=>{
  res.redirect(301,'/co/auth');
  //res.send(ut.dlr('/co/auth'));
});

///////////////////
route.get('/auth',function(req,res){
  const {coInfo}=require(rootDir+'ADMN/controller/ctrCo.js');
  saveLogPos({userKy:sess.userKy,pos:'/co/auth'});

  res.render('./coAuth.html',{
    sess:sess,
    coInfo:coInfo(sess.userKy)[0][0],
    dir:'co',
    src:'auth',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
  });
});

///////////////////
route.get('/manual',function(req,res){
  saveLogPos({userKy:sess.userKy,pos:'/co/manual'});

  res.render('./coManual.html',{
    sess:sess,
    dir:'co',
    src:'manual',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
  });
});

///////////////////
module.exports=route;