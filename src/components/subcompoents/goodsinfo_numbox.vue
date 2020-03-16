<!-- 数字输入组件 -->
<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" />
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
  mounted(){
    // 页面数据和data一致时，调用。
    mui('.mui-numbox').numbox();
  }
}

</script>

<style lang="scss" scoped>
  
</style>