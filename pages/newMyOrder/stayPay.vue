<template>
  <!-- 待付款订单 -->
  <div>
    <div class="stayPayTime" v-if="this.comfirmData.status == 1">
      <div class="stayPayTime-left">
        <img src="../../assets/img/待支付.png" alt="" />
      </div>
      <div class="stayPayTime-right">
        <p>等待买家付款</p>
        <p class="gray">
          请于
          <van-count-down
            ref="countDown"
            class="timer"
            @finish="finish"
            :time="time"
            format="mm 分 ss 秒"
          >
            <template #default="timeData">
              <span class="block">{{
                timeData.minutes < "10" ? "0" + timeData.minutes : timeData.minutes || "~"
              }}</span>
              <span class="colon">:</span>
              <span class="block">{{
                timeData.seconds < "10" ? "0" + timeData.seconds : timeData.seconds || "~"
              }}</span>
            </template> </van-count-down
          >内付款，超时订单将自动关闭
        </p>
      </div>
    </div>

    <div class="stayPayTime" v-if="this.comfirmData.status == 0" ref="countDown">
      <div class="stayPayTime-left">
        <img
          src="https://img.yzcdn.cn/public_files/2018/08/31/85f176382a5babc1eeed69ab34eac3ab.png"
          alt=""
        />
      </div>
      <div class="stayPayTime-right">
        <p style="font-size: 14px; font-weight: 700; color: #323233">交易关闭</p>
        <p class="gray">超时未付款，订单自动关闭</p>
      </div>
    </div>

    <div class="stayPayTime"  v-if="this.comfirmData.status == 4" ref="countDown">
      <div class="stayPayTime-left">
        <img
          src="https://img.yzcdn.cn/public_files/2018/08/30/345a61fbbf62d65a3a8c528272426666.png"
          alt=""
        />
      </div>
      <div class="stayPayTime-right">
        <p style="font-size: 14px; font-weight: 700; color: red">交易已完成</p>
        <p class="gray">
          <!-- 超时未付款，订单自动关闭 -->
        </p>
      </div>
    </div>

    <div class="comfirmOrder">
      <!-- 商品盒子 start -->
      <div class="shopBox" v-if="flag == 2">
        <div class="shopBox-item1">
          <van-cell
            title="黑金商旅"
            icon="shop-o"
            value=""
            @click="$router.push({ path: '/' })"
          >
          </van-cell>
        </div>
        <div class="shopBox-item2">
          <div class="shopBox-item2-left">
            <img src="../../assets/img/card.jpg" alt="" />
          </div>
          <div class="shopBox-item2-right">
            <div class="blackcard1">黑金全年卡</div>
            <div class="blackcard2">黑金全年卡</div>
            <div style="width: 100%">
              <div class="card-price-left" style="color: #c3a769; font-weight: bold">
                ￥368.00
              </div>
              <div class="card-num">
                <span style="padding-right: 15px">x1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopBox" v-if="flag == 3 || productType == 3">
        <div class="shopBox-item1">
          <van-cell
            title="黑金商旅"
            icon="shop-o"
            value=""
            @click="$router.push({ path: '/' })"
          >
          </van-cell>
        </div>
        <div class="shopBox-item2">
          <div class="shopBox-item2-left">
            <img :src="serveAddress + this.comfirmData.mainImage" alt="" />
          </div>
          <div class="shopBox-item2-right">
            <div class="blackcard1">{{ this.comfirmData.productName }}</div>
            <div class="blackcard2">{{ this.comfirmData.roomName }}</div>
            <div style="width: 100%">
              <div class="card-price-left" style="color: #c3a769; font-weight: bold">
                ￥{{ this.comfirmData.price }}
              </div>
              <div class="card-num">
                <span style="padding-right: 15px">x{{ this.comfirmData.number }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shopBox" v-if="flag == 1">
        <div class="shopBox-item1">
          <van-cell
            title="黑金商旅"
            icon="shop-o"
            value=""
            @click="$router.push({ path: '/' })"
          >
          </van-cell>
        </div>
        <div class="shopBox-item2">
          <div class="shopBox-item2-left">
            <img :src="serveAddress + this.comfirmData.mainImage" alt="" />
          </div>
          <div class="shopBox-item2-right">
            <div class="blackcard1">{{ this.comfirmData.productName }}</div>
            <div class="blackcard2">{{ this.comfirmData.roomName }}</div>
            <div style="width: 100%">
              <div class="card-price-left" style="color: #c3a769; font-weight: bold">
                ￥{{ this.comfirmData.price }}
              </div>
              <div class="card-num">
                <span style="padding-right: 15px">x{{ this.comfirmData.number }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品盒子 end -->
      <div class="couponBox">
        <div class="shopPrice">
          <span class="gray">买家留言</span>
          <span>无</span>
        </div>
      </div>

      <div class="couponBox">
        <div class="shopPrice shopPrice-line">
          <span class="gray">商品金额</span>
          <span>￥{{ this.comfirmData.totalPrice }}</span>
        </div>
        <div class="shopPrice">
          <span></span>
          <span
            >合计:
            <span style="color: #c3a769; font-weight: bold">{{
              this.comfirmData.totalPrice
            }}</span></span
          >
        </div>
      </div>

      <!-- 订单编号 -->
      <div class="couponBox">
        <div class="shopOrder">
          <span class="gray"
            >订单编号：
            <span class="black">{{ this.comfirmData.orderNo }}</span>
            <span class="copy black">复制</span>
          </span>
          <span></span>
        </div>
        <div class="shopOrder">
          <span class="gray"
            >创建时间：<span class="black">{{ this.comfirmData.createTime }}</span></span
          >
          <span></span>
        </div>
      </div>

      <!-- 支付按钮 -->
      <div class="action-btn-wrap" v-if="this.comfirmData.status == 1">
        <div class="shouldPay">
          <span
            >应付: <span style="color: #c3a769">￥</span
            ><span style="color: #c3a769; padding-right: 15px; font-size: 18px">{{
              this.comfirmData.totalPrice
            }}</span></span
          >
        </div>
        <div class="paybtn">
          <van-button
            color="#c3a769"
            round
            block
            @click="$router.push({ path: '/comfirmOrderr' })"
            >去支付</van-button
          >
        </div>
      </div>
      <div class="action-btn-wrap noPay" v-if="this.comfirmData.status != 1">
        <div class="paybtn">
          <van-button color="#c3a769" round block @click="delOrder">删除订单</van-button>
          <van-button color="#c3a769" round block @click="orderAgain"
            >再来一单</van-button
          >
        </div>
      </div>
    </div>
    <!-- <van-popup v-model="show">内容</van-popup> -->
  </div>
</template>

<script>
import fileServerAddress from "@/assets/js/config";
import { $getOnlyData, $postOnlyData } from "@/api/index";
import { Toast, Dialog } from "vant";
export default {
  name: "stayPay",
  data() {
    return {
      timeData: {},
      productType: "",
      seconds: "",
      minutes: "",
      flag: "",
      serveAddress: fileServerAddress.fileServerAddress,
      comfirmData: "",
      time: 60 * 60 * 1000,
    };
  },
  methods: {
    //再来一单
    orderAgain() {
      Toast.fail("抱歉，暂时不支持该功能");
    },

    //获取订单详情
    async getOrderDetail() {
      let res = await $getOnlyData("orderDetail", this.$route.query.id);
      this.comfirmData = res.data;
      console.log("this.comfirmData", this.comfirmData);
    },

    //获取待支付订单剩余时间
    countTime() {
      var date = new Date();
      var now = date.getTime();
      //设置截止时间
      var createDate = new Date(this.comfirmData.createTime);
      var create = createDate.getTime();
      //时间差
      var leftTime = create + 60 * 60 * 1000 - now;
      this.time = leftTime;
      if (this.time < 0 && this.$route.query.status == 1) {
        clearTimeout(this.countTime);
        this.cancelOrder();
      } else {
        setTimeout(this.countTime, 1000);
      }
    },

    // 倒计时时间走完
    finish() {
      // this.noPay = true;
      // this.waitPay = false;
    },

    //取消订单
    async cancelOrder() {
      await $postOnlyData("canOrderList", this.$route.query.id);
    },

    //删除订单
    delOrder() {
      Dialog.confirm({
        title: "确认删除订单",
        message: "删除订单后无法恢复，无法处理您的售后问题，请慎重考虑。",
      })
        .then(() => {
          this.confirm();
        })
        .catch(() => {});
    },

    // 确认删除
    async confirm() {
      let res = await $postOnlyData("delOrderList", this.$route.query.id);
      console.log(res);
      if (res.code == 0) {
        Toast.success("删除成功");
        this.$router.push("/ccbOrder");
      }
    },
    pause() {},
  },

  created() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });

    this.flag = this.$route.query.prodType;

    this.productType = this.$route.query.productType;

    // if (this.$route.query.status == 4) {
    //   this.pay = true;
    //   this.noPay = false;
    //   this.waitPay = false;
    // }

    console.log(111111111, this.$route.query.id);
    if (this.$route.query.id) {
      console.log(1111);
      this.getOrderDetail();
      this.countTime();
    } else {
      console.log(222);
      this.comfirmData = JSON.parse(localStorage.getItem("comfirmData"));
    }
  },
};
</script>

<style lang="scss" scoped>
.gray {
  color: #969799;
}
.black {
  color: black;
}
/* 头部待付款 */
.stayPayTime {
  position: relative;
  background: #fff;
  padding: 20px 30px;
  display: flex;
  .stayPayTime-left {
    width: 75px;
    height: 75px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .stayPayTime-right {
    width: 90%;
    height: 100%;
    font-size: 20px;
    color: black;
    text-align: left;
    text-indent: 1em;
    line-height: 35px;
  }
}
.stayPayTime::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}
.comfirmOrder {
  position: relative;
  width: 100vw;
  margin: 3vh 0 0;
  min-height: 100vh;
  background-color: #f7f8fa;

  /* 商品信息 */
  .shopBox {
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    background-color: white;
    margin-bottom: 20px;
    .shopBox-item1 {
    }

    .shopBox-item2 {
      display: flex;
      align-items: center;
      height: 100%;
      padding-top: 20px;
      .shopBox-item2-left {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
          height: 100%;
        }
      }
      .shopBox-item2-right {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0 6px;
        overflow: hidden;
        .blackcard1,
        .blackcard2 {
          width: 100%;
          margin: 0 6px;
        }
        .blackcard1 {
          color: black;
          font-size: 26px;
        }
        .blackcard2 {
          color: #969799;
          font-size: 20px;
          margin-bottom: 30px;
        }
        .card-price-left {
          width: 50%;
          float: left;
        }
        .card-num {
          float: right;
          width: 50%;
          font-size: 24px;
          color: #969799;
          text-align: right;
        }
      }
    }
  }

  .couponBox {
    margin: 3vw 0;
    .shopPrice,
    .shopOrder {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      padding: 20px 30px 10px !important;
      background-color: white;
    }
    .shopPrice-line {
      border-bottom: 1px solid #f5f6f7;
    }
    .shopOrder {
      span {
        font-size: 22px;
      }
      .copy {
        border: 1px solid #ebedf0;
        padding: 2px;
        margin-left: 6px;
      }
    }
  }
  /deep/ .van-cell__title {
    text-align: left;
  }
  /* 立即开通 */
  .action-btn-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding-bottom: 10px;
    background-color: #fff;
    .shouldPay {
      width: 40vw;
      float: left;
      line-height: 100px;
      padding-left: 240px;
    }
    .paybtn {
      width: 27vw;
      float: right;
    }
    /deep/ .van-button--block {
      display: block;
      width: 26vw !important;
      height: 40px !important;
      margin-top: 2.5vw !important;
    }
    /deep/ .van-button__text {
      color: white !important;
      font-size: 16px;
    }
  }
}
.timer {
  display: inline-block;
  text-indent: 0;
  letter-spacing: 1px;
}
.paybtn {
}
.noPay .paybtn {
  display: flex;
  justify-content: space-around;
  width: 60vw !important;

  /deep/ .van-button {
    width: 26vw !important;
  }
}
</style>
