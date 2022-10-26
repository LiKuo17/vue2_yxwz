<!-- 订单详情页1 -->
<template>
  <div class="orderDetail1" v-if="item != {}">
    <header>
      <div class="header_Box">
        <van-nav-bar title="订单详情" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="orderDetail1_section">
      <div class="orderStatusBox">
        订单编号：<span id="herfcopy" class="yes-touch">{{ item.orderid }}</span
        >&nbsp;&nbsp;&nbsp;<van-button
          size="mini"
          type="default"
          @click="doCopy(item.orderid)"
          >复制</van-button
        >
      </div>
      <div class="card address_Box">
        <template v-if="item.service_status == 0">
          <p
            class="bourse bg_fukuan"
            v-if="item.status == 1 && item.ispaied == 0"
          ></p>
          <p class="bourse bg_fahuo" v-if="item.status == 2"></p>
          <p class="bourse bg_qianshou" v-if="item.status == 3"></p>
          <p class="bourse bg_pingjia" v-if="item.status == 4"></p>
          <p class="bourse bg_wancheng" v-if="item.status == 5"></p>
          <p class="bourse bg_quxiao" v-if="item.status == -1"></p>
          <p class="bourse bg_shixiao" v-if="item.status == -2"></p>
        </template>
        <template v-if="item.service_status != 0">
          <p class="bourse bg_shouhou1" v-if="item.service_status <= 13"></p>
          <p class="bourse bg_shouhou2" v-if="item.service_status > 13"></p>
        </template>
        <p class="bizname">{{ item.bizname }}</p>
      </div>
      <div class="card address_Box" style>
        <div class="bourse bg_address"></div>
        <div class="content1">
          <p class="bizname">
            {{ item.delivery_receiver }}
            <span class="tel">&nbsp;&nbsp;&nbsp;{{ item.delivery_tel }}</span>
          </p>
          <p class="bizname">
            {{ item.delivery_state }} {{ item.delivery_city }}
            {{ item.delivery_region }}{{ item.delivery_address }}
          </p>
        </div>
      </div>
      <div class="card content2">
        <p>
          下单时间:&nbsp;&nbsp;&nbsp;{{
            $fun.getTimeforTimestamp(item.ordertime).split(" ")[0]
          }}
        </p>
      </div>
      <div class="card content2" @click="handleToGoodsDetail">
        <div class="img_Box1">
          <img
            :src="imgServerAdd + item.iconurl"
            onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
          />
        </div>
        <div class="item_Box">
          <p>
            <span class="item_name">{{ item.prdname }}</span>
            <br />
            <span class="item_price"
              >￥{{
                item.instalments == 0 ? item.amount_month : item.amt
              }}</span
            >
          </p>
          <p class="flexCenter">
            <span class="item_size">
              颜色:{{ item.sku_type1 }};
              <br />
              尺寸:{{ item.sku_type2 }};
            </span>
            <span class="item_count" v-if="item.instalments > 1"></span>
            <span class="item_quantity">数量 X {{ item.quantity }}</span>
          </p>
        </div>
      </div>
      <div class="btnBox">
        <van-button
          style="margin-bottom: 10px;"
          @click="toPay($route.query.orderId)"
          size="large"
          round
          block
          color="linear-gradient(to right,#1CDA9A,#06B4C5)"
          v-if="item.ispaied == 1"
          >继续支付</van-button
        >
        <van-button @click="back()" size="large" round block
          >返回上一页</van-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
import { Button, Toast, NavBar } from "vant";
export default {
  data() {
    return {
      item: {},
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
    };
  },

  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    [NavBar.name]: NavBar,
  },

  computed: {},

  mounted() {},

  methods: {
    handleToGoodsDetail() {
      this.$router.push({ path: "detail", query: { prdno: this.item.prdno } });
    },
    getDetail() {
      this.$http
        .get("/m/orders/api/getitem", {
          params: {
            orderId: this.$route.query.orderId,
          },
        })
        .then((res) => {
          console.log(res);
          this.item = res.data;
        });
    },
    back() {
      this.$router.back();
    },
    doCopy(text) {
      let inputTag = document.createElement("input");
      inputTag.value = text;
      document.body.append(inputTag);
      inputTag.select();
      document.execCommand("Copy");
      document.body.removeChild(inputTag);
      Toast("复制成功");
    },
    toPay(_orderid) {
      this.$router.push({
        path: "/toPay",
        query: {
          orderId: _orderid,
        },
      });
    },
  },
  created() {
    this.getDetail();
  },
};
</script>
<style>
/* @import url("../../../static/search.css"); */
@import url("../../../static/navbar.css");
</style>
<style scoped>
.btnBox {
  padding: 50px;
}

.content2 {
  display: flex;
}

.img_Box1 {
  display: inline-block;
  height: 184px;
  width: 200px;
  border-radius: 4px;
  overflow: hidden;
}

.item_Box {
  text-align: left;
  padding-left: 20px;
  width: 399px;
}

.tel {
  color: #5f656b;
  font-size: 28px;
}

.content1 {
  text-align: left;
  width: calc(100% - 80px - 40px);
}

.bizname {
  color: #262733;
}

.address_Box {
  display: flex;
  align-items: center;
}

.card {
  margin: 20px;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
}

.bourse {
  width: 80px;
  height: 80px;
  color: rgb(235, 101, 101);
  margin-right: 40px;
}

.bg_shouhou1 {
  background: url(../../assets/img/shouhou1.png) no-repeat center center;
  background-size: contain;
}

.bg_address {
  background: url(../../assets/img/address_icon.png) no-repeat center center;
  background-size: contain;
}

.bg_shouhou2 {
  background: url(../../assets/img/shouhou2.png) no-repeat center center;
  background-size: contain;
}

.bg_shouhou3 {
  background: url(../../assets/img/shouhou3.png) no-repeat center center;
  background-size: contain;
}

.bg_shixiao {
  background: url(../../assets/img/shixiao.png) no-repeat center center;
  background-size: contain;
}

.bg_quxiao {
  background: url(../../assets/img/quxiao.png) no-repeat center center;
  background-size: contain;
}

.bg_wancheng {
  background: url(../../assets/img/wancheng.png) no-repeat center center;
  background-size: contain;
}

.bg_pingjia {
  background: url(../../assets/img/pinjia.png) no-repeat center center;
  background-size: contain;
}

.bg_qianshou {
  background: url(../../assets/img/qianshou.png) no-repeat center center;
  background-size: contain;
}

.bg_fahuo {
  background: url(../../assets/img/fahuo.png) no-repeat center center;
  background-size: contain;
}

.bg_fukuan {
  background: url(../../assets/img/fukuan.png) no-repeat center center;
  background-size: contain;
}

.orderDetail1 {
}

.orderDetail1_section {
  height: calc(100vh - 92px);
  overflow-y: auto;
  background-color: #f6f6f6;
}

.orderStatusBox {
  text-align: left;
  padding-left: 40px;
  height: 200px;
  color: white;
  background-image: linear-gradient(to right, #1dda9b, #059dac);
  display: flex;
  align-items: center;
}
</style>
