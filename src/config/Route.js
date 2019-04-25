import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from './history';
import {sidebarData} from "./Data/sidebarData";
import AllComponents from "./RouteUpdata";
import { observer } from 'mobx-react';
import App from '../App';
import Login from '../components/pages/Login';

@observer
class AppRouter extends Component {
    requireLogin = (component) => {
        const user = this.props.auth.activeRoute;
        if (process.env.NODE_ENV === 'production' && !user.name) {
            return <Redirect to={'/login'} />;
        }
        return component;
    };
    
    render() {
        const SideTree = [];
        sidebarData.forEach(item => {
            if (item.children) {
                item.children.map(menuItem => {
                    const Component = AllComponents[menuItem.component];
                    SideTree.push(
                        <Route
                            key={menuItem.key}
                            exact
                            path={menuItem.path}
                            render={props => {
                                return this.requireLogin(<Component {...props} />)
                            }}
                        />
                    )
                })
            } else {
                const Component = AllComponents[item.component];
                SideTree.push(
                    <Route
                        key={item.key}
                        exact
                        path={item.path}
                        render={props => {
                            return this.requireLogin(<Component {...props} />)
                        }}
                    />
                )
            }
        });
        
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" render={props => (<Login {...props} auth={this.props.auth} />)}/>
                    <App auth={this.props.auth}>
                        <Switch>
                            {SideTree}
                            <Redirect from="/" to="/home" />
                        </Switch>
                    </App>
                </Switch>
            </Router>
        )
    }
}


export default AppRouter;