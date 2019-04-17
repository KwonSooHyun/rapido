import React from 'react'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'postStore')
@observer
export default class User extends React.Component {

    @observable userPostList = [];
    @observable user;

    componentDidMount(){
        const { getUser } = this.props.userStore;
        const { getUserPostList } = this.props.postStore;
        getUserPostList(this.props.location.id).then(res=>{
            const {userPostList} =this.props.postStore;
            this.userPostList = userPostList.map( userPost => 
                (<li key={userPost.member_id}><div>{userPost.name}</div><div>{userPost.text}</div><div><img src={'/upload/' + userPost.photo} /></div><div>{userPost.createDateTime}</div></li>)
            )
        });
        getUser(this.props.location.id).then(res=>{
            const { user } = this.props.userStore;
            this.user = (<div><div>{user.name}</div><div>{user.detail}</div></div>)
        })
    }

    render(){
        return(
            <div>
                <div>
                    {this.user}
                </div>
                <div>
                    {this.userPostList}
                </div>
            </div>
        )
    }

    
}