<template>
    <div class="collection">
        <header>
            <div class="header_Box">
                <van-sticky>
                    <van-nav-bar title="收藏" left-arrow @click-left="back">
                        <template #left>
                            <van-icon name="arrow-left" size="20" color="#5f656b" />
                        </template>
                    </van-nav-bar>
                </van-sticky>
            </div>
        </header>
        <div class="colTypeHeader">
            <van-tabs v-model="active" color="rgb(41, 190, 129)" animated>
                <van-tab title="商品">
                    <div class="goodsColList-ignore" id="goodsColList">
                        <lazyList url="/m/collections/api/getList">
                            <template #default="{list}">
                                <collection-item
                                    v-for="(item, index) in outputGoodsList(list)"
                                    :key="index"
                                    :collectionItem="item"
                                    :disabled="false"
                                    @delete="deleteProduct(item)"
                                    @click="doDetail(item.prdno)"
                                ></collection-item>
                            </template>
                        </lazyList>
                    </div>
                </van-tab>
                <van-tab title="店铺">
                    <div class="storesColList-ignore" id="storesColList">
                        <lazyList url="/m/collections/biz/api/getList">
                            <template #default="{list}">
                                <storeItem
                                    v-for="(item, index) in outputStoresList(list)"
                                    :storeItem="item"
                                    :idx="index"
                                    :key="index"
                                    @clickstore="clickstore"
                                    @deletestore="deletestore"
                                />
                            </template>
                        </lazyList>
                    </div>
                </van-tab>
                <van-tab v-for="index in 3" :key="index" title="" disabled></van-tab>
            </van-tabs>
        </div>
        <toTop v-if="goodsList.length > 15" listId="goodsColList" />
        <toTop v-if="storesList.length > 15" listId="storesColList" />
    </div>
</template>

<script>
import toTop from "@/components/TOTOP";
import storeItem from "../../components/STOREITEM";
import { NavBar, Sticky, SwipeCell, Button, Image, Loading, Tabs, Tab, Icon, List } from "vant";
import collectionItem from "@/components/COLLECTIONITEM";
import _config from "../../assets/js/config";
import { mapMutations } from "vuex";
import lazyList from "@/components/LAZYLIST";
export default {
    data() {
        return {
            active: 0,
            fileServerAddress: _config.fileServerAddress,
            goodsList: [],
            storesList: [],
        };
    },
    components: {
        [Sticky.name]: Sticky,
        [NavBar.name]: NavBar,
        [SwipeCell.name]: SwipeCell,
        [Button.name]: Button,
        [Image.name]: Image,
        [Loading.name]: Loading,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Icon.name]: Icon,
        [List.name]: List,
        collectionItem,
        storeItem,
        lazyList,
        toTop,
    },
    //从店铺详情返回时依旧展示店铺收藏
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (from.path.includes("/storeDetail")) {
                vm.active = 1;
            }
        });
    },
    methods: {
        //从作用插槽中暴露出数据
        outputGoodsList(list) {
            this.goodsList = list;
            return list;
        },
        outputStoresList(list) {
            this.storesList = list;
            return list;
        },
        back() {
            isApp()
                .then(() => {
                    //是app的话
                    if (this.$route.query.isUserCenter == "true") {
                        // alert(this.$route.query.isUserCenter)
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
        //取消关注店铺
        deletestore(e) {
            const { item, index } = e;
            this.$http
                .get("m/collections/biz/api/delete", {
                    params: { bizid: Number(item.bizid) },
                })
                .then(res => {
                    if (res.result == 0) {
                        this.storeList.splice(index, 1);
                    } else {
                        this.$toast(res.msg);
                    }
                });
        },
        //取消收藏商品
        deleteProduct(e) {
            this.$http.post("/m/collections/api/delete", { prdid: e.prdid }).then(res => {
                if (res.result == 0) {
                    this.$toast("已取消收藏");
                    this.getGoodsList();
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        //点击店铺
        clickstore(e) {
            this.$router.push({
                path: "/storeDetail",
                query: { bizid: e.item.bizid },
            });
        },
        //点击店铺商品跳转到商品详情
        doDetail(prdno) {
            if (prdno == undefined) {
                return false;
            }
            this.$router.push({
                path: "/detail",
                query: {
                    prdno: prdno,
                },
            });
        },
    },
};
</script>

<style scoped>
.colTypeHeader >>> .van-tabs__wrap--scrollable .van-tabs__nav {
    overflow-x: hidden;
    background-color: #fff !important;
}
.collection >>> .van-tab {
    flex-basis: 18% !important;
}
.collection >>> .van-tabs__wrap {
    border-bottom: 1px solid #f7f7f7;
}
.van-nav-bar__left > .van-icon {
    color: #5f656b !important;
    font-size: 20px !important;
}
.collection {
    height: 100vh;
    overflow-y: scroll;
}
.goodsColList-ignore,
.storesColList-ignore {
    height: calc(100vh - 46px - 44px);
    background-color: #f2f2f2;
    overflow-y: scroll;
}
</style>
