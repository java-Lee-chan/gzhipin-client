import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList
} from '../api';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types';
/* 
包含n个action creator
异步action
同步action
*/

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});

// 错误提示信息同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});

// 重置用户的同步acition
export const resetUser = (msg) => ({type: RESET_USER, data: msg});

// 接收用户列表的同步action
const receiveUserList = (userlist) => ({type: RECEIVE_USER_LIST, data: userlist});

// 注册异步action
export const register = (user) => {
  const {username, password, password2, type} = user;
  // 做表单的前台验证，如果不通过， 返回一个 errorMsg 的同步action
  if(!username){
    return errorMsg('用户名必须指定!');
  }else if(password!==password2){
    return errorMsg('2次密码要一致!');
  }
  // 表单数据合法，返回一个发ajax请求的异步action函数
  return async dispatch => {
    // 发送注册的异步请求
    /* const promsise = reqRegister(user);
    promised.then(response => {
      const result = response.data
    }); */
    const response = await reqRegister({username, password, type});
    const result = response.data
    if (result.code === 0){ // 成功的action
      dispatch(authSuccess(result.data));
    }else { // 失败的action
      dispatch(errorMsg(result.msg));
    }
  }
}

// 登陆异步action
export const login = (user) => {
  const {username, password} = user;
  // 做表单的前台验证，如果不通过， 返回一个 errorMsg 的同步action
  if(!username){
    return errorMsg('用户名必须指定!');
  }else if(!password){
    return errorMsg('密码必须指定!');
  }
  // 表单数据合法，返回一个发ajax请求的异步action函数
  return async dispatch => {
    // 发送登陆的异步请求
    /* const promsise = reqRegister(user);
    promised.then(response => {
      const result = response.data
    }); */
    const response = await reqLogin(user);
    const result = response.data
    if (result.code === 0){ // 成功的action
      dispatch(authSuccess(result.data));
    }else { // 失败的action
      dispatch(errorMsg(result.msg));
    }
  }
}

// 更新用户异步action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if(result.code === 0){  // 更新成功:data
      dispatch(receiveUser(result.data));
    }else { // 更新失败:msg
      dispatch(resetUser(result.msg));
    }
  }
}

// 获取用户异步action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser();
    const result = response.data;
    if(result.code === 0){
      dispatch(receiveUser(result.data));
    }else {
      dispatch(resetUser(result.msg));
    }
  }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
  return async dispatch => {
    // 执行异步ajax请求
    const response = await reqUserList(type);
    const result = response.data;
    // 得到结果后，分发一个同步ation
    if(result.code === 0){
      dispatch(receiveUserList(result.data));
    }
  }
}