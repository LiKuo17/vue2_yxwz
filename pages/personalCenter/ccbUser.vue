<template>
  <div class="ccbUser">
    <!-- :style="{
        backgroundImage: `url()`,
      }" -->
    <!-- backgroundImage: `url(${require('@/assets/img/userCenterBg.jpg')})`, -->
    <div
      class="userCover position-relative flex-center flex-column"
      style="
        background-image: url('https://img01.yzcdn.cn/upload_files/2019/01/31/Fp3kIohim8ZiB1yLepoMMW8is_qY.png!730x0.jpg');
        background-size: cover;
      "
    >
      <div
        class="avatarOuter border-pill"
        :style="{
          backgroundImage: `url(${
            userInfo.avatar ? $getImageUrl(userInfo.avatar) : fixAvatar
          })`,
        }"
      ></div>
      <div class="mt-3 fw-bold text-white fs-1 text-ellipsis">
        <!-- {{ userInfo.nickname }} -->
        {{ this.loginPhone }}
      </div>
    </div>

    <div class="card_content">
      <div class="card_box">
        <div class="card_box-item">
          <div class="card_box-item-top">0</div>
          <div>积分</div>
        </div>
        <div class="card_box-item">
          <div class="card_box-item-top">0</div>
          <div>优惠券/码</div>
        </div>
        <div class="card_box-item" @click="goCard">
          <div class="card_box-item-top">0</div>
          <div>卡</div>
        </div>
        <div class="card_box-item">
          <div class="card_box-item-top">0.00</div>
          <div>余额</div>
        </div>
        <div class="card_box-item">
          <div><van-icon name="gold-coin-o" size="20px" /></div>
          <div>零钱</div>
        </div>
      </div>
    </div>

    <div
      @click="handleToOrderList()"
      class="
        orderTitle
        fs-6
        d-flex
        justify-content-between
        align-items-center
        px-5
        py-4
        bg-white
      "
    >
      <span class="myOrders">我的订单</span>
      <span class="allOrder">
        <span>查看全部订单&nbsp;&nbsp;</span
        ><van-icon name="arrow" size="13px" class="arrow" />
      </span>
    </div>
    <div
      class="
        orderIcons
        bg-white
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <div
        class="orderIcon fs-5 text-muted flex-center flex-column"
        @click="handleToOrderList(iconIndex + 1)"
        v-for="(icon, iconIndex) in orderIcons"
        :key="icon.title"
      >
        <OrderIcon1 v-if="iconIndex == 0" width="28" height="28" />
        <OrderIcon2 v-if="iconIndex == 1" width="28" height="28" />
        <OrderIcon3 v-if="iconIndex == 2" width="28" height="28" />
        <OrderIcon4 v-if="iconIndex == 3" width="28" height="28" />
        <OrderIcon5 v-if="iconIndex == 4" width="28" height="28" />
        <span class="mt-2">{{ icon.title }}</span>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 10px">
        <van-cell-group class="personMes shopCar" inset>
          <van-cell icon="gem-o" left title="我的权益" is-link to="myRights" />
          <!-- <van-cell title="我的权益" icon="gem-o" is-link to="myRights" >
          <template #right-icon>
            <div class="shopNum">{{shopNum}}</div>
            <van-icon name="arrow" />
          </template>
        </van-cell> -->
        </van-cell-group>
        <van-cell-group class="personMes shopCar" inset>
          <van-cell
            icon="gem-o"
            left
            title="自助餐权益"
            is-link
            to="myRights"
          />
        </van-cell-group>
        <van-cell-group class="personMes shopCar" inset>
          <van-cell icon="gem-o" left title="酒店权益" is-link to="myRights" />
        </van-cell-group>

        <van-cell-group class="personMes shopCar" inset>
          <!-- <van-cell icon="cart-o" left title="购物车" is-link /> -->
          <van-cell title="购物车" icon="cart-o" is-link to="shoppingcart">
            <template #right-icon>
              <!-- <div class="shopNum">{{ shopNum }}</div> -->
              <van-icon name="arrow" />
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group class="personMes" inset>
          <van-cell icon="orders-o" left title="任务中心" is-link />
        </van-cell-group>
        <van-cell-group class="personMes" inset>
          <van-cell icon="refund-o" left title="返现" is-link to="cashBack" />
        </van-cell-group>
        <van-cell-group class="personMes" inset>
          <van-cell icon="send-gift-o" left title="赠品" is-link to="gift" />
        </van-cell-group>
      </div>

      <div>
        <van-cell-group class="personMes" inset>
          <van-cell
            icon="location-o"
            left
            title="收货地址"
            is-link
            to="address"
          />
        </van-cell-group>
        <van-cell is-link class="accountSafe_box">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="account_icon">
              <img :src="usnSafe" class="accountSafe" />
              <span class="custom-title">账号与安全</span>
            </div>
          </template>
        </van-cell>

        <van-cell is-link class="accountSafe_box" to="personalInformation">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="account_icon">
              <img :src="personMsg" class="accountSafe" />
              <span class="custom-title">个人信息</span>
            </div>
          </template>
        </van-cell>
      </div>
      <!-- <van-cell-group class="personMes" inset>
      <van-cell icon="cart-o" left title="账号与安全" is-link />
    </van-cell-group>
    <van-cell-group class="personMes" inset>
      <van-cell icon="idcard" left title="个人信息" is-link />
    </van-cell-group> -->
      <div style="margin-bottom: 12vh"></div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import config from "@/assets/js/config.js";
import { getData } from "../../api";
const { customerServiceAddress } = config;
export default {
  data() {
    return {
      shopNum: "2",
      loginPhone: "",
      userInfo: {},
      orderIcons: [
        {
          title: "待付款",
        },
        {
          title: "待发货",
        },
        {
          title: "待收货",
        },
        {
          title: "待评价",
        },
        {
          title: "退货/售后",
        },
      ],
      fixAvatar: "/static/img/test_userx.png",
      window,
      usnSafe: require("@/assets/img/accountsafe.png"),
      personMsg: require("@/assets/img/idcard.png"),
      userInfo: {
        avatar: null, // 头像
        discountNumber: null, // 次数（5-8折住酒店）
        invalidTime: null, // 失效时间
        openTime: null, // 开通时间
        phone: null, // 手机号
        realName: null, // 姓名
        sex: null, // 性别 (0男 1女 2未知)
        thresholdNumber: null, // 次数（288起住酒店）
        vipFlg: null, // 是否vip  (0否 1是)
        vipName: null, // 会员名称
      },
    };
  },
  created() {
    const token = JSON.parse(localStorage.getItem("amain_token"));
    if (!token) {
      this.loginPhone = "";
      Toast.loading({
        message: "将跳转至登录页",
        forbidClick: true,
        duration: 1000,
      });
      setTimeout(() => {
        this.$router.push("/authLogin");
      }, 2000);
    } else {
      let Phone = JSON.parse(localStorage.getItem("loginPhone"));
      this.loginPhone = Phone.substr(0, 3) + "****" + Phone.substr(7);
      this.getUserInfo();
    }
  },
  methods: {
    toOrder() {
      this.$router.push("/ccbOrder");
    },
    async getUserInfo() {
      const result = await getData("getUserInfo");
      if (result.code == 0) {
        this.userInfo = result.data;
        console.log(this.userInfo, "this.userInfo");
      }
    },
    handleToOrderList(index) {
      let query = index == undefined ? {} : { type: index };
      this.$router.push({ path: "/ccbOrder", query });
    },
    goCard() {
      this.$router.push("/card");
    },
  },
};
</script>

<style lang="scss" scoped>
.ccbUser {
  .userCover {
    width: 100vw;
    height: 26vh;
    margin-bottom: 5vh;
    .messageIcon {
      right: 5vw;
      top: 5vw;
    }
    .avatarOuter {
      width: 120px;
      height: 120px;
      border: 6px solid #fff;
      background-size: cover;
    }
  }
  .orderTitle {
    width: 82%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(230, 230, 230);
    > span:last-child {
      color: #979da2;
    }
  }
  .van-cell__right-icon {
    font-size: 14px;
    line-height: 28px;
  }
  .orderIcons {
    width: 92%;
    margin: 0 auto 1.5vh;
    height: 30vw;
  }
  .orderIcon {
    width: 20vw;
    > span {
      white-space: nowrap;
    }
  }
}
.card_content {
  .card_box {
    display: flex;
    width: 92%;
    margin: 0 auto 1.5vh;
    justify-content: space-around;
    height: 11vh;
    background-color: #fff;
    border-radius: 8px;
    .card_box-item {
      font-size: 3.8vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      vertical-align: center;
      justify-content: space-evenly;
      .card_box-item-top {
        font-weight: 700;
      }
    }
  }
}
.myOrders {
  font-size: 0.95rem;
  font-weight: 600;
}
.arrow {
}
.account_icon {
  display: flex;
  align-items: center;
}
.allOrder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  font-size: 3.067vw;
}
.text-white {
  color: rgb(51, 51, 51);
}
.personMes {
  width: 92%;
  margin: 0 auto;
  .van-cell {
    align-items: center;
  }
}
.van-cell__title {
  text-align: left;
}
.accountSafe {
  width: 5.5%;
}
.custom-title {
  margin-left: 6px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.accountSafe_box {
  margin: 0 auto;
  width: 92%;
}
.shopNum {
  width: 4vw;
  height: 4vw;
  background: #f44;
  text-align: center;
  line-height: 4vw;
  border-radius: 50%;
  color: white;
}
</style>
