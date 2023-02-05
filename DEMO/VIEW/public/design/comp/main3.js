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
      <div class="title-black">집금계좌등록</div>
      <div class="box shadow-20 top-box">
          <div class="left">
              <h4 class="m-size-text regular-text">• 집금그룹명</h4>
              <input type="text" placeholder="집금테스트" />
          </div>
          <div class="right">
              <div>
                  <h4 class="m-size-text regular-text">• 입금은행</h4>
                  <select>
                      <option>
                          우리은행
                      </option>
                  </select>
              </div>
              <div>
                  <h4 class="m-size-text regular-text">• 입금계좌 (별칭)</h4>
                  <select>
                      <option>
                          1005-201-769484
                      </option>
                  </select>
              </div>
          </div>
      </div>
      <div class="box shadow-20 middle-box">
          <div class="left">
              <div class="top">
                  <div>
                      <h4 class="m-size-text regular-text">• 계좌그룹</h4>
                      <select>
                          <option>
                              전체
                          </option>
                      </select>&nbsp; &nbsp; 
                  </div>
                  <div>
                      <h4 class="m-size-text regular-text">• 출금은행</h4>
                      <select>
                          <option>
                              전체
                          </option>
                      </select>
                  </div>
              </div>
              <div class="middle">
                  <div>
                      <h4 class="m-size-text regular-text">• 계좌검색조건</h4>
                      <select>
                          <option>
                              전체
                          </option>
                      </select>&nbsp; &nbsp; 
                      <input type="text" />
                  </div>
              </div>
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
          <div class="center">
              <div class="shadow-10">
                  <span class="material-symbols-rounded">
                      keyboard_double_arrow_right
                  </span>
              </div>
              <div class="shadow-10">
                  <span class="material-symbols-rounded">
                      keyboard_double_arrow_left
                  </span>
              </div>
          </div>
          <div class="right">
              <div class="top">
                  <h4 class="m-size-text regular-text">• 등록된 출금계좌</h4>
                  <div class="icons">
                      <h4 class="m-size-text regular-text">• 집금순번변경</h4>
                      <span class="material-symbols-rounded">
                          arrow_circle_up
                      </span>
                      <span class="material-symbols-rounded">
                          arrow_circle_down
                      </span>
                  </div>
              </div>
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
                  </table>
              </div>
          </div>
      </div>
      <div class="box shadow-20 bottom-box">
          <div class="top">
              <h4 class="m-size-text regular-text">• 집금방법</h4>
              <select>
                  <option>
                      전액
                  </option>
              </select>
              <h4 class="m-size-text regular-text">• 기준금액</h4>
              <input type="number" placeholder="0" />
              <h4 class="m-size-text regular-text">• 출금기준</h4>
              <select>
                  <option>
                      총잔액
                  </option>
              </select>
          </div>
          <div class="bottom">
              <h4 class="m-size-text regular-text">• 통장기재내역</h4>
              <input type="text" />
              <div class="check">
                  <span class="material-symbols-rounded">
                      check_box_outline_blank
                  </span>
                  <h4 class="m-size-text regular-text">출금계좌 별칭입력</h4>
              </div>
              <div class="button-wrapper">
                  <div class="blue-button m-size-text medium-text">일괄적용</div>
                  <div class="gray-button m-size-text medium-text">등록</div>
              </div>
          </div>
      </div>
`;

export default {
  template:htmlTemplete
};