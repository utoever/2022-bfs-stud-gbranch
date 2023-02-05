////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/myv.js');


////////////////////////
/*CREATE TABLE `nv_10`.`card` (
	`cardKy`      INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
	`cardComCode` VARCHAR(3)    NOT NULL COMMENT '카드회사코드', -- 카드회사코드
	`cardNum`     VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
	`cardName`    VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
	`cardDiv`     VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
	`cardDateCre` DATETIME      NOT NULL COMMENT '카드입력일', -- 카드입력일
	`cardFlag`    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
)*/


////////////////////////
const cardCreate=(card)=>{
  //console.log(card);
  let rs={res:[],qry:[],err:[]};
  let cardComCode=ut.es(card.cardComCode);
  let cardNum=ut.es(card.cardNum);

  if(card.cardName) card.cardName=ut.ads(card.cardName);
  if(card.cardDiv) card.cardDiv=ut.ads(card.cardDiv);

  if(cardComCode && cardNum){
    //console.log(cardId+cardPs);
    let myc=my.con();

    ///////////
    let cardCreateQry=`
    INSERT INTO card (
      cardComCode # VARCHAR(3)    NOT NULL COMMENT '카드회사코드', -- 카드회사코드
      ,cardNum #     VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
      ,cardName #    VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
      ,cardDiv #     VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
      ,cardDateCre # DATETIME      NOT NULL COMMENT '카드입력일', -- 카드입력일
      ,cardFlag #    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
    ) VALUES (
      "${cardComCode}" #    VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
      ,"${cardNum}" #     VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
      ,"${card.cardName}" #    VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
      ,"${card.cardDiv}" #     VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
      ,NOW() # DATETIME      NOT NULL COMMENT '카드입력일', -- 카드입력일
      ,"Y" #    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
    )
    ;`;
    rs.qry.push(cardCreateQry);
    let cardCreateRs=my.qry(cardCreateQry,myc);
    if(cardCreateRs.e) rs.err.push(cardCreateRs.e);
    else rs.res.push(cardCreateRs);
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
const cardList=cardBalanceList=()=>{
  let rs={res:[],qry:[],err:[]};

  let myc=my.con();

  ///////////
  let cardListQry=`
  SELECT
    cardKy #     INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
    ,cardComCode #VARCHAR(3)    NOT NULL COMMENT '카드회사코드', -- 카드회사코드
    ,cardNum #    VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
    ,cardName #   VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
    ,cardDiv #    VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
    ,cardDateCre #DATETIME      NOT NULL COMMENT '카드입력일', -- 카드입력일
  FROM
    card
  WHERE
    card.cardFlag="Y" #    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
  ORDER BY
    cardKy DESC
  ;`;
  rs.qry.push(cardListQry);
  let cardListRs=my.qry(cardListQry,myc);
  if(cardListRs.e) rs.err.push(cardListRs.e);
  else rs.res.push(cardListRs);
  /*[{
    cardKy: 1,
    cardComCode: '050',
    cardNum: '0000111122223333',
    cardName: '좋은카드',
    cardDiv: '마스타특별카드',
    cardDateCre: '2022-08-16T10:18:00.000Z'
  }]*/

  ///////////
  my.end(myc);

  return rs;
}


////////////////////////
const cardRead=(card)=>{
  let rs={res:[],qry:[],err:[]};
  let cardKy=ut.es(card.cardKy);

  if(cardKy){
    let myc=my.con();

    ///////////
    let cardReadQry=`
    SELECT
    cardKy #     INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
    ,cardComCode #VARCHAR(3)    NOT NULL COMMENT '카드회사코드', -- 카드회사코드
    ,cardNum #    VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
    ,cardName #   VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
    ,cardDiv #    VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
    ,cardDateCre #DATETIME      NOT NULL COMMENT '카드입력일', -- 카드입력일
    FROM
      card
    WHERE
      card.cardFlag="Y" #    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
      AND cardKy="${cardKy}"
    LIMIT 1
    ;`;
    rs.qry.push(cardReadQry);
    let cardReadRs=my.qry(cardReadQry,myc);
    if(cardReadRs.e) rs.err.push(cardReadRs.e);
    else rs.res.push(cardReadRs);
    /*[{
      cardKy: 1,
      cardComCode: '050',
      cardNum: '0000111122223333',
      cardName: '좋은카드',
      cardDiv: '마스타특별카드',
      cardDateCre: '2022-08-16T10:18:00.000Z'
    }]*/

    ///////////
    my.end(myc);
  }
  return rs;
}


////////////////////////
const cardUpdate=(card)=>{
  let rs={res:[],qry:[],err:[]};
  let cardKy=ut.es(card.cardKy);

  if(card.cardName) card.cardName=ut.ads(card.cardName);
  if(card.cardDiv) card.cardDiv=ut.ads(card.cardDiv);

  if(cardKy){//
    let myc=my.con();

    ///////////
    let cardUpdateQry=`
    UPDATE
      card
    SET
      cardName="${card.cardName}" #    VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
      ,cardDiv="${card.cardDiv}" #     VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
    WHERE
      cardFlag="Y" #    ENUM('N','Y') NOT NULL COMMENT '카드상태(무효,유효)' -- 카드상태
      AND cardKy="${cardKy}"
    LIMIT 1
    ;`;
    rs.qry.push(cardUpdateQry);
    let cardUpdateRs=my.qry(cardUpdateQry,myc);
    if(cardUpdateRs.e) rs.err.push(cardUpdateRs.e);
    else rs.res.push(cardUpdateRs);
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
const cardDelete=(card)=>{
  let rs={res:[],qry:[],err:[]};
  let cardKy=ut.es(card.cardKy);

  if(cardKy){//
    let myc=my.con();

    ///////////
    let cardDeleteQry=`
    UPDATE
      card
    SET
      cardFlag="N" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
    WHERE
      cardFlag="Y" #        ENUM('N','Y') NOT NULL COMMENT '계좌상태(무효,유효)' -- 계좌상태
      AND cardKy="${cardKy}"
    LIMIT 1
    ;`;
    rs.qry.push(cardDeleteQry);
    let cardDeleteRs=my.qry(cardDeleteQry,myc);
    if(cardDeleteRs.e) rs.err.push(cardDeleteRs.e);
    else rs.res.push(cardDeleteRs);
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
  cardCreate:cardCreate,
  cardList:cardList,
  cardRead:cardRead,
  cardUpdate:cardUpdate,
  cardDelete:cardDelete
};