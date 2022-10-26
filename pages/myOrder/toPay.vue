<template>
      <div class="topay">
            <header>
                  <div class="header_Box">
                        <van-nav-bar title="发起支付" left-arrow @click-left="back" />
                  </div>
            </header>
            <section class="topay_section" v-if="payObj">
                  <article class="a1">
                        <div class="card Content">
                              <p class="pay_P" style="color: rgb(51,51,51); font-weight: bold;border-bottom: 1px solid rgb(223,223,223);">
                                    <span class="left">订单合计</span>
                                    <span class="right" v-html="'￥' + payObj.amount.toFixed(2)"></span>
                              </p>
                              <p class="pay_P1">
                                    <span class="left">订单号码</span>
                                    <span class="right">
                                          <template>
                                                <div v-for="(item, index) in payObj.orders" :key="index">{{ item }}<br /></div>
                                          </template>
                                    </span>
                              </p>
                              <p class="pay_P1">
                                    <span class="left">商品名称</span>
                                    <span class="right">
                                          {{ payObj.prdNames }}
                                    </span>
                              </p>
                        </div>
                  </article>
                  <article class="a1">
                        <p class="title_p">支付金额</p>
                        <div class="card Content wxOuter">
                              <!-- <p
                                          v-if="payObj.payMonths > 0"
                                          class="pay_P"
                                          v-html=" '分期￥' + payObj.monthAmt.toFixed(2) + '元*' + payObj.payMonths + '期'"
                                    ></p>
                                    <p
                                          v-else
                                          class="pay_P"
                                          v-html="'不分期支付￥' + payObj.amount.toFixed(2) + '元'"
                                    ></p> -->
                              <p class="pay_P text-red" v-html="'￥' + payObj.monthAmt.toFixed(2) + '*' + payObj.payMonths + '期'"></p>
                              <!-- <p class="pay_P" v-html="'不分期支付￥' + payObj.amount.toFixed(2) + '元'"></p> -->
                        </div>
                  </article>

                  <article class="a1" v-if="payObj.meetAmount !== -1">
                        <p class="title_p">满减优惠</p>
                        <div class="card Content wxOuter">
                              <p v-if="payObj.meetAmount == 40" class="pay_P text-red">已满 400元 减 40元</p>
                              <p v-if="payObj.meetAmount == 80" class="pay_P text-red">已满 800元 减 80元</p>
                              <p v-if="payObj.meetAmount == 0" class="pay_P text-red">不符合满减条件</p>
                        </div>
                  </article>

                  <article class="a1">
                        <p class="title_p">支付方式</p>
                        <van-radio-group v-model="payMode">
                        <!-- <div class="card Content wxOuter" @click="payMode = '1'">
                                    <p class="wx-pay"></p>
                                    <p class="pay_P">微信支付</p>
                                    <van-radio class="pay_radio" icon-size="22" name="1" />
                              </div>
                              <div class="card Content wxOuter pdTop" @click="payMode = '2'">
                                    <p class="wx-pay zfb-pay"></p>
                                    <p class="pay_P">支付宝</p>
                                    <van-radio class="pay_radio" icon-size="22" name="2" />
                              </div>
                              <div class="card Content wxOuter pdTop" @click="payMode = '3'">
                                    <p class="wx-pay union-pay"></p>
                                    <p class="pay_P">云闪付</p>
                                    <div class="wx-pay union-pay1"></div>
                                    <van-radio class="pay_radio" icon-size="22" name="3" />
                              </div> -->
                              <div class="card Content wxOuter" @click="payMode = '4'">
                                    <p class="wx-pay ccb-pay"></p>
                                    <p class="pay_P">建行分期支付</p>
                                    <van-radio class="pay_radio" icon-size="22" name="4" />
                              </div>
                        </van-radio-group>
                  </article>

                  <article class="a2">
                        <div class="Content1">
                              <van-button round type="danger" color="linear-gradient(to right,#1CDA9A,#06B4C5)" size="large" @click="tryOrderPay"
                                    >立即支付</van-button
                              >
                        </div>
                        <div class="Content2">
                              <van-button @click="gotoOrder()" size="large" round block>暂时不支付</van-button>
                              <a class="remind_p" href="javascript:;"></a>
                        </div>
                  </article>
            </section>
            <footer></footer>
            <!-- <van-popup v-model="showPayBack" position="center" round :style="{ height: '24%', width: '80%' }" :close-on-click-overlay="false">
                  <div class="popSlot">
                        <div>请确认支付是否已完成</div>
                        <div @click="handlePayComplete">已完成支付</div>
                        <div @click="handlePayProblem">支付遇到问题，重新支付</div>
                  </div>
            </van-popup> -->
      </div>
</template>

<script>
import { NavBar, Icon, RadioGroup, Radio, Button, Popup } from "vant";
import _config from "../../assets/js/config";

export default {
      name: "test",
      data() {
            return {
                  payradio: 0,
                  payObj: null,
                  bol: true,
                  // showPayBack: false,
                  payMode: null,
                  isPc: null
            };
      },
      watch: {
            payMode(newV) {
                  newV && (localStorage.payMode = newV);
            },
      },
      created() {
            if (localStorage.payMode) {
                  this.payMode = localStorage.payMode;
            } else {
                  this.payMode = "4";
            }
            var _orderId = -1;
            _orderId = this.$route.query.orderId;
            this.getOrderDetail(_orderId.toString());
      },
      mounted() {
            // 判断是pc还是移动端
            let userAgentInfo = navigator.userAgent;
            let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            // modile
            if(Agents.some(item => userAgentInfo.toLowerCase().includes(item.toLowerCase()))){
                  this.isPc = 2
            }else {
                  this.isPc = 1
            }
            console.log(this.isPc,'isPc');
      },
      methods: {
            back() {
                  this.$router.push({
                        path: "/myOrder",
                        query: {
                              type: 1,
                        },
                  });
            },
            getOrderDetail(_orderId) {
                  this.$http
                        .get("/m/orders/api/getOrderPayInfo", {
                              params: {
                                    orderIds: _orderId,
                              },
                        })
                        .then(e => {
                              if (e.result == 0) {
                                    this.payObj = e.data;
                                    this.payObj.orders = this.payObj.orders.split(",");
                              }
                        });
            },
            testSubmit() {
                  var _this = this;
                  if (_this.$route.query.orderId.toString().indexOf(",") >= 0) {
                        alert("结算暂时不支持多个订单");
                  } else {
                        _this.$http
                              .get("/m/orders/api/setOrderIsPaied", {
                                    params: {
                                          orderId: _this.$route.query.orderId.toString(),
                                    },
                              })
                              .then(function(e) {
                                    if (e.result == 0) {
                                          alert("提交成功");
                                          _this.$router.push("/shoppingcart");
                                    }
                              });
                  }
            },
            //立即支付
            tryOrderPay() {
                  if (this.payMode) {
                        if (this.bol) {
                              this.bol = false;
                              console.log("-----------" + this.bol);
                              this.$http
                                    .post("/m/orders/api/getOrderPayInfo", {
                                          orderIds: this.$route.query.orderId.toString(),
                                          isGetPayInfo: true,
                                          _CallBackUrl: _config.clientAddress + "/#/toPaySuccess",
                                          payMode: Number(this.payMode),
                                          isPc: Number(this.isPc),
                                          //获取本机外网ip
                                          ip: returnCitySN["cip"],
                                    })
                                    .then(e => {
                                          setTimeout(() => {
                                                this.bol = true;
                                          }, 7000);
                                          localStorage.outradeno = e.data.outradeno;
                                          if (e.result == 0) {
                                                // //显示是否已支付提示
                                                // setTimeout(() => {
                                                //       this.showPayBack = true;
                                                // }, 2000);
                                                if (e.data.payMode == 1) {
                                                      //微信支付
                                                      // window.open(e.data.mweb_url);
                                                      let myA = document.createElement("a");
                                                      myA.rel = "noreferrer";
                                                      myA.href = e.data.mweb_url;
                                                      myA.style.display = "none";
                                                      document.body.appendChild(myA);
                                                      myA.click();
                                                      // window.location = e.data.mweb_url
                                                } else if (e.data.payMode == 2) {
                                                      //支付宝固定方法
                                                      var reHtml = e.data.alipay_payInfo;
                                                      var div = document.createElement("div");
                                                      div.innerHTML = reHtml;
                                                      document.body.appendChild(div);
                                                      document.forms[0].submit();
                                                } else if (e.data.payMode == 3) {
                                                      //云闪付（银联支付）
                                                      localStorage.unionPay = JSON.stringify(e.data.unionPayHtml);
                                                      //静态html文件，执行document.write操作，写入后端返回的html
                                                      location.href = "/static/unionPayCallBack.html";
                                                } else if (e.data.payMode == 4) {
                                                      // 建行支付
                                                      top.location.href = e.data.ccb_url
                                                      console.log(e.data.ccb_url,'ccb_url');
                                                }
                                                var payMonths = e.data.payMonths;
                                                var payInfo = e.data.payInfo;
                                                console.log("发起支付：" + payInfo);
                                                var cfg = {
                                                      _isThirdLogin: "cmbc_ymjp",
                                                      params: payInfo,
                                                };
                                                Fw.goPay(cfg);
                                          } else {
                                                this.$toast(e.msg);
                                          }
                                    });
                              console.log("发起支付:" + _config.clientAddress + "/#/toPaySuccess");
                        } else {
                              this.$toast("请勿重复提交订单，请稍后重试");
                        }
                  } else {
                        this.$toast("请选择支付方式");
                  }
            },
            handlePayComplete() {
                  // this.showPayBack = false;
                  this.$http
                        .post("/m/bank/payResult/api/checkPayResult", {
                              outradeno: localStorage.outradeno,
                              payMode: Number(localStorage.payMode),
                        })
                        .then(res => {
                              if (res.result == 0) {
                                    if (res.data.issuccess) {
                                          this.$router.push(`/toPaySuccess?msg=成功&orderid=${this.$route.query.orderId}`);
                                    } else {
                                          this.$toast("稍后将进入自动查单");
                                          setTimeout(() => {
                                                this.gotoOrder();
                                          }, 1500);
                                    }
                              } else {
                                    this.$toast("网络错误，稍后将进入自动查单");
                                    setTimeout(() => {
                                          this.gotoOrder();
                                    }, 1500);
                              }
                        });
            },
            handlePayProblem() {
                  var _this = this;
                  // _this.showPayBack = false;
                  _this.$http
                        .post("/m/bank/payResult/api/cancelPay", {
                              outradeno: localStorage.outradeno,
                        })
                        .then(res => {
                              if (res.result == -1) {
                                    _this.$toast(res.msg);
                              }
                        });
            },
            gotoOrder() {
                  this.$router.push({
                        path: "/myOrder",
                  });
            },
      },
      // beforeRouteEnter(to, from, next) {
      //       next(vm => {
      //             if (from.path == "/") {
      //                   vm.showPayBack = true;
      //             }
      //       });
      // },
      components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Button.name]: Button,
            [Popup.name]: Popup,
      },
};
</script>
<style>
@import url("../../../static/navbar.css");
</style>

<style scoped>
.Content2 {
      margin-top: 60px;
      padding: 0 76px;
      text-align: center;
}

.remind_p {
      color: rgb(153, 153, 153);
}

.Content1 {
      margin-top: 98px;
      padding: 0 76px;
}

.img_Box {
      width: 48px;
      height: 48px;
      display: inline-block;
      vertical-align: middle;
}

.active:active {
      background-color: #f2f3f5;
}

.flexCenter {
      display: flex;
      justify-content: center;
      align-items: center;
}

img {
      height: 100%;
      width: 100%;
      vertical-align: top;
}

i {
      vertical-align: middle;
}

.title_p {
      font-size: 30px;
      color: rgb(51, 51, 51);
      padding: 0 52px;
      margin-bottom: 18px;
}

.left {
      float: left;
}

.right {
      float: right;
}

.wxOuter {
      display: flex;
      align-items: center;
      justify-content: flex-start;
}

.wx-pay {
      background-image: url("/static/img/weixinPay.png");
      background-size: 100%;
      background-position: center;
      width: 48px;
      height: 48px;
      background-repeat: no-repeat;
      margin-left: 20px;
}

.zfb-pay {
      background-image: url(/static/img/zhifubaoPay.png);
}

.union-pay {
      background-image: url(/static/img/unionPay.png);
}
.union-pay1 {
      margin-left: 6vw;
      width: 60px;
      height: 60px;
      background-image: url(/static/img/unionPay1.png);
}
.ccb-pay {
      background-image: url(/static/img/ccbPay.png);
}
.pay_P {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      line-height: 92px;
      font-size: 34px;
}

.pay_radio {
      margin-left: auto;
      margin-right: 6vw;
}

.a1 {
      padding-top: 26px;
}

.pay_P1 {
      padding: 0 20px;
      display: flex;
      line-height: 75px;
      color: rgb(153, 153, 153);
      font-size: 30px;
}

.pay_P1 > span:nth-child(1) {
      min-width: 180px;
}

.topay_section {
      background-color: #f9f9f9;
      width: 100%;
      overflow-y: auto;
      height: calc(100vh - 92px);
      text-align: left;
}

.card {
      background-color: white;
}

.Content {
      border-radius: 10px;
      margin: 0 32px;
}
.popSlot {
      display: flex;
      flex-direction: column;
      height: 100%;
}
.popSlot > div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
}
.popSlot > div:first-child {
      flex: 3;
      color: #000;
      border-bottom: #d1d3d3 solid 1px;
      height: 42%;
}
.popSlot > div:nth-child(2) {
      height: 1;
      color: rgb(41, 190, 129);
      border-bottom: #d1d3d3 solid 1px;
      height: 29%;
}
.popSlot > div:last-child {
      height: 1;
      color: #929292;
      height: 29%;
}
.pdTop {
      margin-top: 1.2vh;
}
.van-popup--center.van-popup--round {
      border-radius: 8px;
}
</style>
