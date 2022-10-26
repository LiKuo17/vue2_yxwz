<template>
  <div class="ssologincallBack">
    <section>
      <div class="tiptext">正在验证登录，请稍候...</div>
      <div style="padding-top: 80px">
        <van-button plain hairline type="danger" @click="goHome()">取 消</van-button>
      </div>
    </section>
    <div style="padding-top: 100px"></div>
  </div>
</template>

<script>
  import {
    Button,
    NavBar,
    Toast
  } from "vant";

  export default {
    name: "ssologinCallBack",
    data() {
      return {
        params: this.$route.query.resp
      };
    },
    mounted: function() {
      if (!this.params) {
        alert("非法回调");
        return;
      }
      this.checkLogin();
		},
    methods: {
      goHome() {
        this.$router.push("/");
        //window.history.go(window.history.length*-1);
      },
      checkLogin() {
        //console.log("模拟登录");
        var _this = this;
        _this.$http
          .post("/m/bank/minsheng/login/api/common/ssologin_callback", {
            params: this.params
          })
          .then(function(e) {
            console.log(e);
            if (e.result == 0) {
              // 登录成功
              Toast.success('登录成功');
              if (window.history.length < 1) {
                _this.$router.push({
                  path: "/"
                });
                return false;
              } else {
                _this.$router.go(-1);
              }
            } else {
              Toast(e.msg);
            }
          });
      }
    },
    watch: {
      $route(to, from) {
        this.$router.go(0);
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Button.name]: Button,
      [Toast.name]: Toast
    }
  };
</script>
<style>
  @import url("../../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tiptext {
    text-align: center;
    padding-top: 200px;
  }

  .ssologincallBack{
    height: 100vh;
  }
</style>
