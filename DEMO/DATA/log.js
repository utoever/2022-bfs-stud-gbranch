//A.외부모둘, 상속
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
//거의 모든 앱이 공통적으로 사용하는 모듈들이다.
//여기에 언급된 모듈들은 반드시 물리서버마다 동일한 복사본을 만들어두어야 한다.
//테스트 버전에서는 DATA 디렉토리에 모아두었다.
const ut=require(process.rootDir+'DATA/ut.js');//유틸리티 모듬


///////////////////////////////////node_modules
//NPM 공개 모듈, 앱마다 필요한 모듈들이 다르며, 개별적으로 업데이트 가능하다.
const fs=require('fs');
const cli=require('child_process');//command line interpreter
//const prependFile=require('prepend-file');//Prepend data to a file, creating it if it doesn't exist.



/////////////////////
const conf=process.cfg.conf;//기본설정
const datDir=conf.dirs.datDir;
//const datDir='/home/nodejs/nb95/DATA/dat/';




/*
로그디렉토리구조

/home/nodejs/nb95/DATA/dat/
/home/nodejs/nb95/DATA/log/

  .list.txt(인덱스파일,날짜디렉토리목록)
  20221230(날짜-연간365개)/
  20221231(날짜-연간365개)/
  ...
    .list.txt(인덱스파일,시분디렉토리목록)
    2358(시분-일당1444개)/
    2359(시분-일당1444개)/
    ...
      .list.txt(인덱스파일,로그파일목록)
      xxx.json(로그-최대90000개)
      xxx.json(로그-최대90000개)
      ...
*/



//private
/////////////////////
/////////////////////
/////////////////////////////////////////
const cliOption={//CLI 옵션
  encoding:'utf8',
  timeout:0,
  maxBuffer:200*1024,
  killSignal:'SIGTERM',
  cwd:null,
  env:null
};
const cliCmd=(cmd,fnc)=>{//CLI명령
  cli.exec(cmd,cliOption,(err,out,stderr)=>{
    if(!err && typeof fnc==='function') fnc(out);
    else if(err) console.log(err);
  });
}

const makeList=(dir)=>{//디렉토리 인덱스를 작성한다.//시간이 소요되므로, 로그파일이 있는 최저층의 디렉토리를 탐색해서는 안된다.//즉 로그파일의 목록은 매번 기록시 추가된다.
  fs.readdir(dir,(e,files)=>{
    if(!e){
      files=files.sort().slice(1).reverse();//인덱스파일을 제외하고 역순으로 작성된다.
      fs.writeFile(
        dir+'.list.txt',
        files.join('\n')+'\n',
        (e)=>{
          //console.log(dir,'index',files);
      });
    }
  });
}

const delOlds=(dir,min)=>{//오래된 로그파일을 삭제한다.//대량데이터시 작동여부 확인필요.
  let thisTime=+ new Date();
  fs.readdir(dir,(e,files)=>{
    if(!e){
      for(let i in files){
        let file=files[i];
        let stat=fs.statSync(dir+file);
        let time=+ new Date(stat.ctime);
        if(thisTime-time>=1000*60*min){
          let cliStr='rm -rf '+dir+file;
          cliCmd(cliStr,()=>{
            //console.log(dir+file,'deleted olds files');
            makeList(dir);//연간일수365
          });
          //fs.rm(dir+file+'/',{recursive:true},(e)=>{});
          //console.log(cliStr);
        }
        //console.log(file,thisTime,time,thisTime-time,1000*60*min);
      }
    }
  });
}

const delAll=(base)=>{//해당디렉토리 안의 모든 내용을 비운다.//로그초기화
  let {path}=getLogDir(base);//로그디렉토리, 날짜별디렉토리
  delOlds(path,0);
}



//public
/////////////////////
/////////////////////
/////////////////////
const mkLogDate=(t)=>{//로그기록용 날짜시간을 반환한다
  let date;
  if(t) date=new Date(Number(t));
  else date=new Date();

  let year=date.getFullYear();
  let month=String(date.getMonth()+1).padStart(2,'0');
  let day=String(date.getDate()).padStart(2,'0');
  let hour=String(date.getHours()).padStart(2,'0');
  let minute=String(date.getMinutes()).padStart(2,'0');
  let second=String(date.getSeconds()).padStart(2,'0');
  let milli=String(date.getMilliseconds()).padStart(3,'0');
  return {
    thisYMD:year+month+day,//20221231
    thisHM:hour+minute,//2359
    //thisHMS:hour+minute+second,//235959
    //thisDHMS:day+hour+minute+second,//31245959
    logTime:year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second+' '+milli//2022-12-31 23:59:59 001
  };
};

const getTxt=(txtFile,lines=0)=>{//특정 텍스트파일의 마지막 몇줄을 읽는다.
  let txt=fs.readFileSync(txtFile,'utf8');
  if(!lines) return txt;
  else {
    let texts=txt.split('\n');
    if(texts.length>lines){
      texts=texts.slice(lines * -1);//음수변환//뒤에서부터자르기
      txt=texts.join('\n');
    }
    return txt;
  }
}

const getLogDir=(path,date,hm)=>{//로그디렉토리찾기
  let ret={};
  let {thisYMD,thisHM}=mkLogDate();
  if(!path) path=datDir;//설정값이 없으면 데이터로그디렉토리를 반환한다.
  if(!date) date=thisYMD+'/';
  if(!hm) hm=thisHM+'/';

  ret.path=path;
  ret.pathDate=path+date;
  ret.pathHm=ret.pathDate+hm;
  return ret;
}

/*const getLogList=(base)=>{//특정 로그디렉토리의 파일인덱스를 읽는다
  let {path}=getLogDir(base);//로그디렉토리
  let indexFile=path+'.list.txt';//파일인덱스명
  let txt='';
  if(fs.existsSync(indexFile)) txt=fs.readFileSync(indexFile,'utf8');
  return txt.trim().split('\n');
}*/
const getLogList=(dir)=>{//특정 로그디렉토리의 파일인덱스를 읽는다
  let {path}=getLogDir();//로그디렉토리
  if(dir) path=dir;
  let indexFile=path+'.list.txt';//파일인덱스명
  //console.log(indexFile);
  let txt='';
  if(fs.existsSync(indexFile)) txt=fs.readFileSync(indexFile,'utf8');
  return txt.trim().split('\n');
}

const mkLogDir=(base,fnc,date,hm)=>{//3단계 구조의 로그디렉토리를 자동 생성하고, 그 결과를 반환한다.
  let {path,pathDate,pathHm}=getLogDir(base,date,hm);
  fs.mkdir(pathHm,{recursive:true},(e)=>{
    if(typeof fnc==='function') fnc(pathHm);
    //자동으로 파일인덱스를 생성한다.//속도저하여부를 확인할 것.
    makeList(path);//연간일수365
    makeList(pathDate);//일간분수60*24=1440//분당 한번 갱신하게 될 것이다.//클러스터일 경우 각각 한번씩
    //makeList(pathHm);//최대초당1500*60=90000//자동으로 생성해서는 안된다.//필요한 경우에만 수동으로.
  });
}

const delLogOld=(base,fnc,mins=60*24)=>{
  let {path,pathDate}=getLogDir(base);//로그디렉토리, 날짜별디렉토리
  let days=Math.floor(mins/(60*24));
  if(days>0){//날짜별로 제거, 즉 최소 어제+오늘 치를 보관한다.
    delOlds(path,60*24*(days+1));
    //20220413,20220414,20220115...//여러날
    let list=getLogList(path);
    console.log(list.length,'dirs (d)',list[list.length-1],'~',list[0]);
  }//
  else{//오늘의 디렉토리만 보관하고, 분단위로 오래된 것을 삭제한다.
    delOlds(path,60*23);
    //20220415//오늘하나//오늘이전은 모두 삭제된다.
    delOlds(pathDate,mins);
    //0643,0644,0645...//여러시분
    let list=getLogList(pathDate);
    console.log(list.length,'dirs (m)',list[list.length-1],'~',list[0]);
  }
}

const saveLog=(path,logFile,str,fnc)=>{//로그파일을 저장한다.
  fs.writeFile(
    path+logFile,str,(e)=>{//저장
      if(!e){//저장에 성공하면 인덱스파일에도 추가한다.
        let indexFile=path+'.list.txt';
        if(typeof fnc==='function') fnc(indexFile);
        fs.appendFile(//인덱스파일 추가
          indexFile,logFile+'\n',(e)=>{}
        );
        //prependFile(indexFile,logFile+'\n');//오류로 제거
      }
  });
}



//exports
/////////////////////
/////////////////////
/////////////////////
module.exports={
  mkLogDate:mkLogDate,//로그기록용 날짜생성
  getTxt:getTxt,//파일읽기
  getLogList:getLogList,//파일인덱스반환
  getLogDir:getLogDir,//로그디렉토리찾기
  mkLogDir:mkLogDir,//로그디렉토리생성
  delLogOld:delLogOld,//오래된 로그 자동삭제
  saveLog:saveLog,//로그파일저장
}