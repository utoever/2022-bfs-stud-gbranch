/*
SQLyog Ultimate v12.18 (64 bit)
MySQL - 8.0.27 : Database - nb_10
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nb_10` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `nb_10`;

/*Table structure for table `co` */

DROP TABLE IF EXISTS `co`;

CREATE TABLE `co` (
  `coKy` int NOT NULL AUTO_INCREMENT COMMENT '기관Ky',
  `userKy` int NOT NULL COMMENT '사용자Ky',
  `coName` varchar(50) NOT NULL COMMENT '기관명',
  `coDiv` enum('private','public') DEFAULT NULL COMMENT '기관구분(일반,공기업)',
  `coRegNum` varchar(13) DEFAULT NULL COMMENT '기관등록번호',
  `coDomainSSL` varchar(50) DEFAULT NULL COMMENT '기관도메인SSL',
  `coTel` varchar(15) DEFAULT NULL COMMENT '기관연락처',
  `coMail` varchar(50) DEFAULT NULL COMMENT '기관메일',
  `coCertDateEnd` datetime DEFAULT NULL COMMENT '기관인증완료일',
  `coCertDateStart` datetime DEFAULT NULL COMMENT '기관인증시작일',
  `coCertDateCre` datetime DEFAULT NULL COMMENT '기관인증일',
  `coCertInfo` varchar(100) DEFAULT NULL COMMENT '기관인증정보',
  `coApiKey` varchar(100) DEFAULT NULL COMMENT '기관APIKEY',
  `coCdnCode` varchar(100) DEFAULT NULL COMMENT '기관CDN코드',
  `coAuthIP` varchar(15) DEFAULT NULL COMMENT '기관인증IP',
  `coAuthUrl` varchar(100) DEFAULT NULL COMMENT '기관인증URL',
  `coCertStat` enum('N','Y') NOT NULL COMMENT '기관인증상태(무효,유효)',
  `coAuthStat` enum('N','Y') NOT NULL COMMENT '기관검증상태(무효,유효)',
  `coDateCre` datetime NOT NULL COMMENT '기관생성일',
  `coFlag` enum('N','Y') NOT NULL COMMENT '기관상태(무효,유효)',
  PRIMARY KEY (`coKy`),
  UNIQUE KEY `UIX_co` (`coApiKey`),
  KEY `FK_user_TO_co` (`userKy`),
  CONSTRAINT `FK_user_TO_co` FOREIGN KEY (`userKy`) REFERENCES `user` (`userKy`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COMMENT='기관';

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `logKy` int NOT NULL AUTO_INCREMENT COMMENT '로그Ky',
  `userKy` int DEFAULT NULL COMMENT '사용자Ky',
  `logName` varchar(50) NOT NULL COMMENT '로그명',
  `logPos` varchar(50) NOT NULL COMMENT '로그위치',
  `logDiv` enum('co','user','pro','mach','app','ex') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'user' COMMENT '로그구분(기관,사용자,프로젝트,물리서버,서버앱,기타)',
  `logType` enum('login','work','alert','ex') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'login' COMMENT '로그타입(로그인,작업,경고,기타)',
  `logDataType` enum('text','json') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'json' COMMENT '로그데이터타입(텍스트,제이슨)',
  `logData` text NOT NULL COMMENT '로그데이터',
  `logDateCre` datetime NOT NULL COMMENT '로그생성일',
  PRIMARY KEY (`logKy`),
  KEY `FK_user_TO_log` (`userKy`),
  CONSTRAINT `FK_user_TO_log` FOREIGN KEY (`userKy`) REFERENCES `user` (`userKy`)
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb3 COMMENT='로그';

/*Table structure for table `memo` */

DROP TABLE IF EXISTS `memo`;

CREATE TABLE `memo` (
  `memoKy` int NOT NULL AUTO_INCREMENT COMMENT '메모Ky',
  `userKy` int NOT NULL COMMENT '사용자Ky',
  `memoTitle` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '메모제목',
  `memoText` text COMMENT '메모내용',
  `memoPage` varchar(200) DEFAULT NULL COMMENT '메모페이지명',
  `memoUrl` varchar(200) DEFAULT NULL COMMENT '메모URL',
  `memoDateCre` datetime NOT NULL COMMENT '메모생성일',
  `memoFlag` enum('N','Y') NOT NULL COMMENT '메모상태(무효,유효)',
  PRIMARY KEY (`memoKy`),
  KEY `FK_user_TO_memo` (`userKy`),
  CONSTRAINT `FK_user_TO_memo` FOREIGN KEY (`userKy`) REFERENCES `user` (`userKy`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COMMENT='메모';

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userKy` int NOT NULL AUTO_INCREMENT COMMENT '사용자Ky',
  `userId` varchar(50) NOT NULL COMMENT '사용자아이디',
  `userPs` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '사용자암호',
  `userDiv` enum('system','admin','general') NOT NULL COMMENT '사용자구분(시스템,관리자,일반)',
  `userName` varchar(50) NOT NULL COMMENT '사용자명',
  `userDateCre` datetime NOT NULL COMMENT '사용자생성일',
  `userFailN` int NOT NULL COMMENT '사용자로그인실패수',
  `userFlag` enum('N','Y') NOT NULL COMMENT '사용자상태(무효,유효)',
  PRIMARY KEY (`userKy`),
  UNIQUE KEY `UIX_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COMMENT='사용자';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
