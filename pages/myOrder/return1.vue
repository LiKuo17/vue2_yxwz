<template>
  <div class="return1">
    <header>
      <div class="header_Box">
        <van-nav-bar title="服务单详情" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="return1_section">
      <article class="a1">
        <div class="card Content afterGoods_Box">
          <div class="left img_Box">
            <img :src="imgServerAdd+orderObj.img" onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
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
        <div class="card Content afterGoods_Box1">
          <p class="return_p">
            <span class="sp_key">服务单号</span>
            <span id="herfcopy" class="sp_value yes-touch">{{returnObj.rid}}</span>
            <span style="display: inline-block;">
              <van-button size="mini" round plain type="default" @click='copyTextToClipboard(returnObj.rid)'>复制</van-button>
            </span>
          </p>
          <p class="return_p">
            <span class="sp_key">申请时间</span>
            <span class="sp_value">{{returnObj.applytime}}</span>
          </p>
          <p class="return_p">
            <span class="sp_key">服务类型</span>
            <span class="sp_value">{{returnObj.applytype}}</span>
          </p>
          <p class="return_p">
            <span class="sp_key">手机号码</span>
            <span class="sp_value">{{returnObj.applymobile}}</span>
          </p>
          <p class="return_p">
            <span class="sp_key">申请原因</span>
            <span class="sp_value row3">{{returnObj.returnreason}}</span>
          </p>
          <p class="return_p">
            <span class="sp_key">服务单状态</span>
            <span class="sp_value row3" v-if="returnObj.status == 11">审核中</span>
            <span class="sp_value row3" v-if="returnObj.status == 12">退货/更换 商品配送中</span>
            <span class="sp_value row3" v-if="returnObj.status == 13">退款审批中</span>
            <span class="sp_value row3" v-if="returnObj.status == 14">已同意退款</span>
            <span class="sp_value row3" v-if="returnObj.status == 15">已驳回</span>
            <span class="sp_value row3" v-if="returnObj.status == 16">退款成功</span>
            <span class="sp_value row3" v-if="returnObj.status == 17">拒绝退款</span>
            <span class="sp_value row3" v-if="returnObj.status == 18">取消售后</span>
            <span class="sp_value row3" v-if="returnObj.status == 19">退款失败</span>
            <span class="sp_value row3" v-if="returnObj.status == 20">已换货</span>
            <span class="sp_value row3" v-if="returnObj.status == 21">退款中</span>
          </p>
          <p class="return_p" v-if="returnObj.handleruser != ''">
            <span class="sp_key">处理人</span>
            <span class="sp_value row3">审核后才有</span>
          </p>
          <p class="return_p" v-if="returnObj.handlertime != ''">
            <span class="sp_key">处理时间</span>
            <span class="sp_value row3">审核后才有</span>
          </p>
          <p class="return_p" v-if="returnObj.shipaddress != ''">
            <span class="sp_key1">商家地址</span>
            <span class="sp_value1 row3">{{returnObj.shipaddress}}</span>
          </p>
        </div>
      </article>
      <article class="a1">

        <div class="card Content inputCourier_Box" v-if="returnObj.status == 12">
          <p class="warning">注：可以再此补充邮寄信息</p>
          <p class="return_p"><span class="sp_key">寄件方式</span><span class="sp_value row3">
              <van-field v-model="expressageType" placeholder="请输入寄件方式" /></span></p>
          <p class="return_p"><span class="sp_key">寄件公司</span><span class="sp_value row3">
              <van-field v-model="expressageName" placeholder="请输入寄件公司" /></span></p>
          <p class="return_p"><span class="sp_key">寄件单号</span><span class="sp_value row3">
              <van-field v-model="expressageNumber" placeholder="请输入寄件单号" /></span></p>
        </div>
      </article>
    </section>
    <footer>
      <div class="footer_Box">
        <p>
          <span class="right">
            &nbsp;
            <van-button type="danger" color="linear-gradient(to right,#1CDA9A,#06B4C5)" @click='addCourier' v-if="returnObj.status == 12">补充邮寄信息</van-button>
            <van-button type="default" @click='doCourierCancel' v-if="returnObj.status == 12">取消申请</van-button>
          </span>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  import _config from '../../assets/js/config';

  import {
    NavBar,
    Step,
    Steps,
    Button,
    Toast,
    Field
  } from 'vant';

  export default {
    name: 'test',
    data() {
      return {
        expressageNumber: '', //寄件单号
        expressageType: '', //寄件方式
        expressageName: '', //寄件公司
        serverAdd: _config.serverAddress,
        imgServerAdd: _config.fileServerAddress,
        returnObj: {
          rid: '', //服务单号
          applytime: '', //申请时间
          applytype: '', //售后类型
          applymobile: '', //手机号码
          returnreason: '', //申请原因
          shipaddress: '', //邮寄地址(商家回复的地址)
          status: '', //服务单状态
          handleruser: '', //处理人
          handlertime: '', //处理时间

        },
        orderObj: {
          img: '', //售后显示订单图片
          name: "暂无商品", //售后显示订单商品名称
          paymonths: 0, //申请售后订单的分期
          month_amt: 0, //申请售后订单的分期支付金额
          amt: 0, //申请售后订单的金额
          quantity: 0, //申请售后订单数量
          id: 0 //订单号
        }
      }
    },
    created() {
      var _this = this;
      _this.getReturn1(_this.$route.query.orderId);
      _this.getOrderData(_this.$route.query.orderId);
    },
    methods: {
      doCourierCancel() {
        var _this = this;
        _this.$http.get('/m/orderservice/api/cancelService', {
          params: {
            rid: _this.returnObj.rid
          }
        }).then(function(e) {
          if (e.result == 0) {
            Toast('取消成功');
            _this.$router.go(-1);
          } else {
            Toast(e.msg);
          }
        })
      },
      addCourier() {
        var _this = this;

        _this.$http.post('/m/orderservice/api/updateServiceShipInfo', {
          rid: _this.returnObj.rid,
          shipmethod: _this.expressageType,
          shipmethodcompany: _this.expressageName,
          shipmethodno: _this.expressageNumber
        }).then(function(e) {
          if (e.result == 0) {
            Toast('设置成功');
            //console.log(e);
          } else {
            Toast(e.msg);
          }
        })
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
      },
      getReturn1(_orderId) {
        var _this = this;
        _this.$http.get('/m/orderservice/api/getApplyInfo', {
          params: {
            orderId: _orderId
          }
        }).then(function(e) {
          if (e.result == 0) {
            //console.log(e);
            _this.returnObj.rid = e.data.rid;
            _this.returnObj.applytime = _this.$fun.getTimeforTimestamp(e.data.applytime);
            _this.returnObj.applytype = e.data.applytype;
            _this.returnObj.applymobile = e.data.applymobile;
            _this.returnObj.returnreason = e.data.returnreason;
            _this.returnObj.status = e.data.status;
            if (e.data.shipaddress) {
              _this.returnObj.shipaddress = e.data.shipaddress;
            }
            if (e.data.handleruser) {
              _this.returnObj.handleruser = e.data.handleruser;
            }
            if (e.data.handlertime) {
              _this.returnObj.handlertime = _this.$fun.getTimeforTimestamp(e.data.handlertime);
            }
            if (e.data.shipmethod) {
              _this.expressageType = e.data.shipmethod;
            }
            if (e.data.shipmethodcompany) {
              _this.expressageName = e.data.shipmethodcompany;
            }
            if (e.data.shipmethodno) {
              _this.expressageNumber = e.data.shipmethodno;
            }

          } else {
            Toast(e.msg);
          }
        })
      },
      back() {
        this.$router.go(-1);
      },
      doCopy() {
        try {
          var msg = document.execCommand('copy') ? '成功' : '失败'
          alert('复制内容 ' + msg);
        } catch (err) {
          alert('不能使用这种方法复制内容');
        }
      },
      copyTextToClipboard(text) {
        var text = document.getElementById("herfcopy");
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("Copy")
        Toast('复制成功');

        // try {
        //   var msg = document.execCommand('copy') ? '成功' : '失败'
        //   Toast('复制 ' + msg);
        // } catch (err) {
        //   Toast('抱歉！暂不支持复制');
        // }
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Field.name]: Field
    }
  }
</script>
<style>
  @import url("../../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #herfcopy{

  }
  .warning {
    line-height: 80px;
    color: rgb(235, 89, 81);
    font-size: 24px;

  }

  .inputCourier_Box {
    padding: 10px 30px;

  }

  .right {
    float: right;
    padding-right: 50px;
  }

  .footer_Box {
    position: fixed;
    bottom: 0;
    background-color: #f9f9f9;
    width: 100%;
    line-height: 98px;

  }

  .sp_value {
    vertical-align: middle;
    display: inline-block;
    width: calc(100% - 290px);
    overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(51, 51, 51);
  }

  .sp_value1 {
    vertical-align: top;
    display: inline-block;
    width: calc(100% - 200px);

    color: rgb(51, 51, 51);
  }

  .row3 {}

  .row4 {}

  .sp_key {
    vertical-align: middle;
    color: rgb(153, 153, 153);
    display: inline-block;
    width: 152px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sp_key1 {

    color: rgb(153, 153, 153);
    display: inline-block;
    width: 152px;
  }

  .return_p {
    font-size: 28px;
    line-height: 52px;
  }

  .after_p1 {
    margin-bottom: 10px;
  }

  .after_p {
    margin-bottom: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  img {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .afterGoods_Box1 {
    padding: 30px 32px;
  }

  .afterGoodsMessAge_Box {
    padding-top: 30px;
    width: 450px;
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
    height: 136px;
    width: 136px;
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

  .afterGoods_Box {
    font-size: 28px;
    color: rgb(153, 153, 153);
  }

  .a1 {
    margin-top: 26px;
  }

  .return1 {



  }

  .return1_section{
    background-color: #f9f9f9;
    width: 100%;
    height: calc(100vh - 92px -98px);
    overflow: auto;
    text-align: left;
  }
</style>
