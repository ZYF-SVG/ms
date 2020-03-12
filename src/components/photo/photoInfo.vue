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

    <!-- 发布评论区 -->
    <!-- 调用 评论组件，要传递一个 数据过去，才能获取到评论数据。 -->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
// 引入 评论组件
import comment from '../subcompoents/comment.vue';

export default{
  data: function(){
    return {
      id: this.$route.params.id,  // 图片列表传递过来的路由里的id
      photoInfos: {}
    }
  },
  methods: {
    photoInfo(){
      this.$http.get('http://127.0.0.1:5000/photoInfo?callback='+ this.id )
      .then( res =>{
        this.photoInfos = res.body;
      }, err =>{

      })
    }
  },
  created(){
    this.photoInfo();
  },
  components:{
    comment
  }
}
</script>

<style lang="scss" scoped>
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
  }
</style>