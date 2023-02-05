/////////////////mb_search.html
/////////////////////
const searchEnd=(el,time)=>{
  el.hide().css('background','#aaa').html('<i class="fa fa-check" style="color:white;"></i> 납부확인');
  el.delay(time).slideDown('fast',()=>{
    el.removeClass('searchEndFlag').off();
  });
}

/////////////////mb_reward.html
/////////////////////
const rewardFind=(el,time)=>{
  el.hide().css('background','#ccc').html('<i class="fa fa-check" style="color:white;"></i> '+$(el).data('membername')+' 계좌확인');
  el.delay(time).slideDown('fast',()=>{
    el.removeClass('rewardFindFlag').off();
    el.next().slideDown();
  });
}
const rewardTransfer=(el,time)=>{
  if(el.css('display')!='none'){
    el.hide().css('background','#ccc').html('<i class="fa fa-check" style="color:white;"></i> 환불완료');
    el.delay(time).slideDown('fast',()=>{
      el.removeClass('rewardTransferFlag').off();
    });
  }
}

/////////////////kb_account.html
/////////////////////
const accountViewList=(data,er)=>{
  let tr='';
  let acno=acnosAry[acnosN].acno;
  if(!er){
    let paymtAbilzBal=data.bzwkIdiviDvsn.paymtAbilzBal;
    paymtAbilzBalTotal=paymtAbilzBalTotal+Number(paymtAbilzBal);
    //alert(JSON.stringify(acnosAry[acnosN]));

    $('#balTotal1').text(nf(paymtAbilzBalTotal));
    $('#balTotal2').text(nf(paymtAbilzBalTotal));
    $('#acCount1').text(acnosN+1);
    $('#acCount2').text(acnosN+1);
    tr='<tr id="tr'+acno+'" style="display:none;">'
      +'	<td>'+acnosAry[acnosN].acDiv+'</td>'
      +'	<td class="b">'+acNoDivider(acno)+'</td>'
      +'	<td class="d-none d-sm-table-cell">'+acnosAry[acnosN].acNewDate+'</td>'
      +'	<td class="d-none d-sm-table-cell">'+acnosAry[acnosN].acMaker+'</td>'
      +'	<td class="d-none d-sm-table-cell">'+acnosAry[acnosN].acLastDate+'</td>'
      +'	<td class="b"><b>'+nf(paymtAbilzBal)+'</b></td>'
      +'	<td><a href="kb_deposit?acno='+acno+'" class="btn btn-d btn-lg table-contents-bt" style="background:#66cc99;"><i class="fa fa-arrow-circle-right" style="color:white;"></i> 조회</a></td>'
      +'</tr>';
  }
  else{
    tr='<tr><td colspan="7" style="text-align:left;"><pre>'+JSON.stringify(data,null,4);+'</pre></td></tr>';
  }
  $('#accountTbody').append(tr);
  $('#tr'+acno).fadeIn();
  acnosN++;
}

/////////////////////
const accountSendAct=(code,ac)=>{
  let data={
    instiEntpNo:'A000000001',
    cmnDvsnBnkCd:'04',
    telgmDstcd:'4000',
    bzwkDstcd:'0200',
    sndrcvDstcd:'1',
    splizTrsmtNotms:'1',
    lnLimt:'',
    srfacBal:'',
    cshTrfamt:'',
    psnckAmt:'',
    cracPrmisNoteAmt:'',
    paymtAbilzBal:'',
    "rspnsCd":'',
    "srfacBalSin":'',
    "paymtAbilBalSin":'',
    idiviDvsnBnkCd:ac.idiviDvsnBnkCd,
    acno:ac.acno
  }
  data.hosts=url;
  data.dt=timeStamp();
  data.code=code;
  data.method='KBK_GBR_0000241S';
  //alert(JSON.stringify(data));return;

  $.ajax({
    dataType:'json',
    data:data,
    url:url,
    method:'get',
    beforeSend:(xhr)=>{
      xhr.setRequestHeader("apiKey",apiKey);
    },
    success:function(rs){
      //console.log(rs);
      console.log(rs.rspData);//return;
      let rspnsCd=StndErrcd=OutData='';
      try{rspnsCd=rs.rspData.outputData.Individual.OutData.telgmCmnDvsn.rspnsCd;}catch(e){}
      try{StndErrcd=rs.rspData.outputData.Common.ErrInfo.StndErrcd;}catch(e){}
      if(rspnsCd=='0000'){
        let OutData=rs.rspData.outputData.Individual.OutData;
        accountViewList(OutData);
      }
      else{
        let Individual=rs.rspData.outputData.Individual;
        //alert('StndErrcd:'+StndErrcd);
        accountViewList(Individual,true);
      }
    }
  });
}

/////////////////kb_card.html
/////////////////////
const cardViewList=(cardList)=>{
  let m=(page-1)*10;
  for(let n in cardList){
    let use=cardList[n];

    m++;
    let term='일시불';
    if(use.athInstTerm>1) term=use.athInstTerm+'개월';
    let tr='<tr id="tr'+m+'" style="display:none;">'
    +'	<td>'+(m)+'</td>'
    +'	<td>'+toDate(use.apvDt)+' '+toTime(use.apvTm)+'</td>'
    +'	<td>'+toCardDiv(use.useCrdno)+'</td>'
    +'	<td class="d-none d-sm-table-cell">'+term+'</td>'
    +'	<td>'+nf(use.apvAmt)+'</td>'
    +'	<td>'+use.mbrMchntNm+'</td>'
    +'	<td class="d-none d-sm-table-cell">'+use.apvNo+'</td>'
    +'</tr>';
    $('#cardTbody').append(tr);
    $('#tr'+m).delay(100*n).fadeIn();

  }
}

/////////////////////
const cardEMkData=()=>{
  page++;

  let bzNo=es($('#bzNo').val());
  let startDate=$('#fromYear').val()+$('#fromMonth').val()+$('#fromDay').val();
  let endDate=$('#toYear').val()+$('#toMonth').val()+$('#toDay').val();
  let inqDscd=$('input[name="cardDiv"]:checked').val();
  let cardNo=$('#cardNo').val();
  cardNo=''||'9410491906946872';
  let requestPage=page;
  let data={
    bzNo:bzNo,//'1018661717',
    startDate:startDate,//'20210101',
    endDate:endDate,//'20211231',
    inqDscd:inqDscd,//'1',
    cardNo:cardNo,//'9410491906946872',
    requestPage:requestPage,//'1',
  };
  //alert(JSON.stringify(data));return;
  cardDateViewer();
  return data;
}

/////////////////////
const cardSendAct=(code,addPage)=>{

  if(!addPage){page=0;$('#cardTbody').html('');}
  else if(addPage && page==0){alert('먼저 상단에서 적당한 조건을 조회하세요.');return;}

  let data=cardEMkData();
  data.hosts=url;
  data.dt=timeStamp();
  data.code=code;
  data.method='KBK_GBR_00001100';
  data.inqDscd='1';
  data.divSeqNo='00001';
  data.tmpResult="Y";
  //console.log(data);
  //alert(JSON.stringify(data));//return;

  $.ajax({
    dataType:'json',
    data:data,
    url:url,
    method:'get',
    beforeSend:(xhr)=>{
      xhr.setRequestHeader("apiKey",apiKey);
    },
    success:function(rs){
      console.log(rs);

      let outputData=rs.rspData.outputData;
      let cardList=[];

      if(outputData.dataHeader.resultCode=='200'){
        cardList=outputData.dataBody._BeginLoop_cardUseDtls;
        cardViewList(cardList);
      }
      else{
        alert('조회된 내역이 없습니다.');
      }
    }
  });
}

/////////////////kb_deposit.html
/////////////////////
const depositViewList=(data,callPos,er)=>{
  let tr='';
  let acno=data.acno;
  if(!er){

    trn=0;
    let wrntHist=data.bzwkIdiviDvsn.wrntHist;
    //alert(wrntHist);
    //alert(JSON.stringify(callPos));
    if(wrntHist) for(let i in wrntHist){
      trn++;
      lowN=((Number(callPos.page)-1)*20)+trn;
      let dt=wrntHist[i];
      let transDate=dt.tranDte.substr(0,4)+'-'+dt.tranDte.substr(4,2)+'-'+dt.tranDte.substr(6,2)
        +' '+dt.tranTtm.substr(0,2)+':'+dt.tranTtm.substr(2,2)+':'+dt.tranTtm.substr(4,2);
      let drwotAmtMnrcvBnk=bankCodes[dt.drwotAmtMnrcvBnkCd]||'';

      tr='<tr id="tr'+lowN+'" style="display:none;">'
        +'<td>'+lowN+'</td>'
        +'<td>'+transDate+'</td>'
        +'<td class="d-none d-sm-table-cell">'+dt.tranDstcd+'</td>'
        +'<td>'+nf(Number(dt.drwotzAmt))+'</td>'
        +'<td>'+nf(Number(dt.mrvamt))+'</td>'
        +'<td>'+nf(Number(dt.bal))+'</td>'
        +'<td>'+dt.tranSumry+'</td>'
        +'<td class="d-none d-sm-table-cell">'+drwotAmtMnrcvBnk+'</td>'
      +'</tr>';
      $('#depositbody').append(tr);
      $('#tr'+lowN).delay(100*i).fadeIn();
      $('#lowN').text(nf(lowN));

    }

  }
  /*else{
    //tr='<tr><td colspan="7" style="text-align:left;"><pre>'+JSON.stringify(data,null,4);+'</pre></td></tr>';
  }*/
}

/////////////////////
const depositMkData=()=>{
  if(!callPos.nextTranSerno){
    callPos={
      nextTranYmd:'',
      nextTranSerno:'00001',
      page:1
    };
    $('#depositbody').html('');
  }
  let bzNo=es($('#bzNo').val());
  let inquryStartYmd=$('#fromYear').val()+$('#fromMonth').val()+$('#fromDay').val();
  let inquryEndYmd=$('#toYear').val()+$('#toMonth').val()+$('#toDay').val();
  let acno=$('#accountNum').val();
  let data={
    instiEntpNo:'A000000001',
    cmnDvsnBnkCd:'04',
    telgmDstcd:'4000',
    bzwkDstcd:'0100',
    sndrcvDstcd:'1',
    splizTrsmtNotms:'1',

    acno:acno,
    inquryStartYmd:inquryStartYmd,
    inquryEndYmd:inquryEndYmd,
    nextTranYmd:callPos.nextTranYmd,
    nextTranSerno:callPos.nextTranSerno,
    inquryRsultCnt:'20'
  }

  depositDateViewer();
  return data;
}

/////////////////////
const depositSendAction=(code)=>{
  let data=depositMkData();
  data.hosts=url;
  data.dt=timeStamp();
  data.code=code;
  data.rspnsCd='';
  data.srfacBalSin='';
  data.paymtAbilBalSin='';
  data.nextHistExstYn='';
  data.inquryRsultTotalCnt='';
  data.method='KBK_GBR_0000141S';
  //alert(JSON.stringify(callPos));//return;

  $.ajax({
    dataType:'json',
    data:data,
    url:url,
    method:'get',
    beforeSend:(xhr)=>{
      xhr.setRequestHeader("apiKey",apiKey);
    },
    success:function(rs){
      //alert(JSON.stringify(rs.rspData.outputData));
      console.log(rs.rspData);
      let rspnsCd=StndErrcd=OutData='';
      try{rspnsCd=rs.rspData.outputData.Individual.OutData.telgmCmnDvsn.rspnsCd;}catch(e){}
      try{StndErrcd=rs.rspData.outputData.Common.ErrInfo.StndErrcd;}catch(e){}
      if(rspnsCd=='0000'){//정상
        let OutData=rs.rspData.outputData.Individual.OutData;
        //alert(JSON.stringify(callPos));
        depositViewList(OutData,callPos);
        if(OutData.bzwkIdiviDvsn.nextTranSerno=='00000'){//추가데이타가 없을 경우
          callPos={};
          $('#plusPageBtn').hide();
        }
        else{//추가데이타가 존재한다.
          callPos={
            nextTranYmd:OutData.bzwkIdiviDvsn.nextTranYmd,
            nextTranSerno:OutData.bzwkIdiviDvsn.nextTranSerno,
            page:callPos.page+1
          };
          $('#plusPageBtn').show();
        }
        //alert(JSON.stringify(callPos));
      }
      else{//에러
        let Individual=rs.rspData.outputData.Individual;
        Indeivdual.acno=data.acno;
        //alert('StndErrcd:'+StndErrcd);
        callPos={};
        depositViewList(Individual,callPos,true);//에러
        $('#plusPageBtn').hide();
      }
    }
  });
}

/////////////////date select
/////////////////////
const setDateSels=(d)=>{
  let fromYearSels='';
  for(let i=Number(d.year);i>=2000;i--){
    fromYearSels+='<option>'+i+'</option>';
  }
  $('#fromYear').html(fromYearSels);
  $('#toYear').html(fromYearSels);

  let fromMonthSels='';
  for(let i=1;i<=12;i++){
    fromMonthSels+='<option>'+String(i).padStart(2,'0')+'</option>';
  }
  $('#fromMonth').html(fromMonthSels);
  $('#toMonth').html(fromMonthSels);

  let fromDaySels='';
  for(let i=1;i<=31;i++){
    fromDaySels+='<option>'+String(i).padStart(2,'0')+'</option>';
  }
  $('#fromDay').html(fromDaySels);
  $('#toDay').html(fromDaySels);
}

/////////////////////
const setDate=(from,to)=>{
  fr=es(from);
  to=es(to);
  $('#fromYear').val(fr.substr(0,4));
  $('#fromMonth').val(fr.substr(4,2));
  $('#fromDay').val(fr.substr(6,2));

  $('#toYear').val(to.substr(0,4));
  $('#toMonth').val(to.substr(4,2));
  $('#toDay').val(to.substr(6,2));
}
const setToday=(d)=>{
  setDate(
    d.today,
    d.today
  );
}
const cardDateViewer=()=>{
  let period=$('#fromYear').val()
  +'-'+ $('#fromMonth').val()
  +'-'+ $('#fromDay').val()
  +' ~ '+ $('#toYear').val()
  +'-'+ $('#toMonth').val()
  +'-'+ $('#toDay').val();
  //alert(period);
  
  $('#periodView').text(period);
}

const depositDateViewer=()=>{
  $('#searchInfo').hide();

  let period=$('#fromYear').val()
  +'-'+ $('#fromMonth').val()
  +'-'+ $('#fromDay').val()
  +' ~ '+ $('#toYear').val()
  +'-'+ $('#toMonth').val()
  +'-'+ $('#toDay').val();
  //alert(period);
  let actTime=mkDate();
  //alert(actTime.todayFullHan);
  
  $('#periodView').text(period);
  $('#actTimeView').text(actTime.todayFullHan).show();
  $('#accountNumView').text($('#accountNum option:selected').text());
  $('#searchInfo').slideDown();
}

/////////////////extra
/////////////////////
const acnosSels=(acnos)=>{
  let opts='';
  if(typeof acnos==='object') for(let ac in acnos){
    let dt=acnos[ac];
    opts+='<option value="'+dt.acno+'">'+acNoDivider(dt.acno)+'</option>';
    //alert(JSON.stringify(dt));
  }
  $('#accountNum').html(opts);
}

/////////////////////
const banksSels=(bankCodes)=>{
  let opts='';
  if(typeof bankCodes==='object') for(let bankNo in bankCodes){
    let bankName=bankCodes[bankNo];
    opts+='<option value="'+bankNo+'">'+bankNo+':'+bankName+'</option>';
    //alert(JSON.stringify(dt));
  }
  $('#bankName').html(opts);
}

/////////////////////
const addTransAmt=(amt)=>{
  let amtNow=Number(es($('#transAmt').val()));
  let amtNew=amtNow+Number(es(amt));
  $('#transAmt').val(nf(String(amtNew)));
}

//$('body').html('<p style="padding:25px;font-size:30px;text-align:center;">서버 업데이트 중. (30분 소요예정)</p>');