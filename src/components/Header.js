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
        const { user } = this.props.userStore;
        if (user === undefined) {
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
                    {user.name} 님 환영합니다! <br />
                    팔로잉 : {user.following} 팔로워 : {user.follower}
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
            setTimeout(() => {
                const { isLogger, userFollow, user} = this.props.userStore;
                if (!isLogger) alert('로그인 실패')
                else {this.props.history.push('/main')};
                userFollow(user.id);

            }, 0);
        });
        document.getElementsByName('signEmail').value = '';
        document.getElementsByName('signPassword').value = '';
        this.signEmail = '';
        this.signPassword = '';
    }
}

export default withRouter(Header);