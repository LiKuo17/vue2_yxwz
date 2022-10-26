<template>
  <div class="chatList">
    <header>
      <div class="header_Box">
        <van-sticky>
          <van-nav-bar title="消息" left-arrow @click-left="back">
            <template #left>
              <van-icon name="arrow-left" size="20" color="#5f656b" />
            </template>
          </van-nav-bar>
        </van-sticky>
      </div>
    </header>
    <div class="noMsg" v-if="!msgList.length">暂无消息~</div>
    <div class="msgList-ignore">
      <div v-if="msgList.length">
        <div
          class="msgItem"
          v-for="(item, index) in msgList"
          :key="index"
          @click="handleToCus(item)"
        >
          <van-swipe-cell @open="open" @close="close">
            <div class="msgItemContent">
              <div class="avatorOuter">
                <div
                  class="avator"
                  :style="{
                    backgroundImage: `url(${
                      item.avatar ? item.avatar : fixedAvatar
                    })`,
                  }"
                ></div>
              </div>
              <div class="centerContent">
                <div class="nickname">
                  <div class="nicknameInner">{{ item.realname }}</div>
                  <div class="rightTime">
                    {{ item.last_message_time | lastMessageTime }}
                  </div>
                </div>
                <div class="msg_pre">
                  <div>
                    {{ item.msgList.length ? item.msgList[0].content : "" }}
                  </div>
                  <div v-if="item.msgState" class="notRead"></div>
                </div>
              </div>
            </div>
            <template #right>
              <div class="btn1" @click="haveRead(item, index)">标为已读</div>
              <div class="btn2" @click="deleteItem(item)">删除</div>
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky, NavBar, SwipeCell, Button, Cell, Icon } from "vant";
import _config from "../../assets/js/config";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  filters: {
    lastMessageTime(val) {
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
        return new Date(val).toLocaleDateString();
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      msgList: [],
      uid: 0,
      openStaus: false,
      fixedAvatar: "../../static/img/test_userx.png",
    };
  },
  computed: {
    ...mapGetters(["msgSessions"]),
  },
  async created() {
    // await this.getUid();
    await this.getSessions();
    this.listenMsg();
    // this.$connectSocket();
  },
  methods: {
    ...mapMutations(["changeMsgSessions"]),
    //标记为已读
    haveRead(item) {
      let msgSessions = this.msgSessions;
      msgSessions.forEach((item) => {
        this.msgList.forEach((item1) => {
          if (item.uid == item1.msgList[0].uid) {
            item.msgState = false;
          }
        });
      });
      this.changeMsgSessions(msgSessions);
      this.getSessions();
    },
    //监听$socket和message
    listenMsg() {
      let timer = null;
      timer = setInterval(() => {
        if (this.$socket) {
          clearInterval(timer);
          this.$socket.onmessage = async (res) => {
            await this.getSessions();
            this.$forceUpdate();
          };
        }
      }, 300);
    },
    //获取uid，供获取会话列表使用
    // getUid() {
    //   return new Promise((resovle) => {
    //     this.$http.get("/m/members/api/getInfo").then((e) => {
    //       if (e.result == 0) {
    //         resovle();
    //         this.uid = e.data.uid;
    //       }
    //     });
    //   });
    // },
    //获取会话列表
    getSessions() {
      return new Promise((resolve) => {
        this.$http({
          url: "/m/websocket/api/getSessions",
          method: "post",
        }).then((res) => {
          if (res.result == 0) {
            this.msgList = res.data;
            this.msgList.forEach((item) => {
              this.msgSessions.forEach((item1) => {
                if (
                  item.msgList[0].uid == item1.uid &&
                  item1.msgState == true
                ) {
                  item.msgState = true;
                }
              });
            });
            this.$forceUpdate();
            resolve();
          }
        });
      });
    },
    //点击会话
    handleToCus(item) {
      this.haveRead(item);
      if (!this.openStaus) {
        this.$router.push(
          `/customerService?id=${item.id}&target=${item.biz_uid}&realname=${item.realname}`
        );
      }
    },
    //删除会话
    deleteItem(item) {
      this.$http({
        url: "/m/websocket/api/delete",
        method: "get",
        params: { id: item.id },
      }).then((res) => {
        if (res.result == 0) {
          this.getSessions();
        }
      });
    },
    back() {
      this.$router.back();
    },
    open() {
      this.openStaus = true;
    },
    close() {
      setTimeout(() => {
        this.openStaus = false;
      });
    },
  },
};
</script>

<style scoped>
.chatList {
  background-color: #fff;
}
.noMsg {
  width: 100%;
  text-align: center;
  margin-top: 2vh;
  color: #5f5f5f;
}
.msgList-ignore {
  height: calc(100vh - 46px);
  overflow-y: scroll;
}
.msgItem {
  height: 8vh;
  border-bottom: 1px #ccc solid;
  background-color: #fff;
  background: linear-gradient(to bottom, white, rgba(214, 214, 214, 0.1));
}
.msgItem >>> .van-swipe-cell__right {
  display: flex;
}
.btn1,
.btn2 {
  height: 100%;
  width: 18vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 28px;
}
.btn1 {
  background-color: #ffa331;
}
.btn2 {
  background-color: red;
}
.msgItemContent {
  display: flex;
  justify-content: space-evenly;
}
.avatorOuter {
  width: 8vh;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.8vh;
}
.avator {
  width: calc(8vh * 0.8);
  height: calc(8vh * 0.8);
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.centerContent {
  padding-right: 4.8vw;
  box-sizing: border-box;
  width: calc(100% - 8vh - 0.8vh * 2);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.nickname {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 37px;
}
.nicknameInner {
  font-size: 34px;
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.msg_pre {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 6px;
  font-size: 26px;
  color: #808080;
}
/* 嵌套一个div解决省略号无效的问题 */
.msg_pre > div:first-child {
  text-align: left;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.notRead {
  width: 2vw;
  height: 2vw;
  background-color: red;
  border-radius: 50%;
}
.rightTime {
  font-size: 26px;
  color: #808080;
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
