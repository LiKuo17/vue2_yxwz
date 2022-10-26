<template>
  <!--  @mousewheel = "mouseWheel" -->

  <div class="ccbUser" id="ccbUser">
    <!-- <transition name="fade">
      <div class="userInfo" v-if="showInfo">
        <div class="phone">
          <span>156****7958</span>
        </div>
        <span class="exit" @click="exit">退出</span>
      </div>
    </transition> -->

    <van-tabs>
      <div style="height: 10vh"></div>
      <van-tab title="我的权益">
        <template #title>
          <div class="rights_content">
            <div class="tempBox" style="display: flex; flex-direction: row">
              <div class="top">
                <div class="topImg topImgActive">
                  <img
                    style="width: 85%"
                    src="../../assets/img/我的权益1.svg"
                    class="icon-pic"
                  />
                </div>
              </div>
              <div class="bottom">我的权益</div>
            </div>
            <div class="reback" @click="onBack">
              <van-icon name="arrow-left" size="20px" />
              <!-- <span class="back">返回</span> -->
            </div>
          </div>
        </template>
        <!-- <template>
            <div>
                
            </div>
        </template> -->
      </van-tab>
      <div class="benefit-info-wrapper">
        <div class="benefit-info">
          <div class="link-item__name">
            <div class="link-item__cell" v-show="showTips" v-if="false">
              <div style="color: rgb(133, 133, 133); font-size: 1rem">
                您没有购买任何权益
              </div>
              <!-- <div class="hidd">
                  失效的权益已被隐藏，<span
                    style="color: rgb(9, 182, 242)"
                    @click="showRights"
                    >点击查看</span>
                </div> -->
            </div>
            <div class="box">
              <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/543B47EFCB7B586A.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <div class="showTitle_times">
                        <h2 class="showTitle_title">
                          <span class="text"
                            >159元高端酒店经典下午茶双免1次</span
                          >
                        </h2>
                      </div>
                      <div class="cancel">
                        <span class="appointment">有效时间</span>
                        <span>2022/5/30</span>
                      </div>
                      <div class="yuyue">
                        <div>x1</div>
                        <span>已预约</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/D29713AD0325BDDD.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <div class="showTitle_times">
                        <h2 class="showTitle_title">
                          <span class="text">329元高端酒店下午茶双免1次</span>
                        </h2>
                      </div>
                      <div class="cancel">
                        <span class="appointment">有效时间</span>
                        <span>2022/11/11</span>
                      </div>
                      <div class="yuyue">
                        <div>x1</div>
                        <span>已预约</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/75BD5453EB67FFB6.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <div class="showTitle_times">
                        <h2 class="showTitle_title">
                          <span class="text">449元高端酒店自助餐双免1次</span>
                        </h2>
                      </div>
                      <div class="cancel">
                        <span class="appointment">有效时间</span>
                        <span>2022/8/11</span>
                      </div>
                      <div class="yuyue">
                        <div>x1</div>
                        <span>已预约</span>
                      </div>
                    </div>
                  </div>
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
                      <div class="showTitle_times">
                        <h2 class="showTitle_title">
                          <span class="text"
                            >365元高端酒店经典下午茶双免1次</span
                          >
                        </h2>
                      </div>
                      <div class="cancel">
                        <span class="appointment">有效时间</span>
                        <span>2022/6/22</span>
                      </div>
                      <div class="yuyue">
                        <div>x1</div>
                        <span>已预约</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/D29713AD0325BDDD.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <h2>329元高端酒店下午茶双免1次</h2>
                      <span class="times">x1</span>
                    </div>
                  </div>
                  <div class="cancel"><span>已预约</span></div>
                </div>
              </div> -->

              <!-- <div class="showShop" v-show="toggleRights">
                <div class="showContent">
                  <div class="showPic">
                    <img
                      src="https://cdn.colourfulchina.com/2021/12/23/cmall/pic/75BD5453EB67FFB6.png"
                      alt=""
                    />
                    <div class="showTitle">
                      <h2>449元高端酒店自助餐双免1次</h2>
                      <span class="times">x1</span>
                    </div>
                  </div>
                  <div class="cancel"><span>已预约</span></div>
                </div>
              </div> -->
            </div>
          </div>
          <!---->
        </div>
      </div>

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
    <index class="index_rights"></index>
    <div style="height: 5rem"></div>
  </div>
</template>

<script>
import config from "@/assets/js/config.js";
import index from "../index.vue";
import { getData } from "../../api";
const { customerServiceAddress } = config;
export default {
  components: { index },
  data() {
    return {
      toggleIndex: 1,
      toggleRights: true,
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
    onBack() {
      window.history.back();
    },
    //  mouseWheel (e) {
    //   if (e.wheelDelta || e.detail) {
    //     if (e.wheelDelta > 0 || e.detail < 0) {     //当鼠标滚轮向上滚动时
    //       console.log("向上")
    //       this.showInfo = true;
    //       setTimeout(() => {
    //         this.showInfo = false;
    //       }, 2000);
    //     }
    //     if (e.wheelDelta < 0 || e.detail > 0) {     //当鼠标滚轮向下滚动时
    //       console.log("向下")

    //     }
    //   }
    // },
    showRights() {
      document.getElementById("ccbUser").removeAttribute("style");
      console.log("11111111", document.getElementById("ccbUser").style.height);
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
    // async getBuffetList(){
    //   const result = await getData('')
    // }
  },
};
</script>

<style lang="scss" scoped>
.tempBox {
  justify-content: space-around;
  align-items: center;
  font-size: 1.05rem;
}
.back {
  margin: 1px;
}

.reback {
  position: absolute;
  left: 3vw;
  top: 36%;
  font-size: 1.05rem;
  display: flex;
  /* color: #1989fa; */
  color: #000;
  align-items: center;
}

.index_rights {
  height: 0;
}
.ccbUser {
  height: 100vh;
  overflow: scroll;
  /* background-color: red; */
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
  position: fixed;
  width: 100%;
  /* position: relative; */
  height: 8vh;
  margin-bottom: 10px;
  box-shadow: 0 0px 3px #ccc;
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
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.showShop {
  width: 90%;
  /* margin-left: 5%; */
  margin: 3vw 35px;
  border-radius: 15px;
  box-shadow: 0 0.5px 10px #cec7c7;
  background-color: white;
  .showContent {
    .showPic {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        /* width: 90%; */
        width: 50%;
        /* border-top-left-radius: 15px; */
        /* border-top-right-radius: 15px; */
      }
      .showTitle {
        width: 47%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-right: 10px;
        /* padding: 4vw 0px; */
        /* border-bottom: 1px solid rgba(230, 230, 230, 0.5); */
        .showTitle_times {
          width: 100%;
          align-items: center;
          /* display: flex; */
          justify-content: space-between;
        }
        h2 {
          margin: 0px;
          padding: 0px;
          font-size: 1.8vw;
          font-weight: 700;
        }
      }
    }
    .cancel {
      width: 100%;
      font-size: 3.6vw;
      line-height: 4vh;
      /* text-align: right; */
      /* color: blue; */
      display: flex;
      justify-content: space-between;
      span {
        /* padding-right: 5vw; */
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
.times {
  color: red;
}
.date {
  display: flex;
  flex-direction: column;
}
.showTitle_title {
  display: flex;
  height: 13vw;
  /* margin-bottom: 20px !important; */
}
.text {
  display: inline-block;
  font-size: 3.67vw;
  text-align: left;
  padding: 10px 0;
  /* height: 8vw; */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
.yuyue {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.cancel,
.yuyue {
  line-height: 10vw;
}
.appointment {
  color: #000;
}
</style>
