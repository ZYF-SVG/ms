<!--购物车组件-->
<template>
  <div class="shopping_contaier">
    <!-- 商品 -->
    <div class="information">
      <div class="mui-card" v-for="(item, i) in goodsinfo" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 开关 -->
            <div class="mui-switch mui-switch-blue mui-switch-mini"
             @toggle="selectButton(item.id)" 
             :class="[ select[item.id] ? 'mui-active':'']">
              <div class="mui-switch-handle"></div>
            </div>

            <!-- 图片 -->
            <img :src="item.img_url" />
          
            <!-- 文字 -->
            <div class="conter">
              <p class="con_t"> {{ item.title }} </p>
              <p class="con_b"> 
                <span>￥{{ item.sell_price }} </span>
                <!-- 新数字输入组件 -->
                <shopcar-numbox class="numbox" :shoppingcount="$store.getters.getgoodsinfomun[item.id]"
                :shoppingId="item.id">

                </shopcar-numbox>
                <a href="javascript:;" @click="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
			</div>

      <!-- <p>{{$store.getters.getgoodsinfoButton}}</p> -->
    </div>
    

    <!-- 购物量 -->
    <div class="ss">
      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <!-- 结算框 -->
						<div class="js">
              <div class="left">
                <p>总计（不包含运费）</p>
                <p>
                  已选商品 <span>0</span> 件;
                  总价 <span>￥0</span>
                </p>
              </div>
              <mt-button type="danger" size="normal" class="right">
                结算
              </mt-button>
            </div>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui-master/dist/js/mui.js";
import shopcar_numbox from '../subcompoents/shopcar_numbox.vue';

export default {
  data: function(){
    return {
      goodsinfo: [],  // 存储购物车商品数据。
      select: this.$store.getters.getgoodsinfoButton
    }
  },
  methods: {
    getGoodsinfo(){  // 发起请求获取购物车商品数据。
      //1. 获取 vuex 中的商品每个id
      var idarr = []; // 创建存储id的数组
      this.$store.state.car.forEach(item =>{
        idarr.push(item.id);   // 把循环的每一项商品的id添加到 idarr 中。
      });

      if(idarr.length <= 0){
        return ;  // 如果 idarr 为空的，就结束，不往下执行
      }

      this.$http.get('http://127.0.0.1:5000/getcarinfo?callback=' + idarr.join(',')).then( res =>{
        this.goodsinfo = res.body;
      }, err =>{
        console.log(err);
      })
    },
    remove(id, index){   // 点击删除触发事件
      this.$store.commit('vuexRemove', {id})
      // console.log("id:"+ id, ', 索引:' +index);
      // 进行页面上，商品列表的删除
      this.goodsinfo.splice( index , 1 );
    },
    selectButton(id){   // 开关触发事件
      if(event.detail.isActive){  // 开
        this.$store.commit('vuexSelectButton', { id:id, select:true })
      }else{  // 关
        this.$store.commit('vuexSelectButton', { id:id, select:false })
      }
    }
  },
  created(){
    this.getGoodsinfo();
  },
  updated(){     // 当data数据改变时，页面数据 和 data 同步时。初始化开关
      mui('.mui-switch')['switch']();
  },
  components:{   // 注册组件
    'shopcar-numbox': shopcar_numbox   // 注册 数字输入组件
  }
}
</script>

<style lang="scss" scoped>
* { touch-action: none; }  //  滑动开关报错，谷歌优化导致的。

.shopping_contaier{
  background-color: #e9e9e9;
  overflow: hidden;

  .mui-card-content-inner{  // 3个区域的包裹
    display: flex;
    align-items: center;   // 垂直居中 
    padding: 15px 10px;
    .mui-switch{  // 开关
      width: 40px;
    }
    img{
      margin-left: 10px;
      width: 60px;
    }
    .conter {  // 文字部分
      width: 200px;
      text-align: center;
      margin-left: 10px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;

      .con_t{   // 标题
        max-height: 21px;
        overflow: hidden;
      }
      p{
        font-size: 13px;
        color: #333;
      }
      .con_b{
        
        span{
          color: red;
          font-weight: bold;
          font-size: 14px;
        }
      }
      
    }
  }

  .ss{   //购物量
    .js{
      width: 100%;
      display: flex;
      justify-content: space-between; // 左右对齐
      align-items: center; // 居中
      .left{
        span{
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
