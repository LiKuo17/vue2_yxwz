<template>
  <!-- 确认订单 -->
  <div class="comfirmOrder">
    <!-- 填写联系人 -->
    <div class="contacts" v-if="comfromHotel == 3">
      <!-- <div class="contacts_top">
        <van-coupon-cell
          title="填写联系人"
          value="更换联系人"
          @click="changeRelx"
        />
        <van-field label="姓名" />
        <van-field  type="tel" label="手机号码" />
      </div> -->
      <van-field
        v-model="text"
        required
        label="姓名"
        placeholder="请填写您的姓名"
      />
      <van-field
        v-model="tel"
        required
        type="tel"
        label="手机号码"
        placeholder="请填写您的手机号码"
      />
    </div>

    <div class="shopBox" v-if="comfromHotel == 2">
      <div class="shopBox-item1">
        <van-cell
          title="黑金商旅"
          icon="shop-o"
          value=""
          @click="$router.push({ path: '/' })"
        ></van-cell>
      </div>
      <div class="shopBox-item2">
        <div class="shopBox-item2-left">
          <img
            src="https://img.yzcdn.cn/upload_files/2020/08/11/Fs9x4DN8UoHDIrmYisBv6UwNWqdJ.jpeg?imageView2/2/w/180/h/180/q/75/format/jpeg"
            alt=""
          />
        </div>
        <div class="shopBox-item2-right">
          <div class="blackcard1">{{ queryObj.productName }}</div>
          <div style="width: 100%">
            <div class="card-price-left">￥{{ queryObj.price }}</div>
            <div class="card-num">
              <!-- <van-stepper :value="value" async-change @change="onChange" /> -->
              <van-stepper v-model="value" @change="onChange" />
            </div>
          </div>
          <div style="font-size: 12px; color: #969799">不支持申请退款</div>
        </div>
      </div>
      <div class="shopBox-item3">
        <span>共{{ queryObj.number }}件</span>
        &nbsp;&nbsp;&nbsp;
        <span>
          商品小计：
          <span style="color: #c3a769">￥</span>
          <span class="shopSmlPrice">{{
            queryObj.number * queryObj.price
          }}</span>
        </span>
      </div>
    </div>

    <div class="shopBox" v-if="comfromHotel == 3">
      <div class="shopBox-item1">
        <van-cell
          title="黑金商旅"
          icon="shop-o"
          value=""
          @click="$router.push({ path: '/' })"
        ></van-cell>
      </div>
      <div class="shopBox-item2">
        <div class="shopBox-item2-left">
          <img :src="serveAddress + this.roomDetail.mainImage" alt="" />
        </div>
        <div class="shopBox-item2-right">
          <div class="blackcard1">{{ this.hotelName }}</div>
          <div style="font-size: 12px; color: #969799">
            {{ this.roomDetail.name }}
          </div>
          <div style="font-size: 12px; color: #969799" class="term">
            <span style="display: inline">有效期至:</span>
            <div style="display: inline">{{ this.reverseTime }}</div>
          </div>
          <div style="width: 100%">
            <div class="card-price-left">￥{{ this.roomDetail.price }}</div>
            <div class="card-num">
              <!-- <van-stepper :value="value" async-change @change="onChange" /> -->
              <van-stepper v-model="value" @change="onChange" />
            </div>
          </div>
          <div style="font-size: 12px; color: #969799">不支持申请退款</div>
        </div>
      </div>
      <div class="shopBox-item3">
        <span>共{{ value }}件</span>
        &nbsp;&nbsp;&nbsp;
        <span>
          商品小计：
          <span style="color: #c3a769">￥</span>
          <span class="shopSmlPrice">{{ this.total }}</span>
        </span>
      </div>
    </div>

    <!-- 商品盒子 start -->
    <div class="shopBox" v-if="comfromHotel == 1">
      <div class="shopBox-item1">
        <van-cell
          title="黑金商旅"
          icon="shop-o"
          value=""
          @click="$router.push({ path: '/' })"
        ></van-cell>
      </div>
      <div class="shopBox-item2">
        <div class="shopBox-item2-left">
          <img src="../../assets/img/card.jpg" alt="" />
        </div>
        <div class="shopBox-item2-right">
          <div class="blackcard1">黑金全年卡</div>
          <div class="blackcard2">黑金全年卡</div>
          <div style="width: 100%">
            <div class="card-price-left">￥368.00</div>
            <div class="card-num">
              <span style="padding-right: 15px">x1</span>
            </div>
          </div>
        </div>
      </div>
      <div class="shopBox-item3">
        <span>共1件</span>
        &nbsp;&nbsp;&nbsp;
        <span>
          商品小计：
          <span style="color: #c3a769">￥</span>
          <span class="shopSmlPrice">368.00</span>
        </span>
      </div>
    </div>
    <!-- 商品盒子 end -->

    <div class="couponBox">
      <!-- 弹优惠券框  -->
      <!-- <van-coupon-cell title="优惠券" @click="isShowCoupon = true" /> -->
      <van-coupon-cell title="优惠券" />
    </div>

    <!-- 弹发票框 -->
    <!-- <van-coupon-cell
      title="发票"
      value="请填写开票信息"
      @click="sendBill = true"
    /> -->
    <van-coupon-cell title="发票" value="请填写开票信息" />

    <van-field
      label="买家留言"
      placeholder="留言建议提前协商（250字以内）"
      input-align="right"
      v-model="remarker"
    />
    <!-- 支付按钮 -->
    <div class="action-btn-wrap">
      <div class="shouldPay">
        <span>
          应付:
          <span style="color: #c3a769">￥</span>
          <span style="color: #c3a769; padding-right: 15px; font-size: 18px">{{
            this.total
          }}</span>
        </span>
      </div>
      <div class="paybtn">
        <van-button
          color="#c3a769"
          round
          block
          @click="postBuffetOrder"
          v-if="comfromHotel == 2"
          >提交订单
        </van-button>
        <van-button
          color="#c3a769"
          round
          block
          @click="commitOrder"
          v-if="comfromHotel == 3"
        >
          提交订单
        </van-button>
      </div>
    </div>

    <van-action-sheet v-model="showContacts" title="选择联系人">
      <div class="content">
        <van-contact-list
          v-model="chosenContactId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
      </div>
    </van-action-sheet>

    <!-- 优惠券弹框 -->
    <!-- 优惠券列表 -->
    <!-- <van-popup
      v-model="isShowCoupon"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChangeYHQ"
        @exchange="onExchange"
      />
    </van-popup> -->

    <!-- 发票信息 -->
    <van-action-sheet v-model="sendBill" @select="isShow" title="发票">
      <div class="bouceBox">
        <div class="bounceBox-top">
          <div class="shhjs billType">发票类型</div>
          <div class="lookBill">
            查看发票须知
            <van-icon name="info-o" />
          </div>
        </div>
        <div class="ordinary">
          此处为申请增值税普通发票（电子发票），如需专用发票请联系商家。
        </div>
        <div class="btnGroup">
          <div
            class="btn-item"
            :class="{ active: isFirm === true }"
            @click="isFirm = true"
          >
            企业
          </div>
          <div
            class="btn-item"
            :class="{ active: isFirm === false }"
            @click="isFirm = false"
          >
            个人
          </div>
        </div>
        <!-- 企业 start -->
        <div class="firm" v-if="isFirm">
          <van-cell-group>
            <van-field
              v-model="firmBillHead"
              label="收票抬头"
              placeholder="请输入收票抬头"
              style="text-align: left"
            />
            <van-field
              v-model="firmCode"
              label="企业税号"
              placeholder="请输入企业税号"
              style="text-align: left"
            />
          </van-cell-group>
          <div class="bounceBox-bottom">
            <div class="billMain">发票内容</div>
            <div class="billName">发票内容将显示商品相关类别名称</div>
          </div>
          <div class="billMsgBox">
            <div class="billMsg">发票信息</div>
            <van-field
              v-model="firmBillEmail"
              label="收票邮箱"
              placeholder="用于向你发送电子发票"
              style="text-align: left"
            />
          </div>
        </div>
        <!-- 企业 end -->
        <!-- 个人 start -->
        <div class="personal" v-if="!isFirm">
          <van-cell-group>
            <van-field
              v-model="personBillHead"
              label="收票抬头"
              placeholder="请输入个人名称"
              style="text-align: left"
            />
          </van-cell-group>
          <div class="bounceBox-bottom">
            <div class="billMain">发票内容</div>
            <div class="billName">发票内容将显示商品相关类别名称</div>
          </div>
          <div class="billMsgBox">
            <div class="billMsg">发票信息</div>
            <van-field
              v-model="personBillEmail"
              label="收票邮箱"
              placeholder="用于向你发送电子发票"
              style="text-align: left"
            />
          </div>
        </div>
        <!-- 个人 end -->
        <van-button
          round
          type="info"
          color="#c3a769"
          size="large"
          @click="sendBill = false"
        >
          完成
        </van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// import { $post } from "@/api/index";
import fileServerAddress from "@/assets/js/config";
import { Toast } from "vant";
import { postData } from "../../api";
import config from "@/assets/js/config";
export default {
  name: "comfirmOrderr",
  data() {
    return {
      serveAddress: fileServerAddress.fileServerAddress,
      hotelName: "",
      reverseTime: "",
      roomDetail: {},
      showContacts: false,
      remarker: null,
      tel: "",
      text: "",
      value: "",
      comfromHotel: null,
      total: 0.0,
      noComfromHotel: false,
      chosenContactId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
        },
      ],
      isShowCoupon: false, // 优惠券弹框
      chosenCoupon: -1,
      // coupons: [coupon],
      // disabledCoupons: [coupon],
      sendBill: false, // 发票弹框
      firmBillEmail: "", // 企业发票邮箱
      firmBillHead: null, // 企业发票抬头
      firmCode: null, // 企业发票税号
      personBillHead: null, // 个人发票抬头
      personBillEmail: null, // 个人收票邮箱
      isFirm: true, // 是否为企业
      queryObj: {}, // 自助餐传来的对象
    };
  },
  methods: {
    changeRelx() {
      this.showContacts = true;
    },
    onAdd() {
      this.$router.push("/contactAdd");
    },
    onEdit() {},
    onSelect(item) {
      console.log(item);
      this.text = item.name;
      this.tel = item.tel;
      console.log(this.text, this.tel);
      this.showContacts = false;
    },
    onChange(value) {
      console.log(value);
      // this.total = this.total * value
      Toast.loading({ forbidClick: true });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        Toast.clear();
        // 注意此时修改 value 后会再次触发 change 事件
        // this.value = value;
        // this.total = this.total * value
        this.total = this.roomDetail.price * value;
      }, 500);

      console.log(this.total);
    },
    isShow() {
      this.isShowCoupon = false;
      this.sendBill = false;
    },
    // 优惠券
    onChangeYHQ(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    // 优惠券
    onExchange(code) {
      // this.coupons.push(coupon);
    },
    // 自助餐提交订单
    async postBuffetOrder() {
      this.queryObj.remark = this.remarker;
      this.queryObj.productType = 3;
      delete this.queryObj.imgUrl;
      const result = await postData("createOrder", this.queryObj);
      if (result.code === 0) {
        Toast.success("创建订单成功!");
      }
      console.log(result, "result");
      // $router.push({ path: '/stayPay' })
    },
    async commitOrder() {
      if (!this.text) {
        this.$toast.fail("姓名未能为空");
        return;
      }
      if (!this.tel) {
        this.$toast.fail("手机号未能为空");
        return;
      } else if (!/^1[0-9]{10}$/.test(this.tel)) {
        this.$toast.fail("手机号格式不符");
        return;
      } else {
      }
      let params = {
        number: this.value,
        price: this.roomDetail.price,
        productId: this.roomDetail.id,
        productName: this.hotelName,
        productType: 3,
        roomName: this.roomDetail.name,
        scheduledTime: this.reverseTime,
        userName: this.text,
        phone: this.tel,
        mainImage: this.roomDetail.mainImage,
        totalPrice: this.total,
      };
      console.log("text", this.text);
      console.log("params", params);
      let res = await postData("createOrder", params);
      const detailMes = res.data;
      localStorage.setItem("comfirmData", JSON.stringify(detailMes));
      console.log(detailMes);
      this.$router.push({
        path: "/stayPay",
        query: { prodType: this.comfromHotel, status: res.data.status },
      });
    },
  },
  created() {
    /* this.total = 111;
    // console.log(this.hotelName);
    // console.log(this.reverseTime);
     console.log(this.roomDetail); */
    this.comfromHotel = this.$route.query.prodType;

    if (this.comfromHotel == 3) {
      this.hotelName = localStorage.getItem("hotelName");
      this.reverseTime = localStorage.getItem("reverseTime");
      this.roomDetail = JSON.parse(localStorage.getItem("roomDetail"));
      this.total = this.roomDetail.price;
    }
    if (this.comfromHotel == 2) {
      let tempObj = localStorage.getItem("prodObj");
      this.queryObj = JSON.parse(tempObj); // 自助餐传来的商品信息
      console.log(this.queryObj, "this.queryObj");
      this.zzcMainImg = config.fileServerAddress + this.queryObj.mainImage;
    }
    if (this.comfromHotel == 1) {
      let tempObj = localStorage.getItem("vipListObj");
      this.vipObj = JSON.parse(tempObj); // 会员卡传来的商品信息
      this.viplistArr = [];
      this.viplistArr.push(this.vipObj);
      this.cardMainImg = config.fileServerAddress + this.vipObj.mainImage;
    }

    /* this.comfromHotel = this.$route.query.prodType;
    console.log(
      this.$router.history.current.query.prodType,
      "this.$route.query.prodType"
    );

    console.log(this.$route.query.prodType);

    console.log(this.queryObj, "this.queryObj");
    */
  },
};
</script>

<style lang="scss" scoped>
.comfirmOrder {
  position: relative;
  width: 94vw;
  margin: 3vh 3vw 0;
  min-height: 100vh;
  background-color: #f7f8fa;
  .shopBox {
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
    background-color: white;
    margin-bottom: 20px;
    .shopBox-item1 {
    }

    .shopBox-item2 {
      display: flex;
      align-items: center;
      height: 100%;
      padding-top: 20px;
      .shopBox-item2-left {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 80%;
          height: 100%;
        }
      }
      .shopBox-item2-right {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: left;
        margin: 0 6px;
        overflow: hidden;
        .blackcard1,
        .blackcard2 {
          width: 100%;
          margin: 0 6px;
        }
        .blackcard1 {
          color: black;
          font-size: 26px;
        }
        .blackcard2 {
          color: #969799;
          font-size: 20px;
          margin-bottom: 30px;
        }
        .card-price-left {
          width: 50%;
          float: left;
        }
        .card-num {
          float: right;
          width: 50%;
          font-size: 24px;
          color: #969799;
          text-align: right;
        }
      }
    }

    .shopBox-item3 {
      text-align: right;
      font-size: 28px;
      margin-top: 30px;
    }
  }
  .shopSmlPrice {
    color: #c3a769;
    padding-right: 15px;
    font-size: 30px;
  }
  .couponBox {
    margin: 3vw 0;
  }
  /deep/ .van-cell__title {
    text-align: left;
  }
  /* 立即开通 */
  .action-btn-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    padding-bottom: 10px;
    background-color: #fff;
    .shouldPay {
      width: 40vw;
      float: left;
      line-height: 100px;
    }
    .paybtn {
      width: 30vw;
      float: right;
    }
    /deep/ .van-button--block {
      display: block;
      width: 26vw !important;
      height: 40px !important;
      margin-top: 2.5vw !important;
    }
    /deep/ .van-button__text {
      color: white !important;
      font-size: 16px;
    }
  }
}
.contacts {
  margin-bottom: 20px;
}
/* 弹框说明 */
.bouceBox {
  padding: 0 25px;
  height: 100%;
  box-sizing: border-box;
  /* background-color: orange; */
  text-align: left;
  /deep/ .van-button--large {
    height: 41px !important;
    margin-bottom: 10px;
  }
  .bounceBox-top {
    padding-top: 24px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    .billType {
      width: 50%;
    }
    .lookBill {
      width: 50%;
      text-align: right;
      color: #969799;
    }
  }
  /deep/ .van-cell {
    padding: 10px 0 !important;
  }
  /deep/ .van-field__label {
    color: #323233 !important;
  }
  .bounceBox-bottom {
    padding-top: 35px;
    font-weight: 500;
    line-height: 20px;
    padding-bottom: 10px;
  }
  /deep/ .van-cell:after {
    border-bottom: none !important;
  }
  /deep/ [class*="van-hairline"]:after {
    border: none !important;
  }
}
.billMsgBox {
  padding-top: 0px;
  font-weight: 500;
  line-height: 20px;
  padding-bottom: 25px;
}
.content_color {
  margin-top: 8px;
  font-size: 24px;
  color: #969799;
  line-height: 32px;
  flex: 1;
}
.shhjs {
  font-size: 30px;
  padding: 10px 0;
}
.billName {
  margin: 40px 0;
  font-size: 24px;
  color: #969799;
  line-height: 32px;
  flex: 1;
}
.billMain {
  font-size: 30px;
  padding: 10px 0;
}

.billMsg {
  font-size: 30px;
  padding: 30px 0;
}
.ordinary {
  width: 100%;
  color: #969799;
  font-size: 18px;
  padding-bottom: 30px;
  padding-top: 18px;
}
.btnGroup {
  width: 100%;
  height: 60px;
  margin: 10px 0 20px;
  .btn-item {
    width: 140px;
    height: 50px;
    background-color: #f2f3f5;
    color: #5b5b5c;
    font-size: 22px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    float: left;
    margin-top: 2.5px;
    margin-left: 15px;
  }
  .btn-item:nth-child(2) {
    margin-left: 30px;
  }
  .active {
    background-color: #f9f6f0;
    color: #c3a769;
  }
}
.action-btn-wrap {
  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #c3a769 !important;
    border: #c3a769;
  }
  /deep/ .van-button--danger {
    background-color: #c3a769 !important;
    border: #c3a769;
  }
}
</style>
