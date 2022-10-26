<template>
      <div>
            <CommonHeader title="足迹" />
            <div class="footPrintList-ignore overflow-x-scroll">
                  <LayzyList httpType='get'  url="/m/members/api/setUserfootprints" :validate="res => res.data">
                        <template #default="{list}">
                              <FootPrintItem :itemData="item" v-for="(item, index) in list" :key="index" />
                        </template>
                  </LayzyList>
            </div>
      </div>
</template>
<script>
import CommonHeader from "@/components/CommonHeader";
import LayzyList from "@/components/LAZYLIST";
import FootPrintItem from "@/components/FootPrintItem";
export default {
      components: { CommonHeader, LayzyList, FootPrintItem },
      data() {
            return {};
      },
      methods: {},
};
</script>

<style lang="scss" scoped>
.footPrintList-ignore {
      height: calc(100vh - 46px);
}
</style>
