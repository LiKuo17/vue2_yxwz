<template>
  <div class="index">
    <!-- <div class="kpy" @click="goHome"  v-if="currentUrl == '/'">
                   <img src="../assets/img/kpy.jpg" alt="">
                   
            </div> -->
    <keep-alive include="shoppingcart,aaaa">
      <router-view></router-view>
    </keep-alive>
    <!-- #29BE81 -->

    <van-tabbar
      v-model="navActive"
      :active-color="defaultCls"
      inactive-color="#8e8f90"
    >
      <van-tabbar-item
        @click="goTabBar(item.path, index)"
        v-for="(item, index) in tabbarList"
        :key="index"
        :name="item.name"
      >
        <template #icon>
          <van-icon size="20" :name="item.icon" />
        </template>
        {{ item.text }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Icon } from "vant";

export default {
  name: "index",
  data() {
    return {
      currentUrl: "",
      navActive: "home",
      defaultCls: "#29a1f7",
      tabbarList: [
        {
          text: "首页",
          path: "/",
          icon: "wap-home",
          name: "ccbHome",
        },
        // {
        //   text: "全部商品",
        //   path: "/allGoods",
        //   icon: "apps-o",
        //   name: "allGoods",
        // },

        // {
        //       text: "购物车",
        //       path: "/shoppingcart",
        //       icon: "cart-o",
        //       name: "shoppingcart",
        // },
        // {
        //   text: "我的订单",
        //   path: "/myOrder",
        //   icon: "bill-o",
        //   name: "myOrder",
        // },
        {
          text: "个人中心",
          path: "/ccbUser",
          icon: "manager",
          name: "ccbUser",
        },
        // {
        //   text: "个人中心",
        //   path: "/myRights",
        //   icon: "manager",
        //   name: "myRights",
        // },
        // {
        //       text: "会员中心",
        //       path: "/personalCenter",
        //       icon: "contact",
        //       name: "personalCenter",
        // },
        // {
        //   text: "我的",
        //   path: "/shoppingcartForOld",
        //   icon: "contact",
        //   name: "shoppingcartForOld"
        // }
      ],
    };
  },
  created() {
    // const token = JSON.parse(localStorage.getItem("amain_token"));
    // if (!token) {
    //   Toast.loading({
    //     message: "将跳转至登录页",
    //     forbidClick: true,
    //     duration: 3000,
    //   });
    //   setTimeout(() => {
    //     this.$router.push("/authLogin");
    //   }, 3000);
    // }
  },
  mounted() {
    // this.currentUrl = this.$route.path;
    // console.log(this.currentUrl);
  },
  watch: {
    $route: {
      handler(newV) {
        this.navActive = newV.name;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    goHome() {  
      this.$router.replace("/ccbHome");
    },
    goTabBar(path, index) {
      this.$router.push(path);
    },
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
  },
};
</script>

<style scoped>
.kpy {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  bottom: 0;
}
.kpy > img {
  width: 100%;
  height: 100%;
}
.index {
  width: 100%;
  /* height: 100vh; */
  overflow: scroll;
}

.index_icon {
  font-size: 42px;
}
</style>
