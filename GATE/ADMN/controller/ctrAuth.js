////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/my.js');

////////////////////////
const jwt=require('jsonwebtoken');
const sha2=require('sha2');
const secret='NodeBreaker95';

////////////////////////
const callVeri=(data)=>{
  if(data.token){
    let tData={};
    try{
      tData=jwt.verify(data.token,secret);
    }catch{}
    //console.log('decode',tData);

    if(tData.userId) return {
      flag:true,
      tData:tData
    };
    else return {
      flag:false,
      err:'failed verification'
    };
  }
}

////////////////////////
const myLogin=(data)=>{
  let rs=[];
  let myc=my.con();

  ///////////
  let userLoginQry=`
  SELECT
    user.userId,
    user.userKy,
    user.userName,
    user.userDiv,
    user.userFailN,
    co.coKy,
    co.coName,
    co.coCertDateEnd,
    co.coCertStat,
    co.coAuthStat
  FROM
    user
    LEFT JOIN co ON co.userKy=user.userKy AND co.coFlag="Y"
  WHERE
    user.userFlag="Y"
    AND user.userFailN<5
    AND user.userId="${data.userId}"
    AND user.userPs=SHA2("${ut.ads(data.userId+data.userPs)}",256)
  LIMIT 1
  ;`;
  //console.log(userLoginQry,'userLoginQry');
  rs.push(my.qry(userLoginQry,myc));

  /*console.log(my.qry(`
    select SHA2("${ut.ads(data.userId+data.userPs)}",256)
  `,myc));*/

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const callLogin=(data)=>{
  let user={};
  try{user=myLogin(data)[0][0];}catch{}
  //console.log(user,'user');

  if(user.userKy){
  //if(1){
    return{
      flag:true,
      user:user,
      token:jwt.sign(
        user,
        secret,
        {expiresIn:60*60*24*10}//10d
      )
    }
  }
  else return {
    flag:false,
    err:'wrong identification'
  }
}

////////////////////////
const authRes=(req)=>{//전체사용자인증
  let token='';
  let decode={};
  let flag=false;
  try{
    //console.log(req.cookies.token,'cookie-token');
    token=req.cookies.token;
    decode=callVeri({token:token});
    flag=decode.flag;
    //console.log(decode);
  }catch{}

  return flag;
}

////////////////////////
const authBlock=(req,res,fnc)=>{//관리자인증
  let token='';
  let decode={};
  let flag=false;
  let userDiv='';
  try{
    token=req.cookies.token;
    //console.log(req.cookies);
    decode=callVeri({token:token});
    flag=decode.flag;
    decode.tData.project=process.cfg.apps.project;
    userDiv=decode.tData.userDiv;

    //console.log(decode);
  }catch{}

  if(typeof fnc==='function'){
    if(userDiv=='general') res.send(ut.dlr('/co/auth'));//기관진입
    else if(flag) fnc(decode.tData);//관리자진입
    else res.send(ut.dlr('/on/login/101'));//인증실패
  }
}

////////////////////////
const authCo=(req,res,fnc)=>{//기관사용자인증
  let token='';
  let decode={};
  let flag=false;
  try{
    token=req.cookies.token;
    //console.log(req.cookies);
    decode=callVeri({token:token});
    flag=decode.flag;
    decode.tData.project=process.cfg.apps.project;
  }catch{}

  if(typeof fnc==='function'){
    if(flag) fnc(decode.tData);//기관진입
    else res.send(ut.dlr('/on/login/101'));//인증실패
  }
}

////////////////////////
const loginLog=(data)=>{//로그인기록남기기
  let userKy=null;
  if(Number(data.userKy)) userKy=Number(data.userKy);
  let rs=[];
  let myc=my.con();

  ///////////
  let loginLogQry=`
  INSERT INTO
  log
  (
    userKy      #INT                                       NULL     COMMENT '사용자Ky', -- 사용자Ky
    ,logName     #VARCHAR(50)                               NOT NULL COMMENT '로그명', -- 로그명
    ,logPos      #VARCHAR(50)                               NOT NULL COMMENT '로그위치', -- 로그위치
    ,logDiv      #ENUM('co','user','pro','mach','app','ex') NOT NULL COMMENT '로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)', -- 로그구분
    ,logType     #ENUM('login','work','alert','ex')         NOT NULL COMMENT '로그타입(로그인,작업,경고,기타)', -- 로그타입
    ,logDateCre  #DATETIME                                  NOT NULL COMMENT '로그생성일', -- 로그생성일
    ,logDataType #ENUM('text','json')                       NOT NULL COMMENT '로그데이터타입(텍스트,제이슨)', -- 로그데이터타입
    ,logData     #TEXT                                      NOT NULL COMMENT '로그데이터' -- 로그데이터
  )
  VALUES(
    ${userKy}      #INT                                       NULL     COMMENT '사용자Ky', -- 사용자Ky
    ,"loginLog"     #VARCHAR(50)                               NOT NULL COMMENT '로그명', -- 로그명
    ,"${data.userIp}"      #VARCHAR(50)                               NOT NULL COMMENT '로그위치', -- 로그위치
    ,"user"      #ENUM('co','user','pro','mach','app','ex') NOT NULL COMMENT '로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)', -- 로그구분
    ,"login"     #ENUM('login','work','alert','ex')         NOT NULL COMMENT '로그타입(로그인,작업,경고,기타)', -- 로그타입
    ,NOW()  #DATETIME                                  NOT NULL COMMENT '로그생성일', -- 로그생성일
    ,"json" #ENUM('text','json')                       NOT NULL COMMENT '로그데이터타입(텍스트,제이슨)', -- 로그데이터타입
    ,'${ut.ads(JSON.stringify(data))}'     #TEXT                                      NOT NULL COMMENT '로그데이터' -- 로그데이터
  )
  ;`;
  //console.log(loginLogQry,'loginLogQry');
  rs.push(my.qry(loginLogQry,myc));

  if(userKy){//로그인실패횟수초기화
    let loginFreeQry=`
    UPDATE
      user
    SET
      userFailN=0
    WHERE
      userKy="${userKy}"
    LIMIT 1
    ;`;
    //console.log(loginFreeQry,'loginFreeQry');
    rs.push(my.qry(loginFreeQry,myc));
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const loginBlockFree=(data)=>{//로그인실패횟수초기화
  let rs=[];
  let myc=my.con();

  ///////////
  if(data.userKy){
    let loginFreeQry=`
    UPDATE
      user
    SET
      userFailN=0
    WHERE
      userKy="${data.userKy}"
    LIMIT 1
    ;`;
    //console.log(loginFreeQry,'loginFreeQry');
    rs.push(my.qry(loginFreeQry,myc));
  }
  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const loginFail=(data)=>{//로그인실패횟수기록
  let rs=[];
  let myc=my.con();

  ///////////
  if(data.userId){
    let loginFailQry=`
    UPDATE
      user
    SET
      userFailN=userFailN+1
    WHERE
      userId="${data.userId}"
    LIMIT 1
    ;`;
    //console.log(loginFailQry,'loginFailQry');
    rs.push(my.qry(loginFailQry,myc));
  }
  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
module.exports={
  callLogin:callLogin,
  authRes:authRes,
  authBlock:authBlock,
  authCo:authCo,
  loginLog:loginLog,
  loginFail:loginFail,
  loginBlockFree:loginBlockFree,
  myLogin:myLogin
};