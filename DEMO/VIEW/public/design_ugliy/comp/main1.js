export default {
  template:`
        <div class="link-tap">
            <div class="home-button shadow-10">
                <a href="index.htm"><span class="material-symbols-rounded">
                    home
                </span></a>
            </div>
            <ul class="visited-tab">
                <li>
                    <div>
                        <p></p>
                        <span></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="main-box-wrapper">
            <div class="main-box">
                <div class="main-notice-top">
                    <h2 class="title-black bold-text">통합공지사항</h2>
                    <div class="blue-button s-size-text medium-text">더보기</div>
                </div>
                <div class="box shadow-20">
                    <ul class="main-notice-list">
                        <li>
                            <p class="m-size-text regular-text main-notice-content">ESP-CMS 원격지원 서비스 지원 안내</p>
                            <p class="xs-size-text light-text">2022-08-10</p>
                        </li>
                        <li>
                            <p class="m-size-text regular-text main-notice-content">ESP-CMS 원격지원 서비스 지원 안내</p>
                            <p class="xs-size-text light-text">2022-08-10</p>
                        </li>
                        <li>
                            <p class="m-size-text regular-text main-notice-content">ESP-CMS 원격지원 서비스 지원 안내</p>
                            <p class="xs-size-text light-text">2022-08-10</p>
                        </li>
                        <li>
                            <p class="m-size-text regular-text main-notice-content">ESP-CMS 원격지원 서비스 지원 안내</p>
                            <p class="xs-size-text light-text">2022-08-10</p>
                        </li>
                        <li>
                            <p class="m-size-text regular-text main-notice-content">ESP-CMS 원격지원 서비스 지원 안내</p>
                            <p class="xs-size-text light-text">2022-08-10</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-box">
                <h2 class="title-black bold-text">현황보기</h2>
                <div class="box shadow-20 main-status">
                    <div class="main-status-tap">
                        <div class="blue-button bold-text s-size-text">승인 / 결재</div>
                        <div class="gray-button bold-text s-size-text">스케줄 현황</div>
                        <div class="gray-button bold-text s-size-text">시스템 현황</div>
                    </div>
                    <ul class="main-status-list">
                        <li>
                            <p class="regular-size-text medium-text">결재 대상</p>
                            <span class="regular-size-text medium-text">0</span>
                        </li>
                        <li>
                            <p class="regular-size-text medium-text">결재 완료</p>
                            <span class="regular-size-text medium-text">0</span>
                            <a href="#">
                                <p class="s-size-text light-text">결재창 바로가기</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-box">
                <h2 class="title-black bold-text">금융자산현황</h2>
                <div class="box shadow-20">
                    <div class="table-wrapper">
                        <table class="asset-status medium-text m-size-text">
                            <tr>
                                <th>구분</th>
                                <th>당행 금액 잔액</th>
                                <th>타행 금액 잔액</th>
                            </tr>
                            <tr>
                                <th>입 / 출금식 예금</th>
                                <td>35,559,995,999,000</td>
                                <td>995,999,000</td>
                            </tr>
                            <tr>
                                <th>예 / 적금</th>
                                <td>1,588,559,900</td>
                                <td>1,588,559,900</td>
                            </tr>
                            <tr>
                                <th>신탁 / 펀드</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>대출</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <h2 class="title-black bold-text">통화별 현황</h2>
                <div class="box shadow-20">
                    <div class="table-wrapper">
                        <table class="asset-status medium-text m-size-text">
                            <tr>
                                <th>구분</th>
                                <th>당행 금액 잔액</th>
                                <th>타행 금액 잔액</th>
                                <th>구분</th>
                                <th>당행 금액 잔액</th>
                                <th>타행 금액 잔액</th>
                            </tr>
                            <tr>
                                <th>EUR</th>
                                <td>0</td>
                                <td>0</td>
                                <th>EUR</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>GBP</th>
                                <td>0</td>
                                <td>0</td>
                                <th>GBP</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>HKD</th>
                                <td>0</td>
                                <td>0</td>
                                <th>HKD</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>JPY</th>
                                <td>0</td>
                                <td>0</td>
                                <th>JPY</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>KRW</th>
                                <td>0</td>
                                <td>0</td>
                                <th>KRW</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>USD</th>
                                <td>0</td>
                                <td>0</td>
                                <th>USD</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <h2 class="title-black bold-text">자금관리 서비스</h2>
                <div class="box shadow-20 main-management-services-container">
                    <div>
                        <span class="material-symbols-rounded">
                            arrow_back_ios
                        </span>
                    </div>
                    <div class="main-management-services-wrapper">
                        <div class="main-management-services">
                            <h3 class="medium-text m-size-text">전자 세금 계산서</h3>
                            <p class="light-text s-size-text">세금계산서를 인터넷을 통해<br />주고 받을 수 있는 서비스</p>
                            <span class="material-symbols-rounded">
                                receipt_long
                            </span>
                        </div>
                        <div class="main-management-services">
                            <h3 class="medium-text m-size-text">ESP Manager</h3>
                            <p class="light-text s-size-text">고객이 보유한 모든 종류의<br />내용을 통합관리</p>
                            <span class="material-symbols-rounded">
                                manage_accounts
                            </span>
                        </div>
                        <div class="main-management-services">
                            <h3 class="medium-text m-size-text">뱅킹계약 서비스</h3>
                            <p class="light-text s-size-text">인터넷뱅킹 계약 서비스</p>
                            <span class="material-symbols-rounded">
                                alarm
                            </span>
                        </div>
                    </div>
                    <div>
                        <span class="material-symbols-rounded">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="main-currency-top">
                    <h2 class="title-black bold-text">환율 / 금리</h2>
                    <div class="blue-button s-size-text medium-text">더보기</div>
                </div>
                <div class="box shadow-20">
                    <div class="main-status-tap">
                        <div class="blue-button bold-text s-size-text">환율</div>
                        <div class="gray-button bold-text s-size-text">금리</div>
                    </div>
                    <div class="table-wrapper">
                        <table class="currency medium-text m-size-text">
                            <tr>
                                <th>구분</th>
                                <th>단위</th>
                                <th>사실 때</th>
                                <th>파실 때</th>
                            </tr>
                            <tr>
                                <th>USD</th>
                                <td>1달러</td>
                                <td>1,364.97</td>
                                <td>3,318.03</td>
                            </tr>
                            <tr>
                                <th>JPY</th>
                                <td>100엔</td>
                                <td>995.64</td>
                                <td>961.40</td>
                            </tr>
                            <tr>
                                <th>EUR</th>
                                <td>100유로</td>
                                <td>137,127.00</td>
                                <td>131,777.0</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  `
};