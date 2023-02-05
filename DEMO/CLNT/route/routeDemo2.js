const express=require('express');
const route=express.Router();

///////////////////
/*route.use(function timeLog(req, res, next) {
  //console.log('Demo: ', Date.now());
  next();
});*/

///////////////////
route.get('/',function(req,res){
	res.render('./index.html',{name:'index'});
});
///////////
route.get('/mb_search',function(req,res){
	res.render('./mb_search.html',{url:'mb_search'});
});
route.get('/mb_reward',function(req,res){
	res.render('./mb_reward.html',{name:'mb_reward'});
});
///////////
route.get('/kb_qrCode',function(req,res){
	res.render('./kb_qrCode.html',{name:'kb_qrCode'});
});
route.get('/qrcode',function(req,res){
	res.render('./kb_account.html',{name:'kb_account'});
});
///////////
route.get('/kb_account',function(req,res){
	res.render('./kb_account.html',{name:'kb_account'});
});
route.get('/kb_deposit',function(req,res){
	res.render('./kb_deposit.html',{name:'kb_deposit',QG:req.query});
});
route.get('/kb_transfer',function(req,res){
	res.render('./kb_transfer.html',{name:'kb_transfer',QG:req.query});
});
route.get('/kb_card',function(req,res){
	res.render('./kb_card.html',{name:'kb_card'});
});
route.get('/kb_test',function(req,res){
	res.render('./kb_setting.html', {name:'kb_test'});
});
route.get('/kb_authority',function(req,res){
	res.render('./kb_authority.html', {name:'kb_authority'});
});
route.get('/kb_user',function(req,res){
	res.render('./kb_user.html', {name:'kb_user'});
});



///////////
route.get('/ex_register',function(req,res){
	res.render('./ex_register.html',{name:'ex_register'});
});

///////////////////
module.exports=route;