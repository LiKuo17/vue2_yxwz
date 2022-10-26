<template>
      <div class="bindSaleCode position-relative bg-white">
            <CommonHeader title="绑定推广编码" />
            <van-field
                  v-model="fieldValue"
                  :required="true"
                  is-link
                  readonly
                  label="网点"
                  placeholder="请选择所在网点"
                  @click="show = true"
            />
            <van-popup v-model="show" round position="bottom">
                  <van-cascader
                        v-model="cascaderValue"
                        title="请选择所在网点"
                        :options="options"
                        :field-names="fieldNames"
                        @close="show = false"
                        @finish="onFinish"
                  />
            </van-popup>

            <!-- <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">网点</van-radio>
                  <van-radio name="2">个人</van-radio>
            </van-radio-group> -->

            <!-- <van-field class="extension"  readonly  v-model="bankCode" label="网点码" :required="true" placeholder="请输入推广码" /> -->
            <van-field class="extension" v-model="saleCode" label="推广码" :required="true" placeholder="请输入推广码" />
            <div class="d-flex flex-column align-items-center">
                  <van-button @click="handleBind" :color="$primary" block class="position-absolute bindBtn">
                        绑定
                  </van-button>
            </div>
      </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
export default {
      components: { CommonHeader },
      data() {
            return {
                  // radio: '',
                  saleCode: '',
                  bankCode: '',
                  show: false,
                  fieldValue: '',
                  cascaderValue: '',
                  fieldNames: {
                        text: 'bankName',
                        value: 'id',
                        children: 'children'
                  },
                  // options: [
                  //       {
                  //             text: '河南省',
                  //             value: '330000',
                  //             children: [],
                  //       },
                  // ],
                  options:[]
            };
      },
      created() {
            this.getCodeList()
      },
      methods: {
            getCodeList() {
                  this.$http.get("/m/bankCode/api/getList").then(res=>{
                        console.log(res,'res');
                        if(res.result == 0) {
                              this.options = res.data   
                              console.log(this.options,'this.options');
                        }
                  })
            },
            handleBind() {
                  // let codeReg = /[^\w]/g;
                  // if (!codeReg.test(this.saleCode)) return this.$toast("推广码格式不符，请输入字母或数字");
                  this.$http.post("/m/members/api/setUserownerCode", { ownerCode: this.saleCode, bankCode: this.bankCode }).then(res => {
                        if (res.result === 0) {
                              this.$toast(res.msg);
                              setTimeout(() => {
                                    this.$router.push("/saleOrder");
                              }, 1200);
                        } else {
                              this.$toast(res.msg || "绑定失败");
                        }
                  });
            },
            onFinish({ selectedOptions }) {
                  console.log(selectedOptions,'selectedOptions');
                  if(selectedOptions[2].bankCode){
                        this.saleCode = selectedOptions[2].bankCode
                        this.bankCode = selectedOptions[2].bankCode
                  }
                  this.show = false;
                  this.fieldValue = selectedOptions.map(option => option.bankName).join('/');
            },
      },
};
</script>

<style lang="scss" scoped>
.bindSaleCode {
      height: 100vh;
      .bindBtn {
            width: 90vw;
      }
}
.van-cell {
      margin: 40px 16px 20px 16px;
} 
.extension {
      margin: 10px 4vw;
}
/* .van-radio-group--horizontal {
      margin-left: 8vw;
} */
.van-radio {
      margin: 5vw 8vw;
}
</style>
