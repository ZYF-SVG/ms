<!-- 二手商品列表 -->
<template>
  <div class="secondhand">
    <h4>二手物品</h4>
    <div class="box">
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs1.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>古筝 半筝 125cm 二手转让</p>
              <span>300￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/Android.png"
                width="20px"
                alt=""
              />
              <span>小个**列</span>
            </div>
          </div>
        </a>
      </div>
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs2.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>三星S10 蓝色 型号：三星 s10</p>
              <span>2000￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/tx1.png"
                width="20px"
                alt=""
              />
              <span>马上**和</span>
            </div>
          </div>
        </a>
      </div>
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs3.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>奥林巴斯60f2.8微距镜头</p>
              <span>1600￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/tx2.png"
                width="20px"
                alt=""
              />
              <span>>爱**定位</span>
            </div>
          </div>
        </a>
      </div>
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs4.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>蕉下胶囊伞五折伞 正品全新晴雨两用</p>
              <span>20￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/tx3.png"
                width="20px"
                alt=""
              />
              <span>下雨**我</span>
            </div>
          </div>
        </a>
      </div>
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs5.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>15.1克11.5cm仿真多节路亚鱼饵三节拟饵</p>
              <span>15￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/tx4.png"
                width="20px"
                alt=""
              />
              <span>鱼儿**列</span>
            </div>
          </div>
        </a>
      </div>
      <div class="goods1">
        <a href="javascript:;">
          <!-- 图片 -->
          <img src="../../images/secondhand/gs6.jpg" />
          <!-- 文字 -->
          <div class="text">
            <!-- 上 -->
            <div class="upper">
              <p>耐克SB Dunk 开拓者板鞋</p>
              <span>100￥</span>
            </div>
            <!-- 下 -->
            <div class="lower">
              <img
                src="../../images/secondhand/tx5.png"
                width="20px"
                alt=""
              />
              <span>骆驼**帕</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.secondhand {
  h4 {
    margin: 10px 0 10px 10px;
  }
  .box {
    display: flex;
    flex-wrap: wrap; // 换行
    justify-content: space-around;
    padding-top: 0;
    overflow: hidden;
    .goods1 {
      width: 45%;
      min-height: 225px;
      margin-bottom: 10px;
      border-radius: 5px;
      box-shadow: 2px 2px 3px 0px #c9c9c9;
      a {
        display: flex;   
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        .text {
          padding: 5px;
          .upper {
            p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span {
              color: red;
              font-size: 16px;
              font-weight: 700;
            }
          }
          .lower {
            margin-top: 10px;
            padding: 5px;
            border-top: 1px solid #4a92f0;
            img {
              vertical-align: middle;
            }
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .goods1 > a > img {
    width: 100%;
    height: 150px;
    border-radius: 5px 5px 0 0;
  }
}
</style>