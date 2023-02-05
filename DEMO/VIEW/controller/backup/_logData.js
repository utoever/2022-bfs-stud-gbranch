////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const log=require(process.rootDir+'DATA/log.js');//로그기록
const my=require(process.rootDir+'DATA/my.js');

////////////////////////
const fs=require('fs');

////////////////////////
const datDir=process.cfg.conf.dirs.datDir;

////////////////////////
const uTimeToDateHour=(t)=>{
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

////////////////////////
const makeLogInfo=(fileName)=>{
  let namer=fileName.split('--');
  let names=namer[1].split('_');
  let info={
    fileName:fileName,
    method:namer[0],
    time:names[0],
    key:names[1],
    div:names[2].substr(0,1)
  };
  return info;
}

////////////////////////
const list=(from=0,size=20)=>{

  let data={};
  if(!from) from=0;
  if(!size) size=20;
  if(size>1500) size=1500;

  let dirs=log.getLogDir();
  data.datDir=dirs.path;
  let dates=dirs.pathDate.split('/');
  data.date=dates[dates.length-2];
  let listTotal=log.getLogList(dirs.pathDate);
  data.total=listTotal.length;
  data.list=listTotal.slice(from,from+size);

  if(!data.list[0]||data.list[0]==''){
    data.total=0;
    data.list=[];
  }

  return data;
}

////////////////////////
const listLogs=(date,mins,from=0,size=20)=>{

  let data={};
  if(!from) from=0;
  if(!size) size=20;
  if(size>1500) size=1500;
  mins=String(mins).padStart(4,'0');

  let listTotal=log.getLogList(datDir+date+'/'+mins+'/');
  data.total=listTotal.length;
  data.list=listTotal.reverse().slice(from,from+size);
  //console.log(datDir+date+'/'+mins+'/');

  if(!data.list[0]||data.list[0]==''){
    data.total=0;
    data.list=[];
  }

  return data;
}

////////////////////////
const read=(logFile)=>{

  let data={logFilePath:''};
  data.info=makeLogInfo(logFile);
  data.dt=log.mkLogDate(data.info.time);
  data.logFilePath=datDir+data.dt.thisYMD+'/'+data.dt.thisHM+'/'+logFile
  if(fs.existsSync(data.logFilePath)) data.log=fs.readFileSync(data.logFilePath,'utf8');
  try{data.log=JSON.parse(data.log);}catch{}

  return data;
}

////////////////////////
const lastOneRead=(method)=>{
  //console.log(2);
  let data={logFilePath:'',log:{}};
  data.dirs=log.getLogDir();
  //console.log(data.dirs);
  
  data.hmList=log.getLogList(data.dirs.pathDate);
  //console.log(data.hmList);
  let nn=0;
  let list=[];
  for(let n in data.hmList){
    nn++;
    if(nn>=4) break;
    else{
      list=log.getLogList(data.dirs.pathDate+data.hmList[n]+'/').reverse();
      if(list[0]){
        //console.log(list);
        break;
      }
    }
  }

  for(let i in list){
    if(list[i].indexOf(method)>=0){
      data.logFileName=list[i];
      break;
    }
  }
  if(data.logFileName){
    data.logFilePath=data.dirs.pathHm+data.logFileName;
    if(fs.existsSync(data.logFilePath)){
      data.log=fs.readFileSync(data.logFilePath,'utf8');
      try{data.log=JSON.parse(data.log);}catch{}
    }
    delete data.dirs
    delete data.logFilePath;
    return data;
  }
  else return {};
}

////////////////////////
const find=(from=0,size=20,search,type)=>{

  const finder=(str)=>{
    if(str.indexOf(search)>=0) return true;
  }
  let data=[];
  if(!search) search='--';
  if(!from) from=0;
  if(!size) size=20;
  if(size>1500) size=1500;
  let dirs=log.getLogDir();
  let list=log.getLogList(dirs.pathDate);

  for(let i in list){
    let Hm=list[i];
    let pathHm=dirs.pathDate+Hm+'/';
    let logList=log.getLogList(pathHm).reverse();

    for(let n in logList){
      let logPath=pathHm+logList[n];

      if(finder(logPath)){
        let dts=logPath.split('/');
        let names=logList[n].split('--');
        let keys=names[1].split('_');

        let dt={
          //logPath:logPath,
          file:logList[n],
          date:dts[dts.length-3],
          Hm:dts[dts.length-2],
          method:names[0],
          time:Number(keys[0]),
          key:keys[1]
        };
        data.push(dt);
      }
      if(data.length>=size) break;
    }
    if(data.length>=size) break;
  }



  //console.log(from,size,search,type);
  //console.log(data);
  //data.list=log.getLogList(datDir+date+'/'+mins+'/').reverse().slice(from,from+size);
  //console.log(datDir+date+'/'+mins+'/');

  return data;
}

////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////
const searcher=(from=0,size=10,flag=false,search='')=>{

  const finder=(ele)=>{
    if(ele.indexOf(search)>=0) return true;
  }
  let data={};
  let limit=20;//목록최대한계//이상의 목록검색은 제한된다.
  let {thisYMD,thisHM}=log.mkLogDate();
  let lg=log.getLogDir(datDir,thisYMD+'/',thisHM+'/');
  //console.log(lg);

  let days=log.getLogList(lg.path);
  //console.log(days);
  let listLogs=[];
  if(Array.isArray(days)) for(let i in days){
    let dayDir=datDir+days[i]+'/';
    //console.log(dayDir);
    let mins=log.getLogList(dayDir);
    //console.log(mins);
    if(Array.isArray(mins)) for(let i in mins){
      let minDir=dayDir+mins[i]+'/';
      //console.log(minDir);
      let logs=log.getLogList(minDir).reverse();
      //console.log(logs);

      if(search && Number(search)!=0){
        logs=logs.filter(finder);
      }
      listLogs=listLogs.concat(logs);
      if(listLogs.length>=limit) break;//분단위로 브레이크된다.예를 들어 초당 20000건이라 해도 모두 리스트된다.
    }
    if(listLogs.length>=limit) break;//일단위로 브레이크된다.
  }
  listLogs=listLogs.slice(0,limit);//총량통제
  //console.log(listLogs);
  data.listLogs=listLogs;


  //let logData='';
  //let logDataPath=pathHm+logDataFile;
  //console.log(logDataPath);

/*
  try{
    logData=JSON.parse(fs.readFileSync(logDataPath).toString('utf8'));
  }catch{}
*/

/*
  let {StndTranBaseMilli}=ut.mkDate();
  let dayDatDir=datDir+StndTranBaseMilli.substr(0,10)+'/';
  try{list=fs.readdirSync(dayDatDir);}catch{}

  for(let i in list){
    let fileName=list[i];
    //console.log(fileName,search,fileName.indexOf(search));
    if(fileName.indexOf(search)>=0){

      let info=makeLogInfo(fileName);
      let logData='';
      if(flag){
        logData=ut.readJson(dayDatDir+fileName);
      }
      if(!datas[info.key]) datas[info.key]={
        method:info.method,
        time:info.time,
        key:info.key,
        divs:[{
          fileName:fileName,
          time:info.time,
          div:info.div,
          logData:logData
        }]
      };
      else{
        datas[info.key].divs.push({
          fileName:fileName,
          time:info.time,
          div:info.div,
          logData:logData
        });
      }
    }
  }
  //console.log(search,Object.keys(datas).length);

  delete list;
  for(let i in datas){
    lists.push(datas[i]);
    //console.log(datas[i].key);
  }
  delete datas;

  lists=ut.sortAryByKey(lists,'time').reverse();
  lists=lists.splice(Number(from),Number(size));
  //console.log(lists);
*/

  return data;
}

////////////////////////
/*const find=(fileName)=>{
  let info=makeLogInfo(fileName);
  let logData={};
  logData=ut.readJson(datDir+uTimeToDateHour(info.time)+'/'+fileName);
  info.logData=logData;
  delete logData;
  return info;
}*/

////////////////////////
const saveLogPos=(data)=>{
  let userKy=null;
  if(Number(data.userKy)) userKy=Number(data.userKy);
  let rs=[];
  let myc=my.con();

  ///////////
  let saveLogPosQry=`
  INSERT INTO
  log
  (
    userKy      #INT                                       NULL     COMMENT '사용자Ky', -- 사용자Ky
    ,logName     #VARCHAR(50)                               NOT NULL COMMENT '로그명', -- 로그명
    ,logPos      #VARCHAR(50)                               NOT NULL COMMENT '로그위치', -- 로그위치
    ,logDiv      #ENUM('co','user','pro','mach','app','ex') NOT NULL COMMENT '로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)', -- 로그구분
    ,logType     #ENUM('login','work','alert','ex')         NOT NULL COMMENT '로그타입(로그인,작업,경고,기타)', -- 로그타입
    ,logDateCre  #DATETIME                                  NOT NULL COMMENT '로그생성일', -- 로그생성일
    #,logDataType #ENUM('text','json')                       NOT NULL COMMENT '로그데이터타입(텍스트,제이슨)', -- 로그데이터타입
    #,logData     #TEXT                                      NOT NULL COMMENT '로그데이터' -- 로그데이터
  )
  VALUES(
    ${userKy}      #INT                                       NULL     COMMENT '사용자Ky', -- 사용자Ky
    ,"contactPos"     #VARCHAR(50)                               NOT NULL COMMENT '로그명', -- 로그명
    ,"${data.pos}"      #VARCHAR(50)                               NOT NULL COMMENT '로그위치', -- 로그위치
    ,"user"      #ENUM('co','user','pro','mach','app','ex') NOT NULL COMMENT '로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)', -- 로그구분
    ,"work"     #ENUM('login','work','alert','ex')         NOT NULL COMMENT '로그타입(로그인,작업,경고,기타)', -- 로그타입
    ,NOW()  #DATETIME                                  NOT NULL COMMENT '로그생성일', -- 로그생성일
    #,"json" #ENUM('text','json')                       NOT NULL COMMENT '로그데이터타입(텍스트,제이슨)', -- 로그데이터타입
    #,'${ut.ads(JSON.stringify(data))}'     #TEXT                                      NOT NULL COMMENT '로그데이터' -- 로그데이터
  )
  ;`;
  //console.log(saveLogPosQry,'saveLogPosQry');
  rs.push(my.qry(saveLogPosQry,myc));

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
module.exports={
  list:list,
  listLogs:listLogs,
  read:read,
  lastOneRead:lastOneRead,
  find:find,
  saveLogPos:saveLogPos
};