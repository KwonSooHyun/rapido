import React from 'react'
import styled from 'styled-components';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom'

@inject('userStore', 'postStore')
@observer
class User extends React.Component {

    @observable userPostList = [];
    @observable user;
    @observable id;
    @observable ownerId;
    @observable followButton;

    componentDidMount(){
        this.userPageRender();
    }
    componentDidUpdate(){
        if(this.id !== this.props.location.id){
            this.userPageRender();
        }
    }

    render(){
        if(this.id !== this.props.location.id){
            this.isFollow(this.props.location.id);
        }
        return(
            <UserDiv>
                <Profile>
                    {this.user}
                </Profile>
                <div id='postDiv'>
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
            const {nowUser} =this.props.userStore;
            this.userPostList = userPostList.map( userPost => 
                (<li key={userPost.member_id} className='postList'><div>{userPost.name}</div><div>{userPost.text}</div><div><img src={'/upload/' + userPost.photo} /></div><div>{userPost.createDateTime}</div>{nowUser.id===this.id&&(<button onClick={this.postDelete.bind(this,userPost.post_id)}>삭제</button>)}</li>)
            )
        });
        getUser(this.props.location.id).then(res => {
            const { user } = this.props.userStore;
            this.user = (<div><div>이름 : {user.name}</div><div>상세 정보 : {user.detail === undefined ? '없음' : user.detail}</div>
                {this.followButton}
            </div>)
        })
    }

    isFollow = (id) => {
        const {nowUser, isFollow} = this.props.userStore; 
        isFollow(nowUser.id,id).then(res=>{
            const {followNum} = this.props.userStore; 
            if(followNum===1){
                this.followButton = (<button id='click' onClick={this.handleUnFollow}>팔로우 취소</button>) 
            }else if(nowUser.id !== id){
                this.followButton = (<button id='click' onClick={this.handleFollow}>팔로우</button>) 
            }else{
                this.followButton = ''
            }
        });
    }

    handleUnFollow = (e) => {
        const {nowUser, unFollow} = this.props.userStore; 
        e.preventDefault();
        unFollow(nowUser.id, this.id).then(res => {
            const {userFollow} = this.props.userStore;
            userFollow(nowUser.id);
        })
        this.props.history.push('/main')
    }

    handleFollow = (e) => {
        const {nowUser, follow} = this.props.userStore; 
        e.preventDefault();
        follow(nowUser.id, this.id).then(res => {
            const {userFollow} = this.props.userStore;
            userFollow(nowUser.id);
        })
        this.props.history.push('/main')
    }
    
    postDelete = (id, e) => {
        e.preventDefault();
        const { postDelete } = this.props.postStore;
        postDelete(id);
    }
}

export default withRouter(User);

const Profile = styled.div`
border: 1px solid #dcdcdc;
text-align: center;
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
#postDiv{
    text-align: center;
    li{
        margin: 0 auto;
    }
}
`