import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter, Redirect } from 'react-router-dom'

@inject('userStore')
@observer
class Header extends React.Component {

    @observable signEmail;
    @observable signPassword;

    render() {
        const { nowUser } = this.props.userStore;
        if (nowUser === undefined) {
            return (
                <div id='signForm'>
                    이메일 : <input type='email' name='signEmail' onChange={this.handleChange} value={this.signEmail} />
                    비밀번호 : <input type='password' name='signPassword' onChange={this.handleChange} value={this.signPassword} />
                    <button onClick={this.handleSubmit}>로그인</button>
                </div>
            );
        } else {
            return (
                <div>
                    {nowUser.name} 님 환영합니다! <br/>
                    팔로잉 : {nowUser.following} 팔로워 : {nowUser.follower}
                </div>
            );
        }
    }

    @action
    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }

    @action
    handleSubmit = () => {
        const { signUser } = this.props.userStore;
        signUser(this).then(res => {
                const { isLogger, userFollow, nowUser} = this.props.userStore;
                if (!isLogger) alert('로그인 실패')
                else {this.props.history.push('/main')};
                userFollow(nowUser.id);
        });
        document.getElementsByName('signEmail').value = '';
        document.getElementsByName('signPassword').value = '';
        this.signEmail = '';
        this.signPassword = '';
    }
}

export default withRouter(Header);