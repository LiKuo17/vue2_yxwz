<template>
      <div class="confirmOrder">
            <header>
                  <div class="header_Box">
                        <van-nav-bar title="确认订单" left-arrow @click-left="back" />
                  </div>
            </header>
            <section class="confirmOrder_section">
                  <article class="a1">
                        <div class="address_Box card" v-if="hasDefaultAdd" @click="toAddManage">
                              <div class="left_Box address_Content1">
                                    <div class="img_Box">
                                          <img src="../../assets/img/address_icon.png" />
                                    </div>
                              </div>
                              <div class="left_Box address_Content2">
                                    <p>
                                          <span class="address_userName">{{ defaultAdd.name }}</span
                                          ><span class="address_phoneNumber">{{ defaultAdd.tel }}</span>
                                    </p>
                                    <p class="address_p">
                                          {{ defaultAdd.province }} {{ defaultAdd.city }} {{ defaultAdd.county }} {{ defaultAdd.addressDetail }}
                                    </p>
                              </div>
                              <div class="address_Content3">
                                    <van-icon name="arrow" />
                              </div>
                        </div>
                        <div class="address_Box card" v-if="!hasDefaultAdd" @click="toAddManage">
                              <div class="left_Box address_Content1">
                                    <div class="img_Box">
                                          <img src="../../assets/img/address_icon.png" />
                                    </div>
                              </div>
                              <div class="left_Box address_Content2">
                                    <p class="address_p">您还没有设置默认收货地址噢。</p>
                              </div>
                              <div class="address_Content3">
                                    <van-icon name="arrow" />
                              </div>
                        </div>
                  </article>
                  <article class="a1">
                        <div class="order_Box card" v-for="(item, index) in orderList" :key="index">
                              <div class="order_Content">
                                    <div class="img_Box1">
                                          <img
                                                :src="item.img"
                                                onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                                          />
                                    </div>
                                    <div class="item_Box">
                                          <p>
                                                <span class="item_name">
                                                      {{ item.name }}
                                                </span>
                                                <span class="item_price"
                                                      >￥<!-- {{item.instalments==0?item.amount_month:item.amt}} -->{{ item.saleprice }}</span
                                                >
                                          </p>
                                          <p>
                                                <span class="item_size">颜色:{{ item.sku_type1 }}; <br />尺寸:{{ item.sku_type2 }};</span
                                                ><span class="item_count" v-if="item.instalments > 1"></span>
                                          </p>
                                          <p>
                                                <!-- <span v-if="item.instalments != 0" class="notice"
                                                      >分期价：{{ item.amount_month }} X {{ item.instalments }}期</span
                                                > -->
                                                <span class="notice">￥{{ item.amount_month }}*{{ item.instalments }}期</span>
                                          </p>
                                    </div>
                              </div>

                              <div class="order_Content1">
                                    <p class="order_P1">
                                          <span>购买数量</span><span>{{ item.quantity }}</span>
                                    </p>
                                    <p class="order_P1"><span>配送方式</span><span>快递 免邮 </span></p>
                                    <!-- <p class="order_P1">
                                          <span>满减</span>
                                          <span v-if="allPrice>= 400 && allPrice <800">满400 减 40</span>
                                          <span v-if="allPrice >= 800">满800及以上 减 80</span>
                                          <span v-if="allPrice < 400">不符合满减条件</span>
                                    </p> -->

                                    <!-- 立即购买只有一件商品，不需要考虑合并结算的问题 -->
                                    <!-- <p class="order_P1" v-if="froms == 'detail'">
                                          <van-coupon-cell
                                                :border="false"
                                                :coupons="item.coupons"
                                                :chosen-coupon="item.chosenCoupon"
                                                @click="item.showList = true"
                                                style="padding: 0;font-size: 16px;line-height: 11.2vw;content: 'viewport-units-buggyfill; width: 74.4vw; line-height: 11.2vw';"
                                          />
                                          <van-popup v-model="item.showList" round position="bottom" style="padding-top: 4px;">
                                                <van-coupon-list
                                                      :showExchangeBar="false"
                                                      :coupons="item.coupons"
                                                      :chosen-coupon="item.chosenCoupon"
                                                      :disabled-coupons="item.disabledCoupons"
                                                      @change="value => onChange(value, item, index)"
                                                />
                                          </van-popup>
                                    </p> -->

                                    <p class="order_P1">
                                          <span>合计</span
                                          ><span>
                                                {{ (item.saleprice * item.quantity - item.disAmount).toFixed(2) }}
                                          </span>
                                    </p>
                                    <p class="order_P1">
                                          <span>订单备注</span>
                                          <span class="sp_textarea">
                                                <van-field
                                                      v-model="item.comment"
                                                      type="textarea"
                                                      placeholder="选填,请先和商家协商一致"
                                                      rows="1"
                                                      autosize
                                                />
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </article>

                   <!-- 购物车可用优惠显示 -->
                  <!-- <article class="a1" v-if="froms == 'shoppingCart'">
                        <div class="order_Box card">
                              <div class="b_coupons">
                                    <van-coupon-cell
                                          :border="false"
                                          :coupons="couponInfo_shop.coupons"
                                          :chosen-coupon="couponInfo_shop.chosenCoupon"
                                          title="可用优惠"
                                          @click="couponInfo_shop.showList = true"
                                          style="padding: 0;font-size: 16px;line-height: 11.2vw;content: 'viewport-units-buggyfill; line-height: 11.2vw';"
                                    />
                                    <van-popup v-model="couponInfo_shop.showList" round position="bottom" style="padding-top: 4px;">
                                          <van-coupon-list
                                                :showExchangeBar="false"
                                                :coupons="couponInfo_shop.coupons"
                                                :chosen-coupon="couponInfo_shop.chosenCoupon"
                                                :disabled-coupons="couponInfo_shop.disabledCoupons"
                                                @change="value => onChange2(value, couponInfo_shop)"
                                          />
                                    </van-popup>
                              </div>
                        </div>
                  </article> -->
            </section>
            <footer>
                  <div class="footer_order_Box">
                        <div class="footer_p">
                              <div class="allCount">共{{ allCount }}件，</div>
                              <div class="allPri">
                                    <div class="allPrice">合计:</div>
                                    <div class="allPriceNumber">￥{{ (allPrice - allDisAmount).toFixed(2) }}</div>
                              </div>
                              <!-- <div class="allPriceNumber">￥{{ allPrice.toFixed(2) }}</div> -->
                              <!-- <div class="allDisAmount">
                                          预估优惠:
                                          {{ allDisAmount == 0 ? allDisAmount.toFixed(2) : allDisAmount }}
                                    </div> -->
                              <div class="btn_box">
                                    <van-button class="submitOrder" @click="doPay" round type="danger">提交订单</van-button>
                              </div>
                        </div>
                  </div>
            </footer>
      </div>
</template>

<script>
import _config from "../../assets/js/config";
import { NavBar, Step, Steps, Icon, Stepper, Field, Button, Toast, Cell, CellGroup, CouponCell, CouponList, Popup, Tag } from "vant";

export default {
      name: "confirmOrder",
      data() {
            return {
                  message: "",
                  value: 0,
                  hasDefaultAdd: false,
                  defaultAdd: {},
                  serverAdd: _config.serverAddress,
                  imgServerAdd: _config.fileServerAddress,
                  orderList: [],
                  datalist: [],
                  froms: "",
                  isOK: undefined,
                  isCart: false, //是否是购物车进入
                  chosenCoupons: [], //立即购买已选择的优惠券id
                  chosenCoupon: "",
                  //购物车进入的优惠券信息
                  couponInfo_shop: {
                        showList: false,
                        coupons: [], //可用优惠券
                        disabledCoupons: [], //不可用优惠券
                        chosenCoupon: -1, //选择的优惠券
                        disAmount: 0, //优惠的金额
                  }, //购物车优惠活动
                  pageid: "",
                  outflag: "",
                  seckill_id: -1,
                  merchantId: null,
                  disMobile: null,
                  ccbFromInfo: {},
                  ownerCode:"",
            };
      },
      //因comfirmOrder.vue文件太复杂冗余，故新建confirmOrder1.vue进行修改
      created() {
            console.log(sessionStorage.getItem('ownerCode'),'sessionStorage.getItem');
            const { froms, pageId, outflag, seckill_id, ids, merchantId, disMobile, ccbInsInfo, ownerCode} = this.$route.query;
            console.log(ccbInsInfo);
            if(ccbInsInfo){
                  this.ccbFromInfo = JSON.parse(ccbInsInfo);
            }
            this.froms = froms; //路由from
            this.pageid = pageId;
            this.outflag = outflag;
            this.seckill_id = seckill_id | Number;
            this.merchantId = merchantId;
            this.disMobile = disMobile;  
            this.ownerCode = ownerCode ? ownerCode : sessionStorage.getItem('ownerCode') ;   
            this.getDefaultAdd();
            if (this.froms == "shoppingCart") {
                  this.FromShoppingCart(ids, ownerCode);
            } else if (this.froms == "detail" || this.froms == "seckill") {
                  this.FromDetail();
            }
            console.log(this.ownerCode,'this.ownerCode');

      },
      methods: {
             // 获取用户信息
            // getUserInfo() {
            //       this.$http.get("/m/members/api/getInfo").then(e => {
            //             if (e.result == 0) {
            //                   this.userInfo = e.data;
            //             }
            //       });
            // },
            //跳到地址管理
            toAddManage() {
                  this.$router.push({ path: "/addressManage", query: { from: "Order" } });
            },
            //提交订单
            doPay() {
                  var _this = this;
                  if (_this.defaultAdd.id == undefined) {
                        Toast("请选择地址");
                        return false;
                  }
                  if (_this.froms == "shoppingCart") {
                        _this.createOrder(
                              typeof _this.$route.query.ids == "string" ? [_this.$route.query.ids] : _this.$route.query.ids,
                              _this.defaultAdd.id
                        );
                  } else if (_this.froms == "detail") {
                        _this.createOrder1(_this.orderList[0], _this.defaultAdd.id);
                  } else if (_this.froms == "seckill") {
                        _this.createOrder2(_this.orderList[0], _this.defaultAdd.id);
                  }
            },
            //返回
            back() {
                  this.$router.go(-1);
            },
            //获取默认地址
            getDefaultAdd() {
                  var _this = this;
                  _this.$http
                        .get("/m/members/api/getDefaultAddress", {
                              params: {},
                        })
                        .then(function(e) {
                              if (e.result == 0) {
                                    _this.isOK = true;
                                    _this.hasDefaultAdd = true;
                                    _this.defaultAdd = e.data;
                              } else if (e.result == -2) {
                                    _this.hasDefaultAdd = false;
                              }
                        });
            },
            // 购物车购买进入
            FromShoppingCart(_ids) {
                  var id = "";
                  if (typeof _ids == "string") {
                        id = _ids;
                  } else {
                        id = _ids.join(",");
                  }
                  var _this = this;
                  _this.isCart = true;
                  _this.$http
                        .get("/m/shopcart/api/getListByIds", {
                              params: {
                                    ids: id,
                                    ownerCode: this.ownerCode
                              },
                        })
                        .then(function(e) {
                              if (e.result == 0) {
                                    var datalist = e.data;
                                    _this.datalist = datalist;
                                    _this.getCoupons2(_this.datalist);
                                    for (var i = 0; i < datalist.length; i++) {
                                          var obj = {
                                                showList: false,
                                                chosenCoupon: -1,
                                                coupons: [],
                                                disabledCoupons: [],
                                          };
                                          obj.img = _this.imgServerAdd + datalist[i].iconurl;
                                          obj.name = datalist[i].prdname;
                                          obj.instalments = datalist[i].instalments;
                                          obj.amount_month = datalist[i].amount_month.toFixed(2);
                                          obj.sku_type1 = datalist[i].sku_type1;
                                          obj.sku_type2 = datalist[i].sku_type2;
                                          obj.quantity = datalist[i].quantity;
                                          obj.comment = "";
                                          obj.amt = datalist[i].amt;
                                          obj.saleprice = datalist[i].saleprice;
                                          obj.prdId = datalist[i].prdid;
                                          obj.prdno = datalist[i].prdno;
                                          obj.disAmount = 0;
                                          _this.orderList.push(obj);
                                    }
                              }
                        });
            },
            // 立即购买或秒杀进入,初始化详情/秒杀订单、并用订单请求优惠券
            FromDetail() {
                  var queryObj = JSON.parse(this.$route.query.obj);
                  var obj = {
                        showList: false,
                        chosenCoupon: -1,
                        coupons: [],
                        disabledCoupons: [],
                  };
                  obj.prdId = queryObj.prdId;
                  obj.img = this.imgServerAdd + queryObj.ImageList[0];
                  obj.name = queryObj.prdname;
                  // obj.instalments = queryObj.loansNum;
                  // obj.amount_month = queryObj.loanPrice.toFixed(2);
                  obj.instalments = this.ccbFromInfo.instalmentNum;
                  obj.amount_month = this.ccbFromInfo.instalmentPrice;
                  obj.sku_type1 = queryObj.sku_type1;
                  obj.sku_type2 = queryObj.sku_type2;
                  obj.quantity = queryObj.quantity;
                  obj.comment = "";
                  var _amt = queryObj.price / 100;
                  obj.amt = _amt.toFixed(2);
                  obj.saleprice = _amt.toFixed(2);
                  obj.disAmount = 0;
                  //获取优惠券
                  this.getCoupons(obj);
                  //初始化订单
                  this.orderList.push(obj);
                  //选中的优惠券数组
                  this.chosenCoupons = new Array(this.orderList.length);
            },
            //购物车创建订单
            createOrder(_ids, _addrId) {
                  // //调用购物车的订单生成接口
                  var _this = this;
                  var itemList = [];
                  for (var i = 0; i < _this.orderList.length; i++) {
                        var obj = {
                              rid: _ids[i], //购物车id
                              remark: _this.orderList[i].comment,
                              mcid: "-1",
                        };
                        //判断商品有没有参加活动
                        if (this.couponInfo_shop.chosenCoupon != "undefined" && this.couponInfo_shop.chosenCoupon != -1) {
                              obj.mcid = this.couponInfo_shop.coupons[this.couponInfo_shop.chosenCoupon].mcid;
                        }
                        itemList.push(obj);
                  }
                  _this.$http
                        .post("/m/shopcart/api/buildOrder", {
                              addrId: _addrId,
                              items: itemList,
                              ownerCode: this.ownerCode
                        })
                        .then(function(e) {
                              if (e.result == 0) {
                                    _this.toPay(e.data);
                              } else {
                                    Toast(e.msg);
                              }
                        });
            },
            //普通商品创建订单
            createOrder1(_obj, _addrId) {
                  const { prdId, sku_type1, sku_type2, quantity, instalments, comment } = _obj;
                  let params = {
                        prdId,
                        skuType1: sku_type1,
                        skuType2: sku_type2,
                        quantity,
                        instalments,
                        addrId: _addrId,
                        remark: comment,
                        mcid: this.chosenCoupon,
                        pageid: this.pageid,
                        outflag: this.outflag,
                        liveid: this.$route.query.liveid,
                        numberstages: this.ccbFromInfo.instalmentNum,
                        ownerCode: this.$route.query.ownerCode ? this.$route.query.ownerCode : this.ownerCode,
                  };
                  this.merchantId ? (params.merchantId = this.merchantId) : false;
                  this.disMobile ? (params.disMobile = this.disMobile) : false;
                  this.ownerCode ? (params.ownerCode = this.ownerCode) : false;
                  this.$http.post("/m/orders/api/orderBuy", params).then(res => {
                        if (res.result == 0) {
                              this.toPay(res.data);
                        } else {
                              Toast(res.msg);
                        }
                  });
            },
            //秒杀创建订单
            createOrder2(_obj, _addrId) {
                  var _this = this;
                  var _seckill_id = _this.seckill_id;
                  _this.$http
                        .post("/m/seckill/api/seckillOrderBuy", {
                              seckill_id: _seckill_id,
                              prdId: _obj.prdId,
                              skuType1: _obj.sku_type1,
                              skuType2: _obj.sku_type2,
                              quantity: _obj.quantity,
                              instalments: _obj.instalments,
                              addrId: _addrId,
                              remark: _obj.comment,
                              // mcid: _this.chosenCoupons[0],
                              pageid: _this.pageid,
                              outflag: _this.outflag,
                              numberstages: this.ccbFromInfo.instalmentNum,
                              ownerCode : _this.ownerCode
                        })
                        .then(function(e) {
                              if (e.result == 0) {
                                    _this.toPay(e.data);
                              } else {
                                    Toast(e.msg);
                              }
                        });
            },
            //调转到去支付页面
            toPay(_orderId) {
                  var _this = this;
                  _this.$router.push({
                        path: "/toPay",
                        query: {
                              orderId: _orderId,
                        },
                  });
            },
            // 获取优惠券（普通商品、秒杀商品）
            getCoupons(obj) {
                  var _this = this;
                  _this.$http
                        .post("/m/coupons/api/selectCouponsByMemberAndProduct", {
                              orderList: [obj],
                              event: "616年中大促",
                        })
                        .then(function(e) {
                              if (e.result == 0) {
                                    // 循环执行前先清空
                                    obj.coupons = [];
                                    obj.disabledCoupons = [];
                                    e.data.forEach((item, index) => {
                                          let usingstatus = item.usingstatus;
                                          let coupon = _this.couponsDataTreating(item);
                                          // 判断优惠券是否可用
                                          if (usingstatus == 0) {
                                                obj.coupons.push(coupon);
                                          } else {
                                                obj.disabledCoupons.push(coupon);
                                          }
                                    });
                              } else {
                                    Toast(e.msg);
                              }
                        });
            },
            // 优惠券数据格式化
            couponsDataTreating(item) {
                  let isCart = this.isCart;
                  var coupon = {
                        mcid: item.mcid, //用户优惠券的id
                        id: item.id, // 优惠券模板id
                        name: item.title, // 优惠券名称
                        condition: "", // 满减条件
                        startAt: item.beginTime / 1000, // 卡有效开始时间（临时，单位秒）
                        endAt: item.endTime / 1000, // 卡失效日期（临时，单位秒）
                        description: "商品优惠券", // 描述信息，优惠券可用时展示
                        reason: "", // 不可用原因，优惠券不可用时展示
                        value: 0, // 折扣券优惠金额，单位分
                        valueDesc: item.discount, // 折扣券优惠金额文案
                        unitDesc: "", // 单位文案
                        type: item.type,
                  };
                  if (item.usingstatus == 1) {
                        coupon.reason = "已使用";
                  } else if (item.usingstatus == 2) {
                        coupon.reason = "已过期";
                  } else if (item.usingstatus == 3) {
                        coupon.reason = "不在活动期间内";
                  } else {
                        coupon.reason = "不满足使用条件";
                  }
                  let type = item.type;
                  let limitAmount = item.limitAmount;
                  let discount = item.discount;
                  let sbuTitle = "";
                  let value = 0; //优惠金额（分）

                  // 代金券,value:van-coupon-cell右边显示的优惠价
                  if (type == 0) {
                        coupon.unitDesc = "元";
                        sbuTitle = "满" + limitAmount + "减" + discount + "元";
                        value = discount * 100;
                        //折扣券
                  } else if (type == 1) {
                        coupon.unitDesc = "折";
                        sbuTitle = "满" + limitAmount + "件打" + discount + "折";
                        value = item.disAmount * 100;
                  }
                  coupon.value = value;
                  coupon.condition = sbuTitle;
                  coupon.disAmount = item.disAmount;
                  return coupon;
            },
            //商品信息中优惠券的选择发生变化  index: 优惠券索引，orderItem：循环项，orderIndex：循环项索引
            onChange(index, orderItem, orderIndex) {
                  //如果不选优惠券
                  if (index == -1) {
                        //关闭优惠券窗口
                        this.orderList[orderIndex].showList = false;
                        //选中的优惠券索引
                        this.orderList[orderIndex].chosenCoupon = index;
                        //优惠金额
                        this.orderList[orderIndex].disAmount = 0;
                        //清空选中的优惠券mcid
                        this.chosenCoupon = "";
                        //如果选了优惠券
                  } else {
                        // 优惠卷id
                        let mcid = orderItem.coupons[index].mcid;
                        this.chosenCoupon = mcid;
                        this.orderList[orderIndex].showList = false;
                        this.orderList[orderIndex].chosenCoupon = index;
                        this.orderList[orderIndex].disAmount = orderItem.coupons[index].value / 100;
                  }
            },
            //合并订单时的优惠券选择
            onChange2(index, item) {
                  if (index != -1) {
                        //满减
                        if (item.coupons[index].type == 0) {
                              item.disAmount = item.coupons[index].valueDesc;
                              //折扣
                        } else if (item.coupons[index].type == 1) {
                              item.disAmount = item.coupons[index].disAmount;
                              item.coupons[index].value = item.coupons[index].disAmount * 100;
                        }
                  } else {
                        item.disAmount = 0;
                  }
                  item.chosenCoupon = index; //选择的优惠券的下标
                  item.showList = false;
                  this.couponInfo_shop = item;
            },
            // 需求变更 合并订单使用优惠券
            getCoupons2(obj) {
                  // debugger;
                  this.$http
                        .post("/m/coupons/api/selectCouponsByMemberAndProduct", {
                              orderList: this.orderList,
                              event: "616年中大促",
                        })
                        .then(e => {
                              if (e.result == 0) {
                                    e.data.forEach((item, index) => {
                                          let coupon = this.couponsDataTreating(item);
                                          let usingstatus = item.usingstatus;
                                          // 判断优惠券是否可用
                                          if (usingstatus == 0) {
                                                this.couponInfo_shop.coupons.push(coupon);
                                          } else {
                                                this.couponInfo_shop.disabledCoupons.push(coupon);
                                          }
                                    });
                                    console.log(this.couponInfo_shop);
                              } else {
                                    Toast(e.msg);
                              }
                        });
            },
      },
      computed: {
            allCount: function() {
                  var num = 0;

                  this.orderList.forEach(function(item) {
                        num = num + item.quantity;
                  });
                  return num;
            },
            allPrice: function() {
                  var num = 0;
                  this.orderList.forEach(function(item) {
                        num = num + item.saleprice * item.quantity;
                  });
                  return num;
            },
            // 优惠金额
            allDisAmount: function() {
                  let _this = this;
                  var num = 0;
                  if (_this.isCart) {
                        num = _this.couponInfo_shop.disAmount;
                  } else {
                        _this.orderList.forEach(function(item) {
                              num = num + item.disAmount;
                        });
                  }
                  return num;
            },
      },
      components: {
            [NavBar.name]: NavBar,
            [Step.name]: Step,
            [Steps.name]: Steps,
            [Icon.name]: Icon,
            [Stepper.name]: Stepper,
            [Field.name]: Field,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [CouponCell.name]: CouponCell,
            [CouponList.name]: CouponList,
            [Popup.name]: Popup,
            [Tag.name]: Tag,
      },
};
</script>
<style>
@import url("../../../static/navbar.css");
@import url("../../../static/stepper.css");
@import url("../../../static/field.css");
</style>
<style scoped>
.notice {
      font-size: 35px;
      margin-top: 10px;
      color: red;
}

.btn_box {
      float: right;
      margin-right: 20px;
}

.btn_box >>> .van-button--normal {
      padding: 0 12px;
}
.btn_box >>> .van-button {
      height: 38px;
}

.submitOrder {
      font-size: 30px;
}

.allPri {
      display: flex;
}

.allPriceNumber {
      display: inline-block;
      max-width: 230px;
      font-size: 30px;
      color: rgb(235, 101, 101);
      font-weight: bold;
      z-index: 3;
      margin-right: 2vw;
}
.allDisAmount {
      color: #999;
      font-size: 30px;
      display: inline-block;
      height: 100%;
      max-width: 200px !important;
      white-space: nowrap;
      z-index: 2;
}

.allPrice {
      font-size: 30px;
      color: rgb(51, 51, 51);
}

.allCount {
      font-size: 30px;
      color: rgb(180, 180, 180);
      display: inline-block;
      padding-left: 20px;
}

.footer_order_Box {
      position: fixed;
      width: 100%;
      background-color: white;
      bottom: 0;
      line-height: 108px;
      text-align: left;
}

.footer_p {
      height: 15vw;
      display: flex;
      justify-content: flex-end;
      align-items: center;
}

.sp_textarea {
      width: 380px;
      text-align: right !important;
}

.order_Content1 {
      display: inline-block;
      width: 100%;
}

.order_P1 {
      width: 558px;
      float: right;
      display: inline-block;
      line-height: 84px;
}

.order_P1 > span {
      display: inline-block;
      vertical-align: middle;
}

.order_P1 > span:nth-child(1) {
      float: left;
}

.order_P1 > span:nth-child(2) {
      float: right;
}

.item_count {
      float: right;
      font-size: 30px;
      color: rgb(153, 153, 153);
      display: inline-block;
}

.item_size {
      font-size: 26px;
      color: rgb(153, 153, 153);
      float: left;
      display: inline-block;
}

.item_name {
      float: left;
      color: rgb(51, 51, 51);
      font-size: 28px;
      display: inline-block;
      width: 224px;
}

.item_price {
      float: right;
      font-size: 34px;
      /* color: rgb(51, 51, 51); */
      color: #8e8e8e;
      font-weight: bold;
      display: inline-block;
}

.item_Box {
      width: 412px;
      display: inline-block;
      vertical-align: top;
      margin-top: 12px;
      margin-left: 16px;
}

.item_Box > p {
      display: flex;
      justify-content: space-between;
      align-items: center;
}

.img_Box1 {
      display: inline-block;
      height: 184px;
      width: 200px;
      border-radius: 4px;
      overflow: hidden;
}

.order_Box {
      padding: 32px 24px;
      border-radius: 16px;
      text-align: left;
      margin-bottom: 24px;
}

.address_p {
      color: rgb(51, 51, 51);
      font-size: 30px;
      line-height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
}

.address_phoneNumber {
      color: rgb(153, 153, 153);
      font-size: 28px;
}

.address_userName {
      color: rgb(51, 51, 51);
      font-size: 34px;
}

img {
      width: 100%;
      height: 100%;
}

.address_Content2 {
      width: 454px;
      text-align: left;
      display: inline-block;
      vertical-align: middle;
}

.address_Content1 {
      padding: 64px 24px;
}

.left_Box {
      float: left;
}

.img_Box {
      display: inline-block;
      height: 68px;
      width: 68px;
      border-radius: 50%;
      overflow: hidden;
}

.address_Box {
      border-radius: 16px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
}

.confirmOrder_section {
      background-color: #f9f9f9;
      width: 100%;
      height: calc(100vh - 108px - 92px);
      overflow: auto;
}

.a1 {
      padding: 26px;
      padding-bottom: 0;
}

.card {
      background-color: white;
}
</style>
