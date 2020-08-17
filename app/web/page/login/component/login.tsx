import * as React from 'react';
import './login.less';
import { Input, Icon, Button, message, notification } from 'antd';
import { api } from '../../../../utils/api';

interface LoginState {
  account: string;
  password: string;
}

export default class Login extends React.Component<{}, LoginState> {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: ''
    };

    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  public async handleAccountChange(e) {
    await this.setState({ account: e.target.value });
  }
  public async handlePasswordChange(e) {
    await this.setState({ password: e.target.value });
  }

  async handleLogin(e) {
    const res = await api.login({ email: this.state.account, password: this.state.password });
    console.log(res);
    notification.success({
      message: res.message
    });
  }

  render() {
    return <div className="login-wrapper">
      <div className="login-form-wrap">
        <img className="logo" src={require('../../../asset/images/wili.png')} alt="" />
        <Input
          value={this.state.account}
          className="form-input"
          type="text"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入账号"
          onChange={this.handleAccountChange}
        />
        <Input
          value={this.state.password}
          className="form-input"
          type="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入密码"
          onChange={this.handlePasswordChange}
        />
        <Button type="primary" htmlType="submit" size="large" block onClick={this.handleLogin} >登录</Button>
      </div>
      <p className="band">唯厘科技 - 码力星球</p>
    </div>;
  }
}
