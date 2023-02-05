//A.외부모둘, 상속
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//거의 모든 앱이 공통적으로 사용하는 모듈들이다.
//여기에 언급된 모듈들은 반드시 물리서버마다 동일한 복사본을 만들어두어야 한다.
//테스트 버전에서는 DATA 디렉토리에 모아두었다.
/*
const rootDir=process.rootDir='/home/ec2-user/gbranch/GATE/';
const cf=require(rootDir+'DATA/cf.js');
const ut=require(rootDir+'DATA/ut.js');
const watcher=require(rootDir+'DATA/watcher.js');


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
//const http=require('https');
const fs=require('fs');
const express=require('express');
//const helmet=require('helmet');
const cors=require('cors');
const cookie=require('cookie-parser');
/*const opt={
  key:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.key.pem').toString(),
  cert:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.crt.pem').toString(),
  ca:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.ca-bundle.pem').toString(),
  //secureProtocol: "TLSv1_2_method",
  minVersion:"TLSv1.3"
};*/
//console.log(opt);


/*
const tls = require('tls');
const tSoc=new tls.TLSSocket();
console.log(tSoc.getProtocol());
console.log(tls.getCiphers());

try {
  if(tls.DEFAULT_CIPHERS) console.log('tls support ok!');
  console.log(tls.DEFAULT_CIPHERS);
} catch (err) {
  console.log('tls support is disabled!');
}*/



//B.지역모듈, 기본설정, 전역변수
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//watcher 기본함수 실행
/*
watcher.runStatis();
watcher.appSender();

////////////////////////서버세팅
const appAdm=express();
const portAdm=1900;

////////////////////////
//appAdm.use(helmet());
appAdm.use(cookie());
appAdm.use(express.json());
appAdm.use(express.urlencoded({extended:false}));
appAdm.use(express.static(__dirname+'/public'));
appAdm.use('/origin',express.static(__dirname+'/origin'));

////////////////////////
appAdm.set('views', __dirname+'/view');
appAdm.set('view engine','ejs');
appAdm.engine('html',require('ejs').renderFile);





//C.콘트롤어드민
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
appAdm.use((req,res,next)=>{
  watcher.addContact();//접속통계
  next();
});

appAdm.use(cors());

appAdm.get('/test', (req, res) => {
	res.status(200).send('adm server response')
});
appAdm.get('/',(req,res)=>{//리다이렉팅
  res.redirect(301,'/stat/panel');
});

////////////////////////서버인증샘플
appAdm.get('/nb/fvfoanSLF4okfjoW5AFNLV81648371517183.txt',(req,res)=>{//서버인증샘플
  res.send('icnaodSK3rojgp5bcxvml4kFJal');
});
appAdm.get('/nb/fvfoanSLF4okfjoW5AFNLV81648371325464.txt',(req,res)=>{//서버인증샘플
  res.send('icnaodSK3rojgp5bcxvml4kFJal');
});
appAdm.get('/nb/fvfoanSLF4okfjoW5AFNLV81648372557368.txt',(req,res)=>{//서버인증샘플
  res.send('icnaodSK3rojgp5bcxvml4kFJal');
});

////////////////////////기본라우터
appAdm.use('/on',require('./route/on'));
appAdm.use('/ajax',require('./route/ajax'));
appAdm.use('/co',require('./route/co'));

////////////////////////페이징메뉴라우터
appAdm.use('/stat',require('./route/stat'));
appAdm.use('/control',require('./route/control'));
appAdm.use('/method',require('./route/method'));

////////////////////////에러표시
appAdm.all('*',(req,res)=>{
  res.render('./onError.html',{code:'404',str:'주소 오류 : 잘못된 주소입니다.',msg:req.url});
});
appAdm.use((err,req,res,next)=>{
  res.render('./onError.html',{code:'000',str:'예상치 못한 에러입니다.',msg:err.stack});
});

////////////////////////
appAdm.listen(portAdm,()=>{
  console.log("Admin server on ",portAdm)
});

/*httpsServer=http.createServer(opt,appAdm);
httpsServer.listen(portAdm,()=>{
  console.log("Admin server on ",portAdm)
});*/


////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////

const express = require('express')
const app = express();

app.get('/test', (req, res) => {
	console.log(req.query)
	res.status(200).send('gb server response')
})

app.listen(5252, (req, res) => {
	console.log('gb server')
})

