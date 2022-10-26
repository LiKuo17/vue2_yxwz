<template>
  <div class="parents_box" ref="tabs">
    <!-- <van-sticky> -->
    <van-tabs
      v-model="active"
      sticky
      @click="gotoView"
      color="#c3a769"
      v-if="isShowTabs"
      id="tabs"
    >
      <van-tab title="概况"></van-tab>
      <van-tab title="房型"></van-tab>
    </van-tabs>
    <!-- </van-sticky> -->
    <div class="van_detail" @scroll.passive="getScroll($event)">
      <!-- 轮播图区域 start -->
      <header id="product">
        <div class="header_Content">
          <van-swipe indicator-color="white" @change="onChangeSwipeOne">
            <van-swipe-item v-for="item in heightHotel" :key="item.id">
              <div class="img_Box">
                <img
                  :src="serveAddress + message.mainImage"
                  onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                />
              </div>
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">
                {{ firstCurrentSw + 1 }}/{{ heightHotel.length }}
              </div>
            </template>
          </van-swipe>
        </div>
      </header>
      <div class="messageBox">
        <div class="message_share">
          <h2>{{ this.message.name }}</h2>
          <div class="share">
            <van-icon class="icon" name="share" />
            <span>分享</span>
          </div>
        </div>
        <div class="message_time">
          <span>{{ this.message.furnishDate }}</span>
          <span>{{ this.message.openDate }}</span>
          <span style="color: #c3a769; background: #c3a7691a">{{
            this.message.lable
          }}</span>
        </div>
      </div>
      <!-- 地图电话 -->
      <div class="map">
        <div class="map-box">
          <van-icon style="opacity: 0.2; font-size: 15px" name="map-marked" />
          <div class="map_address">{{ this.message.addr }}</div>
          <div class="map_map">地图</div>
          <div class="map_phone">电话</div>
        </div>
      </div>
      <!-- 成为会员 -->
      <div class="beVip">
        <div class="beVip_box">
          <img
            src="https://img01.yzcdn.cn/public_files/dbee5fc66dbed41d2221c384946c6738.png"
            alt=""
          />
          <div class="says">开通黑金全年卡尊享5大权益</div>
          <div class="openVip" @click="gotoYearCard">
            <div>成为会员</div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!-- 概况房情 -->
      <van-tabs v-model="activeName" color="#c3a769">
        <van-tab title="概况" name="a">
          <div class="surveyBox">
            <div>
              <div style="padding-top: 24px">
                <h2>酒店设备</h2>
              </div>
              <p>{{ this.message.facility }}</p>
            </div>
            <div>
              <div style="padding-top: 24px">
                <h2>酒店服务</h2>
              </div>
              <p>{{ this.message.serve }}</p>
            </div>
            <div>
              <div style="padding-top: 24px">
                <h2>酒店须知</h2>
              </div>
              <p>{{ this.message.notice }}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="房型" name="b">
          <div class="apartment">
            <!-- 时间筛选，暂时隐藏 -->
            <!-- <div class="apartment_box">
              <div class="apartment_box-time" @click="showTime">
                <div class="apartment_box-time_go">
                  <span>入住</span>
                  <div>{{ dateStart }}</div>
                </div>
                <div>
                  <span class="howNight">{{ this.interpolation }}晚</span>
                </div>
                <div class="apartment_box-time-leave">
                  <span>离店</span>
                  <div>{{ dateEnd }}</div>
                </div>
              </div>
              <div class="choose" @click="screen">
                <div class="chooseBox">
                  <div>筛选</div>
                  <van-icon name="arrow-down" />
                </div>
              </div>
            </div> -->
            <div>
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <van-cell v-for="(item, index) in list" :key="index">
                  <div class="item_box" @click="houseDetail(index)">
                    <div class="item_box-img">
                      <img class="img1" :src="serveAddress + item.mainImage" />
                      <img class="img2" :src="serveAddress + item.mainImage" />
                    </div>
                    <div class="description">
                      <div class="description_left">
                        <div class="description_left-detail">
                          <h4>{{ message.name }}</h4>
                          <van-icon color="#c8c9cc" name="arrow" />
                        </div>
                        <div class="description_left-power">
                          <div>不含早餐</div>
                        </div>
                      </div>
                      <div class="price">
                        <div style="margin-right: 10px">
                          <span
                            style="
                              color: #323233;
                              font-weight: bolder;
                              font-size: 12px;
                            "
                          >
                            ￥
                          </span>
                          <span
                            style="
                              color: #323233;
                              font-weight: bolder;
                              font-size: 18px;
                            "
                          >
                            {{ item.price }}
                          </span>
                        </div>
                        <button>预定</button>
                      </div>
                    </div>
                    <div class="bedBox">
                      <div class="bedBox_name">{{ item.name }}</div>
                      <div class="box_mes">
                        <div>{{ item.area }}</div>
                        <div>{{ item.bed }}</div>
                        <div>{{ item.windows }}</div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 日期选择组件 -->
      <van-calendar
        v-model="showCalendar"
        color="#c3a769"
        type="range"
        @confirm="onConfirm"
      />

      <!-- 自定义面板 -->
      <van-action-sheet v-model="showHouse" title="房型详情">
        <div class="content">
          <div>
            <van-swipe indicator-color="white" @change="onChangeSwipe">
              <van-swipe-item v-for="item in imagesList" :key="item.id">
                <div class="imgBox">
                  <img class="detailImg1" :src="serveAddress + item" />
                  <img class="detailImg2" :src="serveAddress + item" />
                </div>
              </van-swipe-item>
              <template #indicator>
                <div class="custom-indicator2">
                  {{ SecondCurrentSw + 1 }}/{{ imagesList.length }}
                </div>
              </template>
            </van-swipe>
            <h2 class="doubleBed">{{ this.hotelDeList.name }}</h2>
            <van-divider />
          </div>
          <div>
            <h2 class="doubleBed">房型概况</h2>
            <div>
              <van-grid direction="horizontal" :column-num="3" :border="false">
                <van-grid-item
                  icon="https://img01.yzcdn.cn/upload_files/2021/08/30/FiJjyrSqKlZMMMiJeG74M005uwJW.png"
                  :text="this.hotelDeList.floor"
                />
                <van-grid-item
                  icon="https://img01.yzcdn.cn/upload_files/2021/08/30/FoHWiuWhBvXTD4y_q343PdXeQFgl.png"
                  :text="this.hotelDeList.area"
                />
                <van-grid-item
                  icon="https://img01.yzcdn.cn/upload_files/2021/08/30/Fr1GZjGHisb-iz7SCp_FFlmaWQW-.png"
                  :text="this.hotelDeList.windows"
                />
                <van-grid-item
                  icon="//b.yzcdn.cn/hotel/detail/icon/bed.png"
                  :text="this.hotelDeList.bed"
                />
              </van-grid>
            </div>
          </div>
          <van-divider />
          <div>
            <h2 class="doubleBed">房型设备</h2>
            <div>
              <van-grid
                direction="horizontal"
                :border="false"
                :icon-size="18"
                :column-num="3"
              >
                <van-grid-item
                  icon="success"
                  v-for="(item1, index1) in equipmentList"
                  :key="index1"
                  :text="item1"
                />
              </van-grid>
            </div>
          </div>
          <van-divider />
          <div>
            <h2 class="doubleBed">预定须知</h2>
            <div class="mustKnow">
              <p>{{ this.message.notice }}</p>
              <!-- <p>2.在线支付完成后，不支持取消，我们将为您整晚保留房间；</p> -->
              <!-- <p> -->
              <!-- 3.预订时需填写各房间填写一名入住人姓名，需和实际入住人一致。 -->
              <!-- </p> -->
            </div>
          </div>
          <div style="margin-top: 50px"></div>
        </div>
        <div class="btn_all">
          <div class="btn_box">
            <van-button
              type="primary"
              @click="Book"
              color="#c3a769"
              size="small"
              block
            >
              立即预定
            </van-button>
          </div>
        </div>
      </van-action-sheet>

      <van-action-sheet v-model="showBook" title="预定详情">
        <div class="content">
          <div>
            <van-swipe indicator-color="white" @change="onChangeSwipeLast">
              <van-swipe-item v-for="item in imagesList" :key="item.id">
                <div class="imgBox">
                  <img class="detailImg1" :src="serveAddress + item" />
                  <img class="detailImg2" :src="serveAddress + item" />
                </div>
              </van-swipe-item>
              <template #indicator>
                <div class="custom-indicator2">
                  {{ currentSw + 1 }}/{{ imagesList.length }}
                </div>
              </template>
            </van-swipe>
            <van-divider />
            <van-cell-group>
              <van-field
                class="birthday"
                v-model="bookValue"
                label="预定时段"
                @click="bookDate"
                placeholder="请选择时间"
                right-icon="arrow"
                readonly
              ></van-field>
            </van-cell-group>
            <van-action-sheet v-model="showDate">
              <van-datetime-picker
                @confirm="confirm()"
                @cancel="cancel"
                @change="change"
                v-model="currentDate"
                type="datetime"
                title="选择完整时间"
                :min-date="minDate"
                :max-date="maxDate"
              />
            </van-action-sheet>
          </div>
          <div style="margin-top: 50px"></div>
        </div>
        <div class="btn_all">
          <div class="btn_box">
            <van-button
              type="primary"
              @click="Next"
              color="#c3a769"
              size="small"
              block
            >
              下一步
            </van-button>
          </div>
        </div>
      </van-action-sheet>

      <van-action-sheet v-model="showScreen" title="筛选">
        <div class="content">
          <div class="screen">
            <div class="screen_box">
              <div class="screen_type">{{ screenList.type }}</div>
              <div class="screen_typeChildren">
                <div
                  :class="{ checkActive: index1 == dynamic }"
                  @click="checkTo(index1)"
                  v-for="(item1, index1) in screenList.children"
                  :key="index1"
                >
                  {{ item1 }}
                </div>
              </div>
            </div>
            <div class="screen_box">
              <div class="screen_type">{{ screenList2.type }}</div>
              <div class="screen_typeChildren">
                <div
                  :class="{ checkActive: index3 == dynamic2 }"
                  @click="checkTo2(index3)"
                  v-for="(item3, index3) in screenList2.children"
                  :key="index3"
                >
                  {{ item3 }}
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 50px"></div>
        </div>
        <div class="btn_all">
          <div class="btn_box">
            <div class="lookDetail" @click="reset">重置</div>
            <div class="lookPrice" @click="finish">完成</div>
          </div>
        </div>
      </van-action-sheet>

      <footer></footer>
    </div>
    <div></div>
  </div>
</template>

<script>
import fileServerAddress from "@/assets/js/config";
import { $getOnlyData } from "@/api/index";
import allComment from "../../components/ALLCOMMENT";
import { Swipe, SwipeItem } from "vant";
import { Toast } from "vant";
export default {
  name: "detail",
  data() {
    return {
      serveAddress: fileServerAddress.fileServerAddress,
      detailId: "",
      bookValue: "",
      showDate: false,
      showBook: false,
      dynamic: 9999,
      dynamic2: 9999,
      screenList: {
        type: "床型",
        children: ["大床", "单人床", "双床", "多张床"],
      },
      screenList2: {
        type: "窗户",
        children: ["有窗", "无窗", "部分有窗"],
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

      changeDate: new Date(),
      showScreen: false,
      showHouse: false,
      interpolation: "",
      showCalendar: false,
      isShowTabs: false,
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      dateStart:
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "月" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()) +
        "日",
      dateEnd:
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "月" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()) +
        "日",
      hotelDeList: [],
      list: [],
      imagesList: "",
      loading: false,
      finished: true,
      surveyList: [],
      activeName: "b",
      message: {},
      active: 0,
      heightHotel: [],
      houseDetailList: [],
      equipmentList: [
        "空调",
        "热水",
        "独立卫浴",
        "瓶装水",
        "书桌",
        "拖鞋",
        "吹风机",
        "衣架",
        "电热水壶",
        "沙发",
        "电视",
        "电话",
        "洗漱用品",
        "衣柜",
        "WIFI",
      ],
      firstCurrentSw: 0, // 顶部轮播图数字
      SecondCurrentSw: 0,
      currentSw: 0,
      options: [
        { name: "发送给好友", icon: "wechat" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
      ],
    };
  },
  created() {
    this.detailId = this.$router.history.current.query.id;
    this.getDetail();
    console.log(
      "fileServerAddress.fileServerAddress",
      fileServerAddress.fileServerAddress
    );
    this.serveAddress = fileServerAddress.fileServerAddress;
    console.log(this.serveAddress);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollx, true);
  },
  // 页面销毁删除滚动事件
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollx);
  },
  methods: {
    async getDetail() {
      let res = await $getOnlyData("getHotelDetail", this.detailId);
      this.message = res.data;
      this.heightHotel = res.data.list;
      console.log(res.data);

      this.list = res.data.list;
    },
    confirm() {
      this.showDate = false;
      this.bookValue = this.timeFormat(this.currentDate);
      console.log("this.bookValue", this.bookValue);
    },
    change() {
      this.changeDate = this.currentDate;
    },
    cancel() {
      this.showDate = false;
    },
    bookDate() {
      this.showDate = true;
    },
    timeFormat(time) {
      // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let day =
        time.getDate() + 1 < 10
          ? "0" + (time.getDate() + 1)
          : time.getDate() + 1;
      let hours =
        time.getHours() + 1 < 10
          ? "0" + (time.getHours() + 1)
          : time.getHours() + 1;
      let minutes =
        time.getMinutes() + 1 < 10
          ? "0" + (time.getMinutes() + 1)
          : time.getMinutes() + 1;
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    },
    Next() {
      if (!this.bookValue) {
        Toast.fail("请先选择预定时段");
        return;
      }

      // this.hotelDeList = {...this.bookValue}
      console.log("------------", this.hotelDeList);
      localStorage.setItem("reverseTime", this.bookValue);
      localStorage.setItem("hotelName", this.message.name);
      localStorage.setItem("roomDetail", JSON.stringify(this.hotelDeList));
      this.$router.push({ path: "/comfirmOrderr", query: { prodType: 3 } });
    },

    Book() {
      this.showHouse = false;
      this.showBook = true;
    },
    checkTo(index1) {
      console.log(index1);
      this.dynamic = index1;
    },
    checkTo2(index3) {
      console.log(index3);
      this.dynamic2 = index3;
    },
    screen() {
      this.showScreen = true;
    },
    finish() {},
    reset() {
      this.dynamic = 9991;
      this.dynamic2 = 9991;
    },
    houseDetail(index) {
      console.log(index);
      this.showHouse = true;
      this.hotelDeList = this.list[index];
      console.log("this.hotelDeList", this.hotelDeList);
      this.imagesList = this.heightHotel[index].images.split(",");
      // this.SecondCurrentSw = 0
      console.log(this.imagesList);
    },
    showTime() {
      this.showCalendar = true;
    },
    //转换格式为月日
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    //转换格式为年月日
    formatDate1(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    //选完日期对格式继续一系列的处理
    onConfirm(date) {
      const [start, end] = date;
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
      this.dateStart = dateStartOne + "月" + dateStartTwo + "日";
      this.dateEnd = dateEndOne + "月" + dateEndTwo + "日";

      //处理两个日期的插值
      let a = `${this.formatDate1(start)}`;
      let b = `${this.formatDate1(end)}`;
      console.log(a, b);
      let diffDate;
      let myDate_1 = Date.parse(a);
      let myDate_2 = Date.parse(b);
      console.log(myDate_1, myDate_2);
      diffDate = Math.abs(myDate_1 - myDate_2);
      this.interpolation = Math.floor(diffDate / (1000 * 3600 * 24));
    },

    gotoYearCard() {
      this.$router.push("/yearcardDetail??card=allYear");
    },
    onLoad() {},
    // tabs栏滑动自动滚动
    handleScrollx() {},
    // 分享下拉框
    onSelect() {
      this.showShare = false;
    },

    // tab栏滑动切换
    getScroll(event) {
      if (event.target.scrollTop > 200) {
        this.isShowTabs = true;
      } else {
        this.isShowTabs = false;
      }
    },

    // 获取元素并跳转
    // getAnchor(id) {
    //   let anthorH = document.getElementById(id);
    //   console.log(anthorH);
    //   anthorH.scrollIntoView(true); // 将被点击的id滚动到顶部
    //   // 如果页面的高度 - 当前元素在页面的高度 还大于 200就让它显示顶部tabs栏，反之隐藏
    //   document.body.clientHeight - anthorH.offsetTop > 200
    //     ? (this.isShowTabs = true)
    //     : (this.isShowTabs = false);
    // },
    // 保存轮播图的数字
    onChangeSwipeOne(index) {
      this.firstCurrentSw = index;
    },
    onChangeSwipe(index) {
      this.SecondCurrentSw = index;
    },
    onChangeSwipeLast(index) {
      this.currentSw = index;
    },
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    allComment,
  },
};
</script>
<style lang="scss" scoped>
.van_detail {
  background-color: white;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.img_Box {
  width: 750px;
  height: 74.8148vw;
  overflow: hidden;
  font-size: 0;
}
.custom-indicator {
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 12px;
  position: absolute;
  bottom: 100px;
  right: 16px;
  color: white;
  padding: 3px;
}
.custom-indicator2 {
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  padding: 3px;
}
/* 分享 */
.messageBox {
  position: relative;
  top: -9.333vw;
  border-radius: 6vw;
  background-color: #fff;
  padding: 32px 40px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.message_share {
  display: flex;
  justify-content: space-between;
}
.message_share > h2 {
  font-size: 36px;
  line-height: 44px;
  color: #323233;
  font-weight: bolder;
  padding-right: 80px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.message_share .share {
  position: absolute;
  top: 32px;
  right: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  height: 48px;
  border-top-left-radius: 76px;
  border-bottom-left-radius: 76px;
  background-color: rgba(50, 50, 51, 0.05);
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 8px 0 12px;
  color: #969799;
  font-size: 24px;
}
.message_share .icon {
  margin-right: 4px;
  color: rgb(150, 151, 153);
  font-size: 28px;
}
.message_time {
  text-align: left;
  margin-top: 8px;
}
.message_time > span {
  padding: 0 8px;
  margin-bottom: 16px;
  margin-right: 8px;
  font-size: 20px;
  line-height: 32px;
  border-radius: 4px;
  text-align: center;
}
.map {
  font-size: 28px;
  padding: 20px 32px;
  margin-top: -60px;
}
.map-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.map_address {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 8px;
  flex: 1;
}
.map_map {
  color: #576b95;
  padding-right: 8px;
  border-right: 1px solid #ebedf0;
}
.map_phone {
  color: #576b95;
  padding-left: 8px;
}
.beVip {
  padding: 20px 32px;
  background: #fff;
}
.beVip .beVip_box {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 24px;
  height: 72px;
  justify-content: space-between;
  background-image: -webkit-linear-gradient(
    316deg,
    #f9e1aa,
    #ffe8b4 49%,
    #e1c78e
  );
  background-image: linear-gradient(134deg, #f9e1aa, #ffe8b4 49%, #e1c78e);
  border-radius: 8px;
}
.beVip img {
  height: 36px;
  width: 64px;
}
.openVip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 26px;
  color: #724e06;
  letter-spacing: 0;
  line-height: 32px;
}
.says {
  font-size: 26px;
  color: #724e06;
  letter-spacing: 0;
  line-height: 32px;
}
.surveyBox {
  padding: 0 32px 32px;
  text-align: left;
}
.surveyBox h2 {
  padding-top: 48px;
  position: relative;
  font-size: 36px;
  line-height: 44px;
  font-weight: bolder;
  padding: 16px 0 0;
}
.surveyBox p {
  padding: 20px 0 44px;
  font-size: 26px;
  line-height: 40px;
  color: #646566;
  white-space: pre-line;
}

.apartment {
  /* padding: 0 32px; */
}
.apartment_box {
  display: flex;
  justify-content: space-between;
  height: 104px;
  line-height: 104px;
  padding: 0 32px;
  align-items: center;
  /* padding-bottom: 30px; */
}
.description {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.description_left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.description_left-power {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.description_left-detail {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.description_left-detail > h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price > button {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 120px;
  height: 64px;
  margin-left: 16px;
  border-radius: 32px;
  color: #fff;
  font-weight: bolder;
  font-size: 28px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  background: #c3a769;
  border: 1px solid #c3a769;
}
.description_left-power > div {
  padding: 2px 8px;
  margin-right: 8px;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  white-space: nowrap;
  color: #c3a769;
  border-color: #c3a769;
  font-size: 20px;
  line-height: 30px;
}
.item_box-img {
  position: relative;
  width: 100%;
  height: 384px;
  border-radius: 4px;
  overflow: hidden;
}
.img1 {
  position: absolute;
  left: -7%;
  top: -7%;
  width: 114%;
  height: 114%;
  object-fit: cover;
  -webkit-filter: blur(13px);
  filter: blur(13px);
}
.img2 {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.apartment_box-time {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.apartment_box-time_go {
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}
.apartment_box-time_go > div {
  color: #323233;
  font-weight: 600;
  padding-left: 10px;
}
.apartment_box-time-leave > div {
  color: #323233;
  font-weight: 600;
  padding-left: 10px;
}
.apartment_box-time-leave {
  align-items: center;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}
.chooseBox {
  height: 42px;
  line-height: 42px;
  font-size: 28px;
  color: #576b95;
  margin-left: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.howNight {
  display: inline-block;
  border: 2px solid #ebedf0;
  width: 90px;
  border-radius: 28px;
  text-align: center;
  font-size: 28px;
  color: #646566;
  height: 42px;
  line-height: 42px;
}
.content {
  padding: 0 32px 40px;
}
.imgBox {
  height: 384px;
  overflow: hidden;
  position: relative;
}
.detailImg1 {
  position: absolute;
  left: -7%;
  top: -7%;
  width: 114%;
  height: 114%;
  object-fit: cover;
  -webkit-filter: blur(13px);
  filter: blur(13px);
}
.detailImg2 {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.doubleBed {
  font-size: 36px;
  line-height: 44px;
  font-weight: bolder;
  margin-top: 32px;
  text-align: left;
}
.content /deep/ .van-grid-item__icon {
  font-size: 14px;
}
/deep/ .van-grid-item__content {
  justify-content: start;
  padding: 8px 8px 8px 0px;
}
/deep/ .van-grid-item__text {
  font-size: 14px;
  font-weight: 500;
}
/deep/ .van-icon-success {
  color: #c3a769;
}
.mustKnow {
  padding: 20px 0;
  font-size: 26px;
  line-height: 40px;
  color: #646566;
  white-space: pre-line;
  text-align: left;
}
.btn_all {
  position: relative;
  box-sizing: border-box;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 100px;
  padding: 14px 32px;
  box-shadow: 0 -6px 20px -2px #7d7e8029;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
}
.btn_box {
  flex: 1;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  line-height: 72px;
  text-align: center;
  font-size: 28px;
  font-weight: bolder;
  border-radius: 36px;
  overflow: hidden;
  .lookDetail {
    background-color: rgba(195, 167, 105, 0.1);
    flex: 1;
    color: #c3a769;
  }
  .lookPrice {
    flex: 1;
    background-color: #c3a769;
    color: white;
  }
}
.screen_box {
  display: flex;
  flex-direction: column;
  text-align: left;
  .screen_type {
    font-size: 28px;
    color: #323233;
    line-height: 36px;
    font-weight: 400;
  }
  .screen_typeChildren {
    display: flex;
    text-align: left;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    div {
      line-height: 64px;
      padding: 0 24px;
      border-radius: 16px;
      font-size: 26px;
      text-align: center;
      margin: 24px 24px 0 0;
      background-color: #f7f8fa;
    }
  }
}
.screen_box {
  margin-bottom: 75px;
}
.checkActive {
  color: #c3a769;
  background: rgba(195, 167, 105, 0.1);
}
/deep/ .van-tabs {
}
.item_box {
  position: relative;
}
.bedBox {
  bottom: -112px;
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  left: 4vw;
  bottom: 15vw;

  .bedBox_name {
    font-size: 5.267vw;
    font-weight: 700;
  }
  .box_mes {
    display: flex;
    justify-content: space-between;
    line-height: 7.267vw;
    div {
      margin-right: 24px;
    }
  }
}
</style>
