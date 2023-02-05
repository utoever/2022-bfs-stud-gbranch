////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');

////////////////////////
const fs=require('fs');

////////////////////////
const lgDir=process.cfg.conf.dirs.lgDir;
//console.log(lgDir);

////////////////////////
const logRead=(log,lines)=>{
  lines=lines||200;//초기화//마지막 200줄 가져오기
  let txt=fs.readFileSync(log,'utf8');
  let texts=txt.split('\n');

  if(texts.length>lines){
    texts=texts.slice((lines+1) * -1);//음수변환//뒤에서부터자르기
    txt=texts.join('\n');
  }
  return txt;
}

////////////////////////
const list=(from=0,size=10,flag=false,search='')=>{
  let lists=[];
  let results=[];
  try{lists=fs.readdirSync(lgDir);}catch{}
  //console.log(lists);

  for(let i in lists){
    let fileName=lists[i];
    let date=fileName.substr(6,8);
    //console.log(fileName,search,fileName.indexOf(search));
    if(fileName.indexOf(search)>=0){
      results.push(date);
    }
  }
  lists=results.sort().reverse();
  lists=lists.splice(Number(from),Number(size));
  //console.log(lists);
  return lists;
}

////////////////////////
const load=(data)=>{
  let datas=[];
  let fileName=lgDir+'alert_'+data.dt+'.txt';
  let file='';
  let lines='';
  try{
    if(ut.fileSize(fileName)){
      file=fs.readFileSync(fileName).toString();
      lines=file.split('\n').reverse();
    }
  }catch{}
  if(Array.isArray(lines)) for(let i in lines){
    let dt=lines[i];
    try{
      dt=JSON.parse(dt);
      datas.push(dt);
    }catch{}
  }
  //console.log(datas,'datas');
  return datas;
}

////////////////////////
const findByLines=(data)=>{
  let txt='';
  try{txt=fs.readFileSync(data.file,'utf8');}catch{}
  let texts=txt.split('\n');
  let rsTexts=texts.slice(data.from-1,data.to-1);

  return rsTexts.join('\n');
}

////////////////////////
module.exports={
  list:list,
  load:load,
  findByLines:findByLines
};