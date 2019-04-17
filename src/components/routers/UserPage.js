import React from 'react'
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore', 'postStore')
@observer
export default class UserPage {

    @observable postList = [];
    
    render(){
        return(
            <div>
                
            </div>
        )
    }
}