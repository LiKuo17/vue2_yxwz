<template>
  <div class="personalCenter-ignore">
    <!-- 右上角菜单+标题栏 -->
    <popupMenu title="会员中心" @click-left="back" />
    <div class="avatarArea">
      <div class="ava_bg" :style="{ backgroundImage: `url(${cartBg})` }">
        <div class="ava_info">
          <div
            class="avatar"
            :style="{
              backgroundImage: `url(${
                userInfo.avatar ? userInfo.avatar : fixAvatar
              })`,
            }"
          ></div>
          <div class="nickname">
            {{ userInfo.uid }}
          </div>
        </div>
      </div>
    </div>

    <div class="orderArea">
      <div class="myOrder" @click="handleToOrder(0)">
        <div>我的订单</div>
        <van-icon name="arrow" />
      </div>
      <div class="orderItems">
        <div
          @click="handleToOrder(index + 1)"
          class="orderItem"
          v-for="(item, index) in orderType"
          :key="index"
        >
          <div
            class="itemIcon"
            :style="{ backgroundImage: `url(${item.icon})` }"
          >
            <div v-if="item.badge" class="itemBadge">
              {{ Number(item.badge) > 99 ? "99+" : item.badge }}
            </div>
          </div>
          <div class="itemTitle">{{ item.title }}</div>
        </div>
      </div>
    </div>

    <div class="listArea">
      <van-cell
        v-for="(item, index) in list"
        title-style="color:#5C5C5C;font-size:16px;"
        :key="index"
        :title="item.title"
        is-link
        :to="item.url"
        @click="handleToIntegralMall(item)"
      />
    </div>
  </div>
</template>

<script>
import { Icon, Cell, NavBar, Sticky, Toast } from "vant";
import _config from "../../assets/js/config";
import popupMenu from "../../components/POPUPMENU";
export default {
  components: {
    vanIcon: Icon,
    vanCell: Cell,
    vanNavBar: NavBar,
    vanSticky: Sticky,
    popupMenu,
  },
  data() {
    return {
      cartBg: "",
      fixAvatar: "/static/img/test_userx.png",
      userInfo: {
        avatar: "",
        uid: "",
      },
      orderType: [
        {
          icon: "/static/img/order_waitPay.png",
          title: "待付款",
          badge: 0,
        },
        {
          icon: "/static/img/order_waitDelivery.png",
          title: "待发货",
          badge: 0,
        },
        {
          icon: "/static/img/order_waitGoods.png",
          title: "待收货",
          badge: 0,
        },
        {
          icon: "/static/img/order_comment.png",
          title: "待评价",
          badge: 0,
        },
        {
          icon: "/static/img/afterSales.png",
          title: "退款/售后",
          badge: 0,
        },
      ],
      list: [
        {
          title: "优惠券",
          url: "/coupons",
        },
        {
          title: "我的积分",
        },
        {
          title: "分销中心",
        },
        {
          title: "我的地址",
          url: "/addressManage",
        },
        {
          title: "我的收藏",
          url: "/collection",
        },
        {
          title: "客户服务",
          url: "/chatList",
        },
        {
          title: "帮助中心",
          url: "/helpCenter",
        },
        {
          title: "意见反馈",
          url: "/feedBack",
        },
      ],
    };
  },
  created() {
    this.getUserMsg();
    // this.getUserData();
  },
  methods: {
    handleToIntegralMall(item) {
      if (item.title == "我的积分") {
        Toast.loading({
          forbidClick: true,
          message: "加载中...",
          duration: 5000,
        });
        this.$http.post("/m/jifen/api/synchronizedPoint").then((res) => {
          if (res.result == 0) {
            this.$http.post("/m/jifen/api/postToken").then((res) => {
              Toast.clear();
              if (res.result == 0) {
                window.location = `${_config.integralMallAddress}model1?token=${res.data}`;
              } else {
                Toast(res.msg);
              }
            });
          }
        });
      } else if (item.title == "分销中心") {
        console.log("分销中心");
        this.$http
          .get("/m/distribution/api/synchronizedDistribution")
          .then((res) => {
            if (res.result === 200) {
              window.location = `${_config.distritionAddress}?sign=${res.data}`;
            } else if (res.result == 407) {
              Toast.fail(res.msg);
            } else if (res.result == 402) {
              const { mobile, uid, nickname, avatar } = this.userInfo;
              // console.log(this.userInfo);
              window.location = `${
                _config.distritionAddress
              }/#/register?mobile=${mobile}&nickName=${
                nickname || uid
              }&avatar=${avatar}`;
            } else {
              Toast.fail(res.msg);
            }
          });
      }
    },
    handleToOrder(index) {
      this.$router.push({ path: "/myOrder", query: { type: index } });
    },
    getUserMsg() {
      this.$http
        .get("/m/common/pageconfig/api/getconfig", {
          params: {
            pageId: "USER",
          },
        })
        .then((e) => {
          if (e.result == 0) {
            this.cartBg =
              _config.fileServerAddress + e.data.widgets[0].imageUrl;
          }
        });
    },
    // getUserData() {
    //     this.$http.get("/m/members/api/getInfo").then(e => {
    //         if (e.result == 0) {
    //             this.userInfo = e.data;
    //             if (e.data.avatar && !e.data.avatar.startsWith("http")) {
    //                 this.userInfo.avatar = _config.fileServerAddress + e.data.avatar;
    //             }
    //         }
    //     });
    // },
    back() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.personalCenter-ignore >>> .van-sticky--fixed {
  z-index: 3;
}
.listArea >>> .van-cell {
  padding: 10px 4.2vw;
}
.listArea {
  padding-bottom: 12vw;
}
.van-nav-bar__left > .van-icon {
  color: #5f656b !important;
  font-size: 20px !important;
}
.van-cell__title {
  text-align: left;
}
.personalCenter-ignore {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.avatarArea {
  padding: 1.5vh 2.4vw;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 0.8vh #f6f6f6 solid;
}
.ava_bg {
  padding: 2.7vh 0;
  border-radius: 18px;
  background-color: rgb(240, 240, 240);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
}
.ava_bg::before {
  position: absolute;
  border-radius: 18px;
  content: "";
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(0, 0, 0, 0.055), rgba(0, 0, 0, 0.178));
}
.ava_info {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 2;
}
.avatar {
  width: 16vw;
  height: 16vw;
  border: 0.55vw solid #ffffff;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}
.nickname {
  font-size: 28px;
  color: #333;
  margin-top: 3vw;
  font-weight: bold;
  max-width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.orderArea {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 2.6vh 2.4vw;
  box-sizing: border-box;
  border-bottom: 0.8vh #f6f6f6 solid;
}
.myOrder {
  height: 7vw;
  text-align: left;
  color: #000;
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 0 1vw;
}
.orderItems {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding-top: 2vh;
}
.orderItem {
  min-width: 12vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.itemIcon {
  width: 7.8vw;
  height: 7.8vw;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
}
.itemBadge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(63%, -63%);
  box-sizing: border-box;
  border: 0.54vw #c7535f solid;
  color: #c7535f;
  width: 5.7vw;
  height: 5.7vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 23px;
  border-radius: 50%;
}
.itemTitle {
  margin-top: 1.8vh;
  color: #333;
  font-size: 28px;
}
</style>
