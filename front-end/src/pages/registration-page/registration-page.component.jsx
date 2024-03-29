import React, { Component } from 'react';
import './registration-page.styles.css';
import { NavLink } from 'react-router-dom';
import postService from "../../service/post-service";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {user: [], email: '', password: '', userName: '', userSurname: '', errors: {email: '', password: '', userName: '', userSurname: ''}}
        this.postUser = this.postUser.bind(this);
    }    

    async postUser(){
        // if (this.state.link === '') {
        //     alert('The form cannot be empty! Please enter it');
        //     console.error('The form is empty');
        // }else{
        //     const response = await postService.postUser(this.state.email, this.state.password, this.state.userName, this.state.userSurname)
        //     this.setState({user: response.data})
        //     console.log(response.data)
        // }

        const { email, password, userName, userSurname } = this.state;
        const errors = {};
        let isValid = true;
        
        try{
            if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                errors.email = 'Неправильний формат email';
                isValid = false;
            } if (password.length < 8) {
                errors.password = 'Пароль повинен містити принаймні 8 символів';
                isValid = false;
            }if (userName === '') {
                errors.userName = "Це поле є обов'язковим";
                isValid = false;
            }if (userSurname === '') {
                errors.userSurname = "Це поле є обов'язковим";
                isValid = false;
            }if(isValid) {
                const response = await postService.postUser(this.state.email, this.state.password, this.state.userName, this.state.userSurname)
                window.location.href = "/main";
                this.setState({user: response.data})
            }
    
            this.setState({ errors });
        }
        catch(err){
            console.log(err)
        }

        
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        let errors = { ...this.state.errors };
    
        switch (name) {
            case 'email':
                errors.email = !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? 'Неправильний формат email' : ''
            break;
            case 'password':
                errors.password = value.length < 8 ? 'Пароль повинен містити принаймні 8 символів' : '';
            break;
            case 'userName':
                errors.userName = value.length < 1 ? "Це поле є обов'язковим" : '';
            break;
            case 'userSurname':
                errors.userSurname = value.length < 1  ? "Це поле є обов'язковим" : '';
            break;
          default:
            break;
        }
        if (!errors.email && !errors.password && !errors.userName && !errors.userSurname && this.state.email && this.state.password && this.state.userName && this.state.userSurname !== '') {
            console.log('Email:', this.state.email);
            console.log('Password:', this.state.password);
            console.log('Password:', this.state.userName);
            console.log('Password:', this.state.userSurname);
        } else {
            console.log('Форма містить помилки. Будь ласка, виправте їх перед відправкою.');
        }
        
        this.setState({
          [name]: value,
          errors: errors
        });
        
      }

    render(){

        const { email, password, userName, userSurname, errors } = this.state;

        return(
            <div id='register-page-container' className='register-page-container'>
                <div className="photo-block">
                    <img className='back-photo' src="https://static.ukrinform.com/photos/2022_10/thumb_files/630_360_1665682812-404.jpg" alt="" />
                </div>
                <div className='register-form'>
                    <div className='email-block'>
                        <label htmlFor='email-input'>Email:</label>
                        <input id='email-input' type="text" className='email-input' name="email" value={email} onChange={this.handleChange} />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className='password-block'>
                        <label htmlFor='password-input'>Password:</label>
                        <input id='password-input' type="password" className='password-input' name="password" value={password} onChange={this.handleChange} />
                           {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className='userName-block'>
                        <label htmlFor='userName-input'>Name:</label>
                        <input id='userName-input' type="text" className='userName-input' name="userName" value={userName} onChange={this.handleChange} />
                        {errors.userName && <span>{errors.userName}</span>}
                    </div>
                    <div className='userSurname-block'>
                        <label htmlFor='userSurname-input'>Surname:</label>
                        <input id='userSurname-input' type="text" className='userSurname-input' name="userSurname" value={userSurname} onChange={this.handleChange} />
                        {errors.userSurname && <span>{errors.userSurname}</span>}
                    </div>
                    <div className='btn-register' >
                        <div className='navlink-btn' onClick={this.postUser} >
                            Register
                        </div>                            
                    </div>                    
                </div>
            </div>
        )
    }
}

export default RegistrationPage;