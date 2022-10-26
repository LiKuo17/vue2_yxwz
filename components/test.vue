<template>
	<div class="test">
		<header>
			<div class="header_Box">
				<van-nav-bar title="查看物流" left-arrow @click-left="onClickLeft" />
			</div>
		</header>
		<section>
		</section>
		<footer></footer>
	</div>
</template>

<script>
	import { NavBar, Step, Steps } from 'vant';

	export default {
		name: 'test',
		data() {
			return {

			}
		},
		methods: {},
		components: {
			[NavBar.name]: NavBar,
			[Step.name]: Step,
			[Steps.name]: Steps
		}
	}
</script>
<style>
	@import url("../../static/navbar.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.test {
		background-color: #f9f9f9;
		width: 100%;
		min-height: 100vh;
	}
</style>