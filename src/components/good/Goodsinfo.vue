<!-- 商品详情组件 -->
<template>
  <div class="goodsinfo_connent">

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
            <mt-button type="danger" size="small">加入购物车</mt-button>
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
      goodsinfo: []  // 获取详情信息
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
  }
  
</style>