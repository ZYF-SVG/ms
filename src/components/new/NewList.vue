<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="tiem in titles" :key="tiem.id">
        <!-- 点击进入 新闻内容 从整体看他是 home 的子组件的 newlise 的子组件， 但前面不一定要加上上一辈的路径，
         /home/newlise/newinfo, 可以直接 /home/newinfo/-->
        <router-link :to="'/home/newinfo/'+ tiem.id">
        <!-- 这里进行拼接，前面为字符串 后面为参数，用 v-boin 来这里， 用第二种方式传值。 -->
          <img
            class="mui-media-object mui-pull-left"
            src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/a8773912b31bb051ec146159397adab44aede08b.jpg"
          />
          <div class="mui-media-body">
            <h3> {{ tiem.title }} </h3>
            <p class="mui-ellipsis">
              <span>发布日期：{{ new Date() | time }} </span>  
              <span>点击次数：{{ tiem.clicst }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      titles: ['nihao']
    }
  },
  methods: {
    addtitle(){
      this.$http.get('../../data/Journalism.json').then(function(res){
        this.titles = res.data.message;
      }, function(err){
        console.log(err);
      })
    }
    
  },
  created(){
    this.addtitle();
  }
};
</script>

<style lang="scss" scope>
// ul
.mui-table-view{
  li{
    h3{
      font-size: 14px;
    }
    //  p 标签
    .mui-ellipsis{
      color: rgb(60, 100, 231);
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>