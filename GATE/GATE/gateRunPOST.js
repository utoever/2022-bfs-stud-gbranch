//A.외부모둘, 상속
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//거의 모든 앱이 공통적으로 사용하는 모듈들이다.
//여기에 언급된 모듈들은 반드시 물리서버마다 동일한 복사본을 만들어두어야 한다.
//테스트 버전에서는 DATA 디렉토리에 모아두었다.
const rootDir=process.rootDir='/home/bfsadm/gbranch/GATE/';//루트디렉토리설정//물리서버당 한곳씩을 지정해야 한다.
require('/home/bfsadm/gbranch/config/env.js');
const cf=require(rootDir+'DATA/cf.js');//설정파일을 읽어서 기초 설정을 로드한다.
const ut=require(rootDir+'DATA/ut.js');//유틸리티 모듬
const watcher=require(rootDir+'DATA/watcher.js');//관리자를 위한 보고모듈
const log=require(rootDir+'DATA/log.js');//로그기록


///////////////////////////////////node_modules
const lg=console.log;
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const http=require('http');
//const http=require('https');
const ws=require('ws');
const fs=require('fs');
const pooling=require('http-pooling-agent');//허용치를 늘리기 위해서가 아니라, 대량폭주를 막기위한 제한사항이다.
const cluster=require('cluster');//cpu 코어 수 대로 프로세스 생성하기
const cpuN=require('os').cpus().length;//코어숫자
/*const opt={
  key:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.key.pem').toString(),
  cert:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.crt.pem').toString(),
  ca:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.ca-bundle.pem').toString(),
  minVersion: "TLSv1.3"
};*///console.log(opt);


//B.지역모듈, 기본설정, 전역변수
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//const apiKeys=require(rootDir+'GATE/loadApiKeys.js')();
/*{
  apiKey:{cokey:1,coIp:'000.000.000.000'},
  'fvfoanSLF4okfjoW5AFNLV81648371325464_icnaodSK3rojgp5bcxvml4kFJal': { coKy: 6, coIp: '222.108.224.3' }
}*/
const apiKeys={};


//cf로부터 로딩된 설정값들
const conf=cf.cfg.conf;//전체시스템의 기본설정
const apps=cf.cfg.apps;//서버앱들의 목록설정
const datDir=conf.dirs.datDir;//로그데이터 디렉토리///home/nodejs/Nodebreaker/DATA/dat/
const conMsg=cf.cfg.conf.debug.conMsg;//콘솔에 접속내용 표시하기//메모리가 증가하므로 프로덕션 단계에서는 설정값에서 꺼야 한다.
//console.log(conMsg);
//const clusterFlag=false;


/*cf.cfg={
  conf:{},//cfg/conf.json
  appRun:{},//cfg/appRun.json
  apps:{},//cfg/apps.json
  appNmToMth:{},//app name => method
  appMthToNm:{},//app method => name
  appMthToMmo:{},//app method => memo
  appNmToMmo:{},//app name=> memo
}*/


//http,pooling-agent
//const agent=new pooling.Agent({freeSocketsTimeout:5000,maxSockets:10000});//설정하지 않을 경우 최대치로 생성된다.
//const gateServer=http.createServer({agent});//http서버 생성
//const gateServer=http.createServer(opt);
const gateServer=http.createServer();




//watcher 기본함수 실행
watcher.runStatis();//통계수집 시작 (초/분/시간 단위 로그데이터를 집계하고 초단위로 보고한다. 최대 한시간)
watcher.appSender();//앱상태보고 시작 (메모리 상태등 앱 기본정보를 초단위로 보고한다.)





//C.게이트웨이
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
class gateRun{

  //////////
  //header에 포함되어 있는 클라이어트 ip는 "::ffff:222.108.224.3" 과 같은 형태이다.
  //파싱하여 순수한 ip를 반환한다.
  remoteAdd(adrs){//헤더로부터 ip파싱
    let adrss=adrs.split(':');
    let rt=ut.es(adrss[3],/[^0-9\.]/g);//숫자와.을 제외한 문자를 모두 삭제한다.
    return rt;
  }

  //////////
  //현재 연결되어 있는 전체 소켓의 수를 반환한다.
  //전체 유량을 제어하는 데 쓰인다.
  socSize(){//전체유량
    let sn=0;
    /*this.wss.clients.forEach((e,k)=>{
      sn++;
    });*/
    //this.stat.socSize=sn;
    //console.log(this.stat.socSize);
    return sn;
  }

  //////////
  //apiKeys 데이터와 클라이언트 아이피를 대조하기 위한 함수
  //해당 ApiKey를 넣으면, 미리 설정된 아이피를 반환한다.
  authApi(key){//api인증
    /*if(apiKeys[key]){
      return apiKeys[key];
    }
    else return false;*/
	return true;
  }

  //////////
  //헤더에서 원하는 값을 추출한다.
  //head=값에 첨부된 첩두사
  headerGet(header,keyName,head=''){
    if(Array.isArray(header)){
      let findFlag=false;
      for(let n in header){
        let value=header[n];
        if(findFlag){
          if(head){
            let authHeads=value.split(head);
            return authHeads[1];
          }
          else return value;
        }
        if(value==keyName){
          findFlag=true;
        }
      }
    }
  };

  //////////
  resLogWrite(cData,bData,type='R'){
    //console.log(JSON.stringify(cData));
    //로그데이터는 처리 순서에 따라 세번 작성된다. (inLog->outLog->resLog)//용량문제로 현재는 resLog만.
    //각각의 로그에 담는 데이터는 점점 더 추가되므로, outLog가 작성되면, inLog는 필요가 없으므로 지운다.
    //마찬가지로, resLog가 작성되면, inLog와 outLog는 필요없다.
    //ND_METH_TEST4--1646639091648_LNPe2TKqA38pLecvKzlw_R.json (로그파일명 양식)

    let getLogFile=cData.method+'--'+cData.lgTm+'_'+cData.key+'_G.json';
    let bizLogFile=cData.method+'--'+cData.lgTm+'_'+cData.key+'_B.json';
    let resLogFile=cData.method+'--'+cData.lgTm+'_'+cData.key+'_R.json';

    /*watcher.mthSender({//업무처리 통계보고
      key:bData.inputData.key,
      logMthMethod:cData.method,
      logMthDir:this.logDirPath,
      logMthFile:resLogFile,
      //logMthLast:bData
    });*/

    //////////////////////
    if(type=='G'){
      let getLogData={};

      try{//불필요한 로그데이터를 삭제한다.//로그데이터 용량을 줄여야 메모리 부하를 막을 수 있다.
        getLogData=ut.deepCp(cData);//비참조복사
        getLogData.apiKey='XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        getLogData.gteLog=this.logDirPath+getLogFile;
        if(getLogData.inputData) delete getLogData.inputData;
      }catch{}

      //로그데이터를 저장한다.
      log.saveLog(
        this.logDirPath,
        getLogFile,
        JSON.stringify(getLogData,null,2),
        (index)=>{}
      );

      return this.logDirPath+getLogFile;
    }

    //////////////////////
    else if(type=='B'){
      let bizLogData={};

      try{//불필요한 로그데이터를 삭제한다.//로그데이터 용량을 줄여야 메모리 부하를 막을 수 있다.
        bizLogData=ut.deepCp(bData);//비참조복사
        bizLogData.customData.bizLog=this.logDirPath+bizLogFile;
        if(bizLogData.msg.codeHost) delete bizLogData.msg.codeHost;
        if(bizLogData.msg.connectHostType) delete bizLogData.msg.connectHostType;
        if(bizLogData.inputData) delete bizLogData.inputData;
        if(bizLogData.outputData) delete bizLogData.outputData;
        if(bizLogData.customData.target) delete bizLogData.customData.target;
      }catch{}

      //로그데이터를 저장한다.
      log.saveLog(
        this.logDirPath,
        bizLogFile,
        JSON.stringify(bizLogData,null,2),
        (index)=>{}
      );

      return this.logDirPath+bizLogFile;
    }

    //////////////////////
    else{
      let resLogData={};

      try{//불필요한 로그데이터를 삭제한다.//로그데이터 용량을 줄여야 메모리 부하를 막을 수 있다.
        resLogData=ut.deepCp(bData);//비참조복사
        resLogData.customData.resLog=this.logDirPath+resLogFile;
        if(resLogData.inputData) delete resLogData.inputData;
        if(resLogData.outputData) delete resLogData.outputData;
        if(resLogData.customData.target) delete resLogData.customData.target;
      }catch{}

      //로그데이터를 저장한다.
      log.saveLog(
        this.logDirPath,
        resLogFile,
        JSON.stringify(resLogData,null,2),
        (index)=>{}
      );

      return this.logDirPath+resLogFile;
    }
  }


  //////////
  //////////
  //게이트웨이 서버를 단일 CPU로 실행한다.
  //CPU 코어 수대로 clustering 할 때는 clusterRun을 사용한다.
  run(){//실행


    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////
    ///////////////////////////////////


    this.server=http.createServer((req,res)=>{
      const querystring = require('querystring');

      //console.log(req,'req');
      let {paths,querys}=ut.reqData(req);//req 정보를 보기좋게 분류한다.
      let {StndTranBaseYmd,StndTranBaseMilli}=ut.mkDate();
      //let apiKey=this.headerGet(req.rawHeaders,'Authorization','APIkey ');
      //lg(paths,querys,StndTranBaseYmd,StndTranBaseMilli,apiKey);
      let apiKey='';

      let postdata = '';
      req.on('data',(chunk)=>{
        postdata += chunk;
      });

      req.on('end',()=>{
        let cData={};
        try{
          let post=JSON.parse(postdata.toString());
          //lg(post);

          watcher.addContact();//통계기록//단순접속횟수를 기록한다.
          cData.method=paths[1];//메소드명
          cData.key=paths[2];//식별자로 쓸 유니크키
          cData.conType=paths[3];//연결타입(예비)
          cData.remoteAddress=this.remoteAdd(req.socket.remoteAddress);
          cData.apiKey=apiKey;//api키
          cData.StndTranBaseYmd=StndTranBaseYmd;//접속시간
          cData.conDateTime=StndTranBaseMilli;//접속시간
          cData.cConTm= + new Date();//최종연결 시점
          cData.error=[];
          cData.lgt=[];

          cData.authInfo=this.authApi(cData.apiKey);
          Object.assign(cData,post);

        }catch(e){
          console.error(e);
        }


        //api인증에 통과하고, 다시 아이피가 일치하는지 검사한다.
        if(true/*cData.authInfo && cData.remoteAddress==cData.authInfo.coIp*/){//인증수량제한

          //로거에서 모든 디렉토리를 미리 생성하는 것으로 변경
          //로그를 생성할 때 마다 디렉토리를 확인하고 생성하는 것은 자원을 소모한다. 또한 클러스터로 실행될때 충돌이 일어난다.
          this.logDirPath=log.getLogDir().pathHm;

          watcher.addClients(cData.remoteAddress);//통계기록//클라이언트 아이피별로 접근기록을 저장한다.
          if(conMsg) console.log('2. prox-y ~~~>> gatewy',cData.key,ut.substrEnd(cData.method,2));//콘솔출력

          ///////////////////////////////////
          //클라이언트로부터 전달받은 값

          cData.pidGte=process.pid;//게이트웨이 프로세스아이디//클러스터를 구별할 때 사용된다.
          cData.pidBiz=0;//비지니스 프로세스아이디//클러스터를 구별할 때 사용된다.
          //cData.clientAddress=cData.remoteAddress;
          //cData.clientPort=req.socket._peername.port;
          //lg(req.socket);
          cData.lgTm=cData.cConTm;//로그기준시간
          cData.gteLog=this.resLogWrite(cData,{},'G');
          //lg('cData',cData);

          //console.log(cData);
          ///////////////////////////////////
          //비지니스 메소드와 연결을 시도한다.
          this.bizConnect(cData,(bData)=>{
            //console.log('bizConnect -> bData:: ',bData);
            ///////////////////////////////////
            //클라이언트로 응답
            res.writeHead(200, {'Content-Type':'application/json'});
            res.write(bData);
            res.end();
          });

        }
        else{//인증에 실패하거나 수량제한에 걸리면, 아직 클라이언트 정보를 알지 못하는 상태에서 무조건 차단된다.

          watcher.addBlocked();//통계기록//단순차단횟수를 기록한다.(유량초과나 api인증에 실패한 기록이며, 이때 클라이언트 ip는 아직 알 수 없다.)
          if(conMsg) console.log('blocked',cData.key,ut.substrEnd(cData.method,2),this.socSize());//콘솔출력

        }

      });

    });


    ///////////////////////////////////
    //서버기동
    this.server.on('error',(e)=>{
      lg(e);
    });
    //서버기동
    this.server.listen(apps.gate.appPort,()=>{
      lg('Gateway server on',apps.gate.appPort,'process',process.pid);
    });


  }//run


  //////////
  //////////
  //비비니스 서버와의 연결
  bizConnect(cData,fnc){

    /*
    //매시간 단위로 로그데이터를 담기위한 디렉토리를 생성한다.
    let {StndTranBaseMilli}=ut.mkDate();
    let dayDatDir=datDir+StndTranBaseMilli.substr(0,10)+'/';//2020010101//년월일시
    ut.dirMake(dayDatDir);//시간단위 디렉토리를 생성
    */

    //let error=this.erFinder('cData',cData);
    //cData.lgt.bConTm= + new Date();

    //apps.bizs:비지니스 서버정보//cf를 통해 로딩된 정보
    //설정에 주어진 메소드를 처리하는 서버가 있다면
    if(apps.bizs[cData.method]){

      //비지니스 서버와의 연결 생성
      //cData 클라이언트 데이터와 apps.bizs를 통해 설정되 데이터를 조합하여 새로운 연결을 시작한다.
      let url = 'ws://'+apps.bizs[cData.method].machIpOut+':'+apps.bizs[cData.method].appPort +'/'+cData.method+"/"+cData.key+"?dbg="+cData.dbg;
      console.log(url);
      
      let bsoc=new ws(url);

      //연결하고 곧바로 데이터를 보낸다.
      bsoc.on("open",()=>{

        if(conMsg) console.log('3. gatewy --->> biznes',cData.key,ut.substrEnd(cData.method,2)/*,process.pid*/);
        //연결이 수립되면 곧바로 클라이언트 데이터를 보낸다.
        bsoc.send(JSON.stringify(cData));

      });


      //비지니서 서버가가 전송한 내용을 읽는다.
      bsoc.on("message",(msg)=>{
        
        let bData=JSON.parse(msg.toString());//클라이언트 데이터를 json객체로 변환        
        bData.customData.lgt.bRetTm= + new Date();
        //console.log('bData',bData);
        

        //로그를 저장하고, 반환된 로그파일 경로를 응답에 포함시킨다.
        
        bData.customData.bizLog=bData.outputData.bizLog=this.resLogWrite(cData,bData,'B');
        if(bData.msg.code!='9900') bData.customData.resLog=bData.outputData.resLog=this.resLogWrite(cData,bData);

        //결과를 다시 클라이언트에게 전송한다.
        if(typeof fnc === 'function'){

          // 응답데이터 필터링
          switch(bData.customData.method) {
              // 리브고객정보조회
            case 'KFK120B440':

              // KB스타뱅킹가입내용조회
            case 'KFK124DG40':

              // 고객정보번호조회
            case 'KFK124CF40':
            
              // 개인고객카드정보조회
            case 'KAA04K0C41':

              // KB인증서정보역거래조회
            case 'BFA72C32SC':

              let outJson = {};
              outJson = bData.outJson;
              if(outJson.OutData) {
                Object.keys(outJson.OutData).map(k => outJson.OutData[k] = typeof outJson.OutData[k] == 'string' ? outJson.OutData[k].trim() : outJson.OutData[k]);
              }
              Object.keys(outJson).map(k => outJson[k] = typeof outJson[k] == 'string' ? outJson[k].trim() : outJson[k]);
              fnc(JSON.stringify(outJson));
              break;
            default:
              fnc(JSON.stringify(bData));
              break;
          }


          bsoc.close();
        }

      });

    }
    else{
      if(conMsg) console.log('method unknown',cData.key,cData.method/*,process.pid*/);
      if(typeof fnc === 'function') fnc(cData);
    }

  }


  //////////
  //////////
  //CPU 코어수 만큼 프로세스를 복수 생성한다.
  clusterRun(){
    cluster.schedulingPolicy=cluster.SCHED_RR;//Round Robin//순차적으로 할당한다.
    if(cluster.isMaster){

      for(let i=0;i<cpuN;i++) cluster.fork();

      ///////////////////////////////////
      console.log('\r\n\r\n\r\n\r\nGateway cluster on',cpuN,'CPU');
      //console.log('\r\n\r\n\r\n\r\nGateway server on',apps.gate.appPort,'/',cpuN,'CPU');
      cluster.on('exit',()=>{console.log('worker',process.pid,'is off.');});

    }
    else{
      this.run();
    }
  }

  //////////
  //////////
  constructor(){
    this.gateServer=gateServer;
    this.wss={};
    this.logDirPath='';

    /*this.stat={
      socSize:0,
      //biz:biz,
      //run:run
    };*/
  }

}




//D.모듈배포, 퍼블릭
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//기본적으로 이곳에서 배포되지 않으면 private으로 간주된다.
module.exports=gateRun;