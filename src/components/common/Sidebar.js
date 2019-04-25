import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { observer } from 'mobx-react';
import history from '../../config/history';

// element
import { Menu } from 'element-react';

import { sidebarData, getOneMenuInPath } from '../../config/Data/sidebarData';


@observer
class Sidebar extends Component {
    constructor(props) {
        super(props);
        // 初始化置空可以在遍历不到的时候应用默认值
        this.state = {
            key: "",
            text: ""
        };
        this.setDefaultActiveItem = this.setDefaultActiveItem.bind(this);
    }
    
    setDefaultActiveItem() {
        const item = getOneMenuInPath(history.location.pathname);
        
        this.setState({
            key: item.key,
            text: item.text
        });
        // 设置title
        document.title = item.text;
    
        // 调用mobx方法,缓存初始化的路由访问
        this.props.RouterState.addRoute({
            key: item.key,
            text: item.text,
            path: item.path
        });
    }
    
    setActiveItem() {
        const self = this;
        history.listen((location) => {
            const item = getOneMenuInPath(location.pathname)
            this.setState({
                key: item.key,
                text: item.text
            });
        });
    }
    
    componentWillMount() {
        // 设置菜单的默认值
        this.setDefaultActiveItem();
    }
    
    componentDidMount() {
        this.setActiveItem();
    }
    
    // 路由跳转
    gotoUrl(itemurl, activeRoute) {
        // 判断我们传入的静态路由表的路径是否和路由信息匹配
        // 不匹配则允许跳转,反之打断函数
        if (history.location.pathname === itemurl) {
            return false;
        } else {
            // 调用mobx方法,缓存路由访问
            this.props.RouterState.addRoute({
                path: itemurl,
                ...activeRoute
            });
            
        }
    }
    
    render() {
        const SideTree = sidebarData.map(item => {
            if (item.children) {
                return (
                    <Menu.SubMenu
                        key={item.key}
                        index={item.key}
                        title={
                            <span>
                                <i className={'icon iconfont ' + item.icon}> </i>
                                <span>{item.text}</span>
                            </span>
                        }>
                        {item.children.map(menuItem => (
                            <Link key={menuItem.key} onClick={() => {
                                // 设置文档标题
                                document.title = menuItem.text;
                                this.gotoUrl(menuItem.path, {
                                    key: menuItem.key,
                                    text: menuItem.text
                                });
                            }}  to={menuItem.path}>
                                <Menu.Item index={menuItem.key} >
                                    {menuItem.text}
                                </Menu.Item>
                            </Link>
                        ))}
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Link key={item.key} onClick={() => {
                        // 设置文档标题
                        document.title = item.text;
                        this.gotoUrl(item.path, {
                            key: item.key,
                            text: item.text
                        });
                    }}  to={item.path}>
                        <Menu.Item index={item.key} >
                            <i className={'icon iconfont ' + item.icon}> </i>
                            <span>{item.text}</span>
                        </Menu.Item>
                    </Link>
                )
            }
        });
        
        return (
            <div>
                <div className="user-">
                    <div className="user-img">
                        <img src={require("../../images/abc.png")} alt=""/>
                    </div>
                    <div className="user-name">
                        <span>梦见</span>
                    </div>
                </div>
                <Menu className="el-menu-vertical-demo"
                      defaultActive={this.state.key}
                      theme="dark">
                    {SideTree}
                </Menu>
            </div>
        );
    }
}

export default Sidebar;


