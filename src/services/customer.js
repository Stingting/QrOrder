import request from '../utils/request';
import constant from '../config';

//获取商家详情
export function getMerchantInfo(merchantId) {
  return request('/v1/customer/home/'+ merchantId, {
    method: 'POST'
  });
}

//获取菜式详情
export function getDishDetail(merchantId, dishId) {
  return request('/v1/customer/menu/' + merchantId + '/' + dishId, {
    method : 'POST'
  });
}


//获取菜单列表
export function getMenu(merchantId, page, size) {
  return request('/v1/customer/menu/' + merchantId, {
    method :'POST'
  });
}

//


