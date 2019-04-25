import React from 'react';
import { Breadcrumb, Button, Select, Input, Table, Dialog, Form, DatePicker, Pagination } from 'element-react';
import '../../css/Table.css';
import axios from 'axios';

class Tables extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [
                {
                    value: '广东省',
                    label: '广东省'
                }, {
                    value: '湖南省',
                    label: '湖南省'
                }
            ],
            select_cate: '',
            select_word: '',
            columns: [
                {
                    type: 'selection'
                },
                {
                    label: "日期",
                    prop: "date",
                    width: 180
                },
                {
                    label: "姓名",
                    prop: "name",
                    width: 180
                },
                {
                    label: "地址",
                    prop: "address"
                },
                {
                    label: "操作",
                    width: 180,
                    render: (row, column, index)=>{
                        return (
                            <span>
                                <Button type="text" icon="edit" size="small" onClick={this.handleEdit.bind(this, index, row)}>编辑</Button>
                                <Button type="text" className="red" icon="delete" size="small" onClick={this.handleDelete.bind(this, index)}>移除</Button>
                            </span>
                        )
                    }
                }
            ],
            data: [],
            num: 0,
            dialogVisible: false,
            dialogVisible3: false,
            form: {
                name: '',
                date: null,
                address: '',
            }
        };
        this.listData = [];
        this.dataIndex = [];
        this.getTableData = this.getTableData.bind(this);
        this.setData = this.setData.bind(this);
    }
    
    getTableData(num) {
        const url = 'https://www.easy-mock.com/mock/5c383fe829ea8d24177b81bd/meng/table';
        const self = this;
        axios.post(url, {
            index: num
        }).then(function (response) {
            self.listData = [...response.data.data];
            self.setState({
                data: self.setData()
            })
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    componentWillMount() {
        this.getTableData(0);
        
    }
    
    searchTable() {
    
    }
    
    setData() {
        return this.listData.filter((d) => {
            if (d.address.indexOf(this.state.select_cate) > -1 &&
                (d.name.indexOf(this.state.select_word) > -1 ||
                    d.address.indexOf(this.state.select_word) > -1)
            ) {
                return d;
            }
        })
    }
    
    handleDelete(index) {
        this.idx = index;
        this.setState({ dialogVisible: true });
    }
    
    delOne() {
        const self = this,
            index = self.idx;
        self.listData.splice(index, 1);
        self.setState({
            data: self.setData(),
            dialogVisible: false
        })
    }
    
    delAll() {
        const self = this,
            dataIndex = self.dataIndex;
        self.listData = self.listData.filter(item => {
            if (!dataIndex.includes(item.name)) {
                return item;
            }
        });
        self.setState({
            data: self.setData()
        })
    }
    
    handleEdit(index, row) {
        let date = Tables.stringToDate(row.date);
        this.idx = index;
        this.setState({
            form: {
                name: row.name,
                date: date,
                address: row.address,
            }
        });
        this.setState({dialogVisible3: true});
    }
    
    editOne() {
        const self = this,
            index = self.idx,
            date = Tables.dateToString(self.state.form.date);
        self.listData[index] = {
            name: self.state.form.name,
            address: self.state.form.address,
            date: date,
        };
        self.setState({
            data: self.setData(),
            dialogVisible3: false
        })
    }
    
    handleName(value) {
        let date = this.state.form.date;
        let address = this.state.form.address;
        this.setState({
            form: {
                name: value,
                date: date,
                address: address,
            }
        });
    }
    
    handleAddress(value) {
        let date = this.state.form.date;
        let name = this.state.form.name;
        this.setState({
            form: {
                name: name,
                date: date,
                address: value,
            }
        });
    }
    
    handleDate(value) {
        let address = this.state.form.address;
        let name = this.state.form.name;
        this.setState({
            form: {
                name: name,
                date: value,
                address: address,
            }
        });
    }
    
    setSelectWord(value) {
        this.setState({
            select_word: value
        })
    }
    
    currentChange(page) {
        this.getTableData(page);
    }
    
    static stringToDate(dateStr, separator) {
        if(!separator){
            separator = "-";
        }
        let dateArr = dateStr.split(separator),
            year = parseInt(dateArr[0]),
            month,
            day = parseInt(dateArr[2]);
        //处理月份为04这样的情况
        if(dateArr[1].indexOf("0") === 0){
            month = parseInt(dateArr[1].substring(1));
        }else{
            month = parseInt(dateArr[1]);
        }
        return new Date(year,month -1,day);
    }
    
    static dateToString(date){
        let year = date.getFullYear(),
            month =(date.getMonth() + 1).toString(),
            day = (date.getDate()).toString();
        if (month.length === 1) {
            month = "0" + month;
        }
        if (day.length === 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
    
    render () {
        const tableData = this.setData();
        return (
            <div className="table">
                <div className="crumbs">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item><i className="icon iconfont icon-tubiao"/> 基础表格</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="container">
                    <div className="handle-box">
                        <Button size="small" type="primary" icon="delete" className="handle-del mr10" onClick={this.delAll.bind(this)}>批量删除</Button>
                        <Select size="small"
                                onChange={(value) => {
                                    this.setState({
                                        select_cate: value
                                    })
                                }}
                                className="handle-select mr10"
                                clearable={true}>
                            {
                                this.state.options.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                        </Select>
                        <div className="handle-input mr10">
                            <Input onChange={this.setSelectWord.bind(this)}
                                   placeholder="筛选关键词"
                                   size="small" />
                        </div>
                        <Button size="small" type="primary" icon="search" onClick={this.searchTable.bind(this)}>搜索</Button>
                    </div>
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={tableData}
                        border={true}
                        onSelectChange={(selection) => {
                            const list = [];
                            for (let i = 0; i < selection.length; i++) {
                                list.push(selection[i].name)
                            }
                            this.dataIndex = list;
                        }}
                    />
                    <div className="pagination">
                        <Pagination
                            layout="prev, pager, next"
                            onCurrentChange={this.currentChange.bind(this)}
                            total={1000}/>
                    </div>
                </div>
                 {/*删除提示框 */}
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <span>删除不可恢复，是否确定删除？</span>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => this.setState({ dialogVisible: false }) }>取 消</Button>
                        <Button type="primary" onClick={this.delOne.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
                 {/*编辑弹出框 */}
                <Dialog
                    title="编辑"
                    visible={ this.state.dialogVisible3 }
                    onCancel={ () => this.setState({ dialogVisible3: false }) }
                >
                    <Dialog.Body>
                        <Form model={this.state.form}>
                            <Form.Item label="日期" labelWidth="50px">
                                <DatePicker
                                    value={this.state.form.date}
                                    format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                    onChange={this.handleDate.bind(this)}
                                />
                            </Form.Item>
                            <Form.Item label="姓名" labelWidth="50px">
                                <Input
                                    value={this.state.form.name}
                                    placeholder="请输入内容"
                                    onChange={this.handleName.bind(this)}
                                    size="small" />
                            </Form.Item>
                            <Form.Item label="地址" labelWidth="50px">
                                <Input
                                    value={this.state.form.address}
                                    placeholder="请输入内容"
                                    onChange={this.handleAddress.bind(this)}
                                    size="small" />
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ () => this.setState({ dialogVisible3: false }) }>取 消</Button>
                        <Button type="primary" onClick={this.editOne.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}

export default Tables