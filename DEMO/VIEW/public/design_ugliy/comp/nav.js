export default {
  template:`
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
            <div class="title">사용자메뉴</div>
            <ul class="regular-text s-size-text">
                <li>
                    <a href="#">
                        <span class="material-symbols-rounded">logout</span>
                        <p class="user-menu-text">로그아웃</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="material-symbols-rounded">calendar_month</span>
                        <p class="user-menu-text">스케줄러</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="material-symbols-rounded">
                            desktop_windows
                        </span>
                        <p class="user-menu-text">사용자 화면</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="material-symbols-rounded">
                            description
                        </span>
                        <p class="user-menu-text">승인 / 결재</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="material-symbols-rounded">
                            account_balance
                        </span>
                        <p class="user-menu-text">인터넷뱅킹</p>
                    </a>
                </li>
            </ul>
        </div>
        <hr />
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
            <ul class="menu-list s-size-text regular-text">
                <li class="1depth">조회</li>
                <li class="1depth">지급 / 집금</li>
                <li class="1depth">
                    <a href="./popup.html" onclick="window.open(this.href, '_blank', 'width=1200px, height=1000px, toolbars=no, scrollbars=no'); return false;">당행전자결제</a>
                </li>
                <li class="1depth">타행전자결제</li>
                <li class="1depth">법인카드</li>
                <li class="1depth">ESP Manager</li>
                <li class="1depth">외환 / 파생</li>
                <li class="1depth">퇴직연금</li>
                <li class="1depth">세금공과금</li>
                <li class="1depth">전자세금계산서</li>
                <li class="1depth">특화서비스</li>
                <li class="1depth">정보관리</li>
                <li class="1depth">시스템관리</li>
                <li class="1depth">RCMS</li>
                <li class="1depth">통합 R&D 자금관리</li>
                <li class="1depth">대출</li>
                <li class="1depth">감사시스템</li>
                <li class="1depth">운영보고서</li>
            </ul>
        </div>
  `
};