import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';

const Item = TabBar.Item;

// 希望在非路由组件中使用路由库的api
// withRouter()
class NavFooter extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }
  render (){
    let {navList} = this.props;
    // 过滤掉hide为true的nav
    navList = navList.filter(nav => !nav.hide);
    const path = this.props.location.pathname;
    return (
      <TabBar>
        {
          navList.map(nav => (
            <Item key={nav.path} 
                  title={nav.text}
                  icon={{uri: require(`./images/${nav.icon}.png`)}}
                  selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                  selected={path===nav.path}
                  onPress={() => this.props.history.replace(nav.path)}
                  />
          ))
        }
      </TabBar>
    )
  }
}

// 向外暴露withRouter()包装产生的组件
// 内部会向组件中传入一些路由组件特有的属性：history, location, match
export default withRouter(NavFooter); 