import React from 'react'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('userStore', 'postStore')
@observer
export default class Main extends React.Component {

    @observable postText = '';
    @observable searchText = '';
    @observable photo;
    @observable photoView;
    @observable postList = [];
    @observable searchList = [];

    componentDidMount() {
        const { getPostList } = this.props.postStore;
        const { nowUser } = this.props.userStore;

        getPostList(nowUser.id).then(res => {
            const { postList } = this.props.postStore;
            this.postList = postList.map(
                (post) => {
                    return (<li key={post.post_id}><div>{post.name}</div><div>{post.text}</div><div><img src={'/upload/' + post.photo} /></div><div>{post.createDateTime}</div></li>);
                }
            )
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input placeholder='문구 입력' name='postText' onChange={this.handleChange} />
                    <label htmlFor='photo' >사진 올리기</label>
                    <input type='file' id='photo' name='photo' onChange={this.handlePhoto} />
                    <button onClick={this.handleSubmit}>게시</button>
                </div>
                <div>
                    {this.photoView}
                </div>
                <div>
                    <input placeholder='검색' name='searchText' onChange={this.handleChange}/><button onClick={this.handleSearch}>검색</button>
                    {this.searchList}
                </div>
                <div>
                    {this.postList}
                </div>
            </div>
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

    handleSearch = () => {
        const { getSearchList } = this.props.userStore;
        getSearchList(this.searchText).then(res=>{
            const { searchList } = this.props.userStore;
            this.searchList = searchList.map(search => <Link to={{pathname : 'user', id : search.member_id}}><div>{search.name}</div><div>{search.detail}</div></Link>)
        });
    }
}
