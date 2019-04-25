import React from 'react';
import { Form, Input, Button } from 'element-react';
import { observer } from 'mobx-react';

@observer
class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                name: '',
                pass: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                this.props.auth.addUser(this.state.form);
                this.props.history.push('/home');
            } else {
                return false;
            }
        });
    }
    
    handleReset(e) {
        e.preventDefault();
    
        this.refs.form.resetFields();
    }
    
    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, { [key]: value })
        });
    }
    
    render() {
        return (
            <div className="login">
                <div className="login-form" >
                    <Form model={this.state.form} ref="form" rules={this.state.rules} labelWidth="80" className="demo-ruleForm">
                        <Form.Item label="用户名" prop="name">
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}/>
                        </Form.Item>
                        <Form.Item label="密码" prop="pass">
                            <Input type="password" value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete="off" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                            <Button onClick={this.handleReset.bind(this)}>重置</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login