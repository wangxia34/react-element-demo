import React, {Component} from 'react'
import { Dropdown, Button } from 'element-react'
import {getOneMenuInPath} from '../../config/Data/sidebarData'
import history from "../../config/history";
import { observer } from 'mobx-react';

@observer
class Tags extends Component {
    constructor() {
        super();
        this.state = {
            tagsList: [],
            key: "",
            text: ""
        };
        this.setActiveItem = this.setActiveItem.bind(this);
    }
    
    setDefaultActiveItem() {
        const item = getOneMenuInPath(history.location.pathname);
        
        this.setState({
            tagsList: [item],
            key: item.key,
            text: item.text
        });
    }
    
    setActiveItem() {
        const self = this;
        history.listen((location) => {
            const item = getOneMenuInPath(location.pathname);
            const arr = self.props.RouterState.historyCollection;
            this.setState({
                tagsList: arr,
                key: item.key,
                text: item.text
            });
        });
    }
    
    componentWillMount() {
        this.setDefaultActiveItem();
    }
    
    componentDidMount() {
        this.setActiveItem();
    }
    
    closeTag(key, e) {
        e.stopPropagation();
        
        const tagIndex = this.state.tagsList.findIndex(item => {
            return item.key === key;
        });
        
        this.props.RouterState.closeCurrentTag(tagIndex);
    
        history.push(this.state.tagsList[tagIndex - 1 >= 0 ? tagIndex - 1 : tagIndex + 1].path);
    }
    
    closeOtherTags() {
        this.props.RouterState.closeOtherTag();
        const arr = this.props.RouterState.historyCollection;
        this.setState({
            tagsList: arr
        });
    }
    
    closeAllTags() {
    
    }
    
    handleCommand(command) {
        if (command === "closeOtherTags") {
            this.closeOtherTags();
        }
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
            // 跳转路由
            history.push(itemurl);
        }
    }
    
    render() {
        let tagsList = this.state.tagsList;
        const tagsLi = tagsList.map(item => {
            let clsLi = "tags-li";
            if (this.state.key === item.key) {
                clsLi = `${clsLi} active`;
            }
            return (
                <li className={clsLi} key={item.key} onClick={() => {
                    // 设置文档标题
                    document.title = item.text;
                    this.gotoUrl(item.path, {
                        key: item.key,
                        text: item.text
                    });
                }}>
                    {item.text}
                    {tagsList.length > 1 && (
                        <span className="tags-li-icon" onClick={(e) => this.closeTag(item.key, e)}><i className="el-icon-close"> </i></span>
                    )}
                </li>
            );
        });
        
        return (
            <div className="tags">
                <ul>
                    {tagsLi}
                </ul>
                <div className="tags-close-box">
                    <Dropdown onCommand={this.handleCommand.bind(this)} size="small" menu={(
                        <Dropdown.Menu>
                            <Dropdown.Item command="closeOtherTags">关闭其他</Dropdown.Item>
                            <Dropdown.Item command="closeAllTags">关闭所有</Dropdown.Item>
                        </Dropdown.Menu>
                    )}>
                        <Button type="primary" size="small">
                            选项标签<i className="el-icon-caret-bottom el-icon--right"> </i>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default Tags