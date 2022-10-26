<template>
  <!-- 更多精选商品 -->
  <div class="moreshop" id="recommend" >
    <div class="moreshop-title">
      <h2>更多精选商品</h2>
    </div>
    <div class="moreshop-main" v-if="wnrecoment.length">
      <!-- 每一个商品 start -->
      <a
        href="javascript:;"
        class="moreshop-Aitem"
        v-for="item in wnrecoment"
        :key="item.id"
      >
        <div class="moreshop-item">
          <div class="moreshop-item-top">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="moreshop-item-bottom">
            <div class="moreshop-item-bottom-title">
              {{ item.proname }}
            </div>
            <div class="moreshop-item-bottom-price">
              <span>￥</span><span>{{ item.price }}</span>
            </div>
          </div>
        </div>
      </a>

      <!-- 每一个商品 end -->
    </div>
    <div class="moreshop-main" v-if="wnrecoment.length == 0">
      <van-divider>暂无推荐</van-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoreShop",
  data() {
    return {
      wnrecoment: [
        {
          id: 1,
          imgUrl: require("@/assets/img/商旅套餐1.jpg"),
          proname: "商旅权益套餐B",
          price: 1680,
        },
        {
          id: 2,
          imgUrl: require("@/assets/img/商旅套餐2.jpg"),
          proname: "三亚金凤凰海景酒店+五星酒店同款枕芯*2",
          price: 1280,
        },
        {
          id: 3,
          imgUrl: require("@/assets/img/商旅套餐3.jpg"),
          proname: "桂林大公馆一晚+五星酒店同款舒适枕2只",
          price: 699,
        },
        {
          id: 4,
          imgUrl: require("@/assets/img/尊享权益套餐A.jpg"),
          proname: "尊享权益套装A",
          price: 990,
        },
        {
          id: 5,
          imgUrl: require("@/assets/img/欧式四件套.jpg"),
          proname: "爱丁堡 全棉简约欧式四件套",
          price: 1599,
        },
        {
          id: 6,
          imgUrl: require("@/assets/img/card1.jpg"),
          proname: "黑金全年卡",
          price: 368,
        },
      ], // 为你推荐
    };
  },
};
</script>

<style scoped lang="scss">
.moreshop {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  margin-bottom: 150px;
  .moreshop-title {
    width: 100%;
    padding: 16px 0;
    h2 {
      text-align: center;
      margin: 0;
      font-size: 34px;
      line-height: 44px;
    }
  }
  .moreshop-main {
    width: 93vw;
    margin: 0 3vw;
    .moreshop-Aitem {
      float: left;
      width: 50%;
      .moreshop-item {
        height: 100%;
        background-color: white;
        margin: 8px;
        border-radius: 16px;
        overflow: hidden;

        .moreshop-item-top {
          width: 100%;
          height: 320px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .moreshop-item-bottom {
          display: flex;
          flex-direction: column;
          height: 170px;
          text-align: left;
          margin: 12px 12px 0;
          .moreshop-item-bottom-title {
            width: 100%;
            height: 37%;
            color: #323233;
            font-size: 24px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .moreshop-item-bottom-price {
            width: 100%;
            height: 60%;
            line-height: 100px;
            &:nth-child(1) span {
              color: #323233;
              font-size: 32px;
            }
            &:nth-child(2) span {
              color: #ff5858;
              font-size: 32px;
            }
          }
        }
      }
    }
  }
}
</style>