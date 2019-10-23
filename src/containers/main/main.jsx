/* 
主界面路由组件
*/
import React, {Component} from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';  // 可以操作前端cookie的对象 set()/remove()

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';

import {getRedirectTo} from '../../utils';
import {getUser} from '../../redux/actions';
import { NavBar } from 'antd-mobile';

class Main extends Component {

  // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神'
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人'
    }
  ]

  componentDidMount (){
    // 登陆过(cookie中有userid)，但还没有登录(redux管理的user中没有_id)，发请求获取对应的user
    const userid = Cookies.get('userid');
    const {_id} = this.props.user
    if(userid && !_id){
      // 发送异步请求，获取user信息
      this.props.getUser();
    }
  }

  render() {

    // 读取 cookie 中的 userid
    const userid = Cookies.get('userid');
    // 如果没有，自动重定向到登录界面
    if(!userid){
      return <Redirect to="/login"/>
    }
    // 如果有，读取redux中的user状态
    const {user} = this.props;
    // 如果redux中暂时还没有user的_id状态，返回null(不做任何显示)
    if(!user._id){
      return null
    }else {
      // 如果redux中得到了user的_id，显示对应的界面
      // 根据 user 的 type 和 header 来计算出一个重定向的路径，并跳转
      let path = this.props.location.pathname;
      if(path === '/'){
        path = getRedirectTo(user.type, user.header);
        return <Redirect to={path}/>
      }
    }

    const {navList} = this;
    const path = this.props.location.pathname;  // 请求的路径
    const currentNav = navList.find(nav => nav.path===path);  // 得到当前的nav，可能没有
    
    if(currentNav){
      // 决定哪个路由需要隐藏
      if(user.type==='laoban'){
        // 隐藏数组的第2个
        navList[1].hide = true;
      }else {
        // 隐藏数组的第1个
        navList[0].hide = true;
      }
    }
    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar>: null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path="/laobaninfo" component={LaobanInfo} />
          <Route path="/dasheninfo" component={DashenInfo} />
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} />: null}
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main);

/* 
1. 实现自动登录
  1. componentDidMount()  
    1). 登陆过(cookie中有userid)，但还没有登录(redux管理的user中没有_id)，发请求获取对应的user，
  2. render()
    1). 如果 cookie 中没有 userid，直接重定向到login
    2). 如果 cookie 中有 userid, 判断redux管理的 user 中是否有 _id，如果没有， 暂时不做任何显示
    3). 如果有_id，说明当前已经登陆，显示对应的界面
    4). 如果请求根路径，根据 user 的 type 和 header 来计算出一个重定向的路径，并跳转
*/