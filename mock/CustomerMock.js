import {getDishDetail} from "../src/services/customer";

const Mock=require('mockjs');
module.exports={
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
    res.json({
      success: true,
      result: data.data,
    });
  },

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

  [`POST /v1/customer/chatRecord'`](req,res){
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
  }
};
