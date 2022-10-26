<template>
  <div class="van_allcomment-ignore">
    <van-list
      v-model="loading"
      :finished="finished"
      :finishedText="finishedText"
      @load="loadList"
      finished-text="没有更多了"
    >
      <header>
        <van-sticky>
          <van-nav-bar title="宝贝评价" left-arrow @click-left="$emit('close')">
            <template #left>
              <van-icon name="arrow-left" size="20" color="#5f656b" />
            </template>
          </van-nav-bar>
        </van-sticky>
      </header>

      <section>
        <!-- 评论分类 -->
        <!-- <article>
        <div class="classify_Box">
          <div
            class="classify_Boxs"
            @click="classifyActiveIndex = 0"
            :class="classifyActiveIndex == 0 ? 'classify_Boxs_Active' : ''"
          >
            全部
          </div>
          <div
            class="classify_Boxs"
            @click="classifyActiveIndex = 1"
            :class="classifyActiveIndex == 1 ? 'classify_Boxs_Active' : ''"
          >
            全部
          </div>
          <div
            class="classify_Boxs"
            @click="classifyActiveIndex = 2"
            :class="classifyActiveIndex == 2 ? 'classify_Boxs_Active' : ''"
          >
            有图(7556)
          </div>
        </div>
      </article> -->
        <article>
          <div
            class="comment_Box"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div class="left_box">
              <div class="img_Box">
                <img
                  :src="
                    item.avatar ? item.avatar : '/static/img/test_userx.png'
                  "
                />
              </div>
            </div>
            <div class="right_box">
              <p class="comment_user_name">
                {{ item.uid }}
              </p>
              <p class="comment_title">
                {{ item.optime }} {{ item.sku_type1 }} {{ item.sku_type2 }}
              </p>
              <p
                class="comment_text"
                @click="item.spare = true"
                :class="{ comment_text_spare: item.spare }"
              >
                {{ item.appraise }}
              </p>
              <!-- 评论图片 -->
              <!-- <div class="comment_Img_Boxs">
              <div
                class="img_Box1"
                v-for="(Img, indexa) in item.imgList"
                :key="indexa"
                @click="dopreview(index, indexa)"
              >
                <img :src="Img" />
              </div>
            </div> -->
            </div>
          </div>
        </article>
      </section>
    </van-list>
  </div>
</template>

<script>
import _config from "@/assets/js/config";
import {
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
  Sticky,
  Icon,
  List,
} from "vant";
export default {
  name: "allcomment",
  props: {
    prdid: {
      type: Number,
    },
  },
  data() {
    return {
      collection: {
        text: "收藏",
        icon: "star-o",
        color: "#646566",
      },
      classifyActiveIndex: 0,
      dataList: [],
      page: 0,
      loading: false,
      finished: false,
      finishedText: "没有更多了",
      ImgServerAddress: _config.fileServerAddress,
    };
  },
  created() {
    this.loadList();
  },
  methods: {
    loadList() {
      this.page++;
      this.getList();
    },
    getList() {
      let rows = 10;
      this.$http
        .get("m/comments/api/common/getCommentList", {
          params: {
            rows: rows,
            page: this.page,
            prdid: this.prdid,
          },
        })
        .then((res) => {
          //单次加载完成
          this.loading = false;
          //如果有数据则push
          if (res.rows && res.rows.length > 0) {
            res.rows.forEach((item) => {
              item.optime = new Date(item.optime).toLocaleDateString();
              item.spare = false;
              this.dataList.push(item);
            });
          }
          //如果当前页数为最大页数（总条数除以每页条数，上进）
          if (this.page == Math.ceil(res.records / rows)) {
            //结束所有加载
            this.finished = true;
            this.finishedText = "没有更多了";
          }
          //如果总条数为0
          if (res.records == 0) {
            //结束所有加载
            this.finished = true;
            this.finishedText = "暂时还没有评论哦~";
          }
        });
    },
    dopreview(commId, imgId) {
      ImagePreview(this.dataList[commId].imgList, imgId);
    },
  },
  components: {
    [NavBar.name]: NavBar,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    [List.name]: List,
  },
};
</script>
<style>
@import url("../../static/navbar.css");
</style>

<style scoped>
.comment_Img_Boxs {
  margin-top: 28px;
}

.img_Box1 {
  width: 192px;
  height: 186px;
  border-radius: 6px;
  overflow: hidden;
  display: inline-block;
  padding-right: 10px;
}

.comment_text {
  font-size: 30px;
  color: rgb(51, 51, 51);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  line-height: 46px;
}
.comment_text_spare {
  -webkit-line-clamp: 999;
}

.comment_title {
  font-size: 26px;
  color: rgb(153, 153, 153);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comment_user_name {
  color: rgb(51, 51, 51);
  font-size: 30px;
}

.comment_Box {
  display: flex;
  margin-bottom: 50px;
}

.img_Box {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}

img {
  width: 100%;
  height: 100%;
}

.right_box {
  width: calc(100% - 120px);
  float: left;
  text-align: left;
}

.right_box > p {
  padding-right: 60px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.left_box {
  width: 120px;
  float: left;
  text-align: center;
}

.classify_Boxs_Active {
  color: rgb(235, 101, 101) !important;
  border: 1px solid rgb(235, 101, 101) !important;
}

.classify_Boxs {
  display: inline-block;
  font-size: 30px;
  line-height: 36px;
  color: rgb(102, 102, 102);
  border: 1px solid rgb(223, 223, 223);
  border-radius: 32px;
  padding: 10px 22px;
  margin: 26px 16px;
}

.classify_Boxs:nth-child(1) {
  margin-left: 32px;
}

.classify_Box {
  text-align: left;
}

.van_allcomment-ignore {
  background-color: white;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: scroll;
  margin-bottom: 50px;
}
</style>
