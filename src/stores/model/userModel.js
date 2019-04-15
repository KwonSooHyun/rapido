import { observable, action, computed, extendObservable} from 'mobx'
import Autobind from 'autobind-decorator'

@Autobind
export default class userModel {

    constructor(data) {
        extendObservable(this, data);
    }

}