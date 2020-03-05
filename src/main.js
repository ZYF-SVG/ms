// 创建 vm 实例
import Vue from 'vue';

// 导入路由模块
import VueRouter from 'vue-router';
// 手动开启
Vue.use(VueRouter);
// 导入分离式的路由文件
import router from './router.js';

// 导入 vue-resource 模块
import VueResource from 'vue-resource';
// 手动开启
Vue.use(VueResource);



// 引进 App.vue
import App from './App.vue';

// 按需导入 mint-ui 
import { Header,  Swipe, SwipeItem } from 'mint-ui';  
Vue.component( Header.name, Header );
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//  导入 Mui
import './lib/mui-master/dist/css/mui.min.css';
// 导入 mui 的
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'



var vm = new Vue({
  el: '#app',
  data:{},
  methods: {},
  render: c =>{
    return c(App);
  },
  router
})