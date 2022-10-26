<template>
  <div class="personalInformation">
    <div class="infoBox">
      <div class="info_title">基本信息</div>
      <van-cell-group>
        <div class="PicBox">
          <div class="PicBox-left">头像</div>
          <div class="PicBox-right">
            <van-uploader :after-read="afterRead" name="avatar">
              <div class="img_Box">
                <img
                  :src="userObj.avatar"
                  onerror="this.src='https://b.yzcdn.cn/showcase/membercenter/2018/08/06/default_avatar@2x.png';this.onerror=null;console.log(this)"
                />
              </div>
            </van-uploader>
          </div>
        </div>
        <van-field
          label="手机号"
          :value="userObj.phone"
          @click="editUsnAndPhone('phone')"
          right-icon="arrow"
          readonly
          right
        ></van-field>
        <van-field
          class="firstName"
          label="姓名"
          @click="editUsnAndPhone('username')"
          :value="userObj.realName"
          right-icon="arrow"
          readonly
        ></van-field>

        <!-- 弹框 -->
        <van-dialog
          v-model="show"
          title="修改姓名"
          @confirm="confirm('username')"
          show-cancel-button
        >
          <input type="text" class="inputName" ref="userName" />
        </van-dialog>
        <van-dialog
          v-model="isshow"
          title="修改手机号"
          @confirm="confirm('phone')"
          show-cancel-button
        >
          <input type="text" class="inputPhone" ref="phone" />
        </van-dialog>
        <van-field
          class="sex"
          label="性别"
          @click="showSexChoose"
          :value="userObj.sex == 0 ? '男' : '女'"
          right-icon="arrow"
          readonly
        ></van-field>
        <van-field
          class="address"
          label="收货地址"
          @click="chooseAddress"
          value=""
          right-icon="arrow"
          readonly
        ></van-field>
      </van-cell-group>
      <van-button round block type="warning" @click="editUserInfo"
        >保存</van-button
      >
      <van-action-sheet
        v-model="showSex"
        @select="onSelect"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
      />
    </div>
  </div>
</template>
<script>
import { getData, postData, $uploadImg } from "../../../api";
import config from "../../../assets/js/config";
export default {
  components: {},
  data() {
    return {
      sexValue: "男",
      userNames: "请填写",
      show: false,
      showSex: false,
      showTime: false,
      actions: [{ name: "男" }, { name: "女" }],
      phone: null,
      file: null,
      isshow: false,
      userObj: {
        avatar: null,
        phone: null,
        realName: null,
        sex: null,
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    // 获取个人信息
    async getUserInfo() {
      const result = await getData("getUserInfo");
      this.userObj = result.data;
      console.log(this.userObj, "result");
    },
    // 修改个人信息
    async editUserInfo() {
      if (this.userObj.phone && !/^1[0-9]{10}$/.test(this.userObj.phone)) {
        return this.$toast("手机号格式不符");
      } else {
        const result = await postData("editUserInfo", this.userObj);
        if (result.code === 0) {
          this.$toast.success("修改个人信息成功");
          this.getUserInfo();
        } else {
          this.$toast.fail("修改个人信息失败");
        }
      }
    },
    // 选中性别
    onSelect(item) {
      this.userObj.sex = item.name == "男" ? "0" : "1";
    },
    // 收集修改姓名和修改手机号码的值
    confirm(status) {
      switch (status) {
        case "username":
          console.log(this.$refs.userName.value);
          this.userObj.realName = this.$refs.userName.value;
          break;

        case "phone":
          console.log(this.$refs.phone.value);
          this.userObj.phone = this.$refs.phone.value;
          break;
      }
    },
    // 弹框显示隐藏
    editUsnAndPhone(status) {
      switch (status) {
        case "username":
          this.show = true;
          break;

        case "phone":
          this.isshow = true;
          break;
      }
    },
    onCancel() {
      Toast("取消");
    },
    //选择性别
    showSexChoose() {
      this.showSex = true;
    },

    //收货地址
    chooseAddress() {
      this.$router.push("/address");
    },
    // 上传图片
    async afterRead(file, detail) {
      //   this.userObj.avatar
      console.log(file, "file");

      const result = await $uploadImg("uploadImg", file.file);
      if (result.code === 200) {
        this.$toast.success("上传成功");
        this.userObj.avatar = config.fileServerAddress + result.fileName;
      }
      console.log(result, "result");
    },
  },
};
</script>
<style lang="scss" scoped>
.info_title {
  height: 7.333vw;
  line-height: 7.333vw;
  padding: 2vw 4vw;
  color: #999;
  font-size: 3.67vw;
  text-align: left;
}
.headPic /deep/ .van-field__control {
  display: none;
  color: #646566;
}
/deep/ .van-icon {
  font-size: 28px;
  opacity: 0.5;
}
.firstName /deep/ .van-icon {
  font-size: 14px;
  color: #333;
}
/deep/ .van-dialog /deep/ .van-popup {
  width: 85%;
  /* height: 171px; */
  border-radius: 10px;
}

/deep/ .van-dialog {
  height: 171px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
}
/deep/ .van-dialog__header {
  padding-top: 10px;
}
.inputName {
  width: 80%;
  border: 1px solid #e5e5e5;
  height: 8.533vw;
}
.sex /deep/ .van-icon,
.birthday /deep/ .van-icon,
.area /deep/ .van-icon,
.address /deep/ .van-icon {
  font-size: 14px;
  opacity: 0.5;
}
.PicBox {
  width: 100%;
  height: 90px;
  display: flex;
  /deep/ .van-uploader {
    display: flex;
    margin-left: 20px;
    padding-top: 5px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .PicBox-left {
    width: 200px;
    height: 100%;
    float: left;
    line-height: 80px;
    font-size: 28px;
    text-indent: -3em;
  }
  .PicBox-right {
    flex: 1;
    height: 100%;
  }
  .img_Box {
    width: 70px;
    vertical-align: middle;
    height: 70px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 28px;
  }
}
/deep/ .van-icon {
  font-size: 14px;
  color: #333;
}
</style>
