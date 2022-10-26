<template>
  <div class="PRDGRIDs">
    <!--
          作者：offline
          时间：2019-08-22
          描述：网格型商品列表 (widgets='PRDGRID')
        -->
    <div class="card_Box">
      <div class="box_Content1">
        <div class="PRDGRID">
          <div class="sift_Article_Box">
            <div
              class="sift_Article_Boxs"
              v-for="(item_PRDGRID, index_PRDGRID) in prdgridItem.items"
              :key="index_PRDGRID"
              @click="doDetail(item_PRDGRID.prdno, item_PRDGRID.linkPage)"
            >
              <div
                class="PRDGRID_imgBox"
                :style="
                  'width: ' +
                    prdgridItem.iconWidth +
                    '; height: ' +
                    prdgridItem.iconHeight +
                    ';'
                "
              >
                <img
                  :src="imgServerAdd + item_PRDGRID.imageUrl"
                  onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null"
                />
              </div>
              <p class="article_title">
                <span>{{ item_PRDGRID.title }}</span>
              </p>
              <p class="article_subtitle">
                <span>{{ item_PRDGRID.subtitle }}</span>
              </p>
              <p class="article_price">
                {{
                  item_PRDGRID.saleprice == undefined
                    ? "暂无价格"
                    : item_PRDGRID.instalments == 0 ||
                      item_PRDGRID.instalments == undefined
                    ? "￥" + item_PRDGRID.saleprice
                    : "￥" +
                      parseFloat(
                        item_PRDGRID.saleprice / item_PRDGRID.instalments
                      ).toFixed(2)
                }}
                <span>{{
                  item_PRDGRID.instalments == 0 ||
                  item_PRDGRID.instalments == undefined
                    ? ""
                    : "×" + item_PRDGRID.instalments + "期"
                }}</span>
              </p>
              <p class="article_price" v-if="item_PRDGRID.desc">
                {{ item_PRDGRID.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import { Swipe, SwipeItem } from "vant";

export default {
  name: "PRDGRID",
  props: ["prdgridItem"],
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
    };
  },
  created() {
    console.log(this.$props.prdgridItem,'prdgridItem');
  },
  methods: {
    doDetail(_prdid, _linkPage) {
      this.$emit("doDetail", _prdid, _linkPage);
    },
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.PRDGRID {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/

.card_Box {
  background-color: white;
}

.article_price {
  margin-top: 6px;
  font-size: 28px;
  color: rgb(235, 101, 101);
  font-weight: bold;
}
.article_subtitle{
  font-size: 26px;
}
.article_title {
  margin-top: 10px;
  font-size: 26px;
  min-height: 36px;
  /* color: rgb(51, 51, 51); */
}

.article_title,.article_subtitle > span {
  display: inline-block;
  overflow: hidden;
  text-align: left;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break:break-all;
}
.article_subtitle > span {
  color: rgb(88, 88, 88);
  -webkit-line-clamp: 1;
}

.PRDGRID_imgBox {
  display: inline-block;
}

.PRDGRID {
  padding-top: 10px;
}

.box_Content1 {
  padding: 0 32px;
}

.sift_Article_Box {
  display: flex;
  /*padding-top: 32px;*/
}

.sift_Article_Boxs {
  width: 33%;
  margin-bottom: 10px;
}

img {
  height: 100%;
  width: 100%;
  border: 0;
}
</style>
