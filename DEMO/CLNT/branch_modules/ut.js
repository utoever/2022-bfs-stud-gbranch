//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const ut={};

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
ut.rdMaker=(max=0,min=0)=>{//100이하의 랜덤숫자
    if(min && max) return Math.floor(Math.random() * (max - min + 1)) + min;//5~200
    else if(max) return Math.floor(Math.random() * (max + 1));//0~50
    else return Math.floor(Math.random()*100)+1;//1~100
}
ut.rdCharMaker=(string_length=5)=>{
    let chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomstring='';
    for (let i=0; i<string_length; i++) {
        let rnum=Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
ut.toJson=(jsonStr)=>{
  let json={};
  try{json=JSON.parse(jsonStr);}
  catch(e){json={str:jsonStr,e:e};}
  return json;
}
/////////////////////
ut.es=(str,regex)=>{regex=regex||/[^0-9]/g; return String(str).replace(regex,'');}//escape number
ut.nf=(nm)=>{//number format
  nm=ut.es(String(nm),/[^0-9\.]/g);
  let x=nm.split('.'), x1=x[0], x2=x.length>1 ? '.'+x[1]:'', rgx=/(\d+)(\d{3})/;
  while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
  return x1+x2;
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
ut.setLoopStop=(fnc,pulse,limit)=>{
  if(typeof fnc==='function' && pulse && limit){
    let autoInterval={};
    let n=0;
    autoInterval=setInterval(()=>{
      n++;
      fnc();
      if(n>=limit){
        clearInterval(autoInterval);
      }
    },pulse);
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
ut.tmView=(sT,eT)=>{
  let rT=Math.round((Number(sT)-Number(eT))/100);
  return rT/10;
}

module.exports=ut;