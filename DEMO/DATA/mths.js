////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');

////////////////////////
const fs=require('fs');

////////////////////////
const callMth=()=>{
  let mths={};
  let files=fs.readdirSync(process.cfg.conf.dirs.mthDir);

  for(let i in files){
    let fileName=files[i];
    let method=fileName.substr(0,fileName.length-5);

    mths[method]=ut.readJson(process.cfg.conf.dirs.mthDir+fileName);
  }
  return mths;
}

////////////////////////
module.exports={
  callMth:callMth
};

/*console.log('mths',mths);
console.log('mthsLoad',mthsLoad());*/
//console.log('mths',mths);


/*
console.log('mths[ND_METH_TEST1]',mths['ND_METH_TEST1']);
*/

/*
mths {
  ND_METH_TEST1: {
    name: '05.BIZ1_httpPOST',
    appMemo: '비지니스 서버 (HTTP POST)',
    script: '/home/nodejs/nb95/BIZS/BIZ1.js',
    appDiv: 'biz',
    machName: 'WAS_SERVER',
    appPort: 1101,
    method: 'ND_METH_TEST1',
    host: {
      methodCom: 'ND_METH_TEST1',
      ip: '222.108.224.3',
      domain: 'localhost',
      path: '/',
      port: 1201,
      proto: 'http',
      method: 'POST'
    }
  },
  ND_METH_TEST2: {
    name: '06.BIZ2_httpGET',
    appMemo: '비지니스 서버 (HTTP GET)',
    script: '/home/nodejs/nb95/BIZS/BIZ2.js',
    appDiv: 'biz',
    machName: 'WAS_SERVER',
    appPort: 1102,
    method: 'ND_METH_TEST2',
    host: {
      methodCom: 'ND_METH_TEST2',
      ip: '222.108.224.3',
      domain: 'localhost',
      path: '/',
      port: 1202,
      proto: 'http',
      method: 'GET'
    }
  },
  ND_METH_TEST3: {
    name: '07.BIZ3_webSocket',
    appMemo: '비지니스 서버 (HTTP WEB SOCKET)',
    script: '/home/nodejs/nb95/BIZS/BIZ3.js',
    appDiv: 'biz',
    machName: 'WAS_SERVER',
    appPort: 1103,
    method: 'ND_METH_TEST3',
    host: {
      methodCom: 'ND_METH_TEST3',
      ip: '222.108.224.3',
      domain: 'localhost',
      path: '/',
      port: 1203,
      proto: 'ws',
      method: 'WS'
    }
  },
  ND_METH_TEST4: {
    name: '08.BIZ4_tcpSocket',
    appMemo: '비지니스 서버 (HTTP TCP SOCKET)',
    script: '/home/nodejs/nb95/BIZS/BIZ4.js',
    appDiv: 'biz',
    machName: 'WAS_SERVER',
    appPort: 1104,
    method: 'ND_METH_TEST4',
    host: {
      methodCom: 'ND_METH_TEST4',
      ip: '222.108.224.3',
      domain: 'localhost',
      path: '/',
      port: 1204,
      proto: 'soc',
      method: 'SOC'
    }
  }
}
*/