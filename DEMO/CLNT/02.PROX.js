////////////////////////
const rootDir=process.rootDir='/home/bfsadm/gbranch/GATE/';
const cf=require(rootDir+'DATA/cf.js');
const ut=require(rootDir+'DATA/ut.js');
//const watcher=require(rootDir+'DATA/watcher.js');

//watcher.runStatis();
//watcher.appSender();

////////////////////////
const express=require('express');
const http=require('http');
const cors=require('cors');
const cluster=require('cluster');//cpu 코어 수 대로 프로세스 생성하기
const cpuN=require('os').cpus().length;//코어숫자
const conTypes=['GET','POST','WS'];


////////////////////////
//const querystring=require('querystring');
const conBranch=require("./branch_modules/conBranch.js");//클라이언트시뮬레이터


const port=1650;
const headerGet=(header,keyName)=>{
  if(Array.isArray(header)){
    let findFlag=false;
    for(let n in header){
      let value=header[n];
      if(findFlag){
        return value;
      }
      if(value==keyName){
        findFlag=true;
      }
    }
  }
};




///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const run=()=>{
  const app=express();
  app.use(cors());

  ///////////////////////////////
  app.get('/VMP4iLpNSTKxgxXm6sNgtF62a.txt',(req,res)=>{
    res.send('okE7S43o0r6eh33hPvbNuuNB6');
  });

  ///////////////////////////////
  app.get('/',(req,res)=>{

    //console.log(req);
    //console.log(req.url);
    //console.log(req.query);
    //console.log(req.rawHeaders);

    //watcher.addContact();//접속통계

    let sendingData=req.query;

    let userAgent=apiKey=refererURL='';
    let refererFlag=apiKeyFlag=false;

    userAgent=headerGet(req.rawHeaders,'User-Agent');
    apiKey=headerGet(req.rawHeaders,'apiKey');
    refererURL=headerGet(req.rawHeaders,'Referer');

    if(refererURL){
      if(refererURL.indexOf('.nodebreaker.link:')>=0
        && refererURL.indexOf('.nodebreaker.link:')<=15) refererFlag=true;
    }
    if(apiKey){
      if(String(apiKey).length==36) apiKeyFlag=true;
    }

    //console.log('\r\n= User-Agent:',userAgent);
        //Mozilla/5.0 (Linux; Android 11; SM-N971N) AppleWebKit/537.36 (KHTML, like Gecko) //android chrome
        //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) //desktop chrome
        //Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) //desktop Edge
    //console.log('= Referer:',refererFlag,refererURL);
        //android-app://com.google.android.gm/ //android gmail
    //console.log('= apiKey:',apiKeyFlag,apiKey);


    //if(refererFlag>=0 || apiKeyFlag>0 || !apiKey && !refererURL && req.query.dev=='ok'){

      if(req.query.info=='schemas'){
        const schemas=require('./branch_modules/sch_KBK_GBR.js');
        res.send({
          "flag":true,
          "sendingData":sendingData,
          "rspData":{"schemas":schemas}
        });

      }
      else{

        //conBranch.WS(req.query,(rspData)=>{
        conBranch.POST(req.query,(rspData)=>{

          //console.log('sendingData',sendingData);
          //console.log('rspData',rspData);

          res.setHeader('Content-Type','application/json');
          res.send({
            "flag":true,
            "sendingData":sendingData,
            "rspData":rspData
          });

        });

      }

    /*}
    else{
        res.setHeader('Content-Type','application/json');
        res.send({
          "flag":false,
          "refererURL":refererURL
        });
    }*/

  });
  ///////////////////////////////
  app.listen(port,()=>{
    console.log('Proxy server on',port);
  });
}



//////////////////////////////
//////////////////////////////
//CPU 코어수 만큼 프로세스를 복수 생성한다.
const clusterRun=()=>{
  cluster.schedulingPolicy=cluster.SCHED_RR;//Round Robin//순차적으로 할당한다.
  if(cluster.isMaster){

    for(let i=0;i<cpuN;i++) cluster.fork();

    ///////////////////////////////////
    console.log('\r\n\r\n\r\n\r\nHost cluster on',cpuN,'CPU');
    cluster.on('exit',()=>{console.log('worker',process.pid,'is off.');});

  }
  else{
    run();
  }
}

/////////////////////
run();