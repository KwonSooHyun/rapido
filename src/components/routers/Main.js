import React from 'react';
import styled from 'styled-components';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'postStore')
@observer
export default class Main extends React.Component {

    @observable postText = '';
    @observable photo;
    @observable photoView;
    @observable postList = [];

    componentDidMount() {
        const { getPostList } = this.props.postStore;
        const { nowUser } = this.props.userStore;

        getPostList(nowUser.id).then(res => {
            const { postList } = this.props.postStore;
            this.postList = postList.map(
                (post) => {
                    return (<li key={post.post_id} className = 'postList'><div>{post.name}</div><div>{post.text}</div><div><img src={'/upload/'+ post.photo} /></div><div>{post.createDateTime}</div></li>);
                }
            )
        });
    }

    render() {
        return (
            <MainDiv>
                <div>
                    <input placeholder='게시 글' name='postText' onChange={this.handleChange} />
                    <label htmlFor='photo' id='photoLabel'>사진 선택</label>
                    <input type='file' id='photo' name='photo' onChange={this.handlePhoto} />
                    <button onClick={this.handleSubmit}>게시</button>
                </div>
                <div>
                    {this.photoView}
                </div>
                <div>
                    {this.postList}
                </div>
            </MainDiv>
        )
    }

    @action
    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }

    @action
    handlePhoto = (e) => {
        if (e.target.files !== undefined) {
            this.photo = e.target.files[0];
            const fr = new FileReader();
            fr.readAsDataURL(e.target.files[0]);
            fr.onload = (e) => {
                this.photoView = (<img src={e.target.result} />);
            }
        }
    }

    handleSubmit = () => {
        const { addPost } = this.props.postStore;
        const { nowUser } = this.props.userStore;
        addPost(nowUser.id, nowUser.name, this.postText, this.photo).then(res => {
            const { isPosting } = this.props.postStore;
            if (!isPosting) alert('포스팅 실패');
            else alert('포스팅 완료!');
        });

        document.getElementsByName('postText')[0].value = '';
        this.text = '';
        this.photo = '';
        this.photoView = '';
    }
}


const MainDiv = styled.div`
.postList{
    list-style: none;
    border: 1px solid #dcdcdc;
    width: 700px;
    text-align: center;
    img{
        width: 700px;
    }
}
#photo{
    display: none;
}
#photoLabel{
    text-align: center;
    cursor: default;
    background-color: #b6b6b6;
    box-sizing: border-box;
    padding: 1px 6px;
    border-width: 2px;
    border-style: outset;
    color: #f6f6f6;
    margin-right: 3px;
    margin-left: 3px;
}
`