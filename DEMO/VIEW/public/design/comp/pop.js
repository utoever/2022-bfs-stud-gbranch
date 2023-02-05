import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div class="title-black">어음별세금계산서등록</div>
      <div class="box shadow-20 top-box">
          <div class="left">
              <div>
                  <h4 class="m-size-text medium-text">상품명</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">어음 / 채권상태</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">대출실행금액</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">만기일</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">협력업체사업자번호</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">세금계산서오류건수</h4>
                  <input type="text">
              </div>
          </div>
          <div class="right">
              <div>
                  <h4 class="m-size-text medium-text">상품명</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">어음 / 채권상태</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">대출실행금액</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">만기일</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">협력업체사업자번호</h4>
                  <input type="text">
              </div>
              <div>
                  <h4 class="m-size-text medium-text">세금계산서오류건수</h4>
                  <input type="text">
              </div>
          </div>
      </div>
      <div class="box shadow-20 middle-box">
          <div class="input-wrapper">
              <h4 class="medium-text m-size-text">세금계산서대출신청 총금액</h4>
              <input type="text" placeholder="0" disabled>
          </div>
          <p class="m-size-text regular-text">• 대출신청 총금액은 세금계산서 내 대출신청금액의 총 합산입니다.</p>
          <p class="m-size-text regular-text">• 대출은 세금계산서내 대출신청금액 만큼만 가능하며, 대출신청 내에서 따로 금액수정은 불가능합니다.</p>
          <p class="m-size-text regular-text">• 전자세금계산서는 24자리를 종이세금계산서는 8자리 이하를 입력해 주시기 바랍니다.</p>
          <p class="m-size-text regular-text">• 종이세금계산서의 입력된 번호는 고유번호로 맞추기 위해 사업자번호 (공급자) * 계산서발행년도 가 자동 추가됩니다.</p>
      </div>
      <div class="box shadow-20 bottom-box">
          <div class="top">
              <div class="left">
                  <div>
                      <h4 class="m-size-text medium-text">세금계산서종류</h4>
                      <select>
                          <option>종이세금계산서</option>
                      </select>
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">공급자사업자번호</h4>
                      <input type="text" class="input-short" />
                      <div class="gray-button">등록</div>
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">공급받는자사업자번호</h4>
                      <input type="text" class=" input-short" />
                      <div class="gray-button">등록</div>
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">세금계산서작성일</h4>
                      <input type="date" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">대출신청금액</h4>
                      <input type="text" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">기대출신청총금액</h4>
                      <input type="text" disabled />
                  </div>

              </div>
              <div class="right">
                  <div>
                      <h4 class="m-size-text medium-text">세금계산서번호</h4>
                      <input type="text" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">공급자사업자명</h4>
                      <input type="text" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">공급받는자사업자명</h4>
                      <input type="text" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">세금계산서총금액</h4>
                      <input type="text" />
                  </div>
                  <div>
                      <h4 class="m-size-text medium-text">세금계산서공급가액</h4>
                      <input type="text" />
                  </div>
              </div>
          </div>
          <div class="bottom">
              <div class="blue-button m-size-text medium-text">기등록 세금계산서</div>
              <div class="right-button-wrapper">
                  <div class="blue-button m-size-text medium-text">사전조회</div>
                  <a href="0.login.html"><div class="blue-button m-size-text medium-text">확인</div></a>
              </div>
          </div>
          <div class="table-wrapper">
              <table class="light-text m-size-text">
                  <tr>
                      <th>세금계산서 종류</th>
                      <th>세금계산서 번호</th>
                      <th>공급자 사업자번호</th>
                      <th>공급받는자 사업자번호</th>
                      <th>발행일</th>
                      <th>총금액</th>
                      <th>공급가액</th>
                  </tr>

              </table>
          </div>
      </div>
      <div style="float:right;margin-top:20px;">
          <a href="#" @click="popupClose()"><div class="blue-button m-size-text medium-text">닫기</div></a>
      </div>
`;

export default {
  template:htmlTemplete,
  data:()=>{return{
  }},
  methods:{
    popupClose(){
      window.close();
    }
  }
};