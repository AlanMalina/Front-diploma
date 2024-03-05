import {Component} from 'react'
import './header.styles.css';
import {NavLink} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const setActive = ({isActive}) => (isActive ? 'active' : '')

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {sidebar: false, chatapp: false, }
        this.funcToast = this.funcToast.bind(this);
        this.ChatAppHandler = this.ChatAppHandler.bind(this);
        this.SideBarHandler = this.SideBarHandler.bind(this);
        this.closeChat = this.closeChat.bind(this)
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

    closeChat(){       
        
    }

    ChatAppHandler(){
        const chatapp = document.getElementById('chat-app')
        const container = document.getElementById('chat-container')

        if(this.state.chatapp === false){
            chatapp.style.top = '0'
            container.style.zIndex = '1'
            this.setState({chatapp: true})
        }else{
            chatapp.style.top = '-100vh'
            setTimeout(() => {
                container.style.zIndex = "-1"
            }, 500);
            this.setState({chatapp: false});
        }

        
    }

    SideBarHandler(){
        const sidebar = document.getElementById('sidebar');
        const container = document.getElementById('sidebar-container');

        if(this.state.sidebar === false){
            sidebar.style.right = '-54.427vw'
            container.style.zIndex = '1';
            this.setState({sidebar: true})
        }else{
            sidebar.style.right = '-100vw'
            setTimeout(() => {
                container.style.zIndex = "-1"
            }, 500);
            this.setState({sidebar: false});
        }
    }
    

    render() {
        
        return(
          <div className='header'>
            <div className='nav-left'>
                <div className='nav-item logo'>
                    <NavLink className={`${setActive} item-content`} to='/'>Logo</NavLink>
                </div>
                <div className='nav-item search-bar'>
                    <input id='item-content' type='text' />
                </div>
                <div className='nav-item search-icon'>
                    <a className='item-content'>0</a>
                </div>
            </div>
            <div className='nav-right'>
                <div className='nav-item'>
                    <NavLink className={`${setActive} create`} to='create-post'>+</NavLink>
                </div>
                <div className='nav-item chat'>
                    <a className='btn-chat item-content' onClick={this.ChatAppHandler}>
                        Chat
                    </a>
                </div>
                <div className='nav-item prof'>
                    <NavLink className={`${setActive} item-content`} to='/my-profile'>My profile</NavLink>
                </div>

                <div className='nav-item burger'>
                    <a className='btn-burger item-content' onClick={this.SideBarHandler}>
                        =
                    </a>
                </div>
            </div>

          </div>

          
        )
    }
}

export default Header