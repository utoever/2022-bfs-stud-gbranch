/////////////////////
const smysql=require('sync-mysql');

/////////////////////
const myInfo={
  host:"database-1.cbyoxjoh8vrf.ap-northeast-2.rds.amazonaws.com",
  port:"3306",
  user:"admin",
  password:"syskion#%2021park",
  database:"nb_95"
};

/////////////////////
const con=()=>{
  return new smysql(myInfo);
}

/////////////////////
const qry=(qry,mycon)=>{
  return mycon.query(qry);
}

/////////////////////
const end=(mycon)=>{
  return mycon.dispose();
}

/////////////////////
const size=()=>{
  let myc=con();
  let rs={
    maxCon:qry('show variables like "%max_connections%";',myc)[0].Value,
    cntCon:qry('show status like "%Threads_connected%";',myc)[0].Value
  };
  end(myc);
  return rs;
}
const test=()=>{
  let myc=con();
  let rs=qry('insert into log (logName,logPos,logDateCre) values ("테스트","/stat/alert",NOW())',myc)
  end(myc);
  return rs;
}

/////////////////////
module.exports={
  con:con,
  qry:qry,
  end:end,
  //size:size,
  //test:test
};