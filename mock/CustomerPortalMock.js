const Mock=require('mockjs');
module.exports={
  [`POST /api/getRecDishes`](req,res){
    const data = Mock.mock({
      'data|6': [{
        'id|+1': 1,
        dishName: '菜式'+ '@id'
      }]
    });
    res.json({
      success: true,
      result: data.data,
    });
  }
}
