<template>
    <div class="appBody">

      <!-- 顶部部分 -->
      <mt-header fixed title="百宝袋">
        <span slot="left" v-show="flag" @click="HT">
          <mt-button icon="back">返回</mt-button>
        </span>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>

      <!-- 中间切换部分 -->
      <transition>
         <router-view class="qh"></router-view>
      </transition>
     

      <!-- 底部部分 -->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item-yf" to="/home">
          <!-- 图标 -->
          <span class="mui-icon mui-icon-home"></span>
          <!-- 文字 -->
          <span class="mui-tab-label">首页</span>
        </router-link>

        <router-link class="mui-tab-item-yf" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>

        <router-link class="mui-tab-item-yf" to="/shopping">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="label"> {{ $store.getters.getAllCount }} </span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>

        <router-link class="mui-tab-item-yf" to="/member">
          <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
          <span class="mui-tab-label">登录</span>
        </router-link>
		  </nav>

    </div>
</template>

<script>
export default {
  data: function(){
    return {
      flag: true
    }
  },
  methods: {
    HT(){
      this.$router.go(-1);
    }
  },
  created(){
    // 页面初始化时，没有引起 路由的改变，就不知道 watch 监听的 $route.path 是否改变，在初始化时，也进行一个判断
    if(this.$route.path == '/home'){
        this.flag = false;
      }else{
        this.flag = true;
      }
  },
  watch:{ 
    "$route.path": function(newVal){  // 监听路由的改变
      if(newVal == '/home'){
        this.flag = false;
      }else{
        this.flag = true;
      }
    }
  }
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

//  重新定义  mui-bar-tab 类
.mui-bar-tab .mui-tab-item-yf.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-yf {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-yf .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-yf .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>