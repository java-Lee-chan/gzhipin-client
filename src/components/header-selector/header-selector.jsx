/* 
  选择用户头像的 UI 组件
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {List, Grid} from 'antd-mobile';

export default class HeaderSelector extends Component {
  constructor(props){
    super(props);
    // 准备需要显示的列表数据
    this.headerList = [];
    for(let i = 0; i < 20; i++){
      this.headerList.push({
        text: '头像' + (i + 1),
        icon: require(`./images/头像${i + 1}.png`)  // 不能使用 import
      
      })
    }
  }

  state = {
    icon: null    // 图片对象，默认没有值
  }
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }
  handleClick = ({text, icon}) => {
    // 更新当前组件状态
    this.setState({icon});
    // 调用函数更新父组件状态
    this.props.setHeader(text);
  }
  render (){
    const {icon} = this.state;
    // 头部界面
    const listHeader = !icon?'请选择头像':(
      <div>
        已选择头像：<img src={icon} alt=""/>
      </div>
    )
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
      </List>
    )
  }
}