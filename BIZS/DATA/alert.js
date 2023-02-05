////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const lgDir=process.cfg.conf.dirs.lgDir;
const appNmToMth=process.cfg.appNmToMth;

/////////////////////////////////////////
const logSave=(data)=>{
  let {StndTranBaseYmd}=ut.mkDate();
  let fileName=lgDir+'alert_'+StndTranBaseYmd+'.txt';
  let str=JSON.stringify(data)+'\n';
  ut.logger(fileName,str);
  return fileName;
}

/////////////////////////////////////////
const alertHealth=(aName,str)=>{
  let data={
    title:'서버앱 상태이상', //#	로그명	VARCHAR(50)	NOT NULL	로그명
    appName:aName, //#	로그위치	VARCHAR(50)	NOT NULL	로그위치
    method:appNmToMth[aName],
    div:'app', //#	로그구분	ENUM('co','user','pro','mach','app','ex')	NOT NULL	로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)
    type:'appStat', //#	로그타입	ENUM('work','alert','ex')	NOT NULL	로그타입(작업,경고,기타)
    dataType:'text', //#	로그데이터타입	ENUM('text','json')	NOT NULL	로그데이터타입(텍스트,제이슨)
    data:str, //#	로그데이터	TEXT	NOT NULL	로그데이터
    time:+ new Date()
  };
  //console.log(data);
  let logFile=logSave(data);
  //if(logFile) console.log(logFile);
}

/////////////////////////////////////////
const alertErr=(aName,file)=>{
  /*file={
    lines:[lineFrom,lineTo,filePath],
    str:'comment'
  }*/
  let data={
    title:'서버앱 에러', //#	로그명	VARCHAR(50)	NOT NULL	로그명
    appName:aName, //#	로그위치	VARCHAR(50)	NOT NULL	로그위치
    method:appNmToMth[aName],
    div:'app', //#	로그구분	ENUM('co','user','pro','mach','app','ex')	NOT NULL	로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)
    type:'logError', //#	로그타입	ENUM('work','alert','ex')	NOT NULL	로그타입(작업,경고,기타)
    dataType:file.lines, //#	[lineFrom,lineTo,filePath]
    data:file.str, //#	로그데이터	TEXT	NOT NULL	로그데이터
    time:+ new Date()
  };
  //console.log(data);
  let logFile=logSave(data);
  //if(logFile) console.log(logFile);
}

/////////////////////////////////////////
module.exports={
  alertHealth:alertHealth,
  alertErr:alertErr
};