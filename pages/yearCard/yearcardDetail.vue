<template>
  <div class="cardContainer">
    <!-- 会员卡 -->
    <div class="card-info">
      <img :src="cardImg" alt="" />
      <div class="card-box">
        <div class="card-box-title">{{ vipListObj.name }}</div>
        <!-- <div class="card-box-title">{{ vipListObj.name }}</div> -->
        <div class="card-box-date">有效期：{{ vipListObj.days }}天</div>
      </div>
    </div>
    <div class="navBox">
      <div class="navBox-item" v-for="item in navList" :key="item.id">
        <div class="navBox-item-top">
          <img :src="item.imgUrl" />
        </div>
        <div class="navBox-item-bottom">{{ item.name }}</div>
      </div>

      <div class="navBox-item">
        <div class="navBox-item-top only-cls">5项</div>
        <div class="navBox-item-bottom">全部权益</div>
      </div>
    </div>
    <!--使用说明 -->
    <div class="useExplain">
      <van-cell
        title="使用须知"
        icon="warning-o"
        is-link
        @click="gotoPage('useExplain')"
      >
      </van-cell>
      <van-cell title="客服电话" icon="phone-o" value="4000327328"> </van-cell>
      <van-cell
        title="店铺主页"
        icon="shop-o"
        is-link
        value="进店逛逛"
        @click="gotoPage('home')"
      >
      </van-cell>
    </div>
    <!-- 立即开通 -->
    <div class="action-btn-wrap">
      <!-- <div class="action-btn">
        <div class="agreement">
          <div class="agreement__checkbox van-checkbox">
            <van-checkbox
              v-model="checked"
              icon-size="12px"
              checked-color="#e2bb7c"
            ></van-checkbox>
            <span class="van-checkbox__label"
              ><span class="agreement__label">已阅读并同意</span
              ><span class="agreement__link">《权益卡使用协议》</span></span
            >
          </div>
        </div>
      </div> -->
      <van-button color="#e7c287" round block @click="goComfirmOrder"
        >¥{{ vipListObj.price }}立即开通</van-button
      >
    </div>
    <!-- 更多精选商品 -->
    <MoreShop />
  </div>
</template>

<script>
import { getData } from "../../api";
import config from "../../assets/js/config";
import MoreShop from "../../components/MoreShop.vue";
export default {
  name: "yearcardDetail",
  data() {
    return {
      checked: false,
      navList: [
        { id: 1, imgUrl: require("@/assets/img/card-nav1.png"), name: "包邮" },
        {
          id: 2,
          imgUrl: require("@/assets/img/card-nav2.png"),
          name: "288起酒店",
        },
        {
          id: 3,
          imgUrl: require("@/assets/img/card-nav3.png"),
          name: "5折起酒店",
        },
      ],
      cardImg: null,
      vipListObj: {}, // 会员卡信息
      isCard: "halfYear",
      yearCardId: 1, // 年卡id
      yearCardNum: 3, // 年卡次数
    };
  },
  components: {
    MoreShop,
  },
  created() {
    this.getVipList();
    // this.getVipMoreList();
    // console.log(this.$route.query.card, "2321321");
  },
  methods: {
    // 路由跳转
    gotoPage(status) {
      switch (status) {
        case "useExplain":
          this.$router.push({
            path: "/useExplain",
            query: { yearCardNum: this.vipListObj.thresholdNumber },
          });
          break;

        case "home":
          this.$router.push("/");
          break;
      }
    },
    // 获取会员卡列表
    async getVipList() {
      // 获取列表
      let res1 = await getData("getViplist");
      if (res1.code == 0) {
        this.vipList = res1.data;
        // this.cardImg = config.fileServerAddress + this.vipListObj.mainImage;
      }
      // 判断路由参数
      switch (this.$route.query.card) {
        case "halfYear":
          this.vipListObj = this.vipList[0];
          break;
        case "allYear":
          this.vipListObj = this.vipList[1];
          break;
      }
      this.cardImg = config.fileServerAddress + this.vipListObj.mainImage;
    },
    // 跳转到确认订单
    goComfirmOrder() {
      // this.vipListObj.mainImage = this.cardImg;
      localStorage.setItem("vipListObj", JSON.stringify(this.vipListObj));

      this.$router.push({
        path: "/comfirmOrderr",
        query: { prodType: 1 },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cardContainer {
  position: relative;
  min-height: 100vh;

  .card-info {
    width: 93vw;
    height: 360px;
    margin: 3.5vw;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    background-color: #fff;

    .card-box {
      position: absolute;
      width: 240px;
      height: 90px;
      top: 30px;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .card-box-title {
        width: 100%;
        font-weight: 900;
        color: white;
        font-size: 36px;
      }
      .card-box-date {
        width: 100%;
        color: white;
        font-size: 24px;
      }
    }
    img {
      width: 103%;
      height: 100%;
    }
  }
  .navBox {
    width: 100%;
    height: 140px;
    display: flex;
    background-color: #fff;
    margin-bottom: 15px;
    .navBox-item {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      .navBox-item-top {
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .only-cls {
        border-radius: 50%;
        line-height: 70px;
        font-size: 22px;
        color: #d5a150;
        background-color: #faf5eb;
        font-weight: 900;
      }
      .navBox-item-bottom {
        font-size: 22px;
      }
    }
  }
  .useExplain {
    /deep/ .van-cell__title {
      text-align: left;
    }
  }
  /* 立即开通 */
  .action-btn-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding: 2.667vw 0;
    background-color: #fff;
    .action-btn {
      padding: 8px 16px;
      .agreement {
        font-size: 12px;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }
      .button {
        background: #e2bb7c;
        border-color: transparent;
        color: #724804;
        font-size: 16px;
        font-weight: 500;
      }
      .agreement__label {
        color: #969799;
        font-size: 24px;
      }
      .agreement__link {
        color: black;
        font-size: 24px;
      }
    }
    /deep/ .van-checkbox__icon {
      font-size: 18px !important;
    }
    /deep/ .van-button--block {
      display: block;
      width: 92vw !important;
      margin: 0 4vw !important;
      height: 2.5rem;
    }
    /deep/ .van-button__text {
      color: #724804 !important;
      font-size: 16px;
    }
  }
}
</style>