import request from '../utils/request';
import qs from 'qs';
import {getSessionStorage} from "../utils/helper";


export const ContentType = {
  JSON : "application/json;charset=UTF-8",
  FORM : "application/x-www-form-urlencoded; charset=UTF-8"
};

export const HttpMethod = {
  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  PATCH : "PATCH",
  DELETE : "DELETE",
  OPTIONS : "OPTIONS"
};

/**
 * 封装header
 * @returns {{"Content-Type": string}}
 */
const getTokenHeaders = () => {
  return {
    authorization:getSessionStorage("token")
  }
};
/**
 *
 * @returns {{"Content-Type": string, authorization}}
 */
const getTokenFormHeaders = () =>{
  return {
    "Content-Type": ContentType.FORM,
    authorization:getSessionStorage("token")
  }
};

/**
 *
 * @returns {{"Content-Type": string}}
 */
const getNoTokenFormHeader = () =>{
  return {
    "Content-Type": ContentType.FORM,
  }
};

/**
 * 获取微信授权认证登录url
 * @returns {Object}
 */
export function wechatAuth() {
  return request(`/v1/wechat/auth`, {
    method: HttpMethod.GET
  });
}

/**
 * 获取微信用户信息
 * @param code
 * @param state
 * @returns {Object}
 */
export function getUserInfo(code,state) {
  return request(`/v1/wechat/userinfo?code=${code}&state=${state}`, {
    method : HttpMethod.GET
  })
}

/**
 * 获取商家详情
 * @param merchantId
 * @returns {Object}
 */
export function getMerchantInfo(merchantId) {
  return request(`/v1/home/${merchantId}`, {
    method: HttpMethod.GET,
    headers: getTokenHeaders()
  });
}

/*
*获取菜式详情
 */
export function getDishDetail(merchantId, dishId) {
  return request(`/v1/menu/${merchantId}/${dishId}`, {
    method : HttpMethod.GET,
    headers: getTokenHeaders()
  });
}


/**
 * 获取菜单列表
 * @param merchantId
 * @returns {Object}
 */
export function getMenu(merchantId) {
  return request(`/v1/menu/${merchantId}`, {
    method :HttpMethod.GET,
    headers:getTokenHeaders()
  });
}

/**
 * 获取聊天室信息
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRoomInfo(merchantId, tableNum) {
 return request(`/v1/table/${merchantId}/${tableNum}`, {
    method: HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 获取聊天记录
 * @param merchantId
 * @param tableNum
 * @returns {Object}
 */
export function getChatRecord(merchantId, tableNum) {
  return request(`/v1/chat/${merchantId}/table/${tableNum}`, {
    method:HttpMethod.GET,
    headers:getTokenHeaders()
  })
}


/**
 * 获取已支付订单列表
 * @param merchantId
 * @param tableNum
*  @param status 1 : 未支付， 2：已支付， 10：所有
 * @returns {Object}
 */
export function getPaidList(merchantId,tableNum,status) {
  return request(`/v1/order/${merchantId}/table/${tableNum}?status=${status}`, {
    method:HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

/**
 * 获取未支付订单列表
 * @param merchantId
 * @param tableNum
 * @param status 1 : 未支付， 2：已支付， 10：所有
 * @returns {Object}
 */
export function getUnPaidList(merchantId,tableNum,status) {
  return request(`/v1/order/${merchantId}/table/${tableNum}?status=${status}`, {
    method:HttpMethod.GET,
    headers:getTokenHeaders()
  })
}

//删除订单菜式(暂时不用删除)
export function deleteDish(dishId, orderId) {
  return request('/v1/customer/order/delete', {
    method:'POST'
  })
}

//获取订单详情
export function getOrderDetail(merchantId, orderId) {
  return request(`/v1/order/${merchantId}/${orderId}`, {
    method : HttpMethod.GET,
    headers: getTokenHeaders()
  })
}


//获取用户收藏的菜单列表
export function getCollectList(merchantId) {
  return request(`/v1/menu/collect/${merchantId}`, {
    method :HttpMethod.GET,
    headers:getTokenHeaders()
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
    method :HttpMethod.PUT,
    headers: getTokenFormHeaders(),
    body:qs.stringify(params)
  })
}


//加入购物车、增加、减少购买数量
export function changePurchaseNum(num,foodId,id,type,tableId) {
  const params = {
    foodId:foodId,
    id:id,
    num:num,
    type:type,
    tableId:tableId
  };
  return request(`/v1/shopping/${id}/table/${tableId}`, {
    method:HttpMethod.PUT,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  })
}

//确认下单(去结算)
export function confirmOrder(shoppingCartId, merchantId, personNum, tableNum) {
  const params = {
    personNum:personNum,
    tableId:Number(tableNum),
    shoppingCartId:shoppingCartId
  };
  return request(`/v1/order/${merchantId}`, {
    method:HttpMethod.POST,
    headers:getTokenFormHeaders(),
    body:qs.stringify(params)
  })
}

/**
 * 确认支付订单
 * @param merchantId
 * @param orderId
 * @returns {Object}
 */
export function confirmPay(merchantId, orderId) {
  return request(`/v1/order/${merchantId}/confirm/${orderId}`, {
    method :HttpMethod.POST,
    headers:getTokenHeaders()
  })
}

/**
 * 加入餐桌, 清桌
 * status 3:加入, 4:清理
 * @param params
 * @returns {Object}
 */
export function addOrCleanTable(params) {
  return request(`/v1/table/${params.merchantId}`, {
    method :HttpMethod.PUT,
    headers: getTokenFormHeaders(),
    body:qs.stringify(params)
  })
}


/**
 * 获取购物车列表
 * @param merchantId
 * @param tableId
 * @returns {Object}
 */
export function getCartList(merchantId, tableId) {
  return request(`/v1/shopping/${merchantId}/table/${tableId}`, {
    method :HttpMethod.GET,
    headers:getTokenHeaders()
  })
}


