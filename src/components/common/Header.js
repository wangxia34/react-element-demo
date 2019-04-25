import React, {Component} from 'react'
import { observer } from 'mobx-react'
import { Tooltip, Dropdown } from 'element-react'
import history from "../../config/history";
import {getOneMenuInPath} from "../../config/Data/sidebarData";

@observer
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            message: 2,
            userName: "梦见"
        }
    }
    
    handleFullScreen() {
        let element = document.documentElement;
        if (this.state.fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        this.setState({
            fullscreen: !this.state.fullscreen
        });
    }
    
    handleCommand(command) {
        if (command === 'loginOut') {
            this.props.auth.loginOutUser();
            history.push('/login');
        }
    }
    
    gotoUrl(itemurl) {
        const item = getOneMenuInPath(itemurl);
        // 判断我们传入的静态路由表的路径是否和路由信息匹配
        // 不匹配则允许跳转,反之打断函数
        if (history.location.pathname === itemurl) {
            return false;
        } else {
            // 调用mobx方法,缓存路由访问
            this.props.RouterState.addRoute(item);
            // 跳转路由
            history.push(itemurl);
        }
    }
    
    render() {
        
        return (
            <div className="header">
                {/*折叠按钮 */}
                <div className="collapse-btn" onClick={() => this.props.collapseChange()}>
                    <i className="el-icon-menu"/>
                </div>
                <div className="logo">后台管理系统</div>
                <div className="header-right">
                    <div className="header-user-con">
                         {/*全屏显示 */}
                        <div className="btn-fullscreen" onClick={this.handleFullScreen.bind(this)}>
                            <Tooltip effect="dark" content={this.state.fullscreen ? '取消全屏' : '全屏'} placement="bottom">
                                <i className="icon iconfont icon-pc-quanping"/>
                            </Tooltip>
                        </div>
                        {/*消息中心 */}
                        <div className="btn-bell">
                            <Tooltip effect="dark" content={this.state.message ? `有${this.state.message}条消息未读` : '消息中心'} placement="bottom">
                                <div className="btn-bell-text" onClick={() => {this.gotoUrl('/tabs');}}>
                                    <i className="icon iconfont icon-xiaoxishezhi"/>
                                    {!!this.state.message && (<span className="btn-bell-badge"/>)}
                                </div>
                            </Tooltip>
                        </div>
                         {/*用户头像 */}
                        <div className="header-user-avator"><img src={require("../../images/abc.png")}/></div>
                         {/*用户名下拉菜单 */}
                        <Dropdown className="user-name" onCommand={this.handleCommand.bind(this)} menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <a href="http://www.baidu.com" target="_blank">
                                        <el-dropdown-item>关于作者</el-dropdown-item>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href="http://www.baidu.com" target="_blank">
                                        <el-dropdown-item>项目仓库</el-dropdown-item>
                                    </a>
                                </Dropdown.Item>
                                <Dropdown.Item command="loginOut">退出登录</Dropdown.Item>
                            </Dropdown.Menu>
                        )}>
                            <span className="el-dropdown-link">
                                {this.state.userName} <i className="el-icon-caret-bottom"/>
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header