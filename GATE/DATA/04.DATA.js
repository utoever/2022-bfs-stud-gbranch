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
const watcher=require(rootDir+'DATA/watcher.js');//개별앱들이 데이터를 보고하기 위한 모듈
//const stat=require(rootDir+'DATA/statis.js');//통계자료 수집,보고
const dt=require(rootDir+'DATA/data.js');//데이터 정리,배포
const log=require(rootDir+'DATA/log.js');//로그기록


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const fs=require('fs');
//const http=require('https');
const wsc=require('ws');
const os=require('os');
const cluster=require('cluster');//cpu 코어 수 대로 프로세스 생성하기
const cpuN=require('os').cpus().length;//코어숫자

/*const opt={
  key:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.key.pem').toString(),
  cert:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.crt.pem').toString(),
  ca:fs.readFileSync(rootDir+'cert/x1.espsys.link_2022051132C1A/x1.espsys.link_2022051132C1A.ca-bundle.pem').toString(),
  minVersion:"TLSv1.3"
};*///console.log(opt);


/////////////////////
const conf=cf.cfg.conf;//기본설정
const appName=process.env.name;//현재 앱의 이름
const dataPort=conf.url.watchPort;//보고를 받기 위한 포트
const watchSec=conf.rate.appListen;//*100
const sendSec=conf.rate.appReport;//*100




//////////////////////////////
//현재 연결되어 있는 전체 소켓의 수를 반환한다.
//전체 유량을 제어하는 데 쓰인다.
const socSize=soc=>{//전체유량
  let sn=0;
  soc.clients.forEach((el)=>{
    sn++;
    //if(el.pid) console.log(el.pid,'socPid');
  });
  return sn;
}
const dataSize=data=>{//전체유량
  let dn=String(JSON.stringify(data)).length;
  return dn;
}
const socCloseAll=soc=>{//전체소켓닫기
  let sn=0;
  soc.clients.forEach((el)=>{
    el.close();
    sn++;
  });
  return sn;
}
//////////////////////////////






//////////
const run=()=>{
//////////////////////////////
//////////////////////////////

  const wss=new wsc.WebSocketServer({port:dataPort});//보고받기 서버

  /*const httpsServer=http.createServer(opt);//보고받기 서버
  httpsServer.listen(dataPort);
  const WebSocketServer=wsc.Server;
  const wss=new WebSocketServer({server:httpsServer});*/
  

  /////////////////////
  const pid=process.pid;
  let appData={};//실시간메시지 : 실시간으로 앱이 보고해오는 데이타가 저장된다.
  let appCmds={};//개별 앱에 명령을 내릴때 사용한다.
  let appCfgExt=[];//실시간메시지 : 실시간으로 앱이 보고해오는 데이타가 저장된다.
  let appMthExt=[];//실시간메시지 : 실시간으로 앱이 보고해오는 데이타가 저장된다.
  let pm2Log={out:{},err:{}};//콘솔화면의 로그기록을 저장한다. 앱당 50줄

  let watchOnFlag=false;//정보수집상태
  let conN=0;


  /////////////////////
  /////////////////////
  /////////////////////
  //let osData=watcher.osDataMonit();//물리서버데이터
  watcher.runStatis();
  //dt.autoRefresh();
  //dt.alertHealthWatch();


  /////////////////////
  /////////////////////
  /////////////////////
  /*setInterval(()=>{//로그정리
    dt.autoRefresh();//매시간 메모리초기화
    dt.deleteOldLog(conf.dirs.lgDir,6);//6시간 경과 경고메시지 삭제
    //dt.deleteOldLog(conf.dirs.datDir,1);//1시간 경과 로그데이터 디렉토리 삭제
    //console.log('DATA 64, 삭제요망');
  },100*watchSec*60*60);//1시간마다 확인*/


  /////////////////////
  /////////////////////
  /////////////////////
  setInterval(()=>{
    conN++;

    //DATA엡 자신의 정보를 상주객체에 갱신한다.
    let logOutFile=process.env.pm_out_log_path;
    let logErrFile=process.env.pm_err_log_path;
    let logOutSize=ut.fileSize(logOutFile);
    let logErrSize=ut.fileSize(logErrFile);

    pm2Log.out[appName]=watcher.logRead(logOutFile);
    pm2Log.err[appName]=watcher.logRead(logErrFile);

    let logLineAlert=watcher.watchLine({logOut:logOutFile,logErr:logErrFile});
    if(!appData[appName]) appData[appName]={};
    appData[appName]={
      cmd:'watchApp',
      appName:appName,
      pid:pid,
      cpuN:os.cpus().length,
      osData:{},
      env:watcher.proData(process.env),
      cpuUsage:process.cpuUsage(),
      memoryUsage:process.memoryUsage(),
      //resourceUsage:process.resourceUsage(),
      statis:{},
      logLineAlert:logLineAlert,
      logOutFile:logOutFile,
      logErrFile:logErrFile,
      logOutSize:logOutSize,
      logErrSize:logErrSize,
      //logOutText:pm2Log.out[appName],
      //logErrText:pm2Log.err[appName],
      conN:conN,
      time:+ new Date()
    };
    appData[appName].statis[pid]=watcher.getStatis();

    dt.thisRestart(
      appName,
      appData[appName].memoryUsage.rss
    );
    if(!watchOnFlag) console.log('Waiting apps');
    watchOnFlag=false;

    if(appCmds[appName]){
      let cmd=appCmds[appName];//명령내용
      console.log('admin command',cmd.cmd,'relay to',appName,'data');
      watcher.appCmds(cmd);
      delete appCmds[appName];//명령을 전달하면 내용을 지운다.

      delete appData[appName];
      delete pm2Log.out[appName];
      delete pm2Log.err[appName];
      dt.cliCmd('pm2 flush '+appName);
    }

    dt.alertHealthWatch('on',appName);
    dt.alertHealthWatch('report');
    dt.alertErrWatch(logLineAlert,appName);

    //console.log(appData,'appData',mthData,'mthData',97);
    //if(conN==10) console.log(appData);

  },100*watchSec);//개별앱들이 상태를 보고하는 주기





  /////////////////////
  /////////////////////
  /////////////////////
  wss.on('connection',(ws)=>{
    let loopAppOne={};
    let loopAppAll={};
    let testN=1;

    //console.log(socSize(wss),'sockets');
    //console.log(ut.nf(dataSize(appData)),'data size');

    ws.on('message',(dat)=>{

      let rData={};
      try{rData=JSON.parse(dat.toString('utf8'));}catch{}

      watcher.addContact();//통계기록
      //if(!rData.appName) console.log(rData);
      //if(rData.cmd=='logPicker') console.log(rData);

      ///////////////////////
      ///////////////////////
      ///////////////////////
      ///////////////////////
      //DATA <= APPS //데이터를 저장한다.
      //오지 않으면?//시간으로 분기해서 변동없으면 연결 처리완료

      if(rData.appName && rData.cmd=='watchApp' && rData.conN){//app으로부터 정보듣고 저장하기

        let appInfo=process.cfg.appsAll[rData.appName];
        dt.alertHealthWatch('on',rData.appName);//앱상태보고
        dt.alertErrWatch(rData.logLineAlert,rData.appName);//앱에러보고

        if(!appData[rData.appName]) appData[rData.appName]={};//내용이 없다면 지운다.
        //데이터를 나누어서 pm2로그를 분리한다.
        if(rData.logOutText){
          pm2Log.out[rData.appName]=rData.logOutText;
          delete rData.logOutText;
        }
        if(rData.logErrText){
          pm2Log.err[rData.appName]=rData.logErrText;
          delete rData.logErrText;
        }
        appData[rData.appName][rData.pid]=rData;//보고내용 저장
        ws.pid=rData.pid;

        //정보가 pid별로 저장되므로 //클러스터를 사용하면 pid별로 데이터를 모아서 한꺼번에 합산해야 한다.
        //그런데 앱을 재시동할 때마다 pid값이 변경된다. 이때 사라진 pid와 살아있는 pid를 구별할 수 없기 때문에 클러스터 숫자만큼 데이터를 제한해야 한다.
        //pid값이 생성된 순서대로 저장되기 때문에 미리 정해둔 클러스터 숫자만큼 최근 것을 남기고 나머지는 삭제한다.
        let clusterN=appInfo.cluster;
        if(!clusterN) clusterN=1;

        //보고내용 저장
        if(!appData[rData.appName].statis) appData[rData.appName].statis={};
        let statis=appData[rData.appName].statis;//현재저장된통계
        statis[rData.pid]=rData.statis;//통계별도저장
        statis=ut.limitLastObject(statis,clusterN+1);//통계정리//클러스터 수만큼 pid데이터를 제한한다.
        rData.statis=statis;//보고내용에서 통계대체
        appData[rData.appName]=rData;//보고내용 저장
        //if(rData.appName=='10.LOGR') console.log(clusterN,Object.keys(appData[rData.appName]));

        if(/*rData.appName!=appName && */appCmds[rData.appName]){
          dt.relayCmd(rData.appName,appCmds,ws);//관리자 명령을 앱쪽으로 전달한다.//명령이 없다면 무시된다.
          //delete appCmds[appName];//명령을 전달하면 내용을 지운다.
          delete appData[rData.appName];
          delete pm2Log.out[rData.appName];
          delete pm2Log.err[rData.appName];
          //dt.cliCmd('pm2 flush '+rData.appName);
        }
        if(rData.appName==appInfo.machSender) appCfgExt=dt.relayCfg(appInfo.machName,appCfgExt,ws);//관리자 명령을 앱쪽으로 전달한다.//명령이 없다면 무시된다.
        if(rData.appName==appInfo.machSender) appMthExt=dt.relayMth(appInfo.machName,appMthExt,ws);//관리자 명령을 앱쪽으로 전달한다.//명령이 없다면 무시된다.

        dt.thisRestart(//메모리 폭주시 재부팅//원인을 제거하지 않으면 무한 재부팅될 수 있다.
          //하지만 소량으로 메모리가 증가한다면 유용하게 쓰인다.
          rData.appName,
          rData.memoryUsage.rss
        );

        watchOnFlag=true;//상태체크
      }

      ///////////////////////
      ///////////////////////
      ///////////////////////
      ///////////////////////
      //CTRL => DATA //데이터를 요청한다.

      else if(rData.cmd=='appSearchAll'){//관리자 요청에 따라 저장된 보고시작
      //이 요청은 최초요청시 단 한번만 발생하므로, 요청이 시작되면 주기적으로 보고를 시작한다.
      //모든 앱에 대한 정보를 요청하므로, 데이터량이 많다. 상황판에서 사용된다.

        loopAppAll=setInterval(()=>{
          testN++;
          ws.send(JSON.stringify({
            rsCmd:'appSearchAll',
            appDataAll:appData,
            pm2Log:pm2Log
          }));
          //console.log(testN,'a');

        },100*sendSec);
      }

      ///////////////////////
      else if(rData.appName && rData.cmd=='appSearch'){//관리자 요청에 따라 저장된 보고시작
      //이 요청은 최초요청시 단 한번만 발생하므로, 요청이 시작되면 주기적으로 보고를 시작한다.
      //특정 개별 앱에 대한 정보를 요청한다. 서버상태 모니터링에 사용된다.

        loopAppOne=setInterval(()=>{
          testN++;
          //let thisMthData={};
          //if(process.cfg.appNmToMth[rData.appName]) thisMthData=mthData[process.cfg.appNmToMth[rData.appName]];

          ws.send(JSON.stringify({
            rsCmd:'appSearch',
            appData:appData[rData.appName],
            pm2Log:{
              out:pm2Log.out[rData.appName],
              err:pm2Log.err[rData.appName]
            },
            //mthData:thisMthData
          }),()=>{/*delete appData[rData.appName];*/});
          //console.log(testN,'1');

        },100*sendSec);
      }

      else if(rData.appName && rData.cmd=='appCmd'){//관리자 요청에 따라 앱에 명령저장//앱컨트롤
      //관리자로부터 전달된 앱으로의 명령을 저장한다.
        appCmds[rData.appName]=rData.appCmd;
        console.log('admin command',rData.appCmd.cmd,'receive for',rData.appName);
      }

      else if(rData.cfName && rData.cmd=='appCfgExt'){//관리자 요청에 따라 앱에 명령저장//물리서버설정
      //관리자로부터 전달된 앱으로의 명령을 저장한다.
        appCfgExt.push({cfName:rData.cfName,cfgData:rData.cfgData,machs:Object.keys(process.cfg.apps.mach)});
        ws.send(1);//소켓종료을 위해 보낸다.
        //console.log('admin command',rData.cmd,'receive for all machines',rData.cfName,appCfgExt,socSize(wss),'sockets');
      }

      else if(rData.mthName && rData.cmd=='appMthExt'){//관리자 요청에 따라 앱에 명령저장//물리서버설정
      //관리자로부터 전달된 앱으로의 명령을 저장한다.
        appMthExt.push({mthName:rData.mthName,schData:rData.schData,machs:Object.keys(process.cfg.apps.mach)});
        ws.send(1);//소켓종료을 위해 보낸다.
        //console.log('admin command',rData.cmd,'receive for all machines',rData.mthName,appMthExt,socSize(wss),'sockets');
      }

    });

    ws.on('close',()=>{
      clearInterval(loopAppOne);
      clearInterval(loopAppAll);
    });
    ws.on('error',()=>{
      ws.close();
    });

  });

  //////////////////////////////
  //////////////////////////////

  setInterval(()=>{
    console.log(socSize(wss),'sockets,'/*,ut.nf(dataSize(appData)),'appData,',ut.nf(dataSize(pm2Log)),'pm2Log'*/,ut.uTimeToDate());
  },1000*60*10);

  setInterval(()=>{
    dt.appRestart(appName);
  },1000*60*60);

  setInterval(()=>{//앱데이터를 순회하면서 마지막 보고시간으로부터 3초가 경과하면, 데이터를 초기화한다.
    if(typeof appData==='object'){
      if(Object.keys(appData).length>0){
        for(let appNm in appData){
          let thisTime=+ new Date();
          let appDt=appData[appNm];
          let gapTime=Math.round((thisTime-appDt.time)/1000);
          if(gapTime>3){
            console.log(appNm,'server stopped',gapTime);
            if(appData[appNm]) delete appData[appNm];
            if(pm2Log.out[appNm]) delete pm2Log.out[appNm];
            if(pm2Log.err[appNm]) delete pm2Log.err[appNm];
          }
          //console.log(appNm,gapTime);
        }
      }
    }
  },1000);

  /*setInterval(()=>{
    console.log(socSize(wss),'memory sweeps auto',ut.uTimeToDate());
    appData={};//실시간메시지 : 실시간으로 앱이 보고해오는 데이타가 저장된다.
    //socCloseAll(wss);
    //pm2Log={out:{},err:{}};//콘솔화면의 로그기록을 저장한다. 앱당 50줄
  },1000*60*60);*/
}






//////////
//////////
//CPU 코어수 만큼 프로세스를 복수 생성한다.
const clusterRun=()=>{
  cluster.schedulingPolicy=cluster.SCHED_RR;//Round Robin//순차적으로 할당한다.
  if(cluster.isMaster){

    for(let i=0;i<cpuN;i++) cluster.fork();

    ///////////////////////////////////
    console.log('\r\n\r\n\r\n\r\nData cluster on',cpuN,'CPU');
    cluster.on('exit',()=>{console.log('worker',process.pid,'is off.');});

  }
  else{
    run();
  }
}

/////////////////////
run();
console.log('Data server on',dataPort,ut.uTimeToDate());
