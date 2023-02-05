////////////////////////
process.env.TZ='Asia/Seoul';

////////////////////////
const fs=require('fs');

////////////////////////
const readJson=(jsonFile)=>{
  let json=fs.readFileSync(jsonFile).toString('utf8');
  try{json=JSON.parse(json);}catch{}
  if(typeof json==='object') return json;
}

const sortObjByKey=(obj)=>{
  let ret={};
  if(Object.keys(obj).length){
    let ary=Object.keys(obj);
    ary.sort();
    for(let i in ary){
      ret[ary[i]]=obj[ary[i]];
    }
  }
  return ret;
}

const readCf=()=>{
  let cfg={};
  cfg.conf=readJson(process.rootDir+'DATA/cfg/conf.json');
  cfg.appRun=readJson(process.rootDir+'DATA/cfg/appRun.json');
  cfg.apps=readJson(process.rootDir+'DATA/cfg/apps.json');
  return cfg;
}

const callCf=()=>{

  let cfg=readCf();

  cfg.appsAll={};
  cfg.appRunMach={};
  cfg.appNmToMth={};
  cfg.appMthToNm={};
  cfg.appMthToMmo={};
  cfg.appNmToMmo={};

  ////////////////////////
  for(let method in cfg.apps.bizs){
    let appNm=cfg.apps.bizs[method].name;
    cfg.appNmToMth[appNm]=method;
    cfg.appMthToNm[method]=appNm;
    cfg.appMthToMmo[method]=cfg.apps.bizs[method].appMemo;
  }

  ////////////////////////
  for(let i in cfg.appRun.apps){
    let app=cfg.appRun.apps[i];
    Object.assign(app,cfg.apps.mach[app.machName]);//appRun에 mach 추가
    cfg.appRunMach[app.name]=app;
  }

  ////////////////////////
  Object.assign(cfg.apps.gate,cfg.apps.mach[cfg.apps.gate.machName]);//apps.gate
  for(let appName in cfg.apps.demo){//cfg.apps.demo
    Object.assign(cfg.apps.demo[appName],cfg.apps.mach[cfg.apps.demo[appName].machName]);
  }
  for(let appName in cfg.apps.ctrl){//cfg.apps.ctrl
    Object.assign(cfg.apps.ctrl[appName],cfg.apps.mach[cfg.apps.ctrl[appName].machName]);
  }
  for(let method in cfg.apps.bizs){//cfg.apps.bizs
    //let biz=cfg.apps.bizs[method];
    Object.assign(cfg.apps.bizs[method],cfg.apps.mach[cfg.apps.bizs[method].machName]);
    cfg.appsAll[cfg.apps.bizs[method].name]=cfg.apps.bizs[method];
  }

  ////////////////////////
  cfg.appsAll[cfg.apps.gate.name]=cfg.apps.gate;
  Object.assign(cfg.appsAll,cfg.apps.demo);
  Object.assign(cfg.appsAll,cfg.apps.ctrl);
  cfg.appsAll=sortObjByKey(cfg.appsAll);

  ////////////////////////
  process.cfg=cfg;
  return cfg;

}

////////////////////////
module.exports={
  cfg:callCf(),//로딩할 때 한번 읽는다.
  callCf:callCf,//다시 읽어서 갱신한다.
  originCf:readCf//가공되지 않은 설정이다. json파일을 수정할 때 사용한다.
};

//console.log(conf);


/*
console.log('conf.conf',conf.conf);
console.log('conf.appsRun',conf.appsRun);
console.log('conf.appRunMach',conf.appRunMach);
console.log('conf.apps',conf.apps);

console.log('conf.appNmToMth',conf.appNmToMth);
console.log('conf.appMthToNm',conf.appMthToNm);
console.log('conf.appMthToMmo',conf.appMthToMmo);
console.log('conf.appNmToMmo',conf.appNmToMmo);

console.log('conf.apps.bizs',conf.apps.bizs);
*/
/*
cfg {
      "conf": {
            "cfgName": "conf",
            "cfgMemo": "기본 설정",
            "limit": {
                  "whatchLogMthList": 50,
                  "a": 1
            },
            "rate": {
                  "appListen": 9,
                  "_appListen": "*100 /개별앱의 상태보고 주기",
                  "appReport": 10,
                  "_appReport": "*100 /데이터앱의 관리자화면 전송주기"
            },
            "dirs": {
                  "mthDir": "/home/nodejs/nb95/DATA/mth/",
                  "datDir": "/home/nodejs/nb95/DATA/dat/",
                  "datDirWatchGapTime": 600,
                  "datDirClearGapTime": 3600,
                  "in0Dir": "/home/nodejs/nb95/DATA/dat/",
                  "in0DirWatchGapTime": 600,
                  "in0DirClearGapTime": 3600,
                  "ot0Dir": "/home/nodejs/nb95/DATA/dat/",
                  "ot0DirWatchGapTime": 600,
                  "ot0DirClearGapTime": 3600,
                  "lgDir": "/home/nodejs/nb95/DATA/log/",
                  "lgDirWatchGapTime": 600,
                  "lgDirClearGapTime": 3600
            },
            "url": {
                  "watchIp": "222.108.224.3",
                  "watchPort": 800
            }
      },
      "appRun": {
            "cfgName": "appRun",
            "cfgMemo": "실행 앱 설정",
            "a": 100,
            "apps": [
                  {
                        "name": "00.DATA",
                        "appMemo": "노드브레이커 데이터 서버",
                        "script": "/home/nodejs/nb95/DATA/00.DATA.js",
                        "machName": "AP_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "01.DEMO",
                        "appMemo": "클라이언트 데모/테스트 사이트 샘플",
                        "script": "/home/nodejs/nb95/1_CLNT/01.DEMO.js",
                        "machName": "DEMO_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "02.PROX",
                        "appMemo": "라이언트 프록시 서버 샘플",
                        "script": "/home/nodejs/nb95/1_CLNT/02.PROX.js",
                        "machName": "DEMO_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "03.CTRL",
                        "appMemo": "노드브레이커 컨트롤 서버",
                        "script": "/home/nodejs/nb95/CTRL/03.CTRL.js",
                        "machName": "AP_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "04.GATE",
                        "appMemo": "노드브레이커 게이트웨이 서버",
                        "script": "/home/nodejs/nb95/GATE/04.GATE.js",
                        "machName": "AP_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "05.BIZ1_httpPOST",
                        "appMemo": "비지니스 서버 (HTTP POST)",
                        "script": "/home/nodejs/nb95/BIZS/05.BIZ1.js",
                        "machName": "WAS_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "06.BIZ2_httpGET",
                        "appMemo": "비지니스 서버 (HTTP GET)",
                        "script": "/home/nodejs/nb95/BIZS/06.BIZ2.js",
                        "machName": "WAS_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "07.BIZ3_webSocket",
                        "appMemo": "비지니스 서버 (HTTP WEB SOCKET)",
                        "script": "/home/nodejs/nb95/BIZS/07.BIZ3.js",
                        "machName": "WAS_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "08.BIZ4_tcpSocket",
                        "appMemo": "비지니스 서버 (HTTP TCP SOCKET)",
                        "script": "/home/nodejs/nb95/BIZS/08.BIZ4.js",
                        "machName": "WAS_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  },
                  {
                        "name": "09.HOST",
                        "appMemo": "호스트 서버 샘플",
                        "script": "/home/nodejs/nb95/4_HOST/09.HOST.js",
                        "machName": "HOST_SERVER",
                        "autostart": true,
                        "restart_delay": 1000,
                        "node_args": "--max-old-space-size=8192"
                  }
            ]
      },
      "apps": {
            "cfgName": "apps",
            "cfgMemo": "전체 앱 설정",
            "company": "ESP",
            "proName": "ESP_NEW_API_PROJECT",
            "proMemo": "ESP_API_프로젝트",
            "b": 213,
            "mach": {
                  "AP_SERVER": {
                        "machName": "AP_SERVER",
                        "machMemo": "ESP AWS X1",
                        "machDiv": "dmz",
                        "machDomain": "localhost",
                        "machIpOut": "222.108.224.3",
                        "machIpIn": "222.108.224.3"
                  },
                  "WAS_SERVER": {
                        "machName": "WAS_SERVER",
                        "machMemo": "ESP AWS X1",
                        "machDiv": "was",
                        "machDomain": "localhost",
                        "machIpOut": "222.108.224.3",
                        "machIpIn": "222.108.224.3"
                  },
                  "DEMO_SERVER": {
                        "machName": "DEMO_SERVER",
                        "machMemo": "ESP AWS X1",
                        "machDiv": "demo",
                        "machDomain": "localhost",
                        "machIpOut": "222.108.224.3",
                        "machIpIn": "222.108.224.3"
                  },
                  "HOST_SERVER": {
                        "machName": "HOST_SERVER",
                        "machMemo": "ESP AWS X1",
                        "machDiv": "host",
                        "machDomain": "localhost",
                        "machIpOut": "222.108.224.3",
                        "machIpIn": "222.108.224.3"
                  }
            },
            "gate": {
                  "name": "04.GATE",
                  "appDiv": "gate",
                  "machName": "AP_SERVER",
                  "appPort": 950,
                  "limitCnt": 1000
            },
            "bizs": {
                  "ND_METH_TEST1": {
                        "name": "05.BIZ1_httpPOST",
                        "appDiv": "biz",
                        "machName": "WAS_SERVER",
                        "appPort": 1101,
                        "limitCnt": 200,
                        "method": "ND_METH_TEST1",
                        "host": {
                              "methodCom": "ND_METH_TEST1",
                              "ip": "222.108.224.3",
                              "domain": "localhost",
                              "path": "/",
                              "port": 1201,
                              "proto": "http",
                              "method": "POST"
                        }
                  },
                  "ND_METH_TEST2": {
                        "name": "06.BIZ2_httpGET",
                        "appDiv": "biz",
                        "machName": "WAS_SERVER",
                        "appPort": 1102,
                        "limitCnt": 200,
                        "method": "ND_METH_TEST2",
                        "host": {
                              "methodCom": "ND_METH_TEST2",
                              "ip": "222.108.224.3",
                              "domain": "localhost",
                              "path": "/",
                              "port": 1202,
                              "proto": "http",
                              "method": "GET"
                        }
                  },
                  "ND_METH_TEST3": {
                        "name": "07.BIZ3_webSocket",
                        "appDiv": "biz",
                        "machName": "WAS_SERVER",
                        "appPort": 1103,
                        "limitCnt": 200,
                        "method": "ND_METH_TEST3",
                        "host": {
                              "methodCom": "ND_METH_TEST3",
                              "ip": "222.108.224.3",
                              "domain": "localhost",
                              "path": "/",
                              "port": 1203,
                              "proto": "ws",
                              "method": "WS"
                        }
                  },
                  "ND_METH_TEST4": {
                        "name": "08.BIZ4_tcpSocket",
                        "appDiv": "biz",
                        "machName": "WAS_SERVER",
                        "appPort": 1104,
                        "limitCnt": 200,
                        "method": "ND_METH_TEST4",
                        "host": {
                              "methodCom": "ND_METH_TEST4",
                              "ip": "222.108.224.3",
                              "domain": "localhost",
                              "path": "/",
                              "port": 1204,
                              "proto": "soc",
                              "method": "SOC"
                        }
                  }
            },
            "ctrl": {
                  "00.DATA": {
                        "name": "00.DATA",
                        "appDiv": "data",
                        "machName": "AP_SERVER",
                        "appPort": 800
                  },
                  "03.CTRL": {
                        "name": "03.CTRL",
                        "appDiv": "ctrl",
                        "machName": "AP_SERVER",
                        "appPort": 900
                  }
            },
            "demo": {
                  "01.DEMO": {
                        "name": "01.DEMO",
                        "appDiv": "demo",
                        "machName": "DEMO_SERVER"
                  },
                  "02.PROX": {
                        "name": "02.PROX",
                        "appDiv": "demo",
                        "machName": "DEMO_SERVER"
                  },
                  "09.HOST": {
                        "name": "09.HOST",
                        "appDiv": "demo",
                        "machName": "HOST_SERVER"
                  }
            }
      },
      "appNmToMth": {
            "05.BIZ1_httpPOST": "ND_METH_TEST1",
            "06.BIZ2_httpGET": "ND_METH_TEST2",
            "07.BIZ3_webSocket": "ND_METH_TEST3",
            "08.BIZ4_tcpSocket": "ND_METH_TEST4"
      },
      "appMthToNm": {
            "ND_METH_TEST1": "05.BIZ1_httpPOST",
            "ND_METH_TEST2": "06.BIZ2_httpGET",
            "ND_METH_TEST3": "07.BIZ3_webSocket",
            "ND_METH_TEST4": "08.BIZ4_tcpSocket"
      },
      "appNmToMmo": {
            "00.DATA": "노드브레이커 데이터 서버",
            "01.DEMO": "클라이언트 데모/테스트 사이트 샘플",
            "02.PROX": "라이언트 프록시 서버 샘플",
            "03.CTRL": "노드브레이커 컨트롤 서버",
            "04.GATE": "노드브레이커 게이트웨이 서버",
            "05.BIZ1_httpPOST": "비지니스 서버 (HTTP POST)",
            "06.BIZ2_httpGET": "비지니스 서버 (HTTP GET)",
            "07.BIZ3_webSocket": "비지니스 서버 (HTTP WEB SOCKET)",
            "08.BIZ4_tcpSocket": "비지니스 서버 (HTTP TCP SOCKET)",
            "09.HOST": "호스트 서버 샘플"
      },
      "appMthToMmo": {
            "ND_METH_TEST1": "비지니스 서버 (HTTP POST)",
            "ND_METH_TEST2": "비지니스 서버 (HTTP GET)",
            "ND_METH_TEST3": "비지니스 서버 (HTTP WEB SOCKET)",
            "ND_METH_TEST4": "비지니스 서버 (HTTP TCP SOCKET)"
      }
}
*/