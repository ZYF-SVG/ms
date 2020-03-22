<!-- 购物车里的数字输入组件 -->
<template>
  <div class="shopcar_numbox">
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" readonly 
      :value="shoppingcount" ref="inputVlue" @change="countChanged"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
//  导入错误
import mui from '../../lib/mui-master/dist/js/mui.js';

export default {
  data: function(){
    return {
    }
  },
  methods:{
    countChanged(){    // 调用 vuex muntions 方法，传递 最新数量 和 id 过去 和 执行方法。
      // console.log(this.$refs.inputVlue.value); // 数字输入框的内容
      this.$store.commit('updatecounts',{  // 调用 vuex 实例中的函数
        id: this.shoppingId ,   // 商品id
        count: parseInt(this.$refs.inputVlue.value) // 最新数量 
      })
    }
  },
  mounted(){
    // 页面数据和data一致时，调用。
    mui('.mui-numbox').numbox(); 

  },
  props: ['shoppingcount', 'shoppingId']  // 接收从 购物车组件 传递过来的 商品数量 和 商品的id。
}

</script>

<style lang="scss" scoped>
  .shopcar_numbox{
    display: inline-block;
    
    .mui-numbox{
      height: 25px;
    }
  }
</style>