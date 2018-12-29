import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import App from '../App';
import Home from '../pages/Home'
import Charts from '../pages/Charts'
import Topics from "../pages/Topics";

const RouterAnimationClass = styled.div`
    .fade-appear,
    .fade-enter {
        opacity: 0;
    }

    .fade-appear-active,
    .fade-enter-active {
        transition: opacity 0.3s linear;
        opacity: 1;
    }

    .fade-exit {
        transition: opacity 0.2s linear;
        opacity: 1;
    }

    .fade-exit-active {
        opacity: 0;
    }

    .spread-appear,
    .spread-enter {
        opacity: 0.5;
        transform: scale(0) rotate(30deg);
    }

    .spread-appear-active,
    .spread-enter-active {
        opacity: 1;
        transform: scale(1) rotate(0);
        transition: transform 0.3s ease-in-out;
    }

    .spread-exit {
        transition: transform 0.2s ease-in-out;
        transform: scale(1.2) rotate(-30deg);
    }

    .spread-exit-active {
        transform: scale(0) rotate(0);
    }

    .page-content {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
    }
`;

class AppRouter extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { location } = this.props;
        return (
            <RouterAnimationClass>
                <Router >
                    <App>
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                classNames={
                                    ['fade', 'spread'][parseInt(Math.random() * 2, 10)]
                                }
                                timeout={1000}>
            
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/charts" component={Charts}/>
                                    <Route path="/topics" component={Topics}/>
                                    {/*<Route path="topics?type=:name" component={Topics}/>*/}
                                    {/*<Route path="topics/new" component={NewTopic}/>*/}
                                    {/*<Route path="topics/:id" component={Topic}/>*/}
                                    {/*<Route path="remote" component={Remote}/>*/}
                                    {/*<Route path="programmer" component={Programmer}/>*/}
                                    {/*<Route path="jobs" component={Jobs}/>*/}
                                    {/*<Route path="sites" component={Jobs}/>*/}
                                    <Redirect from="/" to="/home" />
                                </Switch>
        
                            </CSSTransition>
                        </TransitionGroup>
                        
                    </App>
                </Router>
            </RouterAnimationClass>
        )
    }
}


export default AppRouter;