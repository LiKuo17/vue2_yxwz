<template>
  <div class="htmlcontent">
    <header>
      <div class>
        <van-sticky :z-index="9999">
          <van-nav-bar :title="titleText" left-arrow @click-left="back" />
        </van-sticky>
      </div>
    </header>
    <header>
      <div class="header_Box" ref="userBox">
        <div style="height: 100%;background: rgba(0,0,0,.3);">
          <div class="user_msg_box">
            <div class="img_Box">
              <img :src="userImgUrl" onerror="this.src='../../../static/img/test_userx.png';this.onerror=function(){};//console.log(this)" />
            </div>
            <p class="username">UID: {{userName}}</p>
          </div>
          <van-icon class="edit" name="setting-o" @click="goAdrsManage" />
        </div>
      </div>
    </header>
    <div class="van_shoppingcart" @click="nodelete">
      <section>
        <article class="a1">
          <div class="card_Box">
            <van-tabs v-model="active" animated swipeable>
              <van-tab title="购物车">
                <div class="tab_contents1" @touchmove.stop>
                  <van-checkbox-group v-model="selectbuyCartList" @change="changeBuy">
                    <div class="SwipeCell_Box" :class="doDelete==index?'SwipeCell_Box1':''" v-for="(item,index) in buyCartList" :key="index">
                      <!-- <v-touch @swiperight="onSwipeLeft(index)" tag="div" :swipe-options="{direction:'horizontal'}" v-if="item.status == 1"
                      @swipeleft="doDelete = -1;"> -->
                      <van-swipe-cell>
                        <div class="box_Content">
                          <div class="left_box2">
                            <van-checkbox :name="index" checked-color="#29BE81"></van-checkbox>
                          </div>
                          <div class="left_box">
                            <div class="img_Box1">
                              <img :src="imgServerAdd+item.iconurl" onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
                            </div>
                          </div>
                          <div class="right_box" @click="goDetail(item.prdno)">
                            <p class="name">{{item.prdname}}</p>
                            <p class="norms">规格：{{item.sku_type2}} 颜色：{{item.sku_type1}}</p>
                            <p class="price">
                              <span>付款方式：</span>
                              <span v-html="item.instalments == 0 ? '全款：'+(item.amount_month.toFixed(2)) + '元' : '￥'+(item.amount_month.toFixed(2))+'×'+item.instalments+'期'"></span>
                            </p>
                            <p class="allprice">总价：￥{{item.amt | NumFormat}}</p>
                          </div>
                          <div class="clear"></div>
                          <div class="stepper_Box">
                            <van-stepper v-model="item.quantity" @plus="add(index)" @minus="minus(index)" />
                          </div>
                        </div>
                        <template #right>
                          <div class="delete_Box" @click="doDeleteBuyCart(item.rid,index)">删除</div>
                        </template>
                      </van-swipe-cell>



                      <!-- </v-touch> -->

                    </div>
                  </van-checkbox-group>
                  <div class="price_content1" v-if="buyCartList.length<=0">
                    <p style="text-align:center;">购物车空空如也,快去购买商品吧!</p>
                  </div>
                </div>
                <div class="price_content" v-if="buyCartList.length>0">
                    <span>待支付：￥{{allPrice.toFixed(2)}}</span>
                    <span>
                      <van-button color="rgb(41, 190, 129)" type="danger" size="small" @click="clearing">结算</van-button>
                    </span>
                </div>

              </van-tab>


              <van-tab title="购买记录">
                <div class="tab_contents">
                  <van-pull-refresh v-model="his_loading" @refresh="refresh">
                    <van-list v-model="his_loading" :finished="his_finished" :finished-text="finishedText" @load="onLoadHistory">
                      <div class="buyHistory">
                        <div class="box_Content1" v-for="(item,index) in orderHistoryList" :key="index">
                          <div class="left_box1" @click="$router.push({path:'/orderDetail1',query:{orderId:item.orderid}})">
                            <template v-if="item.service_status == 0">
                              <p class="bourse bg_fukuan" v-if="item.status == 1 && (item.ispaied == 0 || item.ispaied == 1)"></p>
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

                            <div class="img_Box1">
                              <img :src="imgServerAdd+item.iconurl" onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
                            </div>
                          </div>
                          <div class="right_box1" @click="$router.push({path:'/orderDetail1',query:{orderId:item.orderid}})">
                            <p class="name">{{item.prdname}}</p>
                            <p class="norms">颜色：{{item.sku_type1}} 规格：{{item.sku_type2}}</p>
                            <p class="price" v-if="item.paymonths == 0">
                              <span>付款方式：</span>
                              <span>￥{{item.month_amt}}元</span>
                            </p>
                            <p class="price" v-if="item.paymonths != 0">
                              <span>付款方式：</span>
                              <span>￥{{item.month_amt}}×{{item.paymonths}}期</span>
                            </p>
                            <p class="allprice">总价：￥{{item.totalamt.toFixed(2)}}</p>
                          </div>
                          <div class="clear"></div>
                          <p class="order_p">订单号：{{item.orderid}}</p>
                          <div class="btn_Box">
                            <p style="text-align: left;">
                              <span class="bourse" v-if="item.service_status == 11">售后服务 审核中</span>
                              <span class="bourse" v-if="item.service_status == 12">售后服务 退货/更换 商品待退回</span>
                              <span class="bourse" v-if="item.service_status == 13">售后服务 退款审批中</span>
                              <span class="bourse" v-if="item.service_status == 14">售后服务 已同意退款</span>
                              <span class="bourse" v-if="item.service_status == 15">售后服务 已驳回</span>
                              <span class="bourse" v-if="item.service_status == 16">售后服务 退款成功</span>
                              <span class="bourse" v-if="item.service_status == 17">售后服务 已拒绝退款</span>
                              <span class="bourse" v-if="item.service_status == 18">售后服务 已取消</span>
                              <span class="bourse" v-if="item.service_status == 19">售后服务 退款失败</span>
                              <span class="bourse" v-if="item.service_status == 20">售后服务 已换货</span>
                              <span class="bourse" v-if="item.service_status == 21">售后服务 退款中</span>
                            </p>
                            <!--<van-button type="default" round size="small" @click='goLogistics'>崔发货</van-button>&nbsp;-->
                            <template v-if="item.status == 1 && (item.ispaied == 0 || item.ispaied == 1)">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：已确认,未付款状态
                            -->
                              <!-- 
                                <van-button type="default" round size="small" @click="toPay(item.orderid)">去付款</van-button>&nbsp;
                                <van-button type="default" round size="small" @click="doCancel(item.orderid,index)">取消</van-button>&nbsp; 
                              -->
                              <!--
                                              	作者：lxjn
                                              	时间：2020-06-10
                                              	描述：功能修改，实现合并订单同时支付和取消
                              -->
                              <van-button type="default" round size="small" @click="toBatchPay(item.orderid)">去付款</van-button>&nbsp;
                              <van-button type="default" round size="small" @click="doBatchCancel(item.orderid,index)">取消</van-button>&nbsp;
                            </template>
                            <template v-if="item.status == 1 && item.ispaied == 3">
                              <!--
                                                作者：offline
                                                时间：2019-09-02
                                                描述：已付款状态，银行回调失败
                            -->
                              <van-button type="default" round size="small" @click="doDeleteOrderByid(item.orderid,index)">删除</van-button>
                              <span>付款失败</span>

                            </template>
                            <template v-if="item.status == 2">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：已付款,待发货
                            -->
                              <van-button type="default" round size="small" v-if="item.service_status == 0 || item.service_status == undefined"
                                @click="urge(item.orderid)">催发货</van-button>&nbsp;
                              <van-button v-if="item.service_status != 0 && item.service_status != undefined && item.service_status != 16" type="default"
                                round size="small" @click="doReturn1(item.orderid)">查看售后详情</van-button>
                              <van-button v-if="item.service_status == 0 || item.service_status == undefined" type="default"
                                round size="small" @click="doReturn(item.orderid,'退款')">申请退款</van-button>
                            </template>
                            <template v-if="item.status >= 3">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：已发货,待签收
                            -->
                              <van-button type="default" round size="small" @click="goLogistics(item.orderid)">查看物流</van-button>&nbsp;
                              <van-button type="default" round size="small" v-if="item.status == 3" @click="doSign(item.orderid,index)">确认收货</van-button>
                            </template>

                            <template v-if="item.status == 4">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：已签收 完成订单(可以去评价) 可以申请收货
                            -->
                              <van-button v-if="item.service_status == 0 || item.service_status == undefined" type="default"
                                round size="small" @click="doReturn(item.orderid,'退货')">申请退货</van-button>
                              <van-button v-if="item.service_status != 0 && item.service_status != undefined" type="default"
                                round size="small" @click="doReturn1(item.orderid)">查看售后详情</van-button>
                              <van-button type="default" v-if="item.service_status == 0 || item.service_status == undefined "
                                round size="small" @click="goComment(item.orderid)">去评价</van-button>
                            </template>
                            <template v-if="item.status == 5">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：已签收 完成订单(评价完成)
                            -->

                              <van-button v-if="item.service_status == 0 || item.service_status == undefined" type="default"
                                round size="small" @click="doReturn(item.orderid,'退货')">申请退货</van-button>
                              <van-button v-if="item.service_status != 0 && item.service_status != undefined" type="default"
                                round size="small" @click="doReturn1(item.orderid)">查看售后详情</van-button>
                              <!-- <van-button type="default" v-if="item.service_status == 0 || item.service_status == undefined || "
                                round size="small" @click="goComment(item.orderid)">去评价</van-button>
                              &nbsp; -->
                            </template>
                            <template v-if="item.status >= 4 || item.status == -1">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：用户取消订单
                            -->
                              <van-button type="default" round size="small" @click="doRecur(item.prdid)">再来一单</van-button>
                              &nbsp;
                            </template>
                            <template v-if="item.status == -2">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：付款失败
                            -->
                              <span>已失效</span>
                            </template>
                            <template v-if="item.status < 0">
                              <!--
                                              	作者：offline
                                              	时间：2019-09-02
                                              	描述：用户删除订单
                            -->
                              <van-button type="default" round size="small" @click="doDeleteOrderByid(item.orderid,index)">删除</van-button>
                              &nbsp;
                            </template>
                          </div>
                        </div>
                      </div>
                    </van-list>
                  </van-pull-refresh>
                </div>
              </van-tab>
              
            </van-tabs>
          </div>
        </article>
      </section>
      <footer></footer>
    </div>
  </div>
</template>

<script>
  import _config from "../../assets/js/config";
  import {
    Tab,
    Tabs,
    Button,
    Stepper,
    Icon,
    ActionSheet,
    Uploader,
    Toast,
    Checkbox,
    CheckboxGroup,
    Divider,
    Field,
    Cell,
    CellGroup,
    Popup,
    Dialog,
    List,
    PullRefresh,
    NavBar,
    Sticky,
    SwipeCell,
    CouponCell,
    CouponList
  } from "vant";
  export default {
    name: "shoppingcart",
    data() {
      return {
        active: 0,
        value: 1,
        tabBarIndex: 1,
        fileIo: "",
        serverAdd: _config.serverAddress,
        imgServerAdd: _config.fileServerAddress,
        userImgUrl: "../../../static/img/test_userx.png",
        bgImgUrl: "../../assets/img/shoppingcard_bg.png",
        buyCartList: [],
        orderHistoryList: [],
        doDelete: -1,
        isCancel: false,
        selectbuyCartList: [0],
        cancelMessage: "",
        userName: "",
        his_finished: false,
        his_loading: false,
        page: 0,
        finishedText: "",
        titleText: "个人中心"
      };
    },
    created() {
      var _this = this;

      var actIdx = _this.$route.query.active;
      if (actIdx) {
        _this.active = parseInt(actIdx);
      } else {
        _this.active = parseInt(localStorage.getItem("active"));
      }
      _this.$emit("setIndex", this.tabBarIndex);

      _this.getUserMsg();
      // _this.getUserData();
      _this.getBuyCartData();
      //_this.getOrderHistoryList(1);
    },
    computed: {
      allPrice: function() {
        var _this = this;
        var num = 0;
        _this.selectbuyCartList.forEach(function(item) {
          num = parseFloat(num + _this.buyCartList[item].amt,2);
        });
        return num;
      }
    },
    methods: {
      refresh() {
        this.page = 0;
        this.orderHistoryList = [];
        this.onLoadHistory();
      },
      back() {
        this.$router.push("/");
      },
      goDetail(_prdno) {
        this.$router.push({
          path: "/detail",
          query: {
            prdno: _prdno
          }
        });
      },
      onLoadHistory() {
        var _this = this;
        _this.page++;
        _this.getOrderHistoryList(_this.page);
      },
      changeBuy(_val, _index) {
        //方法暂留：选择器change事件触发
      },
      // getUserData() {
      //   var _this = this;
      //   _this.$http
      //     .get("/m/members/api/getInfo", {
      //       params: {}
      //     })
      //     .then(function(e) {
      //       if (e.result == 0) {
      //         //console.log(e);
      //         _this.userImgUrl = _this.imgServerAdd + e.data.avatar;
      //         _this.userName = e.data.uid;
      //       }
      //     });
      // },
      doRecur(_prdid) {
        var _this = this;
        _this.$router.push({
          path: "/detail",
          query: {
            prdid: _prdid
          }
        });
      },
      doReturn(_orderId, _applytype) {
        var _this = this;
        _this.$router.push({
          path: "/return",
          query: {
            orderId: _orderId,
            applytype: _applytype
          }
        });
      },
      doReturn1(_orderId) {
        var _this = this;
        _this.$router.push({
          path: "/return1",
          query: {
            orderId: _orderId
          }
        });
      },
      goComment(_orderId) {
        var _this = this;
        _this.$router.push({
          path: "/addcomment",
          query: {
            orderId: _orderId
          }
        });
      },
      urge(_orderId) {
        var _this = this;
        _this.$http
          .post("/m/orderservice/api/orderHasten", {
            orderid: _orderId,
            applymsg: "请快发货"
          })
          .then(function(e) {
            if (e.result == 0) {
              Toast("已通知商家尽快发货。");
            } else {
              Toast(e.msg);
            }
          });
      },
      getUserMsg() {
        var _this = this;
        this.$http
          .get("/m/common/pageconfig/api/getconfig", {
            params: {
              pageId: "USER"
            }
          })
          .then(function(e) {
            if (e.msg == "Success") {
              //console.log(e);
              var Bg_addres = _this.imgServerAdd + e.data.widgets[0].imageUrl;
              if (_this.$refs && _this.$refs.userBox) {
                _this.$refs.userBox.style.backgroundImage =
                  "url(" + Bg_addres + ")";
              }
            }
          });
      },
      doSign(_orderid, _index) {
        var _this = this;
        _this.$http
          .get("/m/orders/api/confirmOrder", {
            params: {
              orderId: _orderid
            }
          })
          .then(function(e) {
            if (e.result == 0) {
              Toast("确认成功");
              _this.orderHistoryList[_index].status = 5;
            } else {
              Toast(e.msg);
            }
          });
      },
      doCancel(_orderid, _index) {
        var _this = this;
        Dialog.confirm({
            title: "提醒",
            message: "确认要取消吗?"
          })
          .then(() => {
            // on confirm
            _this.$http
              .get("/m/orders/api/cancelOrder", {
                params: {
                  orderId: _orderid,
                  cancelReason: ""
                }
              })
              .then(function(e) {
                if (e.result == 0) {
                  Toast("取消成功");
                  _this.orderHistoryList[_index].status = -1;
                } else {
                  Toast(e.msg);
                }
              });
          })
          .catch(() => {
            // on cancel
            //console.log('取消删除')
          });
      },
      //批量取消
      doBatchCancel(_orderid, _index){
        let _this = this;
        let orderIds = "";
        let _params = {
              orderId: _orderid
            }
        // 获取捆绑的订单
        _this.$http.get("/m/orders/api/payOders", {params:_params}).then(function(e) {
          if (e.result == 0) {
            orderIds = e.data.orderIds;
            let orderIdlist = orderIds.split(",");
            if(orderIdlist.length>1){

              Dialog.confirm({
                title: "提醒",
                message: "该订单为满减折扣订单，使用了该优惠券的其他订单将会一起取消，确认继续吗?"
              }).then(() => {
                orderIdlist.forEach((orderId,index) => {
                  _this.$http.get("/m/orders/api/cancelOrder", {
                    params: {
                      orderId: orderId,
                      cancelReason: ""
                    }
                  }).then(function(e) {
                    if (e.result == 0) {
                      // _this.orderHistoryList[_index].status = -1;
                      if(index == orderIdlist.length-1){
                        //刷新页面
                        Dialog.alert({
                          title: "提醒",
                          message: "取消订单["+orderIds+"]成功！"
                        }).then(() => {
                          
                          // _this.getBuyCartData();
                          _this.$router.push({
                            path: "/shoppingcart",
                            query: {
                              active:1
                            }
                          });
                        });
                      }
                    } else {
                      Toast(e.msg);
                    }
                  });
                })       
              }).catch(() => {

              });
            }else{
              _this.doCancel(_orderid, _index);
            }
          } else {
            Toast(e.msg);
          }
        });
      },
      toPay(_orderid) {
        this.$router.push({
          path: "/toPay",
          query: {
            orderId: _orderid
          }
        });
      },
      //批量支付
      toBatchPay(_orderid){
        let _this = this;
        let orderIds = "";
        let _params = {
              orderId: _orderid
            }
        // 获取捆绑的订单
        _this.$http.get("/m/orders/api/payOders", {params:_params}).then(function(e) {
          if (e.result == 0) {
            orderIds = e.data.orderIds;
            if(orderIds.split(",").length>1){
              Dialog.confirm({
                title: "提醒",
                message: "该订单为满减折扣订单，使用了该优惠券的其他订单将会合并支付，确认继续吗?"
              }).then(() => {
                  // on confirm
                  _this.toPay(orderIds.split(","));
              }).catch(() => {
                  // on cancel
                  //console.log('取消删除')
              });
            }else{
              _this.toPay(orderIds);
            }
          } else {
            Toast(e.msg);
          }
        });
      },
      getOrderHistoryList(_pageNo) {
        //获取订单列表
        var _this = this;
        _this.$http
          .get("/m/orders/api/getlist", {
            params: {
              rows: 10,
              page: _pageNo
            }
          })
          .then(function(e) {
            if (e.rows && e.rows.length > 0) {
              e.rows.forEach(function(item) {
                _this.orderHistoryList.push(item);
              });
              _this.his_loading = false;
            } else {
              _this.his_loading = false;

              _this.his_finished = true;
              if (_pageNo != 1) {
                _this.finishedText = "没有更多了";
              } else {
                _this.finishedText = "您还没有一条购买记录噢，快去购买吧！";
              }
            }
          });
      },
      clearing() {
        var _this = this;
        var idsList = [];
        var _lslist = [];
        _this.selectbuyCartList.forEach(function(item) {
          //console.log(item);
          idsList.push(_this.buyCartList[item].rid);
          _lslist.push(_this.buyCartList[item].instalments);
        });

        _lslist.sort();
        if (idsList.length < 1) {
          Toast("请选择商品在结算");
          return false;
        }
        if (_lslist[0] != _lslist[_lslist.length - 1]) {
          Toast("不能有不同的分期");
          return false;
        }

        // if (idsList.length > 1) {
        //   Toast("只能选择一个商品");
        //   return false;
        // }

        _this.$router.push({
          path: "/confirmOrder",
          query: {
            froms: "shoppingCart",
            ids: idsList
          }
        });
      },
      doDeleteOrderByid(_orderId, _index) {

        let _this = this;
        Dialog.confirm({
          title: "确认删除吗？"
        }).then(() => {
          this.$http.get('/m/orders/api/deleteOrder', {
            params: {
              orderId: _orderId
            }
          }).then(e => {
            if (e.result == 0) {
              this.orderHistoryList.splice(_index, 1);
              Toast('删除成功');
            }

          });
        }).catch(() => {

        })
      },
      doDeleteBuyCart(_rid, _index) {
        var _this = this;
        Dialog.confirm({
            title: "确认删除吗？"
          })
          .then(() => {
            _this.$http
              .get("/m/shopcart/api/deleteItem", {
                params: {
                  rid: _rid
                }
              })
              .then(function(e) {
                if (e.result == 0) {
                  _this.doDelete = -1;
                  _this.buyCartList.splice(_index, 1);
                  Toast("取消成功");
                }
              });
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      },
      onSwipeRight(event) {},
      nodelete(event) {
        var _this = this;
        if (event.target.className.indexOf("delete_Box")) {
          _this.doDelete = -1;
        } else {
          return;
        }
      },
      onSwipeLeft(index) {
        var _this = this;
        _this.doDelete = index;
      },
      countChange(index) {
        var _this = this;
        _this.buyCartList[index].quantity;
      },
      minus(index) {
        var _this = this;
        if (_this.buyCartList[index].quantity > 0)
          _this.buyCartList[index].quantity--;
        _this.$http
          .get("/m/shopcart/api/updateQuanity", {
            params: {
              rid: _this.buyCartList[index].rid,
              quantity: _this.buyCartList[index].quantity
            }
          })
          .then(function(e) {
            if (e.result == 0) {
              _this.buyCartList[index].amt = e.data.amt;
              _this.buyCartList[index].amount_month = e.data.amount_month;
              _this.buyCartList[index].quantity = e.data.quantity;
            }
          });
      },
      add(index) {
        var _this = this;
        _this.buyCartList[index].quantity++;
        _this.$http
          .get("/m/shopcart/api/updateQuanity", {
            params: {
              rid: _this.buyCartList[index].rid,
              quantity: _this.buyCartList[index].quantity
            }
          })
          .then(function(e) {
            if (e.result == 0) {
              _this.buyCartList[index].amt = e.data.amt;
              _this.buyCartList[index].amount_month = e.data.amount_month;
              _this.buyCartList[index].quantity = e.data.quantity;
            }
          });
      },
      goLogistics(_orderId) {
        var _this = this;
        _this.$router.push({
          path: "/logistics",
          query: {
            orderId: _orderId
          }
        });
      },
      goAdrsManage() {
        this.$router.push("/setting");
      },
      afterRead(file, detail) {
        var _this = this;
        let formData = new FormData();
        formData.append("avatar", file.file);

        //				_this.$http.post('/m/members/api/uploadAvatar', {
        //					avatar: detail.content
        //				}).then(function(e) {
        //					//console.log(e);
        //					//console.log(111);
        //				})

        _this
          .$http({
            method: "post",
            url: "/m/members/api/uploadAvatar",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function(e) {
            if (e.result == 0) {
              Toast("上传成功");
              _this.userImgUrl = _this.imgServerAdd + e.data.fileUrl;
            } else {
              Toast("上传失败");
            }
            //console.log(e);
          });
        //				_this.fileIo = file.content;
        //				_this.$refs.from.submit();
        //console.log(detail);
        //console.log(2);
      },
      getBuyCartData() {
        var _this = this;
        _this.$http
          .get("/m/shopcart/api/getlist", {
            params: {
              rows: 0,
              page: 1
            }
          })
          .then(function(e) {
            if (e.rows != undefined) {
              e.rows.forEach(function(item) {
                if (item.status == 1) {
                  _this.buyCartList.push(item);
                }
              });
              _this.buyCartList.reverse();
            }
          });
      },
      // 获取优惠券
      getCoupons(obj){
        var _this = this;
        // debugger;
        _this.$http.post('/m/coupons/api/selectCouponsByMemberAndProduct', obj).then(function(e) {
          if (e.result == 0) {
            // 循环执行前先清空
            obj.coupons = [];
            obj.disabledCoupons = [];

            e.data.forEach((item,index)=>{

              let usingstatus = item.usingstatus;
              let coupon = _this.couponsDataTreating(item);
              // 判断用户是否可用
              if(usingstatus==0){
                obj.coupons.push(coupon);
              }else{
                obj.disabledCoupons.push(coupon);
              }
            });
          } else {
            Toast(e.msg);
          }
        })
      },
      // 优惠券数据处理
      couponsDataTreating(item){
            
        var coupon = {	
          mcid:item.mcid,//用户优惠券的id
          id:item.id, // 优惠券模板id
          name:item.title, // 优惠券名称
          condition:'', // 满减条件
          startAt:item.beginTime/1000, // 卡有效开始时间（临时，单位秒）
          endAt:item.endTime/1000, // 卡失效日期（临时，单位秒）
          description:'商品优惠券', // 描述信息，优惠券可用时展示
          reason:'', // 不可用原因，优惠券不可用时展示
          value:item.disAmount, // 折扣券优惠金额，单位分
          valueDesc:item.discount, // 折扣券优惠金额文案
          unitDesc:'', // 单位文案
        }
        if(item.usingstatus == 1){
          coupon.reason = '已使用';
        }else if(item.usingstatus == 2) {
          coupon.reason = '已过期';
        }

        let type = item.type;
        let limitAmount = item.limitAmount;
        let discount = item.discount;
        let sbuTitle = "";

        if(type == 0){
          // 代金券
          coupon.unitDesc='元';
          sbuTitle = "满"+limitAmount+"减"+discount+"元";

        } else if(type == 1){
          coupon.unitDesc='折';
          sbuTitle = "满"+limitAmount+"件打"+discount+"折";
        }
        coupon.condition = sbuTitle;


        return coupon;
      },
      onChange(index){
            
      },
    },
    beforeDestroy() {
      var _this = this;
      var _active = _this.active;
      // console.log('我要删除拉');
      localStorage.setItem("active", _this.active);
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Button.name]: Button,
      [Stepper.name]: Stepper,
      [Icon.name]: Icon,
      [ActionSheet.name]: ActionSheet,
      [Uploader.name]: Uploader,
      [Toast.name]: Toast,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Divider.name]: Divider,
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Popup.name]: Popup,
      [List.name]: List,
      [PullRefresh.name]: PullRefresh,
      [NavBar.name]: NavBar,
      [Sticky.name]: Sticky,
      [SwipeCell.name]: SwipeCell,
	[CouponCell.name]:CouponCell,
	[CouponList.name]:CouponList

    }
  };
</script>

<style scoped>
  @import url("../../../static/tabs.css");
  @import url("../../../static/stepper.css");
  @import url("../../../static/navbar.css");

  .van_shoppingcart .van-tab__pane .tab_contents {
    height: calc(100vh - 314px);
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .van_shoppingcart .van-tab__pane .tab_contents1 {
    height: calc(100vh - 177px - 46.4vw);
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .htmlcontent {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    /* background-color: white; */
  }

  .bg_shouhou1 {
    background: url(../../assets/img/shouhou1.png) no-repeat center center;
    background-size: cover;
  }

  .bg_shouhou2 {
    background: url(../../assets/img/shouhou2.png) no-repeat center center;
    background-size: cover;
  }

  .bg_shouhou3 {
    background: url(../../assets/img/shouhou3.png) no-repeat center center;
    background-size: cover;
  }

  .left_box1>p {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 70px;
    top: -31px;
  }

  .bg_shixiao {
    background: url(../../assets/img/shixiao.png) no-repeat center center;
    background-size: cover;
  }

  .bg_quxiao {
    background: url(../../assets/img/quxiao.png) no-repeat center center;
    background-size: cover;
  }

  .bg_wancheng {
    background: url(../../assets/img/wancheng.png) no-repeat center center;
    background-size: cover;
  }

  .bg_pingjia {
    background: url(../../assets/img/pinjia.png) no-repeat center center;
    background-size: cover;
  }

  .bg_qianshou {
    background: url(../../assets/img/qianshou.png) no-repeat center center;
    background-size: cover;
  }

  .bg_fahuo {
    background: url(../../assets/img/fahuo.png) no-repeat center center;
    background-size: cover;
  }

  .bg_fukuan {
    background: url(../../assets/img/fukuan.png) no-repeat center center;
    background-size: cover;
  }

  .isCancel_Box {
    width: 500px;
  }

  .buyHistory {
    z-index: 9999;
  }

  .delete_Box {
    background-color: red;
    color: white;
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
  }

  .SwipeCell_Box {
    position: relative;
    border-bottom: 1px solid rgb(223, 223, 223);
    transform: translateX(0);
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
  }

  .SwipeCell_Box1 {
    transform: translateX(120px);
  }

  .hidden {
    display: none;
  }

  .edit {
    position: absolute;
    font-size: 40px;
    top: 20px;
    right: 32px;
    color: rgb(255, 255, 255);
  }

  .btn_Box {
    margin-top: 15px;
    padding-bottom: 24px;
    text-align: right;
    font-size: 16px;
  }

  .order_p {
    margin-top: 28px;
    color: rgb(102, 102, 102);
    font-size: 26px;
    text-align: left;
  }

  .bourse {
    font-size: 26px;
    color: rgb(235, 101, 101);
    margin-bottom: 12px;
  }

  .price_content {
    /* height: 88px; */
    color: black;
    text-align: left;
    padding: 8px 32px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .price_content1 {
    height: 88px;
    color: black;
    text-align: left;
    line-height: 88px;
    padding: 4px 32px;
    background-color: #f9f9f9;
  }

  .allprice {
    color: rgb(51, 51, 51);
    font-size: 30px;
    font-weight: bold;
    margin-top: 18px;
  }

  .stepper_Box {
    text-align: right;
    margin-top: 6px;
    margin-right: 40px;
    margin-bottom: 24px;
  }

  .price {
    margin-top: 4px;
  }

  .price>span:nth-child(2) {
    color: rgb(235, 101, 101);
    font-size: 30px;
    font-weight: bold;
  }

  .price>span:nth-child(1) {
    color: rgb(153, 153, 153);
    font-size: 30px;
    font-weight: 600;
  }

  .norms {
    color: rgb(235, 101, 101);
    font-size: 29px;
    margin-top: 4px;
  }

  .name {
    color: rgb(51, 51, 51);
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .left_box2 {
    float: left;
    width: 50px;
    margin-top: 112px;
  }

  .left_box {
    float: left;
    width: 240px;
    margin-top: 50px;
  }

  .left_box1 {
    float: left;
    width: 240px;
    margin-top: 55px;
    text-align: left;
    position: relative;
  }

  .right_box {
    padding-left: 24px;
    float: left;
    width: 410px;
    margin-top: 24px;
    text-align: left;
  }

  .right_box1 {
    float: right;
    width: 396px;
    margin-top: 50px;
    text-align: left;
  }

  .right_box>p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card_Box {
    background-color: white;
  }

  .box_Content {
    padding-left: 18px;
  }

  .box_Content1 {
    padding: 0 32px;
    border-bottom: 1px solid rgb(223, 223, 223);
  }

  .box_Content1:nth-last-child(1) {
    border: 0;
  }

  .img_Box>img {
    width: 100%;
    height: 100%;
  }

  .img_Box1>img {
    height: 100%;
    width: auto;
  }

  .username {
    color: rgb(255, 255, 255);
    font-size: 30px;
  }

  .van_shoppingcart {

    margin-bottom: 0;
    width: 100%;
    background-color: #f9f9f9;
    z-index: -1;

  }



  .header_Box {
    width: 100%;
    height: 348px;
    background: url(../../assets/img/shoppingcard_bg.png) no-repeat;
    background-size: cover;
    position: relative;
  }

  .user_msg_box {
    width: 140px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 76px;
  }

  .img_Box {
    width: 140px;
    height: 140px;
    overflow: hidden;
    border-radius: 50%;
  }

  .img_Box1 {
    width: 240px;
    text-align: center;
    height: 158px;
  }
</style>
