import React from 'react';
import ReactDOM from 'react-dom';
import Route from './config/Route';
import './icon/iconfont.css';
import 'element-theme-default';
import './index.css';
import * as serviceWorker from './serviceWorker';

import LoginState from "./config/mobx/LoginState";

ReactDOM.render(
    <Route auth={LoginState} />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();




