<template>
  <div class="parents_box">

    <div class="van_detail" @scroll.passive="getScroll($event)">
        <div class="content">
            <div>
           
                <van-swipe indicator-color="white" @change="onChangeSwipe">
                    <van-swipe-item v-for="item in heightHotel" :key="item.id">
                        <div class="imgBox">
                                <img class="detailImg1" src="https://img01.yzcdn.cn/upload_files/2022/03/17/Fohj3J2T1139aV6ePP-rnnDpPRsp.jpg!large.webp" />
                                <img class="detailImg2" src="https://img01.yzcdn.cn/upload_files/2022/03/17/Fohj3J2T1139aV6ePP-rnnDpPRsp.jpg!large.webp" />
                        </div>
                    </van-swipe-item>
                    <template #indicator>
                        <div class="custom-indicator2">
                            {{ currentSw + 1 }}/{{ heightHotel.length }}
                        </div>
                    </template>
                </van-swipe>
                <h2 class="doubleBed">双床房</h2>
                <van-divider />
            </div>
            <!-- 地图电话 -->
            <div class="map">
                <div class="map-box">
                    <van-icon style="opacity: 0.2;font-size: 15px;" name="map-marked" />
                    <div class="map_address">{{this.message.address}}</div>
                    <div class="map_map">地图</div>
                    <div class="map_phone">电话</div>
                </div>
            </div>
            <div>
                <h2 class="doubleBed">房型概况</h2>
                <div>
                    <van-grid direction="horizontal" :column-num="3" :border="false" >
                        <van-grid-item  v-for="(item,index) in houseDetailList" :key="index" :icon="item.src" :text="item.text" />
                    </van-grid>
                </div>
            </div>
            <!-- 成为会员 -->
            <div class="beVip">
                <div class="beVip_box">
                    <img src="https://img01.yzcdn.cn/public_files/dbee5fc66dbed41d2221c384946c6738.png" alt="">
                    <div class="says">开通黑金全年卡尊享5大权益</div>
                    <div class="openVip" @click="gotoYearCard">
                        <div>成为会员</div>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>


            <div class="apartment_box">
                <div class="apartment_box-time" @click="showTime">
                    <div class="apartment_box-time_go">
                        <span>入住</span>
                        <div>{{dateStart}}</div>
                    </div>
                    <div>
                        <span class="howNight">{{this.interpolation}}晚</span>
                    </div>
                    <div class="apartment_box-time-leave">
                        <span>离店</span>
                        <div>{{dateEnd}}</div>
                    </div>
                </div>
                <div class="choose">
                    <div class="chooseBox">
                        <div>筛选</div>
                        <van-icon name="arrow-down" />
                    </div>
                </div>
            </div>
            <van-divider />
            <div>
                <h2 class="doubleBed">房型设备</h2>
                <div>
                    <van-grid direction="horizontal" :border="false" :icon-size="18" :column-num="3">
                        <van-grid-item icon="success" v-for="(item1, index1) in equipmentList" :key="index1" :text="item1" />
                    </van-grid>
                </div>
            </div>
            <van-divider />
            <div>
                <h2 class="doubleBed">预定须知</h2>
                <div class="mustKnow">
                    <p>1.酒店于14:00以后办理入住，12:00以前办理退房；</p>
                    <p>2.在线支付完成后，不支持取消，我们将为您整晚保留房间；</p>
                    <p>3.预订时需填写各房间填写一名入住人姓名，需和实际入住人一致。</p>
                </div>
            </div>
        </div>
      <!-- 轮播图区域 start -->
      <header id="product">
      </header>
    <!-- 概况房情 -->
    <van-tabs v-model="activeName" color="#c3a769">
        <van-tab title="概况" name="a">
            <div class="surveyBox">
                <div v-for="(item, index) in surveyList" :key="index">
                <div style="padding-top: 24px;">
                    <h2>{{item.title}}</h2>
                </div>
                <p>{{item.detail}}</p>
            </div>
            </div>
        </van-tab>
        <van-tab title="房型" name="b">
            <div class="apartment">
               
                <div>
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                        <van-cell v-for="(item,index) in list" :key="index" >
                            <div class="item_box" @click="houseDetail">
                                <div class="item_box-img">
                                    <img class="img1" :src="item.src" />
                                    <img class="img2" :src="item.src" />
                                </div>
                                <div class="description">
                                    <div class="description_left">
                                        <div class="description_left-detail">
                                            <h4>{{item.name}}</h4>
                                            <van-icon color="#c8c9cc" name="arrow" />
                                        </div>
                                        <div class="description_left-power">
                                            <div v-for="(item1, index1) in item.power" :key="index1">{{item1}}</div>
                                        </div>
                                    </div>
                                    <div class="price">
                                        <div style="margin-right:10px">
                                            <span style="color: #323233;font-weight: bolder;font-size:12px">￥</span>
                                            <span style="    color: #323233;font-weight: bolder;font-size:18px">{{item.price}}</span>
                                        </div>
                                        <button>预定</button>
                                    </div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
                </div>
            </div>
        </van-tab>
    </van-tabs>
    <!-- 日期选择组件 -->
     <van-calendar v-model="showCalendar" color="#c3a769" type="range" @confirm="onConfirm" />
    <!-- 自定义面板 -->
     <van-action-sheet v-model="showHouse" title="房型详情">
        
        <div class="btn_all">
            <div class="btn_box">
                <div class="lookDetail" @click="lookDetail">查看详情</div>
                <div class="lookPrice" @click="allPrice">查看全部价格</div>
            </div>
        </div>
    </van-action-sheet>
      <footer></footer>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import allComment from "../../components/ALLCOMMENT";

import {
  Swipe,
  SwipeItem,
} from "vant";
export default {
  name: "detail",
  data() {
    return {
        showHouse:false,
        interpolation:'',
        showCalendar:false,
        isShowTabs:false,
        month:new Date().getMonth() + 1,
        day:new Date().getDate(),
        dateStart: ((new Date().getMonth() + 1)<10? ('0' + (new Date().getMonth() + 1)):(new Date().getMonth() + 1)) + '月' + (new Date().getDate() < 10 ? ('0' + (new Date().getDate())):new Date().getDate()) + '日',
        dateEnd:((new Date().getMonth() + 1)<10? ('0' + (new Date().getMonth() + 1)):(new Date().getMonth() + 1)) + '月' + (new Date().getDate() < 10 ? ('0' + (new Date().getDate())):new Date().getDate()) + '日',
        list: [
            {
                src: 'https://img01.yzcdn.cn/upload_files/2022/03/17/Fohj3J2T1139aV6ePP-rnnDpPRsp.jpg!large.webp',
                name: '三亚金凤凰海景酒店 ',
                power: ['不含早餐','会员折扣'],
                price: '1280',
                type:'双床房',
                size: '10m',
                bed:'大床',
                window: '有窗'
            },
            {
                src: 'https://img01.yzcdn.cn/upload_files/2022/03/17/FoOZgBm64i6cdQjaed1HMIr1qfnH.jpg!large.webp',
                name: '三亚金凤凰海景酒店 ',
                power: ['不含早餐','会员折扣'],
                price: '1280',
                type:'双床房',
                size: '10m',
                bed:'大床',
                window: '有窗'
            }
        ],
        loading: false,
        finished: false,
        surveyList:[
            {
                title: '酒店设备',
                detail: `
        通用设施-暖气.电梯.加湿器.大堂吧.公共音响系统.吸烟区.公共区域禁烟.无烟楼层.公共区域闭路电视监控系统.安全报警器.火灾报警器.门禁系统.灭火器.新风系统.烟雾报警器
      `
            },
            {
                title: '酒店服务',
                detail: `
        前台服务-行李寄存免费.部分时段大堂经理.礼宾服务.叫醒服务
.信用卡结算服务.快速入住退房.24小时中文服务.24小时前台.旅游交通图.一次性结账
餐饮服务-餐厅.咖啡厅.日式餐厅
      `
            },
            {
                title: '预订须知',
                detail: `
                    
        1.酒店于14:00以后办理入住，12:00以前办理退房；
2.在线支付完成后，不支持取消，我们将为您整晚保留房间；
3.预订时需填写各房间填写一名入住人姓名，需和实际入住人一致。
      
                    `
            }
        ],
        activeName: 'b',
        message:{
            name:'杭州逸澍酒店',
            openTime:'2019年开业',
            renovationTime:'2019年装修',
            type:'商务出行',
            address:'浙江省杭州市拱墅区逸澍酒店(杭州武林店)',
        },
      active: 0,
      heightHotel: [
        { id: 1, imgUrl: 'https://img01.yzcdn.cn/upload_files/2021/02/19/FrFhHgEGYUpanyZL1GwtbeX0JfHd.jpg!large.webp' },
        { id: 2, imgUrl: 'https://img01.yzcdn.cn/upload_files/2021/02/19/FmpqlVX8tGfqjuuNuw1veiPfNtYt.jpg!large.webp' },
        { id: 3, imgUrl: 'https://img01.yzcdn.cn/upload_files/2021/02/19/Ft1wG_OAedh_uRYxEJyOF8wKeBGc.jpg!large.webp' },
        { id: 4, imgUrl: 'https://img01.yzcdn.cn/upload_files/2021/02/19/FlYm75nYLpbyhKz43GZyiRQ7EGR3.jpg!large.webp' },
        { id: 5, imgUrl: 'https://img01.yzcdn.cn/upload_files/2021/02/19/Fi-uBhzsazPQdDBUaS42q5f5j71f.jpg!large.webp' },
      ],
      houseDetailList:[
          {
              src: 'https://img01.yzcdn.cn/upload_files/2021/08/30/FiJjyrSqKlZMMMiJeG74M005uwJW.png',
              text:'11'
          },
          {
              src: 'https://img01.yzcdn.cn/upload_files/2021/08/30/FoHWiuWhBvXTD4y_q343PdXeQFgl.png',
              text:'32㎡'
          },
          {
              src: 'https://img01.yzcdn.cn/upload_files/2021/08/30/Fr1GZjGHisb-iz7SCp_FFlmaWQW-.png',
              text:'有窗'
          },
          {
              src: '//b.yzcdn.cn/hotel/detail/icon/bed.png',
              text:'双床1.2m'
          }
      ],
      equipmentList: ['空调','热水','独立卫浴','瓶装水','书桌','拖鞋','吹风机','衣架','电热水壶','沙发','电视','电话','洗漱用品','衣柜','WIFI' ],
      currentSw: 0, // 顶部轮播图数字
      options: [
        { name: "发送给好友", icon: "wechat" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollx, true);
  },
  // 页面销毁删除滚动事件
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollx);
  },
  methods: {
    allPrice(){
        this.showHouse = false
    },
    lookDetail(){},
    houseDetail(){
        this.showHouse = true
    },
    showTime(){
        this.showCalendar = true
    },
    //转换格式为月日
    formatDate(date) {
        return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    //转换格式为年月日
    formatDate1(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    //选完日期对格式继续一系列的处理
    onConfirm(date) {
        const [start, end] = date;
        this.showCalendar = false;
        this.dateStart = `${this.formatDate(start)}`;
        this.dateEnd = `${this.formatDate(end)}`
        let dateStartOne = this.dateStart.split('-')[0]
        let dateStartTwo = this.dateStart.split('-')[1]
        let dateEndOne = this.dateEnd.split('-')[0]
        let dateEndTwo = this.dateEnd.split('-')[1]
        dateStartOne = dateStartOne < 10 ? '0' + dateStartOne : dateStartOne
        dateStartTwo = dateStartTwo < 10 ? '0' + dateStartTwo : dateStartTwo
        dateEndOne = dateEndOne < 10 ? '0' + dateEndOne : dateEndOne
        dateEndTwo = dateEndTwo < 10 ? '0' + dateEndTwo : dateEndTwo
        this.dateStart = dateStartOne + '月' + dateStartTwo + '日'
        this.dateEnd = dateEndOne + '月' + dateEndTwo + '日'

        //处理两个日期的插值
        let a = `${this.formatDate1(start)}`;
        let b = `${this.formatDate1(end)}`
        console.log(a,b);
        let diffDate
        let myDate_1 = Date.parse(a)
        let myDate_2 = Date.parse(b)
        console.log(myDate_1,myDate_2);
        diffDate = Math.abs(myDate_1 - myDate_2)
        this.interpolation = Math.floor(diffDate / (1000 * 3600 * 24))
    },

    gotoYearCard(){
        this.$router.push('/yearcardDetail')
    },
    onLoad(){},
    // tabs栏滑动自动滚动
    handleScrollx() {
      // 只有当前组件有recommend这个ref才会执行以下逻辑，可以防止其他组件访问完详情后该组件控制台
      // 获取不到详情的ref=recommend导致一直报错的BUG
      if (this.$refs.recommend) {
        const clienttopCommend =
          this.$refs.recommend.getBoundingClientRect().top;
        if (clienttopCommend < 48 && -232 < clienttopCommend) {
          this.active = 2;
        } else if (clienttopCommend < -225) {
          this.active = 3;
        } else if (clienttopCommend < 107 && 43.9 < clienttopCommend) {
          this.active = 1;
        }
      }
    },
    // 分享下拉框
    onSelect() {
      this.showShare = false;
    },

    // tab栏滑动切换
    getScroll(event) {
      if (event.target.scrollTop > 200) {
        this.isShowTabs = true;
      } else {
        this.isShowTabs = false;
      }
    },

    // 获取元素并跳转
    getAnchor(id) {
      let anthorH = document.getElementById(id);
      anthorH.scrollIntoView(true); // 将被点击的id滚动到顶部
      // 如果页面的高度 - 当前元素在页面的高度 还大于 200就让它显示顶部tabs栏，反之隐藏
      document.body.clientHeight - anthorH.offsetTop > 200
        ? (this.isShowTabs = true)
        : (this.isShowTabs = false);
    },
    // 保存轮播图的数字
    onChangeSwipe(index) {
      this.currentSw = index;
    },
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    allComment,
  },
};
</script>
<style lang="scss" scoped>
.van_detail {
    background-color: white;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.img_Box {
  width: 750px;
  height: 74.8148vw;
    overflow: hidden;
  font-size: 0;
}
.custom-indicator {
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 12px;
  position: absolute;
  bottom: 100px;
  right: 16px;
  color: white;
  padding: 3px;
}
.custom-indicator2 {
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  padding: 3px;
}
/* 分享 */
.messageBox {
    position: relative;
    top: -9.333vw;
    border-radius: 6vw;
    background-color: #fff;
    padding: 32px 40px;
        border-top-left-radius: 40px;
    border-top-right-radius: 40px;
}
.message_share {
    display: flex;
    justify-content: space-between;
    
}
.message_share > h2 {
    font-size: 36px;
    line-height: 44px;
    color: #323233;
    font-weight: bolder;
    padding-right: 80px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.message_share .share {
        position: absolute;
    top:32px;
    right: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 48px;
    border-top-left-radius: 76px;
    border-bottom-left-radius: 76px;
    background-color: rgba(50,50,51,.05);
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 8px 0 12px;
    color: #969799;
    font-size: 24px;
}
.message_share .icon {
    margin-right: 4px;
    color: rgb(150, 151, 153);
    font-size: 28px;
}
.message_time {
    text-align: left;
    margin-top: 8px;
}
.message_time > span {
    padding: 0 8px;
    margin-bottom: 16px;
    margin-right: 8px;
    font-size: 20px;
    line-height: 32px;
    border-radius: 4px;
    text-align: center;
}
.map {
    font-size: 28px;
    padding: 20px 32px;
    margin-top: -60px;
}
.map-box {
display: flex;
    justify-content: space-between;
    align-items: center;
}
.map_address {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 8px;
    flex: 1;
    
}
.map_map {
        color: #576b95;
    padding-right: 8px;
    border-right: 1px solid #ebedf0;
}
.map_phone {
    color: #576b95;
    padding-left: 8px;
}
.beVip {
    padding: 20px 32px;
    background: #fff;
}
.beVip .beVip_box{
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 0 24px;
    height: 72px;
    justify-content: space-between;
    background-image: -webkit-linear-gradient(316deg,#f9e1aa,#ffe8b4 49%,#e1c78e);
    background-image: linear-gradient(134deg,#f9e1aa,#ffe8b4 49%,#e1c78e);
    border-radius: 8px;
}
.beVip img {
    height: 36px;
    width: 64px;
}
.openVip {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 26px;
    color: #724e06;
    letter-spacing: 0;
    line-height: 32px;
}
.says {
        font-size: 26px;
    color: #724e06;
    letter-spacing: 0;
    line-height: 32px;
}
.surveyBox {
    padding: 0 32px 32px;
        text-align: left;
}
.surveyBox h2{
    padding-top: 48px;
        position: relative;
    font-size: 36px;
    line-height: 44px;
    font-weight: bolder;
    padding: 16px 0 0;
}
.surveyBox p{
    padding: 20px 0 44px;
    font-size: 26px;
    line-height: 40px;
    color: #646566;
    white-space: pre-line;
}

.apartment {
    /* padding: 0 32px; */
}
.apartment_box {
    display: flex;
    justify-content: space-between;
    height: 104px;
    line-height: 104px;
    padding: 0 32px;
    align-items: center;
    /* padding-bottom: 30px; */
}
.description {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.description_left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.description_left-power {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.description_left-detail {
    display: flex;
    align-items: center;
    padding: 10px 0;
}
.description_left-detail > h4 {
        overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
        width: 230px;
}
.price {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price > button {
        display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    width: 120px;
    height: 64px;
    margin-left:16px;
    border-radius: 32px;
    color: #fff;
    font-weight: bolder;
    font-size: 28px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
        background: #c3a769;
    border: 1px solid #c3a769;

}
.description_left-power >div{
    padding: 2px 8px;
    margin-right: 8px;
    border-width: 2px;
    border-style: solid;
    border-radius: 4px;
    white-space: nowrap;
    color: #c3a769;
    border-color: #c3a769;
    font-size: 20px;
    line-height: 30px;
}
.item_box-img {
        position: relative;
    width: 100%;
    height: 384px;
    border-radius: 4px;
    overflow: hidden;
}
.img1 {
    position: absolute;
    left: -7%;
    top: -7%;
    width: 114%;
    height: 114%;
    object-fit: cover;
    -webkit-filter: blur(13px);
    filter: blur(13px);
}
.img2{
        position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.apartment_box-time {
    flex: 1;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}
.apartment_box-time_go {
    font-size: 28px;
    display: flex;
    /* justify-content: space-between; */
}
.apartment_box-time_go > div {
    color: #323233;
    font-weight: 600;
    padding-left: 10px;
}
.apartment_box-time-leave > div {
    color: #323233;
    font-weight: 600;
    padding-left: 10px;
}
.apartment_box-time-leave {
    align-items: center;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
}
.chooseBox{ 
    height: 42px;
    line-height: 42px;
    font-size: 28px;
    color: #576b95;
        margin-left: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
}
.howNight {
    display: inline-block;
    border: 2px solid #ebedf0;
    width: 90px;
    border-radius: 28px;
    text-align: center;
    font-size: 28px;
    color: #646566;
    height: 42px;
    line-height: 42px;
}
.content {
    /* padding: 0 32px 40px; */
}
.imgBox {
    height: 384px;
    overflow: hidden;
    position: relative;
}
.detailImg1 {
    position: absolute;
    left: -7%;
    top: -7%;
    width: 114%;
    height: 114%;
    object-fit: cover;
    -webkit-filter: blur(13px);
    filter: blur(13px);
}
.detailImg2 {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.doubleBed {
    font-size: 36px;
    line-height: 44px;
    font-weight: bolder;
    margin-top: 32px;
    text-align: left;
}
.content /deep/ .van-grid-item__icon {
    font-size: 14px;
}
/deep/ .van-grid-item__content {
    justify-content: start;
        padding: 8px 8px 8px 0px;
}
/deep/ .van-grid-item__text {
    font-size: 14px;
    font-weight: 500;
}
/deep/ .van-icon-success {
    color: #c3a769;
}
.mustKnow {
    padding: 20px 0;
    font-size: 26px;
    line-height: 40px;
    color: #646566;
    white-space: pre-line;
    text-align: left;
}
.btn_all {
    position: relative;
    box-sizing: border-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 100px;
    padding: 14px 32px;
    box-shadow: 0 -6px 20px -2px #7d7e8029;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
}
.btn_box {
    flex: 1;
        width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 72px;
    text-align: center;
    font-size: 28px;
    font-weight: bolder;
    border-radius: 36px;
    overflow: hidden;
    .lookDetail {
        background-color: rgba(195,167,105,0.1);
        flex: 1;
        color: #c3a769;
    }
    .lookPrice {
        flex: 1;
        background-color: #c3a769;
        color: white;
    }
}
</style>
