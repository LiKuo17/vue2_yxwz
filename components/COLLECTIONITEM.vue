<template>
  <div class="collectionItem">
    <div class="colItem">
      <van-swipe-cell :disabled="disabled" @open="open" @close="close">
        <div class="box_Content1" @click="handleParentClick">
          <div class="sift_Article_Box">
            <div class="box_Content2">
              <div class="left_box">
                <div class="img_Box3">
                  <van-image
                    :lazy-load="true"
                    width="100%"
                    :src="imgServerAdd + collectionItem.mainimage"
                  >
                    <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                    </template>
                    <template v-slot:error>
                      <van-image
                        :src="require('@/assets/img/detaul_Img.jpg')"
                      ></van-image>
                    </template>
                  </van-image>
                </div>
              </div>
              <div class="right_box">
                <p class="name">{{ collectionItem.prdname }}</p>
                <p class="norms">{{ collectionItem.features }}&nbsp;</p>
                <p class="price">
                  <span>价格：</span>
                  <span>{{ collectionItem.saleprice.toFixed(2) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            @click="$emit('delete')"
            style="height:100%;width:80px;"
            square
            type="danger"
            text="删除"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import { Sticky, NavBar, SwipeCell, Button, Image, Loading } from "vant";
export default {
  props: {
    collectionItem: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgServerAdd: _config.fileServerAddress,
      openStaus: false
    };
  },
  components: {
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Image.name]: Image,
    [Loading.name]: Loading
  },
  methods: {
    handleParentClick() {
      if (!this.openStaus) {
        this.$emit("click");
      }
      return false;
    },
    open() {
      this.openStaus = true;
    },
    close() {
      this.openStaus = false;
    }
  }
};
</script>

<style>
.colItem {
  background-color: #fff;
}
.box_Content1 {
  padding: 0 32px;
}

.mrn {
  position: relative;
}

.sift_Article_Box {
  display: flex;
  justify-content: space-between;
}

.img_Box3 {
  width: 158px;
  height: 158px;
  margin-right: 24px;
  overflow: hidden;
}

.box_Content2 {
  display: flex;
  align-items: center;
  text-align: left;
}

.img_Box3 {
  width: 158px;
  height: 158px;
  margin-right: 24px;
  overflow: hidden;
}

.box_Content2 {
  display: flex;
  align-items: flex-start;
  padding: 18px 0;

  width: 100%;
}

.sift_Article_Box:nth-child(1) > .box_Content2 {
  border-top: 0;
}

.sift_Article_Box {
  display: flex;
  justify-content: space-between;
}
.right_box {
  float: right;
  width: 450px;
  text-align: left;
}

.right_box > p {
  padding: 0;
}

.price {
  margin-top: 20px;
}
.price > span:nth-child(2) {
  color: rgb(235, 101, 101);
  font-size: 28px;
  font-weight: bold;
}

.price > span:nth-child(2)::before {
  content: "￥";
  font-size: 24px;
}

.price > span:nth-child(1) {
  color: rgb(153, 153, 153);
  font-size: 28px;
  font-weight: 600;
}

.norms {
  color: rgb(148, 142, 142);
  font-size: 24px;
  margin-top: 10px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(51, 51, 51);
  font-size: 26px;
  margin-top: 7px;
  margin-bottom: 7px;
  font-weight: bold;
}
</style>
