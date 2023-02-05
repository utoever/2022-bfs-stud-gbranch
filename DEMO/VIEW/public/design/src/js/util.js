/////////////////////
const toJson=(jsonStr)=>{
	let json={};
	try{json=JSON.parse(jsonStr);}
	catch(e){json={str:jsonStr,e:e};}
	return json;
}
const toStr=(json)=>{
	let str='';
	try{str=JSON.stringify(json);}
	catch(e){str=json+' ('+e+')';}
	return str;
}

/////////////////////
const qs=function(qry){return  document.querySelector(qry);}
const es=function(str,regex){regex=regex||/[^0-9]/g; return String(str).replace(regex,'');}//escape number
const nf=function(nm){//number format
	nm=es(String(nm),/[^0-9\.]/g);
	let x=nm.split('.'), x1=x[0], x2=x.length>1 ? '.'+x[1]:'', rgx=/(\d+)(\d{3})/;
	while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
	return x1+x2;
}
const toCardDiv=function(cardnum){return cardnum.substr(0,4)+'-'+cardnum.substr(4,4)+'-'+cardnum.substr(8,4)+'-'+cardnum.substr(12,4);}
const toDate=function(Ymd){return Ymd.substr(0,4)+'-'+Ymd.substr(4,2)+'-'+Ymd.substr(6,2);}
const toTime=function(His){return His.substr(0,2)+':'+His.substr(2,2)+':'+His.substr(3,2);}

/////////////////////
const mkDate=()=>{
	let date=new Date();
	let rt={
		year:String(date.getFullYear()),
		month:String(date.getMonth()+1).padStart(2,'0'),
		day:String(date.getDate()).padStart(2,'0'),
		hour:String(date.getHours()).padStart(2,'0'),
		minute:String(date.getMinutes()).padStart(2,'0'),
		second:String(date.getSeconds()).padStart(2,'0'),
		milli:String(date.getMilliseconds()).padStart(2,'0'),
	};
	rt.today=rt.year+'-'+rt.month+'-'+rt.day;
	rt.todayFullHan=rt.year+'년 '+rt.month+'월 '+rt.day+'일 '+rt.hour+'시 '+rt.minute+'분 '+rt.second+'초';
	return rt;
}

/////////////////////
const timeStamp=()=>{
	return Math.floor(new Date().getTime()/1000);
}

/////////////////////
const acNoDivider=(ac)=>{
	ac=String(ac);
	if(ac.length == 12) return ac.substr(0, 3) +'-'+ac.substr(3, 2)+'-'+ac.substr(5, 4)+'-'+ac.substr(9, 3);
	else if(ac.length == 14) return ac.substr(0, 6)+'-'+ac.substr(6, 2)+'-'+ac.substr(8, 6);
	else return ac
}

/////////////////////
const d=mkDate();
const bankCodes={
	'001':'한국은행','002':'산업은행','003':'기업은행','004':'국민은행','005':'KEB하나은행',/*'006':'국민은행',*/'007':'수협은행','008':'수출입은행',/*'009':'수협은행',*/'010':'농협은행',/*'011':'농협은행',*//*'012':'지역 농축협','013':'지역 농축협','014':'지역 농축협','015':'지역 농축협',*//*'016':'농협은행',*//*'017':'지역 농축협','018':'지역 농축협',*/'018':'신용보증기금',/*'019':'국민은행',*/'020':'우리은행','021':'신한은행',/*'022':'우리은행',*/'023':'SC제일은행',/*'024':'우리은행',*//*'025':'KEB하나은행',*//*'026':'신한은행',*/'027':'한국씨티은행',/*'028':'신한은행',*//*'029':'국민은행',*//*'030':'수협은행',*/'031':'대구은행','032':'부산은행',/*'033':'KEB하나은행',*/'034':'광주은행','035':'제주은행',/*'036':'한국씨티은행',*/'037':'전북은행','039':'경남은행','041':'우리카드',/*'043':'기업은행',*/'044':'외환카드','045':'새마을금고중앙회',/*'046':'새마을금고중앙회',*/'047':'신협','048':'신협','049':'신협','050':'저축은행','051':'외국계은행(중국 농협등)','052':'모간스탠리은행',/*'053':'한국씨티은행',*/'054':'HSBC은행','055':'도이치은행','057':'제이피모간체이스은행','058':'미즈호은행','059':'엠유에프지은행','060':'BOA은행','061':'비엔피파리바은행','062':'중국공상은행','063':'중국은행','064':'산림조합중앙회','065':'대화은행','066':'교통은행','067':'중국건설은행','071':'우체국',/*'072':'우체국','073':'우체국','074':'우체국','075':'우체국',*/'077':'기술보증기금',/*'078':'국민은행','079':'국민은행',*//*'080':'KEB하나은행','081':'KEB하나은행','082':'KEB하나은행',*//*'083':'우리은행','084':'우리은행',*//*'085':'새마을금고중앙회','086':'새마을금고중앙회','087':'새마을금고중앙회',*//*'088':'신한은행',*/'089':'케이뱅크','090':'카카오뱅크'/*,'102':'대신저축은행','103':'에스비아이저축은행','104':'에이치케이저축은행','105':'웰컴저축은행','106':'신한저축은행'*/
};
const acnos={
	'37040101005975':{acno:'37040101005975',acDiv:'저축예금',acNewDate:'2005-03-15',acMaker:'강서지점',acLastDate:d.today},
	'04710104215392':{acno:'04710104215392',acDiv:'저축예금',acNewDate:'2010-02-15',acMaker:'방화동지점',acLastDate:d.today},
	'59190101381155':{acno:'59190101381155',acDiv:'저축예금',acNewDate:'2000-01-30',acMaker:'발산역지점',acLastDate:d.today},
	'086240263908':{acno:'086240263908',acDiv:'저축예금',acNewDate:'2006-12-01',acMaker:'북수원지점',acLastDate:d.today}
};
const acnosAry=[
	{idiviDvsnBnkCd:'004',acno:'37040101005975',acDiv:'저축예금',acNewDate:'2005-03-15',acMaker:'강서지점',acLastDate:d.today},
	{idiviDvsnBnkCd:'004',acno:'04710104215392',acDiv:'저축예금',acNewDate:'2010-02-15',acMaker:'방화동지점',acLastDate:d.today},
	{idiviDvsnBnkCd:'004',acno:'59190101381155',acDiv:'저축예금',acNewDate:'2000-01-30',acMaker:'발산역지점',acLastDate:d.today},
	{idiviDvsnBnkCd:'004',acno:'086240263908',acDiv:'저축예금',acNewDate:'2006-12-01',acMaker:'북수원지점',acLastDate:d.today}
];
let url='http://222.108.224.3:650';
let apiKey="demoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

const ut={
  toJson:toJson,
  toStr:toStr,
  qs:qs,
  es:es,
  nf:nf,
  toCardDiv:toCardDiv,
  toDate:toDate,
  toTime:toTime,
  mkDate:mkDate,
  timeStamp:timeStamp,
  acNoDivider:acNoDivider,
  d:d,
  bankCodes:bankCodes,
  acnos:acnos,
  acnosAry:acnosAry,
  url:url,
  apiKey:apiKey
}