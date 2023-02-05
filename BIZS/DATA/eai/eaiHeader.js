const ut=require('../ut.js');
const KB_EAI_COMMON=require('./eaiCommon');


class KB_EAI {

  // 업무코드
  #ApplicationCd='';
  // cics트랜잭션코드
  #StndCicsTrncd='';
  // eai 인터페이스 코드
  #EaiInterfaceCd = '';
  // 그룹사코드
  #StndTranPGroupCoCd='KB0';  
  // 전문수신거래코드
  #StndTelgmRecvTranCd='';
  // 날짜 {StndTranBaseMilli,StndTranBaseYmd,StndTranBaseHms, ....}
  #DateObj = {};    
  // GUID번호
  #StndGuIdNo='';
  //내부표준전문길이
  #StndIntnlStndTelgmLen = '';

  ///////////////////////////////////////////////

  // 공통부
  #Common = {};

  // 인데이터
  #InData = {};

  ///////////////////////////////////////////////

  constructor(applicationCd, stndCicsTrncd, eaiInterfaceCd, eai_InDataObj, mN) {
    this.#ApplicationCd = applicationCd;
    this.#StndCicsTrncd = stndCicsTrncd;
    this.#EaiInterfaceCd = eaiInterfaceCd;    
    this.#InData = eai_InDataObj;

    this.#DataSetUp(mN);
  }

  #DataSetUp(mN) {
    this.#DateObj=ut.mkDate();

    // 전문수신거래코드
    this.#StndTelgmRecvTranCd=this.#EaiInterfaceCd;
    // GUID번호
    this.#StndGuIdNo=this.#StndTranPGroupCoCd+this.#StndTelgmRecvTranCd+this.#DateObj.StndTranBaseMilli+ut.reNumber(mN);
  
    this.#Common = new KB_EAI_COMMON(this.#ApplicationCd, this.#StndCicsTrncd, this.#EaiInterfaceCd, this.#StndGuIdNo, this.#DateObj);      

    let CommonStr=JSON.stringify(this.#Common.EaiData);
    this.#StndIntnlStndTelgmLen=ut.lenByte(CommonStr);
  }

  get EaiData() {
    // 인데이터 공통 : 400
    let InDataCommon = "01"
                      + String("").padEnd(20,' ')
                      + String("").padEnd(36,' ') 
                      + "0" 
                      + String("").padEnd(341,' ');

    // EAI 전문 데이터 셋업
    let data = {
      // 헤더부
      "Header":{
        "StndCicsTrncd": this.#StndCicsTrncd, //CICS트랜젝션코드	코드4	PIC X(004)	4
        "StndIntnlStndTelgmLen": this.#StndIntnlStndTelgmLen, //내부표준전문길이	길이9	PIC 9(009)	9
        "StndTranBaseYmd": this.#DateObj.StndTranBaseYmd, //거래입력년월일	년월일8	PIC X(008)	8
        "StndGuIdNo": this.#StndGuIdNo, //GUID번호	번호36	PIC X(036)	36
        "StndTelgmDmndDstcd": "S", //전문요청구분코드	구분코드1	PIC X(001)	1
        "StndTelgmFmatDstcd": " ", //전문형식구분코드	구분코드1	PIC X(001)	1
        "StndTelgmValdYmd": "99991231", //전문유효년월일	년월일8	PIC X(008)	8
        "StndTelgmVsnno": "200", //전문버전번호	번호3	PIC X(003)	3
        "StndGnrzToutCrtcNmvl": 30, //총괄타임아웃임계치수	수3	PIC 9(003)	3
        "StndSysidName": " ", //SYSID명	명4	PIC X(004)	4
        "StndOgtranRChnlDstcd":"  ", //원거래중계채널구분코드	구분코드2	PIC X(002)	2
        "StndPrcssTCicsTrncd": this.#StndCicsTrncd, //처리대상CICS트랜젝션코드	코드4	PIC X(004)	4
        "StndTranPGroupCoCd": this.#StndTranPGroupCoCd, //거래처리그룹회사코드	코드3	PIC X(003)	3
        "StndIscSendSysid": null, //////////////////////////
        "StndHdrSpareArea": " " //예비AREA		PIC X(014)	14
      },
      // 공통부
      "Common": this.#Common.EaiData,
      // 인데이터
      "Individual": {
        "InDataCommon": InDataCommon,
        "InData": this.#InData
      }
    };

    return data;
  }
}

module.exports=KB_EAI;