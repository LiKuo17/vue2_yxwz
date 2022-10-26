<template>
  <div>
    <header>
      <van-sticky>
        <van-nav-bar title="帮助中心" left-arrow @click-left="back">
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </van-sticky>
    </header>
    <div class="helpList">
      <div v-for="(item, index) in helpList" :key="index">
        <van-cell size="large" class="titleCell" :title="item.title" />
        <van-cell
          v-for="(item1, index1) in item.children"
          :key="'child' + index1"
          :title="item1.title"
          is-link
          :to="index==0?`/aboutDetail?type=${item1.title}`:`/helpQuestion?type=${item1.title}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, Sticky, NavBar, Icon } from "vant";
export default {
  components: {
    vanCell: Cell,
    vanSticky: Sticky,
    vanNavBar: NavBar,
    vanIcon: Icon,
  },
  data() {
    return {
      helpList: [
        {
          title: "关于大农商商城",
          children: [
            // {
            //   title: "大农商介绍"
            // },
            // {
            //   title: "大农商用户服务协议"
            // },
            {
              title: "专区服务管理制度总则"
            },
            {
              title: "通讯数码类"
            },
            {
              title: "珠宝首饰类"
            },

            {
              title: "品牌箱包类"
            },
            {
              title: "存储类"
            },
          ],
        },
        {
          title: "常见问题",
          children: [
            {
              title: "购物常见问题"
            },
            {
              title: "配送常见问题"
            },
            {
              title: "退换货常见问题"
            },
          ],
        },
      ],
    };
  },
  methods: {
    back() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.titleCell {
  background-color: transparent;
  font-weight: bold;
}
.van-cell__title {
  text-align: left;
}
</style>
