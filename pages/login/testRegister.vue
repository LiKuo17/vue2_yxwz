<template>
  <div class="login">
    <header>
      <div class="close">
        <van-icon class="close_icon" name="cross" @click="back" />
      </div>
    </header>

    <section>
      <article class="a1">
        <div class="title">
          <h1>注册</h1>
        </div>
      </article>
      <article class="a1">
        <div class>
          <div class="card">
            <van-cell-group>
              <van-field
                type="text"
                placeholder="请输入账号(至少6位数字/字母)"
                v-model="uid"
              />
            </van-cell-group>
          </div>
          <div class="card">
            <van-cell-group>
              <van-field
                type="password"
                placeholder="请输入密码"
                v-model="password"
              />
            </van-cell-group>
          </div>
          <div class="card">
            <van-cell-group>
              <van-field
                type="password"
                placeholder="请再次输入密码"
                v-model="password_again"
              />
            </van-cell-group>
          </div>
        </div>
      </article>
      <article class="a1"></article>
      <article class="a1">
        <van-button class="login_button" size="large" @click="doRegister" round
          >立即注册</van-button
        >
        <div class="register">
          <span>已有帐号？</span
          ><span @click="$router.push('/login')">登录</span>
        </div>
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import {
  Icon,
  Cell,
  CellGroup,
  Field,
  Button,
  Notify,
  Loading,
  Toast,
} from "vant";
export default {
  name: "Home",
  data() {
    return {
      uid: "",
      password: "",
      password_again: "",
    };
  },
  created() {
    // Notify('您还未登录或登录已超时');
  },
  mounted() {
    isApp().then(() => {
      setTimeout(() => {
        setBackButtonVisible(false);
      }, 100);
    });
  },
  methods: {
    doRegister() {
      if (!(this.uid && this.password && this.password_again)) {
        this.$toast("请填完所有信息");
        return false;
      }
      if (!/^[0-9a-zA-Z]{6,}$/.test(this.uid)) {
        this.$toast("用户名应为至少6位的数字/字母");
        return false;
      }
      if (this.password.length < 6) {
        this.$toast("密码长度至少6位");
        return false;
      }
      if (this.password != this.password_again) {
        this.$toast("两次密码输入不一致");
        return false;
      }
      this.$toast.loading();
      this.$http
        .post("/m/common/login/api/register", {
          uid: this.uid,
          password: this.password,
          password_again: this.password_again,
        })
        .then((e) => {
          if (e.result == 0) {
            this.$toast({
              message: "注册成功",
              type: "success",
              overlay: true,
              duration: 1200,
            });
            setTimeout(() => {
              this.$router.back();
            }, 1200);
          } else {
            this.$toast(e.msg);
          }
        });
    },
    back() {
      this.$router.push("/login");
    },
    goRegister() {
      //this.$router.push('/register');
    },
    goLogin1() {
      //this.$router.push('/login1');
    },
    goForgetPwd() {
      //this.$router.push('/forgetPassword');
    },
  },
  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Notify.name]: Notify,
    [Loading.name]: Loading,
    [Toast.name]: Toast,
  },
};
</script>

<style></style>

<style scoped="scoped">
.a1 >>> .van-button {
  /* background-color: #ff7e49;
  border: 1px solid #ff7e49; */
  background-color: #e92758;
  border: 1px solid #e92758;
  color: #ffffff;
  box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.3);
}
.register {
  margin-top: 2vw;
  float: right;
  color: #ffffff;
  /* text-decoration: underline; */
}
.register > span:first-child {
  text-decoration: underline;
}
.register > span:last-child {
  color: #276ace;
  text-decoration: underline;
  cursor: pointer;
}
.login {
  width: 750px;
  height: 100vh;
  /* background-color: black; */
  background: linear-gradient(135deg, #29bdd9, #276ace, #ff9569, #e92758);
  color: white;
  text-align: left;
}

.card {
  background-color: #434753;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 50px;
}

.bindCard_d {
  padding: 0 75px;
  margin-top: 140px;
}

.close {
  padding: 69px 32px;
}

footer {
  display: inline-block;
  float: left;
}

.close_icon {
  font-size: 38px;
}

.a1 {
  padding: 0 75px;
}

.title > h1 {
  font-size: 48px;
  font-weight: 500;
}

.login_type {
  color: #999999;
  font-size: 20px;
  line-height: 70px;
}

.login_type > span:nth-child(1) {
  float: left;
}

.login_type > span:nth-child(2) {
  float: right;
}

.login_button {
  margin-top: 50px;
}
</style>
