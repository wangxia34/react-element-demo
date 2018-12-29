import React from 'react';
import Sidebar from './components/Sidebar'


class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="app-div">
                <div className="app-sidebar">
                    <Sidebar />
                </div>
                <div className="app-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App
