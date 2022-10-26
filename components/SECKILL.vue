<template>
  <div class="SECKILL">
    <!--
                    	作者：LXJN
                       	时间：2020-07-03
                       	描述：秒杀 (widgets='SECKILL')
        -->
    <div style="padding: 10px 0;">
      <div style="background: #fff;">
        <div class="seckill-bar">
          <div class="text-bar">
            <div style="float: left;">
              <div class="text">
                <span>{{ status == 0 ? nextTag : tag }}</span
                ><small>{{ status == 0 ? nextText : text }}</small>
              </div>
              <div class="djsq">
                <van-count-down :time="time" @finish="finish">
                  <template v-slot="timeData">
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                  </template>
                </van-count-down>
              </div>
            </div>
            <div style="float: right;">
              <a class="more" @click="clickRight">{{ rightText }}</a>
            </div>
          </div>
          <div style="clear:both;"></div>
        </div>

        <div style="width: 100%;min-height: 225px;overflow: auto;">
          <div>
            <div
              class="prod-item-K"
              v-bind:style="{ width: 33.33 * prdList.length + 'vw' }"
            >
              <ul>
                <li v-for="(prod, index) in prdList" :key="index">
                  <div class="prod-item">
                    <van-image
                      class="van-hairline--surround van-grid-item__icon image-k"
                      :src="imgServerAdd + prod.mainimage"
                      @click="listClick(index, prod)"
                    />
                    <div>
                      <span
                        class="van-multi-ellipsis--l2 van-grid-item__text goodsName"
                        @click="listClick(index, prod)"
                        >{{ prod.prdname }}</span
                      >
                    </div>
                    <div>
                      <span style="color: #f15353;"
                        ><small>￥</small>{{ prod.seckillprice }}</span
                      >
                      <small
                        style="color: rgba(153, 153, 153, 0.8);text-decoration: line-through;"
                        ><small>￥</small>{{ prod.saleprice }}</small
                      >
                    </div>
                    <div style="margin: 10px 0;width: 100%;">
                      <van-progress
                        color="#ee0a24"
                        :pivot-text="'仅剩' + prod.stock + '件'"
                        :percentage="(prod.stock / prod.quantity) * 100"
                        stroke-width="8"
                      />
                    </div>
                    <div>
                      <!-- <a>立即抢购</a> -->
                    </div>
                  </div>
                </li>

                <div style="clear:both;"></div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import { Grid, GridItem, Image, Progress, CountDown, Tag } from "vant";

export default {
  name: "SECKILL",
  props: {
    time: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },
    prdList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    tag: {
      type: String,
      default: "本场",
    },
    rightText: {
      type: String,
      default: "更多",
    },
    finish: {
      type: Function,
      default: function() {
        console.log(">>>>>> finish()方法 <<<<<<");
      },
    },
    clickRight: {
      type: Function,
      default: function() {
        console.log(">>>>>> clickRight()方法 <<<<<<");
      },
    },
    listClick: {
      type: Function,
      default: function() {
        console.log(">>>>>> listClick()方法 <<<<<<");
      },
    },
    text: {
      type: String,
      default: "距结束还剩",
    },
    nextTag: {
      type: String,
      default: "下一场",
    },
    nextText: {
      type: String,
      default: "距开始还剩",
    },
    href: {
      type: String,
      default: "本场",
    },
  },
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
    };
  },
  created() {
    //console.log(this.$props.swItem);
  },
  methods: {},
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Progress.name]: Progress,
    [CountDown.name]: CountDown,
    [Tag.name]: Tag,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-grid-item__text {
  text-align: left;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.djsq {
  margin-top: 7px;
}
.SECKILL {
  /* padding: 15px 0; */
  /* background: #ffffff; */
}
.seckill-bar .text-bar {
  float: right;
  min-width: 400px;
  padding: 27px 20px;
}
.SECKILL li {
  float: left;
  width: 33.33vw;
}
.prod-item-K {
  border-top: solid 5px #f2f2f2;
}
.seckill-bar {
  height: 150px;
  width: 100%;
  background: url("/static/img/seckill.png") center no-repeat;
  background-size: cover;
}

.text {
  /* border: 1px solid #000; */
  background: #fcfafb;
  line-height: 40px;
  border-radius: 20px;

  font-family: cursive;
  font-size: 30px;
}
.text span {
  background: #f15352;
  color: #fff;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: bold;
}
.text small {
  padding: 0 15px;
}
.prod-item {
  padding: 30px 15px;
  /* border: solid 2px #f2f2f2; */
}
.image-k {
  width: 180px;
  height: 180px;
  border: solid 1px #f2f2f2;
}
.colon,
.block {
  display: inline-block;
  font-size: 28px;
  line-height: 32px;
  min-height: 32px;
  text-align: center;
  font-weight: bold;
}
.colon {
  margin: 0 4px;
  color: #f15351;
}
.block {
  padding: 0 10px;
  color: #fff;
  border-radius: 8px;
  min-width: 20px;
  background-color: #f15351;
}
a.more {
  padding: 0px 12px;
  background: #7b7382;
  /* border: 1px solid #000; */
  margin: 30px auto;
  display: block;
  line-height: 38px;
  border-radius: 19px;
  color: #fff;
}
.goodsName {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
