//A.외부모둘, 상속
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//거의 모든 앱이 공통적으로 사용하는 모듈들이다.
//여기에 언급된 모듈들은 반드시 물리서버마다 동일한 복사본을 만들어두어야 한다.
//테스트 버전에서는 DATA 디렉토리에 모아두었다.
const ut=require(process.rootDir+'DATA/ut.js');//유틸리티 모듬
//const {alertHealth,alertErr}=require(process.rootDir+'DATA/alert.js');//경고메시지 수집,보고


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const fs=require('fs');
const cli=require('child_process');//command line interpreter


/////////////////////
const conf=process.cfg.conf;//기본설정
let appFlag={};//앱상태체크


//private
/////////////////////
/////////////////////
/////////////////////////////////////////
const cliOption={
  encoding:'utf8',
  timeout:0,
  maxBuffer:200*1024,
  killSignal:'SIGTERM',
  cwd:null,
  env:null
};
const cliCmd=(cmd,fnc)=>{
  cli.exec(cmd,cliOption,(err,out,stderr)=>{
    if(!err && typeof fnc==='function') fnc(out);
    else if(err) console.log(err);
  });
}


////////////////////////
const getDirSize=(dir)=>{
  let dirSize=0;
  let list=fs.readdirSync(dir);
  for(let i in list){
    let stat=fs.statSync(dir+list[i]);
    if(stat.isFile()) dirSize+=stat.size;
  }
  return dirSize;
}









//public
/////////////////////
/////////////////////
/////////////////////
const relayCmd=(appNm,appCmds,ws)=>{//명령전달하기//앱쪽으로 보낸다.
  if(appCmds[appNm]){
    let cmd=appCmds[appNm];//명령내용
    console.log('admin command',cmd.cmd,'relay to',appNm);
    ws.send(JSON.stringify(cmd));//전달
    delete appCmds[appNm];//명령을 전달하면 내용을 지운다.
  }
}
const relayCfg=(machName,appCfgExt,ws)=>{//설정변경 전달하기//앱쪽으로 보낸다.
  if(appCfgExt.length){
    for(let i in appCfgExt){
      let appCfg=appCfgExt[i];
      appCfg.machName=machName;
      if(appCfg.machs.includes(machName)){
        for(let n in appCfg.machs){
          if(appCfg.machs[n]==machName){
            ws.send(JSON.stringify(appCfg));//전달
            appCfg.machs.splice(Number(n),1);
            //console.log(appCfg.machs,1);
            console.log('admin cfg',appCfg.cfName+'.json','relay to',machName);
          }
        }
      }
      if(!appCfg.machs.length) appCfgExt.splice(Number(i),1);
    }
  }
  return appCfgExt;
}
const relayMth=(machName,appMthExt,ws)=>{//설정변경 전달하기//앱쪽으로 보낸다.
  if(appMthExt.length){
    for(let i in appMthExt){
      let appMth=appMthExt[i];
      appMth.machName=machName;
      if(appMth.machs.includes(machName)){
        for(let n in appMth.machs){
          if(appMth.machs[n]==machName){
            ws.send(JSON.stringify(appMth));//전달
            appMth.machs.splice(Number(n),1);
            //console.log(appMth.machs,1);
            console.log('admin mth',appMth.mthName+'.json','relay to',machName);
          }
        }
      }
      if(!appMth.machs.length) appMthExt.splice(Number(i),1);
    }
  }
  return appMthExt;
}


/////////////////////////////////////////
const appRestart=(appNm)=>{//사용중인 메모리가 일정량을 넘어서면 강제로 재부팅 시킨다.
    let cmd='pm2 restart '+appNm;
    cli.exec(cmd,cliOption,(err,out,stderr)=>{
      //if(err) console.log(err);
    });
}


/////////////////////////////////////////
const thisRestart=(appNm,mem)=>{//사용중인 메모리가 일정량을 넘어서면 강제로 재부팅 시킨다.
  let appLimitMemory=6000;//100이하로 설정할 경우 무한 재부팅될 우려가 있음.
  let memory=Math.round((Number(mem)/1024/1024)*10)/10;
  if(memory>appLimitMemory){
    console.log(memory,'Mb memory over',appLimitMemory,cmd);
    appRestart(appNm);
  }
}


/////////////////////////////////////////
const uTimeToDateHour=(t)=>{//유닉스타임을 2022010101로 변환한다
  if(t){
    date=new Date(Number(t));
    let year=String(date.getFullYear());
    let month="0"+(date.getMonth()+1);
    let day="0"+date.getDate();
    let hour="0"+date.getHours();
    return year
    +month.substr(-2)
    +day.substr(-2)
    +hour.substr(-2);
  }
}


/////////////////////
/////////////////////
/////////////////////
//앱들의 보고상태가 양호한지 감시하고, 보고가 끊기면 경고 데이터를 생성한다.
const alertHealthWatch=(cmd='',aName='')=>{
  const listenN=6;//초당 두번의 기록이 발생하므로, 3초간 보고 지연되면 경고
  if(cmd=='on' && aName){//보고기록
    if(!appFlag[aName]) appFlag[aName]='';

    appFlag[aName]+='1';//양호
    appFlag[aName]=appFlag[aName].slice(listenN*-1);//앱당 기록 제한
  }
  else
  if(cmd=='report'){//보고판단
    for(let aName in appFlag){//설정된 모든 앱목록을 불러온다.
      if(appFlag[aName]=='1'+'0'.repeat(listenN-1)){//100000//양호하다가 끊긴 경우
        //alertHealth(aName,'보고수신중단 : 보고를 받지 못했습니다.');//경고생성
        console.log(appFlag[aName],aName,'stopped');
      }
      else if(appFlag[aName]=='0'.repeat(listenN-1)+'1'){//000001//끊겨있다가 양호해진 경우
        //alertHealth(aName,'보고수신재개 : 다시 보고를 받고 있습니다.');//경고생성
        console.log(appFlag[aName],aName,'restart');
      }
      //else console.log(appFlag[aName],aName);

      appFlag[aName]+='0';//보고초기화
      appFlag[aName]=appFlag[aName].slice(listenN*-1);//앱당 기록 제한
    }
  }
}


/////////////////////
//앱들의 에러상태를 감시하고, 에러가 발생하면 경고 데이터를 생성한다.
const alertErrWatch=(logLineAlert,aName)=>{
  /*logLineAlert.logErr={//앱들의 에러보고 내역
    sizeLast:1000,
    lineLast:[0,6],
    eventFlag:false
  }*/
  /*file={//에러경고 생성
    lines:[lineFrom,lineTo,filePath],
    str:'comment'
  }*/
  let errLine=logLineAlert.logErr;
  let file={};
  if(errLine.eventFlag){
    file.str='에러발생 : 예기치 못한 에러가 발생했습니다.';
    file.lines=errLine.lineLast;
    //alertErr(aName,file);//경고생성
    //console.log(errLine.eventFlag,'eventFlag',aName,file);
  }
}


/////////////////////
/////////////////////
/////////////////////
const deleteOldLog=(dir,hour)=>{//오래된 로그파일을 삭제한다.
  let thisTime=+ new Date();
  fs.readdir(dir,(e,files)=>{
    if(!e){
      for(let i in files){
        let file=files[i];
        let stat=fs.statSync(dir+file);
        let time=+ new Date(stat.ctime);
        if(thisTime-time>=1000*60*60*hour)
        cliCmd('rm -rf '+conf.dirs.datDir+file,()=>{/*console.log(file,'log deleted');*/});
        //fs.rm(conf.dirs.datDir+file+'/',{recursive:true},(e)=>{});
        //console.log(file,thisTime,time,thisTime-time);
      }
    }
  });
}


const autoRefresh=()=>{//자동메모리초기화

  //let logDirSize=Math.round((getDirSize(conf.dirs.logDir)/1024/1024)*10)/10;
  //if(logDirSize>100){//로그파일의 용량이 100M가 넘으면
    cliCmd('pm2 flush');//아웃로그 전체 삭제//로그가 사라지므로, 시간이 경과한 경고 내용을 볼 수 없게 된다.
    console.log('Auto refresh',ut.uTimeToDate()/*,'pm2 log delete',logDirSize+' Mb'*/);

    /*let lgDirSize=Math.round((getDirSize(conf.dirs.lgDir)/1024)*10)/10;
    if(lgDirSize>0){//경고가 존재한다면
      fs.rm(conf.dirs.lgDir,{recursive:true},(e)=>{
        if(!e) ut.dirMake(conf.dirs.lgDir);
        console.log('Auto refresh',ut.uTimeToDate(),'alert log delete',lgDirSize+' Kb');
      });
    }*/
  //}
  //cliCmd('pm2 restart '+appName);//앱재시동
  //appData={};
  //osData=osDataMonit();
}


/*const appClusterLimiter=(appName,appData)=>{//클러스터를 사용하면 pid별로 데이터를 모아서 한꺼번에 합산해야 한다.
  //그런데 앱을 재시동할 때마다 pid값이 변경된다. 이때 사라진 pid와 살아있는 pid를 구별할 수 없기 때문에 클러스터 숫자만큼 데이터를 제한해야 한다.
  //pid값이 생성된 순서대로 저장되기 때문에 클러스터 숫자만큼 최근 것을 남기고 나머지는 삭제한다.
  let clusterN=process.cfg.appsAll[appName].cluster;
  if(!clusterN) clusterN=1;
  return appData=ut.limitLastObject(appData,clusterN);
}*/


//exports
/////////////////////
/////////////////////
/////////////////////
module.exports={
  cliCmd:cliCmd,//CLI
  relayCmd:relayCmd,//관리자명령앱에전달
  relayCfg:relayCfg,//관리자설정배포
  relayMth:relayMth,//관리자설정배포
  thisRestart:thisRestart,//현재앱재부팅
  appRestart: appRestart,//앱재부팅
  uTimeToDateHour:uTimeToDateHour,//시간변환
  alertHealthWatch:alertHealthWatch,//앱상태경고
  alertErrWatch:alertErrWatch,//에러상태경고
  deleteOldLog:deleteOldLog,//오래된로그삭제
  autoRefresh:autoRefresh,//자동메모리초기화
  //appClusterLimiter:appClusterLimiter//클러스터데이터정리
}