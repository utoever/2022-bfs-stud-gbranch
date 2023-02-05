////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/my.js');


////////////////////////
const memoList=(d)=>{
  let rs=[];
  let myc=my.con();
  //console.log('d',d);

  ///////////
  if(!d.page) d.page=1;
  if(!d.size) d.size=10;
  d.from=(d.page-1)*d.size;
  let schQry='';
  if(d.schKeyword) schQry+='AND (memoTitle LIKE "%'+ut.ads(d.schKeyword)+'%" OR memoText LIKE "%'+ut.ads(d.schKeyword)+'%") ';
  if(d.schPage) schQry+='AND (memoPage LIKE "%'+ut.ads(d.schPage)+'%" OR memoUrl LIKE "%'+ut.ads(d.schPage)+'%") ';

  ///////////
  let memoListQry=`
  SELECT
    *
  FROM
    memo
  WHERE
    memoFlag="Y"
    AND userKy="${ut.es(d.userKy)}"
    ${schQry}
  ORDER BY
    memoKy DESC
  LIMIT
    ${d.from},${d.size}
  ;`;
  rs.push(my.qry(memoListQry,myc));
  //console.log(memoListQry);

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const memoDelete=(memo)=>{
  //console.log(memo);
  let rs=[];
  let myc=my.con();

  if(memo.memoKy){
    ///////////
    let memoDeleteQry=`
    UPDATE
      memo
    SET
      memo.memoFlag="N"
    WHERE
      memo.memoKy="${ut.es(memo.memoKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(memoDeleteQry,myc));
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const memoAdd=(memo)=>{
  //console.log('memo',memo);
  let rs=[];
  let myc=my.con();

  if(!memo.memoKy && memo.userKy && memo.memoText){
    ///////////
    let memoAddQry=`
    INSERT INTO memo (
      userKy,#(FK)	사용자Ky(FK)	INT	NOT NULL	사용자Ky
      memoTitle,#	메모제목	VARCHAR(100)	NOT NULL	메모제목
      memoText,#	메모내용	TEXT	NULL	메모내용
      memoPage,#	메모페이지명	VARCHAR(200)	NULL	메모페이지명
      memoUrl,#	메모URL	VARCHAR(200)	NULL	메모URL
      memoDateCre,#	메모생성일	DATETIME	NOT NULL	메모생성일
      memoFlag#	메모상태	ENUM('N','Y')	NOT NULL	메모상태(무효,유효)
    ) VALUES (
      "${ut.es(memo.userKy)}",#(FK)	사용자Ky(FK)	INT	NOT NULL	사용자Ky
      "${ut.ads(memo.memoTitle)}",#	메모제목	VARCHAR(100)	NOT NULL	메모제목
      "${ut.ads(memo.memoText)}",#	메모내용	TEXT	NULL	메모내용
      "${ut.ads(memo.memoPage)}",#	메모페이지명	VARCHAR(200)	NULL	메모페이지명
      "${ut.ads(memo.memoUrl)}",#	메모URL	VARCHAR(200)	NULL	메모URL
      NOW(),
      "Y"
    )
    ;`;
    console.log('memoAddQry',memoAddQry);
    rs.push(my.qry(memoAddQry,myc));
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const memoUpdate=(memo)=>{
  //console.log(user);
  let rs=[];
  let myc=my.con();

  if(memo.memoKy && memo.memoText){
    ///////////
    let memoUpdateQry=`
    UPDATE
      memo
    SET
      memoTitle="${ut.ads(memo.memoTitle)}",#	메모제목	VARCHAR(100)	NOT NULL	메모제목
      memoText="${ut.ads(memo.memoText)}"#	메모내용	TEXT	NULL	메모내용
    WHERE
      memoKy="${ut.es(memo.memoKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(memoUpdateQry,myc));
  }
  //console.log(rs);

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
module.exports={
  memoList:memoList,
  memoAdd:memoAdd,
  memoDelete:memoDelete,
  memoUpdate:memoUpdate
};
