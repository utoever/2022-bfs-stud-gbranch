import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div class="link-tap">
          <div class="home-button shadow-10">
              <a href="memLogin.htm"><span class="material-symbols-rounded">
                  home
              </span></a>
          </div>
      </div>
      <div class="title-black">회원목록</div>
      <div class="button-container">
          <div class="blue-button m-size-text regular-text">
              <span class="material-symbols-rounded">
                  search
              </span>
              <p>찾기</p>
          </div>
          <div class="blue-button m-size-text regular-text">
              <span class="material-symbols-rounded">
                  print
              </span>
              <p>인쇄</p>
          </div>
          <div class="blue-button m-size-text regular-text">
              <span class="material-symbols-rounded">
                  save
              </span>
              <p>저장</p>
          </div>
      </div>


      <div class="box shadow-20 middle-box">
          <div class="table-wrapper">
              <table class="light-text m-size-text" style="width:100%;">
                  <tr>
                      <th style="text-align:center;">
                        <span
                          @click="memCheck($event,'check1')"
                          class="material-symbols-rounded"
                        >check_box_outline_blank</span>
                      </th>
                      <th>아이디</th>
                      <th>회원명</th>
                      <th>직책/급</th>
                      <th>부서</th>
                      <th>회원구분</th>
                      <th>가입일</th>
                      <th>명령</th>
                  </tr>
                  <tr
                    v-for="(mem,n) in memList"
                  >
                      <td style="text-align:center;">
                        <span
                          ref="check1"
                          @click="memCheck($event)"
                          :chidx="(n+1)"
                          class="material-symbols-rounded"
                        >check_box_outline_blank</span>
                      </td>
                      <td><a href="#">{{mem.memId}}</a></td>
                      <td>{{mem.memName}}</td>
                      <td>{{memDivEn[mem.memDiv]}}</td>
                      <td>{{mem.memRoll}}</td>
                      <td>{{mem.memDep}}</td>
                      <td>{{mem.memDateCre}}</td>
                      <td style="text-align:center;">
                        <a href="#"><span class="material-symbols-rounded">info</span></a>
                        <a href="#"><span class="material-symbols-rounded">edit</span></a>
                        <a href="#"><span class="material-symbols-rounded">delete</span></a>
                      </td>
                  </tr>
              </table>
          </div>
      </div>

      <div>
        <span id="debugName">debug</span><br>
        <pre id="debug"></pre>
      </div>
`;

export default {
  template:htmlTemplete,

  //////////////////////////
  data:()=>{ return {
    memList:[//mount 되는 순간 데이터로딩 fetch
    ],
    memDivEn:{//DB ENUM
      'system':'시스템관리자',
      'general':'일반관리자',
    },
  }},

  //////////////////////////
  methods:{
    /////////////
    debug(data,name,flag){
      name=name||'';
      if(flag && data) console.log(data,name,JSON.stringify(data));
      const debugName=ut.qs('#debugName');
      const debug=ut.qs('#debug');
      if(debugName && name) debugName.innerHTML=name;
      if(debug && data) debug.innerHTML=JSON.stringify(data,null,4);
    },
    /////////////
    wOpen(url,flag){
      if(flag) window.open(url,'popup','width=1200px,height=1000px,toolbars=no,scrollbars=no');//팝업으로 열기
      else window.open(url,'_blank');//새탭으로 열기
    },
    /////////////
    href(url){
      document.location.href=url;
    },
    /////////////
    /////////////
    /////////////
    memListLoad(args){//데이터로딩 fetch
      return [{
        memKy:4,
        memId:'ADMIN',
        memDiv:'system',
        memGrade:1,
        memName:'admin22',
        memDateCre:'2022-08-14',
        checked:false
      },{
        memKy:5,
        memId:'ADMIN1',
        memDiv:'general',
        memGrade:2,
        memName:'김철수',
        memRoll:'부장',
        memDep:'개발팀',
        memDateCre:'2022-08-15',
        checked:false
      },{
        memKy:6,
        memId:'ADMIN2',
        memDiv:'general',
        memGrade:0,
        memName:'administrator',
        memDateCre:'2022-08-16',
        checked:false
      }];
    },
    /////////////
    /////////////
    /////////////
    memCheck(ev,className){
      //console.log(ev);

      const ch_no='check_box';
      const ch_yes='check_box_outline_blank';
      const el=ev.srcElement;//클릭한대상
      //const el=ev.target;//클릭한대상

      let chIdx=0;
      try{chIdx=Number(el.attributes.chidx.nodeValue);}catch{}
      //console.log(chIdx);

      //attr의 chIdx는 1부터 시작해야 오류가 적다.
      if(el.innerHTML==ch_no){
        el.innerHTML=ch_yes;
        if(chIdx) this.memList[chIdx-1].checked=false;//데이터
      }
      else{
        el.innerHTML=ch_no;
        if(chIdx) this.memList[chIdx-1].checked=true;//데이터
      }

      if(className){//상단 그룹체크일 경우
        for(let n=1;true;n++){
          let elt=this.$refs[className][n-1];//인덱스대상
          //console.log(elt);
          if(elt){
            if(el.innerHTML==ch_no){
              elt.innerHTML=ch_no;
              this.memList[n-1].checked=true;//데이터
            }
            else{
              elt.innerHTML=ch_yes;
              this.memList[n-1].checked=false;//데이터
            }
          }
          else break;
        }
      }
      this.debug(this.memList);
    }
  },

  //////////////////////////
  mounted(){
    /////////////데이터로딩
    this.memList=this.memListLoad();
    /////////////
    this.debug(this.memList,'memList',true);
  }

};