////////////////////////
process.rootDir='/home/bfsadm/gbranch/DEMO/';
const cf=require(process.rootDir+'DATA/cf.js');
//const watcher=require(process.rootDir+'DATA/watcher.js');

//watcher.runStatis();
//watcher.appSender();

////////////////////////
const express=require('express');
const http=require('http');



////////////////////////
const appTest=express();
const portTest=1600;

////////////////////////
appTest.use(express.json());
appTest.use(express.urlencoded({extended:false}));
appTest.use(express.static(__dirname+'/publicTest2'));

////////////////////////
appTest.set('views', __dirname+'/viewTest2');
appTest.set('view engine','ejs');
appTest.engine('html',require('ejs').renderFile);
appTest.use((req,res,next)=>{
  //watcher.addContact();
  next();
});
const routeTest=require('./route/routeTest2');
appTest.use('/',routeTest);

////////////////////////
appTest.listen(portTest,()=>{
    console.log("Test server on ",portTest)
});



////////////////////////
const appDemo=express();
const portDemo=1700;

////////////////////////
appDemo.use(express.json());
appDemo.use(express.urlencoded({extended:false}));
appDemo.use(express.static(__dirname+'/publicDemo2'));

////////////////////////
appDemo.set('views', __dirname+'/viewDemo2');
appDemo.set('view engine','ejs');
appDemo.engine('html',require('ejs').renderFile);
appDemo.use((req,res,next)=>{
  //watcher.addContact();
  next();
});
const routeDemo=require('./route/routeDemo2');
appDemo.use('/',routeDemo);

////////////////////////
appDemo.listen(portDemo,()=>{
    console.log("Demo server on ",portDemo)
});

