<template>
    <div>
        <div v-if="!inApp" class="ssologin">
            <img src="/static/img/rcbQRcode.jpg" alt="">
            <header>
                <van-sticky>
                    <van-nav-bar title="下载APP" left-arrow @click-left="goHome()">
                        <template #left>
                            <van-icon name="arrow-left" size="20" color="#5f656b" />
                        </template>
                    </van-nav-bar>
                </van-sticky>
            </header>
            <div></div>
            <div style="padding-top: 100px"></div>
        </div>

        <div v-else>
            <div>
                <div class="tiptext">正在进行授权登录，请稍候</div>
                <div style="padding-top: 80px">
                    <van-button plain hairline type="danger" @click="goHome()">取 消</van-button>
                </div>
            </div>
            <div style="padding-top: 100px"></div>
        </div>
    </div>
</template>

<script>
import { Button, NavBar, Sticky, Icon } from "vant";
import _config from "../../assets/js/config";

export default {
    name: "ssologin",
    data() {
        return {
            name: "",
            password: "",
            timer: null,
            inApp: true,
        };
    },
    mounted() {
        isApp()
            .then(() => {
                this.inApp = true;
                setTimeout(() => {
                    showTitle("登录");
                    setBackButtonVisible(false);
                }, 100);
                setTimeout(() => {
                    trySSOLogin();
                }, 260);
            })
            .catch(() => {
                this.inApp = false;
            });
    },
    methods: {
        goHome() {
            this.$router.push("/");
        },
        back() {
            this.$router.go(-1);
        },
        goTest() {
            this.$router.push("/testLogin");
        },
    },
    components: {
        [NavBar.name]: NavBar,
        [Button.name]: Button,
        [Sticky.name]: Sticky,
        [Icon.name]: Icon,
    },
};
</script>
<style>
@import url("../../../static/navbar.css");
</style>

<style scoped>
.ssologin {
    height: 100vh;
    background-color: #233172;
}
.ssologin>img{
  top: 53%;
  left: 0;
  transform: translateY(-50%);
  width: 100vw;
  position: absolute;
  -webkit-touch-callout: auto; /*系统默认菜单被禁用*/
    -webkit-user-select: auto; /*webkit浏览器*/
    -khtml-user-select: auto; /*早期浏览器*/
    -moz-user-select: auto; /*火狐*/
    -ms-user-select: auto; /*IE10*/
}
.tiptext {
    text-align: center;
    padding-top: 200px;
}
</style>
