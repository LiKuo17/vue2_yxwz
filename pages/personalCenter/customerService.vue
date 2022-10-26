<template>
  <div class="customerService">
    <header>
      <div class="header_Box">
        <van-sticky>
          <van-nav-bar
            :title="$route.query.realname"
            left-arrow
            @click-left="back"
          />
        </van-sticky>
      </div>
    </header>

    <div
      class="ignore-recordArea"
      ref="recordArea"
      @click.self="showAdd = true"
    >
      <!-- <van-pull-refresh v-model="record_isLoading" @refresh="record_onRefresh"> -->
      <div class="recIem" v-for="(item, index) in record" :key="index">
        <div class="timeLine" v-if="item.createTime">
          {{ item.createTime | CreateTime }}
        </div>
        <div :class="{ their: item.type == 1, mine: item.type == 0 }">
          <!-- 为客服消息时头像显示在左边 -->
          <div
            v-if="item.type == 1"
            class="avatar"
            :style="{
              backgroundImage: 'url(' + (avatar ? avatar : fixAvatar) + ')',
            }"
          ></div>
          <!-- 根据角色区分消息区域样式 -->
          <div
            :class="{
              theirMsg: item.type == 1,
              myMsg: item.type == 0,
            }"
          >
            <!-- 为客服消息时显示昵称 -->
            <div v-if="item.type == 1" class="uid">
              {{ realname }}
            </div>
            <div class="msgBox">{{ item.content }}</div>
          </div>
          <!-- 为用户消息时头像显示在右边 -->
          <div
            v-if="item.type == 0"
            class="avatar"
            :style="{
              backgroundImage: 'url(' + userImgUrl_local + ')',
            }"
          ></div>
        </div>
      </div>
      <!-- </van-pull-refresh> -->
    </div>

    <div class="bottomInp">
      <div class="inpLine">
        <div class="inp">
          <textarea
            class="myInput"
            @focus="showAdd = true"
            ref="msgContainer"
            v-model="msgContent"
            rows="1"
          ></textarea>
          <div v-if="false" class="emoji"></div>
        </div>

        <div class="rightFunctionArea">
          <van-button
            @click="handleSend"
            class="send"
            size="small"
            type="primary"
            >发送</van-button
          >
          <div v-if="!msgContent && false" class="addContainer">
            <van-icon
              v-if="showAdd"
              @click="showAdd = false"
              name="add"
              size="36"
            />
            <van-icon v-else name="clear" @click="showAdd = true" size="36" />
          </div>
        </div>
      </div>

      <div class="addOptions" v-if="!showAdd">
        <div class="addItem" v-for="(item, index) in addMenu" :key="index">
          <div class="itemIconOuter">
            <div :style="{ backgroundImage: `url(${item.icon})` }"></div>
          </div>
          <div>{{ item.text }}</div>
          <van-uploader class="uploadImg" :after-read="afterRead" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky, NavBar, Icon, Button, Uploader, PullRefresh } from "vant";
import _config from "../../assets/js/config";
let fixAvatar = "/static/img/test_userx.png";
export default {
  filters: {
    CreateTime(val) {
      if (val) {
        let realTime = new Date(val);
        let nowTime = new Date();
        if (
          realTime.getFullYear() == nowTime.getFullYear() &&
          realTime.getMonth() == nowTime.getMonth() &&
          realTime.getDate() == nowTime.getDate()
        ) {
          return new Date(val).toLocaleTimeString();
        }
        return new Date(val).toLocaleString();
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      uid: 0,
      showAdd: true,
      msgContent: "",
      contentHeightList: [],
      record: [],
      addMenu: [
        {
          icon: "../../../static/img/camera.png",
          text: "选择图片",
        },
      ],
      imgServerAdd: _config.fileServerAddress,
      userImgUrl: "",
      userImgUrl_local: "",
      fixAvatar: "/static/img/test_userx.png",
      record_isLoading: false,
      realname: "",
      avatar: "",
      keyArr: [],
    };
  },
  mounted() {
    // this.getuserInfo();
    this.listenMsg();
    this.listenSendKey();
  },
  created() {
    this.getMessages();
    // this.$connectSocket();
  },
  watch: {
    record: {
      handler(newV, oldV) {
        //聊天记录自动滑动到最后一条
        this.$nextTick((vm) => {
          let csContainer = this.$refs.recordArea;
          this.$refs.recordArea.scrollTop =
            csContainer.scrollHeight - csContainer.clientHeight;
        });
      },
      deep: true,
      immediate: true,
    },
    msgContent(newV) {
      this.inCreaseContentHeight();
    },
  },
  methods: {
    listenSendKey() {
      window.addEventListener("keydown", (e) => {
        this.keyArr.push(e.keyCode);
        if (this.keyArr.length > 2) {
          this.keyArr.splice(0, 1);
        }
        if (this.keyArr[0] == 17 && this.keyArr[1] == 13) {
          this.handleSend();
        }
      });
    },
    record_onRefresh() {
      console.log("refresh");
    },
    inCreaseContentHeight() {
      this.$nextTick(() => {
        let msgContainer = this.$refs.msgContainer;
        this.$refs.msgContainer.style.height = "auto";
        this.$refs.msgContainer.style.height = msgContainer.scrollHeight + "px";
      });
    },
    getMessages() {
      return new Promise((resolve) => {
        this.$http({
          url: "/m/websocket/api/getMessagesByBiz_uid",
          method: "get",
          params: { biz_uid: this.$route.query.target },
        }).then((res) => {
          if (res.result == 0) {
            this.realname = res.data.realname;
            this.avatar = res.data.avatar;
            resolve();
            //根据时间升序
            res.data.messages &&
              (this.record = res.data.messages.sort(
                (a, b) => a.createTime - b.createTime
              ));
            this.formatRecord();
          }
        });
      });
    },
    //判断是否显示时间
    formatRecord() {
      let tempRecord = this.record;
      this.record = [];
      let compareTime = 0;
      this.record = tempRecord.map((item, index) => {
        if (item.createTime) {
          //时间间隔不超过三分钟则不显示时间（createTime=0）
          if (item.createTime - compareTime < 1000 * 60 * 3) {
            compareTime = item.createTime;
            return { ...item, createTime: 0 };
          }
          compareTime = item.createTime;
        }
        return item;
      });
    },
    // getuserInfo() {
    //       this.$http.get("/m/members/api/getInfo").then(e => {
    //             if (e.result == 0) {
    //                   this.uid = e.data.uid;
    //                   this.userImgUrl = e.data.avatar;
    //                   this.userImgUrl_local = e.data.avatar;
    //                   if (e.data.avatar && !e.data.avatar.startsWith("http")) {
    //                         this.userImgUrl = this.imgServerAdd + e.data.avatar;
    //                         this.userImgUrl_local = this.imgServerAdd + e.data.avatar;
    //                   } else if (!e.data.avatar) {
    //                         this.userImgUrl = this.imgServerAdd + fixAvatar;
    //                         this.userImgUrl_local = this.fixAvatar;
    //                   }
    //             }
    //       });
    // },
    //监听$socket和message
    listenMsg() {
      let timer = null;
      timer = setInterval(() => {
        if (this.$socket) {
          clearInterval(timer);
          this.$socket.onmessage = (res) => {
            this.record.push(JSON.parse(res.data));
            this.formatRecord();
          };
        }
      }, 300);
    },
    afterRead(e) {
      var form = new FormData();
      form.append("file", e.file);
      this.$http.post("/test", { data: {} }).then((res) => {
        console.log(res);
      });
    },
    //发消息
    handleSend() {
      if (this.msgContent) {
        try {
          this.$socket.send(
            JSON.stringify({
              target: this.$route.query.target,
              content: this.msgContent,
              uid: this.uid,
              type: 0, // 0 用户 1是客服
              img: this.userImgUrl,
            })
          );
          this.record.push({
            type: 0,
            content: this.msgContent,
            createTime: new Date().getTime(),
            img: this.userImgUrl,
          });
          this.formatRecord();
          this.msgContent = "";
        } catch (err) {
          console.log(err);
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
    back() {
      this.$router.back();
    },
  },
  components: {
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [PullRefresh.name]: PullRefresh,
  },
};
</script>

<style>
.van-nav-bar__left > .van-icon {
  color: #5f656b !important;
  font-size: 20px !important;
}

.customerService {
  height: 100vh;
}
.ignore-recordArea {
  padding-top: 16px;
  box-sizing: border-box;
  height: calc(100vh - 46px - 15vw);
  background-color: rgb(243, 243, 243);
  overflow-y: scroll;
}
.bottomInp {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: rgb(240, 240, 240);
}
.inpLine {
  display: flex;
  align-items: flex-end;
  padding: 2.5vw 0;
}
.inp {
  display: flex;
  align-items: flex-end;
  width: calc(100vw - 36px - 2.8vw);
  border-radius: 4vw;
  background-color: #ffffff;
  margin: 0 1.4vw;
  box-sizing: border-box;
}
.inp > .emoji {
  display: flex;
  align-items: center;
  width: 7.73vw;
  height: 7.73vw;
  font-size: 45px;
  margin-right: 6px;
  margin-bottom: 1vw;
  background-image: url(../../../static/img/emoji.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.inp > .myInput {
  flex: 1;
  border: none;
  border-radius: 4vw;
  background-color: #fff;
  height: auto;
  min-height: 7vw;
  max-height: 27vw;
  margin: 1vw;
  outline: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  resize: none;
}
.addContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.send {
  /* height: 60%; */
  margin-right: 10px;
}
.timeLine {
  font-size: 25px;
  color: #8a8a8a;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 26px;
}
.their,
.mine {
  padding: 0 12px;
  margin-bottom: 45px;
}
.their {
  display: flex;
  align-items: flex-start;
  padding-right: 20%;
}
.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.their > .avatar {
  background-color: skyblue;
}
.theirMsg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 12px;
  flex-wrap: wrap;
}
.theirMsg > .nickname {
  height: 45px;
  font-size: 22px;
}
.msgBox {
  border-radius: 20px;
  font-size: 30px;
  padding: 18px;
  min-height: 3px;
  text-align: left;
  word-break: break-word;
}
.theirMsg > .uid {
  margin-bottom: 6px;
}
.theirMsg > .msgBox {
  background-color: #fff;
}
.mine {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-left: 20%;
}
.myMsg {
  padding-right: 12px;
}
.myMsg > .msgBox {
  background-color: #ffc559;
  min-width: 5vw;
  min-height: 2.6vh;
}
.mine > .avatar {
  background-color: rgb(179, 179, 179);
}
.addOptions {
  height: 42vh;
  background-color: #f0f0f0;
  padding: 11vw 7vw;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-top: 1px #ccc solid;
}
.addItem {
  width: 25%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  position: relative;
}
.itemIconOuter {
  width: 72%;
  padding-top: 72%;
  background-color: #fff;
  position: relative;
  border-radius: 7%;
}
.itemIconOuter > div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.addItem > div:nth-child(2) {
  margin-top: 6px;
}
.uploadImg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  margin-top: 0 !important;
  opacity: 0;
}
.rightFunctionArea {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 9vw;
}
</style>
