<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img :src="luenbotu.url" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img :src="luenbotu.url" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img :src="luenbotu.url" />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlise">
          <img src="../../images/menu1.png" alt="" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu3.png" alt="" />
          <div class="mui-media-body">商品购买</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt="" />
          <div class="mui-media-body">留言反馈</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt="" />
          <div class="mui-media-body">视频专区</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt="" />
          <div class="mui-media-body">联系我们</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data: function() {
    return {
      luenbotu: [] // 接收轮播图图片的数组。
    };
  },
  methods: {
    luenbotus() {
      // 获取轮播图数据
      this.$http
        .get(
          "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
        )
        .then(
          res => {
            this.luenbotu = res;
            console.log(this.luenbotu);
          },
          err => {
            Toast("轮播图加载失败");
            console.log(err);
          }
        );
    }
  },
  created() {
    // data 已经初始化了，调用 轮播图 的请求图片的函数。
    this.luenbotus();
  }
};
</script>

<style lang="scss" scoped>
//  轮播图的
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: aqua;
    }
    &:nth-child(2) {
      background-color: antiquewhite;
    }
    &:nth-child(3) {
      background-color: bisque;
    }
  }

  img {
    width: 100%;
  }
}

// 六宫格 ul
.mui-grid-view.mui-grid-9 {
  border: none;
  background-color: #fff;
}
//li
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
}
</style>