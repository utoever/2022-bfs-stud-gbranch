////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
const {callCf}=require(rootDir+'DATA/cf.js');
const {saveLogPos}=require(rootDir+'ADMN/controller/logData.js');

let sess={};
let apps=process.cfg.appRunMach;
//console.log(apps);

///////////////////
const express=require('express');
const route=express.Router();


///////////////////
route.use((req,res,next)=>{
  //console.log(req);
  const {authBlock}=require(rootDir+'ADMN/controller/ctrAuth.js');
  authBlock(req,res,(user)=>{
    //console.log(user);
    sess=user;
    next();
  });
});

///////////////////
route.get('/',function(req,res){
  res.redirect(301,'/stat/panel');
  //res.send(ut.dlr('/stat/panel'));
});

///////////////////
route.get('/panel',function(req,res){
  const {coList}=require(rootDir+'ADMN/controller/ctrCo.js');
  saveLogPos({userKy:sess.userKy,pos:'/stat/panel'});

  res.render('./statPanel.html',{
    sess:sess,
    dir:'stat',
    src:'panel',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps,
    coList:coList()[0]
  });
});

///////////////////
route.get('/arrange',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/stat/arrange'});

  res.render('./statArrange.html',{
    sess:sess,
    dir:'stat',
    src:'arrange',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg
  });
});

///////////////////
route.get('/server',(req,res)=>{
  saveLogPos({userKy:sess.userKy,pos:'/stat/server'});

  res.render('./statServer.html',{
    sess:sess,
    dir:'stat',
    src:'server',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps,
    appNmToMth:process.cfg.appNmToMth
  });
});

///////////////////
route.get('/condition',function(req,res){
  saveLogPos({userKy:sess.userKy,pos:'/stat/condition'});

  res.render('./statCondition.html',{
    sess:sess,
    dir:'stat',
    src:'condition',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps
  });
});

///////////////////
route.get('/alert',function(req,res){
  const {list}=require(rootDir+'ADMN/controller/logAlert.js');
  saveLogPos({userKy:sess.userKy,pos:'/stat/alert'});
  //console.log(list());

  res.render('./statAlert.html',{
    sess:sess,
    dir:'stat',
    src:'alert',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps,
    appNmToMth:process.cfg.appNmToMth,
    list:list()
  });
});










///////////////////
///////////////////
///////////////////
///////////////////
route.get('/machine',function(req,res){
  res.render('./statMachine.html',{dir:'stat',src:'machine'});
});
///////////////////
module.exports=route;

/*
Object.keys(object)
Object.assign(object,object2)
*/