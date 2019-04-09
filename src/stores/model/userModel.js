import { observable, action, computed, extendObservable} from 'mobx'
import Autobind from 'autobind-decorator'

@Autobind
export default class userModel {

    constructor(data) {
        extendObservable(this, data);
    }
    @computed
    get getUser(){
        return this.user
    }

    @action
    changeUser(user){
        this.user = user;
    }
}

// export default new userModel();