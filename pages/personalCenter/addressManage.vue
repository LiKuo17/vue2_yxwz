<template>
  <div class="addressEdit">
    <header>
      <div class="header_Box">
        <van-nav-bar
          title="我的收货地址"
          left-arrow
          @click-left="back"
          right-text="设置默认地址"
          @click-right="setDetail"
        />
      </div>
    </header>
    <section class="addressEdit_section">
      <van-address-list
        v-model="chosenAddressId"
        @select="selectAdd"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />
    </section>
    <footer></footer>
  </div>
</template>

<script>
import { NavBar, AddressList, Toast } from "vant";

export default {
  name: "test",
  data() {
    return {
      chosenAddressId: "-1",
      list: [],
    };
  },
  created() {
    var _this = this;
    _this.getAddressData();
    //console.log(_this.$route.query.from);
    //console.log(_this.$router);
  },
  methods: {
    selectAdd(item, index) {
      //console.log(item);
      var _this = this;
      if (_this.$route.query.from) {
        _this.$http
          .get("/m/members/api/setDeliveryAddressAsDefault", {
            params: {
              addrId: item.id,
            },
          })
          .then(function(e) {
            if (e.result == 0) {
              Toast("已设为常用地址");
              _this.$router.back();
            } else {
              Toast("设置失败");
            }
          });
      }
    },
    onAdd() {
      this.$router.push("/addressAdd");
    },
    onEdit(item, index) {
      //console.log("id" + item.id);
      //console.log(index);
      this.$router.push({
        path: "/addressEdit",
        query: {
          id: item.id,
        },
      });
    },
    back() {
      isApp()
        .then(() => {
          //是app的话
          if (this.$route.query.isUserCenter == "true") {
            //app返回
            appBack();
          } else {
            this.$back();
          }
        })
        .catch(() => {
          this.$back();
        });
    },
    getAddressData() {
      var _this = this;
      _this.$http
        .get("/m/members/api/getDeliveryAddressList", {
          params: {},
        })
        .then(function(e) {
          if (e.result == 0) {
            if (e.data != "" || e.data != undefined || e.data != null) {
              for (var i = 0; i < e.data.length; i++) {
                var obj = e.data[i];
                obj.address =
                  obj.province + obj.city + obj.county + obj.addressDetail;
                _this.list.push(obj);
                if (obj.isDefault == 1) {
                  _this.chosenAddressId = obj.id;
                }
              }
            }
          }
          //console.log(e);
        });
    },
    setDetail() {
      //console.log();
      var _this = this;
      //console.log(_this.chosenAddressId);
      if (_this.chosenAddressId == "-1") {
        Toast("请先选择一个地址");
        return false;
      }
      _this.$http
        .get("/m/members/api/setDeliveryAddressAsDefault", {
          params: {
            addrId: _this.chosenAddressId,
          },
        })
        .then(function(e) {
          if (e.result == 0) {
            //console.log();
            Toast("设置成功");
          } else {
            Toast("设置失败");
          }
        });
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [AddressList.name]: AddressList,
    [Toast.name]: Toast,
  },
};
</script>
<style>
@import url("../../../static/navbar.css");
.addressEdit .van-address-item .van-radio__icon--checked .van-icon {
  background-color: rgb(41, 190, 129);
  border-color: rgb(41, 190, 129);
}

.addressEdit .van-button--danger {
  background-image: linear-gradient(to right, #1cda9a, #06b4c5);
  border: 0;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addressEdit {
}

.addressEdit_section {
  background-color: #f9f9f9;
  width: 100%;
  height: calc(100vh - 92px);
  overflow: auto;
}

.addressEdit .van-icon {
  color: rgb(41, 190, 129);
}
</style>
