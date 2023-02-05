const express=require('express');
const route=express.Router();

///////////////////
route.use(function timeLog(req, res, next) {
  console.log('Test Time: ', Date.now());
  next();
});

///////////////////
route.get('/',function(req,res){
	res.render('./index.html',{code:'0'});
});
route.get('/node1100',function(req,res){
	res.render('./node1100.html',{code:'1100'});
});
route.get('/node111',function(req,res){
	res.render('./node111.html',{code:'111'});
});
route.get('/node121',function(req,res){
	res.render('./node121.html',{code:'121'});
});
route.get('/node141',function(req,res){
	res.render('./node141.html',{code:'141'});
});
route.get('/node241',function(req,res){
	res.render('./node241.html',{code:'241'});
});
route.get('/node341',function(req,res){
	res.render('./node341.html',{code:'341'});
});
route.get('/node541',function(req,res){
	res.render('./node541.html',{code:'541'});
});

///////////////////
module.exports=route;