/////////////////////
const url='http://demo.nodebreaker.link:1650';

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
const pre=(json)=>{
  return JSON.stringify(json,null,6);
}
const substrEnd=(str,en)=>{
  return str.substr(str.length-en,en);
}

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
/*var testJson={"a":{"b":1},"str":"d"};
var testStr="{\"a\":{\"b\":1},\"str\":\"d\"}";
$('#contents').html(JSON.stringify(testJson,null,4));
alert(toStr(testJson));
alert(JSON.stringify(toJson(testJson)));*/

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

/////////////////////
const menuPointer=(code)=>{
  $('#menu a').each((i,e)=>{
    let href=$(e).attr('href');
    //console.log(href.indexOf(code));
    if(href.indexOf(code)>=0){
      $(e).children('.mnItem').addClass('btn-primary');
      $(e).children('.mnItem').removeClass('btn-default');
    }
    else{
      $(e).children('.mnItem').removeClass('btn-primary');
      $(e).children('.mnItem').addClass('btn-default');
    }
  });
}

/////////////////////
const viewJson=(rs)=>{
  //console.log(rs);
  $('#resultBtns').hide();
  $('.datas').hide();

  if(rs.rspData) $('#outputRaw').html(JSON.stringify(rs.rspData,null,4));
  else $('#outputRaw').html('');
  if(rs.rspData.error) $('#outputError').html(JSON.stringify(rs.rspData.error,null,4));
  else $('#outputError').html('');
  if(rs.rspData.outputData) $('#outputData').html(JSON.stringify(rs.rspData.outputData,null,4));
  else $('#outputData').html('');
  if(rs.rspData.inputData) $('#inputData').html(JSON.stringify(rs.rspData.inputData,null,4));
  else $('#inputData').html('');
  if(rs.sendingData) $('#sendingData').html(JSON.stringify(rs.sendingData,null,4));
  else $('#sendingData').html('');

  $('.resultBtn').removeClass('btn-primary').addClass('btn-default');
  $('#rawBtn').removeClass('btn-default').addClass('btn-primary');

  //$('#outputRaw').slideDown();
  $('#outputRaw').show();
  $('#resultBtns').show();
}

/////////////////////
const getValues=function(){
  let datas={};
  $('#value input').each((i,e)=>{
    let key=$(e).attr('name');
    let val=$(e).val();
    datas[key]=val;
  });
  return datas;
}
const pedNView=()=>{
  pedN=sendN-retN-errN;
  $('#pedN').text(nf(pedN));
}
const sendAction=(code,method)=>{
  let preNT=Number(es($('#preNT').val()));
  if(preNT>0){
    retN=sendN=preNT;
    pedN=errN=0;
    $('#preNT').val(0).hide();
  }
  sendN++;
  $('#sendNT').text(nf(sendN));

  let data={};
  data=getValues();
  data.method=method;//필수

  //data.dt=+ new Date();
  //data.code=code;
  //data.hosts=url;
  //alert(JSON.stringify(data));

  $.ajax({
    dataType:'json',
    data:data,
    url:url,
    method:'get',
    beforeSend:(xhr)=>{
      xhr.setRequestHeader("apiKey","xxxxxxxxxxxx");
    },
    success:function(rs){
      viewJson(rs);

      if(rs.rspData.flag){
        retN++;
        $('#retN').text(nf(retN));
        $('#outputRaw').css({'background':'white',"color":"#444"});
        pedNView();
      }
      else{//서버로부터 응답을 받았으나, 정상적이지 않음. 차단되었거나 타임아웃됨.
        console.log(rs);
        errN++;
        console.log(errN);
        $('#errN').text(nf(errN));
        $('#outputRaw').css({'background':'green',"color":"white"});
        pedNView();
      }
    },
    error:function(req,stat,err){//서버가 응답하지 않음.
      console.log(err);
      errN++;
      console.log(errN);
      $('#errN').text(nf(errN));
        $('#outputRaw').css({'background':'red',"color":"white"});
        pedNView();
    }
  });

}
const getValuesArray=function(){
  let datas={};
  $('#value input').each((i,e)=>{
    let key=$(e).attr('name');
    let val=$(e).val();
    if(!datas[key]) datas[key]=[];
    datas[key].push(val);
  });
  return datas;
}
const sendActionArray=(code,method)=>{
  let data={};
  data=getValuesArray();
  data.method=method;//필수

  //data.dt=+ new Date();
  //data.code=code;
  //data.hosts=url;
  //alert(JSON.stringify(data));

  $.ajax({
    dataType:'json',
    data:data,
    url:url,
    method:'get',
    beforeSend:(xhr)=>{
      xhr.setRequestHeader("apiKey","xxxxxxxxxxxx");
    },
    success:function(rs){
      viewJson(rs);
    }
  });

}

/////////////////////
let loopFlag=false;
const loopSubmit=(fix=false)=>{
  if($('#repeat').data('flag')=='on'){
    let loops=setInterval(()=>{

      loopFlag=true;
      $('#send').hide();
      let max=Number($('#repeatNum').val());
      if(max>40){
        max=40;
        alert('초당 최대 전송수는 '+max+'회 입니다.');
        $('#repeatNum').val(max);
      }
      if(max<1) max=1;
      let loopN=max;
      let limit=max;
      if(!fix){
        loopN=rdMaker(1,max+2)-1;//1~40
        limit=Math.round(max*2);
      }
      
      let n=0;
      if(pedN<=limit){//지연발생시 패스
        for(let i=0;i<loopN;i++){//0~39
          setTimeout(()=>{
            sendAction(code,method);
            if(i>=loopN-1) $('#sendN').text(0);//39
          },Math.round(950/loopN)*(i+1));//1초를 잘게 나누어 균등하게 배치한다.
        }
        $('#sendN').text(nf(loopN));//1~40
      }

      $('#outputRaw').scrollTop(292);
      if($('#repeat').data('flag')=='off'){
        clearInterval(loops);
        loopFlag=false;
        $('#send').show();
      }

    },1000);
  }
  else sendAction(code,method);
}

/////////////////////
$('.resultBtn').click(function(){
  $('.resultBtn').addClass('btn-default');
  $('.resultBtn').removeClass('btn-primary');
  $('.datas').hide();
  $(this).removeClass('btn-default');
  $(this).addClass('btn-primary');
  $('#'+$(this).data('dataname')).slideDown();
});

$('#repeat').click(function(){
  if($(this).data('flag')=='off'){
    $(this).removeClass('btn-default');
    $(this).addClass('btn-warning');
    $(this).data('flag','on');
    $(this).text('repeat');
    $('#send').removeClass('btn-success');
    $('#send').addClass('btn-danger');
    $('#send').text('start');
  }
  else{
    $(this).removeClass('btn-warning');
    $(this).addClass('btn-default');
    $(this).data('flag','off');
    $(this).text('once');
    $('#send').addClass('btn-success');
    $('#send').removeClass('btn-danger');
    $('#send').text('send');
  }
});

$('#secretBtn').click(function(){
  $('#preNT').val(sendN).show();
});

//$('body').html('<p style="padding:25px;font-size:30px;text-align:center;">서버 업데이트 중. (30분 소요예정)</p>');
/*
let testN=0;
let testI=setInterval(()=>{
  testN++;
  console.log(rdMaker(1,7)-1);
  if(testN==10) clearInterval(testI);
},100);
*/