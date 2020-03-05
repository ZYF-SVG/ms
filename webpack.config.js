// node 的语法，引入 path 模板， 暴露一个配置对象
const path = require('path');
// 导入 生成 html 页面的模板
const htmlWebapckPlugin = require('html-webpack-plugin');
// 引入使用 vue 所需的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 配置对象
module.exports = {

  // entry  入口，要进行打包的文件
  entry: path.join(__dirname, './src/main.js'),
  // output  出口， 打包好的文件
  output: {
    //打包文件存放的地址
    path: path.join(__dirname, './dist'),
    //打包文件的名字
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebapckPlugin ({
      // 指定一个模板， 在内存中生成。
      template: path.join(__dirname, "./src/index.html"),
      // 生成页面的名字。
      filename: "index.html"
    }),
    // 处理 vue 的
    new VueLoaderPlugin()
  ],
  // 设置插件的配置规则
  module: {
    rules:[
      { test: /\.css$/, use:['style-loader', 'css-loader'] },
      { test: /\.less$/, use:['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use:['style-loader', 'css-loader', 'sass-loader'] },
      // 处理图片 路径的 loader  图片大小：99,815 
      { 
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        //  use: 'url-loader?limit=99,815&name=[hash:8]-[name].[ext]' , potions: 'esModule: false' },
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,  // 这样在子组件引进的图片就不会为 [object Module] 了
            limit: 7246,
            name: '[hash:8]-[name].[ext]'
          }
        }]
      },
      
         { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // 处理 vue 文件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },
  resolve:{
    alias: {  // 设置 导入 vue 时，的导包路径
      "vue$": "vue/dist/vue.js"
    }
  },

  mode: 'development'  // 设置他的 mode 模式
}