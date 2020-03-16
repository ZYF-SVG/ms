<!-- 轮播图组件 -->
<template>
  <div>
    <!-- 轮播图, 他只接收 item.img, 其中的 lunbotuList 是父组件向子组件传递的值，
    所以，调用 轮播图组件 的组件，必须要用数据绑定，然后传递轮播图的数据给他，绑定的
    名称为 lunbotuList  -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" :class="{img_w: sf}"/>
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script lang="ts">
export default {
  props: ['lunbotuList', 'sf']  // 拿取调用 轮播图组件 的父元素传递过来的值。
}
</script>

<style lang="scss" scoped>
  .mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
  }

  .img_w{
    width: 100%;
  }

  img {
    height: 100%;
  }
}
</style>