////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/my.js');


////////////////////////
const userList=()=>{
  let rs=[];
  let myc=my.con();

  ///////////
  let userListQry=`
  SELECT
    user.userKy,
    user.userId,
    user.userDiv,
    user.userName,
    user.userFailN,
    user.userDateCre
  FROM
    user
  WHERE
    user.userFlag="Y"
    AND (user.userDiv="admin" OR user.userDiv="system")
  ORDER BY
    user.userKy ASC
  ;`;
  rs.push(my.qry(userListQry,myc));

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const userAdd=(user)=>{
  //console.log(user);
  //console.log(ut.ads(user.userId+user.userPs));
  let rs=[];
  if(ut.isId(ut.ads(user.userId)) && ut.isPs(ut.ads(user.userPs))){
    let myc=my.con();

    if(user.userId && user.userPs){
      ///////////
      let userAddQry=`
      INSERT INTO user (
        userId,
        userPs,
        userDiv,
        userName,
        userDateCre,
        userFlag
      ) VALUES (
        "${ut.ads(user.userId)}",
        SHA2("${ut.ads(user.userId+user.userPs)}",256),
        "admin",
        "${ut.ads(user.userName)}",
        NOW(),
        "Y"
      )
      ;`;
      rs.push(my.qry(userAddQry,myc));
    }

    ///////////
    my.end(myc);
  }
  return rs;
}

////////////////////////
const userIdFind=(userId)=>{
  let rs=[];
  if(ut.isId(ut.ads(userId))){
    let myc=my.con();

    ///////////
    let userIdFindQry=`
    SELECT
      user.userId,
      user.userFailN
    FROM
      user
    WHERE
      user.userId="${ut.ads(userId)}"
    ;`;
    rs.push(my.qry(userIdFindQry,myc));

    ///////////
    my.end(myc);
  }
  return rs;
}

////////////////////////
const userDelete=(user)=>{
  //console.log(user);
  let rs=[];
  let myc=my.con();

  if(user.userKy){
    ///////////
    let userDeleteQry=`
    UPDATE
      user
    SET
      user.userFlag="N"
    WHERE
      user.userKy="${ut.es(user.userKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(userDeleteQry,myc));
  }

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const userUpdate=(user)=>{
  //console.log(user);
  let rs=[];
  let myc=my.con();

  if(user.userKy){
    ///////////
    let userUpdateQry=`
    UPDATE
      user
    SET
      user.userDiv="${ut.ads(user.userDiv)}",
      user.userName="${ut.ads(user.userName)}"
    WHERE
      user.userKy="${ut.es(user.userKy)}"
    LIMIT 1
    ;`;
    rs.push(my.qry(userUpdateQry,myc));
  }
  //console.log(rs);

  ///////////
  my.end(myc);
  return rs;
}

////////////////////////
const userPsUpdate=(user)=>{
  //console.log(user,'user');
  //console.log(ut.ads(user.userId+user.userPs),'ads');
  let rs=[];
  let wherePsOld='';
  if(user.userPsOld) wherePsOld='AND user.userPs=SHA2("'+ut.ads(user.userId+user.userPsOld)+'",256)';
  if(ut.isPs(ut.ads(user.userPs))){
    let myc=my.con();

    if(user.userKy){
      ///////////
      let userPsUpdateQry=`
      UPDATE
        user
      SET
        user.userPs=SHA2("${ut.ads(user.userId+user.userPs)}",256)
      WHERE
        user.userKy="${ut.es(user.userKy)}"
        ${wherePsOld}
      LIMIT 1
      ;`;
      rs.push(my.qry(userPsUpdateQry,myc));
    }

    ///////////
    my.end(myc);
  }
  return rs;
}

////////////////////////
module.exports={
  userList:userList,
  userAdd:userAdd,
  userIdFind:userIdFind,
  userDelete:userDelete,
  userUpdate:userUpdate,
  userPsUpdate:userPsUpdate
};
