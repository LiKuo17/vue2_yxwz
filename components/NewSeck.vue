<template>
  <div class="newSeck">
    <div class="tag1">{{ status != 0 ? "本场" : "下一场" }}</div>
    <div class="tag2">
      {{ status != 0 ? "距离结束还剩" : "距离开始还剩" }}
    </div>
    <div class="coutDownBlocks">
      <van-count-down :time="time" @finish="finish">
        <template v-slot="timeData">
          <span class="timeBlock">{{ timeData.hours | padStart_first }}</span>
          <span class="timeBlock">{{ timeData.hours | padStart_second }}</span>
          <span class="timeInterval">:</span>
          <span class="timeBlock">{{ timeData.minutes | padStart_first }}</span>
          <span class="timeBlock">{{
            timeData.minutes | padStart_second
          }}</span>
          <span class="timeInterval">:</span>
          <span class="timeBlock">{{ timeData.seconds | padStart_first }}</span>
          <span class="timeBlock">{{
            timeData.seconds | padStart_second
          }}</span>
        </template>
      </van-count-down>
    </div>
    <div class="moreSeck" @click="clickRight">更多</div>
    <div class="goodsArea">
      <div>
        <div
          @click="listClick(index, prod)"
          class="goodsItem"
          v-for="(prod, index) in prdList"
          :key="index"
        >
          <div
            :style="{
              backgroundImage: 'url(' + imgServerAdd + prod.mainimage + ')',
            }"
          ></div>
          <div>
            <span>￥{{ prod.seckillprice }}</span
            ><span>￥{{ prod.saleprice }}</span>
          </div>
          <div>仅剩{{ prod.stock }}件</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CountDown } from "vant";
import _config from "../assets/js/config";
export default {
  data() {
    return {
      imgServerAdd: _config.fileServerAddress,
    };
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
    finish: {
      type: Function,
      default: () => () => {},
    },
    prdList: {
      type: Array,
      default: function() {
        return [];
      },
    },
    clickRight: {
      type: Function,
      default: () => () => {},
    },
    listClick: {
      type: Function,
      default: () => () => {},
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    padStart_first(val) {
      return `${String(val)
        .padStart(2, `0`)
        .substr(0, 1)}`;
    },
    padStart_second(val) {
      return `${String(val)
        .padStart(2, `0`)
        .substr(1)}`;
    },
  },
  components: {
    [CountDown.name]: CountDown,
  },
};
</script>

<style scoped>
.newSeck {
  height: 64vw;
  width: 100vw;
  background-color: #e9e9e9;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("/static/img/seckBg.png");
  position: relative;
}
.tag1,
.tag2 {
  color: #fff;
  font-size: 24px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
.tag1 {
  top: 5vw;
  right: 44vw;
  padding: 0.4vw 3vw 0.7vw 3vw;
  background-color: #ff2b37;
  border-radius: 3vw;
  z-index: 2;
}
.tag2 {
  right: 15.5vw;
  top: 5vw;
  padding: 0.4vw 3vw 0.7vw 8vw;
  background-color: #fff;
  border-radius: 3vw;
  color: #000;
  transform: translateX(-5.2vw);
}

.coutDownBlocks {
  position: absolute;
  transform: translateX(50%);
  right: 37vw;
  top: 12vw;
}
.timeBlock {
  padding: 0.2vw 1vw;
  padding-top: 0.6vw;
  background-color: #fff;
  border-radius: 1vw;
  font-size: 24px;
  color: #fe3037;
}
.timeInterval {
  color: #fff;
  font-size: 24px;
}
.moreSeck {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: absolute;
  padding: 0.6vw 3vw;
  border-radius: 14vw;
  border: 1px solid #fff;
  font-size: 24px;
  right: 3vw;
  top: 8vw;
  color: #fff;
}
.goodsArea {
  position: absolute;
  bottom: -2vw;
  left: 0;
  right: 0;
  min-height: calc(64vw * 0.65);
  overflow-y: scroll;
}
.goodsArea > div {
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: 2.3vw;
  top: 0;
}
.goodsItem {
  background-color: rgba(255, 255, 255);
  border-radius: 2vw;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2vw;
  padding-bottom: 3vw;
  align-items: center;
  flex-shrink: 0;
  margin-right: 2.3vw;
}
.goodsItem > div:first-child {
  border-radius: 1.4vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("http://rcb.iliving.cn:9080/uploads/bank/typ0/3143036/3d650e92ea8047fc861d3e8f0446c71a-s.jpg");
  width: 21vw;
  height: 21vw;
}
.goodsItem > div:nth-child(2) {
  font-size: 36px;
  font-weight: bold;
  margin-top: 0.6vw;
  transform: scale(0.86);
}
.goodsItem > div:nth-child(2) > span:last-child {
  font-size: 24px;
  color: rgb(134, 134, 134);
  margin-left: 1vw;
}
.goodsItem > div:last-child {
  font-size: 24px;
  color: #d22443;
  transform: scale(0.86);
}
</style>
