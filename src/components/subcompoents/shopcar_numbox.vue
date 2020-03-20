<!-- 购物车里的数字输入组件 -->
<template>
  <div class="shopcar_numbox">
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1"/>
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
    
  },
  mounted(){
    // 页面数据和data一致时，调用。
    mui('.mui-numbox').numbox(); 
  }
  
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