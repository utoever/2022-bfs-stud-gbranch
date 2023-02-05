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
      <div class="title-black">은행정보등록</div>
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
      <div class="box shadow-20 top-box">
          <div class="top">
              <div class="check-wrapper">
                  <input type="checkbox" />
                  <h4 class="m-size-text bold-text">인터넷뱅킹계좌</h4>
              </div>
              <div class="check-wrapper">
                  <input type="checkbox" />
                  <h4 class="m-size-text bold-text">스피드계좌</h4>
              </div>
              <div class="m-size-text bold-text">
                  <span class="material-symbols-rounded">
                      notifications
                  </span>
                  <p>일반 입출금계좌 외에는 은행에 따라 조회가 불가할 수 있습니다.</p>
              </div>
              <div class="button-wrapper">
                  <div class="m-size-text medium-text  gray-button">수수료 설정</div>
                  <div class="m-size-text medium-text  gray-button">새로고침</div>
              </div>
          </div>
          <div class="middle">
              <div class="left">
                  <div>
                      <h4 class="m-size-text medium-text">은행명</h4>
                      <select>
                          <option>
                              우리은행
                          </option>
                      </select>
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">로그인 ID</h4>
                      <select>
                          <option>
                              testespsys01
                          </option>
                      </select>
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">인증서명</h4>
                      <select>
                          <option>
                              테스트 ESPCMS(DFDF)0020202
                          </option>
                      </select>
                  </div>
                  <div class="blue-button m-size-text medium-text ">은행계좌 추가등록</div>
              </div>
              <div class="right">
                  <div class="table-wrapper">
                      <table class="light-text m-size-text">
                          <tr>
                              <th>등록구분</th>
                              <th>계좌등록방법</th>
                              <th>은행명</th>
                              <th>계좌번호</th>
                              <th>그룹명</th>
                              <th>과목명</th>
                              <th>계좌종류</th>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>
                          <tr>
                              <td>
                                  <span class="material-symbols-rounded">
                                      check_box_outline_blank
                                  </span>
                              </td>
                              <td>등록</td>
                              <td>자동등록</td>
                              <td>국민은행</td>
                              <td>105-134-58798</td>
                              <td>미지정</td>
                              <td>미지정</td>
                          </tr>

                      </table>
                  </div>
              </div>
          </div>
          <div class="bottom">
              <div>
                  <h4 class="m-size-text medium-text">계좌 PW</h4>
                  <input type="password" />
              </div>
              <div>
                  <h4 class="m-size-text medium-text">이체 PW</h4>
                  <input type="password" />
              </div>
              <div>
                  <h4 class="m-size-text medium-text">빠른조회 ID</h4>
                  <input type="text" />
              </div>
              <div>
                  <h4 class="m-size-text medium-text">빠른조회 PW</h4>
                  <input type="password" />
              </div>
              <div class="blue-button m-size-text medium-text">일괄적용</div>
              <div class="gray-button m-size-text medium-text">초기</div>
              <div class="gray-button m-size-text medium-text">저장</div>
          </div>
      </div>
      <div class="box shadow-20 bottom-box">
          <div class="top">
              <div>
                  <h4 class="m-size-text medium-text">은행명</h4>
                  <select>
                      <option>전체</option>
                  </select>
              </div>
              <div>
                  <h4 class="m-size-text medium-text">그룹명</h4>
                  <select>
                      <option>전체</option>
                  </select>
              </div>
              <div class="button-container">
                  <div class="gray-button m-size-text medium-text">계좌정보ERP연계</div>
                  <div class="gray-button m-size-text medium-text">추가등록</div>
                  <div class="blue-button m-size-text medium-text">삭제</div>
              </div>
          </div>
          <div class="table-wrapper">
              <table class="light-text m-size-text">
                  <tr>
                      <th>선택</th>
                      <th>등록구분</th>
                      <th>계좌등록방법</th>
                      <th>은행명</th>
                      <th>계좌번호</th>
                      <th>그룹명</th>
                      <th>과목명</th>
                      <th>계좌종류</th>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>
                  <tr>
                      <td>
                          <span class="material-symbols-rounded">
                              check_box_outline_blank
                          </span>
                      </td>
                      <td>등록</td>
                      <td>자동등록</td>
                      <td>국민은행</td>
                      <td>105-134-58798</td>
                      <td>미지정</td>
                      <td>미지정</td>
                      <td>자유</td>
                  </tr>

              </table>
          </div>
      </div>
`;

export default {
  template:htmlTemplete
};