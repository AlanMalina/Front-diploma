import React, { Component } from 'react';
import './login-page.styles.css';
import loginService from '../../service/login-service';


class LogInPage extends Component{
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', userProfile: [], errors: {email: '', password: ''}};
        this.emailValue = this.emailValue.bind(this);
        this.passwordValue = this.passwordValue.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    emailValue(e) {
        const email = e.target.value
        this.setState({ email: email })
        console.log(email)
    }
    passwordValue(e) {
        const password = e.target.value
        this.setState({ password: password })
        console.log(password)
    }


    async logIn() {

        try{
            const response = await loginService.logInUser(this.state.email, this.state.password)
            this.setState({ userProfile: response.data })
            window.location.href = "/my-profile";
            console.log(response.data)
        }
        catch(e){
            console.log(e)
        }
        
    }
    
    

    render() {
        return(
            <div id='login-page-container' className='login-page-container'>
                <div className="login-photo-block">
                    <img className='login-back-photo' src="https://static.ukrinform.com/photos/2022_10/thumb_files/630_360_1665682812-404.jpg" alt="" />
                </div>
                <div className='login-form'>
                    <div className='login-email-block'>
                        <label htmlFor='login-email-input'>Email:</label>
                        <input id='login-email-input' type="text" className='login-email-input' name="email" value={this.state.email} onChange={this.emailValue} />
                        {/* {this.state.errors.email && <span>{this.state.errors.email}</span>} */}
                    </div>
                    <div className='login-password-block'>
                        <label htmlFor='login-password-input'>Password:</label>
                        <input id='login-password-input' type="password" className='login-password-input' name="password" value={this.state.password} onChange={this.passwordValue} />
                           {/* {this.state.errors.password && <span>{this.state.errors.password}</span>} */}
                    </div>     
                    <div className='btn-login' onClick={this.logIn}>
                        Log in                         
                    </div>             
                </div>
            </div>
        )
    }
}

export default LogInPage;