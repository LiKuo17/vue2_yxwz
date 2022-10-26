<template>
    <div class="cashbackBox">
        <van-empty class="custom-image" image="https://img01.yzcdn.cn/public_files/8a5c409fc3cda25cee5b53d5e606b7c0.png" description="暂无返现" />
        <van-button round size="small" @click="goBuy" plain type="danger">进店逛逛</van-button>
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
  .cashbackBox {
      height: 90vh;
      background: white;
      padding-top: 100px;
  }
</style>
