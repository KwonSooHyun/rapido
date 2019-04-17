import { observable, action } from 'mobx'
import Autobind from 'autobind-decorator'
import postRepository from './repository/postRepository'
import postModel from './model/postModel'

@Autobind
class postStore{

    @observable postList = [];
    @observable userPostList = [];
    @observable isPosting;

    constructor(store) {
        this.store = store;
    }

    @action
    addPost = async (id, name, text, photo) => {
        try {
            await postRepository.addPost(id, name, text, photo).then(res=>{
                this.isPosting = true;
            });
        } catch (e) {
            console.log(e);
            this.isPosting = false;
        }
    }

    getPostList = async (userId) => {
        try {
            await postRepository.getPostList(userId).then(res=>{
                const { data } = res
                this.postList = data.map(post => new postModel(post));
            });
        } catch (e) {
            console.log(e);
        }
    }

    getUserPostList = async (userId) => {
        try {
            await postRepository.getUserPostList(userId).then(res=> {
                const { data } = res;
                this.userPostList = data.map(post => new postModel(post));
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export default new postStore();