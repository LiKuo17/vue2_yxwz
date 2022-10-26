<template>
    <div class="logingDiv">
        <div class="closeDiv">
            <strong class="close_icon" @click="back">取消</strong>
        </div>

        <div class="userDiv">
            <div class="userImg">
                <van-image round width="72px" height="72px" :src="userImg" />
            </div>
            <div class="title">欢迎回来</div>
            <div class="clearDiv"></div>
        </div>
        <van-form @submit="doLogin" class="formDiv">
            <div class="inputDiv">
                <div class="inputK">
                    <van-field
                        class="inputL"
                        v-model="mobile"
                        name="mobile"
                        :clearable="true"
                        type="tel"
                        placeholder="输入手机号"
                        label="+86"
                        :border="false"
                        label-width="30"
                        @input="getUserImg"
                    />
                </div>
                <div class="inputK" v-show="type == 1">
                    <van-field
                        class="inputL"
                        v-model="code"
                        name="code"
                        :clearable="true"
                        type="text"
                        placeholder="输入验证码"
                        maxlength="6"
                        :border="false"
                    >
                        <template #button>
                            <div class="sendCodeDiv">
                                <a class="sendCode" @click="sendCode">
                                    <span v-show="codeStatus">发送验证码</span>
                                    <span v-show="!codeStatus">
                                        重新获取
                                        <van-count-down ref="countDown" :time="time" :auto-start="false" format="ss" @finish="finish" />s
                                    </span>
                                </a>
                            </div>
                        </template>
                    </van-field>
                </div>
                <div class="inputK" v-show="type != 1">
                    <van-field
                        class="inputL"
                        v-model="password"
                        name="password"
                        :clearable="true"
                        type="password"
                        placeholder="输入密码"
                        :border="false"
                    />
                </div>
                <div class="otherDiv">
                    <a @click="switchLogin()">{{ type == 0 ? "验证码登录" : "密码登录" }}</a>
                </div>
            </div>
            <div class="buttonDiv">
                <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { Icon, Cell, CellGroup, Form, Field, Button, Notify, Loading, Toast, Image, CountDown } from "vant";
export default {
    name: "login",
    data() {
        return {
            type: 1,
            mobile: "",
            password: "",
            code: "",
            userImg: "https://img.yzcdn.cn/vant/cat.jpeg",
            codeStatus: true,
            time: 60 * 1000,
        };
    },
    created() {
        // Notify('您还未登录或登录已超时');
    },
    mounted: function() {
        isApp().then(() => {
            setTimeout(function() {
                setBackButtonVisible(false);
            }, 100);
        });
    },
    methods: {
        doLogin() {
            let _type = this.type;
            let params = {
                type: _type,
            };

            if (!/^1[0-9]{10}$/.test(this.mobile)) {
                this.$toast("请输入正确的手机号！");
                return false;
            } else {
                params.mobile = this.mobile;
            }

            if (_type == 0) {
                // 賬戶密碼登錄
                if (this.password.length < 6) {
                    this.$toast("密码长度至少6位！");
                    return false;
                } else {
                    params.password = this.password;
                }
            } else if (_type == 1) {
                // 驗證碼登錄
                if (this.code.length != 6) {
                    this.$toast("请输入6位验证码！");
                    return false;
                } else {
                    params.code = this.code;
                }
            }

            this.$http
                .post("/m/common/login/api/login", {
                    ...params,
                })
                .then(e => {
                    if (e.result == 0) {
                        Notify("登陆成功");
                        this.$router.push("/");
                    } else {
                        this.$toast(e.msg);
                    }
                });
        },

        // 切换登录方式
        switchLogin() {
            let _type = this.type;
            if (_type == 0) {
                // 切換為驗證碼登錄
                this.type = 1;
                // this.password = "";
            } else if (_type == 1) {
                // 切換為賬戶密碼登錄
                this.type = 0;
                // this.code = "";
            }
        },
        //发验证码
        sendCode() {
            if (this.codeStatus) {
                this.$http.post("/m/common/login/api/sendCode?phoneNumbers=" + this.mobile).then(e => {
                    if (e.result == 0) {
                        this.$toast("发送成功");
                        this.codeStatus = false;
                        this.$refs.countDown.start();
                    } else {
                        this.$toast(e.msg);
                    }
                });
            }
        },

        // 获取用户头像
        getUserImg(val) {
            let _this = this;
            if (/^1[0-9]{10}$/.test(val)) {
                _this.$http.get("/m/common/login/api/getUserImg?mobile=" + val).then(e => {
                    if (e.result == 0) {
                        if (e.data) {
                            _this.userImg = e.data;
                        }
                    }
                });
            }
        },
        // 倒计时结束
        finish() {
            this.codeStatus = true;
            this.time = 60 * 1000;
        },
        back() {
            this.$router.push("/");
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
        [Image.name]: Image,
        [Form.name]: Form,
        [CountDown.name]: CountDown,
    },
};
</script>

<style scoped>
.logingDiv {
    padding: 42px;
    background-color: #ffffff;
    color: rgb(52, 52, 52);
    text-align: left;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.closeDiv {
    height: 95px;
    line-height: 92px;
    font-size: 36.2px;
    font-weight: bolder;
}

.userDiv {
    padding: 36.2px 42px;
}
.userImg,
.title {
    float: left;
}

.userImg {
}
.title {
    padding: 0 41.6px;
    line-height: 132px;
}

.clearDiv {
    clear: both;
}
.formDiv {
}
.inputDiv {
    padding: 25.36px 36.2px;
}
.inputK {
    padding: 14.5px 0;
}
.inputL {
    background-color: rgb(247, 247, 255);
    border-radius: 9px;
}
.inputL >>> .van-cell__title,
.inputL >>> .van-cell__value {
    height: 40px;
    line-height: 40px;
}
.otherDiv {
    font-size: 25.36px;
    height: 79.7px;
    line-height: 79.7px;
    color: rgb(169, 167, 180);
}
.sendCodeDiv {
    min-width: 163px;
    margin-left: 45px;
}
.sendCode {
    position: relative;
    color: #a9a7b4;
}
.sendCode::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #a9a7b4;
}
.inputL >>> .van-count-down {
    display: inline-block;
    color: #a9a7b4;
}
.buttonDiv {
    padding: 54px 36.23px;
}
</style>
