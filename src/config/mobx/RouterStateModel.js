
import { observable, action, computed, toJS } from 'mobx';

function findObj(array, obj) {
    for (let i = 0, j = array.length; i < j; i++) {
        if (array[i].key === obj.key) {
            return true;
        }
    }
    return false;
}

class RouterStateModel {
    @observable
    currentUrl; // 当前访问的信息
    @observable
    urlHistory; // 访问过的路由信息
    
    constructor() {
        this.currentUrl = {};
        this.urlHistory = [];
    }
    
    // 当前访问的信息
    @action
    addRoute = values => {
        // 赋值
        this.currentUrl = values;
        // 若是数组为0
        if (this.urlHistory.length === 0) {
            // 则追加到数组中
            this.urlHistory.push(this.currentUrl);
        } else {
            if (!findObj(toJS(this.urlHistory), values)) {
                this.urlHistory.push(this.currentUrl)
            }
        }
    };

    // 设置index为高亮路由
    @action
    setIndex = index => {
        this.currentUrl = toJS(this.urlHistory[index]);
    };

    // 关闭单一路由
    @action
    closeCurrentTag = index => {
        // 当历史集合长度大于一才重置,否则只剩下一个肯定保留额
        this.urlHistory.splice(index, 1);
        this.currentUrl = toJS(this.urlHistory[this.urlHistory.length - 1]);
    };

    // 关闭除了当前url的其他所有路由
    @action
    closeOtherTag = route => {
        if (this.urlHistory.length > 1) {
            this.urlHistory = [this.currentUrl];
        } else {
            return false;
        }
    };

    // 获取当前激活的item,也就是访问的路由信息
    @computed
    get activeRoute() {
        return toJS(this.currentUrl);
    }

    // 获取当前的访问历史集合
    @computed
    get historyCollection() {
        return toJS(this.urlHistory);
    }
}

const RouterState = new RouterStateModel();

export default RouterState;


