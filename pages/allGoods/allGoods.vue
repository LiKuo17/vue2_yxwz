<template>
  <div class="allGoods">
    <van-search placeholder="搜索商品" background="none" v-model="value" />
    <div class="mainContainer">
      <!-- 左侧盒子 -->
      <div class="leftSider">
        <!-- 每个标题 -->
        <div
          class="topClassItem"
          @click="
            GoodsList.forEach((item) => (item.active = false));
            item.active = true;
            clickTopClassItem(item);
          "
          :class="{ activeTopClassItem: !!item.active }"
          v-for="item in GoodsList"
          :key="item.id"
        >
          {{ item.name }}

          <div class="Onlyline" v-show="!!item.active"></div>
        </div>
      </div>
      <!-- 右边盒子 -->
      <div class="ignore-rightContainer">
        <div
          class="secondaryClassList"
          v-if="secondaryClassList && secondaryClassList.length"
        >
          <!-- 每件商品 -->
          <!-- @click="clickSecondaryClassItem(item)" -->
          <div
            class="secondaryClassItemOuter"
            v-for="item2 in secondaryClassList"
            :key="item2.id"
          >
            <div class="secondaryClassItem">
              <div class="img">
                <img :src="item2.imgUrl" alt="" />
              </div>
              <div
                class="secondaryClassItemTitle"
                style="
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  width: 20vw;
                  transform: translateX(4px);
                "
              >
                {{ item2.name }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="emptyText">暂无分类~</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      secondaryClassList: [],
      value: "",
      GoodsList: [
        {
          id: 1,
          name: "轻奢床品",
          children: [
            {
              id: 11,
              imgUrl: require("@/assets/img/allGoods/轻奢套件.jpg"),
              name: "轻奢套件",
            },
            {
              id: 12,
              imgUrl: require("@/assets/img/allGoods/舒适套件.jpg"),
              name: "舒适套件",
            },
            {
              id: 13,
              imgUrl: require("@/assets/img/allGoods/羽绒被.jpg"),
              name: "羽绒被",
            },
            {
              id: 14,
              imgUrl: require("@/assets/img/allGoods/真丝被.jpg"),
              name: "真丝被",
            },
            {
              id: 15,
              imgUrl: require("@/assets/img/allGoods/夏凉被.jpg"),
              name: "夏凉被",
            },
            {
              id: 16,
              imgUrl: require("@/assets/img/allGoods/纤维被.jpg"),
              name: "纤维被",
            },
          ],
        },
        {
          id: 2,
          name: "时尚居家",
          children: [
            {
              id: 21,
              imgUrl: require("@/assets/img/allGoods/性感睡袍.jpg"),
              name: "性感睡袍",
            },
            {
              id: 22,
              imgUrl: require("@/assets/img/allGoods/舒适家居服.jpg"),
              name: "舒适家居服",
            },
            {
              id: 23,
              imgUrl: require("@/assets/img/allGoods/经典浴袍.jpg"),
              name: "经典浴袍",
            },
          ],
        },
        {
          id: 3,
          name: "全棉毛巾",
          children: [
            {
              id: 31,
              imgUrl: require("@/assets/img/allGoods/全棉面巾.jpg"),
              name: "全棉面巾",
            },
            {
              id: 32,
              imgUrl: require("@/assets/img/allGoods/全棉浴巾.jpg"),
              name: "全棉浴巾",
            },
            {
              id: 33,
              imgUrl: require("@/assets/img/allGoods/防滑地垫.jpg"),
              name: "防滑地垫",
            },
          ],
        },
        {
          id: 4,
          name: "床垫饰枕",
          children: [
            {
              id: 41,
              imgUrl: require("@/assets/img/allGoods/安睡枕.jpg"),
              name: "安睡枕",
            },
            {
              id: 42,
              imgUrl: require("@/assets/img/allGoods/羽绒枕.jpg"),
              name: "羽绒枕",
            },
            {
              id: 43,
              imgUrl: require("@/assets/img/allGoods/护颈枕.jpg"),
              name: "护颈枕",
            },
            {
              id: 44,
              imgUrl: require("@/assets/img/allGoods/保护垫.jpg"),
              name: "保护垫",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.GoodsList[0].active = true;
    this.secondaryClassList = this.GoodsList[0].children;
  },
  methods: {
    clickTopClassItem(tcItem) {
      // console.log(tcItem.catid);
      this.secondaryClassList = tcItem.children;
    },
    clickSecondaryClassItem(secondaryClassItem) {
      // this.$router.push({
      //   path: "/search",
      //   query: {
      //     catid: secondaryClassItem.catid,
      //     value: secondaryClassItem.catname,
      //   },
      // });
    },
  },
};
</script>

<style scoped lang="scss">
.mainContainer {
  height: 100vh;
  display: flex;
}
.leftSider,
.ignore-rightContainer {
  height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}
.leftSider::-webkit-scrollbar,
.ignore-rightContainer::-webkit-scrollbar {
  display: none; /* chrome,safari */
}
.leftSider {
  width: 28vw;
  background-color: rgb(245, 245, 245);
}
.topClassItem {
  position: relative;
  width: 100%;
  height: 90px;
  background-color: rgb(245, 245, 245);
  text-align: center;
  line-height: 90px;
  font-size: 28px;
}
.activeTopClassItem {
  /* background-color: rgb(41, 190, 129); */
  background-color: #ffffff;
  color: black;
}

.ignore-rightContainer {
  flex: 1;
  background-color: #fff;
  padding: 0 10px;
}
.secondaryClassList {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  font-size: 28px;
}
.emptyText {
  width: 100%;
  text-align: center;
  margin-top: 36px;
  font-size: 28px;
  color: #6c757d;
}
.secondaryClassItemOuter {
  padding-left: 33%;
  padding-top: 33%;
  position: relative;
  margin-bottom: 5.133vw;
}
.secondaryClassItem {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.secondaryClassItem .img {
  width: 120px;
  height: 120px;
}
.secondaryClassItemTitle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 20vw;
  transform: translateX(4px);
}
/deep/ .van-search .van-cell {
  background: white;
}
/deep/ .van-cell {
  border-radius: 50px;
  .van-icon-search {
    margin-left: 10px;
  }
}
.Onlyline {
  position: absolute;
  top: 30%;
  left: 15px;
  width: 5px;
  height: 35px;
  background-color: #c3a769;
  border-radius: 11px;
}
</style>
