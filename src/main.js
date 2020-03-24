// 创建 vm 实例
import Vue from 'vue';

import VueRouter from 'vue-router';  // 导入路由模块
Vue.use(VueRouter);   // 手动开启
import router from './router.js'; // 导入分离式的路由文件

import Vuex from 'vuex';  // 导入 vuex 模块
Vue.use(Vuex);    // 在vue上注册


// 页面加载时，从浏览器本地存储中拿取 car 的数据
var car = JSON.parse(localStorage.getItem('car') || '[]') ;

var store = new Vuex.Store({  // 创建 store 实例。
  state: {
    car: car // 用来存放 点击加入购物车的数据。本地存储数据 赋予 car 
  },
  mutations: {
    /* 创建操作 car 数据的处理方法，Goodsinfo.vue 通过调用这个方法，然后把拼接的数据
    以参数的形式，传递过来就可以拿到。*/
    addToCar(store, goodsinfo){  // 注意参数
      /*在购物车有几种情况：
      1. 里面已有了该商品，但再买了几个，购物车里不会添加新的一条数据，只是添加了原来的商品的数量。
      2. 里面没有该商品，就添加新的数据。
      */
      var flag = false;  // 来表记 是否 有该商品。
      // 有一样的商品时：
      store.car.some( item => {  // item 每一项
        if(item.id ==  goodsinfo.id){
          flag = true;  // 赋值，表记
          item.count += parseInt(goodsinfo.count);  // 要加等于，才不会覆盖。
          return true;
        }
      });

      if(flag == false){    // car 里面没有同样的商品时
        store.car.push(goodsinfo);
      }
      // 将处理好的 car 存放一份到 本地存储里
      localStorage.setItem('car', JSON.stringify(store.car));

    },
    updatecounts(state, goodsinfo){  // 在购物车页面，点击 数字输入组件 更新最新的内容。
      // 循环 旧的car， 根据传递的id，更改对应的count
      state.car.some( item =>{
        if(item.id == goodsinfo.id){
          item.count = goodsinfo.count;
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    vuexRemove(state, goodsinfo){    // 购物车删除事务
      state.car.some( (item,i) =>{
        if( item.id == goodsinfo.id){
          state.car.splice(i,1);   // 判断id相同，再根据 索引删除比较容易。
          return true;
        }
      })
      // 再一次同步 本地存储 中的数据
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    vuexSelectButton(state, goodsinfo){  // 开关按钮事务
      // 循环判断 id 一样的项，改变他的 select 值。
      state.car.some( item =>{
        if(item.id == goodsinfo.id){
            item.selected = goodsinfo.select;
            return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {              // 功能： 监听数据变化触发函数； 过滤器。
    getAllCount(state){   // 计算购物车里的数量，同步到购物车徽标（App.uve 去
      var c = 0;
      state.car.forEach( item =>{
        c += item.count;
      })
      return c;   // 返回，调用函数时，就能得到 c
    },
    getgoodsinfomun(state){  // 循环 car 里的数据，拿到id和count，组成 {id:count} ==> {1：3}
      var counts = {};
      state.car.forEach( item =>{
          counts[item.id] = item.count;
      /*var myMap = new Map();
        myMap.set(item.id, item.count);  使用字典，往里面添加 key：item.id 和 value: item.count
        console.log(myMap.get(1));  字典的调用。*/
      })
      return counts;
    },
    getgoodsinfoButton(state){  // 把 id 和 seleced 拼接一起，
      // 在 购物车组件 中调用，然后根据每一个id的值，获取不同的 selected 
      // 状态，存储在 data 中， 在 html 中使用class属性、三元运算符 来进行
      //判断，为 true 就给 开关 一个 mui-active 选中的样式。
      var buttonArray = {};
      state.car.forEach( item =>{
        buttonArray[item.id] = item.selected;
      })
      return buttonArray;
    },
    getNumberPrice(state){  // 计算购物车 总价 和 总数量。
      var arrays = { 
        counts: 0,  // 数量
        price: 0    // 价格
      }
      state.car.forEach( item =>{
        if(item.selected){
          arrays.counts += item.count; 
          arrays.price += item.price * item.count
        }
      })
      return arrays;
    }
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