const ut=require('../ut.js');

class KB_EAI_COMMON {

  // 업무코드
  #ApplicationCd='';
  // cics트랜잭션코드
  #StndCicsTrncd='';
  // 그룹사코드
  #StndTranPGroupCoCd='KB0';

  // 전문수신거래코드
  #StndTelgmRecvTranCd='';
  // 처리결과전문수신거래코드
  #StndPrcssRtdTranCd='';

  // 시스템운영환경구분코드
  #StndSysOperEvirnDstcd = "D";
  // 원거래GUID번호
  #StndOgtranGuIdNo='';
  // 
  #StndInptMsgWritYms='';
  #StndIntfacSendTranCd='';
  #StndSendEaiSvcName='';

  // eai - 공통부
  #Common = {};

  constructor(applicationCd, stndCicsTrncd, eaiInterfaceCd, stndGuIdNo, dataObj) {
    this.#ApplicationCd = applicationCd;
    this.#StndCicsTrncd = stndCicsTrncd;
    this.#StndTelgmRecvTranCd=eaiInterfaceCd;
    this.#StndOgtranGuIdNo=stndGuIdNo;
    this.#StndInptMsgWritYms=dataObj.StndTranBaseMilli+'000';

    this.#StndPrcssRtdTranCd=this.#StndCicsTrncd+this.#ApplicationCd;
    this.#StndIntfacSendTranCd=this.#StndTelgmRecvTranCd;
    this.#StndSendEaiSvcName=this.#StndTelgmRecvTranCd+this.#ApplicationCd;

    this.#DataSetUp();
  }

  #DataSetUp() {
    // 공통부
    this.#Common={
      // 거래정보
      "TranInfo":{
        "StndGroupCoCd":this.#StndTranPGroupCoCd, //그룹회사코드	코드3	PIC X(003)	3
        "StndTelgmRecvTranCd":String(this.#StndTelgmRecvTranCd).padEnd(15,' '),//StndTelgmRecvTranCd, //전문수신거래코드	코드15	PIC X(015)	15
        "StndPrcssRtdTranCd":String(this.#StndPrcssRtdTranCd).padEnd(15,' '),//StndPrcssRtdTranCd, //처리결과전문수신거래코드	코드15	PIC X(015)	15 //CICS트랜코드4자리+응답시전문거래코드
        "StndScrenNo":String("").padEnd(11,' '), //화면번호	번호11	PIC X(011)	11
        "StndOsidInstiCd":String("").padEnd(12,' '), //STND-OSID-INSTI-CD	대외기관코드	코드12	PIC X(012)	12
        "StndTranSerno":String("").padEnd(12,' '),  //거래일련번호	일련번호12	PIC 9(012)	12
        "StndInoPartlDstcd":"1", //인터페이스시스템구분코드	구분코드1	PIC X(001)	1
        "StndCmpxTranDmndDstcd":"0", //복합거래요청구분코드	구분코드1	PIC X(001)	1
        "StndSysOperEvirnDstcd":this.#StndSysOperEvirnDstcd, //시스템운영환경구분코드	구분코드1	PIC X(001)	1
        "StndItsmMoniTagetYn":" ", //ITSM모니터링대상여부	여부	PIC X(001)	1
        "StndTranPtrnDstcd":"1", //거래유형구분코드	구분코드1	PIC X(001)	1
        "StndRbndTranYn":"0", //리바운드거래여부	여부	PIC X(001)	1
        "StndTermlWaitRqstYn":" ", //단말대기요구여부	여부	PIC X(001)	1
        "StndOgtranRstrYn":" ", //원거래복원여부	여부	PIC X(001)	1
        "StndOgtranGuIdNo":this.#StndOgtranGuIdNo //원거래GUID번호	번호36	PIC X(036)	36
      },
      // 채널정보
      "ChnlInfo":{
        "StndBnkCd":"004", //은행코드	은행코드3	PIC X(003)	3
        "StndTranBrncd":"0749", //거래부점코드	부점코드4	PIC X(004)	4
        "StndFeePrcssBrncd": String("").padEnd(4,' '), //수수료처리부점코드	부점코드4	PIC X(004)	4
        "StndRelayChnlDstcd":"02", //중계채널구분코드	구분코드2	PIC X(002)	2
        "StndChnlDstcd":"03", //채널구분코드	구분코드2	PIC X(002)	2
        "StndChnlDBzwkDstcd":"AQ", //채널세부업무구분코드	구분코드2	PIC X(002)	2
        "StndMdiaDstcd":"00", //매체구분코드	구분코드2	PIC X(002)	2
        "StndLangDstcd":"KOR", //언어구분코드	구분코드3	PIC X(003)	3
        "StndTrmno":"CUS", //단말번호	단말번호3	PIC X(003)	3
        "StndUserEmpid":"C900133", //추후 직원번호 발급요망 //사용자직원번호	직원번호7	PIC X(007)	7
        "StndTermlOprtrno":"  ", //단말조작자번호	조작자번호2	PIC X(002)	2
        "StndTermlSpvsrNo":"  ", //단말책임자번호	책임자번호2	PIC X(002)	2
        "StndN1StSpvsrBrncd":"    ", //1차책임자부점코드	부점코드4	PIC X(004)	4
        "StndN2NdSpvsrBrncd":"    ", //2차책임자부점코드	부점코드4	PIC X(004)	4
        "StndN2NdSpvsrTrmno":"   " //2차책임자단말번호	단말번호3	PIC X(003)	3
      },
      // 입력메시지 정보
      "InMsgInfo":{
        "StndInptMsgPtrnDstcd":"11", //입력메시지유형구분코드	구분코드2	PIC X(002)	2
        "StndInptMsgCtnnYn":"0", //입력메시지계속여부	여부	PIC X(001)	1
        "StndInptMsgSerno":"000", //입력메시지일련번호	일련번호3	PIC 9(003)	3
        "StndInptMsgWritYms":this.#StndInptMsgWritYms //"2021 06 22 15 36 21 604 000" //입력메시지작성일시	일시20	PIC X(020)	20
      },
      // 승인정보
      "AthorInfo":{
        "StndAthorFnshDstcd":"0", //승인완료구분코드	구분코드1	PIC X(001)	1
        "StndSpvsrAthorDstcd":"0", //책임자승인구분코드	구분코드1	PIC X(001)	1
        "StndN1StSpvsrEmpid":String("").padEnd(7,' '), //1차책임자직원번호	직원번호7	PIC X(007)	7
        "StndN2NdSpvsrEmpid":String("").padEnd(7,' '), //2차책임자직원번호	직원번호7	PIC X(007)	7
        "StndSpvsrAResnNoitm":0, //책임자승인사유건수	건수3	PIC 9(002)	2
        "StndSpvsrAthorResnCd_1":"", //책임자승인사유코드	코드8	PIC X(008)	8
        "StndSpvsrAthorResnCd_2":"",
        "StndSpvsrAthorResnCd_3":"",
        "StndSpvsrAthorResnCd_4":"",
        "StndSpvsrAthorResnCd_5":"",
        "StndSpvsrAthorResnCd_6":"",
        "StndSpvsrAthorResnCd_7":"",
        "StndSpvsrAthorResnCd_8":"",
        "StndSpvsrAthorResnCd_9":"",
        "StndSpvsrAthorResnCd_10":""
      },
      // 전행 업무 공통
      "EntrBnkBzwkCmn":{
        "StndClsngAfYn":"0", //마감후여부	여부	PIC X(001)	1
        "StndLsdtTranYn":" ", //전일자거래여부	여부	PIC X(001)	1
        "StndIdtrek":String("").padEnd(8,' '), //카드거래처리년월일	년월일8	PIC X(008)	8
        "StndBzoprDdDstcd":" ", //영업일구분코드	구분코드1	PIC X(001)	1
        "StndSodBbrnPtrnDstcd":String("").padEnd(3,' '), //SOD영업점유형구분코드	구분코드3	PIC X(003)	3
        "StndSodUserPtrnDstcd":String("").padEnd(2,' '), //SOD사용자유형구분코드	구분코드2	PIC X(002)	2
        "StndInotAbilYn":" ", //입출가능여부	여부	PIC X(001)	1
        "StndNoRtaUserYn":" ", //무자원대체가능사용자여부	여부	PIC X(001)	1
        "StndTranDscnDmndYn":" ", //거래중단요청여부	여부	PIC X(001)	1
        "StndCallgPgmName":String("").padEnd(8,' '), //호출프로그램명	명8	PIC X(008)	8
        "StndRecvLuName":String("").padEnd(8,' '), //수신LU명	명8	PIC X(008)	8
        "StndCnclDstcd":"0", //취소구분코드	구분코드1	PIC X(001)	1
        "StndCnclPtrnDstcd":"0", //취소유형구분코드	구분코드1	PIC X(001)	1
        "StndTranCcResnDstcd":"  ", //거래취소정정사유구분코드	구분코드2	PIC X(002)	2
        "StndTranCcResnCtnt":String("").padEnd(30,' '), //거래취소정정사유내용	내용S30	PIC X(030)	30
        "StndOgtranYms":String("").padEnd(20,' '), //원거래일시	일시14	PIC X(020)	20
        "StndCnclRstrInfoCtnt":String("").padEnd(80,' '), //취소복원정보내용	내용S80	PIC X(080)	80
        "StndDscnTranDstcd":" ", //중단거래구분코드	구분코드1	PIC X(001)	1
        "StndIdiviDataEdtYn":" ", //개별데이터편집여부	여부	PIC X(001)	1
        "StndOpbrnCd":String("").padEnd(4,' '), //개설부점코드	부점코드4	PIC X(004)	4
        "StndCncutIScopAddr":String("").padEnd(4,' ') //센터컷인터페이스영역주소	주소4	PIC X(004)	4
      },
      // 출력 메시지
      "OutMsgInfo":{
        "StndOutptDPtrnDstcd":"01", //출력데이터유형구분코드	구분코드2	PIC X(002)	2
        "StndOutptMsgPtrnDstcd":"  ", //출력메시지유형구분코드	구분코드2	PIC X(002)	2
        "StndOutptMsgCtnnYn": " ", //출력메시지계속여부	여부	PIC X(001)	1
        "StndOutptMsgSerno":0, //출력메시지일련번호	일련번호3	PIC 9(003)	3
        "StndOutptMsgWritYms":String("").padEnd(20,' '), //출력메시지작성일시	일시20	PIC X(020)	20
        "StndUserPaNotacrdYn": " "
        ////////////////STND-BRN-CLSNG-YN	부점마감여부	여부	PIC X(001)	1
      },
      // 에러정보
      "ErrInfo":{
        "StndErrcd":String("").padEnd(8,' '), //에러코드	코드8	PIC X(008)	8
        "StndTreatCd":String("").padEnd(8,' '), //조치코드	코드8	PIC X(008)	8
        "StndCncutDscnRqstYn":" " //센터컷중단요구여부	여부	PIC X(001)	1
      },
      // 추가정보
      "SpareArea":{
        "StndFworkCiScopAddr":" ", //프레임워크제어정보영역주소	주소4	PIC X(004)	4
        "StndIntfacSendTranCd": String(this.#StndIntfacSendTranCd).padEnd(15,' '),//"BFA71CS2R0", //인터페이스송신거래코드	코드15	PIC X(015)	15
        "StndCnclEcludYn":" ", //취소제외여부	여부	PIC X(001)	1
        "StndTrsmtRqstId":String("").padEnd(8,' '),//"NS027600", //전송요구ID	ID8	PIC X(008)	8
        "StndCnclAbilYn":" ", //취소가능여부	여부	PIC X(001)	1
        "StndOutptMdiaEdtNo":"  ", //출력매체편집번호	번호2	PIC X(002)	2
        "StndAtmCshRetunDstcd":" ", //자동화기기현금반환구분코드	구분코드1	PIC X(001)	1
        "StndSendEaiSvcName":this.#StndSendEaiSvcName,//"KGR040S241KGR",//"BNC71900R3BFA", //송신EAI서비스명	명14	PIC X(016)	16
        "StndLuSndrcvTypDstcd":" ", //LU송수신타입구분	구분코드1	PIC X(001)	1
        "StndDteCAllowTranYn":" ", //일자전환허용거래	여부	PIC X(001)	1
        "StndIpAddr": " ",
        "StndChcmnLen": "0000",
        "StndMsgChnlDstcd": "83",
        "StndCnterDstcd": " ",
        "StndComSpareArea": String("").padEnd(9,' '),
        "StndTestCasId": String("").padEnd(7,' '),
        "StndInptMdiaPartlLen": "0400"
      }
    };    
  }

  get EaiData() {
    return this.#Common;
  }
}

module.exports=KB_EAI_COMMON;