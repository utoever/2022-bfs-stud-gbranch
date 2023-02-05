//const dataUrl='wss://gate.nodebreaker.link:1800/';
const dataUrl='ws://gate.nodebreaker.link:1800/';
const ajaxUrl='/ajax/';

/////////////////////
const dlr=(loc)=>{
  document.location.replace(loc);
}
const dlh=(loc)=>{
  document.location.href=loc;
}

/////////////////////
const es=(str,regex)=>{//escape number
  regex=regex||/[^0-9]/g;
  return String(str).replace(regex,'');
}
const nf=(nm)=>{//number format
  nm=es(String(nm),/[^0-9\.]/g);
  let x=nm.split('.'), x1=x[0], x2=x.length>1 ? '.'+x[1]:'', rgx=/(\d+)(\d{3})/;
  while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
  return x1+x2;
}
const pre=(json,name='')=>{
  return name+' '+JSON.stringify(json,null,6);
}
const pr=(json,name='')=>{
  console.log(name,json);
}

/////////////////////
const rdMaker=(max=0,min=0)=>{//100이하의 랜덤숫자
  if(min && max) return Math.floor(Math.random() * (max - min + 1)) + min;//5~200
  else if(max) return Math.floor(Math.random() * (max + 1));//0~50
  else return Math.floor(Math.random()*100)+1;//1~100
}
const rdCharMaker=(strLen=5)=>{
  let chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let rdStr='';
  for (let i=0;i<strLen;i++){
      let rnum=Math.floor(Math.random() * chars.length);
      rdStr+=chars.substring(rnum,rnum+1);
  }
  return rdStr;
}

//////////////////////cookie
const getCookie=function(cookieName){
  var search=cookieName+"=", cookie=document.cookie;
  if(cookie.length>0){
    startIndex=cookie.indexOf(cookieName);
    if(startIndex!=-1){
      startIndex+=cookieName.length;
      endIndex=cookie.indexOf(";",startIndex);
      if(endIndex==-1) endIndex=cookie.length;
      return unescape(cookie.substring(startIndex+1,endIndex));
  }else{return false;}}else{return false;}
}
const setCookie=function(cookieName,cookieValue,cookieDay){
  var today=new Date(); today.setDate(today.getDate()+parseInt(cookieDay));
  document.cookie=cookieName+"="+escape(cookieValue)+"; path=/; expires="+today.toGMTString()+";";
}
const delCookie=function(cookieName){
  var cookieDay=new Date(); cookieDay.setDate(cookieDay.getDate()-1);
  document.cookie=cookieName+"= "+"; expires="+cookieDay.toGMTString()+"; path=/;";
}
const allCookie=function(){
  var rs={};
  var cks=document.cookie.split(';');
  for(var ky in cks){
    var v=k.tr(cks[ky]);
    var dvIndex=v.indexOf('=');
    if(dvIndex>0){
      var key=k.tr(v.substring(0,dvIndex));
      var value=k.tr(v.substring(dvIndex+1,v.length));
      if(key.substring(0,2)!='__') //Chrome's Cookie
      rs[key]=value;
    }
  }
  return rs;
}
const clearAllCookies=(domain,path)=>{
  var doc=document,
      domain=domain || doc.domain,
      path=path || '/',
      cookies=doc.cookie.split(';'),
      now=+(new Date);
  for (var i=cookies.length - 1; i >= 0; i--) {
    doc.cookie=cookies[i].split('=')[0] + '=; expires=' + now + '; domain=' + domain + '; path=' + path;
  }
}
////////////////////////////////
//jwt는 일정시간후에 파기되는 것을 예약할 뿐, 브라우저가 종료된 뒤에도 인증값이 살아있다.
//따라서 브라우저와 함께 파괴되는 세션값을 이용하여,
//브라우저를 종료할 경우 인증을 무효처리한다.
const cookieSessionBlock=(keyName,toUrl)=>{
  let cookieVal=getCookie(keyName);
  let sessionVal=sessionStorage.getItem(keyName);
  //console.log('c:'+cookieVal,'s:'+sessionVal);

  if(!cookieVal) sessionStorage.removeItem(keyName);
  if(cookieVal && cookieVal!=sessionVal){//쿠키와 세션에 저장된 토큰이 일치하지 않는다면
    delCookie(keyName);//쿠키를 파괴하고
    dlr(toUrl);//초기화면으로
  }
}


////////////////////////////////
const menuActive=(data)=>{
  $('.sub-menu li').removeClass('active');
  if(data.src && data.dir){
    let href=data.dir+'/'+data.src;
    $('.sub-menu li').each((i,e)=>{
      if($(e).children('a').attr('href').indexOf(href)>-1)
        $(e).addClass('active').children('a').css('font-weight','bold');
    });
  }
}


//Counter
////////////////////////////////
const countView=()=>{

  $('[data-toggle="counter"]').each(function(i, e){
    var _el      =$(this);
    var prefix   ='';
    var suffix   ='';
    var start    =0;
    var end      =0;
    var decimals =0;
    var duration =2.5;

    if( _el.data('prefix') ){ prefix=_el.data('prefix'); }
    if( _el.data('suffix') ){ suffix=_el.data('suffix'); }
    if( _el.data('start') ){ start=_el.data('start'); }
    if( _el.data('end') ){ end=_el.data('end'); }
    if( _el.data('decimals') ){ decimals=_el.data('decimals'); }
    if( _el.data('duration') ){ duration=_el.data('duration'); }

    var count=new CountUp(_el.get(0), start, end, decimals, duration, { 
      suffix: suffix,
      prefix: prefix,
    });

    count.start();
  });
}

////////////////////////////////
const sortAryByKey=(ary,key)=>{
  if(Array.isArray(ary)){
    ary.sort((a,b)=>{
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 :0;
    });
  }
  return ary;
}
const limitLast=(ary,limit)=>{
  if(Array.isArray(ary) && ary.length>limit) return ary.slice(ary.length-limit);
  else return ary;
}
const arySum=(ary)=>{
  if(Array.isArray(ary) && ary.length>0){
    let arySum=0;
    for(let i in ary){
      ary[i]=ary[i]||0;
      //pr(ary[i]);
      arySum+=ary[i];
    }
    return arySum;
  }
  else return 0;
}
const aryAvr=(ary)=>{
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

/*
//setCookie('lastTime',+ new Date());
////////////////////////////////
const timeLogout=(fnc,gapLimit)=>{
  gapLimit=gapLimit||1000*60*10;
  let thisTime=+ new Date();
  let lastTime=getCookie('lastTime');
  let token=getCookie('token');
  //if(!lastTime) lastTime=0;
  let gapTime=Number(thisTime)-Number(lastTime);
  let gap=gapTime/gapLimit;

  if(gap>1 && token){
    if(typeof fnc==='function') fnc();
  }
  setCookie('lastTime',+ new Date());
}

timeLogout(()=>{
  dlr('/on/login/105');
});*/

//////////////////////////////////////
//const {StndTranBaseMilli,StndTranBaseYmd,StndTranBaseHms,intnlApiTelgmNo}=ut.mkDate();
const mkDate=()=>{
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
const uTimeToDate=(t)=>{
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

////////////////////////////////
const isId=(id)=>{
  //영어로 시작하는 영숫자 4~20자
  //alert(id);
  //alert(id.length);
  let regExp=/^[A-Z]+[A-Z0-9]{3,19}$/g;
  return regExp.test(id);
}
const isName=(name)=>{
  //영어로 시작하는 영숫자 1~50자
  let regExp=/[^0-9a-zA-Z가-힣_@\/\:\.\s\-]{1,50}$/g;
  return regExp.test(name);
}
const isPs=(ps)=>{
  //영문,숫자,특수문자를 하나 이상 포함하는 6~20자
  let regExp=/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{6,20}$/;
  return regExp.test(ps);
}
const isMail=(mail)=>{
  let regExp=/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return regExp.test(mail);
}
const isDomain=(domain)=>{
  //let regExp=/^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
  let regExp=/^([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]{2,5})?$/;
  return regExp.test(domain);
}
const isIP=(ip)=>{
  let regExp=/^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;
  return regExp.test(ip);
}
const isIPport=(ip)=>{
  let regExp=/^(1|2)?\d?\d([.](1|2)?\d?\d){3}(\:[0-9]{2,5})?$/;
  return regExp.test(ip);
}
const isCoRegNum=(regNum)=>{
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

////////////////////////////////
const hvw=(special)=>{
  special=special.replace(/&/g,"&amp;");
  special=special.replace(/</g,"&lt;");
  special=special.replace(/>/g,"&gt;");
  special=special.replace(/\"/g,"&quot;");
  special=special.replace(/\'/g,"&#39;");
  special=special.replace(/\n/g,"<br />");
  special=special.replace(/  /g," &nbsp; ");
  return special;
}
const ads=(string)=>{
  return string.replace(/\\/g, '\\\\').
  replace(/\u0008/g, '\\b').
  replace(/\t/g, '\\t').
  replace(/\n/g, '\\n').
  replace(/\f/g, '\\f').
  replace(/\r/g, '\\r').
  replace(/'/g, '\\\'').
  replace(/"/g, '\\"');
}
const htmlEncode=(str)=>{
  return String(str).replace(/[^\w. ]/gi, function(c){
    return '&#'+c.charCodeAt(0)+';';
  });
}

////////////////////////////////
const cookieSessTimeoutMin=3;
let cookieSessLoop={};

const cookieSessTimeout=(min,url)=>{
  let loginTime=Number(getCookie('loginTime'));
  if(loginTime){
    cookieSessLoop=setInterval(()=>{
      let thisTime=+ new Date();
      let gapTime=Math.round((thisTime-loginTime)/1000);
      let toTime=60*min;
      if(gapTime>toTime){
        cookieSessStop();
        dlh(url);
      }
      else{
        let remainTime=toTime-gapTime;
        let reMin=Number(Math.floor(remainTime/60));
        let reSec=Number(remainTime-(reMin*60));
        $('#cookieSessN').text(' (세션타임 '+reMin+':'+reSec+')');
      }
    },1000);
  }
}
const cookieSessStart=()=>{
  setCookie('loginTime',+ new Date,365);
  cookieSessTimeout(cookieSessTimeoutMin,'/on/login');
}
const cookieSessStop=()=>{
  clearInterval(cookieSessLoop);
  delCookie('loginTime');
  $('#cookieSessN').text('');
}

////////////////////////////////
const logout=(login=false)=>{
  delCookie('loginTime');
  delCookie('token');
  sessionStorage.removeItem('token');
  localStorage.removeItem('autoLogin');
  if(login) dlr('/on/login');
}

////////////////////////////////
const cfgSave=(userId)=>{
  if(localStorage.getItem('userId')==userId) $('#cfgSaveUserId').attr('checked',true);
  else localStorage.removeItem('userId');
  if(localStorage.getItem('autoLogin')=='Y') $('#cfgSaveAutoLogin').attr('checked',true);
  else localStorage.removeItem('autoLogin');

  $('#cfgSaveUserId').click(function(){
    let saveFlag=$(this).is(':checked');
    if(saveFlag) localStorage.setItem('userId',userId);
    else localStorage.removeItem('userId');
    //console.log(userId,saveFlag,localStorage.getItem('userId'));
  });

  $('#cfgSaveAutoLogin').click(function(){
    let saveFlag=$(this).is(':checked');
    if(saveFlag){
      localStorage.setItem('autoLogin','Y');
      cookieSessStop();
    }
    else{
      localStorage.removeItem('autoLogin');
      cookieSessStart();
    }
    //console.log(saveFlag,localStorage.getItem('autoLogin'));
  });
}

////////////////////////////////
if(localStorage.getItem('autoLogin')!='Y'){
  cookieSessionBlock('token','/on/login');
  cookieSessStart();
}
else{
  cookieSessStop();
}

////////////////////////////////
setInterval(()=>{
  let token=getCookie('token');
  if(!token) logout(loginRedirect);
},1000);