<!-- 数字输入组件 -->
<template>
  <div>
    <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="getText" ref="atext"/>
      <!-- 
        使用 v-model 绑定数据，直接改里面的数据，data 是会跟着改变的；
        但 使用 + - 号点击是没有变化的，所以不能使用 v-model
       -->
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
    getText(){     // change方法，当文本框发送改变时，触发这个函数
    //  this.atext = this.$refs.atext.value;  

    this.$emit('cdi', Number( this.$refs.atext.value ))
    },
    getnumbox(){}
  },
  mounted(){
    // 页面数据和data一致时，调用。
    mui('.mui-numbox').numbox(); 
  },
  props:['numboxs'],  // 接收父组件传递的值
  watch:{  
     /* 用watch来监听，因为普通接收接收到的是 numboxs， 
    因为 父组件 发起的请求是 异步操作，当执行到 属性绑定 传递给子组件数据时，还没有发起请求0数据；
    所以，发送的数据为 numboxs， 接收也知道在哪个时期接收好，所以用 watch 来监听发送过来的数据，
    迟早会发生过来真正的数据。*/
    'numboxs': function(newVal, oldVal){
      // console.log( newVal ); // 获取到数据，调用 js mui 的 API 方法，改变 数字输入框的 最大输入值。
      mui('.mui-numbox').numbox().setOption('max', newVal);
    }
  }
  
}

</script>

<style lang="scss" scoped>
  
</style>