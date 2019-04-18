import React from 'react';
import styled from 'styled-components'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

@inject('userStore')
@observer
class Header extends React.Component {

    @observable signEmail;
    @observable signPassword;
    @observable signView;

    componentDidMount(){
        
    }

    render() {
        
        const { nowUser } = this.props.userStore;

        if (nowUser === undefined) {
            return (

                <LogOut>
                    <Logo>RAPIDO</Logo>
                    <div id='sign'>
                        <div id='text'><label>이메일</label><label>비밀번호</label></div>
                        <div id='input'>
                            <label><input type='email' name='signEmail' onChange={this.handleChange} value={this.signEmail} /></label>
                            <label><input type='password' name='signPassword' onChange={this.handleChange} value={this.signPassword} /></label>
                        </div>
                        <label><button onClick={this.handleSubmit}>로그인</button></label>
                    </div>
                </LogOut>
            );
        } else {
            return (
                <LogIn>
                    <Logo>RAPIDO</Logo>
                    <div id='signIn'>
                        <div id='name'>{nowUser.name} 님 환영합니다! </div>
                        <div id='text'><label>팔로잉</label><label>팔로워</label></div>
                        <div id='follow'><label>{nowUser.following}</label><label>{nowUser.follower}</label></div>
                    </div>
                    <div id='category'>
                        <Link to='/main'><div>팔로우 페이지</div></Link>
                        <Link to='/user'><div>마이 페이지</div></Link>
                    </div>
                </LogIn>
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
            const { isLogger, userFollow, nowUser } = this.props.userStore;
            if (!isLogger) alert('로그인 실패')
            else { this.props.history.push('/main') };
            userFollow(nowUser.id);
        });
        document.getElementsByName('signEmail').value = '';
        document.getElementsByName('signPassword').value = '';
        this.signEmail = '';
        this.signPassword = '';
    }
}

export default withRouter(Header);

const LogOut = styled.div`
margin: 0 auto;
padding-top: 13px;
width: 100%;
height: 80px;
background: #ffb1b1;
#sign{
    float: right;
    #text{
        label{
            padding-right: 120px;
        }
    
    }
    #input{
        label{
            padding-right: 8px;
        }
    }
    bottun{
        label{

        }
    }
}
`

const LogIn = styled.div`
margin: 0 auto;
padding-top: 13px;
width: 100%;
height: 80px;
background: #ffb1b1;;
#signIn{
    float: right;
    #name{
    
    }
    #text{
        label{
            padding-right: 90px;
        }
    
    }
    #follow{
        label{
            padding-right: 117px;
            padding-left: 17px;
        }
    }
}
#category{
    div{
        width: 49.8%;
        float: left;
        border: solid 1px black;
    }
}
`

const Logo = styled.div`
display: inline-block;
font-size: 34px;
color: #b57fff;
padding-left: 30px;
padding-top: 12px;
padding-bottom: 23px;
`
