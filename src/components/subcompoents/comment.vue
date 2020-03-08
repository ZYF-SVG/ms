<!-- 评论组件 需要在引用的组件中注册的 -->
<template>
  <div class="comment_max">
    <h3>发布评论</h3>
    <hr>

    <textarea placeholder="输入评论内容( 最多输入120个字 )"></textarea>

    <mt-button type="primary" size="large">提交按钮</mt-button>

    <!-- 评论内容 -->
    <div class="whole">
      <!-- 评论标题 和 内容 -->
      <div class="tit_con" v-for="(itme, i) in date" :key="itme.message[0].add_time">
        <div class="title">
          <span>第{{ i+1 }}楼：{{ itme.message[0].user_name }}</span>
          <span>发布时间：{{ itme.message[0].add_time }} </span>
        </div>
        <div class="content">
          <p> {{ itme.message[0].content }} </p>
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain>提交按钮</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      date: {}
    }
  },
  props: ['id'] ,  // 获取 列表页传递过来的 id 值
  methods: {
    comment(){  // 发起获取评论内容的请求。
    console.log(this.id);
      this.$http.get('http://127.0.0.1:5000/comment?callback='+ this.id ).then( res =>{
        this.date = res.body.datas ;
        console.log(this.date);
      }, err =>{
        console.log(err);
      })
    }
  },
  created(){   // 调用函数
    this.comment();
  }
}
</script>

<style lang="scss" scoped>
  .comment_max{
    margin-top: 30px;

    h3{
      font-size: 16px;
    }

    textarea{
      height: 80px;
      font-size: 15px;
      margin-bottom: 5px;
    }
    // 评论内容
    .whole{
      margin: 20px 0;

      .tit_con{
        margin-bottom: 10px;
        border: 1px solid #c9c9c9;
        // 标题
        .title{
          font-size: 15px;
          background-color: rgb(222, 238, 251);
          text-align: left;
          span{
            margin-left: 10px;
          }
        }
        // 内容
        .content{
          height: 35px;
          line-height: 35px;
          font-size: 17px;
          text-indent: 2em;
          p{
            color: #333;
          }
        }

      }
    }
  }
</style>

