<template>
  <div class="ICONS">
    <!--
                    	作者：offline
                       	时间：2019-08-22 
                       	描述：导航图标 (widgets='ICONS')
        -->
    <div class="card_Box">
      <div class="box_Content">
        <div class="title_Box">
          <div
            class="title_Content"
            :style="'width: calc(100% / ' + iconItem.countPerRow + ');'"
            v-for="(item_ICONS, index_ICONS) in iconItem.items"
            :key="index_ICONS"
            @click="doLink(item_ICONS)"
          >
            <div
              class="img_Box1"
              :style="
                'width: ' +
                  iconItem.iconWidth +
                  '; height: ' +
                  iconItem.iconHeight +
                  ';'
              "
            >
              <img
                :src="imgServerAdd + item_ICONS.imageUrl"
                onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=function(){}"
              />
            </div>
            <p class="titleText">{{ item_ICONS.text }}</p>
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
  name: "ICONS",
  props: ["iconItem"],
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
    };
  },
  created() {
    //console.log(this.$props.iconItem);
  },
  methods: {
    doLink(item_ICONS) {
      this.$emit("doLink", item_ICONS);
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
/*.SWIPE {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/
.ICONS {
  background-color: #f2f2f2;
  /* padding: 20px; */
}
.img_Box1 {
  margin: 0 auto;
  padding-top: 16px;
}

.card_Box {
  background-color: white;
  border-radius: 15px;
}

.box_Content {
  padding: 0 16px;
}

.titleText {
  color: rgb(51, 51, 51);
  font-size: 26px;
  padding-bottom: 16px;
}

.title_Box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.swipe_Box {
  position: relative;
}

img {
  height: 100%;
  width: 100%;
  border: 0;
}
</style>
