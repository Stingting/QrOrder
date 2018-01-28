import request from '../utils/request';
import constant from '../config';


export function getRecDishes() {
  return request('/api/getRecDishes', {
    method: 'POST'
  });
}

export function getDishDetail(id) {
  return request('/api/getDishDetail', {
    method : 'POST'
  });
}
