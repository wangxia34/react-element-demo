import React, { Component } from 'react';
import { Link } from "react-router-dom";

// element
import { Menu } from 'element-react';

import { sidebarData, groupKey } from '../config/sidebarData';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        // 初始化置空可以在遍历不到的时候应用默认值
        this.state = {
            defaultActive: "1"
        };
    }
    
    clickMenu(key) {
        this.setState({
            defaultActive: key
        })
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
                                <i className={'icon iconfont ' + item.title.icon}> </i>
                                <span>{item.title.text}</span>
                            </span>
                        }>
                        {item.children.map(menuItem => (
                            <Link key={menuItem.key} onClick={() => this.clickMenu(menuItem.key)} to={menuItem.path}>
                                <Menu.Item index={menuItem.key} >
                                    {menuItem.text}
                                </Menu.Item>
                            </Link>
                        ))}
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item index={item.key} key={item.key}>
                        <Link to={item.path}>
                            <i className={'icon iconfont ' + item.title.icon}> </i>
                            <span>{item.text}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        });
        return (
            <div>
                <div className="user-">
                    <div className="user-img">
                        <img src={require("../images/abc.png")} alt=""/>
                    </div>
                    <div className="user-name">
                        <span>梦见</span>
                    </div>
                </div>
                <Menu className="el-menu-vertical-demo"
                      defaultActive={this.state.defaultActive}
                      theme="dark">
                    {SideTree}
                </Menu>
            </div>
        );
    }
}

export default Sidebar;


