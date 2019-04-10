import { observable, action, computed, extendObservable } from 'mobx'
import Autobind from 'autobind-decorator'
import userModel from './model/userModel'
import userRepository from './repository/userRepository'

@Autobind
class userStore {

    @observable userList = [];
    @observable user;

    constructor(store) {
        this.store = store;
    }

    addUser = (userData) => {
        const { email, name, password } = userData;
        userRepository.addUser(email, name, password).then(res => {
            console.log(res);
            alert("가입 완료!");
        }).catch(e=>{
            console.log(e);
            alert("가입 실패!");
        })
    }

    @action
    signUser = async (userData) => {
        const { email, password } = userData;
        await userRepository.signUser(email, password).then((res) => {
            const { data } = res

            this.user = {
                id : data[0].member_id,
                name : data[0].name
            }
        }).catch((e) => {
            console.log(e);
        });
    }
    
}

export default new userStore();