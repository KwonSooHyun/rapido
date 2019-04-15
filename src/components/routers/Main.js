import React from 'react'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { setTimeout } from 'timers';

@inject('userStore', 'postStore')
@observer
export default class Main extends React.Component {

    @observable postText = '';
    @observable photo;
    @observable photoView;
    @observable list = [];

    componentDidMount() {
        const { getPostList } = this.props.postStore;
        const { user } = this.props.userStore;

        getPostList(user.id).then(res => {
            setTimeout(() => {
                const { postList } = this.props.postStore;        
                this.list = postList.map(
                    post => {
                        return (<ul><li key={post.post_id+'_0'}>게시자 이름</li><li key={post.post_id+'_1'}>{post.text}</li><li key={post.post_id+'_2'}><img src={'/upload/'+post.photo}/></li><li key={post.post_id+'_3'}>{post.createDateTime}</li></ul>);
                    }
                )
            }, 0);
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
                    <input placeholder='검색' /><button onClick={this.handleSearch}>검색</button>
                </div>
                <div>
                    게시물
                    {this.list}
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
        const { user } = this.props.userStore;
        addPost(user.id, this.postText, this.photo).then(res => {
            setTimeout(() => {
                const { isPosting } = this.props.postStore;
                if (!isPosting) alert('포스팅 실패');
                else alert('포스팅 완료!');
            }, 0);
        });

        document.getElementsByName('postText')[0].value = '';
        this.text = '';
        this.photo = '';
        this.photoView = '';
        
    }

    handleSearch = () => {
        console.log('검색 클릭')
    }
}

