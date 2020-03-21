# 第一个项目

# 日志：
- 2020.3.3 完成底部组件的图标，切换，高亮，路由分离。
- 2020.3.4 
  - 早上： 轮播图数据的获取 和 六宫格 的布置，注意： webpack 子组件加载 图片时的设置。
  - 下午： 路由切换动画。
- 2020.3.6
  - 新闻路由，制作新闻页面 flex , 创建一个 json 文件， 模拟新闻数据，后续完善。
  - 解决新闻列表最近一列被挡住的问题。
  - 格式化 时间，定义全局的过滤器，因为这个网站都有时间。 cnpm i moment -S 
  - 创建新闻内容区：
    1. 改 router-link
    2. 在发起请求时，带参数，要跟每个新闻列表的id，传递id，获取对应的新闻内容，用 / 来传递，不是 ？，？传递后是键值对。
    3. 创建 NewsInfo.vue 路由
    5. 注册 NewsInfo.vue 路由时，要写对应的组件来接收参数。！
    4. 在 组件 中获取到请求时的参数 id
- 2020.3.8
  - 路由是当url中的hash发生变化时，切换不同的组件。组件是不用注册的。
  - 组件是要在实例中注册的，创建，注册。
  - 我们的评论组件是要注册在需要引用的组件实例中的，记住了。
  1. 创建新闻评论区组件 comment.vue
  2. 在新闻内容组件（ NewsInfo.vue , 中引入 comment.vue
  3. 书写评论区的样式
  4. 向服务器提交数据，和渲染数据。
    - 模拟数据时，因为每一列新闻都有评论，数据我是设置和新闻列数一样的，然后里面在分为每一列新闻的评论，设置10条。分支再分支。
    - 前端子组件可以通过 props 拿取到之前进入每一列的id，然后以参数传递到后台，后台根据 id ，拿取对应的评论内容返回给前端。
    - 引用数据时，要注意格式，有的是一个数组，要在第0项取值。
    - 第几楼用v-for 的索引来弄，哎，忘记了。

- 2020.3.9
  - 提交评论数据，提交后提交到当前列的第一位（ 可以看到最新评论在第一个 ，然后点击提交提交按钮重新获取数据
    1. 双向数据绑定，添加按钮事件；
    2. 点击提交按钮发起 post 请求，后端接收到数据，然后添加到评论数据中；
      - 后端用 body-parser 来解析 post 的请求，后可用 req.boby 来获取。
      - 根据id数，添加到对应的数据中。
      - 返回给一个 提交成功 信息给前端
    3. 前端提交数据后，在前端页面显示提交的数据，但不是从后端获取的，是拿将拿取到的数据，拼接后，渲染到前端页面的。
    因为写少了一层导致插入时报错了：
    ```js
    var str = {'message': 
                  { user_name: '匿名用户',  add_time: '2020.3.9' ,   content: this.texts } 
              };
    ```
    写成了这样： 
     ```js
     var str = { user_name: '匿名用户',  add_time: '2020.3.9' , content: this.texts  } ;
     ```
     而我们要插入的数据结构为：
     ```js
     {'message': 
        { user_name: '匿名用户', add_time: '2020.3.9' ,  content: this.texts },
      'status': 0
     ```
     - 会报 什么什么没有定义 之类的，以后要是见到之类问题，要想一下这个情况。
     4. 做一些判断，当文本域为空时，提示  string.trim().lenght 。
     4. 要怎么解决用户名的问题！

- 2020.3.10
  - 点击 首页的 图片分享， 跳转页面，添加 图片分享 组件；
  - 应用 mui 的 tab-top-webview-main.html 引入顶部滑动条， 小心里面的 mui-fullscreen 样式.
  - 问题：
   1. 导入成功，但滑动不了。
    + 因为 mui 的这个功能使用到了 js 功能，要进入js [ https://dev.dcloud.net.cn/mui/ui/#scroll ], 这里说明了这个功能需要这个提供帮助初始化控件，其中的mui，就是 mui.js 中的功能。因此引入他
    ```js
    // 引入 mui.js 来初始化 顶部滑栏 控件
    import mui from '../../lib/mui-master/dist/js/mui.js';
    ```
    并进行了初始化：
    ```js
      // 引入 mui.js 来初始化 顶部滑栏 控件
      import mui from '../../lib/mui-master/dist/js/mui.js';
      // 初始化
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    ```

    2. 但是报： [Vue warn]: Invalid value for option "methods": expected an Object, but got Function. 错。修改了严格模式还是不行。是因为我把方法写成了函数，她是个对象。打自己。

    3. 还报了 [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See <URL>， 添加一个css样式， `* { touch-action: none; } ` 阻止触发默认行为。

    4. 从主页进到 分享图片 组件中，一开始是不能拖动滑动栏的，要刷新一下才能拖动。
    - 在是因为在页面还没有初始化时，就调用了 控件的初始化方法，到后面页面初始化好了，就相当于没有调用 控件的初始化方法，解决在页面和data数据初始化好了，就进行 控件的调用。moumted 。

    5. 我没有遇到 严格模式，严格模式报错的处理方法为：
      - 下载处理包： `cnpm i babel-plugin-transform-remove-strict-mode -D`
      - 然后到配置文件 .babelrc 中配置 ` 'plugins': [ ["transform-remove-strict-mode"] ] ` 这个参数，解除严格模式。

    6.  mui 中的 顶部滑动栏 中js 和 底部栏的 mui-tab-item 类名有冲突，所以要改 App.vue 中的类名，先复制之前和  mui-tab-item 相关的样式， 在 App.vue 样式中从新定义，更改类名，然后再更改标签里面的 class 名。


- 2020.3.11
  - 添加图片列表的虚拟数据,只有 message 生成多个数据就好，status 不用。
    ```js
      // 图片分类
    var photoList = Mock.mock({
      "content":[
        {
          'status': 0,
          'message|7':[ { 'title': "@cname", 'id|+1': 1 } ]
        }
      ]
    })
    ```
  - 发送图片列表请求，获取列表数据，往获取的数据头部添加一个全部对象，id为0；
  - 获取数据后，页面渲染，删除多余的属性；
  - 更改默认选中样式，用 属性绑定 三元运算符来判断，如果 id 为 0 ，就给他蓝色的字体修饰；
  ```html
    <a :class="['mui-control-item',  item.id == 0 ? 'mui-active': '' ]" v-for="item in photolist" :key="item.id">
            {{ item.title }}  
    </a>
  ```
  - 用 mint-ui 的 懒加载 Lazy load，来加载 图片内容列表。
  ```html
    <!-- v-lazy 是图片 -->
    <ul class="photo_ul">
      <li v-for="item in getphotolists" :key="item.id">
        <img v-lazy="item.img_url">
      </li>
    </ul>
  ```
  ```css
    /*懒加载css属性*/
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  ---
  这里有个坑，官方文档的 css 属性是 images[xxx]{ xxx }, 我们是 img 标签。
  - 点击渲染不同的数据
    1. 后端数据格式为：
    ```js
    //  评论数据
    var comment = Mock.mock({
      'comment|10': [   //comment[n]  来区分 第几列的
        {
          'status': 0,
          'datas|10': [    // 每页的评论内容
            {
              'status': 0,
              'message': 
                { 'user_name': "@cname", 'add_time': "@Date", 'content': "@cparagraph(1)"}
            }
          ]
        }
      ]
    })
    ```
    
    2. 前端获取数据后呢，有2个要注意的：
      a. 页面一开始加载时，加载的是全部，也就是后端数据的第0项，所以我可以在调用 页面一加载调用 请求函数 时，给他一个实参 0 ，请求函数把 参数 传递到后端，拿到相应的数据。
      b. 点击其他项，给 请求函数 传递本身对应的 id 值，作为实参。
    ```js
      created(){
        this.getPhotoLists(0);  // 进入分享图片时，加载（是首页的，id 传递一个0，
      },

      <a v-for="item in photolist" :key="item.id" @click="getPhotoLists(item.id)">
          {{ item.title }}  
      </a>
    ```

- 2020.3.12
  1. 完成懒加载功能，要全部导入 miui.ui 和 css 样式。这时要设置盛放图片的容器的背景颜色，因为懒加载是白色的，要是背景颜色为白色的就看不到他了，
  2. 改每个li为 router-link 标签，点击他们进入 图片详情 组件页面，创建图片详情组件 photoInfo.vue , 在 分离路由 模块，注册组件，组件传递一个参数到 url 中，为当前图片的id值，点击进入时，发送请求数据给后端：
    - 注意：
      1. 必须为 router-link 标签渲染为 li 标签，不然页面样式会不好看。
      2. to传递数据，在 路由模块时，必须要有参数接收。
      3. 参数，图片详情 可以通过 this.$route.params.id 接收到，发起请求到后端的参数。
  3. 我们的请求的数据是和 图片列表 数据一样的，因为我不知道后端数据是怎么样的，所以改成一样的，显示图片列表的数据 和 进入详情 的数据是一样的。
    - 因为数据是这样的，第一列是1~10，第二列是11~20 ，后端就把他们的拿出来，创建一个数组接收 70 个数据，前端传递的数据是当前图片的id，id从1到70，这样比较容易弄。
    - 后端用2层循环，把数据添加到数组中；
      ```js
      var content = [];  // 存储70个数据
      for(var i=0; i<7; i++){
        for(var j=0; j<10; j++){
          content.push(data.getPhotoList.content[i].message[j]);
        }
      }
      ```

  4. 引入 评论组件 ，需传入一个参数，为当前页的评论，我对后端数据逻辑不太了解，只能忽略了。

- 2020.3.13
  1. 引入缩列图，使用到 vue-preview 插件，官方网站： [https://github.com/LS1231/vue-preview]
  - 查看官方文档，进行操作：
    1. `cnpm i vue-preview -S` 下载插件；
    2. 在 main.js 中导入
    ```js
    import VuePreview from 'vue-preview'
    Vue.use(VuePreview)
    ```
    3. 复制html 结构到对应的组件中
    ```html
    <template>
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </template>
    ```
    4. 最新的插件是通过 data 里面的值来渲染的，所以发起请求获取的值要存放到 data 中的 `slide1`，在赋值之前，需要对获取的值，添加几个必要的键值，分别是：
    - h ：点击浏览时的高；
    - w ：点击浏览时的宽；
    - msrc ：未点击时展示的图片；
    5. 然后记得在函数中添加这个方法： 
    ```js
    handleClose () {
        console.log('close event')
      }
    ```
    6. 渲染成功后，要修饰页面图片的话，要把 style 标签的scoped属性去掉，不然没有效果，但会污染到别的组件，所以在修饰时，最好起class名，不要用标签名，以上，今天写的更少了。
    7. Problems loading reference 'https://schemastore.azurewebsites.net/schemas/json/package.json': Unable to load schema from 'https://schemastore.azurewebsites.net/schemas/json/package.json': read ECONNRESET.
    出现了这个问题，不知道是哪里错了。
    - 再次重启就不会了。

- 2020.3.14
  1. 设置商品购买组件 goodsilst.vue, 修饰页面布局。
  2. 在手机端测试项目：
    - 在 package.json 中的 dev 配置添加 `--host 192.168.1.103` 后面为电脑连接wifi的无线ip地址，手机要和电脑连接同一个wifi，然后手机在浏览器访问 `192.168.1.103:3000` 就可以访问到项目了，其中会出现数据无法访问，我不知道手机的端口号，不知道怎么设置允许访问的 手机ip。
  3. 商品购买：创建虚拟数据，渲染页面，下一页操作。
    - 下一页，可以传递数据给后端，让后端传递每一页的数据，前端第一次默认传递出去的为0，可以在data里设置一个变量，默认值为0，当点击 加载更多 时，让整个变量自增，然后再调用请求函数，这时，传递的参数为1，就是下一页的数据。
    - 前端获取到下一页的数据，把他拼接在第一页数据的后面，就可以了，用 `concat`，进行数组的拼接，然后在点击数据中添加一个判断，判断页面，当页数超过后端传递过来的数据的页面时，显示 没有商品 了。
  4. 修改评论组件的评论内容，如果超出容量就截取，不显示。

- 2020.3.15
  1. 编程式导航，来进行路由的跳转。就是使用js来进行跳转，不是像之前的标签跳转如 a 标签等等。
  -  我们平常的 编程式导航 是用 BOM 浏览器对象来进行跳转，但 vue 就是不想让我们操作 这些元素，所以提供了对应的方法，this.$router
    - 步骤：
    1. 和我们之前的很类似，创建一个路由组件（ 创建 goodsinfo.vue 组件；
    2. 设置路由规则；
    3. 在上一个路由组件中的跳转元素上进行事件绑定，触发函数，函数中使用 `this.$router` 的方法。
    - this.$router 和 this.$route 方法很容易搞错：
      - this.$route 的功能是 获取路由中参数的值。
      - this.$router 是实现编程式导航。
    在方法中，有4中实现方法：
    ```js
     //方法1 字符串
    this.$router.push('/home/goodsinfo/' + id );  
     //方法2 对象
    this.$router.push({path: '/home/goodsinfo/'+id}); 
    //方法3 name 路由的新属性，要在路由规则中定义， params 传递的参数，也要和路由规则中参数名一致。
      // 在 router.js 中
      { path: '/home/goodsinfo/:id', component: Goodsinfo, name: 'goodsinfo' }
      // 组件方法中
      this.$router.push({ name: 'goodsinfo', params: { id: id }})
    //方法4 带查询参数，变成 /home/goodsinfo/?id=id, 这个是传递参数的第一种方式.
    this.$router.push({ path: '/home/goodsinfo/', query: { id: 'id' }})
    ```

  2. 用 miui 的 card 卡片样式，来搭建页面结构，一个单；一个页眉和内容；一个页眉、内容、页脚。

  3. 分离轮播图，创建一个轮播图组件，这样就可以要的时候，可以调用了，
    - 创建轮播图组件 swiper.vue,内容为：
    ```html
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    ```
    其中 `lunbotuList` 为渲染轮播图的图片数据，是根据每个调用的组件的数据，不同而定的，而且注意轮播图只渲染 img，如果是别的数据格式，要改一下数据成 item.img
    ```js
    export default{
      props: : ['lunbotuList']  // 获取 父元素传递过来的值。
    }
    ```
    - 调用轮播图组件步骤：
    1. 导入轮播图组件
    2. 注册组件 `components:{  swiper  }`
    3. 写标签，然后用 数据绑定 传递数据
    ```html
     <swiper :lunbotuList="goodinfo_luenbotu" ></swiper>
    ```
    4. 如果请求的数据中没有 img ，就修改获取到是数据
    ```js
        getLuenBoTu(){
      this.$http.get('http://127.0.0.1:5000/goodsinfo?callback='+ this.id ).then( res =>{
          res.body.message.forEach( item => {
            item.img = item.src  // 这里
          });
          this.goodinfo_luenbotu = res.body.message;
      }, err =>{
          console.log(err);
      })
    }
    ```

- 2020.3.16
  1. 轮播图组件使用他的地方很多，但是有的地方里面的图片宽度要100%，有的不要，要的可以要有其他的样式，这时就要灵活处理了，就宽度来说：
    - 首先，给轮播图组件 添加一个样式， 宽度100%，然后 props 添加一个接收参数，准备接收调用组件的人给组件传递一个 布尔值，然后在 vue 中使用 class 样式判断是否给他样式：
    1. 在 swiper.vue 
    添加一个样式：`.img_w{width: 100%;}`； 添加一个接收参数： `props: ['sf'] `；
    在标签上书写class行间 ` <img :src="item.img" :class="{img_w: sf}"/>` 他会判断，如果这个 sf 为 true 就使用 img_w 这个类的样式； 如果为 false 就不用。
    2. 在调用 轮播图 组件时，传递 fs 这个参数，告诉 轮播图组件 fs 的值。
    ```html
      <!-- 调用轮播图组件 -->
      <swiper :lunbotuList="goodinfo_luenbotu" :sf="true"></swiper>
    ```

  2. 把 mui 的数字输入功能， 作为一个公共组件： 
  - 需要初始化，首先导入mui.js 是 dist 文件夹里面的 mui.js 不是mui-master 下的 js 文件夹，不要导入错；
  - 在 mouted() 函数里进行初始化；

  3. 创建 图文介绍、商品评论 组件，使用 编程导航 来切换组件。


- 2020.3.17
  1. 对 图文介绍 和 商品评论 组件进行了数据的渲染
  2. 添加小球半场动画：
  - 首先用 transition 标签包裹小球；
  - css 修饰小球，用 v-show 对小球进行显示消失的控制，设置点击 添加购物车 触发事件，进行 布尔值的取反；
  - 在 transition 标签上添加 动画钩子函数
    - @before-enter=""  事件： 控制小球的初始位置。
    - @enter=""         事件： 设置小球终点位置，设置小球过渡，`el.offsetWidth`强制动画刷新， `done()`调用 @after-enter 事件，立即执行事件。
    - @after-enter=""   事件： 设置小球消失。
  - 可给小球设置该过渡动画： `transition: all 1s cubic-bezier(.28,-0.2,.40,.50);`

  3. 完善小球运动：
  - 因为我们小球的终点的写死的固定位置，所以但y轴移动移动的位置或屏幕分辨率发生了变化，小球的终点就出现了问题。
  - 技术点： 获取屏幕元素到屏幕的边框的距离。
    1. 终点的y轴 = 图标到屏幕顶部的位置 - 小球原始位置到屏幕顶部的位置；
    2. 终点的x轴 = 图标到左边屏幕的位置 - 小球原始位置到左边屏幕的位置；
    3. 就可以得到小球的终点位置，是活的数据。
    4. 用到 domObjec.getBoundingClientRect().上下左右 来获取。
  - 步骤：
    1. 获取各元素。


  

- 2020.3.18
  - 在改变 数字输入组件(goodsinfo_numbox.vue) 的数量时，把更改的数传递给 商品详情组件(Goodsinfo.vue) 页面
  1. 涉及到子组件给父组件传值：
    - 子组件给父组件传值，在父组件中定义一个函数，定义一个形参，在 子组件 标签上进行 事件绑定 @，子组件内部获取到事件，并传递文本框里改变的数据给 父元素。
      - 技术点：
      1. 来 data 里命名一个 变量，用来储存 *记录文本框改变的数据*；
      2. 给 子组件标签绑定事件；
      ```html
       <numbox class="numbox" @cdi="selectedCount"></numbox>
      ```
      3. 在 设置函数形参，获取数据，改变 data 的值；
      ```js
      selectedCount(avalue){  
        this.numvlue = avalue;  
      }
      ```
      
    - 获取文本框的数据： 数字输入组件 里面监听文本框的改变，数据一改变就调用函数，传递数据给父组件
      - 技术点，
      1. 监听文本框的改变，用 change 事件，改变文本框时，触发事件；
      ```html
            <input value="1" @change="getText" ref="atext"/>
      ```
      2. 用 ref 来获取 value 的值；`this.$refs.atext.value`
      3. 在 `getText()` 函数里，调用 `this.$emit('cid', Number(this.$refs.atext.value) )` 来 返回数据给 父组件。返回的数据要是个数字类型的。

    - 子组件获取到父组件库存的数量，从而改变 数字数组的最大值。
    1. 父给子传值。绑定属性，绑定的值为父组件 发起请求获取的数据，因为发起的请求是 异步操作， 所以在传递给子组件时，还没有执行完成，传递的数据为空的，所以在 子组件 接收时，可以使用 watch 来进行监听数据的变化。
    ```js
        props:['numboxs'],  // 接收父组件传递的值
        watch:{
            'numboxs': function(newVal, oldVal){
              //调用 mui 的 js api
              mui('.mui-numbox').numbox().setOption('max', newVal);
            }
        }
    ```

- 2020.3.19
  - 使用 vuex 事件管理模块，可以存放共享数据的：
    1. 下载： `cnpm i vuex -S`
    2. 导入: `import Vuex from 'vuex';  `
    3. 注册  `Vue.use(Vuex); `
    4. 创建 store 实例 
      ```js
        var store = new Vuex.Store({  // 创建 store 实例。
        state: { },
        mutations: { },
        getters: { }
      })
      ```
    5. 在 vm 实例中挂载： `store`

  - 把数据添加到 vuex 中：
    1. 当点击加入购物车，就把一些基本的数据添加到 vuex 里面，创建 `car : []` 来存储数据，存储的数据格式如下： `{ id，购买数量，价格，状态（购物车里的选中 }` 
    2. 步骤： 
      1） 在 Goodsinfo.vue 中的点击加入购物车事件中，先拼接好要返回的数据：
      ```js
        var goodsinfo = { 
          id: this.id,  
          count: this.numvlue, 
          price: this.goodsinfo.sell_price, 
          selected: true
        }
      ```
      2） 在 main.js 中的 vuex 实例中，写 操作 car 的方法。
      ```js
        var store = new Vuex.Store({
          state:{ 
              car:[] // 存储购物车数据。
          },
          mutations: {
            addToCar(state, goodsinfo){  // 接收数据
              console.log(state.car);// 可以拿到 car 数据。
            }
          }
        })
      ```

      3） 在 Goodsinfo.vue 中，调用 vuex 中 mutations 中定义的方法，传递参数过去。
      ```js
        // 调用 vuex 中定义的函数，传递数据
      this.$store.commit('addToCar', goodsinfo);
      ```

      4） 在 main.js 中的 vuex 实例中，进行购物车加入 数据的逻辑处理：
      ```js
        mutations: {
          addToCar(store, goodsinfo){
            /*判断当购物车情况：
            1，有同样商品时，增加数量；
            2. 没有同样的商品时，添加新的参数进去*/
            var flag = false;

            store.car.some( item =>{
              if( item.id ==  goodsinfo.id){
                   flag = true;
                  item.count += goodsinfo.count;
                  return true;  // 当找到 id 相同时，就停止寻找。
              }
            })

            if(flag == false){
              store.car.push(goodsinfo);
            }
          }
        }
      ```

- 2020.3.20
  - 点击 加入购物车，让购物车徽标进行同步增加。
    1. 在 main.js 的 vuex 实例中的 getters 定义一个方法，用来计算购物车中商品的数量，记得返回给函数。
      ```js
        getters: {   // 功能： 监听数据变化触发函数； 过滤器。
          getAllCount(state){  
            var c = 0;
            state.car.forEach( item =>{
              c += item.count;
            })
            return c;   // 返回，调用函数时，就能得到 c
          }
        }
      ```
    2. 在 App.vue 中的徽标显示数据处 调用 定义的计算商品数量的函数。
      ```html
         <span class="mui-badge" id="label"> {{ $store.getters.getAllCount }} </span>
      ```

  - 将购物车里的数据保存到本地存储中。
    1. 在 main.js 中，在 addToCar() 函数处理car 数据后，把 car 里的数据存储到本地存储中：
      ```js
        localStorage.setItem('car', JSON.stringify(stort.car));
      ```
    2. 在 页面 加载时，从 本地存储 中拿取数据，同步到 store.car 中：
    在 创建 store 实例前 定义一个变量，获取 数据，然后在 实例中赋予 car
      ```js
        var car = JSON.parse( localStorage.setItem('car') || '[]' );
        /* 防止一开始本地存储可空的，读取到的为 null， null 赋予 car 可能会报错，car 为空的，下面的处理怎么进行 遍历，push 呢，所以要给他赋予一个 数组。 */

        var store = new Vuex.Store({
          state: {
            car: car
          }
        })
      ```


    

  - 渲染购物车组件样式

  - 发起请求 获取 商品的数据，渲染购物车数据。
    1. 从 vuex 中获取 car 数组中的购物车商品，循环遍历每一项，得到每一项商品的id，拿到多个id，以逗号分隔开，作为请求数据的参数，传递给后端。
    2. 后端根据发送的 id， 返回数据给前端，前端拿到数据渲染到页面。
      - 用之前的商品详情的数据，进行循环，全部拿出来赋予一个数组，然后把传递的参数们（id, 转换成数组，用 some 来进行判断 商品详情的数据中的id，和 参数中的id 相等，就 push 给一个新的数组，然后 把这个数组返回给前端。
      ```js
        //  商品购物车信息
      app.get('/getcarinfo', function(req, res){
        res.header('Access-Control-Allow-Origin', "http://localhost:3000");

        // 获取传递过来的 id
        var callback_arr = []
        var urls = url.parse( req.url, true );
        callback_arr = urls.query.callback.split(',');  // 1,2,4 => [ '1', '2', '4' ]
      
        // 获取 数据
        var arrays = []
        for(var i=0; i<3; i++){
          for(var j=0; j<5; j++){
            arrays.push(data.gooslist.content[i].message[j]);
          }
        }
        var return_set = [];

        arrays.some(item =>{   
          for(var i=0; i<callback_arr.length; i++){ 
            if( callback_arr [i] == item.id ){ 
              return_set.push(item); 
            }
          }
        })
        
        res.send(return_set);
      })
      ```
    3. 渲染好后，之前的开关点不了了，原来的因为初始化时期不对的原因，之前没有数据的渲染，是在 *mouted ( 初始化阶段的最后一个阶段，把内存中渲染的data模板，挂载到页面上，刚刚渲染好，初始化的数据。)* 但 我们是在 发起请求 获取到数据，后才进行渲染页面的，也就是说 data 里的数据被我们改变了，所以要在 *运行阶段* 的 `updated` 阶段初始化开关。


- 2020.3.21
  - 同步 数字输入框 的数据：
    1. 循环 car 本地存储中的数据，拿出id 和 cou，拼接成一个数组，格式为 `{ id:cou }`，id作为 键， cou 作为 值；这样才可以 `数组.id` 就能拿到对应的数量， 在进行请求数据渲染的时候，数据里面有id这一项， 我们可以把他作为我们的索引，来输出我们数组中 id 对应的 cou。
      - 步骤：
        1. 循环 本地数据就就是 car 中的值，拿出每一项的 id 和 count, 组成 {id:count} ==> {1：3} 
        ```js  
          getgoodsinfomun(state){  // 在 vuex 的 getters 中
            var counts = {};
            state.car.forEach( item =>{
              counts[item.id] = item.count;
            })
            return counts;
          }
        ```
        这里要记住，创建的 counts 要是对象，才可以  `counts[item.id] = item.count;` 写, 如果是 [], 要用 push 方法：
        ```js
           state.car.forEach( item => {
            counts.push( {id:item.id , count:item.count} );  // =>  { id:xx, count:xx }
          })
        ```
        但不是我们要的结果。
        
        2. 在 商品详情组件 中，调用 `$store.getters.方法名` 的方法获取 vuex 中的数据，再用 属性绑定 传递给 数字输入组件。
        ```html
          <shopcar-numbox class="numbox" :shoppingId="$store.getters.getgoodsinfomun[item.id]"></shopcar-numbox>
        ```
        用 之前请求的数据中的id值，来获取每条数据的id。

        3. 数字输入组件  用 `props:['方法名']` 接收到, 然后渲染上页面。
        ```html
            <input id="test" class="mui-input-numbox" type="number" :value="shoppingId"/>
        ```

  - 点击 购物车组件 上的 数字输入框，将数据同步到     