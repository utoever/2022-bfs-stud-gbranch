const express=require('express');
const route=express.Router();

///////////////////
route.use(function timeLog(req, res, next) {
  console.log('Demo Time: ', Date.now());
  next();
});

///////////////////
route.get('/',function(req,res){
	res.render('./_index.html',{name:'index'});
});
route.get('/mb_search',function(req,res){
	res.render('./_mb_search.html',{url:'mb_search'});
});
route.get('/mb_reward',function(req,res){
	res.render('./_mb_reward.html',{name:'mb_reward'});
});
route.get('/kb_qrCode',function(req,res){
	res.render('./_kb_qrCode.html',{name:'kb_qrCode'});
});
route.get('/kb_account',function(req,res){
	res.render('./_kb_account.html',{name:'kb_account'});
});
route.get('/kb_deposit',function(req,res){
	res.render('./_kb_deposit.html',{name:'kb_deposit'});
});
route.get('/kb_transfer',function(req,res){
	res.render('./_kb_transfer.html',{name:'kb_transfer'});
});
route.get('/kb_card',function(req,res){
	res.render('./_kb_card.html',{name:'kb_card'});
});
route.get('/ex_register',function(req,res){
	res.render('./_ex_register.html',{name:'ex_register'});
});

///////////////////
module.exports=route;