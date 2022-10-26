<template>
  <div class="redirectToIntegral">
    <div class="loading">
      <van-loading v-if="loading" class="vanLoading" size="30px"
        ><span>加载中...</span></van-loading
      >
      <div v-else class="ignore-loadingFailed">
        加载失败,3S后自动返回...<span @click="jumpBack">立即返回</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Loading, Toast } from "vant";
import _config from "@/assets/js/config";
export default {
  components: {
    [Loading.name]: Loading,
  },
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    loading(newV) {
      if (!newV) {
        this.jumpBack();
      }
    },
  },
  created() {
    this.toIntegral();
  },
  methods: {
    jumpBack() {
      let timer = null;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isApp()
          .then(() => {
            //执行app返回
            nativeGoBack();
          })
          .catch((err) => {
            window.history.back();
          });
      }, 3000);
    },
    toIntegral() {
      this.$http
        .post("/m/jifen/api/synchronizedPoint")
        .then((res) => {
          if (res.result == 0) {
            this.$http.post("/m/jifen/api/postToken").then((res) => {
              if (res.result == 0) {
                window.location = `${_config.integralMallAddress}model1?token=${res.data}`;
              } else {
                this.jumpBack();
              }
            });
          } else {
            this.jumpBack();
          }
        })
        .catch((err) => {
          this.jumpBack();
        });
    },
  },
};
</script>

<style scoped>
.redirectToIntegral {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #fff;
}
.loading {
  transform: translateY(-20vh);
}
.vanLoading > span {
  font-size: 16px;
}
.ignore-loadingFailed {
  font-size: 16px;
  color: #969799;
}
.ignore-loadingFailed > span {
  text-decoration: underline;
  font-size: 14px;
  margin-left: 6px;
  color: #2864db;
}
</style>