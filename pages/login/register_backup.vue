<template>
    <div class="register">
        <header>
            <div class="close">
                <van-icon class="close_icon" name="cross" @click="back" />
            </div>
        </header>
        <section>
            <article class="a1">
                <div class="title">
                    <h1 class="zc">注册</h1>
                </div>
            </article>
            <article class="a1">
                <div class>
                    <div class="card">
                        <van-cell-group>
                            <van-field type="text" placeholder="手机号" v-model="phonenumber" />
                        </van-cell-group>
                    </div>
                    <div class="card">
                        <van-cell-group>
                            <van-field type="text" v-model="validcode" placeholder="短信验证码">
                                <van-button v-show="!isWait" slot="button" size="small" type="primary" @click="showCodeBox">发送验证码</van-button>
                                <van-button disabled v-show="isWait" slot="button" size="small" type="info" @click="getVerificationCode"
                                    >{{ times }}秒</van-button
                                >
                            </van-field>
                        </van-cell-group>
                    </div>
                    <div class="card">
                        <van-cell-group>
                            <van-field type="password" placeholder="登录密码" v-model="password" />
                        </van-cell-group>
                    </div>
                    <div class="card">
                        <van-cell-group>
                            <van-field type="text" placeholder="邀请码" v-model="parentuid" />
                        </van-cell-group>
                    </div>
                </div>
            </article>
            <article class="a1">
                <van-button @click="register" class="login_button" type="danger" size="large" round>注册</van-button>
            </article>
        </section>
        <footer>
            <vfpopups :PisCode="comIsCode" :phoneNumber="phonenumber" @close="setIsCode" @goToCode="getVerificationCode"></vfpopups>
        </footer>
    </div>
</template>

<script>
// import vfpopups from '@/components/verifypopups'

export default {
    name: "register",
    data() {
        return {
            phonenumber: "",
            password: "",
            validcode: "",
            parentuid: "",
            times: 60,
            isWait: false,
            vCodeImg: "",
            isCode: false,
            verifyVal: "",
            codeImg: "",
        };
    },
    methods: {
        register() {
            let _this = this;
            _this.$toast.loading({
                mask: true,
                duration: 0,
            });
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phonenumber)) {
                _this.$notify("请输入正确的手机号");
                _this.$toast.fail("请输入正确的手机号");
                return false;
            } else if (!/^[0-9]{6}$/.test(_this.validcode)) {
                _this.$notify("请输入正确的验证码");
                _this.$toast.fail("请输入正确的验证码");
                return false;
            } else if (!/^[0-9]{8}$/.test(_this.parentuid)) {
                _this.$notify("请输入正确的推荐人");
                _this.$toast.fail("请输入正确的推荐人");
                return false;
            } else if (!/^\S{6,18}$/.test(_this.password)) {
                _this.$notify("请输入6-18位的登陆密码");
                _this.$toast.fail("请输入6-18位的登陆密码");
                return false;
            } else {
                _this.$http
                    .post("/auth/regist", {
                        mobile: _this.phonenumber,
                        password: _this.password,
                        validCode: _this.validcode,
                        parentuid: _this.parentuid,
                    })
                    .then(function(e) {
                        if (e.code == 200) {
                            _this.$notify({
                                message: e.msg,
                                background: "#07c160",
                            });
                            _this.$toast.success(e.msg);
                            _this.$router.push("/login");
                        } else if (e.code == 500) {
                            _this.$toast.fail(e.msg);
                            _this.$notify(e.msg);
                        }
                    });
            }
        },
        getValidCode() {
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phonenumber)) {
                _this.$notify("请输入正确的手机号");
                return false;
            } else {
            }
        },
        back() {
            this.$router.push("/login");
        },
        getVerificationCode(yzm) {
            var _this = this;
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phonenumber)) {
                _this.$notify("请输入正确的手机号");
                _this.$toast.fail("请输入正确的手机号");
                return false;
            } else {
                _this.isWait = true;
                _this.$http
                    .get("/auth/mobilecode", {
                        params: {
                            mobile: parseInt(_this.phonenumber),
                            opname: "reg",
                            validCode: yzm,
                        },
                    })
                    .then(function(e) {
                        if (e.code == 200) {
                            var time1 = setInterval(function() {
                                _this.times--;
                                if (_this.times == 0) {
                                    _this.times = 60;
                                    _this.isWait = false;
                                    window.clearInterval(time1);
                                }
                            }, 1000);
                            _this.isCode = false;
                            _this.$notify("发送成功");
                        } else if (e.code == 500) {
                            _this.isWait = false;
                            _this.$notify(e.msg);
                        }
                    });
            }
        },
        getBase64Image(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL("image/png"); // 可选其他值 image/jpeg
            return dataURL;
        },
        showCodeBox() {
            var _this = this;
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phonenumber)) {
                _this.$notify("请输入正确的手机号");
                _this.$toast.fail("请输入正确的手机号");
                return false;
            } else {
                _this.isCode = true;
            }
        },
        setIsCode(e) {
            var _this = this;
            _this.isCode = e;
        },
    },
    components: {
        vfpopups,
    },
    computed: {
        comIsCode: function() {
            return this.isCode;
        },
    },
};
</script>

<style>
@import url("../../static/css/vantStyleR_van-field.css");
</style>

<style scoped="scoped">
.register {
    width: 750px;
    min-height: 100vh;
    background-color: #242834;
    color: white;
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

.close_icon {
    font-size: 38px;
}

.a1 {
    padding: 0 75px;
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
    margin-top: 130px;
}

.zheyan {
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    top: 0;
    background-color: rgba(1, 1, 1, 0.3);
}

.verificationCode_Box {
    width: 500px;
    color: white;
    margin: 0 auto;
    text-align: center;
    background-color: #242834;
}

.verifyBox {
    padding: 0 20px;
}

.doVerifyBox {
    padding: 0 50px;
}

.codeUl > li {
    padding-top: 10px;
    padding-bottom: 10px;
}

.zc {
    font-size: 48px;
    font-weight: 500;
}
</style>
