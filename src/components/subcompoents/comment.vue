<!-- 评论组件 需要在引用的组件中注册的 -->
<template>
  <div class="comment_max">
    <h3 class="comment_h3">发布评论</h3>
    <hr>

    <textarea placeholder="输入评论内容( 最多输入120个字 )" v-model="texts"></textarea>

    <mt-button type="primary" size="large" @click="postComment">提交按钮</mt-button>

    <!-- 评论内容 -->
    <div class="whole">
      <!-- 评论标题 和 内容 -->
      <div class="tit_con"  v-for="(itme, i) in date" :key="i">
        <div class="title">
          <span>第{{ i+1 }}楼：{{ itme.message.user_name }}</span>
          <span>发布时间：{{ itme.message.add_time | time}} </span>
        </div>
        <div class="content">
          <p> {{ itme.message.content }} </p>
        </div>
      </div>
    </div>



    <mt-button type="danger" size="large" plain>提交按钮</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui"

export default {
  data(){
    return {
      date: { 
        
      },    // 存储评论数据
      texts: ''
    }
  },
  props: ['id'] ,  // 获取 列表页传递过来的 id 值
  methods: {
    comment(){  // 发起获取评论内容的请求。
      // console.log(this.id);
      this.$http.get('http://127.0.0.1:5000/comment?callback='+ this.id ).then( res =>{
        this.date = res.body.datas ;
        // console.log(res.body.datas[0]);
      }, err =>{
        console.log(err);
      })
    },
    postComment(){   // 点击提交数据按钮发生数据给服务器
      // 检查文本域是否为空
      if( this.texts.trim().length == 0 ){
          return Toast('内容不能为空。');
      }

      this.$http.post('http://127.0.0.1:5000/postcomment?callback=' + this.id , { content: this.texts })
      .then( res =>{
        Toast('发送成功');
        // 拼接到 评论数组中
        var str = {'message': { user_name: '匿名用户', add_time: new Date() ,  content: this.texts } };
        // console.log(str);
        // console.log(this.date);
        
        this.date.unshift(str);
        this.texts = '';
      }, err =>{
        Toast('发送失败');
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

    .comment_h3{
      color: #333;
      text-align: left;
      font-size: 16px;
      margin: 0;
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
          overflow: hidden;
          p{
            color: #333;
          }
        }

      }
    }
  }
</style>

