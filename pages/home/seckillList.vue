<template>
  <div id="#seckillList">
    <header>
      <van-sticky>
        <van-nav-bar title="秒杀专场" left-arrow @click-left="back">
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </van-sticky>
    </header>
    <div class="van_home">
      <div class="bg"></div>
      <van-sticky :offset-top="46">
        <div class="bg-2">
          <div class="tiltle-text-bar-L">
            <div class="tiltle-text-bar">{{ title }}：</div>
            <div class="tiltle-text-bar">
              <van-count-down :time="remaintime" @finish="finish">
                <template v-slot="timeData">
                  <span class="block">{{ timeData.days * 24 + timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
          </div>

          <div class="ms2-bar">
            <div class="list-tab">
              <ul>
                <li v-for="(item, index) in seckills" :key="index">
                  <div
                    :class="{
                      over: item.status == 2,
                      active: active == item.id,
                    }"
                    @click="clickTab(item.id, item.status)"
                  >
                    <div class="tab-ltem">
                      <div class="day">
                        {{ getTimeforTimestamp(item.begintime, "MM/dd") }}
                      </div>
                      <div class="time">
                        {{ getTimeforTimestamp(item.begintime, "hh:mm") }}
                      </div>
                      <div class="start">
                        <span class="statusText">{{
                          getStatusText(item.status)
                        }}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-if="seckills.length < 5">
                  <div class="gd" @click="hint('更多活动，敬请期待！')">
                    <van-icon name="ellipsis" />
                  </div>
                </li>
                <div style="clear:both;"></div>
              </ul>
            </div>
          </div>
        </div>
      </van-sticky>
      <div>
        <div class="prod-card" v-for="(prod, index) in prods" :key="index">
          <van-card
            tag="秒杀"
            :price="prod.seckillprice.toFixed(2)"
            :origin-price="prod.saleprice.toFixed(2)"
            :title="prod.prdname"
            @click="
              $router.push(
                '/seckillDetail?id=' + prod.id + '&prdid=' + prod.pid 
              )
            "
          >
            <template #thumb>
              <van-image :src="imgServerAdd + prod.mainimage"></van-image>
            </template>

            <template #title>
              <div class="titleDiv">
                <a
                  :href="
                    '/#/seckillDetail?id=' + prod.id + '&prdid=' + prod.pid 
                  "
                  class="van-card__thumb"
                >
                  {{ prod.prdname }}
                </a>
              </div>
            </template>

            <template #tags>
              <van-progress
                v-if="status == 2"
                inactive
                pivot-text="已售罄"
                color="#ff2b37"
                :percentage="100"
                stroke-width="20"
                style="border-radius:10px; width:80%; text-align: center;"
              />
              <van-progress
                v-else
                :pivot-text="'库存' + prod.stock + '件'"
                color="#ff2b37"
                :percentage="prod.quantity.toFixed(2)"
                stroke-width="20"
                style="border-radius:10px;width:80%;text-align: right;"
              />
            </template>

            <template #footer>
              <van-button
                v-if="status == 0"
                round
                size="small"
                color="#ff2b37"
                :url="
                  '/#/seckillDetail?id=' + prod.id + '&prdid=' + prod.pid + ''
                "
                >敬请期待</van-button
              >
              <van-button
                v-else-if="status == 1 && prod.stock > 0"
                round
                size="small"
                color="#ff2b37"
                :url="
                  '/#/seckillDetail?id=' + prod.id + '&prdid=' + prod.pid + ''
                "
                >立即抢购</van-button
              >
              <van-button
                v-else-if="status == 1 && prod.stock == 0"
                disabled
                round
                size="small"
                color="#ff2b37"
                :url="
                  '/#/seckillDetail?id=' + prod.id + '&prdid=' + prod.pid + ''
                "
                >已售罄</van-button
              >
              <van-button
                v-else-if="status == 2"
                disabled
                round
                size="small"
                color="#ff2b37"
                >已结束</van-button
              >
            </template>
          </van-card>
        </div>
        <div class="list-finished">没有更多了</div>
      </div>
    </div>

    <footer></footer>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
import uitl from "@/assets/js/fun";

import {
  NavBar,
  Icon,
  AddressList,
  Uploader,
  Toast,
  CouponCell,
  CouponList,
  Popup,
  Cell,
  CellGroup,
  CountDown,
  Tab,
  Tabs,
  Card,
  PullRefresh,
  List,
  Tag,
  Button,
  Sticky,
  Progress,
  Image,
} from "vant";

export default {
  name: "seckillList",
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      seckilling: [], // 正在秒杀的
      seckills: [], // 秒杀信息
      prodsData: {},
      prods: [], //商品信息
      newProds: [], //新商品信息
      active: -1, //当前tab页id
      status: -1, //当前tab页的状态
      title: "",
      remaintime: 0, //倒计时
    };
  },
  created() {
    let _this = this;
    _this.getSeckill();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 格式化日期
    getTimeforTimestamp(date, fmt) {
      // debugger;
      // var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");
      return uitl.getTimeforTimestamp(date, fmt);
    },
    // 状态转文字
    getStatusText(s) {
      let text;
      if (s == 0) {
        text = "即将开抢";
      } else if (s == 1) {
        text = "抢购中";
      } else if (s == 2) {
        text = "已结束";
      }
      return text;
    },
    // 切换tab页
    clickTab(id, status) {
      let _this = this;
      _this.active = id;
      _this.status = status;
      _this.prods = _this.prodsData[id];

    },

    

    // 获得秒杀信息
    getSeckill() {
      // debugger;
      let _this = this;
      _this.$http
        .get("/m/seckill/api/common/getList", {
          params: {},
        })
        .then(function(e) {
          if (e.result == 0) {
            //按开始时间升序
            let data = e.data.sort((a, b) => a.begintime - b.begintime);
            let seckillData = e.data.filter(item=>item.status == 1) // 获取正在秒杀的商品
            let seckills = [];
            let prodsData = {};
            data.forEach((item, index) => {
              let seckill = {
                index: index,
                begintime: item.begintime,
                createtime: item.createtime,
                creator: item.creator,
                endtime: item.endtime,
                eventname: item.eventname,
                id: item.id,
                isdelete: item.isdelete,
                limitbuy: item.limitbuy,
                outtime: item.outtime,
                status: item.status,
                remaintime: item.remaintime,
              };
              seckills[index] = seckill;
              // 去除prdList中重复的商品信息
              const res = new Map()
              let prdList =  item.prdList.filter(item => !res.has(item.pid) && res.set(item.pid, 1))

              prodsData[item.id] = prdList

            });
            _this.seckills = seckills;
            _this.prodsData = prodsData;
            // _this.prods = prdList;
            let status = _this.getActiveSeckill(seckills);
            _this.clickTab(_this.active, status);
          } else {
            Toast(e.msg);
          }
        });
    },
    // 判断哪一个tab页是激活的,返回状态
    getActiveSeckill(seckills) {
      let _this = this;
      let is = false;
      let active = -1;
      let remaintime = 0;

      let active2 = -1;
      let remaintime2 = 0;
      for (let i = 0; i < seckills.length; i++) {
        let item = seckills[i];
        if (item.status == 1) {
          // 获得第一个进行中的秒杀
          active = item.id;
          remaintime = item.remaintime;

          _this.active = active;
          _this.remaintime = remaintime;
          _this.title = "距本场结束还有";
          return 1;
        } else if (item.status == 0 && !is) {
          // 获得第一个待开始的秒杀
          active2 = item.id;
          remaintime2 = item.remaintime;
          is = true;
        }
      }

      // 判断有没有待进行的秒杀
      if (is) {
        _this.active = active2;
        _this.remaintime = remaintime2;
        _this.title = "距本场开始还有";
        return 0;
      } else {
        // 没有就取最后一个
        let length = seckills.length - 1;
        if (length > 0) {
          _this.active = seckills[length].id;
          _this.remaintime = seckills[length].remaintime;
          _this.title = "距本场开始还有";
        }
        return 2;
      }
    },
    // 倒计时结束,从新获取数据
    finish() {
      // let _this = this;
      // _this.getSeckill();
    },
    // 提示
    hint(msg) {
      Toast(msg);
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [AddressList.name]: AddressList,
    [Uploader.name]: Uploader,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [CountDown.name]: CountDown,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Sticky.name]: Sticky,
    [Progress.name]: Progress,
    [Image.name]: Image,
  },
};
</script>
<style>
/* @import url("../../static/navbar.css"); */
</style>

<style>
#seckillList .van-progress__pivot {
  position: initial;
}
.van-progress > span {
  width:229px
}
.van_home {
  height: calc(100vh - 50px);

  margin-bottom: 50px;
  width: 100%;
  background-color: #f9f9f9;
  z-index: -1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.bg {
  background: url("/static/img/bg-0.jpg") center center / cover
    no-repeat;
  height: 353px;
  margin-bottom: 5px;
}
.bg-2 {
  background: url("/static/img/seckill-bg-1.jpg") center center / cover
    no-repeat;
  /* height: 177px; */
}
.tiltle-text-bar-L {
  padding: 11px;
}
.tiltle-text-bar {
  display: inline-block;
  color: #fff;
  font-size: 28px;
}

.block,
.colon {
  display: inline-block;
  font-size: 28px;
  line-height: 32px;
  min-height: 32px;
  text-align: center;
  font-weight: bold;
}
.colon {
  margin: 0 4px;
  color: #fff;
}
.block {
  padding: 0 10px;
  color: #ff2b37;
  border-radius: 8px;
  min-width: 20px;
  background: #fff;
}

.ms2-bar {
  padding: 4.25px 0;
}
.list-tab li {
  float: left;
  width: 20%;
}
.active {
  background: rgba(255, 255, 255, 0.2);
}
.over {
  /* background: #fff; */
  opacity: 0.7;
}
.prod-card {
  margin-bottom: 10px;
  text-align: left;
}
.prod-card .titleDiv {
  margin-bottom: 18px;
}
.prod-card .titleDiv a {
  color: #323233;
  font-size: 28px;
}
.van-card {
  background: #fff;
}
/* Source Han Sans CN */
.list-tab .day,
.list-tab .time,
.list-tab .start {
  /* font-family: Source Han Sans CN; */
  color: #fff;
}
.list-tab .day,
.list-tab .start {
  font-size: 22px;
}
.list-tab .day {
  /* line-height: 22px; */
}
.list-tab .time {
  font-weight: bold;
  font-size: 24px;
}
.list-tab .start {
  /* line-height: 28px; */
}
.active .statusText {
  background: #fff;
  color: #fe4263;
  font-weight: bolder;
  padding: 0px 14px;
  border-radius: 14px;
}
.gd {
  height: 91.5px;
  line-height: 91.5px;
  color: #fff;
  font-size: 40px;
}
.tab-ltem {
  padding-top: 3px;
  padding-bottom: 7px;
}
.list-finished {
  color: #969799;
  font-size: 28px;
  line-height: 100px;
  text-align: center;
}
.van-card__price {
  color: #ff2b37;
}
</style>
