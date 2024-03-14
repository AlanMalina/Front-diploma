import React, { Component } from "react";
import './side-bar.styles.css';
import { NavLink } from "react-router-dom";
import ChatPage from "../../pages/chat-page/chat-page.component";


const setActive = ({isActive}) => (isActive ? 'active' : '')


class SideBar extends Component {

    constructor(props){
        super(props)
        this.props = props;
        this.state = {chat_in_sidebar: false, sidebar: false}
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.CloseSideBar = this.CloseSideBar.bind(this)
        // this.ChatAppHandlerSide = this.ChatAppHandlerSide.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    handleClickOutside(e) {
        const sidebar = document.getElementById('sidebar')
        const container = document.getElementById('sidebar-container');
        const blur = document.getElementById('black-blur');

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            blur.style.opacity = '0'
            sidebar.style.right = '-100vw';
            container.style.zIndex = '-1';
        }
    }

    CloseSideBar(){
        const sidebar = document.getElementById('sidebar');
        const container = document.getElementById('sidebar-container');
        const blur = document.getElementById('black-blur');

        if(this.props.sidebar_in_header === false){
            sidebar.style.right = '-54.427vw'
            container.style.zIndex = '1';
            this.setState({sidebar_in_header: true})
        }else{
            blur.style.opacity = '0'
            sidebar.style.right = '-100vw'
            // blur.style.right = '-100vw'
            setTimeout(() => {
                container.style.zIndex = "-1"
            }, 500);
            this.setState({sidebar_in_header: false});
        }
    }

    // ChatAppHandlerSide(){
    //     const chat = document.getElementById('chat-app')
    //     const chat_container = document.getElementById('chat-container')

    //     if(this.state.chat_in_sidebar === false){
    //         chat.style.top = '0'
    //         chat_container.style.zIndex = '1'
    //         this.setState({chat_in_sidebar: true})
    //     }else{
    //         chat.style.top = '-100vh'
    //         chat_container.style.zIndex = "-1"
    //         this.setState({chat_in_sidebar: false});
    //     }

        
    //    }
    render() {
        return(
            <div id="sidebar-container" className='sidebar-container'>
                <div id='black-blur' className="black-blur"></div>
                <div id="sidebar" className="sidebar" ref={this.wrapperRef}>
                    {/* <div className="col_1">
                        <div className="avatar-sidebar">
                            <img src='./img/avatar icon.svg'/>
                        </div>
                        <img className="chat-img" src='./img/Chat button.svg'/>
                        <img className='create-img' src='./img/+.svg'/>
                    </div>
                    <div className="col_2">
                        <NavLink className={`${setActive} my-prof`} to='/my-profile'>My profile</NavLink>
                        <NavLink className={`${setActive} chat-sidebar`} to='create-post'>Chat</NavLink>
                        <NavLink className={`${setActive} create-post-sidebar`} to='create-post'>Create Post</NavLink>
                    </div> */}

                    <div className="my-profile-block_sidebar" onClick={this.CloseSideBar}>
                        <NavLink className={`${setActive} my-prof-btn-sidebar` }  to='/my-profile'>
                            <div className="avatar-sidebar">
                                <img src='./img/avatar icon.svg'/>
                            </div>
                            My profile
                        </NavLink>
                    </div>
                    <div className="chat-block_sidebar" onClick={this.CloseSideBar}>
                        <NavLink className={`${setActive} chat-btn-sidebar`} to='/chat'>
                            <img src='./img/Chat button.svg'/>
                            Chat
                        </NavLink>
                    </div>
                    <div className="create-post-block_sidebar" onClick={this.CloseSideBar}>
                        <NavLink className={`${setActive} create-btn-sidebar` } to='/create-post'>
                            <img src='./img/+.svg'/>
                            Create post
                        </NavLink>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default SideBar;