<template>
      <div class="bindSaleCode position-relative bg-white">
            <CommonHeader title="话费兑换" />
            <van-field v-model="phone" label="手机号" :required="true" placeholder="请输入兑换手机号" />
            <div class="d-flex flex-column align-items-center">
                  <van-button @click="handleExchange" block class="position-absolute bindBtn">
                        确认
                  </van-button>
                  <span class="info">注: 请检查号码无误再点击确认，确认后无法修改</span>
            </div>
      </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
export default {
      components: { CommonHeader },
      data() {
            return {
                  phone: '',
                  redo: '',
            };
      },
      created(){
            this.handleRedo()
      },
      methods: {

            handleRedo() {
                  this.$http.get('m/tel/get/redo').then(res=>{
                        this.redo = res
                  })
            },

            handleExchange() {
                  const { couponId } = this.$route.query
                  let codeReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                  if (!codeReg.test(this.phone)) return this.$toast("手机号格式不符");
                  this.$http.post(`m/tel/phone`,{
                        phone: this.phone,
                        couponId: couponId,
                        redo: this.redo
                  })
                  .then(res => {
                        if (res.result === 0) {
                              this.$toast("兑换成功") 
                              setTimeout(() => {
                                    this.$router.push("/Equity");
                              }, 1500);
                        }else if(res.result === 500) {
                              this.$toast(res.msg) 
                              location.reload()       
                        } else {
                              this.$toast(res.msg || "兑换失败");
                        }
                  });
            },
      },
};
</script>

<style lang="scss" scoped>
.bindSaleCode {
      height: 100vh;
      .bindBtn {
            width: 40vw;
            background: #7db7d6;
            color: #fff;
            border-radius: 20px;
            font-size: 36px;
      }
      .info {
            margin-top: 15vw;
            font-size: 12px;
            opacity: 0.4;
      }
}
.van-cell {
      margin: 50px 16px;
} 
</style>
