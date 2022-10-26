<template>
  <div class="parents_box">
    <van-tabs
      v-model="active"
      sticky
      @click="gotoView"
      color="#c3a769"
      v-if="isShowTabs"
    >
      <van-tab title="商品"></van-tab>
      <van-tab title="评价"> </van-tab>
      <van-tab title="推荐"> </van-tab>
      <van-tab title="详情"> </van-tab>
    </van-tabs>
    <div class="van_detail" @scroll.passive="getScroll($event)">
      <!-- 轮播图区域 start -->
      <header id="product">
        <div class="header_Content">
          <van-swipe indicator-color="white" @change="onChangeSwipe">
            <van-swipe-item v-for="(item, index) in bannerList" :key="index">
              <div class="img_Box">
                <img
                  :src="item"
                  onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                />
              </div>
            </van-swipe-item>
            <template #indicator>
              <div class="custom-indicator">
                {{ currentSw + 1 }}/{{ bannerList.length }}
              </div>
            </template>
          </van-swipe>
        </div>
      </header>
      <!-- 轮播图区域 end -->
      <section>
        <article>
          <div class="detail_title_Box card" style="padding-top: 0">
            <div class="detail_p1" style="margin: 10px 0">
              <span class="detail_sp5">￥{{ benefitsObj.price + ".00" }}</span>
            </div>
            <div style="position: relative">
              <!-- 分享 -->
              <div class="shareBox" @click="showShare = false">
                <div class="shareTop"><van-icon name="share" /></div>
                <div class="shareBottom">分享</div>
              </div>
              <p class="detail_p">{{ benefitsObj.name }}</p>
              <span class="detail_sp1" style="line-height: 20px">{{
                benefitsObj.info
              }}</span>
            </div>
          </div>
          <!-- 分享上拉框 -->
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
          />

          <div class="mgt card">
            <van-cell>
              <div
                style="
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div class="shuoming">运费</div>
                <span class="detail_sp4">无需配送</span
                ><span class="detail_sp2" style="padding-left: 43vw">
                  剩余 {{ benefitsObj.stock }}</span
                >
              </div>
            </van-cell>
          </div>

          <!-- 弹框说明 start -->
          <div class="mgt card">
            <van-cell is-link @click="showBounce1 = true">
              <div style="display: flex">
                <div class="shuoming">服务</div>
                <span class="detail_sp4">不支持申请退款 · 收货后结算</span>
                <!-- <span class="detail_sp2"> </span> -->
              </div>
            </van-cell>
          </div>

          <!-- 弹框说明 end -->

          <div class="detail_title_Box mgt card" @click="show = true">
            <p class="detail_p1" @click="isShowSku = true">
              <span class="detail_sp1" style="padding-left: 2px">选择</span
              ><span>餐型时段</span
              ><span class="detail_sp2" style="padding-right: 4px">
                <van-icon class="menu_more" name="arrow" />
              </span>
            </p>
          </div>

          <!-- 弹框说明 start -->
          <div class="mgt card">
            <van-cell is-link @click="showBounce2 = true">
              <div style="display: flex">
                <div class="shuoming">说明</div>
                <span class="detail_sp4"
                  >365天内使用有效，购买后24小时后生效，节假日不可用</span
                >
              </div>
              <!-- <span class="detail_sp2"> </span> -->
            </van-cell>
          </div>

          <!-- 弹框说明 end -->

          <div class="detail_title_Box mgt card" id="pingjia">
            <div style="display: flex; justify-content: space-between">
              <span class="detail_sp1" style="color: #969799">商品评价</span
              ><span class="detail_sp2" style="font-size: 12px"> 暂无评价</span>
            </div>
          </div>
        </article>
        <!-- <MoreShop ref="recommend"/> -->
        <article id="recommend" ref="recommend">
          <div class="recommend_Box mgt card">
            <p class="recommend_P" v-if="wnrecoment.length != 0">为你推荐</p>

            <div class="sift_Article_Box" v-if="wnrecoment.length != 0">
              <div
                class="sift_Article_Boxs"
                v-for="(item, index) in wnrecoment"
                :key="index"
              >
                <div class="img_Box2">
                  <img
                    :src="item.imgUrl"
                    onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                  />
                </div>
                <p class="article_title">{{ item.proname }}</p>
                <p class="article_price">价格：{{ item.price }}元</p>
              </div>
              <van-divider v-if="wnrecoment.length == 0">暂无推荐</van-divider>
            </div>
          </div>
        </article>

        <article id="detailDiv">
          <!-- 商品详情 tab 页 -->
          <van-divider>{{
            detailList.length ? "商品详情" : "暂无详情"
          }}</van-divider>
          <div class="detail_presentation_Box mgtttt">
            <img
              :src="item1"
              alt=""
              v-for="(item1, index) in detailList"
              :key="index"
            />
          </div>
        </article>
      </section>
      <footer></footer>
    </div>

    <div>
      <!-- 购物车 -->
      <van-goods-action class="menuBtn">
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          @click="$router.push({ path: '/' })"
        />
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />

        <van-goods-action-button
          color="#c3a769"
          text="立即购买"
          style="font-weight: 700"
          @click="isShowSku = true"
        />
        <!-- @click="choAging(3)" -->
      </van-goods-action>
    </div>

    <!-- sku上拉框 -->
    <van-sku
      v-model="isShowSku"
      :sku="sku"
      :goods="goods"
      :goods-id="obj.prdId"
      :quota="quota"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @sku-selected="skuSelect"
      @stepper-change="changeNum"
    >
      <!-- 卡券说明 -->
      <template slot="extra-sku-group">
        <div class="van-sku-group-container">
          <div class="van-sku-row van-hairline--bottom useCard">
            <div class="van-sku-row__title">卡券使用说明</div>
            <div class="useCard-item">
              365天内使用有效，购买后24小时后生效，节假日不可用
            </div>
            <div class="useCard-item">其他说明：不支持申请退款</div>
          </div>
        </div>
      </template>

      <!-- 预订时间 -->
      <!-- <template slot="sku-actions-top"> -->
      <!-- <div
          role="button"
          tabindex="0"
          class="
            van-cell van-cell--clickable van-cell--center van-cell--required
            van-field
          "
        >
          <div class="van-cell__title van-field__label">
            <span>预订时段</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body" @click="isShowDate = true">
              <input
                type="text"
                readonly="readonly"
                placeholder="请选择时间"
                class="van-field__control"
                v-model="scheduledTime"
              />
            </div>
          </div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div> -->
      <!-- <van-cell-group>
          <van-field
            class="van-cell--required van-field"
            v-model="scheduledTime"
            label="预定时段"
            @click="isShowDate = true"
            placeholder="请选择时间"
            right-icon="arrow"
            readonly
            :rules="[{ required: true, message: '请选择时间' }]"
          ></van-field>
        </van-cell-group> -->
      <!-- </template> -->

      <!-- 下一步按钮 -->
      <!-- <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button color="#c3a769" square size="large" @click="gotoPage">
            下一步
          </van-button>
        </div>
      </template> -->
    </van-sku>

    <!-- 时间组件 -->
    <!-- <van-action-sheet v-model="isShowDate" @select="onSelect">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择日期时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDatee(currentDate)"
        @cancel="cancelDatee()"
      />
    </van-action-sheet> -->

    <!-- 弹框 -->
    <!-- 服务 -->
    <van-action-sheet v-model="showBounce1" @select="onSelect">
      <div class="bouceBox">
        <div class="bounceBox-top">
          <div class="shhjs">不支持申请退款</div>
          <div class="content_color">此商品不支持买家申请退款。</div>
        </div>
        <div class="bounceBox-bottom">
          <div class="shhjs">收货后结算</div>
          <div class="content_color">
            该店铺交易由有赞提供资金存管服务，当符合以下条件时，资金自动结算给商家：买家确认收货或到达约定的自动确认收货日期。交易资金未经有赞存管的情形（储值型、电子卡券等）不在本服务范围内。
          </div>
        </div>
        <van-button
          round
          type="info"
          color="#c3a769"
          size="large"
          @click="showBounce1 = false"
          >我知道了</van-button
        >
      </div>
    </van-action-sheet>
    <!-- 说明 -->
    <van-action-sheet
      v-model="showBounce2"
      @select="onSelect"
      title="卡券使用说明"
    >
      <div class="bouceBox">
        <div class="bounceBox-top">
          <div class="shhjs">有效期</div>
          <div class="content_color">365天内使用有效</div>
        </div>
        <div class="bounceBox-top">
          <div class="shhjs">生效时间</div>
          <div class="content_color">购买后24小时后生效</div>
        </div>
        <div class="bounceBox-top">
          <div class="shhjs">节假日</div>
          <div class="content_color">节假日不可用</div>
        </div>
        <div class="bounceBox-bottom">
          <div class="shhjs">售后服务</div>
          <div class="content_color">不支持申请退款</div>
        </div>
        <van-button
          round
          type="info"
          color="#c3a769"
          size="large"
          @click="showBounce2 = false"
          >我知道了</van-button
        >
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// import { $getOnlyData } from "../../api";
import allComment from "../../components/ALLCOMMENT";
import config from "../../assets/js/config";

import {
  Swipe,
  SwipeItem,
  Icon,
  Divider,
  Button,
  Sku,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ActionSheet,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  Toast,
  NavBar,
  Sticky,
  Notify,
  Tag,
  CouponCell,
  CouponList,
  Overlay,
  Popup,
  CountDown,
} from "vant";
import MoreShop from "../../components/MoreShop.vue";
import { getOnlyData } from "../../api";
const notCol = {
  icon: "star-o",
  text: "收藏",
  color: "#646566",
};
const haveCol = {
  icon: "star",
  text: "取消收藏",
  color: "#ff5000",
};
export default {
  name: "detail",
  data() {
    return {
      active: 0,
      showBounce1: false, // 服务弹框
      showBounce2: false, // 说明弹框
      benefitsObj: {},
      bannerList: [], // 轮播图
      detailList: [], // 详情图
      heightHotel: [
        { id: 1, imgUrl: require("@/assets/img/高端酒店1.jpg") },
        { id: 2, imgUrl: require("@/assets/img/高端酒店2.jpg") },
        { id: 3, imgUrl: require("@/assets/img/高端酒店3.jpg") },
      ],
      currentSw: 0, // 顶部轮播图数字
      wnrecoment: [
        {
          id: 1,
          imgUrl: require("@/assets/img/商旅套餐1.jpg"),
          proname: "商旅权益套餐B",
          price: 1680,
        },
        {
          id: 2,
          imgUrl: require("@/assets/img/商旅套餐2.jpg"),
          proname: "三亚金凤凰海景酒店+五星酒店同款枕芯*2",
          price: 1280,
        },
        {
          id: 3,
          imgUrl: require("@/assets/img/商旅套餐3.jpg"),
          proname: "桂林大公馆一晚+五星酒店同款舒适枕2只",
          price: 699,
        },
      ], // 为你推荐
      detailUrlArr: [
        { id: 1, imgUrl: require("@/assets/img/自助餐权益.jpg") },
        { id: 2, imgUrl: require("@/assets/img/自助餐权益1.jpg") },
        { id: 3, imgUrl: require("@/assets/img/自助餐权益2.jpg") },
      ],
      zstab: [
        { id: 1, name: "商品" },
        { id: 2, name: "评价" },
        { id: 3, name: "推荐" },
        { id: 4, name: "详情" },
      ],
      isShowTabs: false, // 控制(商品、评价..)等四个tab栏显/隐
      showShare: false, // 分享上拉框
      options: [
        { name: "发送给好友", icon: "wechat" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
      ],
      isShowSku: false, // 立即购买sku上拉框
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          // {
          //   k: "餐型时段", // skuKeyName：规格类目名称
          //   k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          //   v: [
          //     {
          //       id: "1", // skuValueId：规格值 id
          //       name: "自助午餐", // skuValueName：规格值名称
          //     },
          //     {
          //       id: "2",
          //       name: "自助晚餐",
          //     },
          //   ],
          // },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 5800, // 价格（单位分）
            stock_num: 200, // 当前 sku 组合对应的库存
          },
          {
            id: 2260, // skuId
            s1: "2", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 5800, // 价格（单位分）
            stock_num: 200, // 当前 sku 组合对应的库存
          },
        ],
        price: "58.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        // messages: [
        //   {
        //     // 预订留言
        //     datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
        //     name: "预订留言",
        //     type: "text",
        //     required: "1", // 是否必填 '1' 表示必填
        //   },
        // ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      quota: null,
      // 选择的商品对象
      obj: {
        prdId: "", //商品ID
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "",
        largeImageMode: false, //  是否展示大图模式
      },
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      isShowDate: false,
      scheduledTime: "", // 预订时段
      buyNum: 1, // 购买数量
      skuVal: {}, // 餐型时段
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollx, true);
    this.getBenefitsList();
  },
  // 页面销毁删除滚动事件
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollx);
  },
  methods: {
    // tabs栏滑动自动滚动
    handleScrollx() {
      // console.log(this.$refs);
      // 只有当前组件有recommend这个ref才会执行以下逻辑，可以防止其他组件访问完详情后该组件控制台
      // 获取不到详情的ref=recommend导致一直报错的BUG
      if (this.$refs.recommend) {
        // console.log(1111);
        const clienttopCommend =
          this.$refs.recommend.getBoundingClientRect().top;
        if (clienttopCommend < 48 && -232 < clienttopCommend) {
          this.active = 2;
        } else if (clienttopCommend < -225) {
          this.active = 3;
        } else if (clienttopCommend < 107 && 43.9 < clienttopCommend) {
          this.active = 1;
        }
      }
    },
    // 分享下拉框
    onSelect(item) {
      this.showShare = false;
      this.showBounce1 = false;
      this.showBounce2 = false;
      this.isShowDate = false;
    },

    // tab栏滑动切换
    getScroll(event) {
      if (event.target.scrollTop > 200) {
        this.isShowTabs = true;
      } else {
        this.isShowTabs = false;
      }
    },
    // 去到被点击tab栏指定的位置
    gotoView(name, title) {
      switch (title) {
        case "商品":
          this.getAnchor("product");
          break;
        case "评价":
          this.getAnchor("pingjia");
          break;
        case "详情":
          this.getAnchor("detailDiv");
          break;
        case "推荐":
          this.getAnchor("recommend");
          break;
      }
    },
    // 获取元素并跳转
    getAnchor(id) {
      let anthorH = document.getElementById(id);
      anthorH.scrollIntoView(true); // 将被点击的id滚动到顶部
      // 如果页面的高度 - 当前元素在页面的高度 还大于 200就让它显示顶部tabs栏，反之隐藏
      document.body.clientHeight - anthorH.offsetTop > 200
        ? (this.isShowTabs = true)
        : (this.isShowTabs = false);
    },
    // 保存轮播图的数字
    onChangeSwipe(index) {
      this.currentSw = index;
    },

    // 点击购买回调  去到确认订单页
    onBuyClicked(obj) {
      let prodObj = {};
      console.log(obj, "obj");
      // 校验用户是否已选预订时段
      // if (!this.scheduledTime) {
      //   this.$toast.fail("请选择时间");
      // }
      if (!this.skuVal) {
        return this.$toast.fail("请选择商品属性");
      }

      // console.log("---------------------");
      // console.log(this.scheduledTime, "scheduledTime");
      // console.log(this.buyNum, "buyNum");
      // console.log(this.skuVal, "skuVal");
      // 传递给确认订单页的对象
      prodObj = {
        productId: this.benefitsObj.id,
        number: this.buyNum, // 购买数量
        mainImage: this.benefitsObj.mainImage, // 主图
        productName: this.benefitsObj.name,
        price: this.benefitsObj.price,
        // scheduledTime: this.scheduledTime,
      };
      localStorage.setItem("prodObj", JSON.stringify(prodObj));
      // 如果上面都没问题则携带选中数据跳转到确认订单页
      this.$router.push({
        path: "/comfirmOrderr",
        query: { prodType: 2 },
      });
    },
    // 点击添加购物车回调
    onAddCartClicked() {},

    // 选中规格下的某个商品属性
    skuSelect(selectObj) {
      this.skuVal = selectObj.skuValue;
    },
    // sku中的时间组件确定按钮
    confirmDatee() {
      // this.scheduledTime = this.timeFormat(this.currentDate); // 格式化时间组件
      this.isShowDate = false;
    },
    // 取消
    cancelDatee() {
      this.isShowDate = false;
    },
    // 时间格式化
    timeFormat(time) {
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

    // 监听购买数量
    changeNum(val) {
      this.buyNum = val;
    },

    // 获取自助餐详情
    async getBenefitsList() {
      const result = await getOnlyData("getBenefits", 1);
      console.log(result, "result");
      if (result.code === 0) {
        let resData = result.data;
        this.benefitsObj = resData;
        // 将详情字符串切割成数组并给每个拼接上服务器前缀
        this.detailList = resData.images
          .split(",")
          .map((item) => config.fileServerAddress + item);

        // 将主图字符串放到数组中，目的是如果后面主图轮播多了就直接切割赋值就行
        this.bannerList[0] = resData.mainImage;
        this.sku.stock_num = resData.stock; // 库存
        this.quota = resData.stock; // 库存

        this.sku.price = resData.price; // 价格
        this.goods.picture = config.fileServerAddress.concat(resData.mainImage); // 主图
        this.bannerList = this.bannerList.map(
          (item) => config.fileServerAddress + item
        ); // 轮播图
      }
    },
  },

  components: {
    MoreShop,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Sku.name]: Sku,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [ActionSheet.name]: ActionSheet,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
    [Notify.name]: Notify,
    [Tag.name]: Tag,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Overlay.name]: Overlay,
    [Popup.name]: Popup,
    allComment,
  },
};
</script>
<style scoped>
.couponsL {
  text-align: left;
}
.couponSpan {
  padding-right: 15px;
}
/* .couponsL .van-cell__value {
    max-width: 50px;
  } */
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.parents_box >>> .van-nav-bar__right > .van-nav-bar__text {
  color: black;
}
.parents_box >>> .van-nav-bar__text {
  color: black;
}
.menuBtn {
  z-index: 1999;
}

.detail_title_Box:active {
  background-color: #e8e8e8;
}

.header_menu {
  transition: all 1s;
}

.one {
  position: fixed !important;
  top: 0 !important;
  z-index: 9999;
  background-color: white;
}

.isOK_Btn {
  padding: 0;
  width: 686px;
  height: 78px;
  background: linear-gradient(to right, rgb(255, 168, 70), rgb(244, 92, 67));
  border: 0;
  color: white;
  border-radius: 40px;
  margin-bottom: 20px;
}

.pesentation_Box {
  width: 100%;
  padding-bottom: 90px;
}

.pesentation_Box1 {
  width: 100%;
  text-align: left;
}

.specification_title {
  width: 200px;
  font-size: 30px;
  color: rgb(153, 153, 153);
  display: inline-block;
}

.specification_text {
  font-size: 30px;
  color: rgb(51, 51, 51);
}

.specification_P {
  height: 90px;
  line-height: 90px;
  margin-left: 32px;
  text-align: left;
  border-bottom: 1px solid rgb(223, 223, 223);
}

.pesentation_text {
  color: rgb(102, 102, 102);
  font-size: 24px;
  padding-top: 18px;
  padding-bottom: 32px;
}

.pesentation_title {
  color: rgb(51, 51, 51);
  font-size: 30px;
  padding-top: 30px;
}

.img_Box3 {
  width: 750px;
  height: 444px;
}

.article_price {
  margin-top: 6px;
  font-size: 28px;
  color: #c3a769;
  font-weight: bold;
  margin-bottom: 34px;
}

.article_title {
  margin-top: 20px;
  font-size: 26px;
  /* color: rgb(51, 51, 51); */
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 70px;
}

.article_title > span {
  display: inline-block;

  overflow: hidden;
  text-align: left;
}

.sift_Article_Boxs {
  width: 33.33%;
  margin-right: 10px;
}

.img_Box2 {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  overflow: hidden;
}

.sift_Article_Box {
  display: flex;
  margin-top: 32px;
  overflow-y: scroll;
}

.recommend_Box {
  padding: 24px 24px;
}

.recommend_P {
  text-align: left;
  color: rgb(51, 51, 51);
  font-size: 30px;
}

.comment_Content {
  color: rgb(51, 51, 51);
  text-align: left;
  font-size: 26px;
  margin-top: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.user_name {
  color: rgb(153, 153, 153);
  font-size: 26px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.user_Box {
  text-align: left;
  margin-top: 20px;
}

.img_Box1 {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
}

.va_middle {
  vertical-align: middle;
}

.color {
  color: rgb(235, 101, 101);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.color > div:first-child {
  margin-right: 2vw;
}
.detail_sp6 {
  /* text-decoration: line-through; */
  color: rgb(138, 138, 138);
  font-size: 20px;
}

.detail_sp5 {
  /* text-decoration: line-through; */
  color: #c3a769;
  font-size: 40px;
  font-weight: 600;
}

.detail_sp4 {
  color: rgb(51, 51, 51);
  font-size: 34px;
  margin-right: 28px;
}

.detail_sp3 {
  color: rgb(235, 101, 101);
  font-size: 36px;
  margin-left: 5vw;
}

.menu_more {
  vertical-align: middle;
  color: #9699a6;
  font-size: 34px;
}

.mgt {
  margin-top: 22px;
  font-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.mgtttt {
  margin-top: 22px;
  font-size: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.detail_sp2 {
  float: right;
  color: #969799;
  font-size: 26px;
}

.detail_sp1 {
  display: inline-block;
  color: #969799;
  padding-right: 36px;
  font-size: 26px;
}
.detail_sp4 {
  display: inline-block;
  color: #323233;
  /* padding-right: 30px; */
  font-size: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.detail_p1 {
  text-align: left;
  font-size: 26px;
}

.card {
  background-color: white;
}

.header_Content {
  position: relative;
  background-color: white;
}

.detail_p {
  color: rgb(51, 51, 51);
  font-size: 34px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: left;
  margin: 5px 0;
}

.detail_title_Box {
  padding: 24px 24px;
  text-align: left;
  margin-top: 10px;
}

.buyCard,
.more {
  float: right;
  margin-right: 32px;
  vertical-align: middle;
}

img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.icon_sty {
  line-height: 64px;
}

.back {
  vertical-align: middle;
  float: left;
  margin-left: 32px;
}

.img_Box {
  width: 750px;
  height: 450px;
  line-height: 450px;
  font-size: 0;
}

.van_detail {
  position: relative;
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  margin-bottom: 50px;
}
.van-popup {
  border-radius: 1vw;
  overflow: hidden;
}
.fxhb {
  position: absolute;
  width: 150px;
  height: 60px;
  right: 2vw;
  top: 8vw;
  z-index: 99;
}

.fxhb > img {
  content: normal !important;
  width: 100%;
  height: 100%;
  border-radius: 50px;
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
}
.bounceBox-top {
  padding-top: 24px;
  font-size: 18px;
  font-weight: 500;
}
.bounceBox-bottom {
  padding-top: 30px;
  font-weight: 500;
  line-height: 20px;
  padding-bottom: 100px;
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
.shuoming {
  width: 12.4vw;
  color: #969799;
}
.custom-indicator {
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: 16px;
  color: white;
  padding: 3px;
}
/* 分享 */
.shareBox {
  position: absolute;
  width: 7.667vw;
  top: 45px;
  right: -18px;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #646566;
}
.shareBottom {
  font-size: 12px;
}
.productSay {
  width: 100%;
  height: 300px;
  background-color: pink;
}
/deep/ .van-tabs {
  display: block;
}
/deep/ .van-sku__goods-price {
  color: #c2a971;
}
/deep/ .van-hairline--bottom {
  text-align: left;
}
/deep/ .van-sku__stepper-quota {
  color: #969799;
}
/deep/ .van-sku-messages {
  padding-bottom: 0 !important;
}

/deep/ .van-sku-row__item--active {
  color: #c3a769;
}
/deep/ .van-button--warning {
  display: none;
}
/deep/ .van-button:last-of-type {
  border-radius: 20px;
}
.useCard {
  border-radius: 16px;
  background-color: #f8f8f8;
  font-size: 22px;
  padding: 14px;
}
.useCard-item {
  color: #9b9b9b;
  font-size: 22px;
}
</style>
