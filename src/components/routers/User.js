import React from 'react'
import styled from 'styled-components';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'postStore')
@observer
export default class User extends React.Component {

    @observable userPostList = [];
    @observable user;
    @observable id;
    @observable followButton;

    componentDidMount(){
        this.userPageRender()
    }
    componentDidUpdate(){
        if(this.id !== this.props.location.id)
            this.userPageRender()
    }

    render(){
        return(
            <UserDiv>
                <Profile>
                    {this.user}
                </Profile>
                <div>
                    {this.userPostList}
                </div>
            </UserDiv>
        )
    }

    userPageRender = () => {
        this.id = this.props.location.id
        const { getUser } = this.props.userStore;
        const { getUserPostList } = this.props.postStore;
        getUserPostList(this.props.location.id).then(res=>{
            const {userPostList} =this.props.postStore;
            this.userPostList = userPostList.map( userPost => 
                (<li key={userPost.member_id} className='postList'><div>{userPost.name}</div><div>{userPost.text}</div><div><img src={'/upload/' + userPost.photo} /></div><div>{userPost.createDateTime}</div></li>)
            )
        });
        getUser(this.props.location.id).then(res => {
            const { user } = this.props.userStore;
            this.user = (<div><div>이름 : {user.name}</div><div>상세 정보 : {user.detail === undefined ? '없음' : user.detail}</div>
                {this.followButton}
            </div>)
        })
    }
    
}

const Profile = styled.div`

`

const UserDiv = styled.div`
.postList{
    list-style: none;
    border: 1px solid #dcdcdc;
    width: 700px;
    text-align: center;
    img{
        width: 700px;
    }
}
`