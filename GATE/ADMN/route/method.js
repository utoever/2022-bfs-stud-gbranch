////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
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
route.get('/',function(req,res){
  res.redirect(301,'/method/schema');
  //res.send(ut.dlr('/method/schema'));
});

///////////////////
route.get('/schema',function(req,res){
  const {callMth}=require(rootDir+'DATA/mths.js');
  saveLogPos({userKy:sess.userKy,pos:'/method/schema'});

  res.render('./methodSchema.html',{
    sess:sess,
    dir:'method',
    src:'schema',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps,
    mths:callMth()
  });
});

///////////////////
route.get('/log',function(req,res){
  saveLogPos({userKy:sess.userKy,pos:'/method/log'});

  res.render('./methodLog.html',{
    sess:sess,
    dir:'method',
    src:'log',
    GQ:ut.GQtrust(req.query),
    cfg:process.cfg,
    apps:apps,
    appNmToMth:process.cfg.appNmToMth
  });
});

///////////////////
module.exports=route;