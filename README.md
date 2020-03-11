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