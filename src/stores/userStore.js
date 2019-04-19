import { observable, action, computed } from 'mobx'
import Autobind from 'autobind-decorator'
import userModel from './model/userModel'
import userRepository from './repository/userRepository'


@Autobind
class userStore {

    @observable userList = [];
    @observable searchList = [];
    @observable nowUser;
    @observable user;
    @observable isJoin;
    @observable isLog;
    @observable followIndex;

    constructor(store) {
        this.store = store;
    }

    getSession = async () =>{
        try {
            await userRepository.getSession().then(res=>{
                const { data } = res;
                if(data.member_id){
                    this.nowUser = {
                        id: data.member_id,
                        name: data.name
                    }
                    this.isLog = true;
                }else{
                    this.nowUser =undefined;
                    this.isLog = false;
                }
            })
        } catch (e) {
            console.log(e)
            this.isLog = false;
        }
    }

    logOut = async () => {
        await userRepository.logOut().then(res=>{
            const { data } = res;
            console.log(data)
        })
    }
    restNowUser=()=>{
        this.nowUser = undefined
    }

    addUser = async (userData) => {
        const { joinEmail, name, joinPassword } = userData;
        try {
            await userRepository.addUser(joinEmail, name, joinPassword).then(res => {
                this.isJoin = true;
            })
        } catch (e) {
            console.log(e);
            this.isJoin = false;
        }
    }

    @action
    signUser = async (userData) => {
        const { signEmail, signPassword } = userData;
        try {
            await userRepository.signUser(signEmail, signPassword).then(res => {
                const { data } = res;
                this.nowUser = {
                    id: data[0].member_id,
                    name: data[0].name
                }
                this.isLog = true;
            })
        } catch (e) {
            console.log(e);
            this.isLog = false;
        }
    }

    @action
    userFollow = async (userId) => {
        try {
            await userRepository.userFollow(userId).then(res => {
                const { data } = res
                console.log(data[0])
                this.nowUser.following = data[0].following;
                this.nowUser.follower = data[0].follower;
            });
        } catch (e) {
            console.log(e)
        }
    }

    @action
    getUser = async (userId) => {
        try {
            await userRepository.getUser(userId).then(res => {
                const { data } = res;
                this.user = data[0];
            });
        } catch (e) {
            console.log(e)
        }
    }

    @action
    getSearchList = async (searchText) => {
        try {
            await userRepository.getSearchList(searchText).then(res => {
                const { data } = res;
                this.searchList = data.map(search => new userModel(search));
            })
        } catch (e) {
            console.log(e)
        }
    }

    @action
    isFollow = async (ownerId,id) => {
        try {
            await userRepository.isFollow(ownerId,id).then(res => {
                const { data } = res;
                console.log(data[0]);
                this.followNum = data[0].follow_num;
            })
        } catch (e) {
            console.log(e);
        }
    }

    unFollow = async (ownerId, id) => {
        await userRepository.unFollow(ownerId, id).then(res => {
            alert('팔로우 취소')
        })
    }

    follow = async (ownerId, id) => {
        await userRepository.follow(ownerId, id).then(res => {
            alert('팔로우')
        })
    }

}

export default new userStore();