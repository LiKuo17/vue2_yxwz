<template>
	<div class="BULLENTIN">
		<!--
                    	作者：offline
                       	时间：2020-4-21
                       	描述：公告 (widgets='ICONS')
    -->
    <p class="bullTitle"></p>
    <div class="content" v-html="Vhtml"></div>
	</div>
</template>

<script>

	export default {
		name: 'BULLENTIN',
		data() {
			return {
				title:'',
        Vhtml:''
			}
		},
		created() {
      this.getInfo();
			//console.log(this.$props.iconItem);
		},
		methods: {
			getInfo(){
        		this.$http.get('/m/common/notices/getByTag',{
          			params:{
            			tag:this.$route.query.tag
          			}
        }).then(res=>{
          console.log(res);
          this.title = res.data.title;
          this.Vhtml = res.data.content
        })
      }
		},
		components: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.BULLENTIN {
		background-color: #f9f9f9;
		width: 100%;

	}

  .bullTitle{
    text-align: center;
  }

  .content{
    text-align: left;
  }

</style>
