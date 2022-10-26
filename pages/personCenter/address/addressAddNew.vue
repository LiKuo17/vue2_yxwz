<template>
  <div class="van_addressAdd">
    <header>
      <div class="header_Box">
        <van-nav-bar title="添加地址" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="van_addressAdd_section">
      <article>
        <van-address-edit
          :area-list="areaList"
          :address-info="addressInfo"
          show-set-default
          show-search-result
          @save="onSave"
        />
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import _areaList from "@/assets/js/area";
import { NavBar, AddressEdit, Toast } from "vant";
import { postData } from "../../../api";
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
  methods: {
    back() {
      //console.log(1);
      this.$router.go(-1);
    },
    // 添加收获地址
    async onSave(content) {
      let tempObj = {
        addr: content.addressDetail,
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        status: content.isDefault ? "1" : "0",
      };
      const result = await postData("addAdress", tempObj);
      if (result.code === 0) {
        this.$toast.success("添加成功");
        this.$router.push("/address");
      } else {
        this.$toast.fail("添加失败");
      }
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
