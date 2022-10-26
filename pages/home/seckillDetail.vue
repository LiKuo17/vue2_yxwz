<template>
      <div class="parents_box">
            <div class="parent_box">
                  <header>
                        <div class="header_Box">
                              <van-sticky :z-index="9999">
                                    <van-nav-bar title="商品详情" left-arrow @click-left="back" @click-right="openShare">
                                          <template #right>
                                                <van-icon name="share-o" color="#5f656b" size="20" />
                                          </template>
                                    </van-nav-bar>
                              </van-sticky>
                        </div>
                  </header>
                  <div class="van_detail" ref="datail">
                        <!-- 轮播图区域 start -->
                        <header>
                              <div>
                                    <div class="header_Content">
                                          <van-swipe :autoplay="300000" indicator-color="white" :loop="false">
                                                <van-swipe-item v-for="(item, index) in obj.ImageList" :key="index">
                                                      <div class="img_Box">
                                                            <img
                                                                  :src="ImgServerAddress + item"
                                                                  onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                                                            />
                                                      </div>
                                                </van-swipe-item>
                                          </van-swipe>
                                    </div>
                              </div>
                        </header>
                        <!-- 轮播图区域 end -->
                        <div style="">
                              <div>
                                    <div class="ms-bar">
                                          <div v-if="status == 0" class="ms-bar-text">
                                                <div style="display: inline-block; fontSize: 12px">距离开抢时间</div>
                                                <div style="display: inline-block;">
                                                      <van-count-down :time="begintime - new Date().getTime()" :finish="finish">
                                                           
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

                                          <div v-else-if="status == 1" class="ms-bar-text">
                                                <div style="display: inline-block;">距离结束还有</div>
                                                <div style="display: inline-block;">
                                                      <van-count-down :time="remaintime" :finish="finish">
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

                                          <div v-else-if="status == 2" class="ms-bar-text">
                                                <div style="display: inline-block;">已结束</div>
                                                <div style="display: inline-block;">
                                                      <van-count-down :time="0">
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
                                          <div style="clear:both;"></div>
                                    </div>
                              </div>
                        </div>
                        <section>
                              <article>
                                    <div class="detail_title_Box mgt card">
                                          <p class="detail_p1">
                                                <!-- <span class="detail_sp3">{{obj.loanPrice | NumFormat}}{{obj.loansNum==0?'元':'x'+obj.loansNum+'期'}}</span> -->
                                                <div style="display:flex;justifyContent: space-between; alignItems: center;"> 
                                                      <div style="display:flex;flexDirection: column;justifyContent: start;">
                                                            
                                                            <span class="detail_sp3">秒杀价：{{ obj.amount | NumFormat }}元</span>
                                                            <span class="detail_sp5">原价：{{ isNaN(obj.oldprice / 100) ? "暂无" : obj.oldprice / 100 + "元" }}</span>
                                                       </div>
                                                
                                                      <span style="marginLeft:10px; color:#d0332e; fontSize: 16px;">库存:{{obj.skuStock}}</span>
                                                </div>  
                                          </p>
                                    </div>

                                    <div class="detail_title_Box card" style="padding-top: 0;">
                                          <p class="detail_p">
                                                {{ obj.prdname }}
                                          </p>
                                          <span class="detail_sp1" v-if="features">{{ features }}</span>
                                    </div>

                                    <div class="detail_title_Box mgt card" @click="show = true">
                                          <p class="detail_p1" v-if="initialSku.s1value == undefined">
                                                <span class="detail_sp1">规格</span><span>选择尺寸&nbsp;&nbsp;颜色分类</span
                                                ><span class="detail_sp2"> <van-icon class="menu_more" name="arrow"/></span>
                                          </p>

                                          <p v-else-if="initialSku.s1value != undefined">
                                                {{ initialSku }}
                                                <span class="detail_sp1">规格</span>
                                                <span class="detail_sp1">{{ initialSku.s1value }}&nbsp;/&nbsp;{{ initialSku.s2value }}</span>
                                                <span class="detail_sp2"><van-icon class="menu_more" name="arrow"/></span>
                                          </p>
                                    </div>

                                    <div class="detail_title_Box mgt card" v-if="remark">
                                          <p class="detail_p1">
                                                <span class="detail_sp1">{{ remark }}</span>
                                          </p>
                                    </div>

                                    <div class="mgt couponsL">
                                          <van-cell
                                                title="商家"
                                                title-style="min-width: 220px;"
                                                label="本商品由深圳市雅棉居品数据股份有限公司销售"
                                                value="点击查看详情"
                                                is-link
                                                :to="'/storeDetail?bizid=' + obj.bizid"
                                          ></van-cell>
                                    </div>
                              </article>
                              <article>
                                    <div class="recommend_Box mgt card">
                                          <p class="recommend_P" v-if="recommendProductList.length != 0">
                                                为你推荐
                                          </p>
                                          <van-swipe
                                                :autoplay="3000"
                                                indicator-color="white"
                                                :indicator-color="indicatorColor"
                                                :show-indicators="false"
                                          >
                                                <van-swipe-item>
                                                      <div class="sift_Article_Box" v-if="recommendProductList.length != 0">
                                                            <div
                                                                  class="sift_Article_Boxs"
                                                                  v-for="(item, index) in recommendProductList.slice(0, 3)"
                                                                  :key="index"
                                                                  @click="goRecommend(item.prdno)"
                                                            >
                                                                  <div class="img_Box2">
                                                                        <img
                                                                              :src="ImgServerAddress + item.mainimage"
                                                                              onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                                                                        />
                                                                  </div>
                                                                  <p class="article_title">{{ item.prdname }}</p>
                                                                  <p class="article_price">价格：{{ item.saleprice }}元</p>
                                                            </div>
                                                            <van-divider v-if="recommendProductList.length == 0">暂无推荐</van-divider>
                                                      </div>
                                                </van-swipe-item>
                                          </van-swipe>
                                    </div>
                              </article>

                              <article>
                                    <van-tabs v-model="active" animated>
                                          <!-- 商品详情 tab 页 -->
                                          <van-tab title="商品详情">
                                                <van-divider>{{ obj.description == "" ? "暂无详情" : "商品详情" }}</van-divider>
                                                <div class="detail_presentation_Box mgt ">
                                                      <div v-html="obj.description"></div>

                                                      <h5
                                                            style="line-height: 50px;height: 50px;text-align: center;font-size: 14px;margin-bottom: 50px;"
                                                      >
                                                            <span style="color: #999999;">
                                                                  <a style="color: #999999;" href=" ">营业执照</a>丨
                                                                  <a
                                                                        style="color: #999999;"
                                                                        href="https://cmbc.iliving.cn/#/active?pageId=information1"
                                                                        >常见问题</a
                                                                  >丨
                                                                  <a
                                                                        style="color: #999999;"
                                                                        href="https://cmbc.iliving.cn/#/active?pageId=information2"
                                                                        >用户协议</a
                                                                  >
                                                            </span>
                                                      </h5>
                                                </div>
                                          </van-tab>
                                          <!-- 参数 tab 页 -->
                                          <van-tab title="参数">
                                                <van-divider>参数详情</van-divider>
                                                <div class="pesentation_Box">
                                                      <p class="specification_P" v-for="(item, index) in attributesList" :key="index">
                                                            <span class="specification_title">{{ item.name }}</span
                                                            ><span class="specification_text">{{ item.value }}</span>
                                                      </p>
                                                </div>
                                          </van-tab>
                                    </van-tabs>
                              </article>
                        </section>
                        <footer></footer>
                  </div>
            </div>

            <div>
                  <van-goods-action class="menuBtn">
                        <van-goods-action-button v-if="status == 0" type="danger" text="即将开始" @click="hint('敬请期待！')" />
                        <van-goods-action-button v-else-if="status == 1" type="danger" text="立即抢购" @click="choAging(3)" />
                        <van-goods-action-button v-else-if="status == 2" disabled type="danger" text="已结束" />
                  </van-goods-action>

                  <van-sku
                        v-model="show"
                        style="text-align: left;"
                        :sku="sku"
                        :goods-id="obj.prdId"
                        :goods="goods"
                        :quota="quota"
                        :quota-used="quotaUsed"
                        :hide-stock="sku.hide_stock"
                        :initial-sku="initialSku"
                        @buy-clicked="onBuyClicked"
                        @add-cart="onAddCartClicked"
                        @sku-selected="skuSelect"
                        @stepper-change="doCount"
                        :buy-text="buytext"
                        :show-add-cart-btn="false"
                        :close-on-click-overlay="defaulttrue"
                  >
                        <template slot="extra-sku-group" slot-scope="props">
                              <div class="van-sku-group-container">
                                    <div class="van-sku-row van-hairline--bottom">
                                          <div class="van-sku-row__title">分期</div>
                                          <!-- <span
                                                class="van-sku-row__item"
                                                v-for="(item, index) in obj.loansList"
                                                :key="index"
                                                @click="chongzuLoan(item.instalments)"
                                          >
                                                <span
                                                      class="van-sku-row__item-name"
                                                      :class="FenQi == item.instalments ? 'van-sku-row__item--active' : ''"
                                                      >{{
                                                            item.instalments == 0
                                                                  ? "全款：" + item.amount_all.toFixed(2) + "元"
                                                                  : "分期：" + item.instalments + "期 X " + item.amount_month.toFixed(2) + "元"
                                                      }}</span
                                                >
                                          </span> -->
                                          <span
                                                v-for="(item, index) in stagList"
                                                :key="index"
                                                class="van-sku-row__item"
                                                :class="{ 'van-sku-row__item--active': item.active }"
                                                @click="
                                                      stagList = stagList.map((item1, index1) => ({
                                                            ...item1,
                                                            active: index == index1 ? !item1.active : false,
                                                      }))
                                                "
                                          >
                                                <span class="van-sku-row__item-name" :class="{ 'van-sku-row__item--active': item.active }">
                                                      <span>￥</span>
                                                      <span>{{ item.instalmentPrice }}</span>
                                                      <span>×</span>
                                                      <span>{{ item.instalmentNum }}</span>
                                                      <span>期</span>
                                                </span>
                                          </span>
                                    </div>
                              </div>
                        </template>

                        <template slot="sku-actions">
                              <div
                                    class="van-sku-actions"
                                    @click="
                                          isDisableOperation && selectedSkuComb
                                                ? $toast('该规格无库存')
                                                : isDisableOperation && !selectedSkuComb
                                                ? $toast('请选择规格')
                                                : false
                                    "
                              >
                                    <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                                    <van-button :disabled="isDisableOperation" square size="large" type="danger" @click="Buy()">
                                          立即抢购
                                    </van-button>
                              </div>
                        </template>
                  </van-sku>
            </div>
      </div>
</template>

<script>
import config from "@/assets/js/config";
import uitl from "@/assets/js/fun";

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
export default {
  name: "seckillDetail",
  data() {
    return {
      defaultfalse: false,
      defaulttrue: true,
      selectSku: {},
      quota: 0, //限购
      quotaUsed: 0, //购买过的数量
      buytext: "确认",
      fromTo: -1,
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: "2000",
        s2: "1000",
        // 初始选中数量
        selectedNum: 1,
        s1value: "",
      },
      recommendProductList: [],
      active: 0,
      indicatorColor: "#666666",
      attributesList: [], //商品属性
      goodsId: 100001, //商品ID
      is_hide_stock: true, //是否显示商品剩余库存
      show: false, //弹出层1是否显示
      allloan: [1, 3, 6, 12, 24],
      show2: false,
      ImgServerAddress: config.fileServerAddress,
      obj: {
        prdId: "1", //商品ID
        prdname: "", //商品名称
        installmentsList: [],
        ImageList: [], //轮播图片
        price: 0, //商品价格   (注意：会根据分期数变化)
        loansNum: 1, //分期数
        loansList: [], //可选分期
        selectLoanIndex: 0, //选择
        loanPrice: 0, //每期价格
        loanCount: 0, //期数
        oldprice: 0, //商品原价
        salePrice: 0, //商品售价
        quantity: 1, //数量
        amount: 0, // 商品秒杀价
        description: "",
        stockTotal: 0, // 库存
        skuStock: 0, // 秒杀sku库存
      },
      seckillDetailData: {}, // 无修改的当前秒杀详情的所有数据
      FenQi: 0,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "121", // skuValueId：规格值 id
                name: "1.2m床【被套150×210cm/床单160×230cm】", // skuValueName：规格值名称
                imgUrl: "",
              },
              {
                id: "122",
                name: "1.5m床【被套150×210cm/床单160×230cm】",
                imgUrl: "",
              },
              {
                id: "123",
                name: "1.8m床【被套150×210cm/床单160×230cm】",
                imgUrl: "",
              },
            ],
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "粉色", // skuValueName：规格值名称
              },
              {
                id: "2",
                name: "蓝色",
              },
              {
                id: "3",
                name: "绿色",
              },
              {
                id: "4",
                name: "黑色",
              },
            ],
            k_s: "s2", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            //						id: 2259, // skuId，下单时后端需要
            //						price: 100, // 价格（单位分）
            //						s1: '121', // 规格类目 k_s 为 s1 的对应规格值 id
            //						s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
            //						s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            //						stock_num: 110 // 当前 sku 组合对应的库存
          },
        ],
        price: "99.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "../../static/img/test_red.png",
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise((resolve) => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx",
        },
      },
      fq_Count: 0,
      fq_Price: 0,
      fq_Num: 0,
      features: "",
      remark: "",
      couponsTitle: [],
      // couponsList:[],
      show3: false,
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      pageId: "",
      outflag: "",
      seckill_id: -1, //秒杀id
      remaintime: 0, // 秒杀倒计时
      begintime: 0, // 秒杀开始时间
      createtime: 0,
      status: -1, // 秒杀状态
      seckillprice: -1, // 秒杀价格
      stagList: [],
      isDisableOperation: true,
      selectedSkuComb: null,
      showPoster: false,
      posterSrc: "",
    };
  },
  created() {
    var _this = this;
    _this.seckill_id = _this.$route.query.id | Number;
    _this.changeToken();
    _this.goDetailData(_this.$route.query.prdid);
  },
  mounted() {
    var _this = this;

    var scDom = _this.$refs.datail;
    // scDom.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    openShare() {
      isApp().then(() => {
        openShare({
          title: "大农商商城",
          shareUrl: location.href,
          abstractX: this.obj.prdname,
          sharePic: this.$fun.getImageUrl(this.obj.ImageList[0]),
        });
      });
    },
    changeToken() {
      var _this = this;
      if (
        _this.$route.query.resp != undefined &&
        _this.$route.query.resp != null &&
        _this.$route.query.resp != ""
      ) {
        //拥有resp参数，重新登陆
        _this.$http
          .post("/m/bank/minsheng/login/api/common/ssologin_callback", {
            params: _this.$route.query.resp,
          })
          .then(function (e) {
            if (e.result == 0) {
              // 登录成功
              // Notify({ type: 'success', message: e.msg });
            } else {
              Notify({
                type: "danger",
                message: e.msg,
              });
            }
          });
      }
    },

    goRecommend(no) {
      var _this = this;
      //var url = window.location.href;
      // window.location.href = ;
      //location.replace(url.split('?')[0] + '?prdno=' + no);
      //history.go(0);
      //console.log();
      this.$router.push({
        path: "/detail",
        query: {
          prdno: no,
        },
      });
    },

    chongzuLoan(_instalments) {
      this.FenQi = _instalments;
      this.fromTo = -1;
      this.doLoan();
    },

    // handleScroll(event) {
    //   var _this = this;
    //   if (event.target.scrollTop > 200) {
    //     _this.$refs.menu.classList.add('one');
    //   } else {
    //     _this.$refs.menu.classList.remove('one');
    //   }

    // },
    Buy() {
      if (this.selectedSkuComb) {
        let currentSkuId = this.selectedSkuComb.id;
        let seckillList = this.seckillDetailData.map((item) => item._seckill); // 获取秒杀列表
        let currentSeckillGood = seckillList.filter(
          (item) => item.skid == currentSkuId
        ); // 过滤出当前秒杀的商品
        this.seckill_id = currentSeckillGood[0].id; // 获取最终的秒杀id
      } else {
        this.$toast("请选择规格");
      }
      let activeStag = this.stagList.find((item) => item.active);
      if (!activeStag) return this.$toast("请选择分期期数");
      // alert("测试");
      var idsList = [];
      // debugger;
      this.obj.loansNum = this.FenQi;
      var objJson = JSON.stringify(this.obj);
      if (isNaN(this.obj.oldprice)) {
        Toast("该商品已被抢光！");
        return;
      }

      this.$router.push({
        path: "/confirmOrder",
        query: {
          seckill_id: this.seckill_id,
          froms: "seckill",
          ids: -1,
          obj: objJson,
          pageId: this.pageId,
          outflag: this.outflag,
          ccbInsInfo: JSON.stringify(activeStag || {}),
        },
      });
    },
    choAging(fromto) {
      this.show = true;
      this.fromTo = fromto;
    },
    doLoan() {
      var _this = this;

      _this.obj.loanCount = _this.obj.loansList[_this.FenQi].instalments;
      _this.obj.loanPrice = _this.obj.loansList[_this.FenQi].amount_month;
      _this.obj.loansNum = _this.obj.loansList[_this.FenQi].instalments;
      _this.fq_Count = _this.obj.loansList[_this.FenQi].instalments;
      _this.fq_Price = _this.obj.loansList[_this.FenQi].amount_month;
      _this.fq_Num = _this.obj.loansList[_this.FenQi].instalments;
      if (this.fromTo == 2) {
        this.addBuyCar();
      } else if (this.fromTo == 3) {
        this.Buy();
      }
      this.$forceUpdate();
    },
    onBuyClicked(obj) {
      this.show = false;
    },
    onAddCartClicked() {},
    goallcomment() {
      this.$router.push("/allcomment");
    },
    gobuyCard() {
      this.$router.push("/shoppingcart");
    },
    addBuyCar() {
      var _this = this;
      console.log(_this.FenQi);
      if (isNaN(_this.obj.oldprice)) {
        Toast("商品库存不足");
        return;
      }
      _this.$http
        .post("/m/shopcart/api/addToCart", {
          prdId: _this.obj.prdId,
          skuType1: _this.obj.sku_type1,
          skuType2: _this.obj.sku_type2,
          instalments: _this.FenQi,
          quantity: _this.obj.quantity,
        })
        .then(function (e) {
          if (e.result == 0) {
            Toast("添加购物车成功");
            _this.goShoppingCar();
          } else {
            Toast(e.msg);
          }
        });
    },
    goShoppingCar() {
      localStorage.setItem("active", 0);
      this.$router.push("/shoppingcart");
    },
    // 获取商品详情
    goDetailData(prdidQuery) {
      // debugger;
      var _this = this;
      var _params = {};

      var spid = _this.$route.query.id;
      _params.spid = spid;

      var prdid = _this.$route.query.prdid;
      _params.prdId = prdid;

      _this.$http
        .get("/m/seckill/api/common/seckillProductsDetail", {
          params: _params,
        })
        .then((e) => {
          if (e.result == 0) {
            this.seckillDetailData = e.data;
            let currentData = e.data.filter((item) => item.prdid == prdidQuery); // 获取当前商品prdid的商品信息
            console.log(currentData, "currentData");
            // let data = currentData.reduce(((r, c) =>Object.assign(r, c)), {}) // 重组e.data对象
            let data = Object.assign(currentData, ...currentData);
            console.log(data, "datadatadata");
            _this.obj.salePrice = data.saleprice;

            // 重组库存stocks
            let stocks = currentData.map((item) => {
              return {
                ...item,
                _stocks: {
                  ...item._stocks[0],
                  stock: item._seckill.stock,
                },
              };
            });
            // 获取库存信息

            let newStocks = stocks.map((item) => item._stocks); //取出重组stocks中的_stocks

            // 重组price
            let prices = currentData.map((item) => {
              return {
                ...item,
                _prices: {
                  ...item._prices[0],
                  price: item._seckill.seckillprice,
                  saleprice: item._seckill.seckillprice,
                },
              };
            });
            console.log(prices, "pricesprices");
            let newdata = prices.map((item) => item._prices);
            console.log(newdata, "newdata");
            // let pricesData = e.data.map(item=>item._prices)
            // console.log(pricesData,'pricesData');
            // var newdata = [];
            // pricesData.map(value => {
            //       newdata = newdata.concat(value);
            // });

            // console.log(newdata,'newdata');
            // 秒杀相关信息
            var _seckill = currentData[0]._seckill;
            console.log(_seckill, "_seckill_seckill_seckill_seckill_seckill");
            var status = _seckill.status; // 秒杀状态 0 未开始 1 已开始 2 已结束
            var remaintime = _seckill.remaintime; // 秒杀倒计时
            var quantity = _seckill.quantity; // 秒杀商品总数量
            var stock = _seckill.stock; // 剩余数量
            var skid = _seckill.skid; //
            var seckillprice = _seckill.seckillprice; // 秒杀价格
            var begintime = _seckill.begintime; // 秒杀开始时间
            var createtime = _seckill.createtime; // 商品创建时间
            var limitbuy = _seckill.limitbuy; // 限购

            (_this.remaintime = remaintime), // 秒杀倒计时
              (_this.begintime = begintime), // 秒杀开始时间
              (_this.status = status), //秒杀状态
              (_this.seckillprice = seckillprice); // 秒杀价格
            console.log(_this.seckillprice, "_this.seckillprice");
            _this.quota = limitbuy; // 限购

            // 修改规格信息
            data._prices[0].instalments = 0; // 设置不能分期
            data._prices[0].saleprice = seckillprice; //售价

            // 修改库存信息
            data._stocks[0].stock = stock; // 库存

            _this.features = e.data.features; //产品特征
            _this.remark = e.data.remark;

            // 获取推荐商品
            _this.getRecommendProduct(data.prdid);
            //console.log('------获取商品详情-------')
            //console.log(data);
            _this.obj.bizid = data.bizid;
            // 供应商名称
            _this.obj.prdname = data.bizname;
            // 供应商描述
            _this.obj.description = data.description;

            // 价格、型号等数据
            data._prices = newdata;
            data._stocks = newStocks;
            for (let j = 0; j < data._prices.length; j++) {
              // console.log(data._prices.length,'data._prices.length');
              let item = data._prices[j];
              // console.log(item,'itemitemitemitem');
              for (let i = 0; i < data._stocks.length; i++) {
                let item1 = data._stocks[i];
                // console.log(item1,'item1item1');
                if (
                  item.sku_type1 == item1.sku_type1 &&
                  item.sku_type2 == item1.sku_type2
                ) {
                  item.stock_num = item1.stock;
                  item.price = item.saleprice;
                  item.oldprice = item1.oldprice;
                }
              }
              data._prices[j] = item;
            }

            // 品牌相关信息
            _this.attributesList = data._attributes;

            // 商品图片
            if (data.images == undefined) {
              data.images = "";
            }
            if (data.images.indexOf(",") != -1) {
              _this.obj.ImageList = data.images.split(",");
            } else {
              _this.obj.ImageList.push(data.images);
            }

            _this.obj.prdname = data.prdname;
            _this.obj.price = data._prices[0].saleprice * 100;
            _this.obj.oldprice = data._prices[0].oldprice * 100;
            _this.obj.prdId = data.prdid;
            _this.obj.description = data.description;
            _this.obj.stockTotal = data.stockTotal;
            console.log(data, "data._seckilldata._seckilldata._seckill");
            _this.obj.skuStock = data._seckill.stock;
            var tree = [];
            var obj = {
              k: "颜色",
              v: [],
              k_s: "ys",
            };

            var obj1 = {
              k: "规格",
              v: [],
              k_s: "gg",
            };

            var sku_typeList1 = [];
            var sku_typeList2 = [];
            var sku_typeOjbList1 = [];
            var sku_typeOjbList2 = [];
            var specification = [];
            console.log(
              data._prices,
              "data._pricesdata._pricesdata._pricesdata._prices"
            );

            for (var i = 0; i < data._prices.length; i++) {
              var item = data._prices[i];
              if (sku_typeList1.indexOf(item.sku_type1) == -1) {
                sku_typeList1.push(item.sku_type1);
              }
              if (sku_typeList2.indexOf(item.sku_type2) == -1) {
                sku_typeList2.push(item.sku_type2);
              }

              specification.push({
                sku_type1: item.sku_type1,
                sku_type2: item.sku_type2,
              });
            }

            sku_typeList1.forEach(function (item, index) {
              var obj = {
                id: "200" + index,
                name: item,
                imgUrl: "",
              };
              try {
                data._stocks.forEach(function (item1) {
                  if (item1.sku_type1 == obj.name) {
                    obj.imgUrl = config.fileServerAddress + item1.iconurl;
                    obj.oldprice = item1.oldprice * 100;
                    throw Error();
                  }
                });
              } catch (e) {
                //console.log('获取图片');
              }
              sku_typeOjbList1.push(obj);
            });

            sku_typeList2.forEach(function (item, index) {
              var obj = {
                id: "100" + index,
                name: item,
              };
              sku_typeOjbList2.push(obj);
            });
            for (var i = 0; i < data._prices.length; i++) {
              var item = data._prices[i];
              var oldvalue = item.saleprice * 100;
              item.saleprice = item.price * 100;
              item.price = oldvalue;
              sku_typeOjbList1.forEach(function (item1) {
                if (item.sku_type1 == item1.name) {
                  item.s1 = item1.id;
                }
              });

              sku_typeOjbList2.forEach(function (item2) {
                if (item.sku_type2 == item2.name) {
                  item.s2 = item2.id;
                }
              });
            }
            _this.sku.tree[0].v = sku_typeOjbList1;
            console.log(_this.sku.tree[0].v, "_this.sku.tree[0].v");
            _this.sku.tree[1].v = sku_typeOjbList2;
            console.log(_this.sku.tree[1].v, "_this.sku.tree[1].v");
            _this.initialSku.s1 = data._prices[0].s1;
            _this.initialSku.s2 = data._prices[0].s2;

            _this.sku.stock_num = data._prices[0].stock_num;
            _this.initialSku.s1value = data._prices[0].sku_type1;
            _this.initialSku.s2value = data._prices[0].sku_type2;
            _this.obj.sku_type1 = data._prices[0].sku_type1;
            _this.obj.sku_type2 = data._prices[0].sku_type2;
            _this.sku.list = newdata;

            var unicode1 = data._prices[0].sku_type1;
            var unicode2 = data._prices[0].sku_type2;
            //console.log(_this.obj);

            // 获得分期价格
            _this.getLoanPrice(
              _this.obj.prdId,
              unicode1,
              unicode2,
              _this.obj.selectLoanIndex,
              1
            );

            // 获得分期价格列表
            _this.getstagesList(_this.obj.prdId, unicode1, unicode2, 1);
            _this.$forceUpdate();

            _this.goods.title = _this.obj.prdname; //设置默认选择sku名称
            _this.goods.picture =
              _this.ImgServerAddress + _this.obj.ImageList[0]; //设置默认选择sku图片

            var sortList = [];
            var all_stock_num = 0;
            _this.sku.list.forEach(function (item) {
              sortList.push(item.saleprice);
              if (item.stock_num != undefined || !isNaN(item.stock_num)) {
                all_stock_num += item.stock_num;
              }
            });
            uitl.listBubbleSort(sortList);

            _this.sku.price =
              (sortList[0] / 100).toFixed(2) +
              " ~ " +
              (sortList[sortList.length - 1] / 100).toFixed(2); //设置默认不选中sku时的价格区间
            _this.sku.stock_num = all_stock_num; ////设置默认不选中sku时的全部库存

            this.stagList =
              data.numberstages && data.numberstages.length
                ? data.numberstages.split(",").map((item) => ({
                    instalmentNum: Number(item),
                    instalmentPrice: (
                      this.obj.price /
                      100 /
                      Number(item)
                    ).toFixed(2),
                  }))
                : [];
            if (!this.stagList.length) {
              this.$toast("该商品不支持分期，请选择分期商品");
              return this.$router.back();
            }
          } else {
            Toast(e.msg);
            _this.$router.go(-1);
          }
        });
    },
    getLoanPrice(_prdId, _skutype1, _skutype2, _instalments, _count) {
      var _this = this;
      var unicode1 = _skutype1;
      var unicode2 = _skutype2;
      _this.$http
        .get("/m/products/common/api/calcAmount", {
          params: {
            prdId: _prdId,
            skuType1: unicode1,
            skuType2: unicode2,
            instalments: _instalments,
            quantity: _count,
          },
        })
        .then(function (e) {
          if (e.result == 0) {
            _this.obj.loansNum = e.data.instalments;
            _this.obj.loanPrice = e.data.amount_month;
            // _this.obj.amount = e.data.amount;
            // 秒杀价格
            _this.obj.amount = _this.seckillprice;
            console.log(
              _this.obj.amount,
              "_this.obj.amount_this.obj.amount_this.obj.amount_this.obj.amount"
            );
          } else {
          }
        });
    },
    skuSelect(selectSku) {
      console.log(selectSku, "selectSkuselectSkuselectSku");
      if (selectSku.selectedSkuComb) {
        this.selectedSkuComb = selectSku.selectedSkuComb;
        if (selectSku.selectedSkuComb.stock_num) {
          this.isDisableOperation = false;
        } else {
          this.isDisableOperation = true;
        }
      } else {
        this.selectedSkuComb = null;
        this.isDisableOperation = true;
        return false;
      }
      var _this = this;
      var payMoney = selectSku.selectedSkuComb.saleprice; //选择的实际单价

      _this.obj.loansNum = selectSku.selectedSkuComb.instalments; //选择的SKU支持的分期数

      _this.obj.price = payMoney;
      var fenqi = selectSku.selectedSkuComb.instalments;
      _this.obj.sku_type1 = selectSku.selectedSkuComb.sku_type1;
      _this.obj.sku_type2 = selectSku.selectedSkuComb.sku_type2;
      _this.initialSku.s1value = selectSku.selectedSkuComb.sku_type1;
      _this.initialSku.s2value = selectSku.selectedSkuComb.sku_type2;
      _this.obj.loanCount = 0;
      _this.FenQi = 0;
      _this.obj.oldprice = selectSku.selectedSkuComb.oldprice * 100;
      _this.getstagesList(
        _this.obj.prdId,
        _this.obj.sku_type1,
        _this.obj.sku_type2,
        _this.obj.quantity
      );
    },
    getstagesList(prdId, skutype1, skutype2, quantity) {
      var _this = this;
      _this.$http
        .get("/m/products/common/api/calcInstalmentsAmount", {
          params: {
            prdId: prdId,
            skuType1: skutype1,
            skuType2: skutype2,
            quantity: quantity,
          },
        })
        .then(function (e) {
          if (e.result == 0) {
            var temp = e.data;
            var seckillprice = _this.seckillprice;
            var data = [
              {
                ...temp[0],
                amount: seckillprice * quantity,
                amount_all: seckillprice * quantity,
                amount_month: seckillprice * quantity,
                saleprice: seckillprice,
              },
            ];
            _this.obj.loansList = data;
          }
        });
    },
    doCount(number) {
      var _this = this;
      _this.obj.quantity = number;
      _this.getstagesList(
        _this.obj.prdId,
        _this.obj.sku_type1,
        _this.obj.sku_type2,
        _this.obj.quantity
      );
    },
    getRecommendProduct(_prdId) {
      var _this = this;
      _this.$http
        .get("/m/products/common/api/getRecommandsByCate", {
          params: {
            prdId: _prdId,
          },
        })
        .then(function (e) {
          if (e.result == 0) {
            //console.log('------获取推荐列表-------')
            //console.log(e);
            _this.recommendProductList = e.data.slice(0, 3);
          }
        });
    },
    back() {
      if (window.history.length <= 1) {
        Fw.returnPage();
      } else {
        this.$router.go(-1);
      }
    },
    getTimeforTimestamp(s) {
      // debugger;
      // var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");
      return uitl.getTimeforTimestamp(s);
    },
    // 提示
    hint(msg) {
      Toast(msg);
    },
    // 倒计时结束,从新获取数据
    finish() {
      let _this = this;
      _this.getSeckillData();
    },
  },
  watch: {
    status: {
      handler(newV) {
        //如果秒杀未开始
        if (newV == 0) {
          //则持续监听秒杀是否开始
          let timer = setInterval(() => {
            //若开始则重新获取秒杀信息
            if (this.begintime <= new Date().getTime()) {
              this.goDetailData();
              clearInterval(timer);
            }
          }, 1000);
        }
      },
      immediate: true,
    },
    show(val) {
      var _this = this;
      if (val == false) {
        var fenqi = _this.obj.loansNum;
        var prdId = _this.obj.prdId;
        var count = _this.obj.quantity;
        var type1 = _this.obj.sku_type1;
        var type2 = _this.obj.sku_type2;
        _this.obj.oldprice = _this.obj.oldprice * count;
        _this.getLoanPrice(
          prdId,
          type1,
          type2,
          _this.obj.selectLoanIndex,
          count
        );
        _this.getstagesList(prdId, type1, type2, count);
      }
    },
    $route(to, from) {
      this.$router.go(0);
    },
  },
  computed: {
    zj: function () {
      return;
    },
  },
  beforeDestroy() {},
  beforeRouteEnter(to, from, next) {
    next((mv) => {
      let pageId = from.query.pageId;
      let outflag = from.query.outflag;

      mv.pageId = pageId;
      mv.outflag = outflag;
    });
  },
  components: {
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
    [CountDown.name]: CountDown,
  },
};
</script>
<style>
@import url("../../../static/navbar.css");
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: rgb(235, 101, 101);
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
}

.article_title > span {
  display: inline-block;

  overflow: hidden;
  text-align: left;
}

.sift_Article_Boxs {
  width: 33.33%;
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
}

.user_name {
  color: rgb(153, 153, 153);
  font-size: 26px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
}

.user_Box {
  text-align: left;
  margin-top: 18px;
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
}

.detail_sp5 {
  text-decoration: line-through;
  color: rgb(153, 153, 153);
  font-size: 28px;
}

.detail_sp4 {
  color: rgb(51, 51, 51);
  font-size: 34px;
  margin-right: 28px;
}

.detail_sp3 {
  color: rgb(235, 101, 101);
  font-size: 40px;
  margin-right: 44px;
}

.menu_more {
  vertical-align: middle;
  color: #d8d8d8;
}

.mgt {
  margin-top: 22px;
  font-size: 0;
}

.detail_sp2 {
  float: right;
  font-size: 22px;
}

.detail_sp1 {
  display: inline-block;
  color: rgb(153, 153, 153);
  padding-right: 30px;
  font-size: 22px;
}

.detail_p1 {
  text-align: left;
  font-size: 30px;
}

.card {
  background-color: white;
}

.header_Content {
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
}

.detail_title_Box {
  padding: 24px 24px;
  text-align: left;
}

.buyCard,
.more {
  float: right;
  margin-right: 32px;
  vertical-align: middle;
}

img {
  width: 100%;
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
  height: 750px;
  line-height: 750px;
  font-size: 0;
}

.van_detail {
  background-color: #f9f9f9;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  margin-bottom: 50px;
}
</style>
<style>
.couponsL {
  text-align: left;
}
.ms-bar {
  background: url("/static/img/seckill-bar.png") center;
  background-size: cover;
  /* height: 81px; */
  font-size: 28px;
  font-weight: bolder;
  color: #fff;
}
.ms-bar-text {
  margin-top: 22px;
  margin-right: 11px;
  float: right;
  padding: 8px 15px;
}
.block {
  background: #fff;
  padding: 0 5px;
  border-radius: 5px;
  color: #eb0526;
  display: inline-block;
  min-width: 30px;
}
.colon {
  color: #fff;
}
</style>
