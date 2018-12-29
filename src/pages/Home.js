import React from 'react';
import { Layout, Card, Progress, Button, Table, Checkbox } from 'element-react';
import '../css/Home.css';



class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            root: "",
            name: "梦见",
            columns: [
                {
                    label: "",
                    prop: "status",
                    width: 180,
                    render: (data) => {
                        return (<Checkbox onChange={() => this.setCheckbox(data.id)} checked={data.status} />)
                    }
                },
                {
                    label: "事务",
                    prop: "title"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 100,
                    render: () => {
                        return (
                            <span>
                                <Button type="text" size="small">编辑</Button>
                                <Button type="text" size="small">删除</Button>
                            </span>
                        )
                    }
                }
            ],
            todoList: [
                {
                    id: '0',
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    id: '1',
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    id: '2',
                    title: '今天要写100行代码加几个bug吧',
                    status: false,
                },
                {
                    id: '3',
                    title: '今天要修复100个bug',
                    status: false,
                },
                {
                    id: '4',
                    title: '今天要修复100个bug',
                    status: true,
                },
                {
                    id: '5',
                    title: '今天要写100行代码加几个bug吧',
                    status: true,
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ]
        };
    }
    
    setCheckbox(id) {
        let todoList = this.state.todoList.slice();
        for (let i = 0; i < todoList.length; i++) {
            if (id === todoList[i].id) {
                todoList[i].status = !todoList[i].status;
                break;
            }
        }
        this.setState({
            todoList: todoList
        })
    }
    
    componentDidMount() {
        this.setState({
            root: this.state.name === 'admin' ? '超级管理员' : '普通用户'
        });
    }
    
    render() {
        return (
            <div>
                <Layout.Row gutter="20">
                    <Layout.Col span="8">
                        <Card style={{height:"252px"}}>
                            <div className="user-info">
                                <img src={require("../images/abc.png")} className="user-avator" alt=""/>
                                <div className="user-info-cont">
                                    <div className="user-info-name">{this.state.name}</div>
                                    <div>{this.state.root}</div>
                                </div>
                            </div>
                            <div className="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                            <div className="user-info-list">上次登录地点：<span>成都</span></div>
                        </Card>
                        <Card className="user-progress">
                            <div className="clearfix">
                                <span>语言详情</span>
                            </div>
                            Vue
                            <Progress percentage={71.3} />
                            JavaScript
                            <Progress percentage={24.1} />
                            CSS
                            <Progress percentage={3.7} />
                            HTML
                            <Progress percentage={0.9} />
                        </Card>
                    </Layout.Col>
                    <Layout.Col span="16">
                        <Layout.Row gutter="20">
                            <Layout.Col span="8">
                                <Card>
                                    <div className="grid-content grid-con-1">
                                        <i className="el-icon-menu grid-con-icon"> </i>
                                        <div className="grid-cont-right">
                                            <div className="grid-num">1234</div>
                                            <div>用户访问量</div>
                                        </div>
                                    </div>
                                </Card>
                            </Layout.Col>
                            <Layout.Col span="8">
                                <Card>
                                    <div className="grid-content grid-con-1">
                                        <i className="el-icon-menu grid-con-icon"> </i>
                                        <div className="grid-cont-right">
                                            <div className="grid-num">1234</div>
                                            <div>用户访问量</div>
                                        </div>
                                    </div>
                                </Card>
                            </Layout.Col>
                            <Layout.Col span="8">
                                <Card>
                                    <div className="grid-content grid-con-1">
                                        <i className="el-icon-menu grid-con-icon"> </i>
                                        <div className="grid-cont-right">
                                            <div className="grid-num">1234</div>
                                            <div>用户访问量</div>
                                        </div>
                                    </div>
                                </Card>
                            </Layout.Col>
                        </Layout.Row>
                        <Card>
                            <div className="clearfix">
                                <span>待办事项</span>
                                <Button type="text">添加</Button>
                            </div>
                            <Table
                                style={{width: '100%', fontSize: '14px'}}
                                columns={this.state.columns}
                                maxHeight={304}
                                data={this.state.todoList}
                            />
                        </Card>
                    </Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="10">
                    
                    </Layout.Col>
                    <Layout.Col span="6"><div className="grid-content bg-purple"></div></Layout.Col>
                    <Layout.Col span="8"><div className="grid-content bg-purple"></div></Layout.Col>
                </Layout.Row>
            </div>
        );
    }
}

export default Home