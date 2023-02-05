////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');

/////////////////////////////////////////
const cli=require('child_process');
const fs=require('fs');
const os=require('os');
//const http=require('https');
const http=require('http');

/////////////////////////////////////////
const {runStatis,addContact,addBlocked,addClients,addStrange,getStatis}=require(process.rootDir+'DATA/statis.js');

/////////////////////////////////////////
const ws=require('ws');
const watchUrl='ws://'+process.cfg.conf.url.watchIp+':'+process.cfg.conf.url.watchPort;

/////////////////////////////////////////
const appName=process.env.name;
const appConf=process.cfg.appsAll[appName];
const delay=process.cfg.conf.rate.watcherReconnectSec;
let wss={},wssN=0;

const cliOption={
  encoding:'utf8',
  timeout:0,
  maxBuffer:200*1024,
  killSignal:'SIGTERM',
  cwd:null,
  env:null
};

/////////////////////////////////////////
const logRead=(log,lines)=>{//특정 텍스트파일의 마지막 몇줄을 읽는다.
  lines=lines||30;//초기화//마지막 200줄 가져오기
  let txt='';
  try{txt=fs.readFileSync(log,'utf8');}catch{}

  if(txt){
    let texts=txt.split('\n');

    if(texts.length>lines){
      texts=texts.slice((lines+1) * -1);//음수변환//뒤에서부터자르기
      txt=texts.join('\n');
    }
    return txt;
  }
}

const lineSize=(log)=>{
  let size=0;
  try{
    let txt=fs.readFileSync(log,'utf8');
    size=txt.split('\n').length;
  }catch{}
  return size;
}

const watchLine=(logs)=>{
  for(let logName in logs){
    let file=logs[logName];
    let logSize=ut.fileSize(file);

    /*if(logSize<=1){//초기화
      logLastLine[logName]={
        sizeLast:0,
        logSize:1,
        lineLast:[1,1,'']
      };
    }*/
    logLastLine[logName].lineLast[2]=file;
    if(logLastLine[logName].sizeLast!=logSize && logSize>0){//변동이 생기면
      logLastLine[logName].sizeLast=logSize;
      logLastLine[logName].logSize=logSize;
      let fileLine=lineSize(file);
      logLastLine[logName].lineLast[0]=logLastLine[logName].lineLast[1];
      logLastLine[logName].lineLast[1]=fileLine;
      logLastLine[logName].eventFlag=true;
      //console.log(logLastLine[logName].sizeLast,logSize,true);
    }
    else{//변동이 없으면
      logLastLine[logName].eventFlag=false;
      //console.log(logLastLine[logName].sizeLast,logSize,false);
    }
    //console.log(logLastLine[logName].sizeLast,logSize);
  }
  return logLastLine;
}
//let logLineAlert=watchLine({logOut:logOutFile,logErr:logErrFile});


/////////////////////
/////////////////////
/////////////////////
const osDataMonit=()=>{//현재물리서버의 정보를 읽는다.
  let rt={
    cpu:os.cpus()[0].model,
    cpuLen:os.cpus().length,
    hostName:os.hostname(),
    type:os.type(),
    arch:os.arch(),
    release:os.release(),
    freeMem:os.freemem(),
    freememv:Math.round((os.freemem()/1024/1024/1024)*10)/10+' Gb',
    totalMem:os.totalmem(),
    totalMemv:Math.round((os.totalmem()/1024/1024/1024)*10)/10+' Gb',
    rateFreeMem:Math.round((os.freemem()/os.totalmem())*100*10)/10,
    rateFreeMemv:Math.round((os.freemem()/os.totalmem())*100*10)/10+' %',
    loadAvg:os.loadavg(),
    logCount:logCount,
    logDiskSize:logDiskSize,
    //ip:ip.address(),
    //storage:osDatas.storage,
    //storagev:osDatas.storagev,
    //net0:os.networkInterfaces().eth0[0],
    //net1:os.networkInterfaces().eth0[1],
    //version:os.version(),
    //endianness:os.endianness(),
    //os:os
  };
  /*if(rt.type.toLowerCase().indexOf('linux')>=0){
    cliCmd('df .',(out)=>{
      let lines=out.split('\n');
      if(lines.length>1) osDatas.storage=lines[lines.length-2].replace(/\s+/g, " ").split(' ');
    });
    cliCmd('df -h .',(out)=>{
      let lines=out.split('\n');
      if(lines.length>1) osDatas.storagev=lines[lines.length-2].replace(/\s+/g, " ").split(' ');
    });
    rt.storage=osDatas.storage;
    rt.storagev=osDatas.storagev;
  }*/
  return rt;
}

/////////////////////////////////////////
const proData=(env)=>{
  return {
    name:env.name,// '02.DATA',
    script:env.script,// '/home/nodejs/nb95/DATA/02.DATA.js',
    pm_id:env.pm_id,// '0',
    pm_exec_path:env.pm_exec_path,// '/home/nodejs/nb95/DATA\\02.DATA.js',
    pm_err_log_path:env.pm_err_log_path,// '/root/.pm2/logs/02.DATA-error.log',
    pm_out_log_path:env.pm_out_log_path,// '/root/.pm2/logs/02.DATA-out.log',
    pm_pid_path:env.pm_pid_path,// 'C:\\Users\\espsys\\.pm2\\pids\\02.DATA-0.pid',
    pm_uptime:env.pm_uptime,// '1646396444589',

    //unique_id:env.unique_id,// '67b9c095-c7bb-4957-9f90-a08f00f4e61e',
    //pm_cwd:env.pm_cwd,// '/home/nodejs/nb95/DATA',
    //COMPUTERNAME:env.COMPUTERNAME,// 'ESPSYS-I54570',
    //LOGONSERVER:env.LOGONSERVER,// '\\\\ESPSYS-I54570',
    //NUMBER_OF_PROCESSORS:env.NUMBER_OF_PROCESSORS,// '4',
    //OS:env.OS,// 'Windows_NT',
    //PROCESSOR_ARCHITECTURE:env.PROCESSOR_ARCHITECTURE,// 'AMD64',
    //PROCESSOR_IDENTIFIER:env.PROCESSOR_IDENTIFIER,// 'Intel64 Family 6 Model 60 Stepping 3, GenuineIntel',
    //USERDOMAIN:env.USERDOMAIN,// 'ESPSYS-I54570',
    //USERNAME:env.USERNAME,// 'espsys'
  };
}
const sendData=(conN)=>{
  let logOutFile=process.env.pm_out_log_path;
  let logErrFile=process.env.pm_err_log_path;
  let logOutSize=ut.fileSize(logOutFile);
  let logErrSize=ut.fileSize(logErrFile);
  let logOutText=logRead(logOutFile);
  let logErrText=logRead(logErrFile);

  let logLineAlert=watchLine({logOut:logOutFile,logErr:logErrFile});

  if(wss._readyState==1) wss.send(JSON.stringify({
    cmd:'watchApp',
    appName:appName,
    pid:process.pid,
    cpuN:os.cpus().length,
    osData:osData,
    env:proData(process.env),
    cpuUsage:process.cpuUsage(),
    memoryUsage:process.memoryUsage(),
    //resourceUsage:process.resourceUsage(),
    statis:getStatis(),
    logLineAlert:logLineAlert,
    logOutFile:logOutFile,
    logErrFile:logErrFile,
    logOutSize:logOutSize,
    logErrSize:logErrSize,
    logOutText:logOutText,
    logErrText:logErrText,
    conN:conN,
    time:+ new Date()
  }));

  //console.log(wss,'send wss');
}

/////////////////////////////////////////
const appSender=()=>{
  let conN=1;
  sendData(conN);
  setInterval(()=>{
    conN++;
    sendData(conN);
  },100*process.cfg.conf.rate.appListen);//개별앱들이 상태를 보고하는 주기 //퍼포먼스에 큰 영향을 미친다.//5초
}
/*const mthSender=(mthData)=>{
  if(wss._readyState==1) wss.send(JSON.stringify({
    cmd:'watchMtd',
    method:mthData.logMthMethod,
    data:mthData
  }));
}*/
const saveLogDiskSize=(sizeStr)=>{
  logDiskSize=sizeStr;
}
const saveLogCount=(countStr)=>{
  logCount=countStr;
}

/////////////////////////////////////////
const appCmds=(appCmd)=>{//앱을 재시동하거나 종료한다.
  let cmdExe='';
  //console.log(appCmd,appName,'watcher');

  if(appCmd.cmd=='restart'){
    cmdExe='pm2 restart '+appName;
  }
  else if(appCmd.cmd=='stop'){
    cmdExe='pm2 stop '+appName;
  }

  if(cmdExe && appCmd.cmd){

    let flushCmd='pm2 flush '+appName.replace('_','-');
    cli.exec(flushCmd,cliOption,(err,out,stderr)=>{
      if(!err) console.log('data clear',flushCmd);
    });

    //console.log(flushCmd,cmdExe,'watcher');
    cli.exec(cmdExe,cliOption,(err,out,stderr)=>{
      if(!err) console.log('admin command',cmdExe);
    });
  }
}

/////////////////////////////////////////
const appCfgExt=(appCmd)=>{//설정파일 배포
  //console.log(appCmd,'watcher');
  if(appCmd.cfName && appCmd.cfgData){
    let cfgPath=process.configDir+appCmd.cfName+'.json';
    //let cfgPath=process.rootDir+'DATA/cfg/'+appCmd.cfName+'.json';
    let cfgData=Object.assign({
      "cfgName": appCmd.cfName,
      "cfgMemo": process.cfg[appCmd.cfName].cfgMemo
    },appCmd.cfgData);
    fs.writeFileSync(cfgPath,JSON.stringify(cfgData,null,2));
    console.log('admin cfg',appCmd.cfName+'.json of',appCmd.machName,'edited');
    //console.log(cfgPath,cfgData);
  }
}

/////////////////////////////////////////
const appMthExt=(appCmd)=>{//설정파일 배포
  //console.log(appCmd,'watcher');
  if(appCmd.mthName && appCmd.schData){
    let mthPath=process.cfg.conf.dirs.mthDir+appCmd.mthName+'.json';
    let mthData=ut.readJson(mthPath);
    let schData={
      "method": appCmd.mthName,
      "methodNote": mthData.methodNote,
      "schema": appCmd.schData
    };
    fs.writeFileSync(mthPath,JSON.stringify(schData,null,2));
    console.log('admin mth',appCmd.mthName+'.json of',appCmd.machName,'edited');
    //console.log(mthPath,schData);
  }
}

/////////////////////////////////////////
let osData={};
let logCount='';
let logDiskSize='';

let logLastLine={
  logOut:{
    sizeLast:0,
    logSize:1,
    lineLast:[1,1,'']
  },
  logErr:{
    sizeLast:0,
    logSize:1,
    lineLast:[1,1,'']
  }
};//마지막으로 감시한 로그기록 줄번호

if(appConf.machSender==appName){
  //console.log(osData);
  osData=osDataMonit();//미리설정된 앱만 물리서버 데이터를 송신한다.
  setInterval(()=>{
    osData=osDataMonit();
  },1000*60);
}

/////////////////////////////////////////
const connect=()=>{
  let wsc=new ws.WebSocket(watchUrl);
  wssN++;
  console.log('watcher starting ('+wssN+')',watchUrl);

  wsc.on('open',()=>{
    wssN=0;
    console.log('watching');
  });
  wsc.on('message',(msg)=>{
    let appCmd={};
    try{
      if(Buffer.isBuffer(msg)) appCmd=JSON.parse(msg.toString('UTF8'));
      else appCmd=JSON.parse(msg);
    }catch{}
    //console.log(appCmd);

    if(appCmd.cfName) appCfgExt(appCmd);
    else if(appCmd.mthName) appMthExt(appCmd);
    else if(appCmd.cmd) appCmds(appCmd);
  });
  wsc.onerror=(e)=>{
    //console.log('socket error: closing socket');
    wsc.close();
  };
  wsc.onclose=(e)=>{//연결이 끊기면
    wss={};//객체를 초기화하고
    console.log('closed socket : reconnect after',delay,'second.');
    setTimeout(()=>{
      wss=connect();//다시 연결하여 객체를 갱신한다.
    },1000*delay);
  };
  return wsc;
}
setTimeout(()=>{
  wss=connect();
},1000*(delay/3));


/////////////////////////////////////////부팅시 해당 기존 로그를 초기화한다.
let startFlush='pm2 flush '+appName.replace('_','-');
cli.exec(startFlush,cliOption,(err,out,stderr)=>{
  if(!err) console.log('data clear',startFlush);
});


/////////////////////////////////////////
module.exports={
  osDataMonit:osDataMonit,//물리서버데이터

  proData:proData,
  watchLine:watchLine,

  appSender:appSender,
  //mthSender:mthSender,
  logRead:logRead,
  saveLogCount:saveLogCount,
  saveLogDiskSize:saveLogDiskSize,
  appCmds:appCmds,

  addContact:addContact,
  addBlocked:addBlocked,
  addClients:addClients,
  addStrange:addStrange,
  runStatis:runStatis,
  getStatis:getStatis
};