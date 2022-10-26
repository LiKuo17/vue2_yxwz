<template>
  <div class="test">
    <header>
      <div class="header_Box">
        <van-nav-bar title="支付结果" left-arrow @click-left="back" />
      </div>
    </header>
    <section>
      <div class='container' v-if="Info>=0">
        <img :src="toPayResultInfo[Info].img" style="width:128px;height:auto" />
        <p class="tiptext">{{toPayResultInfo[Info].tiptext}}</p>
        <!-- <p class="tipdesc">订单单号: {{orderId}}, <template v-show="toPayResultInfo[Info].tipdesc != ''">{{toPayResultInfo[Info].tipdesc}}</template></p> -->
        <div>
          <van-button plain hairline @click="goHome()">返回首页</van-button>
          &nbsp;&nbsp;
          <van-button plain hairline color="#05B3C4" @click="gotoOrder()">我的订单</van-button>
          &nbsp;&nbsp;
          <van-button plain v-if="Info!=3" color="#2DBF83" hairline type="info" @click="goDetail()">查看详情</van-button>

          <van-button v-if="Info==3" plain color="#2DBF83" hairline type="info" @click="$router.push('/')">我已取消支付</van-button>
        </div>
      </div>
      <div class='container' v-if="Info==-1">
        <p class="tiptext">订单号不存在</p>
        <van-button plain hairline @click="goHome()">返回首页</van-button>
        &nbsp;&nbsp;
        <van-button plain hairline color="#05B3C4" @click="gotoOrder()">我的订单</van-button>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
  import {
    Button,
    Dialog,
    NavBar
  } from 'vant';

  export default {
    name: 'test',
    data() {
      return {
        orderId: this.$route.query.orderid,
        toPayResultInfo: [{
            tiptext: '已取消支付',
            tipdesc: '',
            img: require("@/assets/img/error.png")
          },
          {
            tiptext: '恭喜您，订单支付成功',
            tipdesc: '我们将尽快为您安排发货',
            img: require("@/assets/img/success.png")
          },
          {
            tiptext: '支付失败',
            tipdesc: '',
            img: require("@/assets/img/error.png")
          },
          {
            tiptext: '正在支付...',
            tipdesc: '',
            img: require("@/assets/img/payloading.png")
          }
        ],
        Info: -1,
        message: this.$route.query.msg
      }
    },
    created() {
      // hideTitleBar();
    },
    mounted() {
      if (this.message.indexOf("取消") >= 0) {
        this.$router.push('/shoppingcart');
      } else if (this.message.indexOf("失败") >= 0) {
        this.Info = 2;
      } else if (this.message.indexOf("成功") >= 0) {
        this.Info = 1;
      } else {
        this.onResful();
      }
    },
    methods: {
      back() {
        this.$router.push({
          path: "/shoppingcart",
          query: {
            active: 1
          }
        });
      },
      onResful() {
        var _this = this;
        // let count = 0;
        _this.getOrderStatus();

        // if (count > 2) {
        //   clearInterval(_this._timeOut);
        //   Dialog.confirm({
        //       title: '提示',
        //       message: '是否支付出现问题',
        //       confirmButtonText: '等待支付结果',
        //       cancelButtonText: '我已取消支付'
        //     })
        //     .then(() => {
        //       // on confirm
        //       count = 0;
        //       _this.onResful();
        //     })
        //     .catch(() => {
        //       // on cancel
        //       clearInterval(_this._timeOut);
        //       _this.$router.push('/');
        //     });
        // }
        // if (count <= 2) {
        //   _this.getOrderStatus();
        // }
        // count++;

      },
      goDetail() {
        // this.$router.push(`/orderDetail?orderId=${this.$route.query.oderid}`)
        this.$router.push({
          path: '/orderDetail',
          query: {
            orderId: this.$route.query.orderid
          }
        })
      },
      goHome() {
        this.$router.push('/');
        //window.history.go(window.history.length*-1);
      },
      gotoOrder() {
        this.$router.push({
          path: '/myOrder'
        })
      },
      getOrderStatus() {
        this.$http.get("/m/orders/api/getitem", {
          params: {
            orderId: this.$route.query.orderid
          }
        }).then(res => {
          console.log();
          if (res.data != undefined && res.data != null && res.data != '') {
            switch (res.data.ispaied) {
              case 0:
                this.Info = 0;
                break;
              case 1:
                this.Info = 3;
                break;
              case 2:
                this.Info = 1;
                break;
              case 3:
                this.Info = 2;
                break;
            }
          };
        })
      }
    },
    components: {
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [NavBar.name]: NavBar
    },
    beforeDestroy() {
      if (this._timeOut) {
        clearInterval(this._timeOut);
      }
    }
  }
</script>

<style>
  @import url("../../../static/navbar.css");
</style>
<style scoped>
  .container {
    text-align: center;
    padding-top: 200px;
  }

  .tiptext {
    font-weight: bold;
    font-size: 30px;
    padding-bottom: 20px;
  }

  .tipdesc {
    font-size: 18px;
    padding-bottom: 100px;
  }
</style>
