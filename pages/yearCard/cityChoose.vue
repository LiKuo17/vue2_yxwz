<template>
  <div>
    <div class="searchBar">
      <div class="searchDate" @click="chooseCalendar">
        <div class="searchDate_top">
          <span style="color: #fff; opacity: 0.5">住</span>
          <div style="color: white; font-size: 11px">{{ this.dateStart }}</div>
        </div>
        <div class="searchDate_bottom">
          <span style="color: #fff; opacity: 0.5">离</span>
          <div style="color: white">{{ dateEnd }}</div>
        </div>
      </div>
      <van-search
        v-model="value"
        label="全国"
        left-icon="arrow-down"
        right-icon="search"
        placeholder="请输入酒店名、地址"
        @search="onSearch"
      >
        <slot slot="left">
          <!-- <div class="chacao">
                    <div>全国</div>
                    <van-icon name="arrow-down" />
                </div> -->
        </slot>
      </van-search>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" @click="gotoDetail" :key="item.id">
        <div>
          <div class="pic">
            <img class="img1" :src="item.src" />
            <img class="img2" :src="item.src" />
          </div>
          <div class="messageBox">
            <div class="messageBox_top">
              <h2 class="title">{{ item.name }}</h2>
              <div class="price">
                ￥<span>{{ item.price }}</span
                >起
              </div>
            </div>
            <div class="type">
              <div class="typeTab">{{ item.type }}</div>
            </div>
            <div class="area">{{ item.area }}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
    <van-calendar
      v-model="showCalendar"
      color="#c3a769"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>
<script>
export default {
  name: "hotelBooking",
  data() {
    return {
      list: [
        {
          src: "https://img01.yzcdn.cn/upload_files/2022/03/17/FrsCu6QONSF3QwxtrPwyeVHsnhiY.jpg!large.webp",
          name: "三亚金凤凰海景酒店",
          type: "休闲度假",
          area: "海南省三亚市天涯区金凤凰海景酒店",
          price: "1280",
        },
        {
          src: "https://img01.yzcdn.cn/upload_files/2021/02/19/FrFhHgEGYUpanyZL1GwtbeX0JfHd.jpg!large.webp",
          name: "杭州逸澍酒店",
          type: "商务出行",
          area: "浙江省杭州市拱墅区逸澍酒店(杭州武林店)",
          price: "288",
        },
      ],
      loading: false,
      finished: false,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      dateStart:
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()),
      dateEnd:
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()),
      value: "",
      showCalendar: false,
      queryList: [
        {
          prdid: 1,
          mainimage: require("@/assets/img/酒店筛选1.jpg"),
          price: 360,
          hotelName: "资阳鼎晟泓府豪生大酒店",
          address: "四川省资阳市雁江区资阳鼎晟泓府豪生大酒店",
        },
        {
          prdid: 2,
          mainimage: require("@/assets/img/酒店筛选2.jpg"),
          price: 480,
          hotelName: "丽江金林豪生大酒店",
          address: "云南省丽江市古城区丽江金林豪生大酒店",
        },
        {
          prdid: 3,
          mainimage: require("@/assets/img/酒店筛选3.jpg"),
          price: 505,
          hotelName: "惠州中海汤泉酒店",
          address: "广东省惠州市惠城区中海惠州汤泉酒店(原中信汤泉酒店)",
        },
        {
          prdid: 4,
          mainimage: require("@/assets/img/酒店筛选4.jpg"),
          price: 784,
          hotelName: "舟山三盛铂尔曼大酒店",
          address: "浙江省舟山市普陀区舟山三盛铂尔曼大酒店",
        },
      ],
    };
  },
  methods: {
    gotoDetail() {
      this.$router.push("/hotelDetail");
    },
    chooseCalendar() {
      this.showCalendar = true;
    },
    onSearch() {},
    // onConfirm(){},
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      console.log(start, end);
      this.showCalendar = false;
      this.dateStart = `${this.formatDate(start)}`;
      this.dateEnd = `${this.formatDate(end)}`;
      let dateStartOne = this.dateStart.split("-")[0];
      let dateStartTwo = this.dateStart.split("-")[1];
      let dateEndOne = this.dateEnd.split("-")[0];
      let dateEndTwo = this.dateEnd.split("-")[1];
      dateStartOne = dateStartOne < 10 ? "0" + dateStartOne : dateStartOne;
      dateStartTwo = dateStartTwo < 10 ? "0" + dateStartTwo : dateStartTwo;
      dateEndOne = dateEndOne < 10 ? "0" + dateEndOne : dateEndOne;
      dateEndTwo = dateEndTwo < 10 ? "0" + dateEndTwo : dateEndTwo;
      this.dateStart = dateStartOne + "-" + dateStartTwo;
      this.dateEnd = dateEndOne + "-" + dateEndTwo;
      console.log(3333333333, this.dateStart, this.dateEnd);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }

      //     // 加载状态结束
      this.loading = false;

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    },
  },
};
</script>
<style scoped>
.van-cell {
  background-color: #f7f8fa;
}
.van-cell__value {
  background-color: white;
}
.searchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px 0 10px 16px; */
  background-color: white;
}
.searchDate {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 128px;
  height: 72px;
  background: #c3a769;
  font-size: 12px;
  margin-left: 32px;
}
.searchDate_top,
.searchDate_bottom {
  display: flex;
  justify-content: space-around;
}
.van-search {
  width: 295px;
}
.chacao {
  display: flex;
  background-color: #f6f6f6;
}
.pic {
  width: 100%;
  height: 384px;
  overflow: hidden;
  position: relative;
  /* filter: blur(13px); */
}

.pic > .img1 {
  position: absolute;
  filter: blur(26px);
  left: -15%;
  top: -7%;
  width: 117%;
  height: 114%;
}
.pic > .img2 {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.messageBox {
  height: 214px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 16px;
  box-sizing: border-box;
  padding: 26px;
}
.messageBox_top {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 36px;
  font-weight: 700;
}

.typeTab {
  font-size: 24px;
  padding: 3px;
  width: 100px;
  color: #c3a769;
  height: 20px;
  line-height: 20px;
  background-color: #f9f6f0;
}
.area {
  color: #969799;
  font-size: 26px;
}

.price {
  font-size: 12px;
}
.price > span {
  font-size: 40px;
  font-weight: 500;
}
</style>