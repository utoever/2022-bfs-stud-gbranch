////////////////////////
const fs=require('fs');
const path=require('path');
const url=require('url');
const querystring=require('querystring');

///////////////////////////////////기본설정
const lgDir=process.cfg.conf.dirs.lgDir;
const ut={};

/////////////////////
ut.dlr=(loc)=>{
  return '<script>document.location.replace(\''+loc+'\');</script>';
}
ut.dlh=(loc)=>{
  return '<script>document.location.href=\''+loc+'\';</script>';
}
ut.script=(src)=>{
  return '<script>'+src+'</script>';
}


/////////////////////
ut.deepCp=ut.deepCopy=(obj)=>{
  let rt={};
  try{
    rt=JSON.parse(JSON.stringify(obj));
  }catch{}
  return rt;
}
ut.countObj=(obj)=>{
  let cnt=0;
  obj.forEach((e)=>{
    cnt++;
  });
  return cnt;
}
ut.sortAryByKey=(ary,key)=>{
  if(Array.isArray(ary)){
    ary.sort((a,b)=>{
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 :0;
    });
  }
  return ary;
}
ut.sortObjByKey=(obj)=>{
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
ut.limitLast=(ary,limit)=>{
  if(Array.isArray(ary) && ary.length>limit) return ary.slice(ary.length-limit);
  else return ary;
}
ut.limitLastObject=(obj,limit)=>{
  if(typeof obj==='object' && Object.keys(obj).length>limit){
    let ret={};
    let keys=ut.limitLast(Object.keys(obj),limit);
    for(let i in keys){
      let key=keys[i];
      ret[key]=obj[key];
    }
    return ret;
  }
  return obj;
}
ut.arySum=(ary)=>{
  if(Array.isArray(ary) && ary.length>0){
    let arySum=0;
    for(let i in ary){
      ary[i]=ary[i]||0;
      arySum+=ary[i];
    }
    return arySum;
  }
  else return 0;
}
ut.aryAvr=(ary)=>{
  if(Array.isArray(ary) && ary.length>0){
    let aryN=0,arySum=0;
    for(let i in ary){
      aryN++;
      ary[i]=ary[i]||0;
      arySum+=ary[i];
    }
    return arySum/aryN;
  }
  else return 0;
}
ut.numDot=(num,dot=1)=>{
  if(dot<0) dot=0;
  let pos=10*dot;
  if(pos<10) return Math.round(num);
  else return Math.round(num*pos)/pos;
}
ut.jsonBeautify=ut.jsonBeauti=(json)=>{
  return JSON.stringify(json,null,2);
};
ut.toJson=(jsonStr)=>{
  let json={};
  try{json=JSON.parse(jsonStr);}
  catch(e){json={str:jsonStr,e:e};}
  return json;
}
ut.readJson=(jsonFile)=>{
  let json=fs.readFileSync(jsonFile).toString('utf8');
  try{json=JSON.parse(json);}catch{}
  if(typeof json==='object') return json;
}

/////////////////////
ut.rdMaker=(max=0,min=0)=>{//100이하의 랜덤숫자
  if(min && max) return Math.floor(Math.random() * (max - min + 1)) + min;//5~200
  else if(max) return Math.floor(Math.random() * (max + 1));//0~50
  else return Math.floor(Math.random()*100)+1;//1~100
}
ut.rdCharMaker=(strLen=5)=>{
  let chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let rdStr='';
  for (let i=0;i<strLen;i++){
      let rnum=Math.floor(Math.random() * chars.length);
      rdStr+=chars.substring(rnum,rnum+1);
  }
  return rdStr;
}

/////////////////////
ut.es=(str,regex)=>{//escape number
  regex=regex||/[^0-9]/g;
  return String(str).replace(regex,'');
}
ut.nf=(nm)=>{//number format
  nm=ut.es(String(nm),/[^0-9\.]/g);
  let x=nm.split('.'), x1=x[0], x2=x.length>1 ? '.'+x[1]:'', rgx=/(\d+)(\d{3})/;
  while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
  return x1+x2;
}
ut.pre=(json)=>{
  return JSON.stringify(json,null,6);
}
ut.substrEnd=(str,en)=>{
  return str.substr(str.length-en,en);
}

/////////////////////
ut.setLoopStop=(fnc,pulse,limit)=>{
  if(typeof fnc==='function' && pulse<=limit){
    let autoInterval=setInterval(()=>{
      fnc();
    },pulse);
    setTimeout(()=>{clearInterval(
      autoInterval
    );},limit);
    return autoInterval;
  }
  else return false;
}

/////////////////////
ut.pp=()=>{
  return process.pid;
}
ut.reqData=(req)=>{
  return{
    paths:url.parse(req.url).pathname.split('/'),
    querys:querystring.parse(url.parse(req.url).query)
  };
}

/////////////////////
ut.erMake=(erAray)=>{
  let er={};
  if(Array.isArray(erAray)) for(let k in erAray){
    if(k==0) er.msg=erAray[k];
    else if(k==1) er.code=erAray[k];
    else if(k==2) er.pos=erAray[k];
    else if(erAray[k]) er.data=erAray[k];
  }
  return er;
}

/////////////////////
ut.lenByte=(str)=>{
  let strLen=((s,b,i,c)=>{
    for(
      b=i=0;
      c=s.charCodeAt(i++);
      b+=c>>11?3:c>>7?2:1
    );
    return b;
  })(str);
  return strLen;

  /*console.log(
    lenByte('777'),'777'.length
    ,lenByte('abcde'),'abcde'.length
    ,lenByte('안녕하세요'),'안녕하세요'.length
  );*/
  //3 3 5 5 22 8 (ANSI) //3 3 5 5 15 5 (UTF8)
};

//////////////////////////////////////
//const {StndTranBaseMilli,StndTranBaseYmd,StndTranBaseHms,intnlApiTelgmNo}=ut.mkDate();
ut.mkDate=()=>{
  let date=new Date();
  let year=date.getFullYear();
  let month=String(date.getMonth()+1).padStart(2,'0');
  let day=String(date.getDate()).padStart(2,'0');
  let hour=String(date.getHours()).padStart(2,'0');
  let minute=String(date.getMinutes()).padStart(2,'0');
  let second=String(date.getSeconds()).padStart(2,'0');
  let milli=String(date.getMilliseconds()).padStart(3,'0');
  return {
    StndTranBaseYmd:year+month+day,
    StndTranBaseMilli:year+month+day+hour+minute+second+milli,
    StndTranBaseHms:hour+minute+second,
    intnlApiTelgmNo:day+hour+minute+second,
    logTime:year+month+day+' '+hour+':'+minute+':'+second+' '+milli
  };
};
//////////////////////////////////////
ut.uTimeToDate=(t)=>{
  let date=new Date();
  if(t) date=new Date(Number(t));
  let year=String(date.getFullYear());
  let month="0"+(date.getMonth()+1);
  let day="0"+date.getDate();
  let hour="0"+date.getHours();
  let minute="0"+date.getMinutes();
  let second="0"+date.getSeconds();
  let milli="00"+date.getMilliseconds();
  return year
  +"-"+month.substr(-2)
  +"-"+day.substr(-2)
  +" "+hour.substr(-2)
  +":"+minute.substr(-2)
  +":"+second.substr(-2)
  +"."+milli.substr(-3);
}
ut.tmView=(sT,eT)=>{
  let rT=Math.round((Number(sT)-Number(eT))/100);
  return rT/10;
}

///////////////////////////////
///////////////////////////////
///////////////////////////////
ut.logger=(fileName,str)=>{
  //console.log(fileName,str);
  fs.appendFile(
    fileName,str,(e)=>{}
  );
};
ut.fileSize=(file)=>{
  return fs.statSync(file).size;
}
ut.fileDelete=(file)=>{
  fs.exists(file,(ex)=>{
    if(ex) fs.unlink(file,(er)=>{});
  });
}
ut.dirMake=(dir)=>{
  fs.exists(dir,(ex)=>{
    if(!ex) fs.mkdir(dir,(e)=>{});
  });
  //if(!fs.existsSync(dir)) fs.mkdir(dir,(e)=>{});
}
/////////
ut.reNumber=(number)=>{
  let renum1=String(number).padStart(3,'0');
  return renum1+'001';
};

/////////
ut.rdNum=(n,ch)=>{
  n=n||5;
  ch=ch||'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rs='';
  for(let i=0;i<Number(n);i++){
    rs+=ch[Math.floor(Math.random()*ch.length)];
  }
  return rs;
}

/////////
ut.logPath=(cap,tail,ext)=>{
  let thisTm=+ new Date();
  tail=tail||'';
  ext=ext||'log';
  return lgDir+cap+'_'+thisTm+'-'+ut.rdNum(2)+'_'+tail+'.'+ext;
}

/////////
ut.clearLog=(dir,gapSec)=>{
  fs.readdir(dir,(er,files)=>{
    //let dfn=0;
    //let totalN=files.length;
    if(!er){
      if(files){
        files.forEach((file,i)=>{
          fs.stat(path.join(dir,file),(err,stat)=>{
            let now=new Date().getTime();
            let endTime=new Date(stat.ctime).getTime()
              +(1000*gapSec)//초
            ;
            if(now>endTime){
              fs.unlink(path.join(dir,file),()=>{
                console.log('deleted',file);
                //dfn++;
                //console.log(now,endTime,(now-endTime)/1000);
              });
            }
          });
          //console.log(i+1);
          //if(i+1>=totalN && dfn>0) console.log(dfn,'deleted.');
        });
      }
      else{
        console.log('log file none');
      }
    }
    else{
      console.log('log scanning failed');
    }
  });
}

/////////
ut.lgSv=(cap,log)=>{
  //['X. client XXXXX branch',process.pid,upSoc.key+'?',upSoc.method]
  let thisTm=+ new Date();
  let date=new Date();
  let year=date.getFullYear();
  let month=String(date.getMonth()+1).padStart(2,'0');
  let day=String(date.getDate()).padStart(2,'0');
  let dateDir=year+month+day+'/';
  let msg=log[0];
  let key=log[1];
  let method=log[2];
  let pid=log[3];
  let datas='';
  if(log[4]) datas=log[4]+'\n';
  let lgFile=cap+'_'+/*thisTm+'-'+ut.rdNum(2)+'_'+*/method+'_'+key+'.'+'log';
  if(!fs.existsSync(lgDir+dateDir)) fs.mkdirSync(lgDir+dateDir);
  ut.logger(lgDir+dateDir+lgFile,thisTm+' : '+msg+'\n'+datas);
  return lgFile;
}

////////////////////////////////
ut.hvw=(special)=>{//특수문자를 화면에 나타내기 위해 사용한다.
  special=String(special).replace(/&/g,"&amp;");
  special=special.replace(/</g,"&lt;");
  special=special.replace(/>/g,"&gt;");
  special=special.replace(/\"/g,"&quot;");
  special=special.replace(/\'/g,"&#39;");
  special=special.replace(/\n/g,"<br />");
  special=special.replace(/  /g," &nbsp; ");
  return special;
}
ut.ads=(string)=>{//addslashes//디비 등의 입력값을 문자화 하기 위해 사용한다.
  return String(string).replace(/\\/g, '\\\\').
  replace(/\u0008/g, '\\b').
  replace(/\t/g, '\\t').
  replace(/\n/g, '\\n').
  replace(/\f/g, '\\f').
  replace(/\r/g, '\\r').
  replace(/'/g, '\\\'').
  replace(/"/g, '\\"');
}
ut.htmlEncode=(str)=>{//HTML entity
  return String(str).replace(/[^\w. ]/gi, function(c){
    return '&#'+c.charCodeAt(0)+';';
  });
}
ut.GQtrust=(query)=>{//get query를 통해 들어온 사용자 입력을 모두 HTML 엔티티로 변경한다.//xss를 방지하기 위해 사용
  let qrys={};
  for(let key in query){
    //만약 값이 존재하지 않는 키가 있다면 삭제한다.
    if(ut.htmlEncode(query[key])) qrys[ut.htmlEncode(key)]=ut.htmlEncode(query[key]);//키와 값을 모두 변경한다.
  }
  return qrys;
}
//연속된 배열중 순서대로 검색어 다음 값을 가져온다.
ut.keyValArySearch=(header,keyName)=>{//1,2,3,4,5,6 => [1]=2,[3]=4,[5]=6 //http header의 구조
  if(Array.isArray(header)){
    let findFlag=false;
    for(let n in header){
      let value=header[n];
      if(findFlag){
        return value;
      }
      if(value==keyName){
        findFlag=true;
      }
    }
  }
}
//req에 포함된 유용한 값들을 보기좋게 추출한다.
ut.locate=(req)=>{
  let host=ut.keyValArySearch(req.rawHeaders,'Host');
  let paths=req.originalUrl.split('?');
  let path=paths[0].replace(/\/*$/,'');
  return {
    url:host+path,
    host:host,//"demo.nodebreaker.link:8088"
    path:path,//"/member/list"//마지막의 슬래시는 제거된다.
    base:req.baseUrl,//"/member"
    mth:req.method,//"GET"
    pram:req.params,//{a:"1"}
    get:ut.GQtrust(req.query),//{a:"1"}
    post:req.body,//{a:"1"}
    cook:req.cookies//{a:"1"}
  };
  /*
  "url": "demo.nodebreaker.link:8088/member/list",
  "host": "demo.nodebreaker.link:8088",
  "path": "/member/list",
  "base": "/member",
  "mth": "GET",
  "pram": {},
  "get": {
      "a": "1"
  },
  "post": {},
  "cook": {
      "PCID": "16595109133451840901970",
      "RC_COLOR": "24",
      "RC_RESOLUTION": "3840*2160"
  }
  */
}

////////////////////////////////
////////////////////////////////


////////////////////////////////
ut.isId=(id)=>{
  //영어로 시작하는 영숫자 4~20자
  let regExp=/^[A-Z]+[A-Z0-9]{3,19}$/g;
  return regExp.test(id);
}
ut.isName=(name)=>{
  //영어로 시작하는 영숫자 1~50자
  let regExp=/[^0-9a-zA-Z가-힣_@\/\:\.\s\-]{1,50}$/g;
  return regExp.test(name);
}
ut.isPs=(ps)=>{
  //영문,숫자,특수문자를 하나 이상 포함하는 6~20자
  let regExp=/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/;
  return regExp.test(ps);
}
ut.isMail=(mail)=>{
  let regExp=/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return regExp.test(mail);
}
ut.isDomain=(domain)=>{
  //let regExp=/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
  let regExp=/^([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]{2,5})?$/;
  return regExp.test(domain);
}
ut.isIP=(ip)=>{
  let regExp=/^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
  return regExp.test(ip);
}
ut.isIPport=(ip)=>{
  let regExp=/^(1|2)?\d?\d([.](1|2)?\d?\d){3}(\:[0-9]{2,5})?$/;
  return regExp.test(ip);
}
ut.isCoRegNum=(regNum)=>{
  let numberMap=regNum.replace(/-/gi,'').split('').map((d)=>{
    return parseInt(d,10);
  });

  if(numberMap.length==10){
    let keyArr=[1,3,7,1,3,7,1,3,5];
    let chk=0;
    keyArr.forEach((d,i)=>{
      chk+=d*numberMap[i];
    });
    chk+=parseInt((keyArr[8]*numberMap[8])/10,10);
    console.log(chk);
    return Math.floor(numberMap[9])===((10-(chk%10))%10);
  }
  else return false;
}

/////////////////////
module.exports=ut;