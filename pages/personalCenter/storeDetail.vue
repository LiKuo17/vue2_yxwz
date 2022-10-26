<template>
  <div class="storeDetail">
    <header>
      <div class="header_Box">
        <van-nav-bar
          title="雅棉居家品质生活"
          left-arrow
          @click-left="handleBack"
        >
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </div>
    </header>

    <div class="storeInfo">
      <div class="s_left">
        <div
          class="storeAva"
          :style="{
            backgroundImage:
              'url(' +
              (storeDetail.logourl ? storeDetail.logourl : blankStoreIcon) +
              ')',
          }"
        ></div>
        <div
          class="storeText"
          @click="
            $router.push({
              path: '/certificate',
              query: { bizid: $route.query.bizid },
            })
          "
        >
          <div class="storeTitle">{{ storeDetail.bizname }}</div>
          <!-- <div class="storeColNum">3456人收藏</div> -->
        </div>
      </div>
      <div
        class="foucus"
        :class="{ foucused: isCollected }"
        @click="handleFoucusAndCancel"
      >
        {{ isCollected ? "已收藏" : "收藏" }}
      </div>
    </div>

    <van-tabs color="#410e0b" animated>
      <van-tab title="商品">
        <div class="goodsList-ignore" id="goodsList">
          <!-- 懒加载组件 -->
          <lazyList
            url="/m/biz/api/common/getProductsByBiz"
            :params="{ bizid: $route.query.bizid }"
          >
            <!-- #default="{list}"相当于v-slot:default="{list}" -->
            <template #default="{list}">
              <collectionItem
                v-for="(item, index) in outputList(list)"
                :key="index"
                :collectionItem="item"
                :disabled="true"
                @click="doDetail(item.prdno)"
              />
            </template>
          </lazyList>
        </div>
      </van-tab>
      <van-tab title="精选"> </van-tab>
      <van-tab v-for="index in 3" :key="index" title="" disabled></van-tab>
    </van-tabs>
    <toTop v-if="goodsList.length > 15" listId="goodsList" />
  </div>
</template>

<script>
import { NavBar, Icon, Tabs, Tab, List } from "vant";
import collectionItem from "@/components/COLLECTIONITEM";
import _config from "../../assets/js/config";
import lazyList from "@/components/LAZYLIST";
import toTop from "@/components/TOTOP";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    collectionItem,
    lazyList,
    toTop,
  },
  data() {
    return {
      fileServerAddress: _config.fileServerAddress,
      storeDetail: {},
      isCollected: false,
      page: 0,
      blankStoreIcon: "/static/img/store.png",
      goodsList: [],
    };
  },
  created() {
    this.getStoreDetail();
    this.initFocus();
  },
  methods: {
    outputList(list) {
      this.goodsList = list;
      return list;
    },
    handleBack() {
      if (this.$route.query.collectionActive) {
      }
      this.$back();
    },
    //初始化收藏状态
    initFocus() {
      this.$http
        .get("m/collections/biz/api/common/isCollected", {
          params: { bizid: Number(this.$route.query.bizid) },
        })
        .then((res) => {
          if (res.result == 0) {
            if (res.data) {
              this.isCollected = true;
            } else {
              this.isCollected = false;
            }
          }
        });
    },
    handleFoucusAndCancel() {
      //收藏
      if (!this.isCollected) {
        this.$http
          .get("m/collections/biz/api/insert", {
            params: { bizid: Number(this.$route.query.bizid) },
          })
          .then((res) => {
            if (res.result == 0) {
              this.isCollected = true;
              this.$toast("店铺收藏成功");
            } else {
              this.$toast(res.msg);
            }
          });
        //取消收藏
      } else {
        this.$http
          .get("m/collections/biz/api/delete", {
            params: { bizid: Number(this.$route.query.bizid) },
          })
          .then((res) => {
            if (res.result == 0) {
              this.isCollected = false;
            } else {
              this.$toast(res.msg);
            }
          });
      }
    },
    //获取店铺详情
    getStoreDetail() {
      this.$http
        .get("/m/biz/api/common/getBizInfo", {
          params: { bizid: Number(this.$route.query.bizid) },
        })
        .then((res) => {
          if (res.result == 0) {
            this.storeDetail = res.data;
            if (
              this.storeDetail.logourl &&
              !this.storeDetail.logourl.startsWith("http")
            ) {
              this.storeDetail.logourl =
                this.fileServerAddress + this.storeDetail.logourl;
            }
          }
        });
    },
    //跳转到商品详情
    doDetail(prdno) {
      if (prdno == undefined) {
        return false;
      }
      this.$router.push({
        path: "/detail",
        query: {
          prdno: prdno,
        },
      });
    },
  },
};
</script>

<style scoped>
.storeDetail {
  display: flex;
  flex-direction: column;
}
.storeDetail >>> .van-tabs__wrap--scrollable .van-tabs__nav {
  overflow-x: hidden;
}
.storeInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20vw;
  color: #ffffff;
  background-color: #410e0b;
}
.s_left {
  display: flex;
  align-items: center;
}
.storeAva {
  width: 10vw;
  height: 10vw;
  border-radius: 2vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0 3vw;
}
.storeText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.storeText > div:first-child {
  font-size: 29px;
}
.foucus {
  font-size: 23px;
  background: linear-gradient(to right, #f93370, #fb3846);
  /* padding: 1.2vw 2.5vw; */
  height: 7vw;
  width: 16vw;
  border-radius: 4vw;
  margin-right: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: content-box;
}
.foucused {
  width: calc(16vw - 2px);
  height: calc(7vw - 2px);
  background: transparent;
  color: rgb(158, 158, 158);
  border: 1px solid rgb(158, 158, 158);
}
.goodsList-ignore {
  position: relative;
  overflow-y: scroll;
  height: calc(100vh - 46px - 20vw - 44px);
}
.storeTitle {
  max-width: 63vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.storeTitle::after {
  content: ">";
}
.toTop {
  background-color: rgba(238, 238, 238, 0.2);
  bottom: 6vw;
  right: 6vw;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  position: fixed;
  box-shadow: 0 0 4px 6px rgba(138, 138, 138, 0.2);
  transform: translateX(0);
  opacity: 1;
  transition: all 0.4s ease;
}
.toTop::after {
  margin: 50% auto;
  transform: translateY(-40%);
  display: block;
  content: "";
  width: calc(0.45 * 10vw);
  height: calc(0.45 * 10vw);
  background-image: url(/static/img/toTop.png);
  background-size: cover;
  background-position: center;
}
.toTopHide {
  opacity: 0;
  transform: translateX(20vw);
  transition: all 0.4s ease;
}
</style>
