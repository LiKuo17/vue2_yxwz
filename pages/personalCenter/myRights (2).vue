<template>
  <div class="ccbUser" id="ccbUser" @mousewheel = "mouseWheel">
    <transition name="fade">
      <div class="userInfo" v-if="showInfo">
        <div class="phone">
          <span>156****7958</span>
        </div>
        <span class="exit" @click="exit">退出</span>
      </div>
    </transition>
    <van-tabs>
      <van-tab title="我的权益">
        <template #title>
          <div class="tempBox" style="display: flex; flex-direction: column">
            <div class="top">
              <div class="topImg topImgActive">
                <img
                  style="width: 50%"
                  src="../../assets/img/我的权益1.svg"
                  class="icon-pic"
                />
              </div>
            </div>
            <div class="bottom">我的权益</div>
          </div>
        </template>
        <div class="benefit-info-wrapper">
          <div class="benefit-info">
            <div class="link-item__name">
              <div class="link-item__cell" v-show="showTips">
                <div style="color: rgb(133, 133, 133); font-size: 0.6rem">
                  您没有购买任何权益
                </div>
                <div class="hidd">
                  失效的权益已被隐藏，<span
                    style="color: rgb(9, 182, 242)"
                    @click="showRights"
                    >点击查看</span
                  >
                </div>
              </div>
              <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/543B47EFCB7B586A.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <h2>159元高端酒店经典下午茶双免1次</h2>
                    </div>
                  </div>
                  <div class="cancel"><span>已取消</span></div>
                </div>
              </div>
              <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/543B47EFCB7B586A.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <h2>159元高端酒店经典下午茶双免1次</h2>
                    </div>
                  </div>
                  <div class="cancel"><span>已取消</span></div>
                </div>
              </div>
            </div>
            <!---->
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="我的订单">
        <template #title>
          <div
            class="tempBox"
            @click="myOrder()"
            style="display: flex; flex-direction: column"
          >
            <div class="top">
              <div class="topImg">
                <img
                  style="width: 44%"
                  src="../../assets/img/我的订单_2.svg"
                  class="icon-pic"
                />
              </div>
            </div>
            <div class="bottom">我的订单</div>
          </div>
        </template>
        <div class="benefit-info-wrapper">
          <div class="benefit-info">
            <div class="link-item__name">
              <div class="link-item__cell">
                <div>
                  <div class="benefit_title">288起酒店</div>
                  <p class="benefit_desc">288起住星级酒店的权益</p>
                </div>
              </div>
            </div>
            <div class="link-item__name">
              <div class="link-item__cell">
                <div>
                  <div class="benefit_title">使用规则</div>
                  <p class="benefit_desc">权益卡有效期内，可使用6次288起酒店权益</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab> -->
    </van-tabs>
    <div style="height: 5rem"></div>
  </div>
</template>

<script>
import config from "@/assets/js/config.js";
const { customerServiceAddress } = config;
export default {
  data() {
    return {
      toggleIndex: 1,
      toggleRights: false,
      showTips: true,
      showInfo: true,
    };
  },
  created() {
    console.log(22222222222);
    setTimeout(() => {
      this.showInfo = false;
    }, 2000);
  },
  mounted() {
    // window.addEventListener(this.menu, true) || window.addEventListener(this.menu, false);
  },

  methods: {
     mouseWheel (e) {
      if (e.wheelDelta || e.detail) {
        if (e.wheelDelta > 0 || e.detail < 0) {     //当鼠标滚轮向上滚动时
          console.log("向上")
          this.showInfo = true;
          setTimeout(() => {
            this.showInfo = false;
          }, 2000);
        }
        if (e.wheelDelta < 0 || e.detail > 0) {     //当鼠标滚轮向下滚动时
          console.log("向下")
          
        }
      }
    },
    showRights() {
      (this.toggleRights = true), (this.showTips = false);
    },
    myOrder() {
      console.log(111111111111);
      this.$router.push("/ccbOrder");
    },
    exit() {
      this.$router.push("/authlogin");
    },
    // handleCus() {
    //       this.$toast.loading({ message: "跳转中...", duration: 0 });
    //       if(this.userInfo){
    //             this.$toast.clear();
    //             location = `${customerServiceAddress}?openid=${this.userInfo.uid}&mobile=${this.userInfo.mobile}&nickname=建行-${this.userInfo.username}`;
    //       }else {
    //             this.$toast.fail("请求客服失败");
    //       }
    // },
    // getUserInfo() {
    //       this.$http.get("/m/members/api/getInfo").then(e => {
    //             if (e.result == 0) {
    //                   this.userInfo = e.data;
    //             }
    //       });
    // },
    // handleToOrderList(index) {
    //       let query = index == undefined ? {} : { type: index };
    //       this.$router.push({ path: "/myOrder", query });
    // },
  },
};
</script>

<style lang="scss" scoped>
.ccbUser {
  .personalTop {
    background-color: #fff;
  }
  /* .userCover {
            width: 100vw;
            height: 53vw;
            .messageIcon {
                  right: 5vw;
                  top: 5vw;
            }
            .avatarOuter {
                  width: 18vw;
                  height: 18vw;
                  border: 6px solid #fff;
                  background-size: cover;
            }
      }
      .orderTitle {
            border-bottom: 1px solid rgb(230, 230, 230);
            > span:last-child {
                  color: #979da2;
            }
      }
      .orderIcons {
            height: 30vw;
            padding: 0 7vw;
      }
      .orderIcon {
            width: 20vw;
            > span {
                  white-space: nowrap;
            }
      } */
  .personalTop {
    display: flex;
    justify-content: space-around;
    /* padding: 1rem; */
    .personalTop-item {
      width: 160px;
      height: 160px;
      display: flex;
      flex-direction: column;
      vertical-align: center;
      justify-content: center;
      align-items: center;
      .personalTop-item_icon {
        width: 6vw;
        height: 3vh;
      }
      .my-rights {
        font-size: 14px;
        margin-top: 5px;
      }
      .my-order {
        font-size: 14px;
        margin-top: 8px;
      }
      .my-coupon {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
  .icon1 {
    background: url("../../assets/img/我的权益1.svg") 1px -4px;
  }
  .icon2 {
    background: url("../../assets/img/我的订单_2.svg") 1px -0.7vw;
  }
  .icon3 {
    background: url("../../assets/img/我的优惠券_2.svg");
  }
}
/deep/ .van-tabs__wrap {
  height: 10vh;
}
/deep/ .van-tabs__line {
  display: none;
}
.hidd {
  margin-top: 4vh;
  margin-bottom: 6vh;
  color: rgb(133, 133, 133);
  font-size: 0.95rem;
}
.showShop {
  /* width: 90%; */
  /* margin-left: 5%; */
  margin: 35px;
  border-radius: 15px;
  box-shadow: 0 0.5px 10px #cec7c7;
  .showContent {
    .showPic {
      img {
        /* width: 90%; */
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
      }
      .showTitle {
        padding: 4vw 0px;
        border-bottom: 1px solid rgba(230, 230, 230, 0.5);
        h2 {
          margin: 0px;
          padding: 0px;
          font-size: 4vw;
          font-weight: 700;
        }
      }
    }
    .cancel {
      font-size: 3.6vw;
      line-height: 6vh;
      text-align: right;
      span {
        padding-right: 5vw;
      }
    }
    .showContent {
    }
  }
}
.userInfo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  vertical-align: middle;
  font-size: 13px;
  color: white;
  padding-right: 10vw;
  height: 6.4vh;
  line-height: 6.4vh;
  background: linear-gradient(127deg, #3ac9fc, #1b99f7);
  .phone {
    padding-right: 30px;
  }
  .exit {
    border: 1px solid white;
    height: 3.2vh;
    line-height: 3.2vh;
    width: 10vw;
    border-radius: 15px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s;
}
.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>
