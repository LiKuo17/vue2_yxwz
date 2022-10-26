<template>
  <div class="orderDetail">
    <header>
      <div class="header_Box">
        <van-nav-bar title="订单详情" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="orderDetail_section">
      <article class="card">
        <div class="content">
          <div class="img_Box">
            <img :src="orderResultInfo[Info].img" />
          </div>
          <div>
            <p>{{orderResultInfo[Info].tiptext}}</p>
          </div>
        </div>
      </article>
      <article class="card">
          <p class="bizname">{{item.bizname}}</p>
      </article>
      <article class="card">
        <p class="orderid"><span>订单标号:{{item.orderid}}</span></p>
        <div class="content">

          <div class="img_Box1">
            <img :src="imgServerAdd + item.iconurl" onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
          </div>
          <div class="item_Box">
            <p><span class="item_name">{{item.prdname}}</span><span class="item_price">￥{{item.instalments==0?item.amount_month:item.amt}}</span></p>
            <p class="flexCenter"><span class="item_size">颜色:{{item.sku_type1}};尺寸:{{item.sku_type2}};</span><span class="item_count"
                v-if="item.instalments>1"></span>
                <span class="item_quantity">数量 X {{item.quantity}}</span>
                </p>
          </div>
        </div>
      </article>
      <div class="btn_Box" v-if="Info==0"><van-button @click="$router.push({path:'/toPay',query:{orderId:orderId}})" color="linear-gradient(to right,#1CDA9A,#06B4C5)" block>继续购买</van-button></div>
      <div>
          <van-button plain hairline   @click="$router.push('/')">返回首页</van-button>
          &nbsp;&nbsp;
          <van-button plain hairline color="#2DBF83"   @click="$router.back()">回到上一级</van-button>
      </div>
    </section>
  </div>
</template>

<script>
  import _config from '../../assets/js/config';
  import {
    NavBar,
    Tabbar,
    TabbarItem,
    Button
  } from 'vant';
  export default {
    name: 'test',
    data() {
      return {
        orderId: this.$route.query.orderId,
        orderResultInfo: [{
            tiptext: '已取消支付',
            tipdesc: '',
            img: require("@/assets/img/error.png")
          },
          {
            tiptext: '恭喜您，订单支付成功',
            tipdesc: '我们将尽快为您安排发货',
            img: require("@/assets/img/success.png")
          },
          {
            tiptext: '支付失败',
            tipdesc: '',
            img: require("@/assets/img/error.png")
          },
          {
            tiptext: '正在支付...',
            tipdesc: '',
            img: require("@/assets/img/payloading.png")
          }
        ],
        item: {
          img:'',
          bizname:'',

        },
        Info: 2,
        serverAdd: _config.serverAddress,
        imgServerAdd: _config.fileServerAddress,
      }
    },
    created() {
      this.getDetail();
    },
    methods: {
      back() {
        this.$router.back();
      },
      getDetail(){
        this.$http.get("/m/orders/api/getitem",{
          params:{
            orderId:this.$route.query.orderId
          }
        }).then(res=>{
          console.log(res);
          this.item = res.data;
          switch(res.data.ispaied){
            case 0:
              this.Info = 0;
            break;
            case 1:
              this.Info = 3;
            break;
            case 2:
              this.Info = 1;
            break;
            case 3:
              this.Info = 2;
            break;
          }
        })
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
      [NavBar.name]: NavBar,
      [Button.name]: Button
    }
  }
</script>

<style scoped>
  /* @import url("../../static/navbar.css"); */
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .item_name{}

  .btn_Box{
    margin: 20px;
    border-radius: 20px;
    overflow: hidden;
  }

  .orderid{
    text-align: left;
    padding-left: 20px;
    padding-top: 20px;
    font-size: 14px;
  }

  .flexCenter{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bizname{
    padding: 20px;
    text-indent: 1em;
    text-align: left;
  }

  .item_price{
    color: #EB6565;
    float: right;
  }

  .item_Box{
    text-align: left;
    padding: 20px;
    width: 399px;
  }

  .img_Box1 {
    display: inline-block;
    height: 184px;
    width: 200px;
    border-radius: 4px;
    overflow: hidden;
    margin: 20px;
  }

  .img_Box {
    width: 100px;
    height: 100px;
    padding-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 30px;
  }

  .img_Box>img {
    width: 100%;
  }

  .content {
    display: flex;

    align-items: center;
  }

  .card {
    background-color: white;
    margin: 10PX;
    border-radius: 20px;
    margin-top: 0;
  }


  header {

  }

  .orderDetail {


  }

  .orderDetail_section{
height: calc(100vh - 112px);
background-color: #F6F6F6;
padding-top: 20px;
  }

  .orderInfo {
    background-image: linear-gradient(to right, #05B3C4, #1CDA9A);
    height: 200px;

  }
</style>
