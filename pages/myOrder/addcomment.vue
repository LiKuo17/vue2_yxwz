<template>
  <div class="van_addcomment">
    <header>
      <div class="header_Box">
        <van-nav-bar title="发表评价" left-arrow @click-left="back" />
      </div>
    </header>
    <section class="van_addcomment_section">
      <article>
        <div class="rate_Box">
          <div class="img_Box">
            <img
              :src="imgUrl"
              onerror="this.src='../../../static/img/detaul_Img.jpg';this.onerror=function(){};//console.log(this)"
            />
          </div>
          <p class="rate_P">
            <span class="rate_sp">描述相符</span>
            <van-rate
              v-model="value"
              icon="like"
              color="#f44"
              void-icon="like-o"
            />
            <span v-show="value == 5" class="rough_rate">非常符合</span>
            <span v-show="value == 4" class="rough_rate">较符合</span>
            <span v-show="value == 3" class="rough_rate">一般</span>
            <span v-show="value == 2" class="rough_rate">糟糕</span>
            <span v-show="value == 1" class="rough_rate">非常糟糕</span>
          </p>
        </div>
        <div class="conment_Box">
          <van-field
            v-model="text"
            placeholder="说说你的使用心得，分享给想买的他们吧"
            rows="6"
            maxlength="260"
            type="textarea"
          />
          <!-- <div
            class="upfile_Box"
            v-for="(item, index) in fileList"
            :key="index"
          >
            <div class="upfile_Boxs">
              <img :src="item.content" @click="yulan(index)" />
            </div>
          </div>
          <van-uploader
            class="upfile_Box"
            :after-read="imageRead"
            v-model="fileList"
            capture="camcorder"
            upload-text="上传图片"
          />
          <van-uploader
            :after-read="vedioRead"
            accept="video/*"
            capture="camcorder"
            upload-text="上传视频"
          /> -->
        </div>
        <div class="btnMenuBox">
          <van-button
            round
            type="danger"
            color="linear-gradient(to right,#1CDA9A,#06B4C5)"
            size="large"
            @click="addComment"
            >评价</van-button
          >
        </div>
      </article>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import _config from "../../assets/js/config";
import {
  ImagePreview,
  NavBar,
  Rate,
  Field,
  Uploader,
  Toast,
  Button,
} from "vant";

export default {
  name: "van_addcomment",
  data() {
    return {
      value: 0,
      text: "",
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      fileList: [],
      camera: "camcorder",
      orderId: "",
      imgUrl: "../../../static/img/test_red.png",
      images: [],
    };
  },
  created() {
    var _this = this;
    _this.getOrderImg(_this.$route.query.orderId);
  },
  methods: {
    addComment() {
      if (!this.value) {
        Toast("请至少点亮一颗星哦");
      } else if (this.text.length < 5) {
        Toast("请评价5字以上");
      } else {
        this.$http
          .post("/m/orderservice/api/orderAddAppraise", {
            orderid: this.orderId,
            appraise: this.text,
            start: this.value,
          })
          .then((e) => {
            if (e.result == 0) {
              Toast("谢谢您的评价");
              this.$router.back();
            } else {
              Toast(e.msg);
            }
          });
      }
    },
    back() {
      this.$router.back();
    },
    getOrderImg(_orderId) {
      var _this = this;
      if (_orderId != undefined) {
        _this.$http
          .get("/m/orders/api/getitem", {
            params: {
              orderId: _orderId,
            },
          })
          .then(function(e) {
            if (e.result == 0) {
              _this.imgUrl = _this.imgServerAdd + e.data.iconurl;
              _this.orderId = e.data.orderid;
            }
          });
      }
    },
    imageRead(e, a, c) {
      //				this.fileList.push(e);
      //				this.images.push(e);
      //				//console.log(this.fileList);
    },
    vedioRead(e, a, c) {
      //				this.fileList.push(e);
    },
    yulan(e) {
      ImagePreview({
        images: ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"],
        startPosition: 1,
        onClose() {
          // do something
        },
      });
    },
  },
  components: {
    [ImagePreview.name]: ImagePreview,
    [NavBar.name]: NavBar,
    [Rate.name]: Rate,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Toast.name]: Toast,
    [Button.name]: Button,
  },
};
</script>
<style>
@import url("../../../static/navbar.css");
@import url("../../../static/vanrate.css");
@import url("../../../static/vanrate.css");
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btnMenuBox {
  margin-top: 150px;
  padding: 40px;
}
.upfile_Box {
  padding: 32px;
}

.upfile_Boxs {
  width: 180px;
  height: 180px;
  display: inline-block;
}

.conment_Box {
  border-top: 1px solid rgb(223, 223, 223);
  text-align: left;
}

.rough_rate {
  padding-left: 26px;
}

.rate_sp {
  padding-left: 10px;
  padding-right: 26px;
}

.rate_Box {
  text-align: left;
  padding-left: 32px;
}

.rate_P {
  display: inline-block;
  vertical-align: middle;
}

.rough_rate {
  font-size: 30px;
  color: rgb(153, 153, 153);
}

.img_Box {
  width: 84px;
  height: 88px;
  border-radius: 6px;
  overflow: hidden;
  display: inline-block;
  margin: 28px 0;
  vertical-align: middle;
}

img {
  width: 100%;
  height: 100%;
}

.van_addcomment {
}

.van_addcomment_section {
  width: 100%;
  height: calc(100vh -46px);
}
</style>
