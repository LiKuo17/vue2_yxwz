<template>
  <div>
    <!-- 右上角菜单+标题栏 -->
    <popupMenu title="购物车" @click-left="back" />
    <div class="tab_contents1_ignore" @touchmove.stop>
      <van-checkbox-group v-model="selectbuyCartList">
        <div
          class="SwipeCell_Box"
          :class="doDelete == index ? 'SwipeCell_Box1' : ''"
          v-for="(item, index) in buyCartList"
          :key="index"
        >
          <van-swipe-cell>
            <div class="box_Content">
              <div class="left_box2">
                <van-checkbox
                  :name="index"
                  checked-color="#29BE81"
                ></van-checkbox>
              </div>
              <div class="left_box">
                <div class="img_Box1">
                  <!-- :src="imgServerAdd + item.iconurl" -->
                  <img
                    :src="item.iconurl"
                    onerror="this.src='../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
                  />
                </div>
              </div>
              <div class="right-item">
                <!-- <div class="right_box" @click="goDetail(item.prdno)"> -->
                <div class="right_box">
                  <p class="name">{{ item.prdname }}</p>
                  <div class="Specifications" @click="chooseSpec">
                    <div class="chooseSpecifications">XL码(175/96)</div>
                    <span><van-icon name="arrow-down" /></span>
                  </div>
                  <!-- <div> -->
                  <div class="stepper_Box">
                    <p class="allprice">￥{{ item.amt | NumFormat }}</p>
                    <van-stepper
                      v-model="item.quantity"
                      @plus="add(index)"
                      @minus="minus(index)"
                    />
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
            <template #right>
              <div class="delete_Box" @click="doDeleteBuyCart(item.rid, index)">
                删除
              </div>
            </template>
          </van-swipe-cell>
        </div>
      </van-checkbox-group>
      <div class="price_content1" v-if="this.buyCartList.length <= 0">
        <p class="emptyCar">
          <!-- <van-empty class="custom-image" image="../../assets/img/购物车空.png" description="暂无返现" /> -->
          <img
            src="../../assets/img/购物车空.png"
            style="width: 20%; opacity: 0.4"
            alt=""
          />
          <span class="lineOne">购物车还是空的</span>
          <span class="lineTwo">赶紧买点宝贝慰劳下自己吧</span>
          <van-button
            round
            size="small"
            @click="goBuy"
            plain
            class="goShop"
            type="danger"
            >去逛逛</van-button
          >
        </p>
      </div>
    </div>
    <div class="price_content">
      <div @click="handleChooseAll" class="leftChooseArea">
        <van-checkbox
          v-model="allChoose"
          checked-color="#c3a769"
        ></van-checkbox>
        <div>全选</div>
      </div>

      <div class="rightChooseArea">
        <div class="settle">
          <span style="display: flex"
            ><span style="color: black">合计：</span
            ><span style="color: #c3a769"
              >￥{{ allPrice.toFixed(2) }}</span
            ></span
          >
          <span style="color: #969799; font-size: 12px; text-align: right"
            >不含运费</span
          >
        </div>
        <van-button
          color="rgb(41, 190, 129)"
          class="goSettle"
          type="danger"
          size="small"
          @click="clearing"
          >去结算</van-button
        >
      </div>
    </div>
    <!-- 规格选择 -->
    <van-action-sheet v-model="showSpecifications" title="标题">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script>
import {
  CheckboxGroup,
  Sticky,
  NavBar,
  Dialog,
  Button,
  SwipeCell,
  Checkbox,
  Stepper,
  Icon,
  Toast,
} from "vant";
import _config from "../../assets/js/config";
import popupMenu from "../../components/POPUPMENU";
export default {
  data() {
    return {
      selectbuyCartList: [],
      showSpecifications: false,
      buyCartList: [
        {
          amount_all: 2502,
          amount_month: 834,
          amt: 2502,
          bankid: 2,
          bizid: 5,
          bizname: "深圳市雅棉居品数据股份有限公司",
          catname: "舒适睡眠枕",
          createtime: 1633932439000,
          fee: 0,
          firstDistribution: "",
          iconurl:
            "https://img01.yzcdn.cn/upload_files/2020/08/10/Fh7DObuYydCcEv4r3k1v__FRbbTg.jpg?imageView2%2F2%2Fw%2F200%2Fh%2F200%2Fq%2F75%2Fformat%2Fwebp",
          instalments: 3,
          isvirtual: 0,
          prdid: 579,
          prdname: "amain雅棉淳梦羽丝枕一对装",
          prdno: "p20210806183615052",
          quantity: 18,
          rate: 0,
          rid: 1887,
          saleid: 1713,
          saleprice: 139,
          sku_type1: "白色",
          sku_type2: "标准",
          status: 1,
          uid: "600001",
        },
      ],
      imgServerAdd: _config.fileServerAddress,
      doDelete: -1,
      allChoose: false,
      ownerCode: "",
    };
  },
  components: {
    vanCheckboxGroup: CheckboxGroup,
    vanSticky: Sticky,
    vanNavBar: NavBar,
    vanButton: Button,
    vanSwipeCell: SwipeCell,
    vanCheckbox: Checkbox,
    vanStepper: Stepper,
    vanIcon: Icon,
    popupMenu,
  },
  watch: {
    selectbuyCartList(newV) {
      newV.length == this.buyCartList.length && (this.allChoose = true);
      newV.length != this.buyCartList.length && (this.allChoose = false);
    },
  },
  computed: {
    allPrice() {
      var num = 0;
      this.selectbuyCartList.forEach((item) => {
        num = parseFloat(num + this.buyCartList[item].amt, 2);
      });
      return num;
    },
  },
  created() {
    // this.getUserInfo();
    this.getBuyCartData();
  },
  methods: {
    chooseSpec() {
      console.log(222222222222222);
      this.showSpecifications = true;
    },
    goBuy() {
      this.$router.push("/");
    },
    // getUserInfo() {
    //   this.$http.get("/m/members/api/getInfo").then((e) => {
    //     if (e.result == 0) {
    //       this.ownerCode = e.data.ownerCode;
    //     }
    //   });
    // },
    handleChooseAll() {
      this.allChoose = !this.allChoose;
      if (this.allChoose) {
        this.selectbuyCartList = this.buyCartList.map((item, index) => index);
      } else {
        this.selectbuyCartList = [];
      }
    },
    goDetail(_prdno) {
      this.$router.push({
        path: "/detail",
        query: {
          prdno: _prdno,
        },
      });
    },
    back() {
      this.$router.push("/");
    },
    getBuyCartData() {
      this.$http
        .get("/m/shopcart/api/getlist", {
          params: {
            rows: 0,
            page: 1,
          },
        })
        .then((e) => {
          if (e.rows != undefined) {
            this.buyCartList = e.rows.filter((item) => item.status == 1);
            this.buyCartList.reverse();
          }
        });
    },
    add(index) {
      this.buyCartList[index].quantity++;
      this.$http
        .get("/m/shopcart/api/updateQuanity", {
          params: {
            rid: this.buyCartList[index].rid,
            quantity: this.buyCartList[index].quantity,
          },
        })
        .then((e) => {
          if (e.result == 0) {
            this.getBuyCartData();
          }
        });
    },
    minus(index) {
      if (this.buyCartList[index].quantity > 0)
        this.buyCartList[index].quantity--;
      this.$http
        .get("/m/shopcart/api/updateQuanity", {
          params: {
            rid: this.buyCartList[index].rid,
            quantity: this.buyCartList[index].quantity,
          },
        })
        .then((e) => {
          if (e.result == 0) {
            this.getBuyCartData();
          }
        });
    },
    doDeleteBuyCart(_rid, _index) {
      Dialog.confirm({
        title: "确认删除吗？",
      }).then(() => {
        this.$http
          .get("/m/shopcart/api/deleteItem", {
            params: {
              rid: _rid,
            },
          })
          .then((e) => {
            if (e.result == 0) {
              this.doDelete = -1;
              this.buyCartList.splice(_index, 1);
              Toast("删除成功");
            }
          });
      });
    },
    clearing() {
      var idsList = [];
      var _lslist = [];
      let ownerCode = sessionStorage.getItem("ownerCode")
        ? sessionStorage.getItem("ownerCode")
        : this.ownerCode;
      console.log(ownerCode, "ownerCodeownerCodeownerCode");
      this.selectbuyCartList.forEach((item) => {
        idsList.push(this.buyCartList[item].rid);
        _lslist.push(this.buyCartList[item].instalments);
      });
      _lslist.sort();
      if (idsList.length < 1) {
        Toast("请选择商品在结算");
        return false;
      }
      if (_lslist[0] != _lslist[_lslist.length - 1]) {
        Toast("不能有不同的分期");
        return false;
      }
      this.$router.push({
        path: "/confirmOrder",
        query: {
          froms: "shoppingCart",
          ids: idsList,
          ownerCode: ownerCode,
        },
      });
    },
  },
};
</script>

<style scoped>
.leftChooseArea {
  display: flex;
}
.leftChooseArea > div:last-child {
  margin-left: 2.5vw;
}
.rightChooseArea {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.rightChooseArea > span {
  margin-right: 2.5vw;
}
.van-nav-bar__left > .van-icon {
  color: #5f656b !important;
  font-size: 20px !important;
}
.tab_contents1_ignore {
  height: 84vh;
  position: relative;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #f7f8fa;
}
.SwipeCell_Box {
  background-color: #fff;
  border-radius: 14px;
  margin: 2vw;
  position: relative;
  /* border-bottom: 1px solid rgb(223, 223, 223); */
  transform: translateX(0);
  transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
}

.SwipeCell_Box1 {
  transform: translateX(120px);
}
.box_Content {
  padding-left: 18px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 250px;
}
.left_box2 {
  /* float: left; */
  width: 50px;
  /* margin-top: 112px; */
}
.left_box {
  /* float: left; */
  width: 240px;
  /* margin-top: 50px; */
}
.img_Box1 {
  /* width: 240px; */
  text-align: center;
  height: 192px;
}
.img_Box1 > img {
  height: 100%;
  width: auto;
}
.right_box {
  /* float: left; */
  width: 410px;
  height: 192px;
  /* margin-top: 24px; */
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.right_box > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price {
  margin-top: 4px;
}

.price > span:nth-child(2) {
  color: rgb(235, 101, 101);
  font-size: 30px;
  font-weight: bold;
}

.price > span:nth-child(1) {
  color: rgb(153, 153, 153);
  font-size: 30px;
  font-weight: 600;
}

.norms {
  color: rgb(235, 101, 101);
  font-size: 29px;
  margin-top: 4px;
}

.name {
  color: rgb(51, 51, 51);
  font-size: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.allprice {
  color: rgb(51, 51, 51);
  font-size: 30px;
  font-weight: bold;
}
.stepper_Box {
  text-align: right;
  /* margin-top: 6px; */
  /* margin-right: 40px; */
  /* margin-bottom: 24px; */
  display: flex;
  justify-content: space-between;
}
.delete_Box {
  background-color: red;
  color: white;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
}
.price_content {
  border-top: 0.2px solid #f5efef;
  height: 16vw;
  box-sizing: border-box;
  color: black;
  text-align: left;
  padding: 1vw 32px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: -1;
}
.price_content1 {
  /* height: 88px; */
  color: black;
  text-align: left;
  /* line-height: 88px; */
  padding: 4px 32px;
  padding-top: 170px;
  /* background-color: #f9f9f9; */
}
.emptyCar {
  display: flex;
  text-align: center;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.lineOne {
  font-size: 28px;
  color: #323233;
  margin-bottom: 8px;
  margin-top: 24px;
  font-weight: 400;
}
.lineTwo {
  font-size: 28px;
  color: #969799;
}
.goShop {
  box-sizing: border-box;
  width: 148px;
  height: 64px;
  line-height: 60px;
  font-size: 28px;
  margin: 32px auto 0;
  border: 2px solid #c3a769;
  color: #c3a769;
  border-radius: 32px;
}
.settle {
  height: 80px;
  font-size: 28px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
.goSettle {
  height: 72px;
  line-height: 72px;
  min-width: 192px;
  border-radius: 36px;
  margin-left: 24px;
  border: none;
  background: #c3a769 !important;
  color: white;
  font-size: 28px;
}
.Specifications {
  display: flex;
  align-items: center;
  font-size: 24px;
  width: 248px;
  height: 32px;
  line-height: 32px;
  color: #969799;
  background-color: #f7f8fa;
  padding: 8px 16px;
}
.chooseSpecifications {
  margin-right: 64px;
}
</style>
