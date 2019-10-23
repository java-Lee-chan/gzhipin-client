/* 
包含n个reducer函数：根据老的state和指定的action返回一个新的state
*/
import {combineReducers} from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST
} from './action-types';
import {getRedirectTo} from '../utils';

const initUser = {
  username: '', // 用户名
  type: '',    // 用户类型 dashen/laoban
  msg: '',       // 错误提示信息
  redirectTo: ''    // 需要自动重定向的路由路径
};

// 产生user状态的reducer
function user(state=initUser, action){
  switch (action.type){
    case AUTH_SUCCESS:  // data 是 user
      const {type, header} = action.data;
      return {...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG:     // data 是 msg
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = [];
// 产生userlist状态的reducer
function userList(state=initUserList, action){
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data  // data为userList
    default: 
      return state
  }
}
export default combineReducers({
  user, userList
});

// 向外暴露的状态结构: {user: {}, userList:{}}

