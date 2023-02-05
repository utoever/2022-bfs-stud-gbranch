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
const watcher=require(rootDir+'DATA/watcher.js');
const log=require(rootDir+'DATA/log.js');//


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const cli=require('child_process');





//B.지역모듈, 기본설정, 전역변수
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//watcher 기본함수 실행
watcher.runStatis();
watcher.appSender();
const cliOption={//CLI 옵션
  encoding:'utf8',
  timeout:0,
  maxBuffer:200*1024,
  killSignal:'SIGTERM',
  cwd:null,
  env:null
};
const logLimitMinute=cf.cfg.conf.limit.logLimitMinute;//로그파일의 보관기간 (분)
//const logLimitMinute=1;//로그파일의 보관기간 (분)





//C.로거
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
const sizeNow=()=>{
  let thisTime=log.mkLogDate();
  let {path}=log.getLogDir();
  let cmd1='du -sh '+path;//용량세기
  cli.exec(cmd1,cliOption,(err,out,stderr)=>{
    if(!err){
      let lines=out.split('\t');
      let msg=lines[0]+' log size, '+thisTime.logTime.substr(5,11);
      watcher.saveLogDiskSize(msg);
      console.log(msg);
    }
  });

  //find /home/nodejs/Nodebreaker/DATA/dat/ -type f -name "*.json" | wc -l
  let cmd2='find '+path+' -type f -name "*.json" | wc -l';//파일수세기
  cli.exec(cmd2,cliOption,(err,out,stderr)=>{
    if(!err){
      let msg=ut.nf(Number(out))+' logs, '+thisTime.logTime.substr(5,11);
      watcher.saveLogCount(msg);
      console.log(msg);
    }
  });
}

///////////////////////////////////
setInterval(()=>{
  log.newLogDir(logLimitMinute);//필요한 디렉토리를 미리 생성한다.
  log.delLogOld('',()=>{},logLimitMinute+2);//분//오래된 디렉토리를 삭제한다.//미리 생성한 디렉토리는 그대로 두어야 한다.
},1000*60);//매분마다 확인하고 설정된 분이 경과한 로그를 삭제한다.
setInterval(()=>{
  sizeNow();//30분마다 로그파일의 갯수와 용량을 확인하고 보고한다.
},1000*60*30);
setTimeout(()=>{
  sizeNow();
},1000*10);


///////////////////////////////////
let {logTime}=log.mkLogDate();
console.log('Logger start',logTime);
log.newLogDir(logLimitMinute);//부팅될때 한번 필요한 디렉토리를 미리 생성한다.
