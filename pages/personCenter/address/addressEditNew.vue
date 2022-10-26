<template>
  <div class="van_addressAdd">
    <header>
      <div class="header_Box">
        <van-nav-bar title="修改地址" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="van_addressAdd_section">
      <article>
        <van-address-edit
          :area-list="areaList"
          :address-info="addressInfo"
          show-set-default
          show-search-result
          show-delete
          @save="onSave"
          @delete="onDelItem"
        />
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import _areaList from "@/assets/js/area";
import { NavBar, AddressEdit, Toast } from "vant";
import { delOnlyData, postData } from "../../../api";
//console.log(_areaList);
export default {
  name: "addressAddNew",
  data() {
    return {
      areaList: _areaList,
      // areaList,
      searchResult: [],
      addressInfo: {},
    };
  },
  created() {
    let getAddressObj = localStorage.getItem("editAddressObj");
    let routeObj = JSON.parse(getAddressObj);
    let tempObj = {
      id: routeObj.id,
      addressDetail: routeObj.address,
      name: routeObj.name,
      tel: routeObj.tel,
      status: routeObj.isDefault ? "1" : "0",
      province: routeObj.province,
      city: routeObj.city,
      county: routeObj.county,
    };
    this.addressInfo = tempObj;
  },
  methods: {
    back() {
      //console.log(1);
      this.$router.go(-1);
    },
    // 修改收获地址
    async onSave(content) {
      console.log(content, "12312");
      let tempObj = {
        id: this.addressInfo.id,
        addr: content.addressDetail,
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        status: content.isDefault ? "1" : "0",
      };
      const result = await postData("editAdress", tempObj);
      if (result.code === 0) {
        this.$toast.success("修改成功");
        this.$router.push("/address");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    async onDelItem(item) {
      const result = await delOnlyData("delAdress", item.id);
      if (result.code === 0) {
        this.$toast.success("删除成功");
        this.$router.push("/address");
      } else {
        this.$toast.fail("删除失败");
      }
      console.log(item, "item");
    },
    onChangeDetail(val) {},
  },
  components: {
    [NavBar.name]: NavBar,
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast,
  },
};
</script>

<style lang="scss" scoped>
.van_addressAdd {
}
/deep/ .van-button--danger {
  color: white;
  border: 1px solid #c3a769 !important;
  background: #c3a769 !important;
}

.van_addressAdd_section {
  background-color: #f9f9f9;
  width: 100%;
  min-height: calc(100vh - 46px -10px);
  text-align: left;
  padding-top: 10px;
}
</style>
