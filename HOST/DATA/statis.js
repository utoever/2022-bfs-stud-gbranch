////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const appName=process.env.name;


/////////////////////////////////////////
let lastContact=0;
let lastBlocked=0;
let lastStrange={};
let lastClients={};

let lastMin={//1분간 유지되는 통계자료.
  time:'',
  contact:[],
  blocked:[],
  strange:{},
  clients:{},
  heapMem:[],
  heapPer:[],
  useMem:[]
};
let lastHour={//최근 한시간의 통계자료.
  time:'',
  contact:{
    val:0,
    data:[]
  },
  blocked:{
    val:0,
    data:[]
  },
  strange:{},
  clients:{},
  heapMem:{
    val:0,
    data:[]
  },
  heapPer:{
    val:0,
    data:[]
  },
  useMem:{
    val:0,
    data:[]
  }
};

/////////////////////////////////////////
const addContact=()=>{//단순 합산한다.
  lastContact++;
}
const addBlocked=()=>{//단순 합산한다.
  lastBlocked++;
}
const addClients=(ip)=>{
  if(!lastClients[ip]) lastClients[ip]=0;
  lastClients[ip]++;
}
const addStrange=(ip)=>{//단순 합산한다.
  if(!lastStrange[ip]) lastStrange[ip]=0;
  lastStrange[ip]++;
}

const saveSec=()=>{
  let thisTime=ut.uTimeToDate(+ new Date());
  lastMin.time=thisTime;

  let mem=process.memoryUsage();

  lastMin.heapMem.push(Math.round((mem.heapUsed/1024/1024)*10)/10);
  lastMin.heapMem=ut.limitLast(lastMin.heapMem,60);

  lastMin.heapPer.push(Math.round((mem.heapUsed/mem.heapTotal)*100*10)/10);
  lastMin.heapPer=ut.limitLast(lastMin.heapPer,60);

  lastMin.useMem.push(Math.round((mem.rss/1024/1024)*10)/10);
  lastMin.useMem=ut.limitLast(lastMin.useMem,60);

  lastMin.contact.push(lastContact);//매초마다 합산된 접속량을 입력하고 초기화한다.
  lastMin.contact=ut.limitLast(lastMin.contact,60);
  lastContact=0;

  lastMin.blocked.push(lastBlocked);//매초마다 합산된 차단량을 입력하고 초기화한다.
  lastMin.blocked=ut.limitLast(lastMin.blocked,60);
  lastBlocked=0;

  if(Object.keys(lastStrange).length) for(let ip in lastStrange){
    if(!lastMin.strange[ip]) lastMin.strange[ip]=[];
    lastMin.strange[ip].push(lastStrange[ip]);//매초마다 합산된 차단량을 입력하고 초기화한다.
    lastMin.strange[ip]=ut.limitLast(lastMin.strange[ip],60);
    lastStrange[ip]=0;
  }

  if(Object.keys(lastClients).length) for(let ip in lastClients){
    if(!lastMin.clients[ip]) lastMin.clients[ip]=[];
    lastMin.clients[ip].push(lastClients[ip]);//매초마다 합산된 차단량을 입력하고 초기화한다.
    lastMin.clients[ip]=ut.limitLast(lastMin.clients[ip],60);
    lastClients[ip]=0;
    //console.log(ip,lastMin.clients,'lastMin.clients');
  }
}

const saveMin=()=>{

  let thisTime=ut.uTimeToDate(+ new Date());
  lastHour.time=thisTime;

  ///////////////////////
  let tmHeapMem=ut.aryAvr(lastMin.heapMem);
  lastHour.heapMem.data.push(Math.round(tmHeapMem*10)/10);
  lastHour.heapMem.data=ut.limitLast(lastHour.heapMem.data,60);
  lastHour.heapMem.val=ut.numDot(ut.aryAvr(lastHour.heapMem.data),1);

  ///////////////////////
  let tmUseMem=ut.aryAvr(lastMin.useMem);
  lastHour.useMem.data.push(Math.round(tmUseMem*10)/10);
  lastHour.useMem.data=ut.limitLast(lastHour.useMem.data,60);
  lastHour.useMem.val=ut.numDot(ut.aryAvr(lastHour.useMem.data),1);

  ///////////////////////
  let tmHeapPer=ut.aryAvr(lastMin.heapPer);
  lastHour.heapPer.data.push(Math.round(tmHeapPer*10)/10);
  lastHour.heapPer.data=ut.limitLast(lastHour.heapPer.data,60);
  lastHour.heapPer.val=ut.numDot(ut.aryAvr(lastHour.heapPer.data),1);

  ///////////////////////
  let tmContact=ut.arySum(lastMin.contact);
  lastHour.contact.data.push(tmContact);
  lastHour.contact.data=ut.limitLast(lastHour.contact.data,60);
  lastHour.contact.val=ut.arySum(lastHour.contact.data);

  ///////////////////////
  let tmBlocked=ut.arySum(lastMin.blocked);
  lastHour.blocked.data.push(tmBlocked);
  lastHour.blocked.data=ut.limitLast(lastHour.blocked.data,60);
  lastHour.blocked.val=ut.arySum(lastHour.blocked.data);

  ///////////////////////
  if(Object.keys(lastMin.strange).length) for(let ip in lastMin.strange){
    if(!lastHour.strange[ip]){
      lastHour.strange[ip]={val:0,data:[]};
    }
    let tmStrange=ut.arySum(lastMin.strange[ip]);
    lastHour.strange[ip].data.push(tmStrange);
    lastHour.strange[ip].data=ut.limitLast(lastHour.strange[ip].data,60);
    lastHour.strange[ip].val=ut.arySum(lastHour.strange[ip].data);
  }

  ///////////////////////
  if(Object.keys(lastMin.clients).length) for(let ip in lastMin.clients){
    if(!lastHour.clients[ip]){
      lastHour.clients[ip]={val:0,data:[]};
    }
    let tmClients=ut.arySum(lastMin.clients[ip]);
    lastHour.clients[ip].data.push(tmClients);
    lastHour.clients[ip].data=ut.limitLast(lastHour.clients[ip].data,60);
    lastHour.clients[ip].val=ut.arySum(lastHour.clients[ip].data);
    //console.log(ip,lastHour.clients,'lastHour.clients');
  }

  ///////////////////////
  //console.log('lastHour',lastHour);
  //console.log('lastMin',lastMin);
}

const saveHour=()=>{
  //lastHour
}


const getStatis=()=>{
  return {
    appName:appName,
    pid:process.pid,
    lastMin:lastMin,
    lastHour:lastHour
  };
}

/////////////////////////////////////////
const runStatis=()=>{
  let loopN=0;
  setInterval(()=>{

    saveSec();//매초마다 시스템정보를 기록한다.
    loopN++;

    if(loopN%60==0){//1분경과
      saveMin();
    }
    if(loopN==60*60){
      saveHour();
      loopN=0;
    }
  },1000);
}

/////////////////////////////////////////
module.exports={
  runStatis:runStatis,
  addContact:addContact,
  addBlocked:addBlocked,
  addClients:addClients,
  addStrange:addStrange,
  getStatis:getStatis
};