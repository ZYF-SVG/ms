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

