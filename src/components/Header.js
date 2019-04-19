import React from 'react';
import styled from 'styled-components'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter,Link } from 'react-router-dom'

@inject('userStore')
@observer
class Header extends React.Component {

    @observable signEmail;
    @observable signPassword;
    @observable signView;
    @observable searchText;
    @observable searchList = [];

    componentDidMount(){
        const { getSession } = this.props.userStore;
        getSession().then(res=>{
            const { isLog, userFollow, nowUser } = this.props.userStore;
            if(isLog) { 
                this.props.history.push('/main');
                userFollow(nowUser.id);
            };
        });
    }

    render() {

        const { nowUser } = this.props.userStore;
        if (nowUser === undefined) {
            return (
                <LogOut>
                    <TopDiv>
                        <Logo>RAPIDO</Logo>
                        <div id='sign'>
                            <div id='text'><label>이메일</label><label>비밀번호</label></div>
                            <div id='input'>
                                <label><input type='email' name='signEmail' onChange={this.handleChange} value={this.signEmail} /></label>
                                <label><input type='password' name='signPassword' onChange={this.handleChange} value={this.signPassword} /></label>
                            </div>
                            <label><button onClick={this.handleSubmit}>로그인</button></label>
                        </div>
                    </TopDiv>
                </LogOut>
            );
        } else {
            return (
                <LogIn>
                    <TopDiv>
                        <Logo>RAPIDO</Logo>
                        <div id='signIn'>
                            <div id='name'>{nowUser.name} 님 환영합니다! </div><button onClick={this.logOut}>로그아웃</button>
                            <div id='text'><label>팔로잉</label><label>팔로워</label></div>
                            <div id='follow'><label>{nowUser.following}</label><label>{nowUser.follower}</label></div>
                            
                        </div>
                    </TopDiv>
                    <div id='menu'>
                        <Link to='/main'><div>팔로우 페이지</div></Link>
                        <Link to={{pathname : 'user', id : nowUser.id}}><div>유저 페이지</div></Link>
                    </div>
                    
                    <div id='search'>
                        <input placeholder='검색' name='searchText' onChange={this.handleChange}/><button onClick={this.handleSearch}>검색</button>
                        {this.searchList}
                    </div>
                </LogIn>
            );
        }

    }

    @action
    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }

    logOut = () => {
        const { logOut } = this.props.userStore;
        logOut().then(res=>{
            const { restNowUser } = this.props.userStore;
            restNowUser()
            this.props.history.push('/');
        })
    }

    @action
    handleSubmit = () => {
        const { signUser } = this.props.userStore;
        signUser(this).then(res => {
            const { isLog, userFollow, nowUser } = this.props.userStore;
            if (!isLog) alert('로그인 실패')
            else { this.props.history.push('/main') };
            userFollow(nowUser.id);
        });
        document.getElementsByName('signEmail').value = '';
        document.getElementsByName('signPassword').value = '';
        this.signEmail = '';
        this.signPassword = '';
    }

    handleSearch = () => {
        const { getSearchList } = this.props.userStore;
        getSearchList(this.searchText).then(res=>{
            const { searchList } = this.props.userStore;
            this.searchList = searchList.map(search => <div className='searchList'><Link to={{pathname : 'user', id : search.member_id}} onClick={this.handleState}><div >{search.name}</div><div>{search.detail}</div></Link></div>)
        });
    }
    handleState = () => {
        this.searchList = [];
        this.searchText = ''
        document.getElementsByName('searchText')[0].value = '';
    }
}

export default withRouter(Header);

const LogOut = styled.div`
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
height: 145px;
width: 100%;
#signIn{
    float: right;
    #name{
        display: inline-block;
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

#search{
    .searchList{
        position: sticky;
        background: white;
        width: 200px;
        height: 46px;
        border: 1px solid #e3d9d9;
    }
}

#menu{
    background: #d8d8d8;
    height: 24px;
    div{
        float: left;
        width: 49.7%;
        border: solid 1px #e0e7ff;
    }
}
`

const TopDiv = styled.div`
margin: 0 auto;
padding-top: 13px;
width: 100%;
height: 80px;
background: #ffb1b1;
`

const Logo = styled.div`
display: inline-block;
font-size: 34px;
color: #b57fff;
padding: 12px 0px 24px 30px;
`
