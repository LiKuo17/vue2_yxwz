<template>
  <div class="mustRead">
    <div class="khbd">
      <img :src="masterMap" alt="" />
      <div
        class="khbd-item-one"
        @click="
          $router.push({ path: '/yearcardDetail', query: { card: 'halfYear' } })
        "
      ></div>
      <div
        class="khbd-item-two"
        @click="
          $router.push({ path: '/yearcardDetail', query: { card: 'allYear' } })
        "
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "openYearCard",
  data() {
    return {
      masterMap: require("@/assets/img/openYearCard.jpg"),
    };
  },
};
</script>
<style scoped>
.mustRead {
  background-color: white;
  margin-bottom: 100px;
}
.khbd {
  display: flex;
  width: 100%;
  /* height: calc(100%-10vh); */
  /* margin-bottom: 60px; */
}
.khbd > img {
  width: 100%;
  height: 100%;
}
.khbd-item-one {
  width: 90vw;
  height: 190px;
  position: absolute;
  top: 200px;
  left: 5vw;
  right: 5vw;
}
.khbd-item-two {
  width: 90vw;
  height: 190px;
  position: absolute;
  top: 450px;
  left: 5vw;
  right: 5vw;
}
</style>