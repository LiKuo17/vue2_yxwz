<template>
  <div class="setting">
    <header>
      <van-nav-bar
        class="header_Box"
        title="经营者信息"
        left-arrow
        @click-left="back"
      />
    </header>
    <section class="header_section">
      <van-cell-group title="黑金商旅合作经营者营业执照信息">
        <van-cell
          v-for="(item, index) in storeDetail"
          :key="index"
          title-style="max-width:80px"
          :title="item.name"
          :value="item.value"
        />
        <!-- <van-cell
          title-style="max-width:80px"
          title="供应商名称"
          value="深圳市雅棉居品数据股份有限公司"
        />
        <van-cell
          title-style="max-width:80px"
          title="类型"
          value="股份有限公司(非上市)"
        />
        <van-cell
          title-style="max-width:80px"
          title="注册地址"
          value="深圳市福田区福田保税区振和大厦西楼一层（仅限办公）"
        />
        <van-cell
          title-style="max-width:80px"
          title="法定代表人"
          value="高良伟"
        />
        <van-cell
          title-style="max-width:80px"
          title="注册资本"
          value="6500万人民币"
        />
        <van-cell
          title-style="max-width:80px"
          title="成立日期"
          value="2001-03-21"
        />
        <van-cell
          title-style="max-width:80px"
          title="统一社会信用代码"
          value="91440300727150309K"
        />
        <van-cell
          title-style="max-width:80px"
          title="经营范围"
          value="一般经营项目是：纺织品、健康及居住类产品的设计研发与生产、家居布艺装饰品、酒店装饰品设计、购销；投资兴办实业（具体项目另行申报）；数据系统的技术开发、技术咨询及技术维护；计算机网络工程；市场营销策划；投资管理（不得从事信托、金融资产管理、证券资产管理等业务）；计算机软件及辅助设备的批发、零售；工艺礼品、金银饰品、珠宝饰品的销售；国内贸易（不含专营、专控、专卖商品）；经营进出口业务；贵金属及收藏品的销售（不含文物）；床上用品租赁服务（不含融资租赁）；代订酒店、酒店订房服务；旅游咨询、旅游产品的购销（法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营）；箱包、皮具、手表、装饰品的批发零售；课外活动策划；户外活动策划；教育信息咨询；健康养生信息咨询；医疗机构项目投资（具体项目另行申报）；健身器材的销售；从事互联网文化活动策划；接受金融机构的合法委托从事金融机构的外包服务及相关的信息咨询服务; 卫生用品、消毒产品及日用品的销售；一类医疗器械、二类医疗器械（不含体外诊断试剂）、三类医疗器械的研发；一类医疗器械的销售。（法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营），许可经营项目是：床单、枕套、被套的生产（生产场地执照另行申办）；教育培训；在线教育信息服务及咨询；艺术培训；语言培训；劳务派遣；预包装食品的销售；健康体检管理（不含医疗行为）；（涉及许可证的凭许可证经营）；销售集邮票品；保健品、化妆品、护肤品的销售；服装的设计、生产和销售；人力资源服务业务；招聘服务；人才外包招聘流程外包；人才中介及职业介绍服务；企业高端人才寻猎推荐服务；经营电信业务；一类医疗器械的生产；二类医疗器械（不含体外诊断试剂）、三类医疗器械的生产和销售。"
        /> -->
      </van-cell-group>
      <van-nav-bar title="" />
    </section>

    <footer></footer>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
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
} from "vant";

export default {
  name: "certificate",
  data() {
    return {
      chosenAddressId: "1",
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      imgUrl: "../../../static/img/test_userx.png",
      userName: "",
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      storeDetail: [],
    };
  },
  created() {
    this.getUserInfo();
    this.getCoupons(); //获取优惠券
    this.getStoreDetail(); //获取店铺详情
  },
  methods: {
    //获取店铺详情
    getStoreDetail() {
      this.$http
        .get("/m/biz/api/common/getBizInfo", {
          params: { bizid: Number(this.$route.query.bizid) },
        })
        .then((res) => {
          if (res.result == 0) {
            this.storeDetail = JSON.parse(res.data.businessInfo);
          }
        });
    },
    getUserInfo() {
      var _this = this;
      _this.$http
        .get("/m/members/api/getInfo", {
          params: {},
        })
        .then(function (e) {
          if (e.result == 0) {
            _this.imgUrl = _this.imgServerAdd + e.data.avatar;
            _this.userName = e.data.nickname;
          }
        });
    },
    back() {
      this.$router.go(-1);
    },
    beforeRead(file, detail) {
      //console.log(file);
      //console.log(detail);
      //console.log(1);
    },
    afterRead(file, detail) {
      var _this = this;
      let formData = new FormData();
      formData.append("avatar", file.file);

      //				_this.$http.post('/m/members/api/uploadAvatar', {
      //					avatar: detail.content
      //				}).then(function(e) {
      //					//console.log(e);
      //					//console.log(111);
      //				})

      _this
        .$http({
          method: "post",
          url: "/m/members/api/uploadAvatar",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (e) {
          if (e.result == 0) {
            Toast("上传成功");
            _this.imgUrl = _this.imgServerAdd + e.data.fileUrl;
          } else {
            Toast(e.msg);
          }
          //console.log(e);
        });
    },
    toAddressManage() {
      this.$router.push("/addressManage");
    },
    toMemberLogout() {
      var _this = this;
      _this
        .$http({
          method: "get",
          url: "/m/common/login/api/logout",
          params: {},
        })
        .then(function (e) {
          if (e.result == 0) {
            Toast("您已退出当前帐户");

            _this.$router.push("/");
          } else {
            Toast(e.msg);
          }
        });
    },
    // 二期开发方法
    //获取当前可领优惠券列表
    getCoupons(_prdId) {
      var _this = this;
      var _params = {};

      _this.$http
        .get("/m/coupons/api/getMyCoupons", {
          params: _params,
        })
        .then(function (e) {
          if (e.result == 0) {
            //循环执行前先清空
            // _this.coupons = [];
            // _this.disabledCoupons = [];

            e.data.forEach((item, index) => {
              let usingstatus = item.usingstatus;
              let coupon = _this.couponsDataTreating(item);
              //判断用户是否可用
              if (usingstatus == 0) {
                _this.coupons.push(coupon);
              } else {
                _this.disabledCoupons.push(coupon);
              }
            });
          } else {
            Toast(e.msg);
          }
        });
    },
    //优惠券数据处理
    couponsDataTreating(item) {
      var coupon = {
        id: item.id, // 优惠券id
        name: item.title, // 优惠券名称
        condition: "", // 满减条件
        startAt: item.beginTime / 1000, // 卡有效开始时间（临时，单位秒）
        endAt: item.endTime / 1000, // 卡失效日期（临时，单位秒）
        description: "商品优惠券", // 描述信息，优惠券可用时展示
        reason: "已失效", // 不可用原因，优惠券不可用时展示
        value: item.discount * 100, // 折扣券优惠金额，单位分
        valueDesc: item.discount, // 折扣券优惠金额文案
        unitDesc: "", // 单位文案
      };

      let type = item.type;
      let limitAmount = item.limitAmount;
      let discount = item.discount;
      let sbuTitle = "";

      if (item.usingstatus == 1) {
        coupon.reason = "已使用";
      }

      if (type == 0) {
        // 代金券
        coupon.unitDesc = "元";
        sbuTitle = "满" + limitAmount + "减" + discount + "元";
      } else if (type == 1) {
        sbuTitle = "满" + limitAmount + "件打" + discount + "折";
      }
      coupon.condition = sbuTitle;

      return coupon;
    },

    //选择优惠券
    onChange(index) {
      let coupon = this.coupons[index];
      Toast("[" + coupon.name + "] " + coupon.condition);
    },

    //兑换优惠券
    onExchange(code) {
      Toast("无效的兑换码");
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
  },
};
</script>
<style>
@import url("../../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_section {
  text-align: left;
  height: 100vh;
  overflow: auto;
}
.header_Box {
  width: 100vw;
}
.header_Box,
.Content_Box,
.Content_Box1 {
  border-bottom: 1px solid rgb(223, 223, 223);
}
.a1 {
  margin-bottom: 26px;
}
.Content_Box1,
.Content_Box2 {
  text-align: left;
  color: rgb(51, 51, 51);
  font-size: 34px;
}
.Content_Box1 {
  line-height: 94px;
  /* margin-left: 32px; */
  padding-left: 32px;
  padding-right: 34px;
}
.Content_Box2 {
}

.user_name {
  color: rgb(51, 51, 51);
  font-size: 32px;
}

img {
  width: 100%;
  height: 100%;
}

.img_Box {
  width: 120px;
  vertical-align: middle;
  height: 120px;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 28px;
}

.Content_Box {
  line-height: 184px;
  text-align: left;
  /* margin-left: 32px; */
  padding-left: 32px;
  /* border-bottom: 1px solid rgb(223, 223, 223); */
}

.card {
  background-color: rgb(255, 255, 255);
}
</style>
