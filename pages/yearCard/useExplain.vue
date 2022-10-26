<template>
  <!-- 全年卡详情的使用须知页 -->
  <div class="useExplain">
    <div class="intro">
      <p class="intro-title">使用须知</p>
      <p class="intro-content">
        活动说明：
        1、凡是新开通黑金商旅会员的用户，以及已开通的会员，均可享受全年{{
          this.cardNum
        }}次最低288元入住本活动页面上的所有酒店，可预订酒店和价格具体以页面展示为准，比其他平台价更优惠（具体次数视会员卡类型而定）。
        2、此类特价酒店需提前2天向24小时客服预订，便于安排房源。
        3、开通会员后，五星级居住产品会在7个工作日内寄出。
        4、本活动真实有效，黑金商旅加在法律允许范围内保留活动最终解释权。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "useExplain",
  data() {
    return {
      cardNum: 3,
    };
  },
  mounted() {
    this.cardNum = this.$route.query.yearCardNum;
  },
};
</script>

<style lang="scss" scoped>
.useExplain {
  min-height: 100vh;
  text-align: left;
  .intro {
    padding: 30px 32px 32px;
    background: #fff;
    line-height: 48px;
  }
  .intro-title {
    font-size: 32px;
    line-height: 36px;
    color: #323233;
    /* margin-bottom: 32px; */
    font-weight: 700;
  }
  .intro-content {
    font-size: 28px;
    color: #666;
    white-space: pre-line;
    word-break: break-all;
  }
}
</style>