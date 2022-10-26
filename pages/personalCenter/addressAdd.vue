<template>
  <div class="van_addressAdd">
    <header>
      <div class="header_Box">
        <van-nav-bar title="添加地址" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="van_addressAdd_section">
      <article>
        <van-address-edit :area-list="areaList" show-postal :address-info='addressInfo' show-set-default
          show-search-result @save="onSave" />
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
  import _areaList from '../../assets/js/area'
  import {
    NavBar,
    AddressEdit,
    Toast
  } from 'vant';
  //console.log(_areaList);
  export default {
    name: 'van_addressAdd',
    data() {
      return {
        areaList: _areaList,
        searchResult: [],
        addressInfo: {}
      }
    },
    methods: {
      back() {
        //console.log(1);
        this.$router.go(-1);
      },
      onSave(content) {
        var _this = this;
        _this.$http.post('/m/members/api/insertDeliveryAddress', {
          id: content.id,
          isDefault: content.isDefault,
          areaCode: content.areaCode,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          postalCode: content.postalCode,
          name: content.name,
          tel: content.tel
        }).then(function(e) {
          //console.log(e);
          if (e.result == 0) {
            Toast('添加成功');
            _this.$router.back();
          } else {
            Toast('添加失败');
          }
        })

      },
      onChangeDetail(val) {
        //暂时不写
        //				if(val) {
        //					this.searchResult = [{
        //						name: '黄龙万科中心',
        //						address: '杭州市西湖区'
        //					}];
        //				} else {
        //					this.searchResult = [];
        //				}
        //console.log('跳过');
      }

    },
    components: {
      [NavBar.name]: NavBar,
      [AddressEdit.name]: AddressEdit,
      [Toast.name]: Toast

    },
    created() {
      var _this = this;
      //			//console.log(_this.$route.query.id);

    }
  }
</script>
<style>
  @import url("../../../static/navbar.css");

  .van_addressAdd .van-button--danger {
    background-image: linear-gradient(to right, #1CDA9A, #06B4C5);
    border: 0;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .van_addressAdd {

  }

  .van_addressAdd_section{
    background-color: #f9f9f9;
    width: 100%;
    min-height: calc(100vh - 46px -10px);
    text-align: left;
    padding-top: 10px;
  }

</style>
