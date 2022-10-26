<template>
    <div style="text-align: left;">
        <van-nav-bar title="领取优惠券" left-arrow @click-left="back" />
        <van-coupon-list 
            enabled-title="可领取" 
            disabled-title="已领取" 
            close-button-text="一键领取"
            :showExchangeBar=false
            :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" @change="onChange" @exchange="onExchange" />
    </div>
</template>

<script>
    import config from '@/assets/js/config';
    import uitl from '@/assets/js/fun';
    import {NavBar,Toast,CouponCell,CouponList} from 'vant';

    export default {
        name: 'test',
        data() {
            return {
                couponsTitle:[],
                showList:false,
                chosenCoupon: -1,
                coupons: [],
                disabledCoupons: [],
            }
        },
        created(){
            var _this = this;
            // console.log(_this.$route.query.couponIDs);
            _this.getCoupons(_this.$route.query.couponIDs);//获取优惠券
        },
        mounted(){

        },
        methods:{
            back() {
                this.$router.go(-1);
            },
            getCoupons(_couponIDs){
                var _this = this;
                var _params = {couponIDs:_couponIDs};
                _this.$http.get('/m/coupons/api/common/selectCouponsByIDs', {params: _params}).then(function(e) {
                    if (e.result == 0) {
                        //循环执行前先清空
                        _this.coupons = [];
                        _this.disabledCoupons = [];

                        e.data.forEach((item,index)=>{

                            let userhas = item.userhas;
                            let coupon = _this.couponsDataTreating(item);

                            //判断用户是否领取
                            if(userhas==0){
                                _this.coupons.push(coupon);
                            }else{
                                _this.disabledCoupons.push(coupon);
                            }
                            if(index<3){
                                _this.couponsTitle[index]=coupon.condition;
                            }
                        });
                    }
                }).catch(err=>{})
            },
            //优惠券数据处理
            couponsDataTreating(item){
                var coupon = {	
                        id:item.id, // 优惠券id
                        name:item.title, // 优惠券名称
                        condition:'', // 满减条件
                        startAt:item.beginTime/1000, // 卡有效开始时间（临时，单位秒）
                        endAt:item.endTime/1000, // 卡失效日期（临时，单位秒）
                        description:'商品优惠券', // 描述信息，优惠券可用时展示
                        // reason:'', // 不可用原因，优惠券不可用时展示
                        value:item.discount*100, // 折扣券优惠金额，单位分
                        valueDesc:item.discount, // 折扣券优惠金额文案
                        unitDesc:'', // 单位文案
                    };


                let type = item.type;
                let limitAmount = item.limitAmount;
                let discount = item.discount;
                let sbuTitle = "";

                if(type == 0){
                // 代金券
                coupon.unitDesc='元'
                sbuTitle = "满"+limitAmount+"减"+discount+"元";

                } else if(type == 1){
                sbuTitle = "满"+limitAmount+"件打"+discount+"折";
                }
                coupon.condition = sbuTitle;


                return coupon;
            },

            openCouponsList(state){
                this.show3 = state;
            },

            //选择优惠券
            onChange(index) {
                var _this = this;

                let coupons = _this.coupons;
                let couponIDs = "";
                if(index==-1){
                    // 点击了底部按钮 全部领取
                    coupons.forEach((item,index)=>{
                        if(index==0){
                        couponIDs+=item.id
                        }else{
                        couponIDs+=","+item.id
                        }
                    });
                }else{
                    // 点击了优惠券
                    couponIDs = coupons[index].id;
                }
                
                //领取优惠券
                _this.$http.get('/m/coupons/api/memberGetCoupon', {params: {couponIDs:couponIDs}}).then(function(e) {
                    _this.getCoupons(_this.$route.query.couponIDs);
                    // alert("测试");
                    Toast(e.msg);
                })
            },

            //兑换优惠券
            onExchange(code) {
                Toast("失效的兑换码");
            }
        },
        watch:{

        },
        components:{
            [NavBar.name]:NavBar,
            [Toast.name]:Toast,
            [CouponCell.name]:CouponCell,
            [CouponList.name]:CouponList
        }
    }
</script>