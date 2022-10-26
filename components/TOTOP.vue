<template>
      <div class="toTop" :class="{ toTopHide: toTopHide }" @click="toTop"></div>
</template>

<script>
export default {
      props: {
            //用ref无法识别
            listId: {
                  type: String,
                  require: true,
            },
      },
      data() {
            return {
                  touchstartY: 0,
                  touchendY: 0,
                  toTopHide: true,
                  listDom: {},
            };
      },
      mounted() {
            this.$nextTick(() => {
                  this.listDom = document.getElementById(this.listId);
                  this.listDom.addEventListener("touchstart", e => {
                        this.touchstartY = e.touches[0].pageY;
                  });
                  this.listDom.addEventListener("touchmove", e => {
                        this.touchendY = e.touches[0].pageY;
                  });
            });
      },
      methods: {
            toTop() {
                  let nowScrollTop = this.listDom.scrollTop;
                  let timer = setInterval(() => {
                        if (this.listDom.scrollTop > 0) {
                              this.listDom.scrollTop -= 0.06 * nowScrollTop;
                        } else {
                              clearInterval(timer);
                              this.toTopHide = true;
                        }
                  }, 16);
            },
      },
      computed: {
            touchdif() {
                  let touchdif = this.touchendY - this.touchstartY;
                  if (Math.abs(touchdif) > 50) {
                        return touchdif;
                  } else {
                        return 0;
                  }
            },
      },
      watch: {
            touchdif(newV) {
                  if (newV < 0) {
                        this.toTopHide = true;
                  } else if (newV > 0) {
                        this.toTopHide = false;
                  }
            },
      },
};
</script>

<style scoped>
.toTop {
      background-color: rgba(238, 238, 238, 0.2);
      bottom: 6vw;
      right: 6vw;
      width: 10vw;
      height: 10vw;
      border-radius: 50%;
      position: fixed;
      box-shadow: 0 0 4px 6px rgba(138, 138, 138, 0.2);
      transform: translateX(0);
      opacity: 1;
      transition: all 0.4s ease;
}
.toTop::after {
      margin: 50% auto;
      transform: translateY(-40%);
      display: block;
      content: "";
      width: calc(0.45 * 10vw);
      height: calc(0.45 * 10vw);
      background-image: url(/static/img/toTop.png);
      background-size: cover;
      background-position: center;
}
.toTopHide {
      opacity: 0;
      transform: translateX(20vw);
      transition: all 0.4s ease;
}
</style>
