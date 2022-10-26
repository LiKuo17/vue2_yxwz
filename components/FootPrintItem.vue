<template>
      <div class="footPrintItem bg-white d-flex p-2" @click="$router.push({ path: '/detail', query: { prdid: itemData.recordid }})">
            <div>
                  <img  style="width: 30.6vw; height: 30.6vw;border-radius: 1.86vw;"
                        onerror="this.src = '/static/img/detaul_Img.jpg'"
                        :src="$getImageUrl(itemData.mainimage)"
                        alt=""
                  />
            </div>
            <div class="rightInfo flex-grow-1 fs-5 px-2 py-2 d-flex flex-column justify-content-between">
                  <div class="fw-bold fs-4 text-left">
                        {{ itemData.prdname }}
                  </div>
                  <div class="text-muted text-left">
                        <span>￥</span>
                        <span>{{ Number(itemData.price).toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                        <div v-if="itemData.numberstages && itemData.numberstages.split(',').length" class="fs-5 text-red fs-3 d-flex">
                              <span>￥</span>
                              <span
                                    >{{ Number(itemData.price / getInstal(itemData.numberstages)).toFixed(2) }}*{{
                                          itemData.numberstages | getInstal
                                    }}</span
                              >
                        </div>
                        <div v-else></div>
                        <div class="text-muted fs-6">{{ new Date(itemData.updatetime || itemData.createTime).toLocaleString() }}</div>
                  </div>
            </div>
      </div>
</template>
<script>
export default {
      props: {
            itemData: {
                  type: Object,
                  default: () => ({}),
            },
      },
      filters: {
            getInstal(stag) {
                  let splitArr = stag.split(",");
                  if (stag && splitArr && splitArr.length) {
                        return Number(splitArr[splitArr.length - 1]);
                  } else {
                        return 1;
                  }
            },
      },
      created() {
      },
      methods: {
            getInstal(stag) {
                  let splitArr = stag.split(",");
                  if (stag && splitArr && splitArr.length) {
                        return Number(splitArr[splitArr.length - 1]);
                  } else {
                        return 1;
                  }
            },
      },
};
</script>

<style lang="scss" scoped>
.footPrintItem {
      border-radius: 1.86vw;
      margin: 1vw 1vw 0 1vw;
      .rightInfo {
            > div:first-child {
                  @include ellipsisRow(2);
            }
            > div:nth-child(2) {
            }
            > div:last-child {
            }
      }
}
</style>
