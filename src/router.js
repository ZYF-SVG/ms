// 分离路由

// 导入路由模块
import VueRouter from 'vue-router';

// 导入 底部切换的组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShoppingContainer from './components/tabbar/ShoppingContainer.vue';
import NewList from './components/new/NewList.vue';  // 新闻资讯组件
import NewsInfo from './components/new/NewsInfo.vue';  // 新闻内容组件
import PhotoList from "./components/photo/photoList.vue" // 图片分享组件。
import PhotoInFo from "./components/photo/photoInfo.vue";  // 图片详情组件
import GoodsList from "./components/good/GoodsList.vue"; // 商品列表组件
import Goodsinfo from "./components/good/Goodsinfo.vue"; // 商品详情组件
import GoodsDesc from "./components/good/GoodsDesc.vue"; // 商品图文介绍组件
import GoodsComment from "./components/good/GoodsComment.vue"; //商品评论组件

// 创建一个路由实例
var router = new VueRouter({  
  // 高亮设置，设置选中样式
  routes:[
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopping', component: ShoppingContainer },
    { path: '/search', component: SearchContainer},
    // 新闻路由
    { path: '/home/newlise', component: NewList },
    // 新闻内容组件  用 id 来接收。
    { path: '/home/newinfo/:id', component: NewsInfo },
    // 图片分享组件
    { path: '/home/photolist',  component: PhotoList },
    // 图片详情组件
    { path: '/home/photolnfo/:id', component: PhotoInFo},
    // 商品列表组件
    { path: '/hone/goodslist', component: GoodsList },
    // 商品详情组件
    { path: '/home/goodsinfo/:id', component: Goodsinfo, name: 'goodsinfo' },
    // 商品图文介绍
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    // 商品评论
    { path: 'home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
  ],
  linkActiveClass: 'mui-active'

})

// 向外暴露一个 路由入口
export default router

/**/ 