import { observable, action, computed, extendObservable } from 'mobx'
import Autobind from 'autobind-decorator'
import userModel from './model/userModel'
import userRepository from './repository/userRepository'


@Autobind
class userStore {

    @observable userList = [];
    @observable searchList = [];
    @observable nowUser;
    @observable follow;
    @observable user;
    @observable isJoin;
    @observable isLogger;

    constructor(store) {
        this.store = store;
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
                this.isLogger = true;
            })
        } catch (e) {
            console.log(e);
            this.isLogger = false;
        }
    }

    @action
    userFollow = async (userId) => {
        try {
            await userRepository.userFollow(userId).then(res => {
                const { data } = res
                this.nowUser.following = data[0].following;
                this.nowUser.follower = data[0].follower;
            });
        } catch (e) {
            console.log(e)
        }
    }

    @action
    setUser = async (userId) => {
        try {
            await userRepository.setUser(userId).then(res => {
                const { data } = res;
                this.userList.push(data[0]);
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
            
        }
    }
}

export default new userStore();