<template>
	<div class="TITLE">
		<!--
                    	作者：offline
                       	时间：2019-08-22 
                       	描述：标题栏 (widgets='TITLE')
        -->
		<div class="card_Box">
			<div class="box_Content1">
				<div class="sift_Box">
					<div class="sift_title">
						<p class="sift_left">
							<span>{{titleItem.text}}</span>
						</p>
						<p class="sift_right">

						</p>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TITLE',
		props: ['titleItem'],
		data() {
			return {}
		},
		methods: {},
		components: {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*.TITLE {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}*/
	
	.card_Box {
		background-color: white;
	}
	
	.sift_Box {
		line-height: 82px;
		border-bottom: 1px solid rgb(223, 223, 223);
	}
	
	.sift_left>span {
		vertical-align: middle;
	}
	
	.sift_right {
		float: right;
		color: #ccc8c8;
		font-size: 30px;
	}
	
	.sift_right>span {
		vertical-align: middle;
	}
	
	.sift_left {
		font-size: 32px;
		color: rgb(51, 51, 51);
		float: left;
	}
	
	.box_Content1 {
		padding: 0 32px;
	}
	
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