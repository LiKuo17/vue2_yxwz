<template>
  <div class="saleOrder">
    <CommonHeader title="推广订单" />
    <div class="d-flex flex-column align-items-center mt-5 px-5 mb-5">
      <div
        class="avatarOuter border-pill"
        :style="{
          backgroundImage: `url(${
            userInfo.avatar ? $getImageUrl(userInfo.avatar) : fixAvatar
          })`,
        }"
      ></div>
      <div class="text-ellipsis mt-3 fs-5 fw-bold w-100 mb-3">
        {{ userInfo.ownerCode }}
      </div>
    </div>
    <div
      class="
        d-flex
        filterRow
        mt-5
        d-flex
        align-items-center
        justify-content-between
        px-3
      "
    >
      <div class="fs-5 text-primary">数据区间</div>
      <input
        @click="
          showDatePickerPopup = true;
          currentDate = startDate;
          dataType = 'start';
        "
        readonly
        class="text-center fs-4"
        type="text"
        :value="new Date(startDate).toLocaleDateString()"
      />
      <span>-</span>
      <input
        @click="
          showDatePickerPopup = true;
          currentDate = endDate;
          dataType = 'end';
        "
        readonly
        class="text-center fs-4"
        type="text"
        :value="new Date(endDate).toLocaleDateString()"
      />
      <van-button
        size="small"
        style="height: 7vw"
        :color="$primary"
        @click="getDate"
        >查询</van-button
      >
    </div>
    <div
      class="dateRanges d-flex justify-content-between align-items-center mt-2"
    >
      <div
        :class="{ 'bg-primary': item.active, 'text-white': item.active }"
        class="rounded-1 flex-center fs-5"
        @click="
          dateRanges = dateRanges.map((dateItem) => ({
            ...dateItem,
            active: dateItem.startDate == item.startDate ? true : false,
          }));
          startDate = item.startDate;
        "
        v-for="(item, index) in dateRanges"
        :key="index"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      class="
        border-top border-bottom
        d-flex
        justify-content-between
        align-items-center
        fs-5
        px-4
        py-2
        mt-2
      "
    >
      <div>
        <span>订单总笔数(笔)：</span>
        <span class="text-primary">{{ orderList.Size }}</span>
      </div>
      <div>
        <span>累计销售额：</span>
        <span class="text-primary">{{ orderList.totalAmount }}</span>
      </div>
    </div>
    <div class="d-flex border-bottom fs-5 py-2">
      <div class="flex-center flex-grow-1">订单时间</div>
      <div class="flex-center flex-grow-1">订单金额</div>
    </div>
    <div class="orderList overflow-y-scroll">
      <LayzyList
        httpType="get"
        url="/m/members/api/selectUsersalse"
        :validate="(res) => res.data"
      >
        <template #default="{ list }">
          <div
            class="d-flex border-bottom fs-5 py-2"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="flex-center flex-grow-1 w-50">
              {{ item.ordertime | dateFormat }}
            </div>
            <div
              class="flex-center flex-grow-1 w-50"
              v-if="item.orderType == 1"
            >
              +{{ item.payamt }}
            </div>
            <div
              class="flex-center flex-grow-1 w-50"
              v-if="item.orderType == 2"
            >
              -{{ item.payamt }}
            </div>
          </div>
        </template>
      </LayzyList>
    </div>
    <van-popup
      v-model="showDatePickerPopup"
      position="bottom"
      :style="{
        height: '46%',
        'border-top-left-radius': '3vw',
        'border-top-right-radius': '3vw',
      }"
    >
      <van-datetime-picker
        @cancel="showDatePickerPopup = false"
        @confirm="confirmDate"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
import LayzyList from "@/components/LAZYLIST";
export default {
  components: { CommonHeader, LayzyList },
  data() {
    return {
      page: 1,
      rows: 10,
      orderList: [],
      userInfo: {},
      showDatePickerPopup: false,
      minDate: new Date(1970, 0, 1),
      currentDate: new Date(),
      maxDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      startDate: new Date(1970, 0, 1),
      endDate: new Date(),
      dataType: "start",
      dateRanges: [
        {
          title: "全部",
          active: true,
          startDate: new Date(1970, 0, 1),
        },
        {
          title: "一个月",
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        },
        {
          title: "三个月",
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
        },
        {
          title: "一年",
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
        },
      ],
      fixAvatar: "static/img/test_userx.png",
    };
  },
  created() {
    // this.getUserInfo();
    this.getDate();
  },
  methods: {
    // getUserInfo() {
    //       this.$http.get("/m/members/api/getInfo").then(e => {
    //             if (e.result == 0) {
    //                   this.userInfo = e.data;
    //                   console.log(this.userInfo,'this.userInfo');
    //             }
    //       });
    // },
    confirmDate(value) {
      if (this.dataType == "start") {
        if (value.getTime() > this.endDate.getTime())
          return this.$toast("开始日期应小于结束日期");
        this.startDate = value;
      } else if (this.dataType == "end") {
        if (value.getTime() < this.startDate.getTime())
          return this.$toast("结束日期应大于开始日期");
        this.endDate = value;
      }
      this.showDatePickerPopup = false;
    },
    getDate() {
      this.$http
        .get("/m/members/api/selectUsersalse", {
          params: {
            startTime: new Date(this.startDate).getTime(),
            endTime: new Date(this.endDate).getTime(),
            page: this.page,
            rows: 10,
          },
        })
        .then((e) => {
          this.orderList = e.data;
          console.log(this.orderList, "orderList");
          (this.page = e.data.Page || null), (this.rows = e.data.Rows || null);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.saleOrder {
  height: 100vh;
  background-color: #fff;
  .avatarOuter {
    width: 18vw;
    height: 18vw;
    border: 6px solid #fff;
    background-size: cover;
  }
  .filterRow {
    height: 7vw;
    input {
      outline: none;
      border: 1px solid rgba($color: #000000, $alpha: 0.4);
      width: 26vw;
      height: 6vw;
      border-radius: 1vw;
    }
  }
  .dateRanges {
    padding: 0 13vw;
    > div {
      width: 16vw;
      height: 7vw;
    }
  }
  .orderList {
    height: calc(100vh - 88vw);
  }
}
</style>
