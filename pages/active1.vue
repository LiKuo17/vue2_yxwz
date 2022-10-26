<template>
  <div class="van_active1">
    <header>
      <div class="header_Box">
        <van-sticky>
          <van-nav-bar :title="titleText" left-arrow @click-left="back" />
        </van-sticky>
      </div>
    </header>
    <section>
      <div v-if="pageDate.widgets != null">
        <div v-for="(item, index) in pageDate.widgets" :key="index">
          <!--<div>-->
          <article
            v-if="item.type == 'SWIPE'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：轮播图 (widgets='SWIPE')
                	-->
            <swipe @doLink="doLink" :swItem="item"></swipe>
            <!--<div class="swipe_Box">
						<van-swipe :autoplay="300000" indicator-color="white">
							<van-swipe-item v-for='(item_SWIPE,index_SWIPE) in item.items' :key='index_SWIPE' @click="doLink(item_SWIPE)">
								<div class="img_Box" :style="'height:'+item.imageHeight+';'">
									<img :src="imgServerAdd+item_SWIPE.imageUrl" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null"/>
								</div>
							</van-swipe-item>
						</van-swipe>
					</div>-->
          </article>

          <article
            v-else-if="item.type == 'SEARCH'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：搜索框 (widgets='SEARCH')
               	 	-->
            <search :searchItem="item" @toSearch="toSearch"></search>
            <!--<div class="search_Box">
						<van-search :placeholder="item.tips" shape="round" v-model="value" @click='toSearch' />
					</div>-->
          </article>
          <article
            v-else-if="item.type == 'ICONS'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：导航图标 (widgets='ICONS')
               	 	-->
            <icons :iconItem="item" @doLink="doLink"></icons>
            <!--<div class="card_Box">
						<div class="box_Content">
							<div class="title_Box">
								<div class="title_Content" :style="'width: calc(100% / '+item.countPerRow+');'"  v-for="(item_ICONS,index_ICONS) in item.items" :key='index_ICONS' @click="doLink(item_ICONS)">
									<div class="img_Box1" :style="'width: '+item.iconWidth+'; height: '+item.iconHeight+';'">
										<img :src="imgServerAdd+item_ICONS.imageUrl" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null" />
									</div>
									<p class="titleText">{{item_ICONS.text}}</p>
								</div>
							</div>
						</div>
					</div>-->
          </article>
          <article
            v-else-if="item.type == 'IMAGE'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：静态图片 (widgets='IMAGE')
               	 	-->
            <datupian :imageItem="item" @doLink="doLink"></datupian>
            <!--<div class="card_Box box_Content1">
						<div class="luck_Img_Box">
							<img :src="imgServerAdd+item.imageUrl" @click="doLink(item)" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null" />
						</div>
					</div>-->
          </article>
          <article
            v-else-if="item.type == 'TITLE'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：标题栏 (widgets='TITLE')
               	 	-->
            <mtitle :titleItem="item"></mtitle>
            <!--<div class="card_Box">
						<div class="box_Content1">
							<div class="sift_Box">
								<div class="sift_title">
									<p class="sift_left">
										<span>{{item.text}}</span>
									</p>
									<p class="sift_right">

									</p>
									<div class="clear"></div>
								</div>
							</div>
						</div>

					</div>-->
          </article>
          <article
            v-else-if="item.type == 'PRDGRID'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：网格型商品列表 (widgets='PRDGRID')
               	 	-->
            <prdgrid :prdgridItem="item" @doDetail="doDetail"></prdgrid>
            <!--<div class="card_Box">
						<div class="box_Content1">
							<div class="PRDGRID">
								<div class="sift_Article_Box">
									<div class="sift_Article_Boxs" v-for="(item_PRDGRID,index_PRDGRID) in item.items  " @click="doDetail(item_PRDGRID.prdid,item_PRDGRID.linkPage)">
										<div class="PRDGRID_imgBox" :style="'width: '+item.iconWidth+'; height: '+item.iconHeight+';'">
											<img :src="imgServerAdd+item_PRDGRID.imageUrl" onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null" />
										</div>
										<p class="article_title">{{item_PRDGRID.title}}</p>
										<p class="article_price">{{item_PRDGRID.saleprice==undefined?'暂无价格':'￥'+item_PRDGRID.saleprice}}
											<span>{{item_PRDGRID.instalments==0||item_PRDGRID.instalments==undefined?'':'×'+item_PRDGRID.instalments+'期'}}</span>
										</p>
										<p class="article_price" v-if='item_PRDGRID.desc'>{{item_PRDGRID.desc}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>-->
          </article>
          <article
            v-else-if="item.type == 'PRDLIST'"
            :style="'margin-bottom:' + item.marginBottom + ';'"
          >
            <!--
                    	作者：offline
                       	时间：2019-08-22
                       	描述：列表型商品列表 (widgets='PRDLIST')
               	 	-->
            <prdlist :prdgridItem="item" @doDetail="doDetail"></prdlist>
            <!--<div class="card_Box">
						<div class="box_Content1">
							<div class="PRDLIST">
								<div class="sift_Article_Box" v-for="(item_PRDLIST,index_PRDLIST) in item.items" @click="doDetail(item_PRDLIST.prdno,item_PRDLIST.linkPage)">
									<div class="box_Content2">
										<div class="left_box">
											<div class="img_Box3">
												<img :src="imgServerAdd+item_PRDLIST.imageUrl"  onerror="this.src='../../static/img/detaul_Img.jpg';this.οnerrοr=null"/>
											</div>
										</div>
										<div class="right_box">
											<p class="name">{{item_PRDLIST.title}}</p>
											<p class="norms">{{item_PRDLIST.subtitle}}</p>
											<p class="price">
												<span>{{item_PRDLIST.instalments==0||item_PRDLIST.instalments==undefined?'价格：':'分期价：'}}</span>
												<span>￥{{item_PRDLIST.instalments==0||item_PRDLIST.instalments==undefined?item_PRDLIST.saleprice==undefined?'暂无价格':item_PRDLIST.saleprice+'元':item_PRDLIST.saleprice+'×'+item_PRDLIST.instalments+'期'}}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>-->
          </article>

          <article
            v-else-if="item.type == 'RICHTEXT'"
            :style="'line-height:' + item.lineheight + ';'"
          >
            <div class="p_html Content" v-html="item.html"></div>
          </article>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import swipe from "../components/SWIPE";
import search from "../components/SEARCH";
import icons from "../components/ICONS";
import mimages from "../components/IMAGES";
import mtitle from "../components/TITLE";
import prdgrid from "../components/PRDGRID";
import prdlist from "../components/PRDLIST";
import { NavBar, Sticky } from "vant";
export default {
  name: "van_active1",
  data() {
    return {
      value: "",
      tabBarIndex: 0,
      pageDate: {},
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      titleText: "",
    };
  },
  methods: {
    toSearch() {
      this.$router.push("search");
    },
    back() {
      if (
        window.location.href.split("#")[1].replace(/active1/g, "active") ==
        window.localStorage.getItem("pageOneUrl")
      ) {
        nativeGoBack();
      } else {
        this.$router.go(-1);
      }
    },
    getPageDate(_pageId) {
      var _this = this;
      this.$http
        .get("/m/common/pageconfig/api/getconfig", {
          params: {
            pageId: _pageId,
          },
        })
        .then(function(e) {
          if (e.msg == "Success") {
            _this.pageDate = e.data;
            _this.titleText = e.data.pageName;
          }
          //console.log(e);
        });
      //				this.$http.post('/m/common/pageconfig/api/getconfig', {
      //						pageId: 'HOME'
      //				}).then(function(e){
      //					//console.log(e);
      //				})
    },
    doLink(link) {
      var _this = this;

      if (link == undefined || link == null || link == "") {
        //console.log('link为空');
        return false;
      }

      if (link.linkType == 1) {
        if (link.linkPage == "USER") {
          this.$router.push({
            path: "/shoppingcart",
          });
        }
        _this.$router.push({
          path: "/active",
          query: {
            pageId: link.linkPage,
          },
        });
      } else if (link.linkType == 2) {
        _this.doDetail(link.linkPrdno);
      } else if (link.linkType == 3) {
        window.location.href = link.linkUrl;
      } else {
        //					if(link.link == 'USER'){
        //						this.$router.push({ path: '/shoppingcart'});
        //					} else {
        //						_this.$router.push({
        //						path: '/active',
        //						query: {
        //							pageId: link.link
        //						}
        //					})
        //					}
      }
    },
    doDetail(prdId) {
      if (prdId == undefined) {
        return false;
      }
      this.$router.push({
        path: "/detail",
        query: {
          prdno: prdId,
        },
      });
    },
  },
  created() {
    var _this = this;
    _this.$emit("setIndex", this.tabBarIndex);
    _this.getPageDate(_this.$route.query.pageId);
    //console.log(_this.serverAdd)
  },
  components: {
    swipe,
    search,
    icons,
    datupian: mimages, //  这里命名不规范。因为该组件名字比较特殊。使用不当会产生警告
    mtitle,
    prdgrid,
    prdlist,
    [NavBar.name]: NavBar,
    [Sticky.name]: Sticky,
  },
};
</script>

<style>
/* @import url("../../static/search.css");
@import url("../../static/icon.css");
@import url("../../static/navbar.css"); */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  background-color: white;
}

.van_active1 {
  min-height: calc(100vh - 46px);
  width: 100%;
  background-color: #f9f9f9;
  z-index: -1;
  overflow-y: auto;
  margin-top: 46px;
}

img {
  height: 100%;
  width: 100%;
  border: 0;
}

article {
  position: relative;
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

.p_html>img {
  vertical-align: top;
}

.p_html {
  text-align: left;
}
</style>
