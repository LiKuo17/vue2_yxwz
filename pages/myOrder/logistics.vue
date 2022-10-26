<template>
	<div class="logistics">
		<header>
			<div class="header_Box">
				<van-nav-bar title="查看物流" left-arrow @click-left="back" />
			</div>
		</header>
		<section class="section logistics_section">
			<article class="a1">
				<div class="card1">
					<div class="logistics_Box">
						<div class="img_Box">
							<img :src="imgUrl" onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)" />
						</div>
						<p class="order_title">{{prdname}}</p>
					</div>
					<div class="btn_Box">
						<span>物流状态</span>
						<span class="shuaxin" @click="refresh">刷新<van-icon name="replay" /></span>
					</div>
				</div>

			</article>
			<article class="a1">
				<div class="card1">
					<div class="step_Box">
						<!--<div class="step_Box1">
							<div class="step_Box1s van_step_Box1s" v-for='(item,index) in logistics' :key='index'>
								<p class="date">05-22</p>
								<p class="time">08:20</p>
							</div>

						</div>-->
						<div class="step_Box2">
							<van-steps direction="vertical" :active="logistics.length" active-color='#ff485a'>
								<van-step v-for='(item,index) in logistics' :key='index'>
									<p class="logistics_p">{{item.froms}}</p>
									<p class="logistics_p" v-show="item.to">{{item.to}}</p>
									<p class="logistics_p">{{item.datetime}}</p>
								</van-step>
							</van-steps>
						</div>

					</div>

				</div>

			</article>
		</section>
		<footer></footer>
	</div>
</template>

<script>
	import _config from '../../assets/js/config';
	import _fun from '../../assets/js/fun';
	import {
		NavBar,
		Step,
		Steps,
		Icon,
		Toast
	} from 'vant';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				flush: true, //false为查询最新的,
				logistics: [],
				timingList: [],
				serverAdd: _config.serverAddress,
				imgServerAdd: _config.fileServerAddress,
				imgUrl: '../assets/test/test_red.png',
				prdname: ''
			}
		},
		created() {
			var _this = this;
			_this.getLogisticsData(_this.$route.query.orderId);
			_this.getOrderData(_this.$route.query.orderId);
		},
		methods: {
			getOrderData(_orderId) {
				var _this = this;
				_this.$http.get('/m/orders/api/getitem', {
					params: {
						orderId: _orderId
					}
				}).then(function(e) {
					if(e.result == 0) {
						//console.log(e.data);
						_this.imgUrl = _this.imgServerAdd + e.data.iconurl
						_this.prdname = e.data.prdname;
					}
				})
			},
			back() {
				this.$router.go(-1);
			},
			getLogisticsData(_orderId) {
				var _this = this;
				_this.$http.get('/m/orders/api/getOrderShipping', {
					params: {
						orderId: _orderId,
						cacheOnly: true
					}
				}).then(function(e) {
					if(_this.flush == false) {
						_this.flush == true;
					}
					if(e.result == 0) {
						if(e.data.shipping_info != undefined) {
							var lslist = JSON.parse(e.data.shipping_info);
							lslist.reverse();
							for(var i = 0; i < lslist.length; i++) {
								var obj = {};
								obj.datetime = lslist[i].datetime;
								var fromto = lslist[i].remark.split('；');

								obj.froms = fromto[0];
								if(fromto.length == 2) {
									obj.to = fromto[1];
								}
								_this.logistics.push(obj);
							}
						} else {
							var obj = {};
							obj.datetime = _fun.getTimeforTimestamp(e.data.shipping_time);
							// obj.froms = e.data.shipping_name + ':已收件';
							// obj.to = '物流单号:' + e.data.shipping_no;
       //        obj.froms ='暂无物流';
              obj.froms = '暂无物流';
              obj.to = "" ;
              obj.datetime =""
							_this.logistics.push(obj);
						}

					} else if(e.result == -2) {

					}
					//console.log(e);
				})
			},
			refresh() {
				Toast.loading({
					mask: true,
					message: '加载中...'
				});
				var _this = this;

				_this.$http.get('/m/orders/api/getOrderShipping', {
					params: {
						orderId: _this.$route.query.orderId,
						cacheOnly: false
					}
				}).then(function(e) {
					if(_this.flush == false) {
						_this.flush == true;
					}
					if(e.result == 0) {
						Toast.success('刷新成功');
						_this.logistics = [];
						var lslist = JSON.parse(e.data.shipping_info);
						lslist.reverse();
						for(var i = 0; i < lslist.length; i++) {
							var obj = {};
							obj.datetime = lslist[i].datetime;
							var fromto = lslist[i].remark.split('；');

							obj.froms = fromto[0];
							if(fromto.length == 2) {
								obj.to = fromto[1];
							}
							_this.logistics.push(obj);
						}

					} else if(e.result == -2) {

					}
					//console.log(e);
				})
			}
		},
		components: {
			[NavBar.name]: NavBar,
			[Step.name]: Step,
			[Steps.name]: Steps,
			[Icon.name]: Icon,
			[Toast.name]: Toast
		}
	}
</script>
<style>
	@import url("../../../static/navbar.css");
	@import url("../../../static/steps.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.shuaxin {
		float: right;
		padding-right: 30px;
	}

	.shuaxin>i {
		vertical-align: middle;
	}

	.logistics_p {
		font-size: 15px;
	}

	.van-step__title>h3 {
		font-weight: 100;
	}

	.time {
		font-size: 20px;
		color: rgb(153, 153, 153);
		text-align: right;
	}

	.date {
		font-size: 24px;
		color: rgb(102, 102, 102);
		text-align: center;
	}

	.step_Box2 {
		width: calc(100% - 100px);
	}

	.step_Box1 {
		width: 100px;
		display: flex;
		flex-wrap: wrap;
	}

	.van_step_Box1s {
		padding: 10px 0;
	}

	.step_Box1s {
		flex: 1;
	}

	.step_Box {
		text-align: left;
		display: flex;
		align-items: stretch;
	}

	.order_title {
		line-height: 100px;
		font-size: 28px;
		color: rgb(51, 51, 51);
	}

	img {
		width: 100%;
		height: 100%;
		border: 0;
	}

	.img_Box {
		display: inline-block;
		width: 140px;
		height: 140px;
		margin-top: 20px;
		line-height: 140px;
		color: rgb(255, 255, 255);
		font-size: 34px;
		overflow: hidden;
		border-radius: 4px;
	}

	.logistics_Box {
		text-align: center;
	}

	.logistics {


	}

  .logistics_section{
    background-color: #f9f9f9;
    width: 100%;
    height: calc(100vh - 92px);
    box-sizing: border-box;

  }

	.a1 {
		padding-top: 26px;
	}

	.card1 {
		background-color: white;
	}

	.section {
		padding: 0 16px;
	}

	.btn_Box {
		width: 100%;
		height: 80px;
		line-height: 80px;
		background: linear-gradient(to right, rgb(238, 124, 134), rgb(227, 94, 149));
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		font-size: 34px;
		color: rgb(255, 255, 255);
		text-align: left;
		text-indent: 16px;
	}
</style>
