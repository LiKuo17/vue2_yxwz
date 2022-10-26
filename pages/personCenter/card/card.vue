<template>
    <div class="giftBox">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/public_files/e7b3f97438634e01aedff700d9921052.png" description="暂无权益卡" />
        <!-- <van-button round size="small" @click="goBuy" plain type="danger">进店逛逛</van-button> -->
    </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
export default {
    components: { CommonHeader },
    data(){
        return {}
    },
    methods: {
        goBuy(){
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" scoped>
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
  .giftBox {
      height: 90vh;
      background: white;
      padding-top: 100px;
  }
</style>
