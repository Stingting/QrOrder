import request from '../utils/request';
import constant from '../config';

//获取商家详情
export function getMerchantInfo(merchantId) {
  /*return request('/v1/customer/home/'+ merchantId, {
    method: 'POST'
  });*/
  return request('/v1/customer/home', {
    method: 'POST'
  });
}

//获取菜式详情
export function getDishDetail(merchantId, dishId) {
  return request('/v1/customer/menu/detail', {
    method : 'POST'
  });
}


//获取菜单列表
export function getMenu(merchantId, page, size) {
  return request('/v1/customer/menu/', {
    method :'POST'
  });
}

//获取聊天室信息
export function getChatRoomInfo(merchantId, tableNum) {
 /* return request('/v1/customer/chatRoom/' + merchantId + "/" + tableNum, {
    method: 'POST'
  })*/
 return request('/v1/customer/chatRoom/', {
    method: 'POST'
  })
}

//获取聊天记录
export function getChatRecord(merchantId, tableNum) {
  return request('/v1/customer/chatRecord', {
    method:'POST'
  })
}


//获取已支付订单列表
export function getPaidList(merchantId, isPaid) {
  return request('/v1/customer/order', {
    method:'POST'
  })
}

//获取未支付订单列表
export function getUnPaidList(merchantId, isPaid) {
  return request('/v1/customer/unpaidorder', {
    method:'POST'
  })
}

//删除订单菜式
export function deleteDish(dishId, orderId) {
  return request('/v1/customer/order/delete', {
    method:'POST'
  })
}

//获取订单详情
export function getOrderDetail(merchantId, orderId) {
  return request('/v1/customer/orderDetail', {
    method : 'POST'
  })
}


//获取用户收藏的菜单列表
export function getCollectList(merchantId, page, size) {
  return request('/v1/customer/user/collectList', {
    method :'POST'
  })
}

//收藏、取消收藏
export function changeCollect(dishId, merchantId, isCollect) {
  return request('/v1/customer/menu/collect', {
    method :'POST'
  })
}


//加入购物车、增加、减少购买数量
export function changePurchaseNum(count,dashId,id,type) {
  return request('/v1/customer/menu/purchaseNum', {
    method:'POST'
  })
}

//确认订单
export function confirmOrder(dishes, merchantId, personNum, tableNum) {
  return request('/v1/customer/order/confirmOrder', {
    method:'POST'
  })
}



