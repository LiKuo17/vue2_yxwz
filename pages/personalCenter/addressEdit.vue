<template>
	<div class="van_addressEdit">
		<header>
			<div class="header_Box">
				<van-nav-bar title="地址编辑" left-arrow @click-left="back" />
			</div>
		</header>
		<section class="van_addressEdit_section">
			<article>
				<van-address-edit :area-list="areaList" show-postal :address-info='addressInfo' show-delete show-set-default show-search-result @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" :is-saving='saving' />
			</article>
		</section>
		<footer></footer>
	</div>
</template>

<script>
	import _areaList from '../../assets/js/area'
	import { NavBar, AddressEdit, Toast } from 'vant';
	//console.log(_areaList);
	export default {
		name: 'test',
		data() {
			return {
				saving: false,
				areaList: _areaList,
				searchResult: [],
				addressInfo: {
					uid: '',
					isDefault: 0,

				}
			}
		},
		methods: {
			back() {
				//console.log(1);
				this.$router.go(-1);
			},
			onSave(content) {
				//console.log(content);
				var _this = this;
				_this.saving = true;
				_this.$http.post('/m/members/api/updateDeliveryAddress', {
					uid: content.uid,
					isDefault: content.isDefault,
					areaCode: content.areaCode,
					province: content.province,
					city: content.city,
					county: content.county,
					addressDetail: content.addressDetail,
					postalCode: content.postalCode,
					name: content.name,
					tel: content.tel,
					id: content.id
				}).then(function(e) {
					_this.saving = false;
					if(e.result == 0) {
						//console.log('修改成功');
						Toast('修改成功');
						_this.$router.back();
					} else {
						Toast('修改失败');
					}
				})
			},
			onDelete(content) {
				var _this = this;
				_this.$http.get('/m/members/api/delDeliveryAddress', {
					params: {
						addrId: content.id
					}
				}).then(function(e) {
					if(e.result == 0) {
						Toast('操作成功');
						_this.$router.back();
					} else {
						Toast('操作失败');
					}
				})
			},
			onChangeDetail(val) {
				//暂时不写
				//				if(val) {
				//					this.searchResult = [{
				//						name: '黄龙万科中心',
				//						address: '杭州市西湖区'
				//					}];
				//				} else {
				//					this.searchResult = [];
				//				}
				//console.log('跳过');
			},
			getDateById(id) {
				var _this = this;
				_this.$http.get('/m/members/api/getDeliveryAddress', {
					params: {
						addrId: id
					}
				}).then(function(e) {
					if(e.result == 0) {
						_this.addressInfo = e.data;
						if(_this.addressInfo.isDefault==0){
							_this.addressInfo.isDefault = false;
						} else {
							_this.addressInfo.isDefault = true;
						}
						//console.log(e);
					}

				})
			}

		},
		components: {
			[NavBar.name]: NavBar,
			[AddressEdit.name]: AddressEdit,
			[Toast.name]: Toast
		},

		created() {
			var _this = this;
			//			//console.log(_this.$route.query.id);
			_this.getDateById(_this.$route.query.id);
		}
	}
</script>
<style>
	@import url("../../../static/navbar.css");
  .van_addressEdit .van-button--danger {
    background-image: linear-gradient(to right, #1CDA9A, #06B4C5);
    border: 0;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.van_addressEdit {

	}

  .van_addressEdit_section{
    background-color: #f9f9f9;
    width: 100%;
    height: calc(100vh - 46px - 10px);
    padding-top: 10px;
    text-align: left;
  }

</style>
