<template>
	<!--<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">-->
		<div class="search">
			<header>
			  <div class="header_Box">
			    <van-nav-bar :title="titleText" left-arrow @click-left="back" />
			  </div>
			</header>
			<section>
				<article>
					<div class="van-search_Box">
						<van-search placeholder="请输入搜索文字" shape="round" v-model="value" show-action>
							<div class="search_Btn" slot="action" @click="onSearch()">搜索</div>
						</van-search>
					</div>
				</article>
				<article class="searchResult_a1">
					<div class="card_Box mrn">
						<div class="box_Content1" v-for="(item,index) in queryList" :key="index">
							<div class="sift_Article_Box" @click="goDetail(item.prdid)">
								<div class="box_Content2">
									<div class="left_box">
										<div class="img_Box3">
											<img :src="imgServerAdd + item.mainimage" onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};console.log(this)" />
										</div>
									</div>
									<div class="right_box">
										<p class="name">{{item.prdname}}</p>
										<p class="norms">{{item.promot_type}} &nbsp;</p>
										<p class="price">
											<span>售价：</span>
											<span>￥{{item.price}}</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</article>
			</section>
			<footer></footer>
		</div>
	<!--</van-list>-->
</template>

<script>
	import _config from '../../assets/js/config';
	import {
		NavBar,
		Step,
		Steps,
		Search,
		Icon,
		Dialog,
		List
	} from 'vant';

	export default {
		name: 'test',
		data() {
			return {
				value: '',
				isSearch: true,
				queryList: [],
				serverAdd: _config.serverAddress,
				imgServerAdd: _config.fileServerAddress,
				searchHistory: [],
        titleText:'搜索'
			}
		},
		created() {
			var _this = this;
			_this.onSearch(_this.$route.query.searchv);
		},
		methods: {
			goDetail(_prdid) {
				var _this = this;
				_this.$router.push({
					path: '/detail',
					query: {
						prdid: _prdid
					}
				});
			},
      back() {
        var _this = this;
        _this.$router.back();
      },
			onSearch(_value) {
				var _this = this;
				_this.isSearch = false;
				if(_value == undefined || _value == '' || _value == null) {
					_value = _this.value
				}
				_this.value = _value;
				_this.setHistory(_value);
				_this.$http.get('/m/products/common/api/query', {
					params: {
						keywords: _value,
						rows: 100
					}
				}).then(function(e) {
					if(e.result == 0) {
						_this.queryList = e.data
						_this.getHistory();
					}
				})
			},
			setHistory(value) {
				var _this = this;
				var his = localStorage.getItem('search');
				if(his.indexOf(value) != -1) {
					return false;
				} else {
					localStorage.setItem('search', his + value + ',');
				}
			},
			getHistory() {
				var _this = this;
				var obj = localStorage.getItem('search');
				if(obj == null) {
					localStorage.setItem('search', '');
					_this.searchHistory = [];
				} else {
					_this.searchHistory = obj.split(',');
				}

			}
		},
		components: {
			[NavBar.name]: NavBar,
			[Step.name]: Step,
			[Steps.name]: Steps,
			[Search.name]: Search,
			[Icon.name]: Icon,
			[Dialog.name]: Dialog,
			[List.name]: List
		}
	}
</script>
<style>
	/* @import url("../../../static/search.css");
	@import url("../../../static/icon.css");
  @import url("../../../static/navbar.css"); */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.PRDLISTs {
  	background-color: #f9f9f9;
  	width: 100%;
  	min-height: 100vh;
  }*/

  .card_Box {
  	background-color: white;
  }

  .price {
  	margin-top: 10px;
  }

  .price>span:nth-child(2) {
  	color: rgb(235, 101, 101);
  	font-size: 30px;
  	font-weight: bold;
  }

  .noprice>span:nth-child(2) {
  	color: #888888;
  	font-size: 30px;
  	font-weight: bold;
  }

  .img_Box3 {
    width: 158px;
  	height: 158px;
  	margin-right: 24px;
    overflow: hidden;
  }

  .price>span:nth-child(1) {
  	color: rgb(153, 153, 153);
  	font-size: 30px;
  	font-weight: 600;
  }

  .norms {
  	color: rgb(235, 101, 101);
  	font-size: 30px;
  	margin-top: 10px;
  }

  .name {
  	overflow: hidden;
  	text-overflow: ellipsis;
  	white-space: nowrap;
  	color: rgb(51, 51, 51);
  	font-size: 30px;
  	margin-top: 7px;
  	margin-bottom: 7px;
  }

  .right_box {
  	float: right;
  	width: 450px;
  	text-align: left;
  }

  .right_box>p {
  	padding: 0;
  }

  .box_Content2 {
  	display: flex;
  	align-items: flex-start;
    padding: 18px 0;

    width: 100%;
  }

  .sift_Article_Box:nth-child(1)>.box_Content2{
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

  .box_Content1 {
  	padding: 0 32px;
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

	.history_value_p>span {
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
		min-height: 250px;
		padding-top: 40px;
	}

	.search_Content_Box {
		margin-top: 42px;
		border-radius: 30px;
		background-color: rgb(255, 255, 255);
		position: relative;
	}

	.search_Btn {
		color: white;
	}

	.search {
		background-color: rgb(255, 255, 255);
		width: 100%;
		height: calc(100vh - 92px);
		margin-top: 46px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.van-search_Box {
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 7px;
		top: 0;
		padding-bottom: 7px;
		background: linear-gradient(to right, #e35e95, #ee7c86);
		z-index: 0;
	}

	.mrn {
		position: relative;
	}

	.search_Box .van-search__action {}

	.van-search__action:active {
		background-color: transparent;
	}

	.bg_Box {}

	img {
		width: 100%;
		height: 100%;
	}
</style>
