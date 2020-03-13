// 创建 vm 实例
import Vue from 'vue';


import VueRouter from 'vue-router';  // 导入路由模块
Vue.use(VueRouter);   // 手动开启
import router from './router.js'; // 导入分离式的路由文件

import VueResource from 'vue-resource'; // 导入 vue-resource 模块
Vue.use(VueResource);  // 手动开启
// 全局配置数据接口的根域名
// Vue.http.options.root = "根域名"
// 全局配置 emulateJSON ， post 请求的第三个参数
Vue.http.options.emulateJSON = true ;

// 导入 node 中处理 时间的模块
import moment from 'moment';
// 定义全局过滤器
Vue.filter('time' , function(data, csData="YYYY-MM-DD"){
  return moment(data).format(csData);
})

// 引进 App.vue
import App from './App.vue';

/*
// 按需导入 mint-ui 
import { Header,  Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';  
Vue.component( Header.name, Header );
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); // 懒加载
*/
// 导入 mint-ui 的全部
import MintUI from 'mint-ui';
import "mint-ui/lib/style.css";
Vue.use(MintUI);

//  导入 Mui
import './lib/mui-master/dist/css/mui.min.css';
// 导入 mui 的
import './lib/mui-master/examples/hello-mui/css/icons-extra.css'

// 导入 vue-preview 缩列图 插件
import VuePreview from "vue-preview";
Vue.use(VuePreview);

var vm = new Vue({
  el: '#app',
  data:{},
  methods: {},
  render: c =>{
    return c(App);
  },
  router
})