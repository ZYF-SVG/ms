//  创建vue项目的服务器
const express = require('express');
const url = require('url');
//  导入对 post 请求进行解析的中间件
const bodyParser = require('body-parser');

// 导入数据生成的文件。
const data = require('./data');

var app = express();
// 对请求过来是数据进行 解析。
app.use(bodyParser.json());
// 会把请求的数据，放在 body 里面。
app.use(bodyParser.urlencoded());

/* 请求新闻内容的 */
app.get('/newsInfo', function(req, res){
  // 解析接收的 rul
  var urls = url.parse(req.url, true); 
  // 获取传递过来的 id
  var callback = urls.query.callback;

  // 输入和 浏览器搜索框里的一样，不用加 / 在后面。
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // 根据传递过来的 ID ，返回不同的内容。
  var returnId = data.tities.messame[callback-1];
  res.send( returnId );
})

/** 请求评论内容 */
app.get('/comment', function(req, res){
  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;

  // console.log('id:' + callback);
  // console.log(data.comment.comment[0]);

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  
  res.send(data.comment.comment[callback-1]);
})

/** 接收前端发送过来的评论内容 */
app.post('/postcomment', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  
  var urls = url.parse(req.url, true);

  var callback = urls.query.callback ;
  // console.log('id:' + callback);
  
  var content = req.body;  // 获取到前端post的数据
  res.send('发送成功');
})

/** 图片分类 */
app.get('/photoList', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log('有人访问图片分类接口');
  res.send(data.photoList);
})

/**图片列表 */
app.get('/getPhotoList', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;  // 获取前端传递过来的 id
  console.log(callback)

  console.log('有人访问图片列表接口');
  // 返回 对应的列表内容
  res.send(data.getPhotoList.content[callback]);
})

/**图片评论内容 */
app.get('/photoInfo', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback ;
  // console.log( callback );

  /* 数据 和 图片列表数据一样的，只是要进行处理，把里面的每一项都添加到
  一个数组里，然后根据前端传递的id号，返回对应的每一项，因为前端的图片列表的
  id是从1开始加的，第一列要10个，第二列是从11开始的，所以可以这样弄。
  */
var content = [];  // 存储70个数据
for(var i=0; i<7; i++){
  for(var j=0; j<10; j++){
    content.push(data.getPhotoList.content[i].message[j]);
  }
 }
//  console.log(content);
console.log('有人访问图片内容接口');

  res.send(content[callback-1]);
})

/**图片详情缩列图 */
app.get('/getthumbs', function(req, res){
  res.header("Access-Control-Allow-Origin","http://localhost:3000");

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;
  // console.log(callback);

  res.send(data.getthumbs.content[callback-1].message);
})

/**商品列表 */
app.get('/gooslist', function(req, res){
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;
  // console.log(callback);

  res.send(data.gooslist.content[callback]);
})

// 商品详情页面轮播图
app.get('/goodsinfo', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;
  // console.log(callback);

  res.send(data.getthumbs.content[callback-1]);

})

// 商品详情信息数据，使用 gooslist 数据，添加几个数据进去。
app.get('/goodsinfos', function( req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  var urls = url.parse(req.url, true);
  var callback = urls.query.callback;
  console.log(callback);

  var arrays = []
  for(var i=0; i<3; i++){
    for(var j=0; j<5; j++){
      arrays.push(data.gooslist.content[i].message[j]);
    }
  }
  res.send(arrays[callback-1]);
})

// 商品图文介绍
app.get('/goodsdesc', function(req, res){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  var urls = url.parse( req.url, true );
  var callback = urls.query.callback;
  console.log("商品id" + callback);

  res.send(data.goodsinfo.content[0].message[callback]);
})

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
  // console.log(arrays);
  // 根据 id们 获取对应的数据
  var return_set = [];

  arrays.some(item =>{     // 循环arrays 的每一项，进行以下条件判断
    for(var i=0; i<callback_arr.length; i++){  // 循环，拿出 callback_arr 的每一项
      if( callback_arr [i] == item.id ){       // 如果 arrays 当前项 == callback_arr 当前项的 id
        return_set.push(item);   // 就把 arrays 当前项 push 到 return_set 数组 中。
      }
    }
  })
  // console.log(return_set);
  
  res.send(return_set);
})

app.listen(5000, function(){
  console.log('5000端口，服务器已开启');
})