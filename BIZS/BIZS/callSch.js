////////////////////////
const ut=require(process.rootDir+'DATA/ut.js');

///////////////////////////////////
class schCon{

  view(){
    console.log(this.schema);
  }

  toInp(num,leng){
    return String(num).padStart(leng,'0');
  }

  veri(key,val){
    //if(typeof val==='undefined') val='';
    let sch=this.schema[key];
    let reInt=/^0-9/g;
    let reFlt=/^0-9\./g;
    let ip=[key,val];
    //console.log(sch);

    if(typeof sch==='object'){//스키마 확인
      if(sch.type!='div'){
        if(sch.type=='int'||sch.type=='inp'||sch.type=='flt'||sch.type=='cha'){
          sch.max=parseInt(sch.max)||0;
          sch.min=parseInt(sch.min)||0;
          if(sch.max>=sch.min){

            //console.log(key,sch.type,val,reInt.test(String(val)),isNaN(val));
            if((sch.type=='int'||sch.type=='inp') && (reInt.test(String(val))||isNaN(val))) return [false,'not number',key,val,sch];//정수형이 아님
            else if(sch.type=='flt' && (reFlt.test(String(val))||isNaN(val))) return [false,'not number|dot',key,val,sch];
            else if((sch.max && String(val).length>sch.max) || String(val).length<sch.min) return [false,'size error',key,val,sch];

            else return [true];
          }
          else return [false,'schema error, max too small',key,val,sch.type];//정의되지 않은 자료형
        }
        else return [false,'schema error, type unknown',key,val,sch.type];//정의되지 않은 자료형
      }
      else return [true,'schema useless, '+sch.type];//검증불필요
    }
    else return [true,'key unknown, '+key];//존재하지 않는 키는 검증하지 않는다.
  }

  veriNeed(){//검증해야할 스키마 키 목록
    if(Object.keys(this.schema).length){//키가 존재해야하고
      for(let key in this.schema){
        let sch=this.schema[key];
        if(typeof sch==='object'){//스키마가 정상이어야하고
          if(sch.type!='div'){
            if(sch.type=='int'||sch.type=='inp'||sch.type=='flt'||sch.type=='cha'){
              sch.max=parseInt(sch.max)||0;
              sch.min=parseInt(sch.min)||0;
              if(sch.max>=sch.min){
                this.need.push(key);
              }
            }
          }
        }
      }
    }
  }

  veriCheck(key){//키 검증완료 기록
    for(let i=0;i<this.need.length;i++){//검증필요목록을 순회하면서 검증된 키를 삭제한다.
      if(this.need[i]===key){
        this.need.splice(i,1);
        i--;
      }
    }
  }

  veriAll(keyVals){//{key:val,key:val}
    let error=[];
    let veriN=0;
    if(typeof keyVals==='object' && this.need.length){//검증대상이 객체여야 하고, 검증해야 할 키가 있어야 한다.
      for(let key in keyVals){
        let val=keyVals[key];
        let vr=this.veri(key,val);
        //console.log(vr);
        if(!vr[0]) error.push(vr);//결과가 없다면 에러발생
        else if(this.need.indexOf(key)>=0){
          //console.log(key);
          veriN++;//검증횟수기록
          this.veriCheck(key);//에러가 없다면 해당 키 검증완료
        }
      }
    }
    if(veriN==0) error.push([false,'none verification']);
    if(this.need.length>0) error.push([false,this.need.length+' wrong values']);

    //console.log(veriN);
    //console.log(error);
    //console.log(this.need);

    if(error.length==0 && this.need.length==0) return [true];//에러가 없고, 1회 이상 검증했고, 검증해야 할 키가 남아있지 않다면
    else return [false,error];

  }

  constructor(schema){
    this.schema=schema;
    this.need=[];
    this.veriNeed();
  }
}

module.exports=schCon;

/*
const schemas=require('sch_KBK_GBR.js');//프로젝트 전체의 스키마
const schCon=require('schCon.js');//스키마 검증모듈
let sc=new schCon(schemas['KBK_GBR_00001100']);//해당 메소드의 스키마를 불러온다.
//sc.view();
console.log(sc.veriAll({
  "test":"",
  "tmpResult":"Y",
  "startDate":"12341212",
}));//주어진 모든 값을 검사하여 결과를 반환한다.
*/


/*
type:{
  cha:"character",//one
  int:"integer",//1
  flt:"float",//1.1
  inp:"character of integer padding 0 from left",//00001
  div:"divison only, no data"
}
*/