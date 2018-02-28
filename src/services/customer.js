import request from '../utils/request';
import constant from '../config';
import qs from 'qs';
import {getSessionStorage} from "../utils/helper";

/**
 * 登录
 * @param params
 * @returns {Object}
 */
export function login(params) {
  return request('/v1/user/login', {
    method:'POST',
    headers:{
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body:qs.stringify(params)
  })
}


/**
 * 获取商家详情
 * @param merchantId
 * @returns {Object}
 */
export function getMerchantInfo(merchantId) {
  return request(`/v1/home/${merchantId}`, {
    method: 'GET',
    headers: {
      authorization:constant.authorization
    }
  });
}

/*
*获取菜式详情
 */
export function getDishDetail(merchantId, dishId) {
  return request(`/v1/menu/${merchantId}/${dishId}`, {
    method : 'GET',
    headers: {
      authorization:constant.authorization
    }
  });
}


/**
 * 获取菜单列表
 * @param merchantId
 * @returns {Object}
 */
export function getMenu(merchantId) {
  return request(`/v1/menu/${merchantId}`, {
    method :'GET',
    headers:{
      authorization:constant.authorization
    }
  });
}

/**
 * 获取聊天室信息
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRoomInfo(merchantId, tableNum) {
 return request(`/v1/customer/chatRoom/${merchantId}/${tableNum}`, {
    method: 'get',
    headers:{
     authorization:getSessionStorage("token")
    }
  })
}

/**
 * 获取聊天记录
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRecord(merchantId, tableNum) {
  return request(`/v1/customer/chatRecord/${merchantId}/${tableNum}`, {
    method:'get',
    headers:{
      authorization:getSessionStorage("token")
    }
  })
}


/**
 * 获取已支付订单列表
 * @param merchantId
 * @returns {Object}
 */
export function getPaidList(merchantId) {
  return request(`/v1/order${merchantId}`, {
    method:'get',
    headers: {
      authorization:constant.authorization
    }
  })
}

//获取未支付订单列表
export function getUnPaidList(merchantId) {
  return request(`/v1/shopping/${merchantId}`, {
    method:'get',
    headers: {
      authorization:constant.authorization
    }
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

/**
 * 收藏、取消收藏食物
 * @param dishId
 * @param merchantId
 * @param isCollect
 * @returns {Object}
 */
export function changeCollect(dishId, merchantId, isCollect) {
  const params = {
    id:merchantId,
    foodId:dishId,
    isCollect:isCollect
  };
  return request(`/v1/menu/collect/${merchantId}/${dishId}`, {
    method :'PUT',
    headers: {
      authorization:constant.authorization,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body:qs.stringify(params)
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



