<template>
  <div class="authLogin">
    <!-- <CommonHeader @click-left="$router.push('/')" /> -->
    <!-- <div class="d-flex flex-column align-items-center" v-if="loginMethod == ''">
                  <div class="logoBox">
                        <img width="62" height="48" :src="require('@/assets/img/amainLogo.png')" alt="" />
                  </div>
                  <div class="primaryLoginBtn rounded-1 fs-5" @click="handleLogin(0)">
                        <WeChatIcon class="me-2" color="#fff" width="16" height="16" />微信登录
                  </div>
                  <div class="mobileLoginBtn rounded-1 mt-4 fs-5" @click="handleLogin(1)">
                        <MobilePhoneIcon class="me-2" :color="$primary" width="18" height="18" />手机号登录
                  </div>
            </div> -->
    <!-- v-if="loginMethod == 'mobile'" -->
    <div class="d-flex mobileWay bg-white flex-column align-items-center fs-5">
      <div class="mobileWaylogoBox">
        <!-- <img :src="require('@/assets/img/amainLogo1.png')" alt="" /> -->
        <img :src="require('@/assets/img/amainLogo.png')" />
      </div>

      <div class="inputBox flex-center" style="margin-top: 0.8rem">
        <img src="../../assets/img/tel.png" class="loginIcon" alt="" />
        <input
          v-model="phoneNumbers"
          v-on:input="onCount($event, phoneNumbers)"
          style="margin-left: 5px"
          type="text"
          class="flex-grow-1"
          placeholder="请输入手机号"
        />
      </div>
      <div
        class="inputBox d-flex justify-content-between align-items-center mb-5"
      >
        <img src="../../assets/img/message.png" class="loginIcon" alt="" />
        <input
          style="margin-left: 5px"
          v-model="code"
          oninput="this.value=this.value.slice(0,6)"
          class="codeInput flex-grow-1"
          type="text"
          maxlength="6"
          placeholder="请输入验证码"
        />
        <div class="getCode flex-center" @click="clickGetCode" id="codeText">
          {{ codeText }}
        </div>
      </div>
      <div class="primaryLoginBtn rounded-1 mt-5 fs-5" @click="clickLogin">
        立即开启尊贵之旅
      </div>
      <!-- <div class="mt-5 agreement">
        <div class="agreement_top">
          <van-checkbox
            class="checkbox"
            shape="square"
            v-model="checked"
          ></van-checkbox>
          <span class="agree">
            未注册用户将自动注册amain账号，勾选表示您已同意</span
          >
        </div>
        <div class="agreement_bottom">
          <a>《amain用户服务协议》</a>
          <a>《amain隐私权政策》</a>
        </div>
      </div> -->
      <!-- <div class="mt-5" @click="loginMethod = ''">
                        其他登录方式 >
                  </div> -->
    </div>
  </div>
</template>
<script>
import { sendCodeData, $login } from "../../api";
import CommonHeader from "@/components/CommonHeader";
import { Toast } from "vant";
export default {
  components: {
    CommonHeader,
  },
  data() {
    return {
      checked: true,
      loginMethod: "",
      codeText: "获取验证码",
      phoneNumbers: "",
      code: "",
      codeTimer: null,
      environment: "normal",
    };
  },
  mounted() {
    let userAgent = window.navigator.userAgent;
    console.log(userAgent);
    if (userAgent.toLowerCase().includes("micromessenger")) {
      this.environment = "weixin";
    } else {
      this.environment = "normal";
      this.loginMethod = "mobile";
    }
  },
  methods: {
    onCount(obj, x) {
      if (/^1[0-9]{10}$/.test(x)) {
        document.getElementById(
          "codeText"
        ).style.cssText = `color:#ff6b00;border:0.1rem solid #ff6b00;opacity:1`;
      }
    },
    handleLogin(way) {
      // if (way == 0) {
      //wxLoginType：0为微信浏览器，1为其他浏览器
      // this.$http.post("/m/common/login/api/login", { type: 0, wxLoginType: this.environment == "weixin" ? 0 : 1 }).then(e => {
      //       if (e.result == 0) {
      //       } else {
      //             this.$toast(e.msg || "请求失败");
      //       }
      // });
      // var obj = new WxLogin({
      //       self_redirect: false,
      //       id: "app",
      //       appid: "wx4568118f8b44f384",
      //       scope: "snsapi_login",
      //       redirect_uri: "http://a402116608.oicp.vip/m/bank/weinxin/api/common/logincallback",
      //       state: "",
      //       style: "black",
      //       href: "",
      // });
      // } else if (way == 1) {
      //       this.loginMethod = "mobile";
      // }
    },
    clickLogin() {
      if (!/^1[0-9]{10}$/.test(this.phoneNumbers))
        return this.$toast("手机号格式不符");

      // if (!/^\d{6}$/.test(this.code)) return this.$toast("验证码格式不符");
      // 参数对象
      let paramsObj = {
        code: this.code,
        phone: this.phoneNumbers,
      };
      $login(paramsObj).then((e) => {
        localStorage.setItem("amain_token", JSON.stringify(e.token));
        localStorage.setItem("loginPhone", JSON.stringify(this.phoneNumbers));
        if (e.code == 200) {
          Toast.loading({
            message: "登录成功",
            forbidClick: true,
          });

          // Toast.success('登录成功')
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        } else {
          this.$toast(e.msg || "登录失败");
        }
      });
    },
    sendCode() {
      sendCodeData(this.phoneNumbers).then((e) => {
        if (e.code == 200) {
          this.$toast("发送成功");
        } else {
          clearInterval(this.codeTimer);
          this.codeText = "获取验证码";
          this.$toast(e.msg || "发送失败");
        }
      });
    },
    clickGetCode() {
      if (!/^1[0-9]{10}$/.test(this.phoneNumbers))
        return this.$toast("手机号格式不符");
      if (this.codeText == "获取验证码" || this.codeText == "重新发送") {
        this.sendCode();
        this.codeText = "59S";
        let codeNum = 59;
        this.codeTimer = setInterval(() => {
          codeNum--;
          this.codeText = codeNum + "S";
          if (codeNum == 0) {
            this.codeText = "重新发送";
            clearInterval(this.codeTimer);
          }
        }, 1000);
      } else {
        this.$toast("请" + this.codeText + "后重试");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loginIcon {
  width: 6%;
  opacity: 0.8;
}
.authLogin {
  background-color: #f2f5f4;
  svg {
    transform: translateY(4%);
  }
  .logoBox {
    margin: 22vw 0 19vw;
  }
  .primaryLoginBtn,
  .mobileLoginBtn {
    width: 90vw;
    height: 12vw;
    @extend .flex-center;
    position: relative;
    &:active {
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
  .primaryLoginBtn {
    background: linear-gradient(90deg, #ff974c, #ff6b00);
    font-size: 0.8rem !important;
    font-weight: bold;
    margin-top: 0px;
  }
  .primaryLoginBtn {
    background-color: $primary;
    color: #ffffff;
  }
  .mobileLoginBtn {
    border: 1px solid $primary;
    color: $primary;
  }
  .mobileWay {
    height: 100vh;
    .mobileWaylogoBox {
      width: 100%;
      /* width: 30vw; */
      /* margin: 6vw 0; */
    }
    .inputBox {
      width: 92vw;
      height: 12vw;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.07);

      input {
        border: none;
        outline: none;
        background-color: transparent;
      }
      .codeInput {
      }
      .getCode {
        border: 1px solid #999;
        opacity: 0.4;
        border-radius: 30px;
        width: 24vw;
        height: 7vw;
        color: #999;
      }
    }
  }
  .checkbox {
    display: inline-block;
    color: #999;
    /deep/ .van-checkbox__icon {
      font-size: 13px;
    }
  }
  .agree {
    font-size: 13px;
    color: #999;
    margin-left: 0.3rem;
  }
  .agreement {
    line-height: 1.42rem;
  }
  .agreement_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .agreement_bottom {
    color: #ff6b00;
    font-size: 13px;
  }
}
</style>
