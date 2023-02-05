///////////////////////////////////
const ut=require(process.rootDir+"DATA/ut.js");//utility
const cf=require(process.rootDir+'DATA/cf.js');//설정파일
const lg=console.log;
const conMsg=cf.cfg.conf.debug.conMsg;//콘솔에 접속내용 표시하기//메모리가 증가하므로 프로덕션 단계에서는 설정값에서 꺼야 한다.
//const conMsg=true;//콘솔에 접속내용 표시하기//메모리가 증가하므로 프로덕션 단계에서는 설정값에서 꺼야 한다.
//lg(conMsg);


//////////////
const conBranchWS=(data,fnc)=>{//ws

  const ws=require('ws');

  data.dbg=0;
  data.conType='WS';
  data.host='10.141.32.52';
  data.port='1950';
  data.key=ut.rdCharMaker(10);
  data.apiKey='VMP4iLpNSTKxgxXm6sNgtF62a1651703470979_okE7S43o0r6eh33hPvbNuuNB6';


  let rsoc=new ws(
    //'ws://localhost:950/'
    'ws://'+data.host+':'+data.port+'/'
    +data.method+"/"
    +data.key+"/"
    +data.conType+"/"
    //+data.apiKey
    +"?dbg="+data.dbg
    ,{headers:{
      //"Authorization":"JWT "+token
      "Authorization":"APIkey "+data.apiKey
    }}
  );
  //lg(rsoc);

  rsoc.on("open",()=>{
    //lg(data);
    rsoc.send(JSON.stringify(data));
    if(conMsg) lg('1. prox-y >>>>> gatewy',data.key,ut.substrEnd(data.method,2));
  });

  rsoc.on("message",(msg)=>{
    let rData=JSON.parse(msg.toString());
    data.auth=true;
    if(typeof fnc==='function') fnc(rData);
    rsoc.close();
  });

  rsoc.on('close',()=>{
    if(conMsg) lg('9. prox-y <<<<X gatewy',data.key,ut.substrEnd(data.method,2));
    if(!data.auth && typeof fnc==='function') fnc(data);
  });

  rsoc.on('error',(e)=>{
    if(conMsg) lg('0. prox-y XXXXX 22busy',data.key,ut.substrEnd(data.method,2));
    //lg(e);
    rsoc.close();
  });
}

//////////////

const conBranchPOST=(data,fnc)=>{//post

  const http = require('http');
  //const querystring = require('querystring');

  data.dbg=0;
  data.conType='POST';
  data.host='10.141.32.52';
  data.port='1950';
  data.key=ut.rdCharMaker(10);
  data.apiKey='VMP4iLpNSTKxgxXm6sNgtF62a1651703470979_okE7S43o0r6eh33hPvbNuuNB6';
  //lg(data);

  const opts = {
    host: data.host,//http://생략
    port: data.port,
    method: data.conType,
    path: '/'
    +data.method+"/"
    +data.key+"/"
    +data.conType+"/"
    //+data.apiKey
    +"?dbg="+data.dbg,
    headers: {
      'Content-Type':'application/json',
      "Authorization":"APIkey "+data.apiKey
    }
  };

  let resData = '';
  const client = http.request(opts,(res)=>{
    res.on('data',(chunk)=>{
      resData += chunk;
    });
    res.on('end',()=>{
      try{
        resData=JSON.parse(resData);
      }catch{};
      if(typeof fnc ==='function'){
        fnc(resData);
        if(conMsg) lg('9. prox-y <<<<X gatewy',data.key,ut.substrEnd(data.method,2));
      }
    });
  });

  client.data = JSON.stringify(data);
  //파일과 같이 큰 데이터를 보낼 때에는 반드시 필요하다
  opts.headers['Content-Length'] = client.data.length;

  client.write(client.data);
  if(conMsg) lg('1. prox-y >>>>> gatewy',data.key,ut.substrEnd(data.method,2));
  client.end();
  //lg(data);
}

module.exports={
  WS:conBranchWS,
  POST:conBranchPOST
};