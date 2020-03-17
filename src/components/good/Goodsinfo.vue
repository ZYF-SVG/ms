<!-- 商品详情组件 -->
<template>
  <div class="goodsinfo_connent">

    <!-- 加入购物车小球 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball"  ref="balla" v-show="switche"></div>
    </transition>

    <!-- 顶部轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 调用轮播图组件 -->
          <swiper :lunbotuList="goodinfo_luenbotu" :sf="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 中间购买菜单 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p> 
            商场价：<del>￥{{ goodsinfo.market_price }}</del>  &nbsp; &nbsp;
            销售价：<span class="mr">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <!-- 数量选择 -->
          <div calss="number">
            购买数量：
            <numbox class="numbox"></numbox>
          </div>
          <!-- 按钮 -->
          <div class="buttons">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addcar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部商品信息 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品编号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsinfo.add_time | time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button size="large" type="primary" plain  @click="gooddesc(id)">图文介绍</mt-button>
        <mt-button size="large" type="danger" plain  @click="goodcomment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
import swiper from "../subcompoents/swiper.vue";  // 导入轮播图组件
import goodsinfo_numbox from "../subcompoents/goodsinfo_numbox.vue"; // 导入数字输入框组件 
import { Toast } from "mint-ui"

export default {
  data: function(){
    return {
      id: this.$route.params.id, // 获取路由中的id
      goodinfo_luenbotu: [],  // 接收请求的轮播图数据
      goodsinfo: [],  // 获取详情信息
      switche: false
    }
  },
  methods:{
    getLuenBoTu(){  // 获取轮播图数据
      this.$http.get('http://127.0.0.1:5000/goodsinfo?callback='+ this.id ).then( res =>{
          res.body.message.forEach( item => {
            item.img = item.src
          });
          this.goodinfo_luenbotu = res.body.message;
      }, err =>{
          console.log(err);
      })
    },
    getgoodsinfo(){  // 获取商品详情数据
      this.$http.get('http://127.0.0.1:5000/goodsinfos?callback='+this.id).then( res =>{
        this.goodsinfo = res.body;
      }, err=> {
        Toast('读取数据失败');
      })
    },
    gooddesc(id){  // 点击图文介绍按钮开启 编程导航
    console.log(0);
      this.$router.push({ name: 'goodsdesc',  id: id })
    },
    goodcomment(id){ // 点击商品评论开启 编程导航
      this.$router.push({ name: 'goodscomment', id: id })
    },
    addcar(){   // 点击 添加购物车按钮
      this.switche = !this.switche;
    },
    beforeEnter(el){  // 开始前  transform: translate(79px, 301px);
      el.style.transform = "translate(0,0)";
    },
    enter(el, done){  // 开始的过程
      el.offsetWidth;   // 大写的w

      // 获取小球的位置 用 ref 来获取小球，
      var ball = this.$refs.balla.getBoundingClientRect();
      // 获取图片的位置 给 app 组件中 图标一个id，操作dom获取。
      var label = document.getElementById('label').getBoundingClientRect();
      //  获取 图标 的位置，活数据
      var tubiaoX = label.left - ball.left;
      var tubiaoY = label.top - ball.top;

      // 字符串拼接 填入数据
      el.style.transform = `translate(${tubiaoX}px, ${tubiaoY}px)`;
      el.style.transition = "all 1s cubic-bezier(.28,-0.2,.40,.50) ";
//  cubic-bezier(.4,-0.3,1,.48)
      done();
    },
    afterEnter(el){  // 开始后
       this.switche = !this.switche;
    }

  },
  created() {
    this.getLuenBoTu();
    this.getgoodsinfo();
  },
  components: {  // 注册组件
    swiper,
    numbox: goodsinfo_numbox
  }
}
</script>

<style lang="scss" scoped>
  .goodsinfo_connent{
    background-color: #eee;
    overflow: hidden;

  // 销售价
  .mr{ 
    color: red;
    font-weight: bold;
    font-size: 16px;
  }
  // 数字输入
  .numbox{
    display: inline-block;
  }
  // 按钮框
  .buttons{
    margin-top: 10px;
  }

    // 页脚2个按钮容器
    .mui-card-footer{
      display: block;
      // 2个按钮
      button{
        margin-top: 10px;
      }
    }
    // 小球
    .ball{
      width: 15px;
      height: 15px;
      position: absolute;
      top: 390px;
      left: 149px;
      z-index: 99;
      border-radius: 50%;
      background-color: red;
          // transform: translate(79px, 301px);
    }
  }
  
</style>