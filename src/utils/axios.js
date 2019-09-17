import  axios from 'axios'
import { bindActionCreators } from 'redux';
import Store from 'store/store'
import ActionCreator from 'store/actionCreator'
//axios拦截器
// Add a request interceptor

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log('请求拦截器',config)//请求拦截器是一个对象
  let {method}=config
  let token=localStorage.getItem('token')
  if(method==='get'){
    config.url+=`&token=${token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.status===200){
    console.log('响应拦截器',response)
    if(response.data.err===-998){
      // 将模态框显示
      Store.dispatch(ActionCreator.changeModelState())
    }
    // if(response.data.err===-998){
    //   StorageEvent.dispatch(bindActionCreator.changeModelState())
    // }
    return response.data
  }else{
    return Promise.reject('请求出错')//链式调用的catch处理
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default axios


