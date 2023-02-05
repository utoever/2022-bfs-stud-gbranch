////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
const {callCf,originCf}=require(rootDir+'DATA/cf.js');
const {saveLogPos}=require(rootDir+'ADMN/controller/logData.js');

let sess={};
let apps=process.cfg.appRunMach;
//console.log(apps);

///////////////////
const express=require('express');
const route=express.Router();


///////////////////
route.use((req,res,next)=>{
  const {authBlock}=require(rootDir+'ADMN/controller/ctrAuth.js');
  authBlock(req,res,(user)=>{
    sess=user;
    next();
  });
});

///////////////////
route.get('/',(req,res)=>{
  res.redirect(301,'/control/config');
  //res.send(ut.dlr('/control/config'));
});

///////////////////
route.get('/config',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/control/config'});

  res.render('./controlConfig.html',{
    sess:sess,
    dir:'control',
    src:'config',
    GQ:ut.GQtrust(req.query),
    cfg:callCf(),
    originCf:originCf()
  });
});

///////////////////
route.get('/company',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/control/company'});

  res.render('./controlCompany.html',{
    sess:sess,
    dir:'control',
    src:'company',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg
  });
});

route.get('/admin',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/control/admin'});

  res.render('./controlAdmin.html',{
    sess:sess,
    dir:'control',
    src:'admin',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg
  });
});

route.get('/memo',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/control/memo'});

  res.render('./controlMemo.html',{
    sess:sess,
    dir:'control',
    src:'memo',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg
  });
});

route.get('/manual',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/control/manual'});

  res.render('./controlManual.html',{
    sess:sess,
    dir:'control',
    src:'manual',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg
  });
});
///////////////////
module.exports=route;