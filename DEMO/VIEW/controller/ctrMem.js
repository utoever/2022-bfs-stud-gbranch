////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/myv.js');


////////////////////////
/*CREATE TABLE `nv_10`.`mem` (
	`memKy`      INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
	`memId`      VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
	`memPs`      VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
	`memDiv`     ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
	`memGrade`   INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
	`memName`    VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
	`memRoll`    VARCHAR(50)                      NULL     COMMENT '회원직책/급', -- 회원직책/급
	`memDep`     VARCHAR(50)                      NULL     COMMENT '회원부서', -- 회원부서
	`memDateCre` DATETIME                         NOT NULL COMMENT '회원생성일', -- 회원생성일
	`memFailN`   INT                              NOT NULL COMMENT '회원로그인실패수', -- 회원로그인실패수
	`memFlag`    ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
)*/


////////////////////////
const memCreate=(mem)=>{
  //console.log(mem);
  let rs={res:[],qry:[],err:[]};
  let memId=ut.ads(mem.memId).toUpperCase();
  let memPs=ut.ads(mem.memPs);
  let memName=ut.ads(mem.memName);

  if(ut.isId(memId) && ut.isPs(memPs)){
    //console.log(memId+memPs);
    let myc=my.con();

    ///////////
    let memCreateQry=`
    INSERT INTO mem (
      memId #     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
      ,memPs #     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
      ,memDiv #    ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
      ,memGrade #  INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
      ,memName #   VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
      ,memDateCre # DATETIME                         NOT NULL COMMENT '회원생성일', -- 회원생성일
      ,memFlag #    ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
    ) VALUES (
      "${memId}" #     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
      ,SHA2("${(memId+memPs)}",256) #     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
      ,"general" #    ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
      ,0 #  INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
      ,"${memName}" #   VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
      ,NOW() # DATETIME                         NOT NULL COMMENT '회원생성일', -- 회원생성일
      ,"Y" #    ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
    )
    ;`;
    rs.qry.push(memCreateQry);
    let memCreateRs=my.qry(memCreateQry,myc);
    if(memCreateRs.e) rs.err.push(memCreateRs.e);
    else rs.res.push(memCreateRs);
    /*{
      insertId: 1,
      affectedRows: 1,
    }*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const memRead=(mem)=>{
  let rs={res:[],qry:[],err:[]};
  let memKy=ut.es(mem.memKy);
  let memId=ut.ads(mem.memId).toUpperCase();
  let whereMem='';


  if(ut.isId(memId) || memKy){
    let myc=my.con();
    if(memKy) whereMem=`AND mem.memKy="${memKy}"`;
    else whereMem=`AND mem.memId="${memId}"`;

    ///////////
    let memReadQry=`
    SELECT
      mem.memKy #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
      ,mem.memId #VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
      ,mem.memDiv #ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
      ,mem.memGrade #INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
      ,mem.memName #VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
      ,mem.memRoll #VARCHAR(50)                      NULL     COMMENT '회원직책/급', -- 회원직책/급
      ,mem.memDep #VARCHAR(50)                      NULL     COMMENT '회원부서', -- 회원부서
      ,mem.memDateCre #DATETIME                         NOT NULL COMMENT '회원생성일', -- 회원생성일
      ,mem.memFailN #INT                              NOT NULL COMMENT '회원로그인실패수', -- 회원로그인실패수
    FROM
      mem
    WHERE
      mem.memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
      ${whereMem}
      #AND (mem.memDiv="admin" OR mem.memDiv="system")
    LIMIT 1
    ;`;
    rs.qry.push(memReadQry);
    let memReadRs=my.qry(memReadQry,myc);
    if(memReadRs.e) rs.err.push(memReadRs.e);
    else rs.res.push(memReadRs);
    /*[{
      memKy: 4,
      memId: 'ADMIN',
      memDiv: 'general',
      memGrade: 0,
      memName: 'administrator',
      memRoll: null,
      memDep: null,
      memDateCre: '2022-08-16T01:33:18.000Z',
      memFailN: 0
    }]*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const memList=()=>{
  let rs={res:[],qry:[],err:[]};
  let myc=my.con();

  ///////////
  let memListQry=`
  SELECT
    mem.memKy #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
    ,mem.memId #VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
    ,mem.memDiv #ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
    ,mem.memGrade #INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
    ,mem.memName #VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
    ,mem.memRoll #VARCHAR(50)                      NULL     COMMENT '회원직책/급', -- 회원직책/급
    ,mem.memDep #VARCHAR(50)                      NULL     COMMENT '회원부서', -- 회원부서
    ,mem.memDateCre #DATETIME                         NOT NULL COMMENT '회원생성일', -- 회원생성일
    ,mem.memFailN #INT                              NOT NULL COMMENT '회원로그인실패수', -- 회원로그인실패수
  FROM
    mem
  WHERE
    mem.memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
    #AND (mem.memDiv="admin" OR mem.memDiv="system")
  ORDER BY
    mem.memKy ASC
  ;`;
  rs.qry.push(memListQry);
  let memListRs=my.qry(memListQry,myc);
  if(memListRs.e) rs.err.push(memListRs.e);
  else rs.res.push(memListRs);
  /*[{
    memKy: 4,
    memId: 'ADMIN',
    memDiv: 'general',
    memGrade: 0,
    memName: 'administrator',
    memRoll: null,
    memDep: null,
    memDateCre: '2022-08-16T01:33:18.000Z',
    memFailN: 0
  }]*/

  ///////////
  my.end(myc);
  return rs;
}


////////////////////////
const memUpdate=(mem)=>{
  let rs={res:[],qry:[],err:[]};
  let memKy=ut.es(mem.memKy);
  let memKyAdm=ut.es(mem.memKyAdm);

  if(mem.memDiv) mem.memDiv=ut.ads(mem.memDiv);
  if(mem.memGrade) mem.memGrade=ut.es(mem.memGrade);
  if(mem.memName) mem.memName=ut.ads(mem.memName);
  if(mem.memRoll) mem.memRoll=ut.ads(mem.memRoll);
  if(mem.memDep) mem.memDep=ut.ads(mem.memDep);


  if(memKy && memKyAdm){//
    let myc=my.con();

    let memDivAdm='';
    try{
      let memReadAdm=memRead({memKy:memKyAdm});
      //console.log(memReadAdm);
      memDivAdm=memReadAdm.res[0][0].memDiv;
    }catch{}

    if(memKy==memKyAdm||memDivAdm=='system'||memDivAdm=='admin'){

      ///////////
      let memUpdateQry=`
      UPDATE
        mem
      SET
        memDiv="${mem.memDiv}" #ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
        ,memGrade="${mem.memGrade}" #INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
        ,memName="${mem.memName}" #VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
        ,memRoll="${mem.memRoll}" #NULL     COMMENT '회원직책/급', -- 회원직책/급
        ,memDep="${mem.memDep}" #NULL     COMMENT '회원부서', -- 회원부서
      WHERE
        memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
        AND memKy="${memKy}"
      LIMIT 1
      ;`;
      rs.qry.push(memUpdateQry);
      let memUpdateRs=my.qry(memUpdateQry,myc);
      if(memUpdateRs.e) rs.err.push(memUpdateRs.e);
      else rs.res.push(memUpdateRs);
      /*{
        changedRows: 1,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        affectedRows: 1,
      }*/
    }

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const memPsUpdate=(mem)=>{
  let rs={res:[],qry:[],err:[]};
  let memKy=ut.es(mem.memKy);
  let memKyAdm=ut.es(mem.memKyAdm);
  let memId=ut.ads(mem.memId).toUpperCase();
  let memPs=ut.ads(mem.memPs);
  let memPsOld=ut.ads(mem.memPsOld);

  if(ut.isId(memId) && ut.isPs(memPs) && memKy && memKyAdm){//
    let myc=my.con();

    let memDivAdm='';
    let wherePsOld='AND memPs=SHA2("'+(memId+memPsOld)+'",256)';
    let admFlag=false
    try{
      let memReadAdm=memRead({memKy:memKyAdm});
      //console.log(memReadAdm);
      memDivAdm=memReadAdm.res[0][0].memDiv;
    }catch{}
    
    if(memDivAdm=='system'||memDivAdm=='admin') wherePsOld='';


    if(memKy==memKyAdm||!wherePsOld){

      ///////////
      let memPsUpdateQry=`
      UPDATE
        mem
      SET
        memPs=SHA2("${(memId+memPs)}",256) #     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
      WHERE
        memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
        AND memKy="${memKy}"
        ${wherePsOld}
      LIMIT 1
      ;`;
      rs.qry.push(memPsUpdateQry);
      let memPsUpdateRs=my.qry(memPsUpdateQry,myc);
      if(memPsUpdateRs.e) rs.err.push(memPsUpdateRs.e);
      else rs.res.push(memPsUpdateRs);
      /*{
        changedRows: 1,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        affectedRows: 1,
      }*/
    }

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const memDelete=(mem)=>{
  let rs={res:[],qry:[],err:[]};
  let memKy=ut.es(mem.memKy);
  let memKyAdm=ut.es(mem.memKyAdm);

  if(memKy && memKyAdm){
    let myc=my.con();

    let memDivAdm='';
    try{
      let memReadAdm=memRead({memKy:memKyAdm});
      //console.log(memReadAdm);
      memDivAdm=memReadAdm.res[0][0].memDiv;
    }catch{}
    
    if(memDivAdm=='system'||memDivAdm=='admin'){

      ///////////
      let memDeleteQry=`
      UPDATE
        mem
      SET
        memFlag="N" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
      WHERE
        memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
        AND memKy="${memKy}"
      LIMIT 1
      ;`;
      rs.qry.push(memDeleteQry);
      let memDeleteRs=my.qry(memDeleteQry,myc);
      if(memDeleteRs.e) rs.err.push(memDeleteRs.e);
      else rs.res.push(memDeleteRs);
      /*{
        changedRows: 1,
        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        affectedRows: 1,
      }*/
    }

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const memIdExist=(mem)=>{
  let rs={res:[],qry:[],err:[]};
  let memId=ut.ads(mem.memId).toUpperCase();
  let whereMem='';


  if(ut.isId(memId)){
    let myc=my.con();

    ///////////
    let memIdExistQry=`
    SELECT
      mem.memKy #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
    FROM
      mem
    WHERE
      mem.memFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
      AND mem.memId="${memId}" #   VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
      #AND (mem.memDiv="admin" OR mem.memDiv="system")
    LIMIT 1
    ;`;
    rs.qry.push(memIdExistQry);
    let memIdExistRs=my.qry(memIdExistQry,myc);
    if(memIdExistRs.e) rs.err.push(memIdExistRs.e);
    else rs.res.push(memIdExistRs);
    /*[{
      memKy: 4
    }]*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
module.exports={
  memCreate:memCreate,
  memRead:memRead,
  memList:memList,
  memUpdate:memUpdate,
  memPsUpdate:memPsUpdate,
  memDelete:memDelete,
  memIdExist:memIdExist,
};