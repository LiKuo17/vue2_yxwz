<template>
    <div class="box">
        <CommonHeader title="我的订单"  />
            <van-tabs color="#c3a769" title-active-color="#333" v-model="active" @click="tabClick" title-inactive-color="#999">
            <van-tab title="全部">
                <template v-if="haveShop" >
                    <div>
                        <van-empty description="暂无数据"/>
                    </div>
                </template>
                 <div class="box-item" v-for="(item,index) in shopList" :key="index" v-else>
                            <div class="shop_item-box">
                                <div class="shop_item-title">
                                    <div class="shop_item-heijin"><span>黑金商旅</span><van-icon name="arrow" /></div>
                                    <div class="pay"  v-if="item.status == 1"  style="color:#ff5722;font-weight:600">等待买家付款</div>
                                    <div class="pay"  v-if="item.status == 0" style="color:#ff5722;font-weight:600">交易已关闭</div>
                                    <div class="pay" v-if="item.status==4" style="color:#ff5722;font-weight:600">交易成功</div>
                                </div>
                                <div class="shop_item-img" @click="goDetail(index)">
                                    <div class="shop_item-img_box">
                                        <div>
                                            <img :src="item.mainImage" />
                                        </div>
                                    </div> 
                                    <div class="shop_item-name">
                                        <div class="shop_item-price">
                                            <div>{{item.productName}}</div>
                                            <div>￥{{item.price}}</div>
                                        </div>
                                        <div class="shop_item-type">
                                            <div>{{item.roomName}}</div>
                                            <div>x{{item.number}}</div>
                                        </div>
                                        <div class="shop_item-adctiveTime">有效期：{{item.scheduledTime}}</div>
                                    </div>
                                </div>
                                <div class="shouldPay">
                                    <span v-if="item.status == 1 || item.status == 0 ">需付款: ￥</span><span v-if="item.status == 4">已付款: ￥</span><span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span>
                                    <!-- <span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span> -->
                                </div>
                                <div class="shop_item-button">
                                    <van-button class="shop_item-button1" round @click="cancleOrder(index)" size="normal" type="default" v-if="item.status == 1" >取消订单</van-button>
                                    <van-button class="shop_item-button1" round @click="delOrder(index)" size="normal" type="default"  v-if="item.status == 0 || item.status == 4">删除订单</van-button>
                                    <van-button class="shop_item-button2" plain color="#c3a769" @click="payNow" round size="normal" v-if="item.status == 1" type="default">立即付款</van-button>
                                </div>
                            </div>
                    </div>
            </van-tab>
            <van-tab title="待付款">
                <template  v-if="haveShop">
                    <div>
                        <van-empty description="暂无数据" />
                    </div>
                </template>
                <div class="box-item" v-for="(item,index) in shopList" :key="index" v-else>
                            <div class="shop_item-box">
                                <div class="shop_item-title">
                                    <div class="shop_item-heijin"><span>黑金商旅</span><van-icon name="arrow" /></div>
                                    <div class="pay">等待买家付款</div>
                                </div>
                                <div class="shop_item-img" @click="goDetail(index)" >
                                    <div class="shop_item-img_box">
                                        <div>
                                            <img :src="item.mainImage" />
                                        </div>
                                    </div> 
                                    <div class="shop_item-name">
                                        <div class="shop_item-price">
                                            <div>{{item.productName}}</div>
                                            <div>￥{{item.price}}</div>
                                        </div>
                                        <div class="shop_item-type">
                                            <div>{{item.roomName}}</div>
                                            <div>x{{item.number}}</div>
                                        </div>
                                        <div class="shop_item-adctiveTime">有效期：{{item.scheduledTime}}</div>
                                    </div>
                                </div>
                                <div class="shouldPay">
                                    <span>需付款: ￥</span><span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span>
                                </div>
                                <div class="shop_item-button">
                                    <van-button class="shop_item-button1" round @click="cancleOrder" size="normal" type="default">取消订单</van-button>
                                    <van-button class="shop_item-button2" plain color="#c3a769" @click="payNow" round size="normal" type="default">立即付款</van-button>
                                </div>
                            </div>
                    </div>
            </van-tab>
            <van-tab title="待发货">
                <template v-if="haveShop">
                    <div>
                        <van-empty description="暂无数据" />
                    </div>
                </template>
                <div class="box-item" v-for="(item,index) in shopList" :key="index" v-else>
                            <div class="shop_item-box">
                                <div class="shop_item-title">
                                    <div class="shop_item-heijin"><span>黑金商旅</span><van-icon name="arrow" /></div>
                                    <div class="pay">等待买家付款</div>
                                </div>
                                <div class="shop_item-img" @click="goDetail(index)">
                                    <div class="shop_item-img_box">
                                        <div>
                                            <img :src="item.mainImage" />
                                        </div>
                                    </div> 
                                    <div class="shop_item-name">
                                        <div class="shop_item-price">
                                            <div>{{item.productName}}</div>
                                            <div>￥{{item.price}}</div>
                                        </div>
                                        <div class="shop_item-type">
                                            <div>{{item.roomName}}</div>
                                            <div>x{{item.number}}</div>
                                        </div>
                                        <div class="shop_item-adctiveTime">有效期：{{item.scheduledTime}}</div>
                                    </div>
                                </div>
                                <div class="shouldPay">
                                    <span>需付款: ￥</span><span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span>
                                </div>
                                <div class="shop_item-button">
                                    <van-button class="shop_item-button1" round @click="cancleOrder" size="normal" type="default">取消订单</van-button>
                                    <van-button class="shop_item-button2" plain color="#c3a769" @click="payNow" round size="normal" type="default">立即付款</van-button>
                                </div>
                            </div>
                    </div>
            </van-tab>
            <van-tab title="待收货">
                <template v-if="haveShop">
                    <div>
                        <van-empty description="暂无数据" />
                    </div>
                </template>
                <div class="box-item" v-for="(item,index) in shopList" :key="index" v-else>
                            <div class="shop_item-box">
                                <div class="shop_item-title">
                                    <div class="shop_item-heijin"><span>黑金商旅</span><van-icon name="arrow" /></div>
                                    <div class="pay">等待买家付款</div>
                                </div>
                                <div class="shop_item-img" @click="goDetail(index)">
                                    <div class="shop_item-img_box">
                                        <div>
                                            <img :src="item.mainImage" />
                                        </div>
                                    </div> 
                                    <div class="shop_item-name">
                                        <div class="shop_item-price">
                                            <div>{{item.productName}}</div>
                                            <div>￥{{item.price}}</div>
                                        </div>
                                        <div class="shop_item-type">
                                            <div>{{item.roomName}}</div>
                                            <div>x{{item.number}}</div>
                                        </div>
                                        <div class="shop_item-adctiveTime">有效期：{{item.scheduledTime}}</div>
                                    </div>
                                </div>
                                <div class="shouldPay">
                                    <span>需付款: ￥</span><span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span>
                                </div>
                                <div class="shop_item-button">
                                    <van-button class="shop_item-button1" round @click="cancleOrder" size="normal" type="default">取消订单</van-button>
                                    <van-button class="shop_item-button2" plain color="#c3a769" @click="payNow" round size="normal" type="default">立即付款</van-button>
                                </div>
                            </div>
                    </div>
            </van-tab>
            <van-tab title="已完成">
                <template v-if="haveShop">
                    <div>
                        <van-empty description="暂无数据" />
                    </div>
                </template>
                <div class="box-item" v-for="(item,index) in shopList" :key="index" v-else>
                            <div class="shop_item-box">
                                <div class="shop_item-title">
                                    <div class="shop_item-heijin"><span>黑金商旅</span><van-icon name="arrow" /></div>
                                    <div class="pay" style="color:#ff5722;font-weight:600">交易成功</div>
                                </div>
                                <div class="shop_item-img" @click="goDetail(index)">
                                    <div class="shop_item-img_box">
                                        <div>
                                            <img :src="item.mainImage" />
                                        </div>
                                    </div> 
                                    <div class="shop_item-name">
                                        <div class="shop_item-price">
                                            <div>{{item.productName}}</div>
                                            <div>￥{{item.price}}</div>
                                        </div>
                                        <div class="shop_item-type">
                                            <div>{{item.roomName}}</div>
                                            <div>x{{item.number}}</div>
                                        </div>
                                        <div class="shop_item-adctiveTime">有效期：{{item.scheduledTime}}</div>
                                    </div>
                                </div>
                                <div class="shouldPay">
                                    <span>实付款: ￥</span><span class="shouldPay_price">{{(item.price * item.number).toFixed(2)}}</span>
                                </div>
                                <div class="shop_item-button">
                                    <!-- <van-button class="shop_item-button1" round @click="cancleOrder" size="normal" type="default">取消订单</van-button> -->
                                    <!-- <van-button class="shop_item-button2" plain color="#c3a769" @click="payNow" round size="normal" type="default">立即付款</van-button> -->
                                </div>
                            </div>
                    </div>
            </van-tab>
            <div style="margin-top:50px"></div>
        </van-tabs>
        
        <!-- <van-action-sheet v-model="showCancel" title="选择取消原因">
            <van-checkbox-group class="checkBox" v-model="result" max="1"  label-position="left" @cancel="cancelReason" @change="changeReason" ref="checkboxGroup">
                <van-cell-group >
                    <van-cell
                        label-position="left" 
                        v-for="(item, index) in cancelList"
                        clickable
                        :key="item"
                        :title="`${item}`"
                        @click="toggle(index)"
                       
                        >
                        <template #right-icon>
                            <van-checkbox :name="item" checked-color="#c3a769" icon-size="1.2em" ref="checkboxes" @change="changeCheck" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
            <div class="bottomBox">
                <van-button type="primary" @click="cancelReason" round class="buttom_item" block>再想想</van-button>
                <van-button type="primary" @click="cancleOrderTwo" round block>取消订单</van-button>
            </div>
        </van-action-sheet> -->
    </div>
</template>
<script>
import { Dialog } from 'vant';
import fileServerAddress from "@/assets/js/config";
import CommonHeader from "@/components/CommonHeader";
import { $postOnlyData,getOrderList } from "@/api/index";
import { Toast } from "vant";
export default {
    components: { CommonHeader },
    data(){
        return {
            serveAddress: '',
            cancelList: ['规格/款式/数量拍错', '无法正常支付','收货地址信息填写错误','商品缺货','我不想买了','其他',],
            result: [],
            showCancel: false,
            active: '',
            haveShop:false,
            shopList: []
        }
    },
    methods:{
        goDetail(index){
            let id = this.shopList[index].id
            let productType = this.shopList[index].productType
            console.log(index);

            this.$router.push({path:'/stayPay',query:{
                id:id,
                productType:productType,
                status:this.shopList[index].status
            }})
        },
        delOrder(index){
            Dialog.confirm({
                title: '删除',
                message: '确认删除该订单吗？',
            }).then(() => {
                this.confirm(index)
            }).catch(() => {});
        },

        async confirm(index){
            let id = this.shopList[index].id
            let res = await $postOnlyData('delOrderList',id)
            if(res.code == 0) {
                Toast.success('删除订单成功！');
                this.getOrderLists()
            }else{
                Toast.success('删除订单失败,请重试！');
            }
        },


        cancleOrder(index){
            // this.showCancel = true
            // this.cancleOrderTwo(index)
            Dialog.confirm({
                title: '取消订单',
                message: '确认取消该订单吗？',
            }).then(() => {
                // this.confirmTwo(index)
                this.confirmTwo(index)
            }).catch(() => {});
            
        },

        cancleOrderTwo(){
            
        },
        
        async confirmTwo(index){
            let id = this.shopList[index].id
            let res = await $postOnlyData('canOrderList',id)
            if(res.code == 0) {
                Toast.success('取消订单成功！');
                this.getOrderLists()
            }else{
                Toast.success('取消订单失败,请重试！');
            }
        },

        payNow(){

        },

        toggle(index) {
            const { checkboxGroup } = this.$refs;
            this.$refs.checkboxes[index].toggle(true);
            checkboxGroup.toggleAll(false);
        },
        changeReason(names){
            console.log(names);
            // this.showCancel = false
        },
        cancelReason(){
            this.showCancel = false
        },
        changeCheck(checked){
            console.log(checked);
        },
        async getOrderLists(){
            let res = await getOrderList('getOrderList',this.active)
            res.data.forEach(item=> {
                console.log('----------',fileServerAddress.fileServerAddress);
                item.mainImage =  fileServerAddress.fileServerAddress + item.mainImage
            })
            this.shopList = res.data
            console.log(res);
        },
        async tabClick(name,title){
            Toast.loading({
                message: "加载中",
                forbidClick: true,
                duration:1000,
            });
            name == 0 ? '' : name
            let res = await getOrderList('getOrderList',name)
            console.log('res',res);
            res.data.length == 0 ? this.haveShop = true : this.haveShop = false
            res.data.forEach(item=> {
                item.mainImage =  fileServerAddress.fileServerAddress + item.mainImage
            })
            console.log(res.data);
            this.shopList = res.data
            
        },
    },
    created(){
        
        console.log(this.$route.query.type);
        this.active = this.$route.query.type
        this.serveAddress = fileServerAddress.fileServerAddress
        this.getOrderLists()
        
    }
}
</script>
<style lang="scss" scoped>
/deep/ .van-tab__pane {
    /* background-0: white; */
    /* padding: 12px; */
}
/deep/ .van-tabs__content {
    padding: 10px;
    background-color: #f6f6f6;
}
.shop_item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shop_item-heijin {
        display: flex;
        align-items: center;
        color: #323233;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
    }
    .pay {
        font-family: PingFangSC-Medium;
        text-align: right;
        line-height: 36px;
        font-size: 28px;
    }
}
.shop_item-img {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    .shop_item-img_box {
        border-radius: 16px;
        flex: 1;
        overflow: hidden;
        line-height: 0;
        margin-right: 16px;
        div{
            width: 144px;
            height: 144px;
            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    .shop_item-name {
        flex: 3;
        display: flex;
        flex-direction: column;
        .shop_item-price,.shop_item-type,.shop_item-adctiveTime {
            display: flex;
            justify-content: space-between;
        }
        .shop_item-price {
            color: #323233;
            line-height: 40px;
            font-size: 28px;
        }
        .shop_item-type {
            color: #969799;
            line-height: 32px;
            margin-top: 16px;
            font-size: 24px;
        }
        .shop_item-adctiveTime {
            color: var(--notice,#ed6a0c);
            line-height: 32px;
            margin-top: 16px;
            font-size: 24px;
        }
    }
    
}
.shouldPay {
        height: 96px;
        line-height: 96px;
        padding: 0 24px;
        color: #323233;
        font-size: 24px;
        text-align: right;
        .shouldPay_price {
            font-size: 36px;
        }
    }
    .shop_item-button {
        display: flex;
        justify-content: flex-end;
        /deep/ .van-button {
            height: 32px;
        }
        .shop_item-button1 {
            margin-right: 20px;
        }
    }
    .shop_item-box {
        margin-bottom: 20px;
    }
    .box-item {
        box-shadow: 0px 1px 5px #cacaca;
    border-radius: 15px;
        background-color: #fff;
        padding: 24px;
        margin-bottom: 20px;
    }
    .box {
        height: 100vh;
    }
    /deep/ .van-cell__title, .van-cell__value {
        text-align: left;
    }
    .checkBox {
        padding-bottom: 20px;
         background-color: #f7f8fa;
    }
    .bottomBox {
        -webkit-box-orient: horizontal;
        -webkit-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
        padding: 10px 20px 60px;
        display: flex;
       
        button {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
            margin: 0 12px;
            height: 80px;
            line-height: 80px;
            background-color: #c3a769;
            border: 1px solid #ebedf0;
        }
        .buttom_item {
            background-color: white;
            color: black;
            border: 1px solid #ebedf0;
        }
    }
    /deep/ .van-action-sheet__header {
            font-weight: 700;
    }
</style>
