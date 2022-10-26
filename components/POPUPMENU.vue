<template>
    <div>
        <div class="poupMask-ignore" ref="poupMask" v-if="showPopup" @click="showPopup = false">
            <div class="popupContainer-ignore">
                <div class="arrow"></div>
                <div
                    class="menuItem"
                    :class="{ itemBorder: index != menuList.length - 1 }"
                    v-for="(item, index) in menuList"
                    :key="index"
                    @click="clickPopupItem(item)"
                >
                    <van-icon :name="item.icon" size="26" :dot="item.dot" color="#434343" />
                    <div>{{ item.text }}</div>
                </div>
            </div>
        </div>
        <!-- <header>
      <div class="header_Box"> -->
        <van-sticky>
            <van-nav-bar left-arrow @click-left="$emit('click-left')" @click-right="open()">
                <template #left>
                    <van-icon name="arrow-left" size="20" :color="color" />
                </template>
                <template #title>
                    <div :style="{ color }">
                        {{ title == undefined ? "" : title }}
                    </div>
                </template>
                <template #right>
                    <van-icon name="more-o" size="20" :dot="msgDot" :color="color" />
                </template>
            </van-nav-bar>
        </van-sticky>
        <!-- </div>
    </header> -->
    </div>
</template>

<script>
import { Icon, NavBar, Sticky } from "vant";
import { mapGetters } from "vuex";
export default {
    props: {
        title: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "#5f656b",
        },
    },
    components: {
        [Icon.name]: Icon,
        [NavBar.name]: NavBar,
        [Sticky.name]: Sticky,
    },
    mounted() {
        window.addEventListener("touchmove", () => {
            this.showPopup = false;
        });
    },
    created() {
        this.listenMsg();
        this.checkDot();
    },
    computed: {
        ...mapGetters(["msgSessions"]),
    },
    watch: {
        msgDot(newV) {
            this.menuList[2].dot = newV;
        },
    },
    data() {
        return {
            showPopup: false,
            menuList: [
                { icon: "contact", text: "个人中心", path: "/ccbUser" },
                { icon: "cart-o", text: "购物车", path: "/shoppingCart" },
                // { icon: "phone-o", text: "客服", path: "/active?pageId=kefu", dot: false },
                // { icon: "like-o", text: "收藏", path: "/collection" },
            ],
            msgDot: false,
        };
    },
    methods: {
        //监听$socket和message
        listenMsg() {
            let timer = null;
            timer = setInterval(() => {
                if (this.$socket) {
                    clearInterval(timer);
                    this.$socket.onmessage = res => {
                        this.checkDot();
                    };
                }
            }, 300);
        },
        checkDot() {
            //只要有一项未读则everyTrue为false
            let everyTrue = this.msgSessions.every(item => {
                return item.msgState == false;
            });
            if (!everyTrue) {
                this.msgDot = true;
            }
        },
        open() {
            this.showPopup = true;
        },
        clickPopupItem(item) {
            this.$router.push(item.path);
        },
        //监听$socket和message
        listenMsg() {
            let timer = null;
            timer = setInterval(() => {
                if (this.$socket) {
                    clearInterval(timer);
                    this.$socket.onmessage = res => {
                        this.msgDot = true;
                    };
                }
            }, 300);
        },
    },
};
</script>

<style scoped>
.poupMask-ignore {
    top: 0;
    z-index: 9;
    position: fixed;
    width: 100%;
    height: calc(100% - 50px);
    background-color: rgba(0, 0, 0, 0);
}
.popupContainer-ignore {
    width: 42vw;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.85);
    position: absolute;
    top: calc(46px - 0.1vh);
    right: calc(36px - 5.3vw);
    padding-top: 2vw;
    padding-bottom: 1.5vw;
    box-sizing: border-box;
    box-shadow: 0 0 6px 3px rgba(145, 145, 145, 0.4);
}
.popupContainer-ignore > .arrow {
    position: absolute;
    right: calc(16px - 36px + 5.3vw + 1vw);
    border: 7px solid transparent;
    border-bottom-color: rgba(255, 255, 255, 0.85);
    box-sizing: border-box;
    top: -14px;
}
.popupContainer-ignore > .menuItem {
    height: 5vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 4vw;
}
.itemBorder {
    border-bottom: 1px solid rgba(216, 216, 216, 0.6);
}
.menuItem > i {
    margin: 0 20px;
}
.menuItem > div:last-child {
    font-size: 30px;
    color: #181818;
    margin-left: 1vw;
}
</style>
