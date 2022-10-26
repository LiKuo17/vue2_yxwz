<template>
  <div class="PRDLISTs">
    <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：列表型商品列表 (widgets='PRDLIST')
        -->
    <div class="card_Box">
      <div class="box_Content1">
        <div class="PRDLIST">
          <div
            class="sift_Article_Box"
            v-for="(item_PRDLIST, index_PRDLIST) in prdgridItem.items"
            :key="index_PRDLIST"
            @click="doDetail(item_PRDLIST.prdno, item_PRDLIST.linkPage)"
          >
            <div class="box_Content2">
              <div class="left_box">
                <div class="img_Box3">
                  <van-image
                    :lazy-load="true"
                    width="100%"
                    :src="imgServerAdd + item_PRDLIST.imageUrl"
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
                  <!-- <img  onerror="this.src='';this.οnerrοr=function(){}" /> -->
                </div>
              </div>
              <div class="right_box">
                <p class="name">{{ item_PRDLIST.title }}</p>
                <p class="norms">{{ item_PRDLIST.subtitle }}</p>
                <p class="noprice" v-if="item_PRDLIST.status === -1">
                  <span></span>
                  <span>未上架</span>
                </p>
                <p class="price_prdlist" v-else>
                  <span>{{
                    item_PRDLIST.instalments == 0 ||
                    item_PRDLIST.instalments == undefined
                      ? "价格："
                      : "分期价："
                  }}</span>
                  <span
                    >￥{{
                      item_PRDLIST.instalments == 0 ||
                      item_PRDLIST.instalments == undefined
                        ? item_PRDLIST.saleprice == undefined
                          ? "暂无价格"
                          : item_PRDLIST.saleprice + "元"
                        : parseFloat(
                            item_PRDLIST.saleprice / item_PRDLIST.instalments
                          ).toFixed(2) +
                          "×" +
                          item_PRDLIST.instalments +
                          "期"
                    }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import { Swipe, SwipeItem, Image, Loading } from "vant";

export default {
  name: "PRDLISTs",
  props: ["prdgridItem"],
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
    };
  },
  created() {
    // console.log(this.$props.prdgridItem);
  },
  methods: {
    doDetail(_prdid, _linkPage) {
      this.$emit("doDetail", _prdid, _linkPage);
    },
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Loading.name]: Loading,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.PRDLISTs {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/

.card_Box {
  background-color: white;
}

.price_prdlist {
  margin-top: 10px;
}

.price_prdlist > span:nth-child(2) {
  color: rgb(235, 101, 101);
  font-size: 28px;
  font-weight: bold;
}

.noprice > span:nth-child(1) {
  color: #888888;
  font-size: 26px;
  font-weight: bold;
}

.img_Box3 {
  width: 158px;
  height: 158px;
  margin-right: 24px;
  overflow: hidden;
}

.price_prdlist > span:nth-child(1) {
  color: rgb(153, 153, 153);
  font-size: 26px;
  font-weight: 600;
}

.norms {
  color: rgb(235, 101, 101);
  font-size: 26px;
  margin-top: 10px;
}

.name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: rgb(51, 51, 51);
  font-size: 26px;
  margin-top: 7px;
  margin-bottom: 7px;
}

.right_box {
  float: right;
  width: 450px;
  text-align: left;
}

.right_box > p {
  padding: 0;
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
  /*padding-top: 32px;*/
  justify-content: space-between;
}

article .PRDLIST {
  padding-top: 0;
}

.box_Content1 {
  padding: 0 32px;
}
</style>
