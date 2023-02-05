////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const lgDir=process.cfg.conf.dirs.lgDir;
const appNmToMth=process.cfg.appNmToMth;

/////////////////////////////////////////
const fs=require('fs');

/////////////////////////////////////////
const logSave=(data)=>{
  let {StndTranBaseYmd}=ut.mkDate();
  let fileName=lgDir+'alert_'+StndTranBaseYmd+'.txt';

  //클러스터가 실행되면, 동일한 에러를 클러스터 수만큼 반복해서 보고하는 에러가 발생한다.
  //따라서 에러파일을 쓰기전에 먼저 동일한 내용이 있는지 검사하는 로직을 넣어야 한다.
  //이때 발생 시간 값 탓에 유니크해지므로, 시간을 제외한 나머지 동일한 값이 있는지 확인하고,
  //문제 없다면 시간을 덧붙여서 쓰는 방식으로 기록해야 한다.

  let txt=' ';
  try{
    txt=fs.readFileSync(fileName).toString();
    txt=txt.split('\n');
    txt=txt[txt.length-2];//기존 파일의 마지막 줄
  }catch{}
  let newText=JSON.stringify(data);
  
  //console.log(1,txt);
  //console.log(2,newText);

  let searchFlag=true;
  if(txt){
    if(txt.length>10) try{
      //console.log(3,txt.substr(0,txt.length-5),newText.substr(0,newText.length-1));
      if(txt.substr(0,txt.length-5).indexOf(newText.substr(0,newText.length-1))<0) searchFlag=true;//동일한 내용이 있다면
      else searchFlag=false;//없다면
    }catch{}
  }

  if(searchFlag){
    data.time=+ new Date();
    let str=JSON.stringify(data)+'\n';
    ut.logger(fileName,str);
  }
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
    //time:+ new Date()
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
    //time:+ new Date()
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