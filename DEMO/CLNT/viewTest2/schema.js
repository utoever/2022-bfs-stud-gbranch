const schemas={

  ///////////////////////
  KBK_GBR_0000111A:{//KGR010S111_당타행이체거래요청
    MethodComName:{key:"KGR010S111",note:"당타행이체거래요청",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:0,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    drwotAcno:{key:"drwotAcno",note:"출금계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:3},
    drwotAcnPwd:{key:"drwotAcnPwd",note:"출금계좌비밀번호",type:"cha",max:36,min:0,source:"PIC X(n)",depth:3},
    mnrcvBnkCd:{key:"mnrcvBnkCd",note:"입금은행코드",type:"cha",max:3,min:0,source:"PIC X(n)",depth:3},
    mnrcvAcno:{key:"mnrcvAcno",note:"입금계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:3},
    trsaccAmt:{key:"trsaccAmt",note:"이체금액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    rqstrFname:{key:"rqstrFname",note:"의뢰인성명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:3},
    draweFname:{key:"draweFname",note:"수취인성명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:3},
    mnrcvSumry:{key:"mnrcvSumry",note:"입금적요",type:"cha",max:22,min:0,source:"PIC X(n)",depth:3},
    drwotSumry:{key:"drwotSumry",note:"출금적요",type:"cha",max:22,min:0,source:"PIC X(n)",depth:3},
    tranCnclDstcd:{key:"tranCnclDstcd",note:"거래취소구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    mnrcvPtrnDstcd:{key:"mnrcvPtrnDstcd",note:"입금유형구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    fnbbTelgmNo:{key:"fnbbTelgmNo",note:"공동망전문번호",type:"cha",max:13,min:0,source:"PIC X(n)",depth:3},
    prcssRsultCtnt:{key:"prcssRsultCtnt",note:"처리결과내용",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},
    fndsChatrDstcd:{key:"fndsChatrDstcd",note:"자금성격구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    cMSMgtNo:{key:"cMSMgtNo",note:"CMS관리번호",type:"cha",max:16,min:0,source:"PIC X(n)",depth:3}
  },

  ///////////////////////
  KBK_GBR_0000121S:{//KGR020S121_대량이체모계좌출금요청
    MethodComName:{key:"KGR020S121",note:"대량이체모계좌출금요청",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:0,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    drwotAcno:{key:"drwotAcno",note:"출금계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:3},
    drwotAcnPwd:{key:"drwotAcnPwd",note:"출금계좌비밀번호",type:"cha",max:36,min:0,source:"PIC X(n)",depth:3},
    rqstNoitm:{key:"rqstNoitm",note:"총의뢰건수",type:"int",max:11,min:0,source:"PIC 9(n)",depth:3},
    rqstAmt:{key:"rqstAmt",note:"총의뢰금액",type:"int",max:15,min:0,source:"PIC 9(n)",depth:3},
    drwotSumry:{key:"drwotSumry",note:"출금적요",type:"cha",max:22,min:0,source:"PIC X(n)",depth:3},
    rqstrFname:{key:"rqstrFname",note:"의뢰인성명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:3},
    fndsChatrDstcd:{key:"fndsChatrDstcd",note:"자금성격구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    drwotAfBalSin:{key:"drwotAfBalSin",note:"출금후잔액부호",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    drwotAfBal:{key:"drwotAfBal",note:"출금후잔액",type:"int",max:15,min:0,source:"PIC 9(n)",depth:3},
    lagqtyTrsaccNth:{key:"lagqtyTrsaccNth",note:"대량이체 회차",type:"int",max:5,min:0,source:"PIC 9(n)",depth:3},
    lagqtyTrsaccBzwkDstic:{key:"lagqtyTrsaccBzwkDstic",note:"대량이체 업무구분",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    spare:{key:"spare",note:"예비",type:"cha",max:218,min:0,source:"PIC X(n)",depth:3}
  },

  ///////////////////////
  KBK_GBR_0000141S:{//KGR040S141_계좌거래내역조회
    MethodComName:{key:"KGR040S141",note:"계좌거래내역조회",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:0,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    acno:{key:"acno",note:"계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:3},
    inquryStartYmd:{key:"inquryStartYmd",note:"조회시작년월일",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    inquryEndYmd:{key:"inquryEndYmd",note:"조회종료년월일",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    nextHistExstYn:{key:"nextHistExstYn",note:"다음내역존재여부",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    nextTranYmd:{key:"nextTranYmd",note:"다음거래년월일",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    nextTranSerno:{key:"nextTranSerno",note:"다음거래일련번호",type:"cha",max:5,min:0,source:"PIC X(n)",depth:3},
    inquryRsultTotalCnt:{key:"inquryRsultTotalCnt",note:"조회결과총개수",type:"cha",max:5,min:0,source:"PIC X(n)",depth:3},
    inquryRsultCnt:{key:"inquryRsultCnt",note:"조회결과개수",type:"int",max:2,min:0,source:"Integer",depth:3},
    idiviDvsnSpareScop:{key:"idiviDvsnSpareScop",note:"개별부예비영역",type:"cha",max:47,min:0,source:"PIC X(n)",depth:3},

    wrntHist:{key:"wrntHist",note:"거래내역",type:"div",depth:3},

    inquryRsultSerno:{key:"inquryRsultSerno",note:"조회결과일련번호",type:"cha",max:5,min:0,source:"PIC X(n)",depth:4},
    tranDte:{key:"tranDte",note:"거래일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:4},
    tranTtm:{key:"tranTtm",note:"거래시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:4},
    tranDstcd:{key:"tranDstcd",note:"거래구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:4},
    tranDstcdVal:{key:"tranDstcdVal",note:"거래구분코드값",type:"cha",max:20,min:0,source:"PIC X(n)",depth:4},
    drwotzAmt:{key:"drwotzAmt",note:"출금금액",type:"cha",max:14,min:0,source:"PIC X(n)",depth:4},
    drwotAmtMnrcvBnkCd:{key:"drwotAmtMnrcvBnkCd",note:"출금금액입금은행코드",type:"cha",max:3,min:0,source:"PIC X(n)",depth:4},
    drwotAmtMnrcvAcno:{key:"drwotAmtMnrcvAcno",note:"출금금액입금계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:4},
    drwotAmtMnrcvDpstrName:{key:"drwotAmtMnrcvDpstrName",note:"출금금액입금예금주명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:4},
    mrvamt:{key:"mrvamt",note:"입금금액",type:"cha",max:14,min:0,source:"PIC X(n)",depth:4},
    mrvamtDrwotDpstrName:{key:"mrvamtDrwotDpstrName",note:"입금금액출금예금주명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:4},
    balSin:{key:"balSin",note:"잔액부호",type:"cha",max:1,min:0,source:"PIC X(n)",depth:4},
    bal:{key:"bal",note:"잔액",type:"cha",max:14,min:0,source:"PIC X(n)",depth:4},
    tranSumry:{key:"tranSumry",note:"거래적요",type:"cha",max:40,min:0,source:"PIC X(n)",depth:4}
  },

  ///////////////////////
  KBK_GBR_0000241S:{//KGR040S241_계좌잔액조회
    MethodComName:{key:"KGR040S241",note:"계좌잔액조회",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:1,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:2,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:4,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:4,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:1,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:1,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:8,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:8,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:6,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    idiviDvsnBnkCd:{key:"idiviDvsnBnkCd",note:"개별부은행코드",type:"cha",max:3,min:0,source:"PIC X(n)",depth:3},
    acno:{key:"acno",note:"계좌번호",type:"cha",max:20,min:10,source:"PIC X(n)",depth:3},
    lnLimt:{key:"lnLimt",note:"대출한도",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    srfacBalSin:{key:"srfacBalSin",note:"표면잔액부호",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    srfacBal:{key:"srfacBal",note:"표면잔액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    cshTrfamt:{key:"cshTrfamt",note:"현금대체금액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    psnckAmt:{key:"psnckAmt",note:"가계수표금액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    cracPrmisNoteAmt:{key:"cracPrmisNoteAmt",note:"당좌약속어음금액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    paymtAbilBalSin:{key:"paymtAbilBalSin",note:"지불가능잔액부호",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    paymtAbilzBal:{key:"paymtAbilzBal",note:"지불가능잔액",type:"inp",max:15,min:15,source:"BigDecimal",depth:3},
    idiviDvsnSpareScop:{key:"idiviDvsnSpareScop",note:"개별부예비영역",type:"cha",max:216,min:0,source:"PIC X(n)",depth:3}
  },

  ///////////////////////
  KBK_GBR_0000341A:{//KGR040S341_예금주성명조회요청
    MethodComName:{key:"KGR040S341",note:"예금주성명조회요청",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:0,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    mnrcvBnkCd:{key:"mnrcvBnkCd",note:"입금은행코드",type:"cha",max:3,min:0,source:"PIC X(n)",depth:3},
    mnrcvAcno:{key:"mnrcvAcno",note:"입금계좌번호",type:"cha",max:20,min:0,source:"PIC X(n)",depth:3},
    dpstrFname:{key:"dpstrFname",note:"예금주성명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:3},
    mrvamt:{key:"mrvamt",note:"입금금액",type:"cha",max:15,min:15,source:"BigDecimal",depth:3},
    inhabBzno:{key:"inhabBzno",note:"주민사업자번호",type:"cha",max:13,min:0,source:"PIC X(n)",depth:3},
    inquryAfDpstrFname:{key:"inquryAfDpstrFname",note:"조회후예금주성명",type:"cha",max:40,min:0,source:"PIC X(n)",depth:3},
    prcssRsultCtnt:{key:"prcssRsultCtnt",note:"처리결과내용",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},
    fndsChatrDstcd:{key:"fndsChatrDstcd",note:"자금성격구분코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3}
  },

  ///////////////////////
  KBK_GBR_0000541S:{//KGR040S541_이체처리결과조회
    MethodComName:{key:"KGR040S541",note:"이체처리결과조회",type:"div",depth:0},

    InData:{key:"InData",note:"입력데이터",type:"div",depth:1},
    telgmCmnDvsn:{key:"telgmCmnDvsn",note:"전문공통부",type:"div",depth:2},

    instiEntpNo:{key:"instiEntpNo",note:"기관업체번호",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnBnkCd:{key:"cmnDvsnBnkCd",note:"공통부은행코드",type:"cha",max:2,min:0,source:"PIC X(n)",depth:3},
    telgmDstcd:{key:"telgmDstcd",note:"전문구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    bzwkDstcd:{key:"bzwkDstcd",note:"업무구분코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    sndrcvDstcd:{key:"sndrcvDstcd",note:"송수신구분",type:"cha",max:1,min:0,source:"PIC X(n)",depth:3},
    splizTrsmtNotms:{key:"splizTrsmtNotms",note:"전문전송횟수",type:"int",max:1,min:0,source:"PIC 9(n)",depth:3},
    intnlApiTelgmNo:{key:"intnlApiTelgmNo",note:"내부API전문번호",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtDte:{key:"trsmtDte",note:"전송일자",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    trsmtTtm:{key:"trsmtTtm",note:"전송시간",type:"cha",max:6,min:0,source:"PIC X(n)",depth:3},
    rspnsCd:{key:"rspnsCd",note:"응답코드",type:"cha",max:4,min:0,source:"PIC X(n)",depth:3},
    entpScop:{key:"entpScop",note:"업체영역",type:"cha",max:11,min:0,source:"PIC X(n)",depth:3},
    bnkScop:{key:"bnkScop",note:"은행영역",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    cmnDvsnSpareScop:{key:"cmnDvsnSpareScop",note:"공통부예비영역",type:"cha",max:100,min:0,source:"PIC X(n)",depth:3},

    bzwkIdiviDvsn:{key:"bzwkIdiviDvsn",note:"업무개별부",type:"div",depth:2},

    instiEntpNo1:{key:"instiEntpNo1",note:"기관업체번호1",type:"cha",max:10,min:0,source:"PIC X(n)",depth:3},
    tranYmd:{key:"tranYmd",note:"거래년월일",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    intnlApiTelgmNo1:{key:"intnlApiTelgmNo1",note:"내부API전문번호1",type:"cha",max:8,min:0,source:"PIC X(n)",depth:3},
    idiviDvsnSpareScop:{key:"idiviDvsnSpareScop",note:"개별부예비영역",type:"cha",max:216,min:0,source:"PIC X(n)",depth:3}
  },

  ///////////////////////
  KBK_GBR_00001100:{//inqCoApvList_KB국민카드기업카드승인내역조회
    MethodComName:{key:"inqCoApvList",note:"KB국민카드기업카드승인내역조회",type:"div",depth:0},

    dataHeader:{key:"dataHeader",note:"",type:"div",depth:1},

    udId:{key:"udId",note:"단말기 고유ID",type:"cha",max:0,min:0,source:"",depth:2},
    subChannel:{key:"subChannel",note:"채널구분(앱 구분용)",type:"cha",max:0,min:0,source:"",depth:2},
    deviceModel:{key:"deviceModel",note:"단말기 모델명",type:"cha",max:0,min:0,source:"",depth:2},
    deviceOs:{key:"deviceOs",note:"단말기OS명",type:"cha",max:0,min:0,source:"",depth:2},
    carrier:{key:"carrier",note:"캐리어명",type:"cha",max:0,min:0,source:"",depth:2},
    connectionType:{key:"connectionType",note:"연결정보",type:"cha",max:0,min:0,source:"",depth:2},
    appName:{key:"appName",note:"앱이름",type:"cha",max:0,min:0,source:"",depth:2},
    appVersion:{key:"appVersion",note:"앱버전",type:"cha",max:0,min:0,source:"",depth:2},
    scrNo:{key:"scrNo",note:"화면번호",type:"cha",max:0,min:0,source:"CXOXXEECD0004",depth:2},
    scrName:{key:"scrName",note:"기업카드승인내역조회",type:"cha",max:0,min:0,source:"",depth:2},

    dataBody:{key:"dataBody",note:"",type:"div",depth:1},

    bzNo:{key:"bzNo",note:"사업자번호",type:"int",max:10,min:10,source:"1234567890",depth:2},
    startDate:{key:"startDate",note:"시작",type:"int",max:8,min:8,source:"20190906",depth:2},
    endDate:{key:"endDate",note:"종료",type:"int",max:8,min:8,source:"20191205",depth:2},
    inqDscd:{key:"inqDscd",note:"조회구분(1:전체,2:부서별,3:카드별)",type:"int",max:1,min:1,source:"1",depth:2},
    divSeqNo:{key:"divSeqNo",note:"부서별조회일련번호",type:"int",max:5,min:5,source:"00001",depth:2},
    cardNo:{key:"cardNo",note:"카드별조회카드번호",type:"int",max:16,min:16,source:"1234567812345678",depth:2},
    requestPage:{key:"requestPage",note:"조회대상페이지",type:"int",max:0,min:1,source:"1",depth:2},
    tmpResult:{key:"tmpResult",note:"페이징임시데이터",type:"cha",max:1,min:1,source:"Y",depth:2}
  }

};

module.exports=schemas;

//const schemas=require('sch_KBK_GBR.js');//프로젝트 전체의 스키마
//console.log(schemas['KBK_GBR_0000241S']);
//console.log(schemas['KBK_GBR_0000241S'].trsmtDte);



/*
type:{
  cha:"character",//one
  int:"integer",//1
  flt:"float",//1.1
  inp:"character of integer padding 0 from left",//00001
  div:"divison only no data"
}
*/

/*
//KGR010S111_당타행이체거래요청
key	note	type	max	min	source	depth
InData	입력데이터						1
  telgmCmnDvsn	전문공통부						2
    instiEntpNo	기관업체번호	cha	10	0	PIC X(n)	10	3
    cmnDvsnBnkCd	공통부은행코드	cha	2	0	PIC X(n)	2	3
    telgmDstcd	전문구분코드	cha	4	0	PIC X(n)	4	3
    bzwkDstcd	업무구분코드	cha	4	0	PIC X(n)	4	3
    sndrcvDstcd	송수신구분	cha	1	0	PIC X(n)	1	3
    splizTrsmtNotms	전문전송횟수	int	1	0	PIC 9(n)	1	3
    intnlApiTelgmNo	내부API전문번호	cha	8	0	PIC X(n)	8	3
    trsmtDte	전송일자	cha	8	0	PIC X(n)	8	3
    trsmtTtm	전송시간	cha	6	0	PIC X(n)	6	3
    rspnsCd	응답코드	cha	4	0	PIC X(n)	4	3
    entpScop	업체영역	cha	11	0	PIC X(n)	11	3
    bnkScop	은행영역	cha	10	0	PIC X(n)	10	3
    cmnDvsnSpareScop	공통부예비영역	cha	100	0	PIC X(n)	100	3
  bzwkIdiviDvsn	업무개별부						2
    drwotAcno	출금계좌번호	cha	20	0	PIC X(n)	20	3
    drwotAcnPwd	출금계좌비밀번호	cha	36	0	PIC X(n)	36	3
    mnrcvBnkCd	입금은행코드	cha	3	0	PIC X(n)	3	3
    mnrcvAcno	입금계좌번호	cha	20	0	PIC X(n)	20	3
    trsaccAmt	이체금액	inp	15	0	BigDecimal	15	3
    rqstrFname	의뢰인성명	cha	40	0	PIC X(n)	40	3
    draweFname	수취인성명	cha	40	0	PIC X(n)	40	3
    mnrcvSumry	입금적요	cha	22	0	PIC X(n)	22	3
    drwotSumry	출금적요	cha	22	0	PIC X(n)	22	3
    tranCnclDstcd	거래취소구분코드	cha	2	0	PIC X(n)	2	3
    mnrcvPtrnDstcd	입금유형구분코드	cha	2	0	PIC X(n)	2	3
    fnbbTelgmNo	공동망전문번호	cha	13	0	PIC X(n)	13	3
    prcssRsultCtnt	처리결과내용	cha	100	0	PIC X(n)	100	3
    fndsChatrDstcd	자금성격구분코드	cha	2	0	PIC X(n)	2	3
    cMSMgtNo	CMS관리번호	cha	16	0	PIC X(n)	16	3
*/

/*
//KGR020S121_대량이체모계좌출금요청
InData	입력데이터					1
  telgmCmnDvsn	전문공통부					2
    instiEntpNo	기관업체번호		10		PIC X(n)	3
    cmnDvsnBnkCd	공통부은행코드		2		PIC X(n)	3
    telgmDstcd	전문구분코드		4		PIC X(n)	3
    bzwkDstcd	업무구분코드		4		PIC X(n)	3
    sndrcvDstcd	송수신구분		1		PIC X(n)	3
    splizTrsmtNotms	전문전송횟수		1		PIC 9(n)	3
    intnlApiTelgmNo	내부API전문번호		8		PIC X(n)	3
    trsmtDte	전송일자		8		PIC X(n)	3
    trsmtTtm	전송시간		6		PIC X(n)	3
    rspnsCd	응답코드		4		PIC X(n)	3
    entpScop	업체영역		11		PIC X(n)	3
    bnkScop	은행영역		10		PIC X(n)	3
    cmnDvsnSpareScop	공통부예비영역		100		PIC X(n)	3
  bzwkIdiviDvsn	업무개별부					2
    drwotAcno	출금계좌번호		20		PIC X(n)	3
    drwotAcnPwd	출금계좌비밀번호		36		PIC X(n)	3
    rqstNoitm	총의뢰건수		11		PIC 9(n)	3
    rqstAmt	총의뢰금액		15		PIC 9(n)	3
    drwotSumry	출금적요		22		PIC X(n)	3
    rqstrFname	의뢰인성명		40		PIC X(n)	3
    fndsChatrDstcd	자금성격구분코드		2		PIC X(n)	3
    drwotAfBalSin	출금후잔액부호		1		PIC X(n)	3
    drwotAfBal	출금후잔액		15		PIC 9(n)	3
    lagqtyTrsaccNth	대량이체 회차		5		PIC 9(n)	3
    lagqtyTrsaccBzwkDstic	대량이체 업무구분		2		PIC X(n)	3
    spare	예비		218		PIC X(n)	3
*/

/*
//KGR040S141_계좌거래내역조회
InData	입력데이터					1
  telgmCmnDvsn	전문공통부					2
    instiEntpNo	기관업체번호		10		PIC X(n)	3
    cmnDvsnBnkCd	공통부은행코드		2		PIC X(n)	3
    telgmDstcd	전문구분코드		4		PIC X(n)	3
    bzwkDstcd	업무구분코드		4		PIC X(n)	3
    sndrcvDstcd	송수신구분		1		PIC X(n)	3
    splizTrsmtNotms	전문전송횟수		1		PIC 9(n)	3
    intnlApiTelgmNo	내부API전문번호		8		PIC X(n)	3
    trsmtDte	전송일자		8		PIC X(n)	3
    trsmtTtm	전송시간		6		PIC X(n)	3
    rspnsCd	응답코드		4		PIC X(n)	3
    entpScop	업체영역		11		PIC X(n)	3
    bnkScop	은행영역		10		PIC X(n)	3
    cmnDvsnSpareScop	공통부예비영역		100		PIC X(n)	3
  bzwkIdiviDvsn	업무개별부					2
    acno	계좌번호		20		PIC X(n)	3
    inquryStartYmd	조회시작년월일		8		PIC X(n)	3
    inquryEndYmd	조회종료년월일		8		PIC X(n)	3
    nextHistExstYn	다음내역존재여부		1		PIC X(n)	3
    nextTranYmd	다음거래년월일		8		PIC X(n)	3
    nextTranSerno	다음거래일련번호		5		PIC X(n)	3
    inquryRsultTotalCnt	조회결과총개수		5		PIC X(n)	3
    inquryRsultCnt	조회결과개수		2		Integer	3
    idiviDvsnSpareScop	개별부예비영역		47		PIC X(n)	3
    wrntHist	거래내역					3
      inquryRsultSerno	조회결과일련번호		5		PIC X(n)	4
      tranDte	거래일자		8		PIC X(n)	4
      tranTtm	거래시간		6		PIC X(n)	4
      tranDstcd	거래구분코드		2		PIC X(n)	4
      tranDstcdVal	거래구분코드값		20		PIC X(n)	4
      drwotzAmt	출금금액		14		PIC X(n)	4
      drwotAmtMnrcvBnkCd	출금금액입금은행코드		3		PIC X(n)	4
      drwotAmtMnrcvAcno	출금금액입금계좌번호		20		PIC X(n)	4
      drwotAmtMnrcvDpstrName	출금금액입금예금주명		40		PIC X(n)	4
      mrvamt	입금금액		14		PIC X(n)	4
      mrvamtDrwotDpstrName	입금금액출금예금주명		40		PIC X(n)	4
      balSin	잔액부호		1		PIC X(n)	4
      bal	잔액		14		PIC X(n)	4
      tranSumry	거래적요		40		PIC X(n)	4
*/

/*
//KGR040S241_계좌잔액조회
key	note	type	max	min	source	depth
InData	입력데이터	div				1
  telgmCmnDvsn	전문공통부	div				2
    instiEntpNo	기관업체번호	cha	10	1	PIC X(n)	3
    cmnDvsnBnkCd	공통부은행코드	cha	2	2	PIC X(n)	3
    telgmDstcd	전문구분코드	cha	4	4	PIC X(n)	3
    bzwkDstcd	업무구분코드	cha	4	4	PIC X(n)	3
    sndrcvDstcd	송수신구분	cha	1	1	PIC X(n)	3
    splizTrsmtNotms	전문전송횟수	int	1	1	PIC 9(n)	3
    intnlApiTelgmNo	내부API전문번호	cha	8	8	PIC X(n)	3
    trsmtDte	전송일자	cha	8	8	PIC X(n)	3
    trsmtTtm	전송시간	cha	6	6	PIC X(n)	3
    rspnsCd	응답코드	cha	4	0	PIC X(n)	3
    entpScop	업체영역	cha	11	0	PIC X(n)	3
    bnkScop	은행영역	cha	10	0	PIC X(n)	3
    cmnDvsnSpareScop	공통부예비영역	cha	100	0	PIC X(n)	3
  bzwkIdiviDvsn	업무개별부	div				2
    idiviDvsnBnkCd	개별부은행코드	cha	3	0	PIC X(n)	3
    acno	계좌번호	cha	20	10	PIC X(n)	3
    lnLimt	대출한도	ipd	15	15	BigDecimal	3
    srfacBalSin	표면잔액부호	cha	1	0	PIC X(n)	3
    srfacBal	표면잔액	ipd	15	15	BigDecimal	3
    cshTrfamt	현금대체금액	ipd	15	15	BigDecimal	3
    psnckAmt	가계수표금액	ipd	15	15	BigDecimal	3
    cracPrmisNoteAmt	당좌약속어음금액	ipd	15	15	BigDecimal	3
    paymtAbilBalSin	지불가능잔액부호	cha	1	0	PIC X(n)	3
    paymtAbilzBal	지불가능잔액	ipd	15	15	BigDecimal	3
    idiviDvsnSpareScop	개별부예비영역	cha	216	0	PIC X(n)	3
*/

/*
//KGR040S341_예금주성명조회요청
InData	입력데이터					1
  telgmCmnDvsn	전문공통부					2
    instiEntpNo	기관업체번호		10		PIC X(n)	3
    cmnDvsnBnkCd	공통부은행코드		2		PIC X(n)	3
    telgmDstcd	전문구분코드		4		PIC X(n)	3
    bzwkDstcd	업무구분코드		4		PIC X(n)	3
    sndrcvDstcd	송수신구분		1		PIC X(n)	3
    splizTrsmtNotms	전문전송횟수		1		PIC 9(n)	3
    intnlApiTelgmNo	내부API전문번호		8		PIC X(n)	3
    trsmtDte	전송일자		8		PIC X(n)	3
    trsmtTtm	전송시간		6		PIC X(n)	3
    rspnsCd	응답코드		4		PIC X(n)	3
    entpScop	업체영역		11		PIC X(n)	3
    bnkScop	은행영역		10		PIC X(n)	3
    cmnDvsnSpareScop	공통부예비영역		100		PIC X(n)	3
  bzwkIdiviDvsn	업무개별부					2
    mnrcvBnkCd	입금은행코드		3		PIC X(n)	3
    mnrcvAcno	입금계좌번호		20		PIC X(n)	3
    dpstrFname	예금주성명		40		PIC X(n)	3
    mrvamt	입금금액		15		BigDecimal	3
    inhabBzno	주민사업자번호		13		PIC X(n)	3
    inquryAfDpstrFname	조회후예금주성명		40		PIC X(n)	3
    prcssRsultCtnt	처리결과내용		100		PIC X(n)	3
    fndsChatrDstcd	자금성격구분코드		2		PIC X(n)	3
*/

/*
//KGR040S541_이체처리결과조회
InData	입력데이터					1
  telgmCmnDvsn	전문공통부					2
    instiEntpNo	기관업체번호		10		PIC X(n)	3
    cmnDvsnBnkCd	공통부은행코드		2		PIC X(n)	3
    telgmDstcd	전문구분코드		4		PIC X(n)	3
    bzwkDstcd	업무구분코드		4		PIC X(n)	3
    sndrcvDstcd	송수신구분		1		PIC X(n)	3
    splizTrsmtNotms	전문전송횟수		1		PIC 9(n)	3
    intnlApiTelgmNo	내부API전문번호		8		PIC X(n)	3
    trsmtDte	전송일자		8		PIC X(n)	3
    trsmtTtm	전송시간		6		PIC X(n)	3
    rspnsCd	응답코드		4		PIC X(n)	3
    entpScop	업체영역		11		PIC X(n)	3
    bnkScop	은행영역		10		PIC X(n)	3
    cmnDvsnSpareScop	공통부예비영역		100		PIC X(n)	3
  bzwkIdiviDvsn	업무개별부					2
    instiEntpNo1	기관업체번호1		10		PIC X(n)	3
    tranYmd	거래년월일		8		PIC X(n)	3
    intnlApiTelgmNo1	내부API전문번호1		8		PIC X(n)	3
    idiviDvsnSpareScop	개별부예비영역		216		PIC X(n)	3

*/

/*
//inqCoApvList_KB국민카드기업카드승인내역조회
"dataHeader" : {
  "udId":"" //단말기 고유ID(UDID)
  ,"subChannel":"" //채널구분(앱 구분용)
  ,"deviceModel":"" //단말기 모델명
  ,"deviceOs":"" //단말기OS명
  ,"carrier":"" //캐리어명
  ,"connectionType":"" //연결정보
  ,"appName":"" //앱이름
  ,"appVersion":"" //앱버전
  ,"scrNo":"" //CXOXXEECD0004 //화면번호
  ,"scrName":"" //기업카드승인내역조회
},
"dataBody"	:	{
  "bzNo":"" //1234567890 //사업자번호
  ,"startDate":"" //20190906 //시작
  ,"endDate":"" //20191205 //종료
  ,"inqDscd":"" //1 //조회구분(1:전체,2:부서별,3:카드별)
  ,"divSeqNo":"" //00001 //부서별조회일련번호
  ,"cardNo":"" //1234567812345678 //카드별조회카드번호
  ,"requestPage":"" //1 //조회대상페이지
  ,"tmpResult":"" //Y //페이징임시데이터
}
*/