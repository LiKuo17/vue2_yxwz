<template>
	<div class="SWIPE">
		<div class="swipe_Box">
			<van-swipe :autoplay="300000" indicator-color="white">
				<van-swipe-item v-for='(item_SWIPE,index_SWIPE) in swItem.items' :key='index_SWIPE' @click="dopLink(item_SWIPE)">
					<div class="img_Box" :style="'height:'+swItem.imageHeight+';'">
						<img :src="imgServerAdd+item_SWIPE.imageUrl" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null" />
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
	</div>
</template>

<script>
	import _config from '../assets/js/config';
	import { Swipe, SwipeItem } from 'vant';

	export default {
		name: 'SWIPE',
		props: ['swItem'],
		data() {
			return {
				serverAdd: _config.serverAddress,
				imgServerAdd: _config.fileServerAddress
			}
		},
		created() {
			console.log(this.$props.swItem);
		},
		methods: {
			dopLink(item_SWIPE) {
				this.$emit('doLink', item_SWIPE);
			}
		},
		components: {
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*.SWIPE {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/
	
	.swipe_Box {
		position: relative;
	}
	
	.img_Box {
		border-radius: 7px;
		overflow: hidden;
	}
	
	img {
		height: 100%;
		width: 100%;
		border: 0;
	}
</style>