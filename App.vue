<template>
  <div id="app" class="no-touch">
    <router-view :key="$route.fullPath" />
  </div>
  
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  created() {
    //聊天消息列表实现存储持久化
    localStorage.msgSessions &&
      this.changeMsgSessions(JSON.parse(localStorage.msgSessions));
    //在app的话
    isApp().then((res) => {
      //隐藏app标题栏和tab栏
      hideTitleBar();
      //检测app登录状态
      checkIsLoginInWeb();
    });
  },
  mounted() {
    //为pc则用iframe把移动端页面显示到页面中间
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array(
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    );
    //pc
    if (
      !Agents.some((item) =>
        userAgentInfo.toLowerCase().includes(item.toLowerCase())
      ) &&
      !(self.frameElement && self.frameElement.tagName == "IFRAME")
    ) {
      let ifrTag = document.createElement("iframe");
      document.body.innerHTML = "";
      ifrTag.setAttribute("src", location.href);
      let styleObj = {
        width: "480px",
        height: "920px",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      };
      Object.entries(styleObj).forEach(([key, value]) => {
        ifrTag.style[key] = value;
      });
      document.body.append(ifrTag);
    }
  },
  watch: {
    $route(page, lastPage) {
      let _this = this;
      let params = {};

      //上一个页面
      params.lastpageid = lastPage.query.pageId;
      params.lastpageurl = lastPage.path;
      params.lastpagename = lastPage.name;

      //当前页面
      params.pageid = page.query.pageId;
      params.pageurl = page.path;
      params.pagename = page.name;

      // 判断当前页面的类型 0 活动页 1 秒杀页（商品详情页）2 首页 3 其他
      let way = 3;
      if (params.pagename == "home") {
        way = 2;
      } else if (params.pagename == "active") {
        way = 0;
      } else if (params.pagename == "detail") {
        way = 1;
      }

      params.way = way; //页面类型
      params.windowflag = page.query.windowflag; //来源窗口标识
      params.outflag = page.query.outflag; // 外部来源标识
      params.publicip = localStorage.getItem("Ip"); // 用户公网ip地址

      // 特例处理 confirmOrder 立即购买时会通过路由从商品详情页传参数过去
      if (page.name == "confirmOrder" && lastPage.name == "detail") {
        params.outflag = "";
        params.pageid = "";
      }

      // _this.$http
      //   .post("/m/statistics/api/common/insert", params)
      //   .then(function (e) {
      //     if (e.result == 0) {
      //     } else {
      //       console.log("记录用户访问记录失败");
      //     }
      //   });
    },
  },
  methods: {
    ...mapMutations(["changeMsgSessions"]),
  },
};
</script>

<style lang="scss" scoped>
.logo {
  margin-bottom: 100px;
}
.van-nav-bar {
  /* color: #000 !important; */
  /* height: 35px !important; */
}
.no-touch {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.yes-touch {
  -webkit-touch-callout: auto;
  -webkit-user-select: auto;
  -khtml-user-select: auto;
  -moz-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
}
.van-nav-bar__left,
.van-nav-bar__right {
  /* bottom: 23px !important;
  transform: translateY(50%); */
}

.footerTitle {
  display: none;
}

.not-select {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

.header_Box {
  width: 100%;
  z-index: 999;
}

#app {
  font-family: "微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #262733;
  background-color: #f6f6f6;
  height: 100%;
  /* overflow: hidden; */
  /* overflow-y:auto; */
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
p {
  padding: 0;
  margin: 0;
}

img {
  border: 0;
}

.p_html img {
  vertical-align: top;
}

.p_html {
  padding: 0 !important;
}

.p_html td {
  border: 0;
  padding: 0;
}

.clear {
  clear: both;
}
</style>
