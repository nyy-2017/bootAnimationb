/* eslint-disable no-case-declarations */
import axios from "axios";
import router from "vue-router";
import qs from "qs";
import store from "../store";
import * as types from "../store/types";
axios.defaults.timeout = 10000;
// 后台基准路径
axios.defaults.baseURL = "http://127.0.0.1";
// 返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    // POST || PUT || DELETE请求时先格式化data数据
    // 这里需要引入第三方模块qs
    // eslint-disable-next-line no-debugger
    debugger;
    if (
      config.method.toLocaleUpperCase() === "POST" ||
      config.method.toLocaleUpperCase() === "PUT" ||
      config.method.toLocaleUpperCase() === "DELETE"
    ) {
      config.data = qs.stringify(config.data);
    }
    // 配置Authorization参数携带用户token
    if (store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  error => {
    // 此处应为弹窗显示具体错误信息，因为是练手项目，劣者省略此处
    // 君可自行写 || 引入第三方UI框架
    // eslint-disable-next-line no-console
    console.error(error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    // 这段代码很多场景下没用
    if (response.data && response.data.success === false) {
      // 根据实际情况的一些处理逻辑...
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    // 此处报错可能因素比较多
    // 1.需要授权处用户还未登录，因为路由段有验证是否登陆，此处理论上不会出现
    // 2.需要授权处用户登登录过期
    // 3.请求错误 4xx
    // 5.服务器错误 5xx
    // 关于鉴权失败，与后端约定状态码为500
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        store.commit(types.LOGOUT);
        router.replace({
          path: "login",
          query: { redirect: router.currentRoute.fullPath }
        });
      // eslint-disable-next-line no-fallthrough
      case 403:
        // 一些处理...
        break;
      case 404:
        // 一些处理...
        break;
      case 500:
        // eslint-disable-next-line no-case-declarations
        // eslint-disable-next-line no-undef
        let userData = getUserData();
        if (userData.token === undefined) {
          // 此处为未登录处理
          // 一些处理之后...再去登录页面...
          // router.push({
          //  path: '/login'
          // })
        } else {
          let overdueTime = userData.overdueTime;
          let nowTime = +new Date();
          if (overdueTime && nowTime > overdueTime) {
            // 此处登录过期的处理
            // 一些处理之后...再去登录页面...
            // router.push({
            //  path: '/login'
            // })
          } else {
            // 极端情况，登录未过期，但是不知道哪儿错了
            // 按需处理吧...我暴力回到了首页
            router.push({
              path: "/"
            });
          }
        }
        break;
      case 501:
        // 一些处理...
        break;
      default:
        // 状态码辣么多，按需配置...
        break;
    }
    return Promise.reject(error);
  }
);

export default axios;
