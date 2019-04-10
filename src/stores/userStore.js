import { observable, action, computed, extendObservable } from 'mobx'
import Autobind from 'autobind-decorator'
import userModel from './model/userModel'
import userRepository from './repository/userRepository'

@Autobind
class userStore {

    @observable userList = [];
    @observable user;
    @observable isLogger;

    constructor(store) {
        this.store = store;
    }

    addUser = async (userData) => {
        const { email, name, password } = userData;
        await userRepository.addUser(email, name, password)
    }

    @action
    signUser = async (userData) => {
        const { email, password } = userData;
        try {
            await userRepository.signUser(email, password).then(res => {
                const { data } = res
                this.user = {
                    id : data[0].member_id,
                    name : data[0].name
                }
                this.isLogger =true;
            })
        } catch (e) {
            console.log(e);
            this.isLogger =false;
        }
    }

    @action
    userFollow = async (userId) => {
        try {
            await userRepository.userFollow(userId).then(res =>{
                const { data } = res
                this.user.following = data[0].following;
                this.user.follower = data[0].follower;
            });
        } catch (e) {
            console.log(e)
        }
    }
    

}

export default new userStore();