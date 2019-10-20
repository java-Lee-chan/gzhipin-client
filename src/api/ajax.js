/* 
使用axios封装的ajax请求函数
函数返回的是promise对象
*/
import axios from 'axios';

export default function ajax(url, data={}, type='GET'){
  if(type==='GET'){ // 发送GET请求
    // data: {username: tom, password: 123}
    // dataStr: username=tom&password=123
    let dataStr = '';
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });
    if(dataStr) {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
    }
    // 使用 axios 发 get 请求
    return axios.get(url + '?' + dataStr);
  }else { // 发送POST请求
    return axios.post(url, data);
  }
}