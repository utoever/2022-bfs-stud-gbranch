////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/myv.js');


////////////////////////
/*CREATE TABLE `nv_10`.`acc` (
	`accKy`          INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
	`accBankCode`    VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
	`accNum`         VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
	`accOwner`       VARCHAR(20)   NULL     COMMENT '계좌주명', -- 계좌주명
	`accName`        VARCHAR(50)   NULL     COMMENT '계좌명', -- 계좌명
	`accDiv`         VARCHAR(50)   NULL     COMMENT '계좌종류', -- 계좌종류
	`accBalance`     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
	`accDateBalance` DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
	`accDateCre`     DATETIME      NOT NULL COMMENT '계좌입력일', -- 계좌입력일
	`accFlag`        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
)*/


////////////////////////
const accCreate=(acc)=>{
  //console.log(acc);
  let rs={res:[],qry:[],err:[]};
  let accBankCode=ut.es(acc.accBankCode);
  let accNum=ut.es(acc.accNum);
  let accBalance=Number(ut.es(acc.accBalance));

  if(accBankCode && accNum){
    //console.log(accId+accPs);
    let myc=my.con();

    ///////////
    let accCreateQry=`
    INSERT INTO acc (
      accBankCode #    VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
      ,accNum #         VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
      ,accBalance #     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
      ,accDateBalance # DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
      ,accDateCre #     DATETIME      NOT NULL COMMENT '계좌입력일', -- 계좌입력일
      ,accFlag #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
    ) VALUES (
      "${accBankCode}" #    VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
      ,"${accNum}" #         VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
      ,"${accBalance}" #     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
      ,NOW() # DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
      ,NOW() #     DATETIME      NOT NULL COMMENT '계좌입력일', -- 계좌입력일
      ,"Y" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
    )
    ;`;
    rs.qry.push(accCreateQry);
    let accCreateRs=my.qry(accCreateQry,myc);
    if(accCreateRs.e) rs.err.push(accCreateRs.e);
    else rs.res.push(accCreateRs);
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
const accRead=(acc)=>{
  let rs={res:[],qry:[],err:[]};
  let accKy=ut.es(acc.accKy);

  if(accKy){
    let myc=my.con();

    ///////////
    let accReadQry=`
    SELECT
      accKy #         INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
      ,accBankCode #   VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
      ,accNum #        VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
      ,accOwner #      VARCHAR(20)   NULL     COMMENT '계좌주명', -- 계좌주명
      ,accName #       VARCHAR(50)   NULL     COMMENT '계좌명', -- 계좌명
      ,accDiv #        VARCHAR(50)   NULL     COMMENT '계좌종류', -- 계좌종류
      ,accBalance #    INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
      ,accDateBalance #DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
      ,accDateCre #    DATETIME      NOT NULL COMMENT '계좌입력일', -- 계좌입력일
    FROM
      acc
    WHERE
      acc.accFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
      AND accKy="${accKy}"
    LIMIT 1
    ;`;
    rs.qry.push(accReadQry);
    let accReadRs=my.qry(accReadQry,myc);
    if(accReadRs.e) rs.err.push(accReadRs.e);
    else rs.res.push(accReadRs);
    /*[{
      accKy: 1,
      accBankCode: '020',
      accNum: '12345467890123',
      accOwner: '홍길동',
      accName: '용돈통장',
      accDiv: '265저축통장',
      accBalance: 3500,
      accDateBalance: '2022-08-16T07:41:34.000Z',
      accDateCre: '2022-08-16T08:54:39.000Z'
    }]*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const accList=accBalanceList=()=>{
  let rs={res:[],qry:[],err:[]};

  let myc=my.con();

  ///////////
  let accListQry=`
  SELECT
    accKy #         INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
    ,accBankCode #   VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
    ,accNum #        VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
    ,accOwner #      VARCHAR(20)   NULL     COMMENT '계좌주명', -- 계좌주명
    ,accName #       VARCHAR(50)   NULL     COMMENT '계좌명', -- 계좌명
    ,accDiv #        VARCHAR(50)   NULL     COMMENT '계좌종류', -- 계좌종류
    ,accBalance #    INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
    ,accDateBalance #DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
    ,accDateCre #    DATETIME      NOT NULL COMMENT '계좌입력일', -- 계좌입력일
  FROM
    acc
  WHERE
    acc.accFlag="Y" #   ENUM('N','Y')                    NOT NULL COMMENT '회원상태(무효,유효)' -- 회원상태
  ORDER BY
    accKy DESC
  ;`;
  rs.qry.push(accListQry);
  let accListRs=my.qry(accListQry,myc);
  if(accListRs.e) rs.err.push(accListRs.e);
  else rs.res.push(accListRs);
  /*[{
    accKy: 1,
    accBankCode: '020',
    accNum: '12345467890123',
    accOwner: '홍길동',
    accName: '용돈통장',
    accDiv: '265저축통장',
    accBalance: 3500,
    accDateBalance: '2022-08-16T07:41:34.000Z',
    accDateCre: '2022-08-16T08:54:39.000Z'
  }]*/

  ///////////
  my.end(myc);

  return rs;
}


////////////////////////
const accUpdate=(acc)=>{
  let rs={res:[],qry:[],err:[]};
  let accKy=ut.es(acc.accKy);
  
  if(acc.accOwner) acc.accOwner=ut.ads(acc.accOwner);
  if(acc.accName) acc.accName=ut.ads(acc.accName);
  if(acc.accDiv) acc.accDiv=ut.ads(acc.accDiv);

  if(accKy){//
    let myc=my.con();

    ///////////
    let accUpdateQry=`
    UPDATE
      acc
    SET
      accOwner="${acc.accOwner}" #VARCHAR(20)   NULL     COMMENT '계좌주명', -- 계좌주명
      ,accName="${acc.accName}" #VARCHAR(50)   NULL     COMMENT '계좌명', -- 계좌명
      ,accDiv="${acc.accDiv}" #VARCHAR(50)   NULL     COMMENT '계좌종류', -- 계좌종류
    WHERE
      accFlag="Y" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
      AND accKy="${accKy}"
    LIMIT 1
    ;`;
    rs.qry.push(accUpdateQry);
    let accUpdateRs=my.qry(accUpdateQry,myc);
    if(accUpdateRs.e) rs.err.push(accUpdateRs.e);
    else rs.res.push(accUpdateRs);
    /*{
      changedRows: 1,
      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
      affectedRows: 1,
    }*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const accBalanceUpdate=(acc)=>{
  let rs={res:[],qry:[],err:[]};
  let accKy=ut.es(acc.accKy);
  
  if(acc.accBalance) acc.accBalance=ut.es(acc.accBalance);

  if(accKy){//
    let myc=my.con();

    ///////////
    let accBalanceUpdateQry=`
    UPDATE
      acc
    SET
      accBalance="${acc.accBalance}" #     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
      ,accDateCre=NOW() # DATETIME      NOT NULL COMMENT '계좌잔액입력일', -- 계좌잔액입력일
    WHERE
      accFlag="Y" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
      AND accKy="${accKy}"
    LIMIT 1
    ;`;
    rs.qry.push(accBalanceUpdateQry);
    let accBalanceUpdateRs=my.qry(accBalanceUpdateQry,myc);
    if(accBalanceUpdateRs.e) rs.err.push(accBalanceUpdateRs.e);
    else rs.res.push(accBalanceUpdateRs);
    /*{
      changedRows: 1,
      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
      affectedRows: 1,
    }*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const accDelete=(acc)=>{
  let rs={res:[],qry:[],err:[]};
  let accKy=ut.es(acc.accKy);
  
  if(acc.accBalance) acc.accBalance=ut.es(acc.accBalance);

  if(accKy){//
    let myc=my.con();

    ///////////
    let accDeleteQry=`
    UPDATE
      acc
    SET
      accFlag="N" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
    WHERE
      accFlag="Y" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
      AND accKy="${accKy}"
    LIMIT 1
    ;`;
    rs.qry.push(accDeleteQry);
    let accDeleteRs=my.qry(accDeleteQry,myc);
    if(accDeleteRs.e) rs.err.push(accDeleteRs.e);
    else rs.res.push(accDeleteRs);
    /*{
      changedRows: 1,
      message: '(Rows matched: 1  Changed: 1  Warnings: 0',
      affectedRows: 1,
    }*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
module.exports={
  accCreate:accCreate,
  accRead:accRead,
  accList:accList,
  accBalanceList:accBalanceList,
  accUpdate:accUpdate,
  accBalanceUpdate:accBalanceUpdate,
  accDelete:accDelete,
};