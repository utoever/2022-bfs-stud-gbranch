///////////////////////////////////일반모듈
const ws=require('ws');

///////////////////////////////////
module.exports.con=(server,data,fnc,timeout)=>{

  if(!timeout) timeout=4;
  let dataStr=data;
  let rsWsocData='';
  try{//데이타는 평문자여야 한다.
    if(typeof data==='object')
    dataStr=JSON.stringify(data);
  }catch(e){}

  const soc=new ws.WebSocket('ws://'+server.host+':'+server.port+server.path);

  soc.on('open',()=>{
    soc.send(dataStr);
  });

  soc.on('message',(rsMsg)=>{
    if(Buffer.isBuffer(rsMsg)) rsWsocData=rsMsg.toString('UTF8');
    else rsWsocData=rsMsg;
    if(typeof fnc==='function') fnc(rsWsocData);
  });

  let standby=setTimeout(()=>{
    soc.close();
  },1000*4);

  soc.on('close',()=>{
    clearTimeout(standby);
  });

};

/*
const callWsoc=require('callWsoc.js');

let server={
  host:'domain-ip',//100.100.100.100//naver.com
  port:88,//9999
};

callTsoc.con(
  server,
  data,
  (rsData)=>{
    console.log(rsData);
});
*/