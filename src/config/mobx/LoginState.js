import { observable, action, computed, toJS } from 'mobx';

class LoginStateModel {
    @observable
    currentUser; // 当前用户的信息
    
    constructor() {
        this.currentUser = {};
    }
    
    // 添加当前用户的信息
    @action
    addUser = values => {
        // 赋值
        if (values.name === 'admin' && values.pass === 'admin') {
            this.currentUser = {state: "admin", ...values};
        } else {
            this.currentUser = {state: "guest", ...values};
        }
        
    };
    
    // 删除当前用户的信息
    @action
    loginOutUser = () => {
        // 赋值
        this.currentUser = {};
    };
    
    // 获取当前用户的信息
    @computed
    get activeRoute() {
        return toJS(this.currentUser);
    }
}

const LoginState = new LoginStateModel();

export default LoginState;


