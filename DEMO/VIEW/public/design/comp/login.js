import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <section class="infomation-section">
          <div>
              <a href="0.login.html"><img src="src/img/logo.png" alt=""></a>
          </div>
          <h1>기업자금관리 시스템의 최강자</h1>
          <h2>"이젠 모든 금융기관의 업무 ESP-CMS 단 하나로 해결합니다."</h2>
          <div>
              <p>1) 통합자금관리</p>
              <p>2) 법인카드 통합관리</p>
              <p>3) 전자세금계산서 발행 및 관리</p>
              <p>4) 세금공과금 납부 서비스</p>
          </div>
          <p>ESP-CMS 의 다양한 특화 서비스를 체험해 보세요!</p>
          <div class="blue-button m-size-text bold-text"> 상세보기</div>
          <div class="box-container">
              <div class="box shadow-20">
                  <h2 class="title-black">서비스 바로가기</h2>
                  <div class="services-link medium-text m-size-text">
                      <div @click="href('memCreate.htm')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#00cccc;">person</span> 회원가입</div>
                      <div @click="href('accList.htm')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#00cccc;">payments</span> 계좌조회</div>
                      <div @click="href('cardList.htm')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#00cccc;">credit_card</span> 카드조회</div>
                  </div>
                  <div class="consulting">
                      <h2 class="title-black">고객상담센터</h2>
                      <h1 class="bold-text">1234-1234</h1>
                      <p class="light-text s-size-text">운영시간 : 평일 09:00 ~ 18:00</p>
                  </div>
                  <br><br>
                  <span @click="href('1.index.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">corporate_fare</span>Index</span> &nbsp;
                  <span @click="wOpen('6.pop.html',1)" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">library_add</span>Pop</span> &nbsp;
                  <span @click="wOpen('https://v3.ko.vuejs.org/guide/data-methods.html#methods')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">menu_book</span>Manual</span> &nbsp;
                  <span @click="wOpen('7.icon.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">rocket_launch</span>icon</span><br>

                  <span @click="href('2.page.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">feed</span>Page2</span> &nbsp;
                  <span @click="href('3.page.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">feed</span>Page3</span> &nbsp;
                  <span @click="href('4.page.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">feed</span>Page4</span> &nbsp;
                  <span @click="href('5.page.html')" style="cursor:pointer;"><span class="material-symbols-rounded" style="color:#003399;">feed</span>Page5</span>
              </div>

              <div class="box shadow-20 login-notice">
                  <h2 class="title-black">공지사항</h2>
                  <ul>
                      <li><h4>ESP-CMS 원격지원 서비스 지원 안내</h4><p>0000-00-00</p></li>
                      <li><h4>전자세금계산서 발행 및 관리</h4><p>0000-00-00</p></li>
                      <li><h4>기업자금관리 시스템의 최강자</h4><p>0000-00-00</p></li>
                      <li><h4>ESP-CMS의 특화 서비스를 체험해 보세요!</h4><p>0000-00-00</p></li>
                  </ul>

              </div>
          </div>

      </section>
      <section class="login-section box shadow-20">
          <div class="logo-wrapper">
              <img src="src/img/logo.png" alt="logo">
          </div>
          <h1>LOGIN</h1>
          <hr />
          <div>
              <h2 class="title-black">ESP-CMS 사용자 로그인</h2>
              <form>
                  <div class="input-container">
                      <input type="text" name="" id="userID" placeholder="아이디" />
                      <input type="password" name="" id="userPS" placeholder="비밀번호" />
                  </div>
                  <div class="m-size-text bold-text login-button">
                      <p><span class="material-symbols-rounded" style="color:#00cccc;">login</span><span style="vertical-align:-2px;">로그인</span></p>
                  </div>
              </form>
          </div>
          <div class="certificate-login">
              <h2 class="title-black">공인인증서 로그인</h2>
              <div class="blue-button m-size-text bold-text">공인인증서 로그인</div>
              <a href="#"><p class="medium-text s-size-text">>> 공인인증센터 바로가기</p></a>
              <p class="xs-size-text light-text">(인증서 신규, 재발급, 갱신 서비스)</p>
          </div>
      </section>
`;

export default {
  template:htmlTemplete,
  data: ()=> { return {
  }},
  methods:{
    wOpen(url,flag){
      if(flag) window.open(url,'popup','width=1200px,height=1000px,toolbars=no,scrollbars=no');//팝업으로 열기
      else window.open(url,'_blank');//새탭으로 열기
    },
    href(url){
      document.location.href=url;
    }
  }
};