<template>
  <div class="helpDetail-ignore">
    <header>
      <van-sticky>
        <van-nav-bar :title="$route.query.type" left-arrow @click-left="$back">
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </van-sticky>
    </header>

    <div
      class="questionItem"
      v-for="(item, index) in questions.filter((v) =>
        v.type == $route.query.type ? true : false
      )[0].children"
      :key="index"
    >
      <div class="question">
        <div class="title">Q：</div>
        <div class="content">{{ item.q }}</div>
      </div>
      <div class="answer">
        <div class="title">A：</div>
        <div class="content" v-html="item.a"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky, NavBar, Icon } from "vant";
export default {
  components: {
    vanSticky: Sticky,
    vanNavBar: NavBar,
    vanIcon: Icon,
  },
  data() {
    return {
      nowChildren: [],
      questions: [
        {
          type: "购物常见问题",
          children: [
            {
              q: "专区所售商品都是正品行货吗？有发票吗？",
              a: "本专区所售商品都是正品行货。所有商品都会附带正规发票。",
            },
            {
              q: "专区所售商品有售后保修吗？",
              a:
                "本专区所售商品将严格按照国家三包政策，请凭借商品随附的保修凭证及提供的发票，享受售后服务，如有质量问题，请与生产厂商或者专区联系（4000-327-328，工作日9:00-18:00）。",
            },
            {
              q: "赠品是否可以更换？",
              a:
                "赠品是随商品免费固定配送的，颜色、尺寸、款式随机。如赠品有质量问题或与描述不符，请您与专区客服取得联系，进行更换，其它情况不属于更换范畴。",
            },
            {
              q:
                "从订单成功支付到收到商品，一般需要多长时间？如果长时间未收到货，我是否可以申请办理退款？",
              a:
                "下单成功后，2个工作日内（不包含双休日和国家法定假日）安排发货，具体发货时效会受商品库存、仓储位置、物流情况等因素的影响。部分新品发货时间可能周期较长，请致电客服详询。订单发货后，您可在订单中心查看物流配送信息，具体送货时间请以实际物流信息为准。",
            },
            {
              q: "我是否可取消订单？",
              a:
                "若您在订单尚未完成支付，您可选择直接取消；若您的订单已经支付但尚未发货，您可致电专区客服，我们将为您办理退款；若您的订单已经发货，请您及时与专区客服取得联系，我们将妥善为您处理，如遇取消后物流公司仍将商品配送上门，请与物流说明后拒签即可。",
            },
            {
              q: "订单成功后，我是否可以更改指定收货人、收货地址？",
              a:
                "您下单成功后，不建议您修改订单及收货人信息，如您确实有特殊原因需要修改，请您及时与专区客服取得联系，我们将为您妥善处理。",
            },
          ],
        },
        {
          type: "配送常见问题",
          children: [
            {
              q: "超出配送范围怎么办？",
              a:
                "按专区的配送说明为准超出专区配送范围的订单，商家有权在与客户沟通说明情况后，取消订单。",
            },
            {
              q: "签收商品要注意什么？",
              a:
                "为了避免不必要的麻烦，请您在签收商品时一定要当场拆开验收，如有损坏、与实际不符、短缺等情况，请立即向快递公司申请证明，退回商户，同时联系专区客服中心，我们将为您妥善处理。",
            },
          ],
        },
        {
          type: "退换货常见问题",
          children: [
            {
              q: "什么情况不予办理退（换）货：",
              a:
                "1、非产品质量问题情况下，手机、相机、笔记本产品原厂包装打开并激活；<br><br>2、手表表带经过调整；<br><br>3、化妆品等涉及个人卫生的商品，一经开封如无质量问题不接受退货；<br><br>4、因个人原因造成的商品损坏；<br><br>5、产品图片仅供参照，因拍摄灯光及不同显示器色差等问题可能造成商品图片与实物有一定色差，一切以实物为准。",
            },
            {
              q: "什么时候可以退款给我？",
              a:
                "确认收到退货后，会给您操作退款。系统退款一般需要3-5个工作日，请您耐心等待，届时会有银行短信通知您，请您留意。如果退款申请很久都没有受理，您可以联系专区客服进行处理。",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.helpDetail-ignore {
  background-color: #f6f6f6;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 2.4vw;
  box-sizing: border-box;
}
.questionItem {
  margin: 2.4vw 2.4vw 0;
  padding-bottom: 4.5vw;
  background-color: #fff;
  border-radius: 2vw;
}
.question,
.answer {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  padding: 3vw 3vw 0 3vw;
  box-sizing: border-box;
  font-size: 30px;
}
.title {
  min-width: 10vw;
}
.content {
  text-align: left;
}
.answer > .title {
  color: rgb(41, 190, 129);
}
.answer > .content {
  color: rgb(122, 122, 122);
  font-size: 26px;
  line-height: 150%;
}
</style>
