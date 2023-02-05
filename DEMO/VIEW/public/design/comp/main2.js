import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div class="link-tap">
          <div class="home-button shadow-10">
              <a href="0.login.html"><span class="material-symbols-rounded">
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
      <div class="title-black">은행계좌통합조회</div>
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
      <div class="box shadow-20">
          <div class="select-container-top">
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 조회구분</h4>
                  <select>
                      <option class="s-size-text light-text">잔액조회</option>
                  </select>
              </div>
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 원화 / 외화</h4>
                  <select>
                      <option class="s-size-text light-text">원화</option>
                      <option class="s-size-text light-text">외화</option>
                  </select>
              </div>
          </div>
          <div class="select-container-middle">
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 조회기간</h4>
                  <div class="date-input-wrapper">
                      <input type="date" />
                      <p class="m-size-text medium-text">~</p>
                      <input type="date" />
                  </div>
              </div>
              <div class="date-button-container s-size-text regular-text">
                  <div class="gray-button">전일</div>
                  <div class="gray-button">당일</div>
                  <div class="gray-button">3일</div>
                  <div class="gray-button">7일</div>
                  <div class="gray-button">1개월</div>
                  <div class="gray-button">3개월</div>
                  <div class="gray-button">6개월</div>
              </div>
          </div>
          <div class="select-container-bottom">
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 계좌그룹</h4>
                  <select>
                      <option class="s-size-text light-text">전체</option>
                  </select>
              </div>
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 과목명</h4>
                  <select>
                      <option class="s-size-text light-text">전체</option>
                  </select>
              </div>
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 은행</h4>
                  <select>
                      <option class="s-size-text light-text">전체</option>
                  </select>
              </div>
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 소계</h4>
                  <select>
                      <option class="s-size-text light-text">전체</option>
                  </select>
              </div>
              <div class="select-wrapper">
                  <h4 class="m-size-text regular-text">• 통화</h4>
                  <select>
                      <option class="s-size-text light-text">전체</option>
                  </select>
              </div>
              <div class="checkbox">
                  <span class="material-symbols-rounded">
                      check_box_outline_blank
                  </span>
                  <p>은행명 셀병합</p>
              </div>
          </div>
      </div>
      <div class="box shadow-20 middle-box">
          <div class="table-wrapper">
              <table class="light-text m-size-text">
                  <tr>
                      <th>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </th>
                      <th>은행명</th>
                      <th>계좌번호</th>
                      <th>예금주</th>
                      <th>계좌종류</th>
                      <th>계좌별칭</th>
                      <th>잔액</th>
                      <th>최종조회날짜</th>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="text-wrpper">
          <div class="title-black">거래내역</div>
          <p class="medium-text m-size-text">· 위의 계좌를 선택하시면 거래내역이 조회됩니다.</p>
          <div class="blue-button">
              <div class="title">거래내역 ERP 연계</div>
          </div>
      </div>

      <div class="box shadow-20 bottom-box">
          <div class="table-wrapper">
              <table class="light-text s-size-text">
                  <tr>
                      <th>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </th>
                      <th>은행명</th>
                      <th>계좌번호</th>
                      <th>예금주</th>
                      <th>계좌종류</th>
                      <th>계좌별칭</th>
                      <th>잔액</th>
                      <th>최종조회날짜</th>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td><span class="material-symbols-rounded">
                          check_box_outline_blank
                      </span></td>
                      <td>우리은행</td>
                      <td>1002-050-844-551313</td>
                      <td>홍길동</td>
                      <td>기업자유예금</td>
                      <td></td>
                      <td>9,700,000</td>
                      <td>2022-08-22</td>
                  </tr>
              </table>
          </div>
      </div>
`;

export default {
  template:htmlTemplete
};