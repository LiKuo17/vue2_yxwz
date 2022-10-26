<template>
  <div class="mustRead">
    <div class="khbd">
      <img :src="masterMap" alt="" @click="cityChoose" />
      <!-- 酒店列表 -->
    </div>
    <section ref="box" id="search_section" class="search_section">
      <div class="card_Box mrn">
        <div v-show="queryList.length > 0">
          <div
            class="box_Content1"
            v-for="(item, index) in queryList"
            :key="index"
            @click="gotoHotelDetail(item.id)"
          >
            <div class="sift_Article_Box">
              <div class="box_Content2">
                <div class="left_box">
                  <div class="img_Box3">
                    <van-image
                      :lazy-load="true"
                      fit="cover"
                      :src="serveAddress + item.mainImage"
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
                <div
                  class="
                    right_box
                    d-flex
                    flex-column
                    justify-content-between
                    h-100
                    border-box
                  "
                >
                  <div>
                    <div class="name fw-bold qxhh">
                      <span class="hyzx">会员专享</span>
                      <span style="font-size: 4.2vw">{{ item.name }}</span>
                    </div>
                    <span class="text-red fw-bold d-flex">
                      <span class="hyzx dbkx">{{ item.lable }}</span>
                    </span>
                    <div class="d-flex address1">
                      <span><van-icon name="location-o" /></span>
                      {{ item.addr }}
                    </div>
                    <div style="float: right; margin-right: 10px">
                      <!-- <span>价格：</span> -->
                      <span class="price1"
                        ><span class="price3" style="color: #cfa769">￥</span>
                        <span class="price2">{{ item.price }}</span></span
                      >
                      <span class="price3"> 起</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            style="
              padding: 15px;
              
              color: #bbb;
              font-size: 12px;
              margin-bottom: 3px;
            "
          >
            没有更多了！
          </div> -->
        </div>
        <!-- <div class="noMore w-100 bg-white" v-show="queryList.length <= 0">
          <img
            src="../../assets/img/noMore.png"
            style="height: 100%; width: auto"
          />
        </div> -->
      </div>
    </section>
  </div>
</template>
<script>
import { $get } from "@/api/index";
import fileServerAddress from "@/assets/js/config";
import { getData } from "../../api";
export default {
  name: "hotelBooking",
  data() {
    return {
      serveAddress: "",
      queryList: [
        // {
        //   prdid: 1,
        //   mainimage: require("@/assets/img/酒店筛选1.jpg"),
        //   price: 360,
        //   hotelName: "资阳鼎晟泓府豪生大酒店",
        //   address: "四川省资阳市雁江区资阳鼎晟泓府豪生大酒店",
        // },
        // {
        //   prdid: 2,
        //   mainimage: require("@/assets/img/酒店筛选2.jpg"),
        //   price: 480,
        //   hotelName: "丽江金林豪生大酒店",
        //   address: "云南省丽江市古城区丽江金林豪生大酒店",
        // },
        // {
        //   prdid: 3,
        //   mainimage: require("@/assets/img/酒店筛选3.jpg"),
        //   price: 505,
        //   hotelName: "惠州中海汤泉酒店",
        //   address: "广东省惠州市惠城区中海惠州汤泉酒店(原中信汤泉酒店)",
        // },
        // {
        //   prdid: 4,
        //   mainimage: require("@/assets/img/酒店筛选4.jpg"),
        //   price: 784,
        //   hotelName: "舟山三盛铂尔曼大酒店",
        //   address: "浙江省舟山市普陀区舟山三盛铂尔曼大酒店",
        // },
      ],
      masterMap: require("@/assets/img/酒店筛选.jpg"),
    };
  },
  methods: {
    cityChoose() {
      this.$router.push("/cityChoose");
    },
    gotoHotelDetail(hotelId) {
      console.log(hotelId);
      this.$router.push("/hotelDetail?id=" + hotelId);
    },
    async getHotelList() {
      let res = await getData("getHotelList");
      console.log(res);
      this.queryList = res.data;
    },
  },
  created() {
    console.log(111111111111, fileServerAddress.fileServerAddress);
    this.getHotelList();
    this.serveAddress = fileServerAddress.fileServerAddress;
  },
};
</script>
<style lang="scss" scoped>
.mustRead {
  overflow-y: scroll;
  margin-bottom: 100px;
  /* background-color: #f05357; */
}
.khbd {
  position: relative;
  display: flex;
  width: 100%;
  /* height: calc(100%-10vh); */
  /* margin-bottom: 60px; */
}
.khbd > .hotelBox {
  width: 700px;
  height: 180px;
  border: 5px solid blue;
  position: absolute;
  top: 480px;
  left: 20px;
}
.khbd > img {
  width: 100%;
  height: 100%;
}
.search_section {
  /* height: calc(100vh - 26vw); */
  /* overflow-y: auto; */
  background-color: #ed4d55;
  padding-bottom: 24px;
  padding-top: 24px;
}

.norms {
  color: rgb(235, 101, 101);
  font-size: 30px;
  margin-top: 4px;
}

.box_Content2 {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* padding: 10px 10px; */
  width: 100%;
  box-sizing: border-box;
}

.img_Box3 {
  width: 29vw;
  height: 36vw;
  margin-right: 24px;
  border-radius: 1.867vw 0 0 1.867vw;
  overflow: hidden;
}

.box_Content1 {
  background-color: #fff;
  border-radius: 14px;
  margin: 0 18px;
  margin-top: 18px;
  padding: 0;
}
.box_Content1:last-of-type {
  margin-bottom: 18px;
}
.box_Content1:first-child {
  background-color: #fff;
  border-radius: 14px;
  margin: 0 18px;
  /* margin-top: 18px; */
  padding: 0;
}
.mrn {
  position: relative;
}

.sift_Article_Box {
  display: flex;
  justify-content: space-between;
}

.history_value_p {
  line-height: 60px;
  text-align: left;
}

.history_value_p > span {
  display: inline-block;
  padding: 0 32px;
  color: rgb(102, 102, 102);
  border-radius: 36px;
  background-color: rgb(245, 245, 245);
  font-size: 26px;
  margin-right: 20px;
  margin-bottom: 12px;
}

.cloak_Box {
  overflow: hidden;
}

.his_p {
  display: inline-block;
  width: 100%;
  line-height: 40px;
}

.delete_sp {
  float: right;
  font-size: 38px;
  color: rgb(153, 153, 153);
  vertical-align: middle;
}

.delete_sp i {
  vertical-align: middle;
}

.search_history_sp {
  color: rgb(51, 51, 51);
  font-size: 28px;
  font-weight: bold;
  float: left;
}

.searchHistory_Box {
  padding: 0 32px;
  width: calc(100% - 64px);
  min-height: 250px;
  padding-top: 40px;
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
}

.search_Content_Box {
  margin-top: 20px;

  position: relative;
  min-height: calc(100vh - 130px);
}

.search_Btn {
  color: #29be81;
}

.search {
  background-color: #f6f6f6;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.search_Box {
  padding: 7px 10px;
  /*no*/
  position: relative;
  display: flex;
  background-color: white;
}

.search_Box > div:nth-child(1) {
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f656b;
  font-size: 20px;
}

.search_Box > div:nth-child(2) {
  width: calc(100% - 60px);
}

.van-search__action:active {
  background-color: transparent;
}

.bg_Box {
  position: fixed;
  height: 160px;
  width: 100%;
  background: linear-gradient(to right, #e35e95, #ee7c86);
  z-index: 0;
}

.card_Box {
  /* background-color: white; */
}

.price_search {
  margin-top: -0.6vw;
}

.noprice > span:nth-child(2) {
  color: #888888;
  font-size: 30px;
  font-weight: bold;
}

.norms {
  color: rgb(235, 101, 101);
  font-size: 30px;
  margin-top: 10px;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  color: #333;
  /* margin: 0.933vw 0; */
  /* padding: 0.933vw 0; */
  line-height: 10vw;
  font-size: 3.7vw;
}

.right_box {
  float: right;
  width: 450px;
  text-align: left;
  flex: 1;
}

.right_box > p {
  padding: 0;
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

.sift_Article_Box {
  display: flex;
  /*padding-top: 32px;*/
  justify-content: space-between;
}

.history_value_p {
  line-height: 60px;
  text-align: left;
}

.history_value_p > span {
  display: inline-block;
  padding: 0 32px;
  color: rgb(102, 102, 102);
  border-radius: 36px;
  background-color: rgb(245, 245, 245);
  font-size: 26px;
  margin-right: 20px;
}

.cloak_Box {
  overflow: hidden;
}

.his_p {
  display: inline-block;
  width: 100%;
  line-height: 40px;
}

.delete_sp {
  float: right;
  font-size: 38px;
  color: rgb(153, 153, 153);
  vertical-align: middle;
}

.delete_sp i {
  vertical-align: middle;
}

.search_history_sp {
  color: rgb(51, 51, 51);
  font-size: 28px;
  font-weight: bold;
  float: left;
}

.searchHistory_Box {
  padding: 0 32px;
  width: calc(100% - 64px);
  min-height: 430px;
  padding-top: 40px;
}
/deep/ .van-image {
  width: 100% !important;
  height: 100% !important;
}
/* 会员专享 */
.hyzx {
  display: inline-block;
  background-color: #f9f6f0;
  /* padding: 0 5px; */
  font-size: 12px;
  font-weight: 400;
  color: #cfa769;
  width: 100px;
  text-align: center;
  height: 27px;
  line-height: 27px;
}
/* 取消换行 */
.qxhh {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-right: 18px;
}
/* 带边框线的会员专享 */
.dbkx {
  background-color: #fff;
  border: 1px solid #cfa769;
  padding: 1px;
}
.price1 {
  line-height: 12vw;
  color: #cfa769;
}
.price2 {
  font-size: 5vw;
  font-weight: 600;
}
.price3 {
  color: #969799;
  font-size: 3.7vw;
}
.address1 {
  font-size: 2vw;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #969799;
  overflow: hidden;
  margin: 2.333vw 0;
}
</style>