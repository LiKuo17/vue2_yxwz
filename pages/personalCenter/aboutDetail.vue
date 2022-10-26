<template>
  <div class="aboutDetail-ignore">
    <header>
      <van-sticky>
        <van-nav-bar :title="$route.query.type" left-arrow @click-left="$back">
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </van-sticky>
    </header>
    <div class="aboutItem" v-if="nowItem.type || nowItem.content">
      <div class="title">{{ nowItem.type }}</div>
      <div class="content" v-html="nowItem.content"></div>
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
  created() {
    this.nowItem = this.abouts.filter(
      (v) => v.type == this.$route.query.type
    )[0];
  },
  data() {
    return {
      nowItem: {},
      abouts: [
        {
          type: "专区服务管理制度总则",
          content:
            "1、专区出售的商品是通过正规进货渠道采购的正版商品，对有质量保证书的商品按照保证书的承诺执行，其它商品按国家有关规定执行。<br><br>2、自签收之日起7日内（以快递签收日期为准），出现国家三包所规定的功能性故障时，经由生产厂家指定或特约售后服务中心检测确认故障属实，您可以选择退货或者换货；自购买之日起15日内，您可以选择换货；超过15日且在保修期内，您只能在保修期内享受免费维修服务。为了不耽误您使用，缩短故障商品的维修时间，我们建议您直接联系生产厂家售后服务中心进行处理。您可以直接在商品的保修卡中查找该商品对应的全国各地生产厂家售后服务中心联系处理。",
        },
        {
          type: "通讯数码类",
          content:
            "数码类、手机及配件、笔记本、台式机、家电、打印机、扫描仪、一体机、车载GPS类商品，如果商品出现质量问题，请您自行到生产厂家售后服务中心进行检测，并开据检测报告（对于有些生产厂家售后服务中心无法提供检测报告的，需提供维修检验单据），如果检测报告确认属于质量问题，您需要将检测报告、问题商品以及包装完整附件回寄给商家，如有破损或丢失，我们将无法为您办理。",
        },
        {
          type: "珠宝首饰类",
          content:
            "客户在收到商品之日起（以发票日期为准）3个月内，如果出现质量问题，请自行到当地的质量监督部门-珠宝玉石质量检验中心进行检测，如果检测报告确认属于质量问题，请与本专区售后服务中心联系办理退换货事宜。退换货时，请您务必将检测报告、商品的外包装、内带附件、鉴定证书、说明书等随同商品一起退回。如有包装破损或缺失，扣除该商品5%的折价费；如有附件破损或缺失，扣除该商品10-10%的折价费。对于高档首饰都附带国家级宝玉石鉴定中心出具的鉴定证书，如果您对此有任何质疑，请到出具该证书的鉴定机构进行复检。",
        },
        {
          type: "品牌箱包类",
          content:
            "高端品牌箱包及饰品（如GUCCI、COACH等）每款商品供货商检验过后都会拍照存证，商品贴上有QC合格的标签，附上销货明细表复印件，用专用封条封装，并注明：“商品出货已拍照存证一经拆封不接受退货。”收货时，建议与快递人员当面检查封装情况，销货明细表复印件是否存在，主商品上QC标签是否完好，若有异常情况请即刻联系客服中心，商品在QC标签完好的情况下，可以退换，一经拆开，不予退换。签收后，请妥善保管销货明细表复印件，可以凭商品的销货明细表复印件到指定的专柜检测保修。",
        },
        {
          type: "存储类",
          content:
            "对于存储类商品，本专区仅提供商品硬件本身的退换货申请，不承担因硬件损坏而造成的数据丢失、数据损坏等相关责任。",
        },
        {
          type: "化妆品类",
          content:
            "我们保证商品的进货渠道和质量，如果客户在使用时对商品质量表示置疑，请出具书面鉴定，我们会按照国家法律规定予以处理。因个人喜好(气味，色泽、型号，外观)和个人肤质不同要求的退货将无法受理。签收商品时，请您一定在配送人员在场时当面检查商品与送货单是否一致，自提商品时请当场验收，若商品有破损，渗漏，缺少，配送有误等问题，请当即与客服人员联系，在您签收或自提后发现上述现象我们将不负责退换。 ",
        },
      ],
    };
  },
};
</script>

<style scoped>
.aboutDetail-ignore {
  background-color: #f6f6f6;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 2.4vw;
  box-sizing: border-box;
}
.aboutItem {
  margin: 2.4vw 2.4vw 0;
  padding-bottom: 4.5vw;
  background-color: #fff;
  border-radius: 2vw;
}
.title {
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  font-size: 32px;
  padding: 3vw;
}
.content {
  padding: 3vw 3vw 0 3vw;
  font-size: 28px;
  line-height: 130%;
}
.title,
.content {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  box-sizing: border-box;
  text-align: left;
}
</style>
