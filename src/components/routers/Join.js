import React from 'react';
import styled from 'styled-components';
import { observable, action} from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer   
export default class Join extends React.Component {

    @observable email;
    @observable name;
    @observable password;

    render() {
        return (
            <Wraper>
                <h3>회원 가입</h3>
                <h4>다양한 사람들을 만나보세요!</h4>

                <input type='email' name='email' placeholder='이메일' onChange={this.handleChange} value={this.email} />
                <input type='text' name='name' placeholder='이름' onChange={this.handleChange} value={this.name} />
                <input type='password' name='password' placeholder='비밀번호' onChange={this.handleChange} value={this.password} />
                <button onClick={this.handleSubmit}>회원가입</button>
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
        addUser(this);
    }

}



const Wraper = styled.div`
h3{
    color : red;
}
`