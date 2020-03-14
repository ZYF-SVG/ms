<!--商品列表组件-->

<template>
  <div class="goods_list">
    <!-- 包裹全部图片的div -->
    <div class="max_goos">
      <!-- 容器 -->
      <div class="list_connent" v-for="item in goodslist" :key="item.id">
        <img :src="item.img_url">
        <div class="title">
          <h3> {{ item.title }} </h3>
        </div>
        <div class="bottom">
          <!-- 价格 -->
          <p class="price">
            <!-- 新老价格 -->
            <span class="new">￥ {{ item.sell_price }} </span>
            <span class="old">￥ {{ item.market_price }} </span>
          </p>
          <!-- 情况 -->
          <p class="situation">
            <span>热卖中</span>
            <span>剩 {{ item.stock_quantity }} 件</span>
          </p>
        </div>
      </div>

      <mt-button type="danger" @click="addGoodsList" size="large" class="addd">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data: function(){
    return {
      goodlist_id: 0 ,  // 发送的页面，默认为0，第一页
      goodslist: []   // 存储获取的数据
    }
  },
  methods:{
    getGoosList(){
      this.$http.get('http://127.0.0.1:5000/gooslist?callback='+this.goodlist_id).then( res =>{
        // concat 数组拼接,页数作用。
        this.goodslist = this.goodslist.concat(res.body.message) ;
      }, err =>{
        Toast('请求失败');
      })
    },
    addGoodsList(){
      if(this.goodlist_id === 3){  // 进行判断，数据只有3页，
         Toast('暂无商品');
      }else{
        this.goodlist_id ++;
        this.getGoosList();
      }
      
    }
  },
  created(){
    this.getGoosList();
  }
}
</script>

<style lang="scss" scoped>
  .goods_list {
    .max_goos {   //包裹全部图片的div
      padding: 0 8px;
      display: flex;
      flex-wrap: wrap; // 换行
      justify-content: space-between;  // 设置每个容器左右靠
      .list_connent {  // 每个容器
        width: 49%;
        min-height: 247px;
        padding: 3px;
        margin-top: 5px;
        border: 1px solid #c9c9c9;
        box-shadow: 0 0 8px #c9c9c9;
        display: flex;  
        flex-direction: column;
        justify-content: space-between;
        img{
          width: 100%;
        }
        .title{  // 标题
          width: 100%;
          height: 45px;
          overflow: hidden;
          h3{
            font-size: 14px;
            line-height: 20px;
          }
        }
        .bottom{  // 底下价格
          background-color: rgb(244, 246, 243);
          p{ 
            padding: 5px;   // 挤
            margin-bottom: 0;
           }
          .price{
            .new{ 
              color: red;
              font-size: 16px;
              }
            .old{
              font-size: 14px;
              text-decoration: line-through;
              margin-left: 10px;
            }
          }
          .situation{
            display: flex;
            justify-content: space-between;
            
          }
        }
      }
      .addd{
        margin: 10px 0;
      }
    }
  }
</style>