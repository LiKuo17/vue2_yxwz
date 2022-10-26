<template>
  <div>
    <header>
      <van-sticky>
        <van-nav-bar title="意见反馈" left-arrow @click-left="$back">
          <template #left>
            <van-icon name="arrow-left" size="20" color="#5f656b" />
          </template>
        </van-nav-bar>
      </van-sticky>
    </header>
    <div class="dscArea">
      <div class="dscTitle">请描述大农商商城使用问题</div>
      <textarea
        maxlength="300"
        ref="dscTextArea"
        class="dscTextArea"
        placeholder="某个功能无法使用，页面白屏、卡顿、闪退，有其他产品意见（5个字以上 ,300字以内）"
        v-model="questionDsc"
      ></textarea>
      <div class="commitBtn"><div @click="submit">提交</div></div>
    </div>
  </div>
</template>

<script>
import { Sticky, NavBar, Icon, Button, Toast } from "vant";
export default {
  components: {
    [Sticky.name]: Sticky,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  data() {
    return {
      questionDsc: "",
    };
  },
  methods: {
    submit() {
      if (this.questionDsc) {
        this.$http
          .post("/m/feedback/api/add", {
            content: this.questionDsc,
          })
          .then((res) => {
            if (res.result == 0) {
              this.questionDsc = "";
              Toast.success("提交成功，感谢您的反馈！");
            } else {
              Toast(res.msg);
            }
          });
      }else{
        Toast("请输入反馈内容")
      }
    },
  },
};
</script>

<style>
.dscArea {
  margin: 2.4vw 2.4vw 0 2.4vw;
  padding: 4vw 4vw 2vw 4vw;
  background-color: #fff;
  border-radius: 12px;
  font-size: 4vw;
  display: flex;
  flex-direction: column;
}
.dscArea > div {
  display: flex;
}
.dscTitle {
  margin-bottom: 2.8vw;
}
.dscTextArea {
  border: none;
  resize: none;
  min-height: 32vw;
  font-size: 3vw;
  margin-bottom: 2.8vw;
}
.commitBtn {
  justify-content: flex-end;
}
.commitBtn > div {
  font-size: 3vw;
  color: #fff;
  padding: 0.7vw 3.8vw;
  border-radius: 2.8vw;
  background-color: rgb(41, 190, 129);
}
</style>
