<!-- 新闻内容组件 -->
<template>
  <div class="newsifo_container">
    <!-- 标题 -->
    <h3 class="title">{{ newContent.title }}</h3>

    <!-- 日期 -->
    <p class="chile_title">
      <span>发表日期：{{ newContent.add_time }}</span>
      <span>点击 {{ newContent.click }}</span>
    </p>

    <hr />

    <header v-html="newContent.content">
      内容区啊。
    </header>

    <!-- 评论组件, 不能写在 内容区中，因为会 v-heml 会覆盖 ,使用数据绑定，传递
    id， 给评论组件使用。-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
// 导入需要引用的组件
import comment from '../subcompoents/comment.vue';

export default {
  data() {
    return {
      id: "", // 拿到 路由 传递过来的 id 参数.
      newContent: {}
    };
  },
  methods: {
    hq() {
      this.id = this.$route.params.id;
    },
    newsInfo() {
      // 发起请求，获取 新闻内容
      this.$http.get("http://127.0.0.1:5000/newsInfo?callback=" + this.id).then(
        res => {
          this.newContent = res.body.message[0];
          // console.log( typeof this.newContent );
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    // 周期函数， data 一初始化运行。
    this.hq();
    this.newsInfo();
  },
  components:{
    "comment-box": comment
  }
};
</script>

<style lang="scss" scoped>
// 大div
.newsifo_container {
  padding: 10px;
  //标题
  .title {
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }
  // 日期，点击次数
  .chile_title {
    display: flex;
    justify-content: space-between;
    color: rgb(59, 59, 230);
    margin-top: 20px;
    margin-bottom: 0;
  }

  hr {
    margin-top: 0;
  }
}
</style>