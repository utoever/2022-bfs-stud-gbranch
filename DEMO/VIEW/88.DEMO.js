////////////////////////
process.rootDir='/home/nodejs/Nodebreaker/';
const cf=require(process.rootDir+'DATA/cf.js');
const ut=require(process.rootDir+'DATA/ut.js');



////////////////////////
const express=require('express');
const http=require('https');
const fs=require('fs');
//const watcher=require(process.rootDir+'DATA/watcher.js');
//watcher.runStatis();
//watcher.appSender();



////////////////////////
const appDemo=express();
const portDemo=8088;

const authPre='/home/nodejs/auth/demo.nodebreaker.link_202209058BCFB/demo.nodebreaker.link_202209058BCFB';
const tlsOpts={
  key: fs.readFileSync(authPre+'.key.pem'),
  cert: fs.readFileSync(authPre+'.crt.pem'),
  ca: fs.readFileSync(authPre+'.ca-bundle.pem'),
};


////////////////////////
appDemo.use(express.json());
appDemo.use(express.urlencoded({extended:false}));
appDemo.use(express.static(__dirname+'/public'));



////////////////////////
/*
appDemo.set('views', __dirname+'/view');
appDemo.set('view engine','ejs');
appDemo.engine('html',require('ejs').renderFile);
appDemo.use((req,res,next)=>{
  //watcher.addContact();
  next();
});

const routeDemo=require('./route/route');
appDemo.use('/',routeDemo);
*/




const mem=require(process.rootDir+'DEMO/controller/ctrMem.js');
/*
console.log(mem.memCreate({//회원가입
  memId:"admin2" //     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
  ,memPs:"admin0000####" //     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
  ,memName:"administrator" //   VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
}));
console.log(mem.memRead({//회원정보읽기
  memKy:4 //     INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  //memId:"admin2" //     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
}));
console.log(mem.memList(//회원목록
));
console.log(mem.memUpdate({//회원정보수정
  memKyAdm:"4" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  ,memKy:"5" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  ,memDiv:"admin" // #ENUM('system','admin','general') NOT NULL COMMENT '회원구분(시스템,관리자,일반)', -- 회원구분
  ,memGrade:"2" // #INT                              NOT NULL COMMENT '회원권한(0:일반,1:금융조회,2:금융이체)', -- 회원권한
  ,memName:"박팔봉" // #VARCHAR(50)                      NOT NULL COMMENT '회원이름', -- 회원이름
  ,memRoll:"부장" // #VARCHAR(50)                      NULL     COMMENT '회원직책/급', -- 회원직책/급
  ,memDep:"개발팀" // #VARCHAR(50)                      NULL     COMMENT '회원부서', -- 회원부서
}));
console.log(mem.memPsUpdate({//회원비밀번호수정
  memKyAdm:"4" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  ,memKy:"4" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  ,memId:"admin" //     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
  ,memPs:"admin0000####" //     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
  ,memPsOld:"admin0000####" //     VARCHAR(70)                      NOT NULL COMMENT '회원암호', -- 회원암호
}));
console.log(mem.memDelete({//회원삭제
  memKyAdm:"4" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
  ,memKy:"5" // #INT                              NOT NULL COMMENT '회원Ky', -- 회원Ky
}));
console.log(mem.memIdExist({//회원아이디확인
  memId:"admin1" //     VARCHAR(50)                      NOT NULL COMMENT '회원아이디', -- 회원아이디
}).res[0]);
*/


const acc=require(process.rootDir+'DEMO/controller/ctrAcc.js');
/*console.log(acc.accCreate({//계좌추가
  accBankCode:'020' //    VARCHAR(3)    NOT NULL COMMENT '계좌은행코드', -- 계좌은행코드
  ,accNum:'123454678901234' //         VARCHAR(14)   NOT NULL COMMENT '계좌번호', -- 계좌번호
  ,accBalance:1000 //     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
}));
console.log(acc.accUpdate({//계좌수정
  accKy:"1" //INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
  ,accOwner:"홍길동" //VARCHAR(20)   NULL     COMMENT '계좌주명', -- 계좌주명
  ,accName:"용돈통장" //VARCHAR(50)   NULL     COMMENT '계좌명', -- 계좌명
  ,accDiv:"265저축통장" //VARCHAR(50)   NULL     COMMENT '계좌종류', -- 계좌종류
}));
console.log(acc.accBalanceUpdate({//계좌수정
  accKy:"1" //INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
  ,accBalance:"3500" //     INT           NOT NULL COMMENT '계좌잔액', -- 계좌잔액
}));
console.log(acc.accDelete({//계좌삭제
  accKy:"1" //INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
}));
console.log(acc.accRead({//계좌수정
  accKy:"1" //INT           NOT NULL COMMENT '계좌Ky', -- 계좌Ky
}).res[0]);
console.log(acc.accList({//계좌목록
}).res[0]);
console.log(acc.accBalanceList({//계좌잔액목록
}).res[0]);
*/


const card=require(process.rootDir+'DEMO/controller/ctrCard.js');
/*
console.log(card.cardCreate({//카드추가
  cardComCode:"050" // VARCHAR(3)    NOT NULL COMMENT '카드회사코드', -- 카드회사코드
  ,cardNum:"0000111122223333" // VARCHAR(16)   NOT NULL COMMENT '카드번호', -- 카드번호
  ,cardName:"좋은카드" // VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
  ,cardDiv:"마스타특별카드" // VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
}));
console.log(card.cardList({//계좌목록
}).res[0]);
console.log(card.cardRead({//계좌수정
  cardKy:"1" //INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
}).res[0]);
console.log(card.cardUpdate({//계좌수정
  cardKy:"1" //INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
  ,cardName:"좋은카드1" // VARCHAR(50)   NULL     COMMENT '카드명', -- 카드명
  ,cardDiv:"마스타특별카드1" // VARCHAR(50)   NULL     COMMENT '카드종류', -- 카드종류
}));
console.log(card.cardDelete({//계좌삭제
  cardKy:"1" //INT           NOT NULL COMMENT '카드Ky', -- 카드Ky
}));
*/


////////////////////////
http.createServer(tlsOpts,appDemo).listen(portDemo,()=>{
  console.log("Demo on ",portDemo)
});