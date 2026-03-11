import axios from "axios";

// axios 对象封装
const request = axios.create({
  // 根域名 后端的根域名
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
