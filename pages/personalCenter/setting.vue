<template>
  <div class="setting">
    <header>
      <div class="header_Box">
        <van-nav-bar title="设置" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="header_section">
      <article class="a1">
        <div class="card">
          <div class="Content_Box">
            <van-uploader :after-read="afterRead" name="avatar">
              <div class="img_Box">
                <img
                  :src="imgUrl"
                  onerror="this.src='../../../static/img/test_userx.png';this.onerror=null;console.log(this)"
                />
              </div>
            </van-uploader>
            <span class="user_name">{{ userName }}</span>
          </div>

          <van-cell
            class="Content_Box2"
            is-link
            size="large"
            to="/addressManage"
            title="我的收货地址"
          />

          <!-- 
	  <div class="Content_Box1" @click="toAddressManage">
            <p><span>我的收货地址</span><span style="float: right;">
                <van-icon name="arrow" /></span></p>
          </div> 
	  -->

          <!-- 优惠券单元格 -->
          <van-coupon-cell
            class="Content_Box2"
            size="large"
            title="红包卡券"
            :value="coupons.length + '张'"
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          >
          </van-coupon-cell>
          <!-- 优惠券列表 -->
          <van-popup v-model="showList" position="left">
            <div class="header_Box">
              <van-nav-bar
                title="红包卡券"
                left-arrow
                @click-left="showList = false"
              />
            </div>
            <van-coupon-list
              style="text-align: left; margin-bottom: 5px"
              enabled-title="可使用"
              disabled-title="已使用/已失效"
              :show-close-button="false"
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            >
            </van-coupon-list>
          </van-popup>
        </div>
      </article>
      <article>
        <div class="card">
          <div class="Content_Box1">
            <p @click="toMemberLogout"><span>退出当前账号</span></p>
          </div>
        </div>
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
import {
  NavBar,
  Icon,
  AddressList,
  Uploader,
  Toast,
  CouponCell,
  CouponList,
  Popup,
  Cell,
  CellGroup,
} from "vant";

export default {
  name: "setting",
  data() {
    return {
      chosenAddressId: "1",
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      imgUrl: "../../../static/img/test_userx.png",
      userName: "",
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
    };
  },
  created() {
    var _this = this;
    // _this.getUserInfo();
    _this.getCoupons(); //获取优惠券
  },
  methods: {
    // getUserInfo() {
    //   var _this = this;
    //   _this.$http.get('/m/members/api/getInfo', {
    //     params: {}
    //   }).then(function(e) {
    //     if (e.result == 0) {
    //       _this.imgUrl = _this.imgServerAdd + e.data.avatar;
    //       _this.userName = e.data.nickname;
    //     }

    //   });
    // },
    back() {
      this.$router.go(-1);
    },
    beforeRead(file, detail) {
      //console.log(file);
      //console.log(detail);
      //console.log(1);
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
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (e) {
          if (e.result == 0) {
            Toast("上传成功");
            _this.imgUrl = _this.imgServerAdd + e.data.fileUrl;
          } else {
            Toast(e.msg);
          }
          //console.log(e);
        });
    },
    toAddressManage() {
      this.$router.push("/addressManage");
    },
    toMemberLogout() {
      var _this = this;
      _this
        .$http({
          method: "get",
          url: "/m/common/login/api/logout",
          params: {},
        })
        .then(function (e) {
          if (e.result == 0) {
            Toast("您已退出当前帐户");

            _this.$router.push("/");
          } else {
            Toast(e.msg);
          }
        });
    },
    // 二期开发方法
    //获取当前可领优惠券列表
    getCoupons(_prdId) {
      var _this = this;
      var _params = {};

      _this.$http
        .get("/m/coupons/api/getMyCoupons", {
          params: _params,
        })
        .then(function (e) {
          if (e.result == 0) {
            //循环执行前先清空
            // _this.coupons = [];
            // _this.disabledCoupons = [];

            e.data.forEach((item, index) => {
              let usingstatus = item.usingstatus;
              let coupon = _this.couponsDataTreating(item);
              //判断用户是否可用
              if (usingstatus == 0) {
                _this.coupons.push(coupon);
              } else {
                _this.disabledCoupons.push(coupon);
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

    //选择优惠券
    onChange(index) {
      let coupon = this.coupons[index];
      Toast("[" + coupon.name + "] " + coupon.condition);
    },

    //兑换优惠券
    onExchange(code) {
      Toast("无效的兑换码");
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [AddressList.name]: AddressList,
    [Uploader.name]: Uploader,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
};
</script>
<style>
@import url("../../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_Box {
  width: 100vw;
}
.header_Box,
.Content_Box,
.Content_Box1 {
  border-bottom: 1px solid rgb(223, 223, 223);
}
.a1 {
  margin-bottom: 26px;
}
.Content_Box1,
.Content_Box2 {
  text-align: left;
  color: rgb(51, 51, 51);
  font-size: 34px;
}
.Content_Box1 {
  line-height: 94px;
  /* margin-left: 32px; */
  padding-left: 32px;
  padding-right: 34px;
}
.Content_Box2 {
}

.user_name {
  color: rgb(51, 51, 51);
  font-size: 32px;
}

img {
  width: 100%;
  height: 100%;
}

.img_Box {
  width: 120px;
  vertical-align: middle;
  height: 120px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 28px;
}

.Content_Box {
  line-height: 184px;
  text-align: left;
  /* margin-left: 32px; */
  padding-left: 32px;
  /* border-bottom: 1px solid rgb(223, 223, 223); */
}

.card {
  background-color: rgb(255, 255, 255);
}
</style>
