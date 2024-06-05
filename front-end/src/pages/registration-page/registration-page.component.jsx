import React, { Component } from 'react';
import './registration-page.styles.css';
import postService from "../../service/post-service";
import { NavLink } from 'react-router-dom';
import loginService from '../../service/login-service';

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {user: [], email: '', password: '', userName: '', userSurname: '', errors: {email: '', password: '', userName: '', userSurname: ''},
    role: '', isVolonteerChecked: false, isDonorChecked: false, isMilitaryChecked: false, aproveRules: false}
        this.postUser = this.postUser.bind(this);
    }    

    async postUser(){
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
                // const response = await postService.postUser(this.state.email, this.state.password, this.state.userName, this.state.userSurname)
                const response = await loginService.addUser(this.state.aproveRules, 
                                                            this.state.role, 
                                                            this.state.email, 
                                                            this.state.password, 
                                                            this.state.userName, 
                                                            this.state.userSurname)
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

      chooseRole = (role, check) => {
        if (role === 'donor') {
            this.setState({ isDonorChecked: check.checked, isVolonteerChecked: false, isMilitaryChecked: false, role: role });
            console.log(role)
        } else if (role === 'volunteer') {
            this.setState({ isVolonteerChecked: check.checked, isDonorChecked: false, isMilitaryChecked: false, role: role });
            console.log(role)
        } else if (role === 'military') {
            this.setState({ isMilitaryChecked: check.checked, isDonorChecked: false, isVolonteerChecked: false, role: role });
            console.log(role)
        }else{
            this.setState({ isMilitaryChecked: false, isDonorChecked: false, isVolonteerChecked: false, role: role });
            console.log(role)
        }
    }

    aproveRules = (e) => {
        this.setState({ aproveRules: e.target.checked });
        console.log(e.target.checked)
        console.log(this.state.aproveRules)
    }


    render(){

        const { email, password, userName, userSurname, errors } = this.state;

        return(
            <div id='register-page-container' className='register-page-container'>
                <div className="register-photo-block">
                    <img className='register-back-photo' src="https://static.ukrinform.com/photos/2022_10/thumb_files/630_360_1665682812-404.jpg" alt="" />
                </div>
                
                <div className='register-form'>
                    <div className='register-email-block'>
                        <label htmlFor='register-email-input'>Електрона пошта:</label>
                        <input id='register-email-input' type="text" className='register-email-input' name="email" value={email} onChange={this.handleChange} />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className='register-password-block'>
                        <label htmlFor='register-password-input'>Пароль:</label>
                        <input id='register-password-input' type="password" className='register-password-input' name="password" value={password} onChange={this.handleChange} />
                           {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className='register-userName-block'>
                        <label htmlFor='register-userName-input'>Ім'я:</label>
                        <input id='register-userName-input' type="text" className='register-userName-input' name="userName" value={userName} onChange={this.handleChange} />
                        {errors.userName && <span>{errors.userName}</span>}
                    </div>
                    <div className='register-userSurname-block'>
                        <label htmlFor='register-userSurname-input'>Прізвище:</label>
                        <input id='register-userSurname-input' type="text" className='register-userSurname-input' name="userSurname" value={userSurname} onChange={this.handleChange} />
                        {errors.userSurname && <span>{errors.userSurname}</span>}
                    </div>
                    <div className='role-form'>
                        Роль: 
                        <div className='check-block'>
                            <input
                                id='donor-CheckBox'
                                className='CheckBox'
                                type="checkbox"
                                checked={this.state.isDonorChecked}
                                // onChange={this.chooseUserRole}
                                onChange={(e) => this.chooseRole('donor', e.target)}
                            />
                            <label className='checkBox-label' htmlFor='user-CheckBox'>Донор</label>
                            <input
                                id='volunteer-CheckBox'
                                className='CheckBox'
                                type="checkbox"
                                checked={this.state.isVolonteerChecked}
                                // onChange={this.chooseVolunteerRole}
                                onChange={(e) => this.chooseRole('volunteer', e.target)}
                            />
                            <label className='checkBox-label' htmlFor='volunteer-CheckBox'>Волонтер</label>
                            <input
                                id='military-CheckBox'
                                className='CheckBox'
                                type="checkbox"
                                checked={this.state.isMilitaryChecked}
                                // onChange={this.chooseMilitaryRole}
                                onChange={(e) => this.chooseRole('military', e.target)}
                            />
                            <label className='checkBox-label' htmlFor='volunteer-CheckBox'>Військовий</label>
                        </div>
                    </div>
                    <div className='approve-checkbox'>
                        <input
                            id='aprove-rules'
                            className='CheckBox'
                            type="checkbox"
                            checked={this.state.aproveRules}
                            onChange={this.aproveRules}
                        />
                        Підтвердіть що ви надаєте право на обробку та зберігання ваших даних
                    </div>
                    {/* <div style={{display: 'flex', alignItems: 'center', marginTop: '4.537vh', gap: '2.5vw'}}> */}
                    {this.state.aproveRules !== true ? (
                        <div className='btn-register' style={{opacity: '80%', cursor: 'not-allowed'}}>
                            Далі                         
                        </div> 
                    ) : (
                        <div className='btn-register' onClick={this.postUser}>
                            Далі                         
                        </div> 
                    )}
                        
                    <NavLink to='/login' style={{ fontStyle: 'italic', fontSize: '1.042vw', marginTop: '1vh'}}>
                        Якщо у вас вже є акаунт?    
                    </NavLink> 
                    
                    {/* </div> */}
                                      
                </div>
            </div>
        )
    }
}

export default RegistrationPage;