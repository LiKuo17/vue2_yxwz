<template>
	<div class="IMAGES">
		<!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：静态图片 (widgets='IMAGE')
        -->
		<div class="card_Box box_Content1">
			<div class="luck_Img_Box">
				<img :src="imgServerAdd+imageItem.imageUrl" @click="doLink(imageItem)" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null" />
			</div>
		</div>
	</div>
</template>

<script>
	import _config from '../assets/js/config';
	import { Swipe, SwipeItem } from 'vant';

	export default {
		name: 'IMAGES',
		props: ['imageItem'],
		data() {
			return {
				serverAdd: _config.serverAddress,
				imgServerAdd: _config.fileServerAddress
			}
		},
		created() {
			//console.log(this.$props.swItem);
		},
		methods: {
			doLink(item_SWIPE) {
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
	/*.IMAGES {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/

	.box_Content1 {
		padding: 0 ;
	}

	.luck_Img_Box {
    font-size: 0;
		background-size: contain;
	}

	.swipe_Box {
		position: relative;
	}

	.img_Box {
		border-radius: 7px;
    font-size: 0;
		overflow: hidden;
	}

	img {
		height: 100%;
		width: 100%;
		border: 0;
	}
</style>
