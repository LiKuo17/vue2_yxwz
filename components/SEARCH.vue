<template>
  <div class="SEARCH">
    <!--
        作者：offline
          时间：2019-08-22
          描述：搜索框 (widgets='SEARCH')
    -->
    <div class="search_Box">
      <van-search
        :placeholder="searchItem.tips"
        shape="round"
        v-model="value"
        @click="topSearch"
      >
        <div slot="label" @click="show = true" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ locationName }}</div>
      </van-search>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-area
        :columns-num="2"
        :area-list="areaList"
        :value="locationCode"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import _config from "../assets/js/config";
import _areaList from "../assets/js/area";
import { Search, Area, Popup } from "vant";

export default {
  name: "SEARCH",
  props: ["searchItem"],
  data() {
    return {
      serverAdd: _config.serverAddress,
      imgServerAdd: _config.fileServerAddress,
      value: "",
      areaList: _areaList,
      show: false,
      locationName: "定位",
      locationCode:"-1"
    };
  },
  created() {
    //console.log(this.$props.searchItem);
    this.init();
  },
  methods: {
    topSearch() {
      this.$emit("toSearch");
    },
    cancel() {
      this.show = false;
    },
    confirm(obj) {
      var code = obj[1].code;
      var name = obj[1].name.replace("市", "");

      localStorage.positionCode = code;
      localStorage.positionName = name;
      this.locationName = name;
      this.show = false;
    },
    init(){
      var _this = this;
      localStorage.positionCode &&(_this.locationCode = localStorage.positionCode);
      
      if(localStorage.positionName){
        _this.locationName = localStorage.positionName
      }else{
        var cityname = localStorage.cityname;
        var city_list = this.areaList.city_list;
        for(var code in city_list){
          var name = city_list[code+""];
          if(cityname.indexOf(name)!=-1){
            _this.locationName = name;
            _this.locationCode = code;
          }
        }
      
      }

    }
  },
  components: {
    [Search.name]: Search,
    [Area.name]: Area,
    [Popup.name]: Popup,
  },
};
</script>

<style scoped>
.card_Box {
  background-color: white;
}

.search_Box {
  position: relative;
  /* padding: 20px 24px; */
  background-color: #ffffff;
}

img {
  height: 100%;
  width: 100%;
  border: 0;
}
</style>
