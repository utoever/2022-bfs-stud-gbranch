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
      <div class="title-black">B2B대출 납품대금조회 및 대출신청</div>
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
      <div class="top-box box shadow-20">
          <div class="text-wrapper">
              <input type="checkbox" />
              <h4 class="m-size-text regular-text">전 체 : 대표사업자인 경우 전체 부사업자에 대해 발행된 채권이 모드 조회됨</h4>
          </div>
          <div class="text-wrapper">
              <input type="checkbox" />
              <h4 class="m-size-text regular-text">주계약업체별 : 대표사업자인 경우 채권을 발행한 주계약업체별로 조회됨</h4>
          </div>
          <div class="text-wrapper">
              <input type="checkbox" />
              <h4 class="m-size-text regular-text">해당사업자별 : 해당 사업자에 대해 발행채권만 조회됨</h4>
          </div>
          <div class="bottom">
              <div class="select-wrapper">
                  <h4 class="m-size-text medium-text">주계약업체</h4>
                  <select>
                      <option>업체명 / 135-81-71759 (055)</option>
                  </select>
              </div>
              <div class="blue-button">조회</div>
          </div>
      </div>
      <div class="box shadow-20 middle-box">
          <div class="left">
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">주계약업체명</h4>
                  <input type="text" placeholder="업체명" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">사업자등록번호</h4>
                  <input type="text" placeholder="135-81-71759" disabled />
              </div>
          </div>
          <div class="center">
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">한도금액</h4>
                  <input type="text" placeholder="0" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">대출잔액</h4>
                  <input type="text" placeholder="202,606,521" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">한도여유액</h4>
                  <input type="text" placeholder="0" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">한도기일</h4>
                  <input type="text" placeholder="2022-08-22" disabled />
              </div>
          </div>
          <div class="right">
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">30일 이하</h4>
                  <input type="text" placeholder="5,306" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">60일 이하</h4>
                  <input type="text" placeholder="5,870" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">90일 이하</h4>
                  <input type="text" placeholder="6,306" disabled />
              </div>
              <div class="contents-wrapper">
                  <h4 class="m-size-text regular-text">180일 이하</h4>
                  <input type="text" placeholder="7,306" disabled />
              </div>
          </div>
      </div>
      <div class="text-container">
          <h4 class="m-size-text bold-text">※ 상기 표시된 대출이름은 오늘 대출을 실행할 경우 총액한도 대출대상에 적용되는 금리입니다.</h4>
          <h4 class="m-size-text regular-text">- 대출이자율 : 대출일직전 3영업일간의 91을CD유통수익률단순평균 + 기간별가산금리</h4>
          <h4 class="m-size-text bold-text">※ 채권양도일자가 조회되지 않는 업체의 경우 채권양도신청을 먼저 하신 후 2-3 영업일 후에 대출이 가능합니다.</h4>
      </div>
      <div class="bottom-box box shadow-20">
          <div class="table-wrapper">
              <table class="light-text m-size-text">
                  <tr>
                      <th>선택</th>
                      <th>채권번호</th>
                      <th>채권상태</th>
                      <th>금액</th>
                      <th>대출가능금액</th>
                      <th>세금계산서등록여부</th>
                      <th>세금계산서등록금액</th>
                      <th>접수날짜</th>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>0496-20190730550</td>
                      <td>정상</td>
                      <td>550</td>
                      <td>550</td>
                      <td>미등록</td>
                      <td>0</td>
                      <td>2022-08-22</td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="bottom-text-container">
          <h4 class="m-size-text bold-text">※ 만기일이 휴일인 경우 익영업일로 표시됩니다.</h4>
          <div class="button-container">
              <div class="gray-button m-size-text medium-text">채권양도</div>
              <div class="blue-button m-size-text medium-text">세금계산서 등록</div>
              <div class="blue-button m-size-text medium-text">대출신청</div>
              <div class="blue-button m-size-text medium-text">취소동의</div>
          </div>
      </div>
`;

export default {
  template:htmlTemplete
};