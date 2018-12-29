
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import asyncComponent from 'components/asyncComponent/asyncComponent';

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

const Monitor = asyncComponent(() => import('pages/DashBoard/Monitor'));
const Analyze = asyncComponent(() => import('pages/DashBoard/Analyze'));

import ErrorPage from 'pages/Error/Error'; // 报错页面
@inject('auth')
@withRouter
@observer
class Container extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { location } = this.props;
        return (
            <RouterAnimationClass>
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames={
                            ['fade', 'spread'][parseInt(Math.random() * 2, 10)]
                        }
                        timeout={1000}>
                        <div className="page-content">
                            <Switch location={location}>
                                <Route
                                    path="/dashboard/monitor"
                                    exact
                                    component={Monitor}
                                />
                                <Route
                                    path="/dashboard/analyze"
                                    exact
                                    component={Analyze}
                                />
                                <Redirect
                                    exact
                                    from="/"
                                    to="/dashboard/monitor"
                                />
                                <Route component={ErrorPage} />
                            </Switch>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </RouterAnimationClass>
        );
    }
}

export default Container;


