import React from 'react';
import styled from 'styled-components';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer   
export default class Join extends React.Component {

    @observable joinEmail='';
    @observable name='';
    @observable joinPassword='';

    render() {
        return (
            <Wraper>
                <div id='left'>
                    <img src='/upload/network.png'/>
                </div>
                <div id='right'>
                    <h3>회원 가입</h3>
                    <h4>다양한 사람들을 만나보세요!</h4>
                    <input name='joinEmail' placeholder='이메일' onChange={this.handleChange} value={this.joinEmail} /><br/>
                    <input name='name' placeholder='이름' onChange={this.handleChange} value={this.name} /><br/>
                    <input type='password' name='joinPassword' placeholder='비밀번호' onChange={this.handleChange} value={this.joinPassword} /><br/>
                    <button onClick={this.handleSubmit}>회원가입</button>
                </div>
            </Wraper>
        );
    }
    
    
    @action
    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }

    @action
    handleSubmit = () => {
        const {addUser} = this.props.userStore;
        addUser(this).then(res=>{
                const {isJoin} = this.props.userStore;
                if(!isJoin) alert('가입 실패');
                else alert('가입을 축하드립니다!');
        });
        document.getElementsByName('joinEmail').value = '';
        document.getElementsByName('name').value = '';
        document.getElementsByName('joinPassword').value = '';
        this.joinEmail = '';
        this.name = '';
        this.joinPassword = '';
    }

}



const Wraper = styled.div`
height: 550px;
#left{
    float: left;
    width: 50%;
    height: 100%;
    text-align: center;
    img{
        width: 50%;
        padding-top: 10%;
    }
}
#right{
    float: right;
    width: 50%;
    height: 100%;
    padding-top: 10%;
}
`