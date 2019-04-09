import React from 'react';
import { observable, action} from 'mobx';
import { observer, inject } from 'mobx-react';
import {withRouter, Redirect} from 'react-router-dom'

@inject('userStore')
@observer   
class Header extends React.Component {
    
    @observable email;
    @observable password;
    @observable user;

    componentWillUpdate(){
        const { user } = this.props.userStore;
        if(user !== undefined && !this.isUser){
            this.props.history.push('/main');
            this.isUser = true;
        }
    }
    
    render(){
        const { user } = this.props.userStore;
        if(user === undefined){
            return(
                <div>
                    이메일 : <input type='email' name='email' onChange={this.handleChange} value={this.email} />
                    비밀번호 : <input type='password' name='password' onChange={this.handleChange} value={this.password} />
                    <button onClick={this.handleSubmit}>로그인</button>
                </div>  
            );
        }else{  
            
            return(
                <div>
                    {user.name} 님 환영합니다!
                </div>
            );
        }
        
    }

    @action
    handleChange = (e) => {
        this[e.target.name] = e.target.value;
    }

    @action
    handleSubmit = () => {
        const {signUser} = this.props.userStore;
        signUser(this);
    }
}

export default withRouter(Header);