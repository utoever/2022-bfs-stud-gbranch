////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');

///////////////////////////////////일반모듈
const net=require('net');

///////////////////////////////////
module.exports.con=(server,data,fnc,timeout)=>{

  if(!timeout) timeout=5;
  let dataStr=data;
  let rsTsocData='';
  try{//데이타는 평문자여야 한다.
    if(typeof data==='object')
    dataStr=JSON.stringify(data);
  }catch(e){
    console.error(e);
  }

  const socket=new net.Socket();
  socket.connect(server.port,server.host,()=>{

    console.log(server.host + ":" +server.port + " >> connect OK");

    let isSendData = socket.write(dataStr);
    if(isSendData) {
      console.log("server sending Data OK");
    } else {
      console.log("server sending Data Fail");
    }    
    
    ////////////
    socket.on('data',(chunk)=>{
      rsTsocData+=chunk;
      //console.log('recv data', rsTsocData);

      let RecvSize=String(ut.lenByte(rsTsocData.substring(5))).padStart(5,'0');
      let checkSize = rsTsocData.substring(0,5);

      if(RecvSize == checkSize) {
        console.log('recv data completed');
        socket.end();
      }
    });

    ////////////
    socket.on('end',()=>{
      if(rsTsocData){
        if(Buffer.isBuffer(rsTsocData)) rsTsocData=rsTsocData.toString('UTF8');
        if(typeof fnc==='function') fnc(rsTsocData);
      }
    });
  });

  ////////////
  socket.on('close',(e)=>{
    console.log('socket closed.', e);
  });
  
  socket.on('timeout',(e)=>{
    console.log('socket timeout.', e);
  });

  socket.on('error',(e)=>{
    console.log('Socket Error: ', JSON.stringify(e));
    socket.destroy();
  });

  /*
  setTimeout(()=>{    
    socket.end();
    console.log('socket end timeout.');
  },1000*timeout);
  */
};