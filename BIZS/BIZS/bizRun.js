////////////////////////
//물리서버별로 한곳씩 지정해야 하는 루트설정과 모듈이다.
const rootDir=process.rootDir='/home/bfsadm/gbranch/BIZS/';//루트디렉토리설정//물리서버당 한곳씩을 지정해야 한다.
require('/home/bfsadm/gbranch/config/env.js');
const cf=require(rootDir+'DATA/cf.js');//설정파일
const ut=require(rootDir+'DATA/ut.js');//유틸리티
const watcher=require(rootDir+'DATA/watcher.js');//관리자를 위한 보고모듈


///////////////////////////////////node_modules
const http=require('http');
const ws=require('ws');
const cluster=require('cluster');//cpu 코어 수 대로 프로세스 생성하기
const cpuN=require('os').cpus().length;//코어숫자
const conMsg=cf.cfg.conf.debug.conMsg;//콘솔에 접속내용 표시하기//메모리가 증가하므로 프로덕션 단계에서는 설정값에서 꺼야 한다.


///////////////////////////////////기본설정
const apps=cf.cfg.apps;
watcher.runStatis();
watcher.appSender();


///////////////////////////////////
class bizRun{

  socSize(method){//현재 연결되어 있는 전체 소켓의 수를 반환한다.
    let sn=0;
    this.wss[method].clients.forEach((e,k)=>{
      sn++;
    });
    //this.stat.apps.bizs[method].socSize=sn;
    //console.log(this.stat.apps.bizs[method].socSize);
    return sn;
  }

  //////////
  run(method){    
    //for(let method in apps.bizs){
      let biz=apps.bizs[method];      
      console.log('Business server on',biz.appPort,method,'ws://'+biz.machIpIn);

      //this.bizMethod[method]=require('./'+method+'.js');
      //메소드 변수에 따라 관련 메소드를 require할 수 있으나, 그럴 경우 pkg 모듈에서 에러가 난다.
      //pkg에서 require 함수에는 변수를 사용할 수 없다.
      //pkg에서 클래스 구문에 프라이빗 설정도 할 수 없다.//기본적으로 모든 내장함수는 퍼블릭이다.
      if(method=='KFK120B440') this.bizMethod['KFK120B440']=require('./BIZ_KFK120B440.js');
      if(method=='KFK124DG40') this.bizMethod['KFK124DG40']=require('./BIZ_KFK124DG40.js');
      if(method=='KFK124CF40') this.bizMethod['KFK124CF40']=require('./BIZ_KFK124CF40.js');
      if(method=='KAA04K0C41') this.bizMethod['KAA04K0C41']=require('./BIZ_KAA04K0C41.js');
      if(method=='BFA72C32SC') this.bizMethod['BFA72C32SC']=require('./BIZ_BFA72C32SC.js');

      //비지니스 서버를 생성한다.
      this.bizServer[method]=http.createServer(/*{agent}*/);
      this.wss[method]=new ws.Server({noServer:true});

      //응답대기 시작
      this.on(this.bizServer[method],this.wss[method],method,biz);
    //}

  }


  on(bizServer,wss,method,biz){

    bizServer.on('upgrade',(req,inSoc,head)=>{//http 연결을 웹소켓으로 업그레이드 한다.

      let {paths,querys}=ut.reqData(req);//req 정보를 보기좋게 분류한다.
      wss.handleUpgrade(req,inSoc,head,(upSoc)=>{
        upSoc.method=paths[1];
        upSoc.key=paths[2];

        //허용 접속수를 넘지 않는다면 커넥션을 시도한다.
        if(this.socSize(upSoc.method)<=apps.bizs[upSoc.method].limitCnt){//인증수량제한
          watcher.addContact();//통계기록
          //let log=['connect '+upSoc.key+' '+upSoc.method,upSoc.key,upSoc.method];
          wss.emit('connection',upSoc,req);
        }
        else{//차단된다.
          watcher.addBlocked();//통계기록//차단
          if(conMsg) console.log('blocked biz '+upSoc.key+' '+upSoc.method,upSoc.key,ut.substrEnd(upSoc.method,2),this.socSize(upSoc.method));
          upSoc.close();
        }

      });
    });

    wss.on("connection",(bsoc)=>{

      if(conMsg) console.log('4. gatewy ===>> biznes',bsoc.key,ut.substrEnd(bsoc.method,2),this.socSize(bsoc.method));
      let bData={};
      let bConTm= + new Date();

      bsoc.on('message',(msg)=>{
        bData=JSON.parse(msg.toString());
        bData.pidBiz=process.pid;//비지니스 프로세스아이디//클러스터를 구별할 때 사용된다.
        bData.lgt.bConTm=bConTm;
        //console.log(bData);

        //호스트로 질의를 보내기 위해 메소드를 실행하고 인풋값을 정리한다.
        /*if(bData.cmd=='stat') this.retStat(bsoc,bData);
        else*/
        this.methods(bsoc,bData);

      });//message

      bsoc.on('close',()=>{//게이트와의 연결이 귾기면
        if(conMsg) console.log('6. gatewy <<==X biznes',bsoc.key,ut.substrEnd(bsoc.method,2),this.socSize(bsoc.method));
      });

    });

    bizServer.listen(biz.appPort);
    //console.log(process.cfg.appMthToMmo);
    console.log(method,process.cfg.appMthToMmo[method]);
  }

  //////////
  //호스트와의 연결을 위한 메소드함수
  methods(bsoc,bData){

    if(!this.mN[bData.method]) this.mN[bData.method]=0;
    this.mN[bData.method]++;
    if(this.mN[bData.method]>999) this.mN[bData.method]=0;

    //메소드에 따라 각각 모듈을 불러들여 데이터를 전송한다.
    let bizMethod=new this.bizMethod[bData.method](bData);
    bizMethod.job((rData)=>{

      if(rData.flag){//정상응답

        if(conMsg) console.log('5+ biznes +++++ hostsv',bData.key,ut.substrEnd(bData.method,2));
        bsoc.send(JSON.stringify(rData));
        bsoc.close();

      }
      else{

        if(conMsg) console.log('5x biznes XXXXX hostsv',bData.key,ut.substrEnd(bData.method,2));
        bsoc.send(JSON.stringify(rData));
        bsoc.close();
      }

    },this.mN[bData.method]);

  }


  //////////
  //////////
  //CPU 코어수 만큼 프로세스를 복수 생성한다.
  clusterRun(method){
    cluster.schedulingPolicy=cluster.SCHED_RR;//Round Robin//순차적으로 할당한다.
    if(cluster.isMaster){

      for(let i=0;i<cpuN;i++) cluster.fork();

      ///////////////////////////////////
      console.log('\r\n\r\n\r\n\r\nBusiness cluster on',cpuN,'CPU');
      cluster.on('exit',()=>{console.log('worker',process.pid,'is off.');});

    }
    else{
      this.run(method);
    }
  }

  //////////
  //////////
  constructor(){
    this.bizServer={};
    this.bizMethod={};
    this.wss={};
    this.mN={};

    
  }

}

module.exports=bizRun;
