const express=require('express');
const route=express.Router();
const schemas=require('../branch_modules/sch_KBK_GBR.js');

///////////////////
/*route.use(function timeLog(req, res, next) {
  //console.log('Test: ', Date.now());
  next();
});*/

///////////////////
route.get('/',function(req,res){
	res.render('./index.html',{code:'0'});
});
route.get('/TEST1',function(req,res){
	res.render('./nd_meth_test1.html',{code:'TEST1',method:'ND_METH_TEST1'});
});
route.get('/TEST2',function(req,res){
	res.render('./nd_meth_test2.html',{code:'TEST2',method:'ND_METH_TEST2'});
});
route.get('/TEST3',function(req,res){
	res.render('./nd_meth_test3.html',{code:'TEST3',method:'ND_METH_TEST3'});
});
route.get('/TEST4',function(req,res){
	res.render('./nd_meth_test4.html',{code:'TEST4',method:'ND_METH_TEST4'});
});

route.get('/nodeSchemas',function(req,res){
	res.render('./nodeSchemas.html',{schemas:schemas});
});

///////////////////
module.exports=route;