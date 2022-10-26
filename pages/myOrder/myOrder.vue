<template>
      <div class="myorder">
            <!-- 右上角菜单+标题栏 -->
            <popupMenu title="我的订单" @click-left="back" />
            <van-tabs background="#ffffff" class="tabs" color="#29be81" v-model="active" swipeable>
                  <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title">
                        <div class="tab_contents">
                              <van-pull-refresh v-model="his_loading" @refresh="refresh">
                                    <van-list v-model="his_loading" :finished="his_finished" :finished-text="finishedText" @load="item.onloadMethod">
                                          <order-list :orderHistoryList="orderHistoryList" />
                                    </van-list>
                              </van-pull-refresh>
                        </div>
                  </van-tab>
            </van-tabs>
      </div>
</template>

<script>
import { NavBar, Tabs, Tab, Icon, Sticky, PullRefresh, List, Button, Toast, Dialog } from "vant";
import _config from "../../assets/js/config";
import orderList from "../../components/ORDERLIST";
import popupMenu from "../../components/POPUPMENU";
export default {
      name: "myOrder",
      components: {
            vanNavBar: NavBar,
            vanTabs: Tabs,
            vanTab: Tab,
            vanIcon: Icon,
            vanSticky: Sticky,
            [PullRefresh.name]: PullRefresh,
            [List.name]: List,
            [Button.name]: Button,
            orderList,
            popupMenu,
      },
      data() {
            return {
                  imgServerAdd: _config.fileServerAddress,
                  active: 0,
                  page: 0,
                  orderHistoryList: [],
                  his_finished: false,
                  his_loading: false,
                  finishedText: "",
                  tabList: [
                        {
                              title: "全部",
                              onloadMethod: this.onLoadHistory,
                        },
                        {
                              title: "待付款",
                              onloadMethod: this.onLoadHistoryForOtherType,
                              status: 1,
                              service_status: 0,
                        },
                        {
                              title: "待发货",
                              onloadMethod: this.onLoadHistoryForOtherType,
                              status: 2,
                              service_status: 0,
                        },
                        {
                              title: "待收货",
                              onloadMethod: this.onLoadHistoryForOtherType,
                              status: 3,
                              service_status: 0,
                        },
                        {
                              title: "待评价",
                              onloadMethod: this.onLoadHistoryForOtherType,
                              status: 4,
                              service_status: 0,
                        },
                        {
                              title: "退款/售后",
                              onloadMethod: this.onLoadHistoryForOtherType,
                              service_status: 1,
                        },
                  ],
            };
      },
      watch: {
            active(newV) {
                  this.page = 0;
                  this.orderHistoryList = [];
                  if (!newV) {
                        this.onLoadHistory();
                  } else {
                        this.onLoadHistoryForOtherType();
                  }
                  // this.$router.push({ path: "/myOrder", query: { type: newV } });
            },
      },
      created() {
            this.$route.query.type && (this.active = Number(this.$route.query.type));
      },
      methods: {
            back() {
				this.$router.push("/ccbUser");
                //   isApp()
                //         .then(() => {
                //               //是app的话
                //               if (this.$route.query.isUserCenter == "true") {
                //                     //app返回
                //                     appBack();
                //               } else {
                //                     this.$router.push("/personalCenter");
                //               }
                //         })
                //         .catch(() => {
                //               this.$router.push("/personalCenter");
                //         });
            },
            //下拉刷新
            refresh() {
                  this.page = 0;
                  this.orderHistoryList = [];
                  if (this.active == 0) {
                        this.onLoadHistory();
                  } else {
                        this.getOrdersByStatus();
                  }
            },
            //其他订单分类下滑/初始时加载列表
            onLoadHistoryForOtherType() {
                  this.page++;
                  this.getOrdersByStatus();
            },
            //下滑/初始时加载“全部”订单
            onLoadHistory() {
                  this.page++;
                  this.getOrderHistoryList();
            },
            //获取其他订单分类列表
            getOrdersByStatus() {
                  let params = { rows: 10, page: this.page };
                  let tabItem = this.tabList[this.active];
                  //不点售后就传status，点售后就不传status
                  if (tabItem.status) {
                        params.status = tabItem.status;
                  }
                  //不点售后service_status就传0
                  if (this.active != this.tabList.length - 1) {
                        params.service_status = 0;
                        //点售后service_status就传1
                  } else {
                        params.service_status = 1;
                  }
                  this.$http
                        .get("/m/orders/api/getOrdersByStatus", {
                              params,
                        })
                        .then(e => {
                              if (e.rows && e.rows.length > 0) {
                                    e.rows.forEach(item => {
                                          this.orderHistoryList.push(item);
                                    });
                                    this.his_loading = false;
                              } else {
                                    this.his_loading = false;
                                    this.his_finished = true;
                                    if (this.page != 1) {
                                          this.finishedText = "没有更多了";
                                    } else {
                                          this.finishedText = "您还没有一条购买记录噢，快去购买吧！";
                                    }
                              }
                        });
            },
            //获取订单列表
            getOrderHistoryList() {
                  this.$http
                        .get("/m/orders/api/getlist", {
                              params: {
                                    rows: 10,
                                    page: this.page,
                              },
                        })
                        .then(e => {
                              if (e.rows && e.rows.length > 0) {
                                    e.rows.forEach(item => {
                                          this.orderHistoryList.push(item);
                                    });
                                    this.his_loading = false;
                              } else {
                                    this.his_loading = false;
                                    this.his_finished = true;
                                    if (this.page != 1) {
                                          this.finishedText = "没有更多了";
                                    } else {
                                          this.finishedText = "您还没有一条购买记录噢，快去购买吧！";
                                    }
                              }
                        });
            },
      },
};
</script>

<style scoped>
.myorder {
      background-color: #fff;
}
.myorder >>> .van-tabs__wrap {
      border-bottom: 0.5px solid #f7f7f7;
}
.van-tabs__nav {
      background-color: #fff !important;
}
.tabs >>> .van-tabs__content {
      height: calc(100vh - 46px - 44px);
      overflow-y: scroll;
}
.van_shoppingcart .van-tab__pane .tab_contents {
      height: calc(100vh - 314px);
      position: relative;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
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
.box_Content {
      padding-left: 18px;
}

.box_Content1 {
      background-color: #fff;
      padding: 0 32px;
      border-bottom: 1px solid rgb(223, 223, 223);
}

.box_Content1:nth-last-child(1) {
      border: 0;
}
</style>
