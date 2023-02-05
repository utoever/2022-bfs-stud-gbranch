////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');
const my=require(process.rootDir+'DATA/myv.js');


////////////////////////
/*CREATE TABLE `nv_10`.`trans` (
	`transKy`      INT                           NOT NULL COMMENT '이체Ky', -- 이체Ky
	`memKy`        INT                           NOT NULL COMMENT '실행회원Ky', -- 회원Ky
	`accKy`        INT                           NOT NULL COMMENT '출금계좌Ky', -- 계좌Ky
	`transReqKy`   INT                           NOT NULL COMMENT '이체요청키', -- 이체요청키
	`transType`    ENUM('single','multi','mass') NOT NULL COMMENT '이체종류(단건,다계좌,대량)', -- 이체종류
	`transDateCre` DATETIME                      NOT NULL COMMENT '이체입력일', -- 이체입력일
	`transFlag`    ENUM('N','Y')                 NOT NULL COMMENT '이체상태(무효,유효)' -- 이체상태
)CREATE TABLE `nv_10`.`transRes` (
	`transResKy`      INT           NOT NULL COMMENT '이체결과Ky', -- 이체결과Ky
	`transKy`         INT           NOT NULL COMMENT '이체Ky', -- 이체Ky
	`transToBankCode` VARCHAR(3)    NOT NULL COMMENT '입금계좌은행코드', -- 입금계좌은행코드
	`transToAccNum`   VARCHAR(14)   NOT NULL COMMENT '입금계좌번호', -- 입금계좌번호
	`transToAccOwner` VARCHAR(20)   NULL     COMMENT '입금계좌주명', -- 입금계좌주명
	`transAmount`     VARCHAR(10)   NOT NULL COMMENT '이체금액', -- 이체금액
	`transResult`     INT           NOT NULL COMMENT '이체결과(0:요청,1:성공,2:보류,3:실패)', -- 이체결과
	`transResCode`    VARCHAR(20)   NULL     COMMENT '이체결과코드', -- 이체결과코드
	`transResDateCre` DATETIME      NOT NULL COMMENT '이체결과입력일', -- 이체결과입력일
	`transResFlag`    ENUM('N','Y') NOT NULL COMMENT '이체결과상태(무효,유효)' -- 이체결과상태
)*/


////////////////////////
module.exports={
  //transCreate:transCreate,
};