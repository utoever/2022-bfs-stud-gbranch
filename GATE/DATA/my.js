/////////////////////
const smysql=require('sync-mysql');

/////////////////////
/*const myInfo={
  host:"localhost",
  port:"3306",
  user:"nodejs",
  password:"qkrrudrn###",
  database:"nb_10"
};*/
const myInfo={
};

/////////////////////
const con=()=>{
  try{
    return new smysql(myInfo);
  }catch(e){
    return e;
  };
}

/////////////////////
const qry=(qry,mycon)=>{
  try{
    return mycon.query(qry);
  }catch(e){
    return e;
  };
}

/////////////////////
const end=(mycon)=>{
  try{
    return mycon.dispose();
  }catch(e){
    return e;
  };
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
