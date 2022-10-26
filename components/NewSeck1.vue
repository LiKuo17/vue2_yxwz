<template>
    <div class="newSeck1">
        <div class="seckBlock">
            <div class="seckLine" @click="clickRight">
                <div>限时抢购</div>
                <div>
                    <van-count-down :time="time" @finish="finish">
                        <template v-slot="timeData">
                            <div>
                                <span class="timeBlock">{{ timeData.hours | padStart_first }}</span>
                                <span class="timeBlock">{{ timeData.hours | padStart_second }}</span>
                            </div>

                            <span class="timeInterval">:</span>

                            <div>
                                <span class="timeBlock">{{ timeData.minutes | padStart_first }}</span>
                                <span class="timeBlock">{{ timeData.minutes | padStart_second }}</span>
                            </div>

                            <span class="timeInterval">:</span>

                            <div>
                                <span class="timeBlock">{{ timeData.seconds | padStart_first }}</span>
                                <span class="timeBlock">{{ timeData.seconds | padStart_second }}</span>
                            </div>
                        </template>
                    </van-count-down>
                </div>
            </div>

            <van-swipe class="my-swipe" :autoplay="10000" :show-indicators="false">
                <van-swipe-item v-for="(item, index) in prdList_com" :key="index">
                    <div class="seckGoods">
                        <div class="seckGoodsItem" @click="listClick(index1, prod)" v-for="(prod, index1) in item" :key="index1">
                            <div
                                :style="{
                                    backgroundImage: 'url(' + imgServerAdd + prod.mainimage + ')',
                                }"
                            ></div>
                            <div class="seckPriceLine">
                                <span
                                    ><span>￥</span><span>{{ prod.seckillprice }}</span></span
                                >
                                <span
                                    ><span>￥</span><span>{{ prod.saleprice }}</span></span
                                >
                            </div>
                            <div>仅剩{{ prod.stock }}件</div>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="liveBlock">
            <div @click="HotliveRoomList.length ? goliveRoom(HotliveRoomList[0].live_id) : ''">
                {{ HotliveRoomList.length ? "精选直播live>>" : "精选直播，敬请期待" }}
            </div>
            <div>
                <div
                    v-for="(item, index) in HotliveRoomList"
                    @click="goliveRoom(item.live_id)"
                    :key="index"
                    :style="{ backgroundImage: 'url(' + $fun.getImageUrl(item.products[0].mainimage) + ')' }"
                ></div>
            </div>
        </div>
    </div>
</template>
<script>
import { CountDown, Swipe, SwipeItem } from "vant";
import _config from "../assets/js/config";
export default {
    data() {
        return {
            imgServerAdd: _config.fileServerAddress,
            HotliveRoomList: [],
            prdList_com: [],
        };
    },
    props: {
        time: {
            type: Number,
            default: 0,
        },
        finish: {
            type: Function,
            default: () => () => {},
        },
        prdList: {
            type: Array,
            default: function() {
                return [];
            },
        },
        clickRight: {
            type: Function,
            default: () => () => {},
        },
        listClick: {
            type: Function,
            default: () => () => {},
        },
        status: {
            type: Number,
            default: 0,
        },
    },
    watch: {
        prdList: {
            handler(newV) {
                let newArr = [];
                let newArrLength = Math.ceil(newV.length / 2);
                new Array(newArrLength).fill(0).forEach((item, index) => {
                    newArr[index] = newV.slice(index * 2, index * 2 + 2);
                });
                this.prdList_com = newArr;
            },
            immediate: true,
            deep: true,
        },
    },
    filters: {
        padStart_first(val) {
            return `${String(val)
                .padStart(2, `0`)
                .substr(0, 1)}`;
        },
        padStart_second(val) {
            return `${String(val)
                .padStart(2, `0`)
                .substr(1)}`;
        },
    },
    created() {
        this.getHotLiveRoom();
    },
    methods: {
        getHotLiveRoom() {
            this.$http.get("m/liveStreaing/liveActivity/api/common/getChoiceness").then(res => {
                this.HotliveRoomList = JSON.parse(res.data).slice(0, 2);
            });
        },
        goliveRoom(_liveId) {
            this.$router.push({
                path: "/liveRoom",
                query: {
                    liveid: _liveId,
                },
            });
        },
    },
    components: {
        [CountDown.name]: CountDown,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
    },
};
</script>

<style scoped>
.newSeck1 {
    height: 37vw;
    width: 100vw;
    padding: 1vw 2vw;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.newSeck1 > div {
    width: 47vw;
}
.seckBlock {
    background-color: #fdf3f4;
}
.liveBlock {
    background-color: #f5e7de;
    display: flex;
    flex-direction: column;
}
.liveBlock > div:first-child {
    height: 12vw;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    font-weight: bold;
    font-size: 31px;
}
.liveBlock > div:last-child {
    display: flex;
    justify-content: space-between;
    padding: 0 1vw 1.1vw;
}
/* .seckBlock > div:last-child {
    padding: 0 1vw 2vw;
} */
.liveBlock > div:last-child > div {
    width: 21.5vw;
    height: 25vw;
    border-radius: 2vw;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.seckLine {
    height: 9vw;
    padding-left: 2vw;
    display: flex;
    align-content: center;
}
.seckLine > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.seckLine > div:first-child {
    font-size: 28px;
    color: red;
    margin-right: 30px;
}
.van-count-down {
    display: flex;
}
.van-count-down > div {
    width: 4.9vw;
    height: 4.9vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: #fb193a;
    color: #fff;
    border-radius: 1.2vw;
    font-size: 3vw;
}
.van-count-down > span {
    color: #fb193a;
    margin: 0 0.4vw;
    line-height: 5.2vw;
    font-size: 3vw;
}
.seckGoods {
    display: flex;
    justify-content: space-between;
    padding: 0 1vw 1.1vw;
}
.seckGoods > div {
    width: 21.5vw;
    height: 25vw;
    background-color: #fff;
    border-radius: 2vw;
}
.seckGoodsItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0.5vw;
    box-sizing: border-box;
}
.seckGoodsItem > div:first-child {
    width: 16vw;
    height: 16vw;
    border-radius: 2vw;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #fff;
}
.seckGoodsItem > div:nth-child(2) {
    display: flex;
}
.seckGoodsItem > div:nth-child(3) {
    font-size: 24px;
    color: red;
}
.seckPriceLine {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.seckPriceLine > span:first-child {
    margin-left: 0.5vw;
    font-weight: bold;
    transform: scale(0.9);
}
.seckPriceLine > span:last-child {
    margin-right: 0.5vw;
    display: flex;
    align-items: flex-end;
    transform: scale(0.8);
}
.seckPriceLine > span:first-child > span:first-child {
    font-size: 20px;
}
.seckPriceLine > span:first-child > span:last-child {
    font-size: 27px;
}
.seckPriceLine > span:last-child {
    text-decoration: line-through;
    color: #ccc;
}
.seckPriceLine > span:last-child > span:first-child {
    font-size: 17px;
}
.seckPriceLine > span:last-child > span:last-child {
    font-size: 24px;
}
</style>
