
// Operation Cookie
export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  const arr = document.cookie.match(reg);
  if (arr) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}

export function delCookie({ name, domain, path }) {
  if (getCookie(name)) {
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' +
      path + '; domain=' +
      domain;
  }
}

// Operation LocalStorage
export function setLocalStorage(key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

export function setSessionStorage(key, value) {
  return sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key) {
  const value = JSON.parse(sessionStorage.getItem(key));
  return value;
}

/**
 * 判断是否为空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj){
  for(var n in obj){return false}
  return true;
}
