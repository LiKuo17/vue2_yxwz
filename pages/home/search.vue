<template>
      <div class="search">
            <article>
                  <van-sticky>
                        <div class="search_Box">
                              <div @click="back">
                                    <van-icon size="20" name="arrow-left" />
                              </div>
                              <div>
                                    <form action="javascript:return true">
                                          <van-search
                                                ref="search"
                                                @focus="isSearch = true"
                                                placeholder="请输入搜索文字"
                                                shape="round"
                                                v-model="value"
                                                show-action
                                                @click="doSearch"
                                                @search="onSearch(value)"
                                                :autofocus="false"
                                          >
                                                <div class="search_Btn" slot="action" @click="onSearch(value)">搜索</div>
                                          </van-search>
                                    </form>
                              </div>
                        </div>

                        <van-dropdown-menu class="dropMenu" v-show="!isSearch" active-color="#29be81">
                              <van-dropdown-item @change="handleLeftMenuChange" v-model="value1" :options="option1" />
                              <van-dropdown-item @change="handleRightMenuChange" v-model="value2" :options="option2" />
                        </van-dropdown-menu>
                  </van-sticky>
            </article>
            <section ref="box" id="search_section" class="search_section">
                  <!-- ------------------------------------------------------------------------------------------- -->
                  <article v-show="isSearch">
                        <div class="search_Content_Box">
                              <div class="searchHistory_Box">
                                    <p class="his_p">
                                          <span class="search_history_sp">历史搜索</span>
                                          <span class="delete_sp" @click="clearHistory">
                                                <van-icon name="delete" />
                                          </span>
                                    </p>
                                    <div class="cloak_Box">
                                          <p class="history_value_p">
                                                <span v-for="(item, index) in searchHistory" :key="index" @click="onSearch(item)">{{ item }}</span>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </article>
                  <!-- ------------------------------------------------------------------------------------------- -->
                  <div v-if="!isSearch" class="card_Box mrn">
                        <div v-show="queryList.length > 0">
                              <div class="box_Content1" v-for="(item, index) in queryList" :key="index">
                                    <div class="sift_Article_Box" @click="goDetail(item.prdid)">
                                          <div class="box_Content2">
                                                <div class="left_box">
                                                      <div class="img_Box3">
                                                            <van-image
                                                                  :lazy-load="true"  
                                                                  fit="cover"
                                                                  :src="imgServerAdd + item.mainimage"
                                                            >
                                                                  <template v-slot:loading>
                                                                        <van-loading type="spinner" size="20" />
                                                                  </template>
                                                                  <template v-slot:error>
                                                                        <van-image :src="require('@/assets/img/detaul_Img.jpg')"></van-image>
                                                                  </template>
                                                            </van-image>
                                                      </div>
                                                </div>
                                                <div class="right_box d-flex flex-column justify-content-between h-100 py-2 border-box">
                                                      <div>
                                                            <div class="name fw-bold">{{ item.prdname }}</div>
                                                            <!-- <p class="norms">{{ item.features }}&nbsp;</p> -->
                                                             <span
                                                                  class="text-red fw-bold d-flex"
                                                                  v-if="item.isstaged == 0 && item.numberstages.split(',').length"
                                                            >
                                                                  <span class="me-1">￥</span>
                                                                  <span>{{
                                                                        (
                                                                              item.saleprice /
                                                                              Number(item.numberstages.split(",")[item.numberstages.split(",").length - 1])
                                                                        ).toFixed(2)
                                                                  }}</span>
                                                                  <span
                                                                        >*{{
                                                                              Number(item.numberstages.split(",")[item.numberstages.split(",").length - 1])
                                                                        }}期</span>
                                                            </span>
                                                            <div class="price_search fs-5 text-muted">
                                                                  <!-- <span>价格：</span> -->
                                                                  <span style="line-height: 12vw;">￥{{ item.saleprice.toFixed(2) }}</span>
                                                            </div>
                                                      </div>

                                                     
                                                </div>
                                          </div>
                                    </div>
                              </div>
                              <div style="padding: 15px;background: #f6f6f6a6;color: #bbb;font-size: 12px;margin-bottom: 3px;">
                                    没有更多了！
                              </div>
                        </div>
                        <div class="noMore w-100 bg-white" v-show="queryList.length <= 0">
                              <img src="../../assets/img/noMore.png" style="height: 100%;width: auto;" />
                        </div>
                  </div>
                  <ToTop listId="search_section"/>
            </section>
            <footer></footer>
      </div>
</template>

<script>
import _config from "../../assets/js/config";
import { NavBar, Step, Steps, Search, Icon, Dialog, Sticky, Image, Loading, DropdownMenu, DropdownItem } from "vant";
import ToTop from "@/components/TOTOP";
export default {
      name: "search",
      data() {
            return {
                  value: "",
                  isSearch: true,
                  queryList: [],
                  serverAdd: _config.serverAddress,
                  imgServerAdd: _config.fileServerAddress,
                  searchHistory: [],
                  titleText: "搜索",
                  scrollTop: 0,
                  value1: 0,
                  value2: "a",
                  option1: [{ text: "全部商品", value: 0 }, { text: "价格升序", value: 1 }, { text: "价格降序", value: 2 }],
                  option2: [{ text: "默认排序", value: "a" }, { text: "销量", value: "b" }],
            };
      },
      filters: {
            getInstal(stag) {
                  let splitArr = stag.split(",");
                  if (stag && splitArr && splitArr.length) {
                        return Number(splitArr[splitArr.length - 1]);
                  } else {
                        return 1;
                  }
            },
      },
      watch: {
            isSearch(newV) {
                  console.log(newV,'newV');
                  if (newV) {
                        this.value1 = 0;
                        this.value2 = "a";
                  }
            },
      },
      created() {
            this.getHistory();
      },
      mounted() {
            document.getElementById("search_section").addEventListener("scroll", this.handleScroll);
            let _value = this.$route.query.value;
            console.log(_value,'_value');
            // 按分类搜索
            if (_value) {
                  this.value = _value;
                  this.onSearch(_value, true);
            }
      },
      methods: {
            //0,1,2
            handleLeftMenuChange(e) {
                  this.value2 = "a";
                  //sortType: 0:不排序，1:升序，2:降序
                  //sortkey:  0:不排序，1:价格，2:销量
                  let params = {
                        sortType: 0,
                        sortKey: 0,
                        catid: -1,
                        keywords: this.value,
                        rows: 200,
                  };
                  if (this.$route.query.catid) {
                        params.keywords = "";
                        params.catid = this.$route.query.catid;
                  }
                  switch (e) {
                        case 1:
                              params.sortType = 1;
                              params.sortKey = 1;
                              break;
                        case 2:
                              params.sortType = 2;
                              params.sortKey = 1;
                              break;
                  }
                  this.getSearchResult(params);
            },
            //a,b
            handleRightMenuChange(e) {
                  this.value1 = 0;
                  let params = {
                        sortType: 0,
                        sortKey: 0,
                        catid: -1,
                        keywords: this.value,
                        rows: 200,
                  };
                  if (this.$route.query.catid) {
                        params.keywords = "";
                        params.catid = this.$route.query.catid;
                  }
                  switch (e) {
                        case "b":
                              params.sortType = 1;
                              params.sortKey = 2;
                              break;
                  }
                  this.getSearchResult(params);
            },
            getSearchResult(params) {
                  this.$http.get("/m/products/common/api/query", { params }).then(res => {
                        if (res.result == 0) {
                              this.queryList = res.data;
                              this.getHistory();
                        }
                  });
            },
            // 获取滚动条高度
            handleScroll() {
                  var _this = this;
                  _this.scrollTop = document.getElementById("search_section").scrollTop;
            },

            doSearch() {
                  var _this = this;
                  _this.isSearch = true;
            },
            back() {
                  var _this = this;
                  _this.$router.back();
            },
            goDetail(_prdid) {
                  var _this = this;
                  var _scrollTop = _this.scrollTop;
                  var _queryList = _this.queryList;
                  this.$router.push({
                        name: "detail",
                        query: {
                              prdid: _prdid,
                        },
                        params: {
                              queryList: _queryList,
                              scrollTop: _scrollTop,
                              value: _this.value,
                        },
                  });
            },
            onSearch(_value, isClass) {
                  this.isSearch = false;
                  this.value = _value;
                  var _catid = this.$route.query.catid;
                  if (!_catid) {
                        _catid = -1;
                  }
                  var _params = {};
                  if (isClass) {
                        _params = {
                              keywords: "",
                              catid: _catid,
                              rows: 200,
                              sortType: 0,
                              sortKey: 0,
                        };
                  } else {
                        _params = {
                              keywords: _value,
                              catid: _catid,
                              rows: 200,
                              sortType: 0,
                              sortKey: 0,
                        };
                  }
                  this.setHistory(_value);
                  this.$http
                        .get("/m/products/common/api/query", {
                              params: _params,
                        })
                        .then(e => {
                              console.log(e.data,'e.data');
                              if (e.result == 0) {
                                    this.queryList = e.data;
                                    this.getHistory();
                              }
                        });
            },
            setHistory(value) {
                  var _this = this;
                  var his = localStorage.getItem("search");
                  if (his.indexOf(value) != -1) {
                        return false;
                  } else {
                        localStorage.setItem("search", his + value + ",");
                  }
            },
            getHistory() {
                  var _this = this;
                  var obj = localStorage.getItem("search");
                  if (obj == null) {
                        localStorage.setItem("search", "");
                        _this.searchHistory = [];
                  } else {
                        _this.searchHistory = obj.split(",");
                  }
            },
            clearHistory() {
                  var _this = this;
                  Dialog.confirm({
                        title: "",
                        message: "确认删除全部历史纪录",
                  }).then(() => {
                        localStorage.removeItem("search");
                        _this.getHistory();
                  });
            },
      },
      beforeRouteEnter(to, from, next) {
            if (from.name == "detail") {
                  let _queryList = from.params.queryList;
                  let _scrollTop = from.params.scrollTop;
                  let _value = from.params.value;
                  // debugger;
                  next(mv => {
                        mv.queryList = _queryList;
                        mv.scrollTop = _scrollTop;
                        mv.value = _value;
                        mv.isSearch = false;
                        // document.getElementById('search_section').scrollTop = _scrollTop;
                  });
            } else {
                  next();
            }
      },

      beforeCreate: function() {
            // console.group('beforeCreate 创建前状态===============》');
      },

      beforeMount: function() {
            // console.group('beforeMount 挂载前状态===============》');
      },
      beforeUpdate: function() {
            // console.group('beforeUpdate 更新前状态===============》');
      },
      updated: function() {
            // console.group('updated 更新完成状态===============》');
            document.getElementById("search_section").scrollTop = this.scrollTop;
      },
      beforeDestroy: function() {
            // console.group('beforeDestroy 销毁前状态===============》');
      },
      destroyed: function() {
            // console.group('destroyed 销毁完成状态===============》');
      },

      components: {
            [NavBar.name]: NavBar,
            [Step.name]: Step,
            [Steps.name]: Steps,
            [Search.name]: Search,
            [Icon.name]: Icon,
            [Sticky.name]: Sticky,
            [Image.name]: Image,
            [Loading.name]: Loading,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            ToTop
      },
};
</script>
<style scoped>
/* @import url("../../../static/search.css"); */
/* @import url("../../../static/icon.css"); */
/* @import url("../../../static/navbar.css"); */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.van-image {
      width: 54vw;
    height: 43vw;
}
.noMore {
      width: 100%;
      height: 300px;
      padding: 15px 0;
      /* background: url(../assets/img/noMore.png) no-repeat center center;
    background-size: contain; */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
}

.search_section {
      height: calc(100vh - 26vw);
      overflow-y: auto;
      background-color: #f4f4f4;
}

.norms {
      color: rgb(235, 101, 101);
      font-size: 30px;
      margin-top: 4px;
}

.box_Content2 {
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 10px 10px;
      width: 100%;
      box-sizing: border-box;
}

.img_Box3 {
      width: 54vw;
      height: 43vw;
      margin-right: 24px;
      border-radius: 14px;
      overflow: hidden;
}

.box_Content1 {
      background-color: #fff;
      border-radius: 14px;
      margin: 0 18px;
      margin-top: 18px;
      padding: 0;
}
.box_Content1:last-of-type {
      margin-bottom: 18px;
}

.mrn {
      position: relative;
}

.sift_Article_Box {
      display: flex;
      justify-content: space-between;
}

.history_value_p {
      line-height: 60px;
      text-align: left;
}

.history_value_p > span {
      display: inline-block;
      padding: 0 32px;
      color: rgb(102, 102, 102);
      border-radius: 36px;
      background-color: rgb(245, 245, 245);
      font-size: 26px;
      margin-right: 20px;
      margin-bottom: 12px;
}

.cloak_Box {
      overflow: hidden;
}

.his_p {
      display: inline-block;
      width: 100%;
      line-height: 40px;
}

.delete_sp {
      float: right;
      font-size: 38px;
      color: rgb(153, 153, 153);
      vertical-align: middle;
}

.delete_sp i {
      vertical-align: middle;
}

.search_history_sp {
      color: rgb(51, 51, 51);
      font-size: 28px;
      font-weight: bold;
      float: left;
}

.searchHistory_Box {
      padding: 0 32px;
      width: calc(100% - 64px);
      min-height: 250px;
      padding-top: 40px;
      border-radius: 30px;
      background-color: rgb(255, 255, 255);
}

.search_Content_Box {
      margin-top: 20px;

      position: relative;
      min-height: calc(100vh - 130px);
}

.search_Btn {
      color: #29be81;
}

.search {
      background-color: #f6f6f6;
      width: 100%;
      height: 100vh;
      overflow: hidden;
}

.search_Box {
      padding: 7px 10px;
      /*no*/
      position: relative;
      display: flex;
      background-color: white;
}

.search_Box > div:nth-child(1) {
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5f656b;
      font-size: 20px;
}

.search_Box > div:nth-child(2) {
      width: calc(100% - 60px);
}

.van-search__action:active {
      background-color: transparent;
}

.bg_Box {
      position: fixed;
      height: 160px;
      width: 100%;
      background: linear-gradient(to right, #e35e95, #ee7c86);
      z-index: 0;
}

.card_Box {
      /* background-color: white; */
}

.price_search {
      margin-top: -0.6vw;
}

.noprice > span:nth-child(2) {
      color: #888888;
      font-size: 30px;
      font-weight: bold;
}

.norms {
      color: rgb(235, 101, 101);
      font-size: 30px;
      margin-top: 10px;
}

.name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
    color: #333;
    margin: .933vw 0;
    padding: .933vw 0;
    line-height: 10vw;
    font-size: 3.7vw;
}

.right_box {
      float: right;
      width: 450px;
      text-align: left;
}

.right_box > p {
      padding: 0;
}

.sift_Article_Box:nth-child(1) > .box_Content2 {
      border-top: 0;
}

.sift_Article_Box {
      display: flex;
      /*padding-top: 32px;*/
      justify-content: space-between;
}

article .PRDLIST {
      padding-top: 0;
}

.sift_Article_Box {
      display: flex;
      /*padding-top: 32px;*/
      justify-content: space-between;
}

.history_value_p {
      line-height: 60px;
      text-align: left;
}

.history_value_p > span {
      display: inline-block;
      padding: 0 32px;
      color: rgb(102, 102, 102);
      border-radius: 36px;
      background-color: rgb(245, 245, 245);
      font-size: 26px;
      margin-right: 20px;
}

.cloak_Box {
      overflow: hidden;
}

.his_p {
      display: inline-block;
      width: 100%;
      line-height: 40px;
}

.delete_sp {
      float: right;
      font-size: 38px;
      color: rgb(153, 153, 153);
      vertical-align: middle;
}

.delete_sp i {
      vertical-align: middle;
}

.search_history_sp {
      color: rgb(51, 51, 51);
      font-size: 28px;
      font-weight: bold;
      float: left;
}

.searchHistory_Box {
      padding: 0 32px;
      width: calc(100% - 64px);
      min-height: 430px;
      padding-top: 40px;
}

.mrn {
      position: relative;
}

.van-search__action:active {
      background-color: transparent;
}

.dropMenu {
      height: 9vw;
      border-bottom: 1px solid #fff;
}
/deep/ .van-dropdown-menu__bar {
      height: 100%;
}
/deep/ .van-cell {
      padding: 5px 8px;
}
img {
      width: 100%;
      height: 100%;
}
</style>
