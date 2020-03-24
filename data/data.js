var Mock = require('mockjs');

// 新闻内容
var tities = Mock.mock({
  "messame|10" : [
    {
      "status": 0,
      "message": [
        {
          "id|+1": 1,
          "title": "@cparagraph(1)",
          "click": "@increment(5)",
          "add_time": "@date",
          "content": "<p>@cparagraph(5)</p>"
        }
      ]
    }
  ]
})

//  评论数据
var comment = Mock.mock({
  'comment|10': [   //comment[n]  来区分 第几列的
    {
      'status': 0,
      'datas|10': [    // 每页的评论内容
        {
          'status': 0,
          'message': 
            {
              'user_name': "@cname",
              'add_time': "@Date",
              'content': "@cparagraph(1)"
            }
          
        }
      ]
    }
  ]
})

// 图片分类
var photoList = Mock.mock({
  "content":[
    {
      'status': 0,
      'message|7':[
        {
          'title': "@cname",
          'id|+1': 1
        }
      ]
    }
  ]
})

// 图片列表数据
var getPhotoList = Mock.mock({
  "content|7":[  // 用id来区分每一列
    {
      "status": 0,
      "message|10": [   // 每一列的内容，要10条数据。
        {
          "id|+1": 1,
          "title": "@cparagraph(1)",
          "click": "@increment(5)",
          "img_url": "@image(300x250)",
          "zhaiyao": "@cparagraph(5)",
          "add_time": "@date",
        }
      ]
    }
  ]
})

// 图片缩列图
var getthumbs = Mock.mock({
  "content|10": [
    {
      "status": 0,
      "message": [
        { "src": "@image(300x250,#EACDCD)" },
        { "src": "@image(300x250,#DAEACD)" },
        { "src": "@image(300x250,#CDE6EA)" },
        { "src": "@image(300x250,#D1CDEA)" },
        { "src": "@image(300x250,#E8CDEA)" },
        { "src": "@image(300x250,#EACDCF)" }
      ]
    }
  ]
})

// 商品列表
var gooslist = Mock.mock({
  "content|3":[    // 页数
    {
      "status": 0,
      "message|5":[   // 每页的数据
        {
          "id|+1": 1,
          "title": "@cparagraph(1)",  // 标题
          "add_time": "@date",    //时间
          "zhaiyao": "@cparagraph(2)",  //摘要
          "click": 0,   // 点击
          "img_url": "@image(300x250,#EACDCD)", //图片
          "sell_price": "@increment(800)",   // 新价格
          "market_price": "@increment(900)",  //老价格
          "stock_quantity": "@increment(60)",  // 剩下件数
          "goods_no": "DS@integer(20000000,30000000)" // 编号
        }
      ]
    }
  ]
})

// 商品信息
var goodsinfo = Mock.mock({
  "content":[
    {
      "status": 0,
      "message":[
        {
          "id": 1,
          "title": "@cparagraph(1)",
          "content": "<p>@cparagraph(5)</p>",
          "img": 'http://img30.360buyimg.com/popWaterMark/jfs/t23368/24/202214879/163477/10a28105/5b289cddN7625b253.jpg'
        },
        {
          "id": 2,
          "title": "@cparagraph(1)",
          "content": "<p>@cparagraph(5)</p>",
          "img": 'https://img10.360buyimg.com/imgzone/jfs/t1/91296/12/3140/2624684/5ddb62ebEb5a36cb6/c9ad13cb41889821.jpg'
        },
        {
          "id": 3,
          "title": "@cparagraph(1)",
          "content": "<p>@cparagraph(5)</p>",
          "img": 'http://img30.360buyimg.com/popWaterMark/jfs/t23368/24/202214879/163477/10a28105/5b289cddN7625b253.jpg'
        }
      ]

    }
  ]
})


// console.log(gooslist.content[0].message);
module.exports = {
  tities,
  comment,
  photoList,
  getPhotoList,
  getthumbs,
  gooslist,
  goodsinfo
}

