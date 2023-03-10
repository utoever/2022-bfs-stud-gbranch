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
      co.coName="${ut.ads(co.coName)}",#	?????????	VARCHAR(50)	NOT NULL	?????????
      co.coDiv="${ut.ads(co.coDiv)}",#	????????????	ENUM('private','public')	NULL	????????????(??????,?????????)
      co.coRegNum="${ut.ads(co.coRegNum)}",#	??????????????????	VARCHAR(13)	NULL	??????????????????
      co.coTel="${ut.ads(co.coTel)}",#	???????????????	VARCHAR(15)	NULL	???????????????
      co.coMail="${ut.ads(co.coMail)}"#	????????????	VARCHAR(50)	NULL	????????????
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
    co.coCertDateEnd="2022-12-31 23:59:59";//#	?????????????????????	DATETIME	NULL	?????????????????????
    co.coCertDateStart="2022-01-01 00:00:00";//#	?????????????????????	DATETIME	NULL	?????????????????????
    co.coCertInfo="cn=??????????????????(koreacom)151646525523434218516516111,ou=koreacom,ou=xsadiejsfd,o=yessing,c=kr";//#	??????????????????	VARCHAR(100)	NULL	??????????????????

    let key0=+ new Date();
    let key1=ut.rdCharMaker(25);
    let key2=ut.rdCharMaker(25);
    let authUrl='';
    if(co.coDomainSSL) authUrl='http://'+co.coDomainSSL;
    else authUrl='http://'+co.coAuthIP;

    co.coApiKey=key1+key0+'_'+key2;//#	??????APIKEY	VARCHAR(100)	NULL	??????APIKEY
    co.coCdnCode="/cdn?"+key1;//,#	??????CDN??????	VARCHAR(100)	NULL	??????CDN??????
    co.coAuthUrl=authUrl+'/'+key1+'.txt';//#	????????????URL	VARCHAR(100)	NULL	????????????URL

    //console.log(co);
    ///////////
    let coCertUpdateQry=`
    UPDATE
      co
    SET
      co.coDomainSSL="${ut.ads(co.coDomainSSL)}",#	???????????????SSL	VARCHAR(50)	NULL	???????????????SSL
      co.coAuthIP="${ut.ads(co.coAuthIP)}",#	????????????IP	VARCHAR(15)	NULL	????????????IP
      co.coCertDateCre=NOW(),#	???????????????	DATETIME	NULL	???????????????
      co.coCertStat="Y",#	??????????????????	ENUM('N','Y')	NOT NULL	??????????????????(??????,??????)

      co.coCertDateEnd="${ut.ads(co.coCertDateEnd)}",#	?????????????????????	DATETIME	NULL	?????????????????????
      co.coCertDateStart="${ut.ads(co.coCertDateStart)}",#	?????????????????????	DATETIME	NULL	?????????????????????
      co.coCertInfo="${ut.ads(co.coCertInfo)}",#	??????????????????	VARCHAR(100)	NULL	??????????????????

      co.coApiKey="${ut.ads(co.coApiKey)}",#	??????APIKEY	VARCHAR(100)	NULL	??????APIKEY
      co.coCdnCode="${ut.ads(co.coCdnCode)}",#	??????CDN??????	VARCHAR(100)	NULL	??????CDN??????
      co.coAuthUrl="${ut.ads(co.coAuthUrl)}"#	????????????URL	VARCHAR(100)	NULL	????????????URL

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

  let info=coInfo(co.userKy)[0][0];//??????????????????
  //console.log(info,'ctrInfo');
  if(info.coApiKey && info.coAuthUrl){
    //console.log(info.coApiKey,info.coAuthUrl);
    let keys=info.coApiKey.split('_');//apikey ??????

    getHTML(info.coAuthUrl,(rs)=>{
      //console.log(keys[1],rs);
      if(rs){
        if(rs.indexOf(keys[1])>=0){//??????????????????

          ////////////////////
          let rs=[];
          let myc=my.con();
          let coAuthUpdateQry=`
          UPDATE
            co
          SET
            co.coAuthStat="Y"#	??????????????????	ENUM('N','Y')	NOT NULL	??????????????????(??????,??????)
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
