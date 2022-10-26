<template>
      <div>
            <div class="header_Box">
                  <van-nav-bar title="权益中心" left-arrow @click-left="$back" />
            </div>
            <van-coupon-list
                  style="text-align: left;margin-bottom: 5px;"
                  enabled-title="待兑换"
                  disabled-title="已兑换"
                  :show-close-button="false"
                  :coupons="coupons"
                  :disabled-coupons="disabledCoupons"
                  @change="onChange"
                  @exchange="onExchange"
            >
            </van-coupon-list>
      </div>
</template>

<script>
import { NavBar, CouponList, Toast, Dialog } from "vant";
export default {
      components: {
            vanNavBar: NavBar,
            vanCouponList: CouponList,
      },
      data() {
            return {
                  coupons: [],
                  disabledCoupons: [],
            };
      },
      created() {
            this.getCoupons();
      },
      methods: {
            //选择优惠券
            onChange(index) {
                  let coupon = this.coupons[index];
                  console.log(this.coupons, "this.coupons");
                  if (coupon.type == 2) {
                        // this.$http.get("/m/tel/list/" + coupon.id).then(res => {
                        //       if (res.result === 0) {
                        //             this.$router.push({ path: "/telCoupon", query: { couponId: coupon.id } });
                        //       } else {
                        //             this.$toast(res.msg || "该状态不可兑换");
                        //       }
                        // });
                        // Toast("兑换入口暂未开放！")
                        Dialog.confirm({
                          title: '活动规则',
                          messageAlign: 'left',
                          className: 'info',
                          confirmButtonText: '同意',
                          cancelButtonText: '不同意',
                          message: `1.0门槛领取话费券;需参与建行信用卡分期活动,下单购买指定分期产品,话费券方可生效;\n2.点击"兑换"填写完整信息,确认收货后,话费将自动进入个人话费账户,可直接使用;\n3.客户点击确认收货或自收到货物7天后系统自动确认收货则默认交易成功,不再产生退换货。\n4.不支持携号转网和虚拟号充值\n\n<font style="color: red">凡参与本活动用户则默认以上活动规则</font>`
                        })
                          .then(() => {
                            this.$router.push('/telCoupon?couponId=' + coupon.id)
                          })
                          .catch((error) => {
                            console.log(error,'err');
                          });
                  }
                  // Toast("[" + coupon.name + "] " + coupon.condition);
            },
            //兑换优惠券
            onExchange(code) {
                  Toast("无效的兑换码");
            },
            //获取当前可领优惠券列表
            getCoupons() {
                  this.$http.get("/m/coupons/api/getMyCoupons", { params: { type: 2 } }).then(e => {
                        console.log(e.data, "eeeeeee");
                        if (e.result == 0) {
                              //循环执行前先清空
                              this.coupons = [];
                              this.disabledCoupons = [];
                              e.data.forEach((item, index) => {
                                    let usingstatus = item.usingstatus;
                                    let coupon = this.couponsDataTreating(item);
                                    console.log(coupon, "coupon");
                                    //判断用户是否可用
                                    if (usingstatus == 0) {
                                          this.coupons.push(coupon);
                                    } else {
                                          this.disabledCoupons.push(coupon);
                                    }
                              });
                        } else {
                              Toast(e.msg);
                        }
                  });
            },
            //优惠券数据处理
            couponsDataTreating(item) {
                  var coupon = {
                        id: item.id, // 优惠券id
                        name: item.title, // 优惠券名称
                        condition: "", // 满减条件
                        startAt: item.beginTime / 1000, // 卡有效开始时间（临时，单位秒）
                        endAt: item.endTime / 1000, // 卡失效日期（临时，单位秒）
                        description: "待使用", // 描述信息，优惠券可用时展示
                        reason: "已失效", // 不可用原因，优惠券不可用时展示
                        value: item.discount * 100, // 折扣券优惠金额，单位分
                        valueDesc: item.discount, // 折扣券优惠金额文案
                        unitDesc: "", // 单位文案
                        type: item.type,
                  };
                  let type = item.type;
                  let limitAmount = item.limitAmount;
                  let discount = item.discount;
                  let telCoupon = item.telCoupon;
                  let sbuTitle = "";
                  switch (item.usingstatus) {
                        case 1:
                              coupon.reason = "已使用";
                              break;
                  
                        default:
                              break;
                  }
                  if (item.usingstatus == 1) {
                        coupon.reason = "已使用";
                  }else if(item.usingstatus == 3){
                        coupon.reason = "使用中";
                  }else if(item.usingstatus == 4){
                        coupon.reason = "使用失败，请联系客服";
                  }

                  if (type == 0) {
                        // 代金券
                        coupon.unitDesc = "元";
                        sbuTitle = "满" + limitAmount + "减" + discount + "元";
                  } else if (type == 1) {
                        sbuTitle = "满" + limitAmount + "件打" + discount + "折";
                  } else if (type == 2) {
                        sbuTitle = telCoupon + "元";
                  }
                  coupon.condition = sbuTitle;
                  return coupon;
            },
      },
};
</script>

<style>
.van-coupon-list__exchange-bar {
      display: none !important;
}
.van-nav-bar__left > .van-icon {
      color: #5f656b !important;
      font-size: 20px !important;
}
.van-coupon__corner {
      display: none;
}
.van-coupon__description {
      color: red;
}
.van-coupon__content {
      background: url("../../assets/img/tel.jpg") repeat;
      background-size: cover;
}
.van-coupon__body,
.van-coupon__condition {
      display: none;
}
.van-coupon {
      margin: 0 23px !important;
}
.info {
      color: #000;
}
.van-dialog__message {
      text-align: justify;
}
</style>
