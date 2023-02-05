
///////////////////////////////////일반모듈
const querystring=require('querystring');
const url=require('url');


///////////////////////////////////
module.exports.con=(site,fnc,data)=>{
  site.timeout=1000*3;
  //console.log(site);
  //console.log('sending',data);

  let http={};
  if(site.proto=='https') http=require('https');
  else http=require('http');

  ////////////////
  if(site.method=='POST'){//POST

    //헤더에 포스트데이터의 길이를 넣어야 한다.
    //if(!site.headers) site.headers={};
    //포스트 전송에 문제가 있는 경우, 헤더에 contentdata를 추가한다.
    //site.headers['contentdata']=encodeURI(JSON.stringify(data));
    //site.headers['Content-Length']=Buffer.byteLength(JSON.stringify(data));

    //console.log('site callhttp',site);
    let req=http.request(site,(rsp)=>{

      let rsHttpData = '';
      let chunkN=0;

      rsp.on('data',(chunk)=>{
        chunkN++
        rsHttpData += chunk;
        //console.log(chunkN,"received.");
      });

      rsp.on('end',()=>{
        //console.log("received server data:",rsHttpData);
        if(rsHttpData){
          if(Buffer.isBuffer(rsHttpData)){
            rsHttpData=rsHttpData.toString('UTF8');
          }
          if(typeof fnc==='function') fnc(rsHttpData);
        }
        //else if(typeof fnc==='function') fnc(JSON.stringify({msg:'no massage'}));
      });

    });
    req.on('error',(e)=>{
      //console.log('http connetion error',e);
      if(typeof fnc==='function') fnc(JSON.stringify(e));
    });
    req.write(JSON.stringify(data));
    req.end();

  }

  ////////////////
  else{//GET

    site.path+='?'+querystring.stringify(data);

    //console.log('site callhttp',site);
    let req=http.request(site,(rsp)=>{

      let rsHttpData = '';
      let chunkN=0;

      rsp.on('data',(chunk)=>{
        chunkN++
        rsHttpData += chunk;
        //console.log(chunkN,"received.");
      });

      rsp.on('end',()=>{
        //console.log("received server data:",rsHttpData);
        if(rsHttpData){
          if(Buffer.isBuffer(rsHttpData)){
            rsHttpData=rsHttpData.toString('UTF8');
          }
          if(typeof fnc==='function') fnc(rsHttpData);
        }
        //else if(typeof fnc==='function') fnc(JSON.stringify({msg:'no massage'}));
      });

    });
    req.on('error',(e)=>{
      //console.log('http connetion error',e);
      if(typeof fnc==='function') fnc(JSON.stringify(e));
    });
    req.end();

  }
}

/*
const callHttp=require('./callHttp.js');
let data={};

data={c:'POST'};
callHttp.con({
  hostname:'localhost',//100.100.100.100//naver.com
  path:'/',// /test/method/key
  port:1201,//9999
  method:'POST',//POST/GET
  proto:'http',//https/http
  timeout:1000*3
},(rsHttpData)=>{
  console.log('POSTcallHttpjs',rsHttpData);
},data);

data={c:'GET'};
callHttp.con({
  hostname:'localhost',//100.100.100.100//naver.com
  path:'/',// /test/method/key
  port:1202,//9999
  method:'GET',//POST/GET
  proto:'http',//https/http
  timeout:1000*3
},(rsHttpData)=>{
  console.log('GETcallHttpjs',rsHttpData);
},data);
*/