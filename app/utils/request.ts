import axios from 'axios';
// import baseDomain from './config.js';
import { notification } from 'antd';

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = false;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';

// const instance = axios.create({
//   xsrfCookieName: 'xsrf-token',
//   baseURL: 'http://127.0.0.1:7001'
// });

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function(response) {
  // 1.成功
  if (response.data.success) {
    return Promise.resolve(response.data);
  } else {
    notification.error({
      message: response.data.message
    });
    return Promise.reject({
      message: response.data.message
    });
  }

  // // 2.session过期
  // if (!response.data.success && response.data.messageCode === globalCode.timeout) {
  //     Toast.hide();
  //     Toast.info("会话过期，请重新登录", 1);
  //     createHashHistory().push('/login');

  //     // 定义一个messagecode在后面会用到
  //     return  Promise.reject({
  //         messageCode: 'timeout'
  //     })
  // }

  // // 3.11111111 系统异常、网络异常
  // if (response.data.success && response.data.messageCode === globalCode.busyCode) {
  //     Toast.hide();
  //     Toast.info(response.data.message, 1);
  //     return  Promise.reject({
  //         messageCode: 'netError'
  //     })
  // }

  // 3.其他失败，比如校验不通过等
}, function(error) {
  // 4.系统错误，比如500、404等
  try {
    notification.error({
      message: error.response.data.message || '系统异常'
    });
    // 登录授权
    if (error.response.status === 401) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  } catch (err) {
    notification.error({
      message: '系统异常，请稍后重试！'
    });
  }
  return Promise.reject({
    messageCode: 'sysError'
  });
});

function get(url: string, params: any): any {
  const options = {
    method: 'get',
    url: `${url}`,
    params
  };
  return axios(options);
}

function post(url: string, data: any): any {
  const options = {
    method: 'post',
    url: `${url}`,
    data,
    isClientReq: true
  };
  return axios(options);
}

export default { get, post };
