<template>
  <div class="ccbHome-ignore position-relative">
    <div style="height: 16vh; width: 100%">
      <img style="width: 100%" :src="header_img" alt="" />
      <!-- 酒店权益 -->
      <div class="jdbox">
        <div class="jdqy" @click="gotoPage('openYear')"></div>
        <div class="jdzzc">
          <a
            href="javascript:;"
            detail
            class="public_a"
            @click="gotoPage('detail')"
          ></a>
        </div>
        <div class="fivestar" @click="gotoPage('allGoods')"></div>
        <img style="width: 100%" :src="three_block_img" alt="" />
      </div>
      <!-- 自助餐兑换 -->
      <div class="zzcdh">
        <div class="zzcdh-left">
          <a
            href="https://quanyi.uzai.com/index.html#/personalCenter/my"
            class="public_a"
          ></a>
        </div>
        <div
          class="zzcdh-right"
          @click="$router.push({ path: '/hotelBooking' })"
        ></div>
        <img style="width: 100%" :src="zzc_title_img" alt="" />
      </div>
      <!-- 尊享权益 -->
      <div class="zxqy">
        <div class="zxqy-title">
          <img :src="zxqy_title_img" alt="" />
        </div>
        <div class="zxqy-item" v-for="zxqy in zxqyList" :key="zxqy.id">
          <img :src="zxqy.imgUrl" alt="" />
        </div>
      </div>
      <!-- 商旅权益套装 -->
      <div class="zxqy">
        <div class="zxqy-title">
          <img :src="slqy_title_img" alt="" />
        </div>
        <div class="zxqy-item" v-for="slqy in slqyList" :key="slqy.id">
          <img :src="slqy.imgUrl" alt="" />
        </div>
      </div>
      <!-- 超值套装 -->
      <div class="zxqy">
        <div class="zxqy-title">
          <img :src="cztc_title_img" alt="" />
        </div>
        <div class="zxqy-item" v-for="cztz in cztzList" :key="cztz.id">
          <img :src="cztz.imgUrl" alt="" />
        </div>
      </div>
      <!-- 黑金商旅卡说明 -->
      <div class="blackingCard">
        <div
          class="blackingCard-item"
          v-for="blackingsl in blackingslArr"
          :key="blackingsl.id"
        >
          <img :src="blackingsl.imgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      // 尊享权益
      zxqyList: [
        { id: 1, imgUrl: require("@/assets/img/zxtc_1.jpg") },
        { id: 2, imgUrl: require("@/assets/img/zxtc_2.jpg") },
      ],
      // 商旅权益套装
      slqyList: [
        { id: 1, imgUrl: require("@/assets/img/slqy_1.jpg") },
        { id: 2, imgUrl: require("@/assets/img/slqy_2.jpg") },
      ],
      // 超值套装
      cztzList: [
        { id: 1, imgUrl: require("@/assets/img/cztc_1.jpg") },
        { id: 2, imgUrl: require("@/assets/img/cztc_2.jpg") },
        { id: 3, imgUrl: require("@/assets/img/cztc_3.jpg") },
        { id: 4, imgUrl: require("@/assets/img/cztc_4.jpg") },
      ],
      // 黑金商旅卡说明
      blackingslArr: [
        { id: 1, imgUrl: require("@/assets/img/home8.jpg") },
        { id: 2, imgUrl: require("@/assets/img/home9.jpg") },
      ],
      header_img: require("@/assets/img/home1.jpg"), // 头部图
      three_block_img: require("@/assets/img/home2.jpg"), // 权益、全部商品、酒店自助餐三大块
      zzc_title_img: require("@/assets/img/home3.jpg"), // 自助餐
      zxqy_title_img: require("@/assets/img/zxtc_title.jpg"), // 尊享权益头
      slqy_title_img: require("@/assets/img/slqy_title.jpg"), // 商旅权益套装
      cztc_title_img: require("@/assets/img/cztc_title.jpg"), // 超值套装
    };
  },

  created() {},
  mounted() {},
  methods: {
    // 路由跳转
    gotoPage(status) {
      switch (status) {
        case "openYear":
          this.$router.push("/openYearCard");
          break;

        case "detail":
          this.$router.push("/detail");
          break;

        case "allGoods":
          this.$router.push("/allGoods");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.show-leave {
  opacity: 1;
}
.show-leave-active {
  transition: all 3s;
}
.show-leave-to {
  top: -10px;
  opacity: 0;
}
.testBox {
  width: 100%;
  height: 50px;
  position: fixed;
  background-color: deepskyblue;
}
.ccbHome-ignore {
  background-color: white;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  /* 新静态首页 start */
  // 公用a标签
  .public_a {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  /* 酒店权益 */
  .jdbox {
    position: relative;
    .jdqy {
      position: absolute;
      top: 5vw;
      left: 2vw;
      width: 55vw;
      height: 12vh;
      /* background-color: #00bfff; */
    }
    .jdzzc {
      position: absolute;
      top: 30vw;
      left: 2vw;
      width: 55vw;
      height: 13vh;
      /* background-color: orange; */
    }
    .fivestar {
      position: absolute;
      /* background-color: #ff69b4; */
      top: 4vw;
      left: 60vw;
      width: 38vw;
      height: 27vh;
    }
  }
  /* 自助餐兑换 */
  .zzcdh {
    position: relative;
    width: 100%;

    .zzcdh-left {
      position: absolute;
      width: 48vw;
      height: 85%;
      top: 0.5rem;
      left: 0;
    }
    .zzcdh-right {
      position: absolute;
      width: 48vw;
      height: 85%;
      top: 0.5rem;
      right: 0;
    }
  }
  /* 新静态首页 end */

  .search {
    top: 15vw;
    z-index: 1;
    /deep/ .van-search {
      background-color: transparent;
      .van-search__content {
        background-color: rgba($color: #fff, $alpha: 0.7);
        box-shadow: 0 0 5px 5px rgba($color: #000000, $alpha: 0.07);
      }
      .van-cell {
        padding: 0 0 0 0;
        line-height: 34px;
        input {
          @include placeholderColor(rgba($color: #fff, $alpha: 1));
        }
      }
    }
    /deep/ .van-field__left-icon {
      color: #fff;
    }
  }
  .prdList {
    .prdListItem {
      overflow: hidden;
      > img {
        width: 50vw;
        height: 38vw;
      }
      .prdInfo {
        font-size: 3.3vw;
        .prdTitle {
          font-size: 3.6vw;
        }
        .prdSubTitle {
          font-size: 3.2vw;
        }
        .instalment {
          /* align-self: flex-start; */
          > span:nth-child(2) {
            font-size: 4.5vw;
            line-height: 1.1;
          }
          > span {
            display: flex;
            align-items: flex-end;
          }
        }
        .originalPrice {
          /* align-self: flex-start; */
        }
      }
      .freeInterest {
        font-size: 3.2vw;
        background: linear-gradient(to right, #e5b860, #c59544);
        line-height: 1.8;
        transform: scale(0.8);
      }
    }
    .prdListItem ~ .prdListItem {
      margin-top: 3vw;
    }
  }
  .oneColumnGrd {
    border: 1px solid #525868;
    background-color: #2a354e;
    .oneColumnGrdInner {
      box-shadow: 0 0 4px 3px rgba($color: #000000, $alpha: 0.26);
      > img {
        border: 1px solid #bea78c;
        height: calc(58vw * 0.58);
        object-fit: cover;
      }
      .oneColumnGrdInfoRow1 {
        font-size: 3.2vw;
        > span:first-child {
          color: #e4ceb2;
          font-size: 3.4vw;
        }
        > span:last-child {
          display: inline-block;
          text-align: left;
          min-width: 130px;
          > span {
            color: #e4ceb2;
          }
          > span:nth-child(2) {
            font-size: 4.34vw;
          }
          > span:last-child {
            color: #ababad;
          }
        }
      }
      .oneColumnGrdInfoRow2 {
        font-size: 3.2vw;
        > span {
          color: #ababad;
        }
        > span:nth-child(2) {
          display: inline-block;
          text-align: left;
          min-width: 130px;
          > span:last-child {
            background-color: #94765c;
          }
        }
      }
    }
  }
  .twoColumnPrd {
    border: 1px solid #525868;
    background-color: #2a354e;
    .twoColumnPrdInner {
      box-shadow: 0 0 4px 3px rgba($color: #000000, $alpha: 0.26);
      > img {
        border: 1px solid #bea78c;
        height: calc(58vw * 0.58);
        object-fit: cover;
      }
      .twoColumnPrdInfo {
        font-size: 3.2vw;
        height: 90px;

        > div:first-child {
          color: #e4ceb2;
          font-size: 3.6vw;
        }
        > div:nth-child(2) {
          color: #ababad;
        }
        .insPrice {
          height: 6vw;
          min-width: 130px;
          text-align: left;
          > span:first-child {
            color: #e4ceb2;
          }
          > span:nth-child(2) {
            color: #e4ceb2;
            font-size: 4.2vw;
          }
          > span:last-child {
            color: #ababad;
          }
        }
        > div:last-child {
          color: #ababad;
          min-width: 130px;
          text-align: left;
          > span:last-child {
            background-color: #94765c;
          }
        }
      }
    }
  }
  .seckillArea {
    width: 100vw;
    background-color: #2a354e;
    .seckillItem {
      width: calc(50vw - 4.5vw);
      border: 1px solid #525868;
      .seckillItemInner {
        > img {
          width: 100%;
          height: 42vw;
          object-fit: cover;
          border: 1px solid #bea78c;
          box-sizing: border-box;
        }
        > span:first-child {
          $timeBgColor: #b43928;
          left: -1vw;
          top: 1.5vw;
          width: 34vw;
          border-top: 5.5vw solid $timeBgColor;
          border-right: 2vw solid transparent;
          > span {
            top: -5vw;
            left: 1vw;
          }
        }
        .seckillItemInfo {
          border: 1px solid #525868;
          flex: 1;
          > div:first-child {
            color: #b2a392;
          }
          > div:nth-child(2) {
            > span:first-child {
              color: #b2a392;
              > span:last-child {
                color: #e2c7a9;
              }
            }
            > span:last-child {
              line-height: 1.6;
              transform: scale(0.85);
            }
          }
        }
      }
    }
  }
}
.service {
  bottom: 15vw;
  margin-left: 3vw;
  padding: 1vw 2vw;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #0000005c;
}
.zxqy {
  position: relative;
  .zxqy-title {
    width: 100%;
    height: 100px;
  }
  .zxqy-item {
    width: 100%;
    height: 480px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.blackingCard {
  position: relative;
  .blackingCard-item,
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
