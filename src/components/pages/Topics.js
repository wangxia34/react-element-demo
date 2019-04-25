import React from 'react';
import Fade from '../common/Transition'
import { Button } from 'element-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

let num = 1;
class Topics extends React.Component {
    constructor() {
        super();
        this.state = {
            ins: true,
            current: 1,
            dom: <div >
                ceshi weizhi {num}
            </div>,
            star: false,
            items: [
                { id: 1, text: 'Buy eggs' },
                { id: 2, text: 'Pay bills' },
                { id: 3, text: 'Invite friends over' },
                { id: 4, text: 'Fix the TV' },
            ]
        };
        this.handle = this.handle.bind(this);
        this.end = this.end.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }
    
    handle(bool) {
        this.setState({
            test: !bool
        })
    }
    end() {
        num = num + 1;
        setTimeout(() => {
            this.setState({
                test: true,
                dom: <div >
                    888888 {num}
                </div>
            })
        }, 500)
        
    }
    handleStar(bool) {
        this.setState({
            star: !bool
        })
    }
    render () {
        const { items } = this.state;
        return (
            <div>
                <Button onClick={this.handle.bind(null, this.state.test)}>点击transition</Button>
                <Fade in={this.state.test} self={this.end}>
                    {this.state.dom}
                </Fade>
                <br/>
    
                <Button onClick={this.handleStar.bind(null, this.state.star)}>start</Button>
                <CSSTransition
                    in={this.state.star}
                    timeout={300}
                    classNames="star"
                    unmountOnExit
                >
                    <div className="star">⭐</div>
                </CSSTransition>
                <br/>
    
                <TransitionGroup className="todo-list">
                    {items.map(({ id, text }) => (
                        <CSSTransition
                            key={id}
                            timeout={500}
                            classNames="fade"
                        >
                            <div>
                                <Button
                                    onClick={() => {
                                        this.setState(state => ({
                                            items: state.items.filter(
                                                item => item.id !== id
                                            ),
                                        }));
                                    }}
                                >
                                    &times;
                                </Button>
                                {text}
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <Button
                    type="button"
                    onClick={() => {
                        const text = prompt('Enter some text');
                        const id = this.state.items[this.state.items.length - 1].id + 1;
                        console.log(id);
                        if (text) {
                            this.setState(state => ({
                                items: [
                                    ...state.items,
                                    { id: id, text },
                                ],
                            }));
                        }
                    }}
                >
                    Add Item
                </Button>
            </div>
        )
    }
}

export default Topics