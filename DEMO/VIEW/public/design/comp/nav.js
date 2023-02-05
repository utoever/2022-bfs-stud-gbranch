import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div class="user">
          <div class="user-greet">
              <img src="src/img/user.png" alt="user" />
              <p class="regular-text s-size-text">홍길동님, 반갑습니다.</p>
          </div>
          <div class="close-button">
              <span class="material-symbols-rounded">close</span>
          </div>
          <div class="menu-button">
              <span class="material-symbols-rounded">menu</span>
          </div>
      </div>
      <div class="user-menu">
        <!-- <div class="title">사용자메뉴</div> -->
        <ul class="regular-text">
          <hr class="menu-divide" />
          <li>
            <a href="#"><span class="material-symbols-rounded">person</span>
            <p class="user-menu-text">회원관리</p></a>

            <ul class="regular-text s-size-text sub-menu" style="margin-left:20px;">
              <li><a href="memList.htm"><span class="material-symbols-rounded" style="font-size:1.5em;">group</span>
              <p class="">회원목록</p></a></li>
              <li><a href="memCreate.htm"><span class="material-symbols-rounded" style="font-size:1.5em;">person_add</span>
              <span class="">회원가입</span></a></li>
              <li><a href="memLogout.htm"><span class="material-symbols-rounded" style="font-size:1.5em;">logout</span>
              <p class="">로그아웃</p></a></li>
            </ul>

          </li>
          <hr class="menu-divide" />
          <li>
            <a href="#"><span class="material-symbols-rounded">payments</span>
            <p class="user-menu-text">계좌관리</p></a>

            <ul class="regular-text s-size-text sub-menu" style="margin-left:20px;">
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">wallet</span>
              <span class="">계좌목록</span></a></li>
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">price_change</span>
              <p class="">계좌추가</p></a></li>
            </ul>

          </li>
          <hr class="menu-divide" />
          <li>
            <a href="#"><span class="material-symbols-rounded">currency_exchange</span>
            <p class="user-menu-text">이체</p></a>

            <ul class="regular-text s-size-text sub-menu" style="margin-left:20px;">
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">directions_alt</span>
              <span class="">건별이체</span></a></li>
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">difference</span>
              <p class="">다계좌이체</p></a></li>
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">table_view</span>
              <p class="">대량이체</p></a></li>
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">playlist_add_check</span>
              <p class="">이체요청목록</p></a></li>
            </ul>

          </li>
          <hr class="menu-divide" />
          <li>
            <a href="#"><span class="material-symbols-rounded">credit_card</span>
            <p class="user-menu-text">카드관리</p></a>

            <ul class="regular-text s-size-text sub-menu" style="margin-left:20px;">
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">redeem</span>
              <span class="">카드목록</span></a></li>
              <li><a href="#"><span class="material-symbols-rounded" style="font-size:1.5em;">add_card</span>
              <p class="">카드추가</p></a></li>
            </ul>

          </li>
          <hr class="menu-divide" />
          </ul>
      </div>
      <div class="menu">
          <div class="input-wrapper">
              <input class="menu-input medium-text m-size-text" type="text" placeholder="메뉴명 검색" />
              <button class="menu-search-button"><span class="material-symbols-rounded">
                      search
                  </span></button>
          </div>
          <div class="menu-tap">
              <ul class="s-size-text light-text">
                  <li class="box-small shadow-10">메뉴</li>
                  <li class="box-small shadow-10">맞춤</li>
                  <li class="box-small shadow-10">검색</li>
              </ul>
          </div>
          <!-- <ul ref="menus" class="menu-list s-size-text regular-text">

              <li class="1depth">
                <a href="0.login.html">0.login.html</a>
              </li>
              <li class="1depth" v-for="mn in menus">
                <a v-if="thisURLName===mn.link" v-bind:href="mn.link" style="font-weight:bold;color:black;">{{mn.name}}</a>
                <a v-else v-bind:href="mn.link">{{mn.name}}</a>
              </li>
              <li class="1depth" style="margin-bottom:10px;">
                <a href="#" @click="popupOpen()">6.pop.html</a>
              </li>
              <li class="1depth" style="margin-bottom:10px;">
                <a href="#" @click="sendClick()">sendClick</a>
              </li>

          </ul> -->
      </div>
`;

export default {
  template:htmlTemplete,

  data:()=>{ return {
    popupView : false,
    popupUrl : '6.pop.html',
    thisURLName : '',
    menus :[{
      link:'1.index.html',
      name:'1.index.html'
    },{
      link:'2.page.html',
      name:'2.page.html'
    },{
      link:'3.page.html',
      name:'3.page.html'
    },{
      link:'4.page.html',
      name:'4.page.html'
    },{
      link:'5.page.html',
      name:'5.page.html'
    }]
  }},

  methods:{
    popupOpen(){
      this.popupView = (this.popupView) ? false : true;
      window.open(
        this.popupUrl,
        'popup',
        'width=1200px,height=1000px,toolbars=no,scrollbars=no'
      );
    },
    sendClick(){
      this.eventBus.emit('click2p',' th click');
    },
    thisURLFilename(){
      //console.log(document.location.pathname);
      let pathname=document.location.pathname;
      let paths=pathname.split('/');
      let pathLast=paths[paths.length-1];
      if(!pathLast) pathLast=paths[paths.length-2];
      //console.log(pathLast);
      this.thisURLName=pathLast;
    }
  },

  mounted(){
    this.thisURLFilename();
  }
};