// 创建 vm 实例
import Vue from 'vue';

import VueRouter from 'vue-router';  // 导入路由模块
Vue.use(VueRouter);   // 手动开启
import router from './router.js'; // 导入分离式的路由文件

import Vuex from 'vuex';  // 导入 vuex 模块
Vue.use(Vuex);    // 在vue上注册
var store = new Vuex.Store({  // 创建 store 实例。
  state: {
    car: []  // 用来存放 点击加入购物车的数据。
  },
  mutations: {
    /* 创建操作 car 数据的处理方法，Goodsinfo.vue 通过调用这个方法，然后把拼接的数据
    以参数的形式，传递过来就可以拿到。*/

    /*在购物车有几种情况：
      1. 里面已有了该商品，但再买了几个，购物车里不会添加新的一条数据，只是添加了原来的商品的数量。
      2. 里面没有该商品，就添加新的数据。
    */
    
    addToCar(store, goodsinfo){  // 注意参数

      var flag = false;  // 来表记 是否 有该商品。

      // 有一样的商品时：
      store.car.some( item => {  // item 每一项
        if(item.id ==  goodsinfo.id){
          flag = true;  // 赋值，表记
          item.count += parseInt(goodsinfo.count);  // 要加等于，才不会覆盖。
          return true;
        }
      });

      // car 里面没有同样的商品时
      if(flag == false){   // 这里写错了 写成了  flag == false
        console.log('ol');
        // store.car.push(goodsinfo);
      }

    }
  },
  getters: {

  }
})

import VueResource from 'vue-resource'; // 导入 vue-resource 发起请求模块
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
  router,  // 挂载 路由
  store   //  挂载 vuex
})