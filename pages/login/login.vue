<template>
	<div class="test">
		<header>
		</header>
		<section>
		  <div class='container'>
			    <p class="tiptext">本页面仅用于测试</p>
			    <div>
			        <van-button size="large" type="primary" @click="checkVersion()">检测版本</van-button>
          </div>
          <div>
              <van-button size="large" type="info" @click="gotoProduct()">跳到商品购买页</van-button>
			    </div>
			</div>
		</section>
		<footer></footer>
	</div>
</template>

<script>
  import {Button} from 'vant';

	export default {
		name: 'test',
		data() {
			return {
			}
		},
		created(){
		},
		mounted: function () {
        setTimeout(function() {
           showTitle("测试页面");
           setBackButtonVisible(false);
        }, 100);
    },
		methods: {
			checkVersion(){
				CALLNATIVE.checkVersion(function(data){
            if(data=='false'){
                // 版本号不合法
                alert("版本号不合法");
            }else if(data=='true'){
                // 版本合法
                alert("版本合法");
            }
        })
			},
			gotoProduct() {
			  this.$router.push({path:'/detail', query:{prdno: 'p20191107171213030'}})
			}
		},
		components: {
       [Button.name]: Button
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
		text-align:center;
		padding-top: 200px;
	}
	.container div {
		margin: 50px 30px;
	}

</style>
