<template>
    <div style="height:100vh;overflow:scroll;">
        <van-sticky>
            <van-nav-bar title="农商馆" left-arrow @click-left="back">
                <template #left>
                    <van-icon name="arrow-left" size="20" color="#5f656b" />
                </template>
            </van-nav-bar>
        </van-sticky>

        <div class="frameFalse" v-if="!iframeSrc">
            <van-search
                ref="search"
                @focus="isSearch = true"
                placeholder="请输入搜索文字"
                shape="round"
                v-model="searchVal"
                show-action
                @search="onSearch(searchVal)"
            >
                <div class="search_Btn" slot="action" @click="onSearch(searchVal)">搜索</div>
            </van-search>
            <div class="container">
                <div style="backgroundImage: url('/static/img/venueSwiper1.png')" class="headImg"></div>
                <div class="venues">
                    <div
                        :style="{ backgroundImage: 'url(' + $fun.getImageUrl(item.image) + ')' }"
                        @click="ToVenueDetail(item)"
                        class="venue"
                        v-for="(item, index) in venues"
                        :key="index"
                    ></div>
                    <div
                        class="venue"
                        v-for="item1 in 3 - (venues.length % 3)"
                        :key="item1 + 999"
                        style="visibility:hidden;"
                    ></div>
                </div>
            </div>
        </div>
        <iframe
            id="iframe"
            v-if="iframeSrc"
            style="height:calc(100vh - 46px);width:100vw;"
            :src="iframeSrc"
            frameborder="0"
        ></iframe>
    </div>
</template>
<script>
import { NavBar, Icon, Sticky, Search } from "vant";
export default {
    data() {
        return {
            venuesInfo: {},
            venues: [],
            searchVal: "",
            iframeSrc: "",
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Sticky.name]: Sticky,
        [Search.name]: Search,
    },
    created() {
        this.getVenueList();
    },
    methods: {
        back() {
            if (this.iframeSrc) {
                this.iframeSrc = "";
            } else {
                this.$router.push("/");
            }
        },
        getVenueList(bankname) {
            let params = { page: 1, rows: 999 };
            if (bankname) {
                params.bankname = bankname;
            }
            this.$http
                .get("/m/bankproducts/api/common/getList", {
                    params,
                })
                .then(res => {
                    if (res.result == 0) {
                        this.venues = res.data.rows;
                    }
                });
        },
        ToVenueDetail(e) {
            this.iframeSrc = this.$toHttpAddress(e.url);
        },
        onSearch() {
            if (this.searchVal) {
                this.getVenueList(this.searchVal);
            }
        },
    },
};
</script>

<style scoped>
iframe {
    width: 1px;
    min-width: 100%;
    *width: 100%;
}
.container {
    padding: 2.4vw;
}
.headImg,
.venue {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 100% 100%;
}
.headImg {
    background-color: rgb(230, 230, 230);
    width: 100%;
    height: 38vw;
    border-radius: 1.6vw;
}
.venues {
    margin-top: 0.4vw;
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    flex-wrap: wrap;
}
.venue {
    margin-top: 2.4vw;
    width: 30vw;
    height: 24vw;
    background-color: rgb(230, 230, 230);
    border-radius: 1.6vw;
}
</style>
