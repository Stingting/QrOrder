import {getDishDetail} from "../src/services/customer";

const Mock=require('mockjs');
module.exports={
  //获取商家信息
  [`POST /v1/customer/home/`](req,res){
    const data = Mock.mock({
      "count": 50774,
      "data|1-20": [
        {
          "desc|1-20": "简介",
          "name|1-5": "菜名",
          "pic": "@IMAGE(200x200)",
          "price": "@id"
        }
      ],
      "desc|1-20": "简介",
      "name|1-5": "名称",
      "pic|1-5": [
        "@IMAGE(200x200)"
      ]
    });
    res.json(data);
  },

  //获取菜单列表
  [`POST /v1/customer/menu/`](req,res){
    const data = Mock.mock({
      'data': {
          "count": 70500,
          "desc|0-30": "简介",
          "name|1-5": "菜名",
          "pic": "@image(200x200, @color, @name)",
          "price": 61370,
          "saleCount": 68771,
          "type|1-2": "种类"
      }
    });
    res.json({
      success: true,
      result: data.data,
    });
  },

  //获取菜式详情
  [`POST /v1/customer/menu/detail`](req,res){
    const data = Mock.mock({
      "count": 11802,
      "desc|0-30": "简介",
      "name|1-5": "菜名",
      "pic": "@IMAGE(200x200, @color,@name)",
      "price": 42353,
      "saleCount": 73500,
      "type|1-2": "种类"
    });
    res.json(data);
  },

  //获取聊天室信息
  [`POST /v1/customer/chatRoom/`](req,res){
    const data = Mock.mock({
      'data': {
        "count": 66463,
        "num": 20614,
        "remark": "测试内容9adj",
        "words|1-3": [
          "快速回复1",
          "快速回复2",
          "快速回复3",
          "快速回复4",
          "快速回复5"
        ]
      }
    });
    res.json(data.data);
  },

  //获取聊天记录
  [`POST /v1/customer/chatRecord`](req,res){
    const data = Mock.mock({
      'data': [
        {
          "content|1-10": "内容",
          "head": "@IMAGE",
          "time": "@time"
        }
      ]
    });
    res.json(data.data);
  },

  //获取订单列表
  [`POST /v1/customer/order`](req, res) {
    const data = Mock.mock({
      "data|1-3": [
      {
        "list|1-10": [
          {
            "count": 11403,
            "dashId": "测试内容41b6",
            "name|1-5": "菜名",
            "pic": "@IMAGE(100x100)",
            "price": 86473,
            "type|1-2": "种类"
          }
        ],
        "nickName": "测试内容3715",
        "price": 28553
      }
    ],
      "price": 3434343

    });
    res.json(data);
  },

  //删除已支付订单
  [`POST /v1/customer/order/delete`](req, res) {
    const data = Mock.mock({
      "isOk": true
    });
    res.json(data);
  },

  //获取订单详情
  [`POST  /v1/customer/orderDetail/`](req,res) {
    const data = Mock.mock({
      "count": 38144,
      "data|1-3": [
        {
          "list|1-10": [
            {
              "count": 38844,
              "name|1-5": "菜名",
              "price": 21122,
              "type|1-2": "种类"
            }
          ],
          "nickName": "测试内容fc1s",
          "price": 88207
        }
      ],
      "price": "测试内容sby0",
      "remark": "测试内容yx12"
    });
    res.json(data);
  }
};
