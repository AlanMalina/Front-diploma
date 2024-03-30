import React, { Component } from "react";
import './chat-app.styles.css';


class ChatApp extends Component {

    constructor(props){
        super(props)
        this.props = props
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    
      handleClickOutside(e) {
        const chatapp = document.getElementById('chat-app')
        const container = document.getElementById('chat-container')
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            chatapp.style.top = '-100vh'
            container.style.zIndex = "-1"
        }
      }

    render() {
        return(
            <div id="chat-container" className='chat-app-container' >
                <div id='chat-app' className="chat-app" ref={this.wrapperRef}>
                    <div className="user-chat-container">
                        <img className="avatar-chat" src="../img/kolobok.png" alt="avatar" />
                        <div className="userName-chat">
                            Юра Сеатович
                        </div>
                        <div className="last-message">
                            Шо ти галава
                        </div>
                        <img className="check-read-icon" src="../img/check-read.png" alt="read" />
                        <div className="message-time">
                            15:17
                        </div>
                        <div className="message-nofication">
                            1
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default ChatApp;