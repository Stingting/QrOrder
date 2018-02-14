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
  return request('/v1/customer/menu/' + merchantId, {
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


//获取订单列表
export function getPayList(merchantId, isPaid) {
  return request('/v1/customer/order', {
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


