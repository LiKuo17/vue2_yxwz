<template>
	<div class="confirmOrder">
		<header>
			<div class="header_Box">
				<van-nav-bar title="确认订单" left-arrow @click-left="back" />
			</div>
		</header>
		<section class="confirmOrder_section">
			<article class="a1">
				<div class="address_Box card" v-if="hasDefaultAdd" @click="toAddManage">
					<div class="left_Box address_Content1">
						<div class="img_Box">
							<img src="../../assets/img/address_icon.png" />
						</div>
					</div>
					<div class="left_Box address_Content2">
						<p><span class="address_userName">{{defaultAdd.name}}</span><span class="address_phoneNumber">{{defaultAdd.tel}}</span></p>
						<p class="address_p">{{defaultAdd.province}} {{defaultAdd.city}} {{defaultAdd.county}} {{defaultAdd.addressDetail}} </p>
					</div>
					<div class="address_Content3">
						<van-icon name="arrow" />
					</div>
				</div>
				<div class="address_Box card" v-if="!hasDefaultAdd" @click="toAddManage">
					<div class="left_Box address_Content1">
						<div class="img_Box">
							<img src="../../assets/img/address_icon.png" />
						</div>
					</div>
					<div class="left_Box address_Content2">
						<p class="address_p">您还没有设置默认收货地址噢。</p>
					</div>
					<div class="address_Content3">
						<van-icon name="arrow" />
					</div>
				</div>
			</article>
			<article class="a1">
				<div class="order_Box card" v-for="(item,index) in orderList" :key="index">
					
					<div class="order_Content">
						<div class="img_Box1">
							<img :src="item.img" onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
						</div>
						<div class="item_Box">
							<p>
								<span class="item_name">
									{{item.name}}
									<div v-for="(tag,index) in item.eventTag" :key="index">
										<van-tag round type="danger" size="medium">{{tag}}</van-tag>
									</div>
								</span>	
								<span class="item_price">￥<!-- {{item.instalments==0?item.amount_month:item.amt}} -->{{item.saleprice}}</span>
							</p>
							<p><span class="item_size">颜色:{{item.sku_type1}}; 尺寸:{{item.sku_type2}};</span><span class="item_count" v-if="item.instalments>1"></span></p>
							<p><span v-if="item.instalments!=0" class="notice">分期价：{{item.amount_month}} X {{item.instalments}}期</span></p>
						</div>
					</div>

					<div class="order_Content1">
						<p class="order_P1"><span>购买数量</span><span>{{item.quantity}}</span></p>
						<p class="order_P1"><span>配送方式</span><span>快递 免邮 </span></p>

						<!-- 立即购买只有一件商品，不需要考虑合并结算的问题 -->
						<p class="order_P1" v-if="froms=='detail'">
							<van-coupon-cell :border="false" :coupons="item.coupons" :chosen-coupon="item.chosenCoupon" @click="item.showList = true" style="padding: 0;font-size: 16px;line-height: 11.2vw;content: 'viewport-units-buggyfill; width: 74.4vw; line-height: 11.2vw';" />
							<van-popup v-model="item.showList" round position="bottom" style="padding-top: 4px;" >

								<van-coupon-list 
									:showExchangeBar=false
									:coupons="item.coupons" 
									:chosen-coupon="item.chosenCoupon" 
									:disabled-coupons="item.disabledCoupons" 
									@change="(value) => onChange(value,item,index)" />

							</van-popup>
						</p>

						<p class="order_P1"><span>合计</span><span>{{(item.saleprice*item.quantity-item.disAmount).toFixed(2)}}</span></p>
						<p class="order_P1">
							<span>订单备注</span>
							<span class="sp_textarea">
								<van-field
    								v-model="item.comment	"
   	 								type="textarea"
    								placeholder="选填,请先和商家协商一致"
    								rows="1"
    								autosize
  								/>
							</span>
						</p>
					</div>
				</div>

			</article>

			<article class="a1" >
				<div class="order_Box card" v-if="eventList.length>0" >
					<div v-for="(item,index) in eventList" :key="index">
						<van-coupon-cell :border="false" :coupons="item.coupons" :chosen-coupon="item.chosenCoupon" :title="item.event"  @click="item.showList = true" style="padding: 0;font-size: 16px;line-height: 11.2vw;content: 'viewport-units-buggyfill; line-height: 11.2vw';" />
						<van-popup v-model="eventList[index].showList" round position="bottom" style="padding-top: 4px;" >
							<van-coupon-list 
								:showExchangeBar=false
								:coupons="item.coupons" 
								:chosen-coupon="item.chosenCoupon" 
								:disabled-coupons="item.disabledCoupons" 
								@change="(value) => onChange2(value,item,index)" />
						</van-popup>
					</div>
				</div>
			</article>
		</section>
		<footer>
			<div class="footer_order_Box">
				<p class="footer_p">
					<span class="allCount">共{{allCount}}件,</span>
					<span class="allPrice">合计:</span>
					<span class="allPriceNumber">￥{{(allPrice - allDisAmount).toFixed(2)}}</span>
					<span class="allDisAmount"><small>已减 {{(allDisAmount).toFixed(2)}}</small></span>
					<span class="btn_box"><van-button @click='doPay' round type="danger">提交订单</van-button></span>
				</p>
			</div>
		</footer>
	</div>
</template>

<script>
	import _config from '../../assets/js/config';
	import {
		NavBar,
		Step,
		Steps,
		Icon,
		Stepper,
		Field,
		Button,
		Toast,
		Cell, 
		CellGroup,
		CouponCell,
		CouponList,
		Popup,
		Tag
	} from 'vant';

	export default {
		name: 'confirmOrder',
		data() {
			return {
				message: '',
				value: 0,
				hasDefaultAdd: false,
				defaultAdd: {},
				serverAdd: _config.serverAddress,
				imgServerAdd: _config.fileServerAddress,
				orderList: [],
				datalist:[],
				froms: '',
				isOK: undefined,
				isCart:false,//是否是购物车进入
				chosenCoupons:[], //立即购买已选择的优惠券id
				eventList:[],//购物车优惠活动
				pageid:'',
				outflag:'',
				seckill_id:-1

				// [{
				// 	"eventObj":0,
				// 	"event":"616年中大促",
				// 	"showList":false,
				// 	"prds":["58","328"],
				// 	"coupons":[
				// 		{
				// 			"mcid":"83ae3ee31ef34ad3a7cf11759592a684",
				// 			"id":"4ce5e07c7fa242729141ed972f6b664c",
				// 			"name":"测试优惠券使用无效",
				// 			"condition":"满200减1元",
				// 			"startAt":1591545600,
				// 			"endAt":1591891199,
				// 			"description":"商品优惠券",
				// 			"reason":"不满足使用条件",
				// 			"value":0,
				// 			"valueDesc":1,
				// 			"unitDesc":"元"
				// 		}
				// 	],
				// 	"disabledCoupons":[
				// 		{
				// 			"mcid":"6495be465c4447aaa38f7ea934dd45c5",
				// 			"id":"9fdfde7f5ead4df0890f0a2a3fe9a891",
				// 			"name":"测试优惠券使用无效",
				// 			"condition":"满500减10元",
				// 			"startAt":1591545600,
				// 			"endAt":1593014400,
				// 			"description":"商品优惠券",
				// 			"reason":"不满足使用条件",
				// 			"value":0,
				// 			"valueDesc":10,
				// 			"unitDesc":"元"
				// 		}
				// 	],
				// 	"chosenCoupon":-1
				// 	}]
			}
		},
		
		created() {

			var _this = this;
			_this.froms = _this.$route.query.froms;
			_this.pageid = _this.$route.query.pageId;
			_this.outflag = _this.$route.query.outflag;
			_this.seckill_id = _this.$route.query.seckill_id|Number;

			_this.getDefaultAdd();
			if(_this.froms == 'shoppingCart') {
				_this.FromShoppingCart(_this.$route.query.ids);
				
			} else if(_this.froms == 'detail'||_this.froms == 'seckill') {
				_this.FromDetail();
				//console.log('嘻嘻嘻');
			}

			
		},
		methods: {
			toAddManage() {
				this.$router.push({path:'/addressManage',query:{from:'Order'}});
			},
			doPay() {
				var _this = this;
				if(_this.defaultAdd.id == undefined){
					Toast('请选择地址');
					return false;
				}
				if(_this.froms == 'shoppingCart') {
          			// console.log();
					_this.createOrder(typeof _this.$route.query.ids == "string"?[_this.$route.query.ids]:_this.$route.query.ids, _this.defaultAdd.id);
				} else if(_this.froms == 'detail') {
					_this.createOrder1(_this.orderList[0], _this.defaultAdd.id);
				} else if(_this.froms == 'seckill') {
					_this.createOrder2(_this.orderList[0], _this.defaultAdd.id);
				}
			},
			back() {
				this.$router.go(-1);
			},
			getDefaultAdd() {
				var _this = this;
				_this.$http.get('/m/members/api/getDefaultAddress', {
					params: {}
				}).then(function(e) {
					if(e.result == 0) {
						_this.isOK = true;
						_this.hasDefaultAdd = true;
						_this.defaultAdd = e.data;
					} else if(e.result == -2) {
						_this.hasDefaultAdd = false;
					}

				})
			},
			// 购物车购买进入
			FromShoppingCart(_ids) {
				
				var id = ''
				// console.log(typeof(_ids));
				// debugger;
				if(typeof(_ids) == 'string'){
					id = _ids;
				} else {
					id = _ids.join(',');
				}
				var _this = this;

				_this.isCart = true;
				_this.$http.get('/m/shopcart/api/getListByIds', {
					params: {
						ids: id
					}
				}).then(function(e) {
					if(e.result == 0) {
						var datalist = e.data;
						_this.datalist=datalist;
						_this.getCoupons2(_this.datalist);
						for(var i = 0; i < datalist.length; i++) {

							var obj = {
								showList:false,
								chosenCoupon: -1,
								coupons: [],
								disabledCoupons: []
							};
							obj.img = _this.imgServerAdd + datalist[i].iconurl;
							obj.name = datalist[i].prdname;
							obj.instalments = datalist[i].instalments;
							obj.amount_month = datalist[i].amount_month.toFixed(2);
							obj.sku_type1 = datalist[i].sku_type1;
							obj.sku_type2 = datalist[i].sku_type2;
							obj.quantity = datalist[i].quantity;
							obj.comment = '';
							obj.amt = datalist[i].amt;
							obj.saleprice = datalist[i].saleprice;

							obj.prdId = datalist[i].prdid;
							obj.prdno = datalist[i].prdno;
							obj.disAmount = 0;

							// _this.getCoupons(obj);

							_this.orderList.push(obj);
						}
						
						// _this.chosenCoupons = new Array(_this.orderList.length);
					}
				});
			},
			// 立即购买或秒杀进入
			FromDetail() {

				var _this = this;
				var queryObj = JSON.parse(_this.$route.query.obj);

				var obj = {
						showList:false,
						chosenCoupon: -1,
						coupons: [],
						disabledCoupons: []
					};
				obj.prdId = queryObj.prdId;
				obj.img = _this.imgServerAdd + queryObj.ImageList[0];
				obj.name = queryObj.prdname;
				obj.instalments = queryObj.loansNum;
				obj.amount_month = queryObj.loanPrice.toFixed(2);
				obj.sku_type1 = queryObj.sku_type1;
				obj.sku_type2 = queryObj.sku_type2;
				obj.quantity = queryObj.quantity;
        
				obj.comment = '';
				var _amt = queryObj.price/100;
				obj.amt = _amt.toFixed(2);
				obj.saleprice = _amt.toFixed(2);

				obj.disAmount = 0;

				_this.getCoupons(obj);
				_this.orderList.push(obj);

				_this.chosenCoupons = new Array(_this.orderList.length);

			},
			createOrder(_ids, _addrId) { //调用购物车的订单生成接口
				var _this = this;
				var itemList = [];

				for(var i = 0 ; i < _this.orderList.length;i++){
					var obj = {
						rid:_ids[i],//购物车id
						remark:_this.orderList[i].comment,
						mcid : "-1"
					}

					let prdid = _this.orderList[i].prdid;//商品id
					let eventTag = _this.orderList[i].eventTag;//活动标识

					//判断商品有没有参加活动
					if(typeof(eventTag) != "undefined"&&eventTag.length>0){
						obj.mcid = _this.getCouponId(prdid,eventTag[0]);
					}

					itemList.push(obj);
				}

				

				_this.$http.post('/m/shopcart/api/buildOrder', {
						addrId: _addrId,
						items:itemList
						
				}).then(function(e) {
					if(e.result == 0) {
						_this.toPay(e.data);
					} else {
						Toast(e.msg);
						//alert(1)
					}
					//console.log(e);
				});
			},

			createOrder1(_obj, _addrId) {
				var _this = this;
				let params = {
					prdId: _obj.prdId,
					skuType1: _obj.sku_type1,
					skuType2: _obj.sku_type2,
					quantity: _obj.quantity,
					instalments: _obj.instalments,
					addrId: _addrId,
					remark: _obj.comment,
					mcid:_this.chosenCoupons[0],
					pageid:_this.pageid,
            		outflag:_this.outflag
				}
				this.$route.query.liveid?params.liveid=this.$route.query.liveid:""
				_this.$http.post('/m/orders/api/orderBuy', params).then(function(e) {
					if(e.result == 0) {
						_this.toPay(e.data);
					} else {
						Toast(e.msg);
						//alert(4)
					}
					//console.log(e);
				});
			},
			createOrder2(_obj, _addrId) {
				// debugger;
				var _this = this;
				var _seckill_id = _this.seckill_id;
				_this.$http.post('/m/seckill/api/seckillOrderBuy', {
					seckill_id:_seckill_id,
					prdId: _obj.prdId,
					skuType1: _obj.sku_type1,
					skuType2: _obj.sku_type2,
					quantity: _obj.quantity,
					instalments: _obj.instalments,
					addrId: _addrId,
					remark: _obj.comment,
					mcid:_this.chosenCoupons[0],
					pageid:_this.pageid,
            		outflag:_this.outflag
				}).then(function(e) {
					if(e.result == 0) {
						_this.toPay(e.data);
					} else {
						Toast(e.msg);
						//alert(4)
					}
					//console.log(e);
				});
			},
			toPay(_orderId){
				var _this = this;
				_this.$router.push({
					path: '/toPay',
					query: {
						orderId: _orderId
					}
				})
			},
			// 二期开发
			// 获取优惠券
			getCoupons(obj){
				var _this = this;
				// debugger;
				_this.$http.post('/m/coupons/api/selectCouponsByMemberAndProduct', {orderList:[obj],event:"616年中大促"}).then(function(e) {
					if (e.result == 0) {
						// 循环执行前先清空
						obj.coupons = [];
						obj.disabledCoupons = [];

						e.data[0].couponlist.forEach((item,index)=>{

							let usingstatus = item.usingstatus;
							let coupon = _this.couponsDataTreating(item);
							// 判断用户是否可用
							if(usingstatus==0){
								obj.coupons.push(coupon);
							}else{
								obj.disabledCoupons.push(coupon);
							}
						});
					} else {
						Toast(e.msg);
						//alert(2)
					}
				})
			},
			// 优惠券数据处理
			couponsDataTreating(item){
				let isCart = this.isCart;
				var coupon = {	
					mcid:item.mcid,//用户优惠券的id
					id:item.id, // 优惠券模板id
					name:item.title, // 优惠券名称
					condition:'', // 满减条件
					startAt:item.beginTime/1000, // 卡有效开始时间（临时，单位秒）
					endAt:item.endTime/1000, // 卡失效日期（临时，单位秒）
					description:'商品优惠券', // 描述信息，优惠券可用时展示
					reason:'', // 不可用原因，优惠券不可用时展示
					value:0, // 折扣券优惠金额，单位分
					valueDesc:item.discount, // 折扣券优惠金额文案
					unitDesc:'', // 单位文案
				}

				if(item.usingstatus == 1){
					coupon.reason = '已使用';
				}else if(item.usingstatus == 2) {
					coupon.reason = '已过期';
				}else if(item.usingstatus == 3) {
					coupon.reason = '不在活动期间内';
				}else{
					coupon.reason = '不满足使用条件';
				}

				let type = item.type;
				let limitAmount = item.limitAmount;
				let discount = item.discount;
				let sbuTitle = "";
				let value = 0;//优惠金额（分）

				if(!isCart){
					value = item.disAmount;
					// 临时使用
					value = discount*100;
					
				}

				if(type == 0){
					// 代金券
					coupon.unitDesc='元';
					sbuTitle = "满"+limitAmount+"减"+discount+"元";

					if(isCart){
						//购物车进来
						value = discount*100;
					}
					

				} else if(type == 1){
					coupon.unitDesc='折';
					sbuTitle = "满"+limitAmount+"件打"+discount+"折";
				}

				coupon.value = value;
				coupon.condition = sbuTitle;


				return coupon;
			},
			onChange(index,obj,orderIndex){
				// obj 只是一个局部变量，修改obj的值只会更新单个商品，而不会更新 this.orderList
				var _this = this;
				if(index==-1){
					// obj.showList = false;
					// obj.chosenCoupon = index;
					// obj.disAmount = 0;
					_this.orderList[orderIndex].showList = false;
					_this.orderList[orderIndex].chosenCoupon = index;
					_this.orderList[orderIndex].disAmount = 0;
					_this.chosenCoupons[orderIndex]="";
				}else{
					// 用户优惠卷id
					let mcid = obj.coupons[index].mcid;
					if(!_this.examine(mcid,orderIndex)){
						// obj.showList = false;
						// obj.chosenCoupon = index;
						// obj.disAmount = (obj.coupons[index].value/100).toFixed(2);

						_this.orderList[orderIndex].showList = false;
						_this.orderList[orderIndex].chosenCoupon = index;
						_this.orderList[orderIndex].disAmount = obj.coupons[index].value/100;
					}else{
						// obj.showList = true;
						_this.orderList[orderIndex].showList = true;
						Toast("该优惠券已被其他商品选择！");
					}
				}
				// obj.showList = false;
				// obj.chosenCoupon = index;
				// obj.disAmount = obj.coupon[index].value;
			},
			examine(mcid,index){
				let _chosenCoupons = this.chosenCoupons;
				let s = false;
				let couponid = _chosenCoupons[index];

				_chosenCoupons.forEach((item,index)=>{
					if(item==mcid){
						s=true;
					}
				})
				if(!s){
					this.chosenCoupons[index]=mcid;
				}
				return s;
			},
			// 需求变更 合并订单使用优惠券
			getCoupons2(obj){
				let _this = this;
				let eventList = [];
				// debugger;
				_this.$http.post('/m/coupons/api/selectCouponsByMemberAndProduct', {orderList:_this.orderList,event:"616年中大促"}).then(function(e) {
					if (e.result == 0) {
						e.data.forEach((item,index)=>{
							 eventList[index] = _this.dispose(item);
						});
					} else {
						Toast(e.msg);
						//alert(3)
					}
					_this.eventList = eventList;
				})
			},

			dispose(obj){
				let _this = this;
				let eventObj = {
					showList:false,
					event:obj.event,//活动
					prds:[],//参与活动的商品id
					coupons:[],//可用优惠券
					disabledCoupons:[],//不可用优惠券
					chosenCoupon:-1,//选择的优惠券
					disAmount:0//优惠的金额
				}

				let couponDataList = obj.couponlist;

				let prdlist = obj.prdlist.split(",");
				eventObj.prds = prdlist;

				_this.disposeOrderList(prdlist,eventObj.event);
				

				couponDataList.forEach((item,index) => {
					let coupon = _this.couponsDataTreating(item);
					let usingstatus = item.usingstatus;

					// 判断用户是否可用
					if(usingstatus==0){
						eventObj.coupons.push(coupon);
					}else{
						eventObj.disabledCoupons.push(coupon);
					}
				})
				
				return eventObj;
			},
			//处理订单数据，为商品添加参与活动的标识
			disposeOrderList(obj,event){
				let _this = this;
				const orderList = _this.orderList;
				
				

				obj.forEach((prd) => {
					prd = parseInt(prd);
					orderList.forEach((order,index) => {
						let eventTag = [];
						const prdId = order.prdId;
						if(prdId == prd){
							eventTag.push(event);
							_this.orderList[index].eventTag = eventTag;
							return true;
						}
						
					});
					
				});
			},
			//合并订单时的优惠券选择
			onChange2(index,item,eventIndex){
				let _this = this;
				let _eventList = _this.eventList;
				let value = 0;
				if(index != -1){
					value = item.coupons[index].value/100;
				}
				item.chosenCoupon=index;//选择的优惠券的下标
				item.disAmount = value;//优惠的金额
				item.showList = false;
				_this.eventList[eventIndex] = item;
			},
			//传入商品id和活动标识返回选择的优惠券id
			getCouponId(rid,eventTag){
				let _this = this;
				let mcid = "-1";
				_this.eventList.forEach((item,index)=>{
					let event = item.event;
					if(eventTag==event){
						let chosenCoupon = item.chosenCoupon;
						if(chosenCoupon != -1){
							mcid = item.coupons[chosenCoupon].mcid;
						}
					}
				})
				return mcid;
			}

		},
		computed: {
			allCount: function() {
				var num = 0;

				this.orderList.forEach(function(item) {
					num = num + item.quantity;
				})
				return num;
			},
			allPrice: function() {
				var num = 0;
				this.orderList.forEach(function(item) {
            		num = num + item.saleprice*item.quantity;
				});
				return num;
			},
			// 优惠金额
			allDisAmount:function(){
				let _this = this;
				var num = 0;
				if(_this.isCart){
					_this.eventList.forEach(function(item) {
						num = num + item.disAmount;
					});
				}else{
					_this.orderList.forEach(function(item) {
						num = num + item.disAmount;
					});
				}
				return num;
			}
		},
		// watch:{
		// 	datalist(newObj,oldObj){
		// 		this.getCoupons2(newObj);
		// 	}
			
		// },
		components: {
			[NavBar.name]: NavBar,
			[Step.name]: Step,
			[Steps.name]: Steps,
			[Icon.name]: Icon,
			[Stepper.name]: Stepper,
			[Field.name]: Field,
			[Button.name]: Button,
			[Cell.name]:Cell, 
			[CellGroup.name]:CellGroup,
			[CouponCell.name]:CouponCell,
			[CouponList.name]:CouponList,
			[Popup.name]:Popup,
			[Tag.name]:Tag
		}
	}
</script>
<style>
	@import url("../../../static/navbar.css");
	@import url("../../../static/stepper.css");
	@import url("../../../static/field.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.notice {
		font-size: 20px;
		margin-top: 20px;
		color: red;
	}

	.btn_box {
		float: right;
		margin-right: 20px;
	}

	.allPriceNumber {
		display: inline-block;
		width: 150px;
		font-size: 30px;
		color: rgb(235, 101, 101);
		font-weight: bold;
	}
	.allDisAmount small{
		color: #999;
	}
	.footer_p>span {
		/* margin: 0 10px; */
	}

	.allPrice {
		font-size: 30px;
		color: rgb(51, 51, 51);
	}

	.allCount {
		font-size: 30px;
		color: rgb(180, 180, 180);
		display: inline-block;
		padding-left: 20px;
	}

	.footer_order_Box {
		position: fixed;
		width: 100%;
		background-color: white;
		bottom: 0;
		line-height: 108px;
		text-align: left;
	}

	.sp_textarea {
		width: 380px;
		text-align: right!important;
	}

	.order_Content1 {
		display: inline-block;
		width: 100%;
	}

	.order_P1 {
		width: 558px;
		float: right;
		display: inline-block;
		line-height: 84px;
	}

	.order_P1>span {
		display: inline-block;
		vertical-align: middle;
	}

	.order_P1>span:nth-child(1) {
		float: left;
	}

	.order_P1>span:nth-child(2) {
		float: right;
	}

	.item_count {
		float: right;
		font-size: 30px;
		color: rgb(153, 153, 153);
		display: inline-block;
	}

	.item_size {
		font-size: 26px;
		color: rgb(153, 153, 153);
		float: left;
		display: inline-block;
	}

	.item_name {
		float: left;
		color: rgb(51, 51, 51);
		font-size: 28px;
		display: inline-block;
		width: 224px;
	}

	.item_price {
		float: right;
		font-size: 34px;
		color: rgb(51, 51, 51);
		font-weight: bold;
		display: inline-block;
	}

	.item_Box {
		width: 412px;
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		margin-left: 16px;
	}

	.item_Box>p {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.img_Box1 {
		display: inline-block;
		height: 184px;
		width: 200px;
		border-radius: 4px;
		overflow: hidden;
	}

	.order_Box {
		padding: 32px 24px;
		border-radius: 16px;
		text-align: left;
		margin-bottom: 24px;
	}

	.address_p {
		color: rgb(51, 51, 51);
		font-size: 30px;
		line-height: 40px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.address_phoneNumber {
		color: rgb(153, 153, 153);
		font-size: 28px;
	}

	.address_userName {
		color: rgb(51, 51, 51);
		font-size: 34px;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.address_Content2 {
		width: 454px;
		text-align: left;
		display: inline-block;
		vertical-align: middle;
	}

	.address_Content1 {
		padding: 64px 24px;
	}

	.left_Box {
		float: left;
	}

	.img_Box {
		display: inline-block;
		height: 68px;
		width: 68px;
		border-radius: 50%;
		overflow: hidden;
	}

	.address_Box {
		border-radius: 16px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.confirmOrder {

	}

  .confirmOrder_section{
    background-color: #f9f9f9;
    width: 100%;
    height: calc(100vh - 108px - 92px);
    overflow: auto;
  }

	.a1 {
		padding: 26px;
    padding-bottom: 0;
	}

	.card {
		background-color: white;
	}
</style>
