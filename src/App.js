import React from 'react';
import Sidebar from './components/common/Sidebar'
import Tags from './components/common/Tags'
import Header from './components/common/Header'

import RouterState from "./config/mobx/RouterStateModel";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            collapse: false
        };
        this.collapseChange = this.collapseChange.bind(this)
    }
    
    collapseChange() {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    
    render() {
        return (
            <div className="app-div">
                <div className="app-header">
                    <Header RouterState={RouterState} auth={this.props.auth} collapseChange={() => this.collapseChange()} />
                </div>
                <div className="app-mainBody">
                    <div className="app-sidebar">
                        <Sidebar RouterState={RouterState} collapse={this.state.collapse} />
                    </div>
                    <div className="app-right">
                        <Tags RouterState={RouterState} />
                        <div className="app-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App
