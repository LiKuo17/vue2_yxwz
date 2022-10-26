<template>
  <div class="return">
    <header>
      <div class="header_Box">
        <van-sticky>
        <van-nav-bar title="申请售后" left-arrow @click-left="back" />
        </van-sticky>
      </div>
    </header>
    <section class="return_section">
      <article class="a1">
        <div class="card Content afterGoods_Box">
          <div class="left img_Box">
            <img :src="imgServerAdd+orderObj.img" onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};console.log(this)" />
          </div>
          <div class="left afterGoodsMessAge_Box">
            <p class="after_p"><span>{{orderObj.name}}</span></p>
            <p class="after_p1"><span>{{orderObj.paymonths == 0?'不分期: ￥'+orderObj.month_amt:'分期价： ￥'+orderObj.month_amt+'×'+orderObj.paymonths+'期'}}</span></p>
            <p><span>总价：</span><span class="font_Style">￥{{orderObj.amt}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>购买数量：</span><span
                class="font_Style">{{orderObj.quantity}}</span></p>
          </div>
          <div class="clear"></div>
        </div>
      </article>
      <article class="a1">
        <div class="card Content returnCause_Box">
          <van-radio-group v-model="applytypeRadio">
            <div class="returnCauses" v-if="applytype=='退货'||applytype=='换货'" @click="applytypeRadio=='退货'?applytypeRadio='':applytypeRadio='退货'">
              <span class="sp1">退货</span><span class="sp5 right">
                <van-radio @click="applytypeRadio=='退货'?applytypeRadio='':applytypeRadio='退货'" name="退货"></van-radio>
              </span><span class="sp2 right">退回收到的商品 </span>
            </div>
            <div class="returnCauses" v-if="applytype=='退货'||applytype=='换货'" @click="applytypeRadio=='换货'?applytypeRadio='':applytypeRadio='换货'">
              <span class="sp1">换货</span><span class="sp5 right">
                <van-radio @click="applytypeRadio=='换货'?applytypeRadio='':applytypeRadio='换货'" name="换货"></van-radio>
              </span><span class="sp2 right">更换收到的商品 </span>
            </div>
            <div class="returnCauses" v-if="applytype=='退款'" @click="applytypeRadio=='退款'?applytypeRadio='':applytypeRadio='退款'">
              <span class="sp1">退款</span><span class="sp5 right">
                <van-radio @click="applytypeRadio=='退款'?applytypeRadio='':applytypeRadio='退款'" name="退款"></van-radio>
              </span><span class="sp2 right">退款</span>
            </div>
          </van-radio-group>
        </div>
      </article>
      <article class="a1">
        <div class="card Content returnCause_Box1">
          <div class="title">
            <span class="sp3 left">申请原因</span>
            <!--<span class="sp4 right font_Style1" @click="causeShow = true">请选择申请原因<van-icon style='vertical-align: middle;' name="arrow" /></span>-->

          </div>
          <div class="details">
            <div class="textarea_Box">
              <van-field v-model="message" type="textarea" placeholder="请说明原因" rows="1" autosize />
            </div>
            <!--<div class="file_Box">
							<van-uploader v-model='fileList' :max-count='max_count' :preview-full-image='isFull'>

							</van-uploader>
						</div>-->
          </div>
        </div>
      </article>
      <article class="a1">
        <div class="card Content returnCause_Box1">
          <div class="title">
            <span class="sp3 left">联系电话</span>
            <!--<span class="sp4 right font_Style1" @click="causeShow = true">请选择申请原因<van-icon style='vertical-align: middle;' name="arrow" /></span>-->
          </div>
          <div class="details">
            <div class="textarea_Box">
              <van-field v-model="phonenumber" placeholder="请填写联系人手机号" rows="1" autosize />
            </div>
            <!--<div class="file_Box">
							<van-uploader v-model='fileList' :max-count='max_count' :preview-full-image='isFull'>

							</van-uploader>
						</div>-->
          </div>
        </div>
      </article>
      <!--<article class="a1">
				<div class="card Content refundType_Box">
					<div class="refundType_Boxs">
						<span class="sp3">退款方式</span><span class="right font_Style1">原支付返还</span>
					</div>
				</div>
			</article>-->
      <!--<article class="a1">
				<div class="card Content refundType_Box1">
					<div class="refundType_Box1s">
						<p class="return_p"><span class="sp3">返回方式</span><span class="right font_Style1">邮政快递</span></p>
						<p class="return_p1"><span class="sp3">单号：46534663362516546</span></p>
					</div>
					<div class="refundType_Box2s bg">
						<span class="iconsp right"><van-icon class='' name="arrow" /></span>
						<p class="return_p2">小豆豆&nbsp;&nbsp;&nbsp;15632698563</p>
						<p class="return_p3"><span class="sp3">单号：46534663362516546</span></p>
					</div>
					<div class="refundType_Box2s bg1">
						<span class="iconsp right"><van-icon class='' name="arrow" /></span>
						<p class="return_p2">取件时间</p>
						<p class="return_p3"><span class="sp3">2019-06-18   09:00-15:00</span></p>
					</div>
				</div>
			</article>-->
      <div class="a2">
        <div class="btn_Box">
          <van-button round type="danger" color="linear-gradient(to right,#1CDA9A,#06B4C5)" size="large" @click='submit'>提交</van-button>
        </div>
      </div>
    </section>
    <footer>
      <!--<van-action-sheet v-model="causeShow" title="申请原因">
				<van-radio-group v-model="causeRadio">
					<p class="return_p4" @click="causeRadio = '0' ">
						<span>发错货</span>
						<span class="right"><van-radio name="0"></van-radio></span>
					</p>
					<p class="return_p4" @click="causeRadio = '1' ">
						<span>商品损坏</span>
						<span class="right"><van-radio name="1"></van-radio></span>
					</p>
					<p class="return_p4" @click="causeRadio = '2' ">
						<span>不想要了</span>
						<span class="right"><van-radio name="2"></van-radio></span>
					</p>
					<p class="return_p4" @click="causeRadio = '3' ">
						<span>质量问题</span>
						<span class="right"><van-radio name="3"></van-radio></span>
					</p>
					<p class="return_p4" @click="causeRadio = '4' ">
						<span>其他</span>
						<span class="right"><van-radio name="4"></van-radio></span>
					</p>
				</van-radio-group>
			</van-action-sheet>-->
    </footer>
  </div>

</template>

<script>
  import _config from '../../assets/js/config';

  import {
    NavBar,
    Step,
    Steps,
    Icon,
    Field,
    Uploader,
    Button,
    ActionSheet,
    RadioGroup,
    Radio,
    Toast,
    Sticky
  } from 'vant';

  export default {
    name: 'test',
    data() {
      return {
        message: '',
        fileList: [],
        serverAdd: _config.serverAddress,
        imgServerAdd: _config.fileServerAddress,
        max_count: 1,
        isFull: false,
        causeShow: false,
        causeRadio: 0,
        applytypeRadio: '',
        applytype: '',
        phonenumber: '',
        orderObj: {
          img: '../../static/img/detaul_Img.jpg', //售后显示订单图片
          name: "暂无商品", //售后显示订单商品名称
          paymonths: 0, //申请售后订单的分期
          month_amt: 0, //申请售后订单的分期支付金额
          amt: 0, //申请售后订单的金额
          quantity: 0, //申请售后订单数量
          id: 0
        }
      }
    },
    created() {
      var _this = this;
      _this.applytype = _this.$route.query.applytype;
      _this.getOrderData(_this.$route.query.orderId);
    },
    methods: {
      submit() {
        var _this = this;
        if (_this.applytypeRadio == undefined || _this.applytypeRadio == '' || _this.applytypeRadio == null) {
          Toast('请选择售后类型');
          return false;
        } else if (_this.phonenumber == '') {
          Toast('请填写手机号');
          return false;
        } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(_this.phonenumber)) {
          Toast('手机号格式不正确');
          return false;
        }
        _this.$http.post('/m/orderservice/api/serviceApply', {
          orderid: _this.orderObj.id,
          applytype: _this.applytypeRadio,
          applymobile: _this.phonenumber,
          returnreason: _this.message,
          imageurl: "图片URL，暂无"
        }).then(function(e) {
          if (e.result == 0) {
            Toast('提交成功');
            _this.$router.push('/myOrder?type=2');
          } else {
            Toast(e.msg);
          }
        });
      },
      back() {
        this.$router.go(-1);
      },
      getOrderData(_orderId) {
        var _this = this;
        _this.$http.get('/m/orders/api/getitem', {
          params: {
            orderId: _orderId
          }
        }).then(function(e) {
          if (e.result == 0) {
            _this.orderObj.name = e.data.prdname;
            _this.orderObj.img = e.data.iconurl;
            _this.orderObj.paymonths = e.data.paymonths;
            _this.orderObj.month_amt = e.data.month_amt;
            _this.orderObj.amt = e.data.amt;
            _this.orderObj.quantity = e.data.quantity;
            _this.orderObj.id = e.data.orderid;
          }
        })

      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [Icon.name]: Icon,
      [Field.name]: Field,
      [Uploader.name]: Uploader,
      [Button.name]: Button,
      [ActionSheet.name]: ActionSheet,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Toast.name]: Toast,
      [Sticky.name]: Sticky,
    }
  }
</script>
<style>
  @import url("../../../static/navbar.css");
  @import url("../../../static/field.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .return_p4 {
    padding: 34px 17px;
  }

  .btn_Box {
    margin: 0 76px;
    padding-bottom: 32px;
  }

  .a2 {
    margin-top: 70px;
  }

  .refundType_Box2s {
    padding-left: 80px;
  }

  .iconsp {
    margin-top: 60px;
    margin-right: 34px;
  }

  .bg1 {
    background: url(../../assets/img/return_riqi.png) no-repeat 32px 32px;
    background-size: 26px 32px;
  }

  .bg {
    background: url(../../assets/img/return_dizhi.png) no-repeat 32px 32px;
    background-size: 26px 32px;
  }

  .return_p2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
    padding-top: 26px;
    padding-bottom: 12px;
    display: inline-block;
  }

  .return_p3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
    padding-bottom: 28px;
    display: inline-block;
  }

  .return_p1 {
    padding-bottom: 28px;
    text-align: right;
  }

  .return_p {
    padding-top: 30px;
    padding-bottom: 12px;
  }

  .sp3 {
    font-size: 30px;
    color: rgb(153, 153, 153);
  }

  .refundType_Box,
  .refundType_Box1s {
    padding: 0 32px;
  }

  .refundType_Box1 {}

  .refundType_Box1s {
    border-bottom: 1px solid rgb(223, 223, 223);
  }

  .refundType_Boxs {
    line-height: 102px;
  }

  .file_Box {
    margin-top: 26px;
  }

  .textarea_Box {
    background-color: rgb(245, 245, 245);
    border-radius: 6px;
    overflow: hidden;
  }

  .details {
    padding: 28px 32px;
  }

  .title {
    line-height: 102px;
    font-size: 30px;
    display: inline-block;
    width: calc(100% - 32*2px);
    padding: 0 32px;
    border-bottom: 1px solid rgb(223, 223, 223);
  }

  .returnCauses:nth-last-child(1) {
    border: 0;
  }

  .returnCauses:active {
    background-color: #f2f3f5;
  }

  .sp2>i {
    font-size: 28px;
    color: rgb(51, 51, 51);
    vertical-align: middle;
  }

  .sp2 {
    font-size: 24px;
    color: rgb(153, 153, 153);
    padding-right: 34px;
  }

  .sp5 {
    height: 102px;
    display: flex !important;
    padding-right: 30px;
    align-items: center;
  }

  .sp1 {
    font-size: 30px;
    color: rgb(51, 51, 51);
  }

  .returnCauses {
    padding-left: 32px;
    height: 102px;
    line-height: 102px;
    border-bottom: 1px solid rgb(223, 223, 223);
  }

  .returnCauses>span {
    display: inline-block;
  }

  .returnCause_Box1 {}

  .returnCause_Box {}

  .after_p1 {
    margin-bottom: 10px;
  }

  .after_p {
    margin-bottom: 22px;
  }

  img {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .afterGoodsMessAge_Box {
    padding-top: 30px;
    padding-left: 30px;
    padding-bottom: 30px;
    width: calc(100% - 250px);
  }

  .font_Style1 {
    color: rgb(51, 51, 51);
    font-weight: bold;
  }

  .font_Style {
    font-size: 28px;
    color: black;
    font-weight: bold;
  }

  .afterGoods_Box {
    font-size: 28px;
    color: rgb(153, 153, 153);
  }

  .img_Box {
    border-radius: 4px;
    height: 126px;
    width: 126px;
    overflow: hidden;
    padding-top: 30px;
    padding-left: 32px;
    padding-bottom: 48px;
    padding-right: 48px;
  }

  .right {
    float: right;
  }

  .left {
    float: left;
  }

  .Content {
    border-radius: 10px;
    margin: 0 16px;
  }

  .card {
    background-color: white;
  }

  .a1 {
    margin-top: 26px;
  }

  .return {

  }

  .return_section{
    background-color: #f9f9f9;
    width: 100%;
    text-align: left;
    height: calc(100vh - 92px);
    /* margin-top: 92px; */
    font-size: 30px;
    overflow-y: auto;
  }

</style>
