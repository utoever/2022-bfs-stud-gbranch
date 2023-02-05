////////////////////////
const rootDir=process.rootDir;
const ut=require(rootDir+'DATA/ut.js');
let sess={};

///////////////////
const fs=require('fs');
const express=require('express');
const cookie=require('cookie-parser');
const route=express.Router();

///////////////////
const {authRes,callLogin,loginLog,loginFail,loginBlockFree,myLogin}=require(rootDir+'ADMN/controller/ctrAuth.js');


///////////////////
route.get('/',(req,res)=>{
  res.redirect(301,'/');
  //res.send(ut.dlr('/'));
});




///////////////////
///////////////////
///////////////////
route.get('/alert/load/:dt',(req,res)=>{//목록
  if(authRes(req)){

    const {load}=require(rootDir+'ADMN/controller/logAlert.js');
    //console.log(req.params);
    let rs=load(req.params);

    if(rs.length>0) res.send({
      flag:true,
      alertList:rs
    });
    else res.send({
      flag:false,
      er:'no data'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/alert/findByLines',(req,res)=>{
  if(authRes(req)){
    const {findByLines}=require(rootDir+'ADMN/controller/logAlert.js');
    let rsText=findByLines(req.body);
    //console.log(rsText);
    res.send({
      flag:true,
      rsText:rsText
    });
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});




///////////////////
///////////////////
///////////////////
route.get('/memo/list',(req,res)=>{//목록
  if(authRes(req)){

    //console.log('query',req.query);
    const {memoList}=require(rootDir+'ADMN/controller/ctrMemo.js');
    let rs=memoList(req.query)[0];

    if(rs.length>0) res.send({
      flag:true,
      memoList:rs
    });
    else res.send({
      flag:false,
      er:'no data'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/memo/add',(req,res)=>{//삭제
  if(authRes(req)){

    //console.log('body',req.body);
    const {memoAdd}=require(rootDir+'ADMN/controller/ctrMemo.js');
    let rs=memoAdd(req.body)[0];
    //console.log('rs',rs);

    if(rs.insertId) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed add'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/memo/delete',(req,res)=>{//삭제
  if(authRes(req)){

    //console.log('body',req.body);
    const {memoDelete}=require(rootDir+'ADMN/controller/ctrMemo.js');
    let rs=memoDelete(req.body)[0];
    //console.log('rs',rs);

    if(rs.changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed delete'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/memo/update',(req,res)=>{//수정
  if(authRes(req)){

    //console.log('body',req.body);
    const {memoUpdate}=require(rootDir+'ADMN/controller/ctrMemo.js');
    let rs=memoUpdate(req.body)[0];
    //console.log('rs',rs);

    if(rs.changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed update'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});




///////////////////
///////////////////
///////////////////
route.get('/co/list',(req,res)=>{//목록
  if(authRes(req)){

    const {coList}=require(rootDir+'ADMN/controller/ctrCo.js');
    let rs=coList()[0];

    if(rs.length>0) res.send({
      flag:true,
      coList:rs
    });
    else res.send({
      flag:false,
      er:'no data'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/co/add',(req,res)=>{//삭제
  if(authRes(req)){

    //console.log(req.body);
    const {coAdd}=require(rootDir+'ADMN/controller/ctrCo.js');
    let rs=coAdd(req.body)[0];
    //console.log(rs);

    if(rs.insertId) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed add'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/co/update',(req,res)=>{//수정
  if(authRes(req)){

    //console.log(req.body);
    const {coUpdate}=require(rootDir+'ADMN/controller/ctrCo.js');
    let rs=coUpdate(req.body);
    let changedRows=0;
    try{
      changedRows=rs[0].changedRows;
      if(!changedRows) changedRows=rs[1].changedRows;
    }catch{}
    //console.log(rs);

    if(changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed update'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/co/certUpdate',(req,res)=>{//수정
  if(authRes(req)){

    //console.log(req.body,'body');
    const {coCertUpdate}=require(rootDir+'ADMN/controller/ctrCo.js');
    let rs=coCertUpdate(req.body);
    //console.log(rs,'rs');
    let changedRows=0;
    try{changedRows=rs[0].changedRows;}catch{}

    if(changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed update'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/co/authUpdate',(req,res)=>{//수정
  if(authRes(req)){

    //console.log(req.body,'ajaxAuthUpdate');
    const {coAuthUpdate}=require(rootDir+'ADMN/controller/ctrCo.js');
    let rs=coAuthUpdate(req.body,(rs)=>{
      let changedRows=0;
      try{changedRows=rs[0].changedRows;}catch{}
      //console.log(rs,'ajaxRs');
      if(changedRows) res.send({
        flag:true,
        rs:rs
      });
      else res.send({
        flag:false,
        er:'failed update'
      });
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});




///////////////////
///////////////////
///////////////////
route.get('/user/list',(req,res)=>{//목록
  if(authRes(req)){

    const {userList}=require(rootDir+'ADMN/controller/ctrUser.js');
    let rs=userList()[0];

    if(rs.length>0) res.send({
      flag:true,
      userList:rs
    });
    else res.send({
      flag:false,
      er:'no data'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/user/add',(req,res)=>{//추가
  if(authRes(req)){

    //console.log(req.body);
    req.body.userDiv='admin';
    const {userAdd}=require(rootDir+'ADMN/controller/ctrUser.js');
    let rs=userAdd(req.body)[0];
    //console.log(rs);

    if(rs.insertId) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed add'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.get('/user/idFind',(req,res)=>{//아이디확인
  //console.log(req.query);
  const {userIdFind}=require(rootDir+'ADMN/controller/ctrUser.js');
  let rs=userIdFind(req.query.userId)[0];
  console.log(rs,'idFind');

  if(rs.length>0) res.send({
    flag:true,
    rs:'userId exist',
    data:rs
  });
  else res.send({
    flag:false,
    rs:'userId not exist'
  });
});

///////////////////
route.post('/user/delete',(req,res)=>{//삭제
  if(authRes(req)){

    //console.log(req.body);
    const {userDelete}=require(rootDir+'ADMN/controller/ctrUser.js');
    let rs=userDelete(req.body)[0];
    //console.log(rs);

    if(rs.changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed delete'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/user/update',(req,res)=>{//정보수정
  if(authRes(req)){

    //console.log(req.body);
    req.body.userDiv='admin';
    const {userUpdate}=require(rootDir+'ADMN/controller/ctrUser.js');
    let rs=userUpdate(req.body)[0];
    //console.log(rs);

    if(rs.changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed update'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.post('/user/psUpdate',(req,res)=>{//비번수정
  if(authRes(req)){

    //console.log(req.body,'body');
    const {userPsUpdate}=require(rootDir+'ADMN/controller/ctrUser.js');
    let rs=userPsUpdate(req.body)[0];
    //console.log(rs,'rs');

    if(rs.changedRows) res.send({
      flag:true,
      rs:rs
    });
    else res.send({
      flag:false,
      er:'failed update'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});




///////////////////
///////////////////
///////////////////
route.post('/auth/login',(req,res)=>{

  if(req.body.userId && req.body.userPs){
    let rsLogin={};
    let loginLogData={
      flag:false,
      userId:req.body.userId,
      userIp:req.connection.remoteAddress.split(':')[3]
    };
    try{
      rsLogin=callLogin(req.body);
      loginLogData.flag=rsLogin.flag;
      loginLogData.userKy=rsLogin.user.userKy;
      loginLogData.userDiv=rsLogin.user.userDiv;
      //loginLogData.userName=rsLogin.user.userName;
      //loginLogData.token=rsLogin.token;
    }catch{}
    //console.log(loginLogData,'loginLogData');
    //console.log(rsLogin,'rsLogin');

    if(rsLogin.flag){
      //res.cookie('loginTime',+ new Date(),{path:'/'});
      res.send(rsLogin);
    }
    else{
      res.send({
        flag:false,
        er:'failed auth'
      });
    }

    loginLog(loginLogData);
  }
  else res.send({
    flag:false,
    er:'wrong input'
  });

});

///////////////////
route.post('/auth/myLogin',(req,res)=>{
  //console.log(req.body);
  if(req.body.userId && req.body.userPs){
    let rsLogin=myLogin(req.body)[0][0];
    //console.log(rsLogin);

    if(rsLogin){
      res.send({
        flag:true,
        userKy:rsLogin.userKy
      });
    }
    else{
      res.send({
        flag:false,
        er:'failed auth'
      });
    }
  }
  else res.send({
    flag:false,
    er:'wrong input'
  });

});

///////////////////
route.get('/auth/fail',(req,res)=>{//로그인실패기록

  if(req.query.userId){
    //console.log(req.query);
    let rsFail=loginFail(req.query);
    //console.log(rsFail);

    if(rsLogin[0].changedRows){
      res.send({
        flag:true
      });
    }
    else{
      res.send({
        flag:false,
        er:'failed update'
      });
    }
  }
  else res.send({
    flag:false,
    er:'wrong input'
  });
});

///////////////////
route.post('/auth/free',(req,res)=>{//로그인실패기록

  if(req.body.userKy){
    //console.log(req.body);
    let rsFree=loginBlockFree(req.body);
    //console.log(rsFree);

    if(rsFree[0].changedRows){
      res.send({
        flag:true
      });
    }
    else{
      res.send({
        flag:false,
        er:'failed update'
      });
    }
  }
  else res.send({
    flag:false,
    er:'wrong input'
  });
});

///////////////////
route.get('/auth/veri',(req,res)=>{//인증값테스트
  if(authRes(req)) res.send({
    flag:true,
    token:req.cookies.token,
  });
  else res.send({
    flag:false,
    er:'failed auth'
  });
});




///////////////////
///////////////////
///////////////////
/*route.post('/cfgEdit/:cfName',(req,res)=>{
  if(authRes(req)){

    const {cfg,callCf}=require(rootDir+'DATA/cf.js');
    //console.log('req.body',req.body);

    if(req.body.cfName && req.body.cfName==req.params.cfName && req.body.cfgData){
      const cfgName=cfg[req.params.cfName].cfgName;

      if(cfgName){
        let cfgData=Object.assign({
          "cfgName": cfgName,
          "cfgMemo": cfg[req.params.cfName].cfgMemo
        },ut.toJson(req.body.cfgData));

        let cfgFile=cfgName+'.json';
        let data={
          cfgDir:rootDir+'DATA/cfg/',
          cfgFile:cfgFile,
        };
        fs.writeFileSync(data.cfgDir+cfgFile,JSON.stringify(cfgData,null,2));
        data.cfgData=callCf()[cfgName];
        //console.log(data);
        res.send({
          flag:true,
          data:data
        });
      }
      else res.send({
        flag:false,
        er:'wrong method'
      });
    }
    else res.send({
      flag:false,
      er:'wrong input'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});*/




///////////////////
///////////////////
///////////////////
route.get('/appSchema/:mthName',(req,res)=>{
  if(authRes(req)){

    const {callMth}=require(rootDir+'DATA/mths.js');

    if(req.params.mthName){
      let mths=callMth();
      const mthData=mths[req.params.mthName];
      //console.log(mthData);

      if(mthData){
        res.send({
          flag:true,
          mthData:mthData
        });
      }
      else res.send({
        flag:false,
        er:'no data'
      });
    }
    else res.send({
      flag:false,
      er:'wrong input'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
/*route.post('/mthEdit/:mthName',(req,res)=>{
  if(authRes(req)){

    const {callMth}=require(rootDir+'DATA/mths.js');

    if(req.body.mthName && req.body.mthName==req.params.mthName && req.body.schData){
      let mths=callMth();
      const method=mths[req.params.mthName].method;

      if(method){
        mths[req.params.mthName].schema=ut.toJson(req.body.schData);
        let mthFile=method+'.json';
        let data={
          mthDir:process.cfg.conf.dirs.mthDir,
          mthFile:mthFile,
        };
        fs.writeFileSync(data.mthDir+mthFile,JSON.stringify(mths[req.params.mthName],null,2));
        data.mthData=callMth()[method];
        //console.log(data);
        res.send({
          flag:true,
          data:data
        });
      }
      else res.send({
        flag:false,
        er:'wrong method'
      });
    }
    else res.send({
      flag:false,
      er:'wrong input'
    });

  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});*/




///////////////////
///////////////////
///////////////////
route.get('/logList/:from/:size',(req,res)=>{
  if(authRes(req)){
    const {list}=require(rootDir+'ADMN/controller/logData.js');
    res.send(list(
      Number(req.params.from),
      Number(req.params.size)
    ));
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
///////////////////
///////////////////
route.get('/logListLogs/:date/:mins/:from/:size',(req,res)=>{
  if(authRes(req)){
    const {listLogs}=require(rootDir+'ADMN/controller/logData.js');
    res.send(listLogs(
      Number(req.params.date),
      Number(req.params.mins),
      Number(req.params.from),
      Number(req.params.size)
    ));
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
///////////////////
///////////////////
route.get('/logRead/:logFile',(req,res)=>{
  if(authRes(req)){
    const {read}=require(rootDir+'ADMN/controller/logData.js');
    res.send(read(
      req.params.logFile
    ));
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
///////////////////
///////////////////
route.get('/logLastOneRead/:method',(req,res)=>{
  if(authRes(req)){
    const {lastOneRead}=require(rootDir+'ADMN/controller/logData.js');
    res.send(lastOneRead(
      req.params.method
    ));
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.get('/logFind',(req,res)=>{
  if(authRes(req)){
    const {find}=require(rootDir+'ADMN/controller/logData.js');
    res.send(find(
      Number(req.query.from),
      Number(req.query.size),
      req.query.search,
      req.query.type
    ));
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});



///////////////////
///////////////////
///////////////////
/*const cli=require('child_process');
const cliOption={
  encoding: 'utf8',
  timeout: 1000*20,  // msec
  maxBuffer: 200*1024,
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};
const cliCmd=(cmd,fnc)=>{
  cli.exec(cmd,cliOption,(err,out,stderr)=>{
    if(typeof fnc==='function'){
      console.log(cmd);
      fnc(out);
    }
    //if(err) console.log(err);
  });
}

///////////////////
route.get('/appRestart/:appName',(req,res)=>{
  if(authRes(req)){
    if(req.params.appName){
      cliCmd('pm2 restart '+req.params.appName,(out)=>{
        //console.log({flag:true,out:out});
        res.send({flag:true,out:out});
      });
    }
    else res.send({flag:false});
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.get('/appStart/:appName',(req,res)=>{
  if(authRes(req)){
    if(req.params.appName){
      cliCmd('pm2 start '+req.params.appName,(out)=>{
        res.send({flag:true,out:out});
      });
    }
    else res.send({flag:false});
  }
});

///////////////////
route.get('/appStop/:appName',(req,res)=>{
  if(authRes(req)){
    if(req.params.appName){
      cliCmd('pm2 stop '+req.params.appName,(out)=>{
        res.send({flag:true,out:out});
      });
    }
    else res.send({flag:false});
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.get('/allRestart',(req,res)=>{
  if(authRes(req)){
    cli.exec('pm2 restart all',cliOption,(err,out,stderr)=>{
      if(err) res.send({flag:false,err:err});
      else res.send({flag:true,out:out});
    });
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});

///////////////////
route.get('/allDelete',(req,res)=>{
  if(authRes(req)){
    cliCmd('pm2 delete all',(out)=>{
      res.send({flag:true,out:out});
    });
  }
  else res.send({
    flag:false,
    er:'failed auth'
  });
});*/

///////////////////
module.exports=route;