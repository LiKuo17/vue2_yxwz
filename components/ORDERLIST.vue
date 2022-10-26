<template>
    <div class="buyHistory">
        <div class="box_Content1" v-for="(item, index) in orderHistoryList" :key="index">
            <div
                class="left_box1"
                @click="
                    $router.push({
                        path: '/orderDetail1',
                        query: { orderId: item.orderid },
                    })
                "
            >
                <template v-if="item.service_status == 0">
                    <!-- 待付款 -->
                    <p class="bourse bg_fukuan" v-if="item.status == 1 && (item.ispaied == 0 || item.ispaied == 1)"></p>
                    <p class="bourse bg_fahuo" v-if="item.status == 2"></p>
                    <!-- 待签收 -->
                    <p class="bourse bg_qianshou" v-if="item.status == 3"></p>
                    <!-- 待评价 -->
                    <p class="bourse bg_pingjia" v-if="item.status == 4"></p>
                    <!-- 完成 -->
                    <p class="bourse bg_wancheng" v-if="item.status == 5"></p>
                    <!-- 取消 -->
                    <p class="bourse bg_quxiao" v-if="item.status == -1"></p>
                    <!-- 失效 -->
                    <p class="bourse bg_shixiao" v-if="item.status == -2"></p>
                </template>
                <template v-if="item.service_status != 0">
                    <!-- 售后中 -->
                    <p class="bourse bg_shouhou1" v-if="item.service_status <= 13"></p>
                    <!-- 售后完成 -->
                    <p class="bourse bg_shouhou2" v-if="item.service_status > 13"></p>
                </template>

                <div class="img_Box1">
                    <img
                        :src="imgServerAdd + item.iconurl"
                        onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                    />
                </div>
            </div>
            <div
                class="right_box1"
                @click="
                    $router.push({
                        path: '/orderDetail1',
                        query: { orderId: item.orderid },
                    })
                "
            >
                <p class="name">{{ item.prdname }}</p>
                <p class="norms">颜色：{{ item.sku_type1 }} 规格：{{ item.sku_type2 }}</p>
                <p class="orderPrice" v-if="item.paymonths == 0">
                    <span>付款方式：</span>
                    <span>￥{{ item.month_amt }}元</span>
                </p>
                <p class="orderPrice" v-if="item.paymonths != 0">
                    <span>付款方式：</span>
                    <span>￥{{ item.month_amt }}×{{ item.paymonths }}期</span>
                </p>
                <p class="allprice">总价：￥{{ item.totalamt.toFixed(2) }}</p>
            </div>
            <div class="order_p">订单号：{{ item.orderid }}</div>
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
                <!-- 待付款 -->
                <template v-if="item.status == 1 && (item.ispaied == 0 || item.ispaied == 1)">
                    <van-button type="default" round size="small" @click="toBatchPay(item.orderid)">去付款</van-button
                    >&nbsp;
                    <van-button type="default" round size="small" @click="doBatchCancel(item.orderid, index)"
                        >取消</van-button
                    >&nbsp;
                </template>
                <!-- 付款失败 -->
                <template v-if="item.status == 1 && item.ispaied == 3">
                    <van-button type="default" round size="small" @click="doDeleteOrderByid(item.orderid, index)"
                        >删除</van-button
                    >
                    <span>付款失败</span>
                </template>
                <!-- 已付款,待发货 -->
                <template v-if="item.status == 2">
                    <van-button
                        type="default"
                        round
                        size="small"
                        v-if="item.service_status == 0 || item.service_status == undefined"
                        @click="urge(item.orderid)"
                        >催发货</van-button
                    >&nbsp;
                    <van-button
                        v-if="item.service_status != 0 && item.service_status != undefined && item.service_status != 16"
                        type="default"
                        round
                        size="small"
                        @click="doReturn1(item.orderid)"
                        >查看售后详情</van-button
                    >
                    <van-button
                        v-if="item.service_status == 0 || item.service_status == undefined"
                        type="default"
                        round
                        size="small"
                        @click="doReturn(item.orderid, '退款')"
                        >申请退款</van-button
                    >
                </template>
                <!-- 已发货,待签收 -->
                <template v-if="item.status >= 3">
                    <van-button type="default" round size="small" @click="goLogistics(item.orderid)"
                        >查看物流</van-button
                    >&nbsp;
                    <van-button
                        type="default"
                        round
                        size="small"
                        v-if="item.status == 3"
                        @click="doSign(item.orderid, index)"
                        >确认收货</van-button
                    >
                </template>
                <!-- 待评价 -->
                <template v-if="item.status == 4">
                    <van-button
                        v-if="item.service_status == 0 || item.service_status == undefined"
                        type="default"
                        round
                        size="small"
                        @click="doReturn(item.orderid, '退货')"
                        >申请退货</van-button
                    >
                    <van-button
                        v-if="item.service_status != 0 && item.service_status != undefined"
                        type="default"
                        round
                        size="small"
                        @click="doReturn1(item.orderid)"
                        >查看售后详情</van-button
                    >
                    <van-button
                        type="default"
                        v-if="item.service_status == 0 || item.service_status == undefined"
                        round
                        size="small"
                        @click="goComment(item.orderid)"
                        >去评价</van-button
                    >
                </template>
                <!-- 已评价 -->
                <template v-if="item.status == 5">
                    <van-button
                        v-if="item.service_status == 0 || item.service_status == undefined"
                        type="default"
                        round
                        size="small"
                        @click="doReturn(item.orderid, '退货')"
                        >申请退货</van-button
                    >
                    <van-button
                        v-if="item.service_status != 0 && item.service_status != undefined"
                        type="default"
                        round
                        size="small"
                        @click="doReturn1(item.orderid)"
                        >查看售后详情</van-button
                    >
                </template>
                <!-- 待评价或已取消订单都能再来一单 -->
                <template v-if="item.status >= 4 || item.status == -1">
                    <van-button type="default" round size="small" @click="doRecur(item.prdid)">再来一单</van-button
                    >&nbsp;
                </template>
                <!-- 付款失败 -->
                <template v-if="item.status == -2">
                    <span>已失效</span>
                </template>
                <!-- 可删除订单 -->
                <template v-if="item.status < 0">
                    <van-button type="default" round size="small" @click="doDeleteOrderByid(item.orderid, index)"
                        >删除</van-button
                    >&nbsp;
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { PullRefresh, List, Button, Toast, Dialog } from "vant";
import _config from "../assets/js/config";
export default {
    components: {
        [PullRefresh.name]: PullRefresh,
        [List.name]: List,
        [Button.name]: Button,
    },
    props: {
        orderHistoryList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            imgServerAdd: _config.fileServerAddress,
        };
    },
    methods: {
        //删除订单
        doDeleteOrderByid(_orderId, _index) {
            let _this = this;
            Dialog.confirm({
                title: "确认删除吗？",
            })
                .then(() => {
                    this.$http
                        .get("/m/orders/api/deleteOrder", {
                            params: {
                                orderId: _orderId,
                            },
                        })
                        .then(e => {
                            if (e.result == 0) {
                                this.orderHistoryList.splice(_index, 1);
                                Toast("删除成功");
                            }
                        });
                })
                .catch(() => {});
        },
        //再来一单
        doRecur(_prdid) {
            this.$router.push({
                path: "/detail",
                query: {
                    prdid: _prdid,
                },
            });
        },
        //申请退款
        doReturn(_orderId, _applytype) {
            this.$router.push({
                path: "/return",
                query: {
                    orderId: _orderId,
                    applytype: _applytype,
                },
            });
        },
        //申请售后
        doReturn1(_orderId) {
            this.$router.push({
                path: "/return1",
                query: {
                    orderId: _orderId,
                },
            });
        },
        //去评价
        goComment(_orderId) {
            var _this = this;
            _this.$router.push({
                path: "/addcomment",
                query: {
                    orderId: _orderId,
                },
            });
        },
        //催发货
        urge(_orderId) {
            var _this = this;
            _this.$http
                .post("/m/orderservice/api/orderHasten", {
                    orderid: _orderId,
                    applymsg: "请快发货",
                })
                .then(function(e) {
                    if (e.result == 0) {
                        Toast("已通知商家尽快发货。");
                    } else {
                        Toast(e.msg);
                    }
                });
        },
        //确认收货
        doSign(_orderid, _index) {
            var _this = this;
            _this.$http
                .get("/m/orders/api/confirmOrder", {
                    params: {
                        orderId: _orderid,
                    },
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
        //查看物流动态
        goLogistics(_orderId) {
            var _this = this;
            _this.$router.push({
                path: "/logistics",
                query: {
                    orderId: _orderId,
                },
            });
        },
        //删除订单
        doDeleteOrderByid(_orderId, _index) {
            let _this = this;
            Dialog.confirm({
                title: "确认删除吗？",
            })
                .then(() => {
                    this.$http
                        .get("/m/orders/api/deleteOrder", {
                            params: {
                                orderId: _orderId,
                            },
                        })
                        .then(e => {
                            if (e.result == 0) {
                                this.orderHistoryList.splice(_index, 1);
                                Toast("删除成功");
                            }
                        });
                })
                .catch(() => {});
        },
        //取消订单
        doCancel(_orderid, _index) {
            Dialog.confirm({
                title: "提醒",
                message: "确认要取消吗?",
            })
                .then(() => {
                    this.$http
                        .get("/m/orders/api/cancelOrder", {
                            params: {
                                orderId: _orderid,
                                cancelReason: "",
                            },
                        })
                        .then(e => {
                            if (e.result == 0) {
                                Toast("取消成功");
                                this.orderHistoryList[_index].status = -1;
                            } else {
                                Toast(e.msg);
                            }
                        });
                    //不加catch会报错
                })
                .catch(err => {});
        },
        //批量取消
        doBatchCancel(_orderid, _index) {
            let orderIds = "";
            let _params = {
                orderId: _orderid,
            };
            // 获取捆绑的订单
            this.$http.get("/m/orders/api/payOders", { params: _params }).then(e => {
                if (e.result == 0) {
                    orderIds = e.data.orderIds;
                    let orderIdlist = orderIds.split(",");
                    if (orderIdlist.length > 1) {
                        Dialog.confirm({
                            title: "提醒",
                            message: "该订单为满减折扣订单，使用了该优惠券的其他订单将会一起取消，确认继续吗?",
                        })
                            .then(() => {
                                orderIdlist.forEach((orderId, index) => {
                                    this.$http
                                        .get("/m/orders/api/cancelOrder", {
                                            params: {
                                                orderId: orderId,
                                                cancelReason: "",
                                            },
                                        })
                                        .then(e => {
                                            if (e.result == 0) {
                                                if (index == orderIdlist.length - 1) {
                                                    //刷新页面
                                                    Dialog.alert({
                                                        title: "提醒",
                                                        message: "取消订单[" + orderIds + "]成功！",
                                                    }).then(() => {
                                                        this.$router.go(0);
                                                    });
                                                }
                                            } else {
                                                Toast(e.msg);
                                            }
                                        });
                                });
                            })
                            .catch(err => {});
                    } else {
                        this.doCancel(_orderid, _index);
                    }
                } else {
                    Toast(e.msg);
                }
            });
        },
        //支付
        toPay(_orderid) {
            this.$router.push({
                path: "/toPay",
                query: {
                    orderId: _orderid,
                },
            });
        },
        //批量支付
        toBatchPay(_orderid) {
            let _this = this;
            let orderIds = "";
            let _params = {
                orderId: _orderid,
            };
            // 获取捆绑的订单
            _this.$http.get("/m/orders/api/payOders", { params: _params }).then(function(e) {
                if (e.result == 0) {
                    orderIds = e.data.orderIds;
                    if (orderIds.split(",").length > 1) {
                        Dialog.confirm({
                            title: "提醒",
                            message: "该订单为满减折扣订单，使用了该优惠券的其他订单将会合并支付，确认继续吗?",
                        }).then(() => {
                            // on confirm
                            _this.toPay(orderIds.split(","));
                        });
                    } else {
                        _this.toPay(orderIds);
                    }
                } else {
                    Toast(e.msg);
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
    height: calc(100vh - 46px - 44px - 50px);
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
.left_box1 > p {
    display: inline-block;
    position: absolute;
    width: 80px;
    height: 70px;
    top: -31px;
}
.left_box1 {
    float: left;
    width: 240px;
    margin-top: 55px;
    text-align: left;
    position: relative;
}
.bourse {
    font-size: 26px;
    color: rgb(235, 101, 101);
    margin-bottom: 12px;
}
.bg_shouhou1 {
    background: url(../assets/img/shouhou1.png) no-repeat center center;
    background-size: cover;
}

.bg_shouhou2 {
    background: url(../assets/img/shouhou2.png) no-repeat center center;
    background-size: cover;
}

.bg_shouhou3 {
    background: url(../assets/img/shouhou3.png) no-repeat center center;
    background-size: cover;
}
.bg_quxiao {
    background: url(../assets/img/quxiao.png) no-repeat center center;
    background-size: cover;
}

.bg_wancheng {
    background: url(../assets/img/wancheng.png) no-repeat center center;
    background-size: cover;
}

.bg_pingjia {
    background: url(../assets/img/pinjia.png) no-repeat center center;
    background-size: cover;
}

.bg_qianshou {
    background: url(../assets/img/qianshou.png) no-repeat center center;
    background-size: cover;
}

.bg_fahuo {
    background: url(../assets/img/fahuo.png) no-repeat center center;
    background-size: cover;
}

.bg_fukuan {
    background: url(../assets/img/fukuan.png) no-repeat center center;
    background-size: cover;
}
.img_Box1 > img {
    height: 100%;
    width: auto;
}
.img_Box1 {
    width: 240px;
    text-align: center;
    height: 158px;
}
.right_box1 {
    margin-top: 25px;
    text-align: left;
}
.orderPrice {
    margin-top: 4px;
}

.orderPrice > span:nth-child(2) {
    color: rgb(235, 101, 101);
    font-size: 30px;
    font-weight: bold;
}

.orderPrice > span:nth-child(1) {
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
.allprice {
    color: rgb(51, 51, 51);
    font-size: 30px;
    font-weight: bold;
    margin-top: 18px;
}
.order_p {
    color: rgb(102, 102, 102);
    font-size: 26px;
    text-align: left;
}
.btn_Box {
    margin-top: 15px;
    padding-bottom: 24px;
    text-align: right;
    font-size: 16px;
}
</style>
