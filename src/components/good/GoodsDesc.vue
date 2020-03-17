<!-- 图文详情组件 -->
<template>
  <div class="goodsdesc">
    <h4 class="goodsdesc_title"> {{ getDescs.title }} </h4>

    <hr />

    <p class="goodsdes_content" v-html="getDescs.content"> </p>

    <img src="https://img10.360buyimg.com/imgzone/jfs/t1/91296/12/3140/2624684/5ddb62ebEb5a36cb6/c9ad13cb41889821.jpg" class="goodsdesc_img">
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      getDescs: {} // 存储数据
    }
  },
  methods: {
    getDesc(){
      this.$http.get("http://127.0.0.1:5000/goodsdesc?callback="+ this.$route.params.id).then( res =>{
        this.getDescs = res.body;
      }, err =>{
        console.log(err);
      })
    }
  },
  created(){
    this.getDesc();
  }
}
</script>

<style lang="scss" scoped>
  .goodsdesc{
    padding: 5px;
    .goodsdesc_title{
      color: blue;
      margin: 10px 0;
      text-align: center;
    }
    hr{
      margin-top: 20px; 
    }
    .goodsdesc_img{
      width: 100%;
    }
  }
</style>