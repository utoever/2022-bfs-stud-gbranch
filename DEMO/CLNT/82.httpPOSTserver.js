//*
const http = require('http');
const querystring = require('querystring');
const port=1810;
//const port=1950;
const lg=console.log;

const server = http.createServer((req,res)=>{

  let postdata = '';
  req.on('data',(chunk)=>{
    postdata += chunk;
  });

  req.on('end',()=>{
    let data={};
    try{
      let post=querystring.parse(postdata.toString());
      lg(post);
      //data.time =  + new Date();
      Object.assign(data,post);
      lg(data);
    }catch{}
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify(data));
  });

});

server.listen(port, function(){
  lg('Server on',port);
});
//*/

/*
const http = require('http');
const querystring = require('querystring');
const opts = {
  host: 'gate.nodebreaker.link', 
  port: 1810,
  method: 'POST',
  path: '/',
  headers: {'Content-Type':'application/json'}
};
const lg=console.log;

const postClient=(post,fnc)=>{
  let resData = '';
  const client = http.request(opts,(res)=>{
    res.on('data',(chunk)=>{
      resData += chunk;
    });
    res.on('end',()=>{
      try{
        resData=JSON.parse(resData);
      }catch{};
      if(typeof fnc ==='function') fnc(resData);
    });
  });

  client.data = querystring.stringify(post);
  //파일과 같이 큰 데이터를 보낼 때에는 반드시 필요하다
  opts.headers['Content-Length'] = client.data.length;

  client.write(client.data);
  client.end();
  lg(post);
}

postClient({a:1},(resData)=>{
  lg(resData);
});
//*/