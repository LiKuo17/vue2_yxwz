<template>
  <div class="van_active">
    <header>
      <div class="header_Box">
        <van-sticky>
          <van-nav-bar
            :title="titleText"
            right-text="分享"
            left-arrow
            @click-left="back"
            @click-right="SharePoster"
          />
          <!-- <van-nav-bar :title="titleText"  left-arrow @click-left="back" /> -->
        </van-sticky>
      </div>
    </header>
    <section class="active_section">
      <div v-for="(item, index) in pageDate.widgets" :key="index">
        <article
          v-if="item.type == 'SWIPE'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：轮播图 (widgets='SWIPE')
                	-->
          <swipe @doLink="doLink" :swItem="item"></swipe>
        </article>
        <article
          v-else-if="item.type == 'SEARCH'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：搜索框 (widgets='SEARCH')
               	 	-->
          <search :searchItem="item" @toSearch="toSearch"></search>
        </article>
        <article
          v-else-if="item.type == 'ICONS'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：导航图标 (widgets='ICONS')
               	 	-->
          <icons :iconItem="item" @doLink="doLink"></icons>
        </article>
        <article
          v-else-if="item.type == 'IMAGE'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：静态图片 (widgets='IMAGE')
               	 	-->
          <datupian :imageItem="item" @doLink="doLink"></datupian>
        </article>
        <article
          v-else-if="item.type == 'TITLE'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：标题栏 (widgets='TITLE')
               	 	-->
          <mtitle :titleItem="item"></mtitle>
        </article>
        <article
          v-else-if="item.type == 'PRDGRID'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：网格型商品列表 (widgets='PRDGRID')
               	 	-->
          <prdgrid :prdgridItem="item" @doDetail="doDetail"></prdgrid>
        </article>
        <article
          v-else-if="item.type == 'PRDLIST'"
          :style="'margin-bottom:' + item.marginBottom + ';'"
        >
          <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：列表型商品列表 (widgets='PRDLIST')
               	 	-->
          <prdlist :prdgridItem="item" @doDetail="doDetail"></prdlist>
        </article>
        <article
          v-else-if="item.type == 'RICHTEXT'"
          :style="'line-height:' + item.lineheight + ';'"
        >
          <div class="p_html box_Content1" v-html="item.html"></div>
        </article>
      </div>
    </section>
    <footer>
      <article></article>
    </footer>
    <van-popup closeable v-model="showPoster">
      <img style="width: 70vw" :src="serverAdd + posterSrc" alt="" />
    </van-popup>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
import swipe from "../../components/SWIPE";
import search from "../../components/SEARCH";
import icons from "../../components/ICONS";
import mimages from "../../components/IMAGES";
import mtitle from "../../components/TITLE";
import prdgrid from "../../components/PRDGRID";
import prdlist from "../../components/PRDLIST";

import { NavBar, Sticky } from "vant";
export default {
  name: "van_active",
  props: {
    pageId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      tabBarIndex: 0,
      pageDate: {},
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      titleText: "",
      posterSrc: "",
      pageOwnerCode: "",
      showPoster: false, //海报显示
      // 优惠券样式
      // imageStyle:{
      //   position: 'relative',
      //   zIndex: 699,
      //   top: '-423vw',
      //   width: '100%',
      // },
    };
  },

  components: {
    swipe,
    search,
    icons,
    datupian: mimages, //  这里命名不规范。因为该组件名字比较特殊。使用不当会产生警告
    mtitle,
    prdgrid,
    prdlist,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
  },

  created() {
    var _this = this;
    var _pageId = _this.$route.query.pageId;
    const { pageId, ownerCode } = _this.$route.query;
    if (pageId == "ccb-active" && ownerCode) {
      this.pageOwnerCode = ownerCode;
      sessionStorage.setItem("ownerCode", this.pageOwnerCode);
    }
    console.log(this.pageOwnerCode, "pageOwnerCode");
    console.log(pageId, "pageId");

    if (typeof _pageId == "undefined") {
      _pageId = _this.pageId;
    }
    _this.$emit("setIndex", this.tabBarIndex);
    _this.getPageDate(_pageId);
    window.receiveCoupon = this.receiveCoupon;
    this.doLink();
  },

  methods: {
    toSearch() {
      this.$router.push("search");
    },
    back() {
      if (window.history.length <= 1) {
        Fw.returnPage();
      } else {
        this.$router.back();
      }
    },
    SharePoster() {
      let pageId = this.$route.query.pageId;
      this.$http
        .get("/m/members/api/getActivePoster", { params: { pageId: pageId } })
        .then((res) => {
          if (res.result == 0) {
            console.log(res, "res");
            this.posterSrc = res.data.imageUrl;
            this.showPoster = true;
          } else if (res.result == -1) {
            this.$toast("创建活动分享海报异常");
            // setTimeout(() => {
            //       this.$router.push('/authLogin')
            // }, 1000);
          } else if (res.result == -2) {
            this.$toast("未绑定店主编码");
          } else if (res.result == -3) {
            this.$toast("未找到对应商品");
          } else if (res.result == -4) {
            this.$toast("生成分享海报失败");
          }
        });
    },
    getPageDate(_pageId) {
      var _this = this;
      this.$http
        .get("/m/common/pageconfig/api/getconfig", {
          params: {
            pageId: _pageId,
          },
        })
        .then(function (e) {
          if (e.msg == "Success") {
            _this.pageDate = e.data;
            _this.titleText = e.data.pageName;
          }
          //console.log(e);
        });
      //				this.$http.post('/m/common/pageconfig/api/getconfig', {
      //						pageId: 'HOME'
      //				}).then(function(e){
      //					//console.log(e);
      //				})
    },
    doLink(link) {
      console.log(link, "link");
      var _this = this;

      if (link == undefined || link == null || link == "") {
        //console.log('link为空');
        return false;
      }

      if (link.linkType == 1) {
        if (link.linkPage == "USER") {
          this.$router.push({ path: "/shoppingcart" });
        }
        _this.$router.push({
          path: "/active",
          query: {
            pageId: link.linkPage,
          },
        });

        // var url = window.location.href;
        // window.location.href= + '?pageId='+link.linkPage;
        // _this.$router.replace();
      } else if (link.linkType == 2) {
        _this.doDetail(link.linkPrdno);
      } else if (link.linkType == 3) {
        console.log(link, "link");
        window.location.href = link.linkUrl;
      } else {
        //					if(link.link == 'USER'){
        //						this.$router.push({ path: '/shoppingcart'});
        //					} else {
        //						_this.$router.push({
        //						path: '/active',
        //						query: {
        //							pageId: link.link
        //						}
        //					})
        //					}
      }
    },
    doDetail(prdId) {
      if (prdId == undefined) {
        return false;
      }
      this.$router.push({
        path: "/detail",
        query: {
          prdno: prdId,
        },
      });
    },
    // 优惠券
    receiveCoupon(couponIDs) {
      console.log(couponIDs, "couponIDs");
      this.$http
        .get("/m/coupons/api/memberGetCoupon", {
          params: { couponIDs },
        })
        .then((res) => {
          if (res.result === 0) {
            this.$toast(res.msg || "领取成功,可至个人中心查看");
          } else {
            this.$toast(res.msg || "领取失败");
          }
        });
    },
  },
};
</script>

<style>
/* @import url("../../../static/search.css"); */
@import url("../../../static/icon.css");
@import url("../../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: white;
}

.active_section {
  height: calc(100vh - 92px);
  width: 100%;
  background-color: #f9f9f9;
  z-index: -1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

img {
  height: 100%;
  width: 100%;
  border: 0;
}

article {
  position: relative;
}

.card_Box {
  background-color: white;
}

.box_Content {
  padding: 0;
}

.box_Content1 {
  padding: 0;
}

.p_html > img {
  vertical-align: top;
}

.p_html {
  text-align: left;
}
.van_active >>> .van-nav-bar__text {
  color: #be2929;
}
</style>
