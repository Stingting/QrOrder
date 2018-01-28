import {getDishDetail} from "../src/services/recDishes";

const Mock=require('mockjs');
module.exports={
  [`POST /api/getRecDishes`](req,res){
    const data = Mock.mock({
      'data|6': [{
        'id|+1': 1,
        dishName: '菜式'+ '@id',
        image: '@image(200x200, @color, @dishName)',
        price:'@id'
      }]
    });
    res.json({
      success: true,
      result: data.data,
    });
  },

  [`POST /api/getDishDetail`](req,res){
    const data = Mock.mock({
      'data': {
        'id': 1,
        dishName: '菜式'+ '@id',
        image: '@image(200x200, @color, @dishName)',
        price:'@id'
      }
    });
    res.json({
      success: true,
      result: data.data,
    });
  }
}
