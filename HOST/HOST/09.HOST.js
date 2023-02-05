//A.외부모둘, 상속
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//거의 모든 앱이 공통적으로 사용하는 모듈들이다.
//여기에 언급된 모듈들은 반드시 물리서버마다 동일한 복사본을 만들어두어야 한다.
//테스트 버전에서는 DATA 디렉토리에 모아두었다.
const rootDir=process.rootDir='/home/bfsadm/gbranch/HOST/';
require('/home/bfsadm/gbranch/config/env.js');
const cf=require(rootDir+'DATA/cf.js');
const ut=require(rootDir+'DATA/ut.js');
//const watcher=require(rootDir+'DATA/watcher.js');


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const http=require('http');
const url=require('url');//httpGet
const querystring=require('querystring');//httpGet
const net=require('net');//tcpSocket
const ws=require('ws');//webSocket
const cluster=require('cluster');//cpu 코어 수 대로 프로세스 생성하기
const cpuN=require('os').cpus().length;//코어숫자





//B.지역모듈, 기본설정, 전역변수
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const delayPulse=50;//랜덤최대길이에 따라 퍼포먼스에 많은 차이가 있다.
const delayFlag=cf.cfg.conf.debug.rdResHost;//랜덤 지연시키기
const conMsg=cf.cfg.conf.debug.conMsg;//콘솔에 접속내용 표시하기//메모리가 증가하므로 프로덕션 단계에서는 설정값에서 꺼야 한다.

//watcher 기본함수 실행
//watcher.runStatis();
//watcher.appSender();
let apps={};
let conSize=0;






//C.호스트
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const method1=(method,port)=>{
  apps[method]=http.createServer((req,res)=>{

    let body='';
    conSize++;
    //watcher.addContact();//접속통계

    req.on('data',(chunk)=>{
      body+=chunk;
    });

    req.on('end',()=>{
      let data={};
      try{
        data=JSON.parse(body.toString());
        data.flag=true;
        data.codeHost=method;
        data.connectHostType='httpPost_hostMsg';
      }catch{}

      data.method=method;
      //console.log(data);
      if(conMsg) console.log('5# biznes ##### hostsv',data.key,ut.substrEnd(data.method,2));

      //if(1){
      if(delayFlag){
        let delay=ut.rdMaker(delayPulse);
        setTimeout(()=>{
          res.writeHead(200,{'Content-Type':'text/html'});
          res.end(JSON.stringify(data));
          conSize--;
        },delay);
        //},1000*10);
      }
      else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(JSON.stringify(data));
        conSize--;
      }

    });
  });

  apps[method].listen(port,()=>{
    console.log('Host server on',port,method,'httpPOST');
  });
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const method2=(method,port)=>{
  apps[method]=http.createServer((req,res)=>{

    let data={};
    conSize++;
    //watcher.addContact();//접속통계
    let querys=url.parse(req.url).query;
    //console.log(querys);

    try{
      data=data=querystring.parse(querys,'&','=');
      data.flag=true;
      data.codeHost=method;
      data.connectHostType='httpGet_hostMsg';
    }catch{}

    data.method=method;
    //console.log(data);
    if(Number(conMsg)) console.log('5# biznes ##### hostsv',data.key,ut.substrEnd(data.method,2));

    if(delayFlag){
      let delay=ut.rdMaker(delayPulse);
      setTimeout(()=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(JSON.stringify(data));
        conSize--;
      },delay);
    }
    else{
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(JSON.stringify(data));
      conSize--;
    }

  });

  apps[method].listen(port,()=>{
    console.log('Host server on',port,method,'httpGET');
  });
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const method3=(method,port)=>{
  apps[method]=new net.Server();

  apps[method].on('connection',(soc)=>{
    let data={};
    conSize++;
    //watcher.addContact();//접속통계

    soc.on('data',(msg)=>{

      try{
        data=JSON.parse(msg.toString());
        data.flag=true;
        data.codeHost=method;
        data.connectHostType='tcpSocket_hostMsg';
      }catch{}

      data.method=method;
      //console.log('return',data);
      if(conMsg) console.log('5# biznes ##### hostsv',data.key,ut.substrEnd(data.method,2));

      if(delayFlag){
        let delay=ut.rdMaker(delayPulse);
        setTimeout(()=>{
          soc.write(JSON.stringify(data));
          soc.end();//반드시 닫아야한다.
          conSize--;
        },delay);
      }
      else{
        soc.write(JSON.stringify(data));
        soc.end();//반드시 닫아야한다.
        conSize--;
      }

      //try{a.push(1);}catch(e){console.error(e)}//에러발생테스트
    });
  });

  apps[method].listen(port,()=>{
    console.log('Host server on',port,method,'tcpSocket');
  });
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const method4=(method,port)=>{
  apps[method]=new ws.WebSocketServer({port:port});

  apps[method].on('connection',(ws)=>{
    let data={};
    conSize++;
    //watcher.addContact();//접속통계

    ws.on('message',(msg)=>{

      try{
        data=JSON.parse(msg.toString());
        data.flag=true;
        data.codeHost=method;
        data.connectHostType='webSocket_hostMsg';
      }catch{}

      data.method=method;
      //console.log('return',data);
      if(conMsg) console.log('5# biznes ##### hostsv',data.key,ut.substrEnd(data.method,2));

      if(delayFlag){
        let delay=ut.rdMaker(delayPulse);
        setTimeout(()=>{
          ws.send(JSON.stringify(data));
          conSize--;
        },delay);
      }
      else{
        ws.send(JSON.stringify(data));
        conSize--;
      }

      //try{let a=JSON.parse('{]');}catch(e){console.error(e)}//에러발생테스트
    });
  });

  console.log('Host server on',port,method,'webSocket');
}

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const eaiMethod=(method,port)=>{

  //console.log('method', method);

  apps[method]=new net.Server();

  apps[method].on('connection',(soc)=>{
    let data={};
    conSize++;
    //watcher.addContact();//접속통계

    soc.on('end', function() {
      console.log('Biz Server disconnected');
    });

    soc.on('error', function(err) {
      console.log('Socket Error: ', JSON.stringify(err));
    });

    soc.on('data',(msg)=>{

      try{        
        data=JSON.parse(msg.toString());
        data.flag=true;
        data.codeHost=method;
        data.connectHostType='tcpSocket_hostMsg';
      }catch(e){
        console.error(e);
      }

      data.method=method;
      console.log('return :: ',data);

      if(conMsg) console.log('5# biznes ##### hostsv',data.key,ut.substrEnd(data.method,2));

      if(delayFlag){
        let delay=ut.rdMaker(delayPulse);
        setTimeout(()=>{
          soc.write(JSON.stringify(data));
          soc.end();//반드시 닫아야한다.
          conSize--;
        },delay);
      }
      else{
        soc.write(JSON.stringify(data));
        soc.end();//반드시 닫아야한다.
        conSize--;
      }

      //try{a.push(1);}catch(e){console.error(e)}//에러발생테스트
    });
  });

  apps[method].listen(port,()=>{
    console.log('Host server on',port,method,'tcpSocket');
  });
}


///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const run=()=>{

  for(let method in cf.cfg.apps.bizs){
    let biz=cf.cfg.apps.bizs[method];    
    let port=biz.host.port;

    switch(method) {
      // 리브고객정보조회
      case 'KFK120B440':
        //SOC eai
        eaiMethod(method,port);
        break;

      // KB스타뱅킹가입내용조회
      case 'KFK124DG40':
      // 고객정보번호조회
      case 'KFK124CF40':
      // 개인고객카드정보조회
      case 'KAA04K0C41':
      // KB인증서정보역거래조회
      case 'BFA72C32SC':
        console.log('already server on ',port,method);
        break;
      default:
        console.log('no server',port,method);
        break;
    }
  }

  /*setInterval(()=>{
    if(conSize<0){
      conSize=0;
    }
    console.log(conSize,'works');
    //conSize=0;
  },1000*5);*/

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
