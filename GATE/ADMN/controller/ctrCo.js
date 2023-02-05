////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/my.js');

/*{
  "userKy": 2,
  "userId": "esp",
  "userDiv": "general",
  "userName": "esp systems",
  "coKy": 1,
  "coName": "esp systems",
  "coDiv": "private",
  "coRegNum": null,
  "coDomainSSL": null,
  "coTel": null,
  "coMail": null,
  "coCertDateEnd": null,
  "coCertDateStart": null,
  "coCertDateCre": null,
  "coCertInfo": null,
  "coApiKey": null,
  "coCdnCode": null,
  "coAuthUrl": null,
  "coCertStat": "N",
  "coAuthStat": "N",
  "coDateCre": "2022-03-24T03:41:28.000Z",
  "coFlag": "Y"
}*/

////////////////////////
const coList=()=>{
  let rs=[];
  let myc=my.con();

  ///////////
  let coListQry=`
  SELECT
    user.userKy,
    user.userId,
    user.userDiv,
    user.userName,
    user.userFailN,
    co.*
  FROM
    co
    JOIN user ON user.userKy=co.userKy AND user.userDiv="general" AND user.userFlag="Y"
  WHERE
    co.coFlag="Y"
  ORDER BY
    co.coKy ASC
  ;`;
  rs.push(my.qry(coListQry,myc));

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const coInfo=(userKy)=>{
  let rs=[];
  let myc=my.con();

  ///////////
  let coInfoQry=`
  SELECT
    user.userKy,
    user.userId,
    user.userDiv,
    user.userName,
    user.userFailN,
    co.*
  FROM
    co
    JOIN user ON user.userKy=co.userKy AND user.userDiv="general" AND user.userFlag="Y"
  WHERE
    co.coFlag="Y"
    AND co.userKy="${ut.es(userKy)}"
  LIMIT 1
  ;`;
  rs.push(my.qry(coInfoQry,myc));

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const coAdd=(co)=>{
  //console.log(co);
  let rs=[];
  if(ut.isId(ut.ads(co.userId)) && ut.isPs(ut.ads(co.userPs))){
    let myc=my.con();

    if(co.userId && co.userPs){
      ///////////
      let userAddQry=`
      INSERT INTO user (
        userId,
        userPs,
        userDiv,
        userDateCre,
        userFlag
      ) VALUES (
        "${ut.ads(co.userId)}",
        SHA2("${ut.ads(co.userId+co.userPs)}",256),
        "general",
        NOW(),
        "Y"
      )
      ;`;
      rs.push(my.qry(userAddQry,myc));

      ///////////
      let userKy=rs[0].insertId;
      if(userKy){
        let coAddQry=`
        INSERT INTO co (
          userKy,
          coName,
          coDiv,
          coCertStat,
          coAuthStat,
          coDateCre,
          coFlag
        ) VALUES (
          "${ut.es(userKy)}",
          "${ut.ads(co.coName)}",
          "private",
          "N",
          "N",
          NOW(),
          "Y"
        )
        ;`;
        rs.push(my.qry(coAddQry,myc));
      }
    }

    ///////////
    my.end(myc);
  }

  return rs;
}

////////////////////////
const coUpdate=(co)=>{
  //console.log(co);
  let rs=[];
  let myc=my.con();

  if(co.userKy){
    ///////////
    let userUpdateQry=`
    UPDATE
      user
    SET
      user.userName="${ut.ads(co.userName)}"
    WHERE
      user.userKy="${ut.es(co.userKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(userUpdateQry,myc));

    ///////////
    //if(rs[0].changedRows){
    let coUpdateQry=`
    UPDATE
      co
    SET
      co.coName="${ut.ads(co.coName)}",#	기관명	VARCHAR(50)	NOT NULL	기관명
      co.coDiv="${ut.ads(co.coDiv)}",#	기관구분	ENUM('private','public')	NULL	기관구분(일반,공기업)
      co.coRegNum="${ut.ads(co.coRegNum)}",#	기관등록번호	VARCHAR(13)	NULL	기관등록번호
      co.coTel="${ut.ads(co.coTel)}",#	기관연락처	VARCHAR(15)	NULL	기관연락처
      co.coMail="${ut.ads(co.coMail)}"#	기관메일	VARCHAR(50)	NULL	기관메일
    WHERE
      co.coKy="${ut.es(co.coKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(coUpdateQry,myc));
    //}
    //console.log(rs);
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const coCertUpdate=(co)=>{
  let rs=[];
  let myc=my.con();

  if(co.coKy){
    ///////////
    co.coCertDateEnd="2022-12-31 23:59:59";//#	기관인증완료일	DATETIME	NULL	기관인증완료일
    co.coCertDateStart="2022-01-01 00:00:00";//#	기관인증시작일	DATETIME	NULL	기관인증시작일
    co.coCertInfo="cn=대한민국회사(koreacom)151646525523434218516516111,ou=koreacom,ou=xsadiejsfd,o=yessing,c=kr";//#	기관인증정보	VARCHAR(100)	NULL	기관인증정보

    let key0=+ new Date();
    let key1=ut.rdCharMaker(25);
    let key2=ut.rdCharMaker(25);
    let authUrl='';
    if(co.coDomainSSL) authUrl='http://'+co.coDomainSSL;
    else authUrl='http://'+co.coAuthIP;

    co.coApiKey=key1+key0+'_'+key2;//#	기관APIKEY	VARCHAR(100)	NULL	기관APIKEY
    co.coCdnCode="/cdn?"+key1;//,#	기관CDN코드	VARCHAR(100)	NULL	기관CDN코드
    co.coAuthUrl=authUrl+'/'+key1+'.txt';//#	기관검증URL	VARCHAR(100)	NULL	기관인증URL

    //console.log(co);
    ///////////
    let coCertUpdateQry=`
    UPDATE
      co
    SET
      co.coDomainSSL="${ut.ads(co.coDomainSSL)}",#	기관도메인SSL	VARCHAR(50)	NULL	기관도메인SSL
      co.coAuthIP="${ut.ads(co.coAuthIP)}",#	기관검증IP	VARCHAR(15)	NULL	기관인증IP
      co.coCertDateCre=NOW(),#	기관인증일	DATETIME	NULL	기관인증일
      co.coCertStat="Y",#	기관인증상태	ENUM('N','Y')	NOT NULL	기관인증상태(무효,유효)

      co.coCertDateEnd="${ut.ads(co.coCertDateEnd)}",#	기관인증완료일	DATETIME	NULL	기관인증완료일
      co.coCertDateStart="${ut.ads(co.coCertDateStart)}",#	기관인증시작일	DATETIME	NULL	기관인증시작일
      co.coCertInfo="${ut.ads(co.coCertInfo)}",#	기관인증정보	VARCHAR(100)	NULL	기관인증정보

      co.coApiKey="${ut.ads(co.coApiKey)}",#	기관APIKEY	VARCHAR(100)	NULL	기관APIKEY
      co.coCdnCode="${ut.ads(co.coCdnCode)}",#	기관CDN코드	VARCHAR(100)	NULL	기관CDN코드
      co.coAuthUrl="${ut.ads(co.coAuthUrl)}"#	기관검증URL	VARCHAR(100)	NULL	기관인증URL

    WHERE
      co.coKy="${ut.es(co.coKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(coCertUpdateQry,myc));
    //console.log(rs);
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const coAuthUpdate=(co,fnc)=>{

  let info=coInfo(co.userKy)[0][0];//기관정보추출
  //console.log(info,'ctrInfo');
  if(info.coApiKey && info.coAuthUrl){
    //console.log(info.coApiKey,info.coAuthUrl);
    let keys=info.coApiKey.split('_');//apikey 분석

    getHTML(info.coAuthUrl,(rs)=>{
      //console.log(keys[1],rs);
      if(rs){
        if(rs.indexOf(keys[1])>=0){//서버검증통과

          ////////////////////
          let rs=[];
          let myc=my.con();
          let coAuthUpdateQry=`
          UPDATE
            co
          SET
            co.coAuthStat="Y"#	기관검증상태	ENUM('N','Y')	NOT NULL	기관검증상태(무효,유효)
          WHERE
            co.coKy="${ut.es(info.coKy)}"
          LIMIT 1
          ;`;
          //console.log(coAuthUpdateQry);
          rs.push(my.qry(coAuthUpdateQry,myc));
          my.end(myc);
          ////////////////////

          console.log(info.userId,'server auth ok');
          if(typeof fnc==='function') fnc(rs);
        }
        else fnc(false);
      }
      else fnc(false);
    });
  }
}

////////////////////////
const getHTML=(url,fnc)=>{
  const http=require('http');
  //const fs=require('fs');
  //let temp=fs.createWriteStream(process.rootDir+'ADMN/route/temp.txt');
  http.get(url,(res)=>{
    if(res.statusCode==200){
      //res.pipe(temp);
      let html='';
      res.on('data',(chunk)=>{
        html+=chunk;
      });
      res.on('end',()=>{
        //temp.close();
        rs=html.toString();
        //console.log(rs,'ctrGetHTML');
        if(typeof fnc==='function' && rs.trim()) fnc(rs.trim());
      });
    }
    else fnc(false);
  });
}

////////////////////////
module.exports={
  coList:coList,
  coInfo:coInfo,
  coAdd:coAdd,
  coUpdate:coUpdate,
  coCertUpdate:coCertUpdate,
  coAuthUpdate:coAuthUpdate,
  //getHTML:getHTML
};
