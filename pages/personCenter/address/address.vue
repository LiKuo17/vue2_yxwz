<template>
  <div class="addressBox">
    <div class="address_content">
      <!-- disabled-text="以下地址超出配送范围" -->
      <!-- :disabled-list="disabledList" -->
      <van-address-list
        v-model="chosenAddressId"
        :list="adressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        color="blue"
      />
    </div>
    <!-- <div class="buttonBox" @click="addAddress">
            <van-button type="primary" color=“#c3a769” round block>新增地址</van-button>
        </div> -->
  </div>
</template>
<script>
import { getData } from "../../../api";
export default {
  components: {},
  data() {
    return {
      chosenAddressId: "1",
      adressList: [],
    };
  },
  created() {
    this.getAdressList();
  },
  methods: {
    onAdd() {
      this.$router.push("/addressAddNew");
    },
    // 跳转并传对象
    onEdit(content) {
      this.$router.push("/addressEditNew");
      localStorage.setItem("editAddressObj", JSON.stringify(content));
    },
    // 获取收获地址列表
    async getAdressList() {
      const result = await getData("getAdressList");
      if (result.code === 0) {
        result.data.forEach((item) => {
          let obj = {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: item.addr,
            province: item.province,
            city: item.city,
            county: item.county,
            isDefault: item.status == "1" ? true : false,
          };
          this.adressList.push(obj);
        });
      } else {
        this.$toast.fail("获取收货地址列表失败");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addressBox {
  height: 100vh;
}
.buttonBox {
  position: fixed;
  bottom: 1%;
  width: 90%;
  left: 5%;
}
.van-button--primary {
  background-color: #c3a769 !important;
  border: #c3a769 !important;
}
/deep/ .van-address-item .van-radio__icon--checked .van-icon {
  background-color: #c3a769 !important;
  border: #c3a769;
  display: none;
}
/deep/ .van-button--danger {
  background-color: #c3a769 !important;
  border: #c3a769;
}
.address_content {
  background: #f6f6f6;
  /* height: 100%; */
}
</style>
