<template>
      <van-nav-bar class="commonHeader" :title="title" left-arrow @click-left="onClickLeft" />
</template>
<script>
export default {
      props:{
            title:{
                  type: String,
                  default: "雅棉商城"
            }
      },
      methods: {
            onClickLeft() {
                  this.$listeners["click-left"] ? this.$listeners["click-left"]() : this.$router.back();
            },
      },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar {
      .van-icon {
            color: #000;
      }
}
</style>
