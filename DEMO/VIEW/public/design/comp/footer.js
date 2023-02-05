import * as ut from "../src/js/ut.js";

const htmlTemplete=`
      <div ref="footerLink">
          <p class="light-text xs-size-text">COPYRIGHT {{thisYear}} ESP SYSTEM ALL RIGHTS RESERVED.</p>
      </div>
      <div class="logo-wrapper" ref="footerLogo">
          <img src="src/img/logo_white.png" alt="푸터 로고" />
      </div>
`;

export default {
  template:htmlTemplete,
  data:()=>{ return {
    thisYear:ut.mkDate().year
  }},
  methods:{
    href(url){
      document.location.href=url;
    }
  },
  mounted(){
    this.eventBus.on('click2c',(args)=>{
      alert(args[0]+args[1]+' to footer from parent');
    })
  }
};