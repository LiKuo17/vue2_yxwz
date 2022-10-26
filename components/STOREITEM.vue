<template>
  <div>
    <van-swipe-cell
      class="storeItem"
      @open="openStaus = true"
      @close="openStaus = false"
    >
      <div class="storeContent">
        <div
          class="storeInfoLine"
          @click="!openStaus ? $emit('clickstore', { item: storeItem }) : false"
        >
          <div class="storeInfo">
            <div
              class="storeAva"
              :style="{
                backgroundImage:
                  'url(' +
                  (storeItem.logourl ? storeItem.logourl : storeAva) +
                  ')',
              }"
            >
            </div>
            <div class="storeText">
              <div class="storeTitle">{{ storeItem.bizname }}</div>
              <!-- <div class="storeColNum">3456人收藏</div> -->
            </div>
          </div>
        </div>
        <div class="goodsImgsLine">
          <div
            class="goodsImg"
            @click="handleToDetail(item1.prdno)"
            :style="{
              backgroundImage:
                'url(' +
                (item1.mainimage
                  ? fileServerAddress + item1.mainimage
                  : nullImg) +
                ')',
            }"
            v-for="(item1, index1) in storeItem.products"
            :key="index1"
          ></div>
        </div>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          class="delete-button-ignore"
          @click="$emit('deletestore', { item: storeItem, index: idx })"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { SwipeCell, Button } from "vant";
import _config from "../assets/js/config";
export default {
  props: {
    storeItem: {
      type: Object,
      default: () => {},
    },
    idx: {
      type: Number,
    },
  },
  data() {
    return {
      nullImg: "/static/img/detaul_Img.jpg",
      storeAva: "/static/img/store.png",
      openStaus: false,
      fileServerAddress: _config.fileServerAddress,
    };
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
  },
  methods: {
    handleToDetail(prdno) {
      if (prdno == undefined) {
        return false;
      }
      this.$router.push({
        path: "/detail",
        query: {
          prdno: prdno,
        },
      });
    },
  },
};
</script>

<style scoped>
.storeItem {
  margin-bottom: 1.8vw;
}
.delete-button-ignore {
  width: 80px;
  height: 100%;
}
.storeContent {
  border-radius: 1.8vw;
  background-color: #ffffff;
  padding: 3.2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.storeInfoLine {
  display: flex;
}
.storeInfo {
  display: flex;
}
.storeAva {
  background-image: url(/static/img/detaul_Img.jpg);
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-right: 2vw;
}
.storeText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.storeText > div:first-child {
  color: #333;
  font-size: 29px;
}
/* .storeText > div:last-child {
  color: darkgrey;
  font-size: 23px;
} */
.goodsImgsLine {
  padding-left: calc(9vw + 2vw);
  display: flex;
  justify-content: space-between;
  margin-top: 3.2vw;
}
.goodsImg {
  width: 22%;
  height: 0;
  padding-top: 22%;
  background-color: #fff;
  border-radius: 1.8vw;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}
</style>
