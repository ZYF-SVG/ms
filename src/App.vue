<template>
    <div class="appBody">

      <!-- 顶部部分 -->
      <mt-header fixed title="项目2.0"></mt-header>

      <!-- 中间切换部分 -->
      <transition>
         <router-view class="qh"></router-view>
      </transition>
     

      <!-- 底部部分 -->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item " to="/home">
          <!-- 图标 -->
          <span class="mui-icon mui-icon-home"></span>
          <!-- 文字 -->
          <span class="mui-tab-label">首页</span>
        </router-link>

        <router-link class="mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>

        <router-link class="mui-tab-item" to="/shopping">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge">0</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>

        <router-link class="mui-tab-item" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
		  </nav>

    </div>
</template>

<script>

export default{

}
</script>

<style lang="scss" scoped>

.appBody{
    padding-top: 40px;
    padding-bottom: 50px;
    /*给这个App界面做一个 如果超出屏幕宽度就 不显示，不计算，
    就不会导致一个组件要出场，一个要进场，导致撑大了app的宽度，导致界面出现滚动条*/
    overflow-x: hidden;

    .mint-header{
      background-color: rgba(85, 167, 243, 0.781);
    }   

} 


// 修饰子组件 切换的动画
.v-enter{   // 进场前
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to{  // 出场后
  opacity: 0;
 // 为什么
  position: absolute; 
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active{
  transition: all 1s ease;
}
</style>