////////////////////////
const my=require(process.rootDir+'DATA/my.js');


////////////////////////
const loadApiKeys=()=>{
  let myc=my.con();

  ///////////
  const loadApiKeysQry=`
  SELECT
    co.coKy, #(PK)	기관Ky(PK)	INT	NOT NULL	기관Ky
    co.coApiKey, #	기관APIKEY	VARCHAR(100)	NULL	기관APIKEY
    co.coAuthIP #	기관검증IP	VARCHAR(15)	NULL	기관인증IP
  FROM
    co
    JOIN user ON user.userKy=co.userKy AND user.userFlag="Y"
  WHERE
    co.coFlag="Y"
    AND co.coCertStat="Y"
    AND co.coAuthStat="Y"
    AND co.coCertDateEnd>=NOW()
  ;`;
  let rs=my.qry(loadApiKeysQry,myc);
  my.end(myc);

  let apis={};
  if(Array.isArray(rs)) for(let i in rs){
    apis[rs[i].coApiKey]={
      coKy:rs[i].coKy,
      coIp:rs[i].coAuthIP
    };
  }

  ///////////
  return apis;
}


////////////////////////
module.exports=loadApiKeys;
