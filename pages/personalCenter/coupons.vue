<template>
  <div>
    <div class="header_Box">
      <van-nav-bar title="优惠券" left-arrow @click-left="$back" />
    </div>
    <van-coupon-list
      style="text-align: left;margin-bottom: 5px;"
      enabled-title="可使用"
      disabled-title="已使用/已失效"
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
import { NavBar, CouponList, Toast } from "vant";
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
      Toast("[" + coupon.name + "] " + coupon.condition);
    },
    //兑换优惠券
    onExchange(code) {
      Toast("无效的兑换码");
    },
    //获取当前可领优惠券列表
    getCoupons() {
      this.$http.get("/m/coupons/api/getMyCoupons").then((e) => {
        if (e.result == 0) {
          //循环执行前先清空
          this.coupons = [];
          this.disabledCoupons = [];
          e.data.forEach((item, index) => {
            let usingstatus = item.usingstatus;
            let coupon = this.couponsDataTreating(item);
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
        description: "商品优惠券", // 描述信息，优惠券可用时展示
        reason: "已失效", // 不可用原因，优惠券不可用时展示
        value: item.discount * 100, // 折扣券优惠金额，单位分
        valueDesc: item.discount, // 折扣券优惠金额文案
        unitDesc: "", // 单位文案
      };
      let type = item.type;
      let limitAmount = item.limitAmount;
      let discount = item.discount;
      let sbuTitle = "";
      if (item.usingstatus == 1) {
        coupon.reason = "已使用";
      }
      if (type == 0) {
        // 代金券
        coupon.unitDesc = "元";
        sbuTitle = "满" + limitAmount + "减" + discount + "元";
      } else if (type == 1) {
        sbuTitle = "满" + limitAmount + "件打" + discount + "折";
      }
      coupon.condition = sbuTitle;
      return coupon;
    },
  },
};
</script>

<style>
.van-nav-bar__left > .van-icon {
  color: #5f656b !important;
  font-size: 20px !important;
}
.van-coupon__corner{
  display: none;  
}
</style>
