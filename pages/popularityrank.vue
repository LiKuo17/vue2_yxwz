<template>
	<div class="popularityrank">
		<header>
			<div class="header_Box">
				<van-nav-bar title="人气榜" left-arrow @click-left="onClickLeft" />
			</div>
		</header>
		<section>
			<article class="a1">
				<div class="card_Box">
					<div class="box_Content1">
						<div  class="sift_Article_Box">
							<div class="box_Content2">
								<div class="left_box">
									<div class="img_Box2">
										<img src="../assets/test/test_red.png" />
									</div>
								</div>
								<div class="right_box">
									<p class="name">雅棉酒店同款纯棉四件套...</p>
									<p class="norms">历史低价</p>
									<p class="price"><span>分期价：</span><span>￥19.90×12期</span></p>
								</div>
							</div>
						</div>
						<div  class="sift_Article_Box">
							<div class="box_Content2">
								<div class="left_box">
									<div class="img_Box2">
										<img src="../assets/test/test_red.png" />
									</div>
								</div>
								<div class="right_box">
									<p class="name">雅棉酒店同款纯棉四件套...</p>
									<p class="norms">历史低价</p>
									<p class="price"><span>分期价：</span><span>￥19.90×12期</span></p>
								</div>
							</div>
						</div>
						<div  class="sift_Article_Box">
							<div class="box_Content2">
								<div class="left_box">
									<div class="img_Box2">
										<img src="../assets/test/test_red.png" />
									</div>
								</div>
								<div class="right_box">
									<p class="name">雅棉酒店同款纯棉四件套...</p>
									<p class="norms">历史低价</p>
									<p class="price"><span>分期价：</span><span>￥19.90×12期</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</section>
		<footer></footer>
	</div>
</template>

<script>
	
	import { NavBar  } from 'vant';
	
	export default {
		name: 'popularityrank',
		data() {
			return {
				
			}
		},
		methods: {
			onClickLeft(){
				this.$router.go(-1);
			}
		},
		components: {
			[NavBar.name]: NavBar
		}
	}
</script>
<style>
	@import url("../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.popularityrank{
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}
	
	.van-nav-bar__title{
		margin: 0;
		text-align: left;
		text-indent: 55px;
	}
	
	.sift_title{
		line-height: 102px;
	}
	
	.price {
		margin-top: 4px;
	}
	
	.price>span:nth-child(2) {
		color: rgb(235, 101, 101);
		font-size: 34px;
		font-weight: bold;
	}
	
	.price>span:nth-child(1) {
		color: rgb(153, 153, 153);
		font-size: 30px;
		font-weight: 400;
	}
	
	.norms {
		color: rgb(235, 101, 101);
		font-size: 30px;
		margin-top: 4px;
	}
	.box_Content2{
		display: flex;
		align-items: center;
	}
	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: rgb(51, 51, 51);
		font-size: 34px;
	}
	
	.right_box {
		float: right;
		width: 396px;
		text-align: left;
	}
	
	.img_Box2 {
		display: inline-block;
		width: 240px;
		height: 158px;
		margin-right: 24px;
	}
	
	.left_box {
		float: left;
	}
	
	.article_price {
		margin-top: 6px;
		font-size: 28px;
		color: rgb(235, 101, 101);
		font-weight: bold;
		margin-bottom: 34px;
	}
	
	.article_title {
		margin-top: 20px;
		font-size: 26px;
		color: rgb(51, 51, 51);
	}
	
	.sift_Article_Boxs {
		width: 200px;
	}
	
	.sift_Article_Box {
		display: flex;
		padding: 12px 0;
		justify-content: space-between;
	}
	
	.sift_Box {
		display: inline-block;
		width: 100%;
		border-bottom: 1px solid rgb(223, 223, 223);
	}
	
	
	.sift_right {
		float: right;
		color: #ccc8c8;
		font-size: 30px;
	}
	
	.sift_right>* {
		vertical-align: middle;
	}
	
	.sift_left {
		font-size: 34px;
		color: rgb(51, 51, 51);
		float: left;
	}
	
	img {
		height: 100%;
		width: 100%;
		border: 0;
	}
	
	
	.img_Box {
		margin-top: 16px;
		border-radius: 7px;
		overflow: hidden;
	}
	
	.card_Box {
		background-color: white;
	}
	
	.box_Content {
		padding: 0 16px;
	}
	
	.box_Content1 {
		padding: 0 32px;
	}
	
	.active_Box {
		display: flex;
		justify-content: space-around;
	}
	
	.activeTitle {
		font-size: 30px;
	}
	
	.active_Boxs {
		width: 120px;
		text-align: center;
		padding: 30px 0;
	}
	
	.activeImg {
		width: 100%;
		height: 100%;
	}
	
	.img_Box {
		width: 66px;
		height: 66px;
		display: inline-block;
	}
	
	.box_Content {
		/*padding: 0 52px;*/
	}
	
	.card_Box {
		background-color: white;
	}
	
	.right_box>p{
		padding: 8px 0;
	}
</style>