<!-- 图片详情组件 -->
<template>
  <div class="photoInfo_comment">
    <h3>{{ photoInfos.title }}</h3>
    <p>
      <span>发布时间： {{ photoInfos.add_time | time }}</span>
      <span>点击：{{ photoInfos.click }}</span>
    </p>

    <hr>

    <!-- 内容区 -->
    <div class="content" v-html="photoInfos.zhaiyao" ></div>

    <!-- 浏览图片区 -->
    <div class="reduced">
      <template>
        <vue-preview class="reduced_img" :slides="slide1" @close="handleClose"></vue-preview>
      </template>
    </div>


    <!-- 发布评论区 -->
    <!-- 调用 评论组件，要传递一个 数据过去，才能获取到评论数据。 -->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
// 引入 评论组件
import comment from '../subcompoents/comment.vue';
import { Toast } from 'mint-ui';

export default{
  data: function(){
    return {
      id: this.$route.params.id,  // 图片列表传递过来的路由里的id
      photoInfos: {},  // 存放图片详情的标题，日期，点击数据
      slide1: []  //存放图片详情缩列图
    }
  },
  methods: {
    photoInfo(){    //获取图片详情的标题，日期，点击数据
      this.$http.get('http://127.0.0.1:5000/photoInfo?callback='+this.id )
      .then( res =>{
        this.photoInfos = res.body;
        // Toast('请求成功');
      }, err =>{
        Toast('请求失败');
      })
    },
    getthumbs(){
      this.$http.get('http://127.0.0.1:5000/getthumbs?callback='+this.id )
      .then( res =>{
          // console.log(res.body);
          res.body.forEach( item => {
            item.w = 600,
            item.h = 400,
            item.msrc = item.src
          });
          this.slide1 = res.body;
      }, err =>{
          Toast('请求失败');
      })
    },
    handleClose () {
        console.log('close event')
    }
  },
  created(){
    this.photoInfo();
    this.getthumbs();
  },
  components:{   // 组件注册
    comment
  }
}
</script>

<style lang="scss">
  .photoInfo_comment{
    padding: 0 10px;
    h3{
      letter-spacing: 2px;
      font-size: 16px;
      color: blue;
      text-align: center;
      margin: 20px;
    }
    p{
      display: flex;
      margin: 0;
      justify-content: space-between;
    }
    hr{
      margin: 0 0 10px 0;
    }
    .content{
      line-height: 25px ;
      letter-spacing: 4px;
      font-size: 15px;
    }
    .reduced{
      margin-top: 20px;
      overflow: hidden;
      .reduced_img{
        overflow: hidden;
        .my-gallery{
          overflow: hidden;
          figure{
            width: 32%;
            margin: 2px;
            float: left;
            a{
              img{
                width: 100%;
                vertical-align: middle;
              }
            }
          }
        }
      }

    }

  }
</style>