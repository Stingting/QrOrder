import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  /*if (response.status >= 200 && response.status < 300) {
    return response;
  }
  */
  if(response.status ===504 || response.status ===404) {
    const error = new Error(`请求服务器资源失败！`);
    error.response = response;
    throw error;
    return response;
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
