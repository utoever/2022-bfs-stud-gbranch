////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
//const watcher=require(process.rootDir+'DATA/watcher.js');
//const mths=require(process.rootDir+'DATA/mths.js').callMth();
const KB_EAI = require(process.rootDir+'DATA/eai/eaiHeader.js');

const conf=process.cfg.conf;
const apps=process.cfg.apps;

//Object.assign(apps.gate,apps.mach[apps.gate.machName]);//apps.gate
for(let method in apps.bizs){//apps.bizs
  let biz=apps.bizs[method];
  Object.assign(apps.bizs[method],apps.mach[apps.bizs[method].machName]);
}

///////////////////////////////////설정모듈
//const callSch=require('./callSch.js');
const callTsoc=require('./callTsoc.js');//tcp socket

///////////////////////////////////일반모듈
const querystring=require('querystring');

///////////////////////////////////기본설정
//const in0Dir=conf.dirs.in0Dir;
//const ot0Dir=conf.dirs.ot0Dir;

///////////////////////////////////
class bizMethod{

  dataMake(bData, mN){

    // 인데이터 정보
    const InData={            
        "inquryDstic": "6",
        "acno": "",
        "acnPwdValdnYn": "",
        "acnPwd": "",
        "custIdnfr": "",
        "ssno": "",
        "strLvBnkLginID": "",
        "strCnifInquryDstic": "2",
        "strBrdtValdnDstic": "",
        "strBrdt": "",
        "strGndr": "",
        "strCnif": bData.cnif,
        "strTelAreaNo": "",
        "strTelNtinNo": "",
        "strTelIdiviNo": ""
    };
    const eaiData = new KB_EAI("BFS","1K3V","KFK120B440", InData, mN);
    
    this.inputData=eaiData.EaiData;
    
    return this.inputData;
  }

  job(fnc, mN){
    if(typeof fnc=='function'){

      let bData=this.bData;

      let host=apps.bizs[bData.method].host;
      bData.lgt.mConTm= + new Date();
      bData.host=host.domain+':'+host.port;

      ///////////////////////////////////

      let inputData=this.dataMake(bData, mN);
      //let StndGuIdNo=inputData.Header.StndGuIdNo;
      let veri=[];
      //let sc={};
      //console.log('this.inputData',this.inputData);

      /////////////////
      //const sch=mths[bData.method];
      //console.log('sch',sch);
      //console.log('sch.schema',sch.schema);
      /*
      if(sch.schema){
        sc=new callSch(sch.schema);//sc.view();//해당 메소드의 스키마를 불러온다.
        Object.assign(testData,this.inputData);
        veri=sc.veriAll(testData);
      }
      else{
        veri=[false,[false,'schema file error']];
      }
      */
      //console.log(veri);//주어진 모든 값을 검사하여 결과를 반환한다.

      //if(!veri[0]){//입력값 검증 실패
      if(false) {
        this.inputData.error=veri[1];
        //fnc(bData);
        fnc({
          flag:false,
          msg:{
            "code": "1900",
            "str": "value verification failed",
          },
          error:veri[1],
          customData:this.inputData,
          inputData:this.inputData,
          outputData:this.inputData
        });
      }
      else{//입력값 검증 정상

        //let {StndTranBaseMilli}=ut.mkDate();
        //let dayIn0Dir=in0Dir+StndTranBaseMilli.substr(0,10)+'/';
        //ut.dirMake(dayIn0Dir);
        //let dayOt0Dir=ot0Dir+StndTranBaseMilli.substr(0,10)+'/';
        //ut.dirMake(dayOt0Dir);

        let target={
          hostname:host.domain,
          host:host.ip,
          path:host.path/*+'?'+querystring.stringify(this.inputData)*/,
          port:host.port,
          method:host.method,//POST/GET
          proto:host.proto,//https/http
        };
        //console.log('target',target);

        /////////////////
        //let inLogFile=dayIn0Dir+bData.method+'--'+bData.lgt.mConTm+'_'+bData.key+'_I.json';
        //this.inputData.inLog=inLogFile
        //ut.logger(inLogFile,JSON.stringify(this.inputData,null,2));


        /////////////////
        /////////////////
        /////////////////

        let dataStr=JSON.stringify(this.inputData);
        let InputStrStart=String(ut.lenByte(dataStr)).padStart(5,'0');
        let SendingStr=InputStrStart+dataStr;

        //console.log('sending Data ::', SendingStr);

        callTsoc.con(target,SendingStr,(rsMsg)=>{
          //console.log('recv client Msg :: ',rsMsg);

          let customData=bData;
          bData.host=host;
          bData.apiKey='XXXXXXXXXXXXXXXXXXXXXXXXXXXX';
          let msg={};
          let flag=false;
          let codeHost='';
          let treatCdHost='';
          
          let outputData={};
          let ErrInfo={};

          try{
            let recvData = rsMsg.toString().substr(5);
            outputData=JSON.parse(recvData);
            
            ErrInfo=outputData.Common.ErrInfo;
            codeHost=ErrInfo.StndErrcd;
            treatCdHost=ErrInfo.StndTreatCd;
          }catch(e){
            console.error(e);
          }

          if(codeHost=='N0000000'||codeHost==''||codeHost.startsWith('N')){
            flag=true;
            msg={
              code:'1000',
              message:'success from host',
              codeHost:codeHost,
              treatCdHost:treatCdHost
            };
          }
          else if(!codeHost){
            msg={
              code:'9100',
              message:'unexpected result from host',
              codeHost:codeHost,
              treatCdHost:treatCdHost
            };
          }
          else{
            msg={
              code:'9900',
              message:'no result from host',
              codeHost:codeHost,
              treatCdHost:treatCdHost
            };
          }

          bData.lgt.mRetTm= + new Date();

          /////////////////
          /*if(rsMsg.length>=30){
            //ND_METH_TEST4--1646639091648_LNPe2TKqA38pLecvKzlw_O.json
            let outLogFile=dayOt0Dir+bData.method+'--'+bData.lgt.mRetTm+'_'+bData.key+'_O.json';
            outputData.outLog=this.inputData.outLog=outLogFile;
            //ut.logger(outLogFile,JSON.stringify(outputData,null,2));
            //ut.fileDelete(inLogFile);
          }*/

          // 응답 데이터 셋팅
          let outJson = {};
          outJson = msg;
          outJson['method'] = customData.method;
          outJson['StndTranBaseYmd'] = customData.StndTranBaseYmd;
          outJson['conDateTime'] = customData.conDateTime;
          outJson['cConTm'] = customData.cConTm;          
          if(outputData.Individual.OutData) {
            outJson.OutData = outputData.Individual.OutData;
          }

          let rsData={
            flag:flag,
            msg:msg,
            customData:customData,
            inputData:this.inputData,
            outputData:outputData,
            outJson: outJson
          };
          //console.log('rsData ::', rsData);

          fnc(rsData);

        }, 5);

      }

      /////////////////

    }
  }

  constructor(bData){
    this.bData=bData;
    this.inputData={};
    this.sch={};
  }

}

module.exports=bizMethod;