// 分离路由

// 导入路由模块
import VueRouter from 'vue-router';

// 导入 底部切换的组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShoppingContainer from './components/tabbar/ShoppingContainer.vue';

// 创建一个路由实例
var router = new VueRouter({
  // 高亮设置，设置选中样式
  routes:[
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopping', component: ShoppingContainer },
    { path: '/search', component: SearchContainer}
  ],
  linkActiveClass: 'mui-active'

})

// 向外暴露一个 路由入口
export default router