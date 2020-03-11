<!-- 图片分享组件 -->
<template>
  <div class="photo_comment">

    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a :class="['mui-control-item',  item.id == 0 ? 'mui-active': '' ]" v-for="item in photolist" :key="item.id"
          @click="getPhotoLists(item.id)">
            {{ item.title }}  
          </a>
          <!-- 默认选中用 item.id 来区别，判断id为零的话，就用蓝色样式修饰，厉害， -->
          <!-- 添加点击数据，点击对应的列表，把id作为参数，传递过去，从而获取不同的数据。 -->
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <ul>
      <li v-for="item in getphotolists" :key="item.id">
        <img v-lazy="item.img_url">
      </li>
    </ul>

  </div>
</template>

<script>
  // 引入 mui.js 来初始化 顶部滑栏 控件
import mui from '../../lib/mui-master/dist/js/mui.js';
import { Toast } from "mint-ui";

export default {
  data: function(){
    return {
      photolist: [] ,  // 存储获取的图片分类数据
      getphotolists: []  // 超出获取的图片列表数据
    }
  },
  methods:{
    getphotoList(){    // 发起图片分类请求
      this.$http.get('http://127.0.0.1:5000/photoList').then( res =>{
        if(res.data.content[0].status == 0){  // 判断是否成功
            // 往获取的数组头部添加一个 id为0 的 全部 的一个对象，因为 获取的数据中没有全部
            var photoArray = res.data.content[0].message; 
            photoArray.unshift({ title: '全部', id: 0 });
            this.photolist = photoArray;
        }
      }, err =>{
          Toast('图片分类请求失败');
      })
    },
    getPhotoLists(id){   // 获取图片列表内容数据。
      this.$http.get('http://127.0.0.1:5000/getPhotoList?callback='+ id).then( res =>{
          if( res.body.status == 0 ){
            this.getphotolists = res.body.message; 
            // console.log(res.body.message);
          }
      }, err =>{
          Toast('图片列表内容请求失败');
      })
    }
  },
  created(){
    this.getphotoList();
    this.getPhotoLists(0);  // 进入分享图片时，加载（是首页的，id 传递一个0，
  },
  mounted(){  // 当 组件 中的 DOM 结构渲染好并放到页面上后，调用 钩子函数。
    // 初始化
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  }
};
</script>

<style lang="scss" scoped>
*{
  touch-action: none;
}

// 懒加载css属性
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>