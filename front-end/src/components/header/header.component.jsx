import React, {Component} from 'react'
import './header.styles.css';
import {NavLink} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const setActive = ({isActive}) => (isActive ? 'active' : '')

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {sidebar_in_header: false, chatapp_in_header: false}
        this.funcToast = this.funcToast.bind(this);
        this.ChatAppHandler = this.ChatAppHandler.bind(this);
        this.SideBarHandler = this.SideBarHandler.bind(this);
    }

    

    funcToast(){
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            className:'toaster'
            });
    }


    ChatAppHandler(){
        const chatapp = document.getElementById('chat-app')
        const container = document.getElementById('chat-container')

        if(this.state.chatapp_in_header === false){
            chatapp.style.top = '0'
            container.style.zIndex = '1'
            this.setState({chatapp_in_header: true})
        }else{
            chatapp.style.top = '-100vh'
            setTimeout(() => {
                container.style.zIndex = "-1"
            }, 200);
            this.setState({chatapp_in_header: false});
        }

        
    }

    SideBarHandler(){
        const sidebar = document.getElementById('sidebar');
        const blur = document.getElementById('black-blur');
        const container = document.getElementById('sidebar-container');

        if(this.state.sidebar_in_header === false){
            container.style.zIndex = '1';
            blur.style.right = '0vw'
            setTimeout(() => {
                blur.style.opacity = '30%'
                sidebar.style.right = '-54.427vw'
            }, 100)
            this.setState({sidebar_in_header: true})
        }
        else{
            blur.style.opacity = '0%';
            sidebar.style.right = '-100vw';
            container.style.zIndex = '-1';
            this.setState({sidebar_in_header: false});
        }
    }
    

    render() {
        
        return(
          <div className='header'>
            <div className='nav-left'>
                <div className='nav-item logo'>
                    <NavLink className={`${setActive} item-content`} to='/'>Logo</NavLink>
                </div>
                {/* <div className='nav-item search-bar'>
                    <input id='item-content' type='text' />
                </div> */}
                <div className='nav-item search-icon'>
                    <a className='item-content'>0</a>
                </div>
            </div>
            <div className='nav-right'>
                <div className='nav-item '>
                    <NavLink className={`${setActive} create item-content`} to='create-post'>
                        <img src="../img/create_header_icon.svg"/>
                    </NavLink>
                </div>
                <div className='nav-item chat'>
                    <a className='btn-chat ' onClick={this.ChatAppHandler}>
                        <img src="../img/chat_header_icon.svg"/>
                    </a>
                </div>
                <div className='nav-item'>
                    <NavLink className={`${setActive} prof item-content`} to='/my-profile'>
                        {/* <div className="avatar-header"> */}
                            <img src='../img/avatar_header_icon.svg'/>
                        {/* </div> */}
                    </NavLink>
                </div>

                <div className='nav-item burger'>
                    <a className='btn-burger' onClick={this.SideBarHandler}>
                        <img src="../img/Burger btn.svg"/>
                    </a>
                </div>
            </div>

          </div>

          
        )
    }
}

export default Header