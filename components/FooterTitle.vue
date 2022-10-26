<template>
  <div class="footerTitle">
    <p class="title" v-show="isShow">
      <!-- <router-link class="a" to="/active?pageId=information3">&nbsp;&nbsp;营业执照&nbsp;&nbsp;</router-link> -->
      <!-- <router-link class="a" to="/active?pageId=information1">&nbsp;&nbsp;常见问题&nbsp;&nbsp;</router-link> -->
      <!-- <router-link class="a" to="/active?pageId=information2">&nbsp;&nbsp;用户协议&nbsp;&nbsp;</router-link> -->
      <router-link class="a" to="/"
        >&nbsp;&nbsp;店铺主页&nbsp;&nbsp;</router-link
      >
      <a class="a" to="/">&nbsp;&nbsp;个人中心&nbsp;&nbsp;</a>
      <a class="a" to="/">&nbsp;&nbsp;关注我们&nbsp;&nbsp;</a>
      <a class="a" to="/">&nbsp;&nbsp;店铺信息&nbsp;&nbsp;</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "footerTitle",
  data() {
    return {
      title: "",
      Vhtml: "",
      isShow: true,
    };
  },
  created() {
    // this.getInfo();
    //console.log(this.$props.iconItem);
    if (
      this.$route.query.pageId == "information1" ||
      this.$route.query.pageId == "information2" ||
      this.$route.query.pageId == "information3"
    ) {
      this.isShow = false;
    }
  },
  methods: {
    // getInfo(){
    //     this.$http.get('/m/common/notices/getByTag',{
    //       params:{
    //         tag:this.$route.query.tag
    //       }
    //     }).then(res=>{
    //       console.log(res);
    //       this.title = res.data.title;
    //       this.Vhtml = res.data.content
    //     })
    //   }
  },
  components: {},
};
</script>

<style scoped="scoped">
.footerTitle {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 0.5em;
  color: #858585;
  background-color: white;
  padding-bottom: 20px;
}

.a:link {
  color: #858585;
  text-decoration: none;
}

.a::after {
  content: "|";
}

.a:nth-last-child(1)::after {
  content: "";
}

.a:visited {
  color: #858585;
  text-decoration: none;
}

.a:hover {
  color: #858585;
  text-decoration: none;
}

.a:active {
  color: #858585;
  text-decoration: none;
}
</style>
