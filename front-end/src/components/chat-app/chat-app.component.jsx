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

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            chatapp.style.top = '-100vh'
        }
      }

    render() {
        return(
            <div id="chat-container" className='chat-container' >
                <div id='chat-app' className="chat-app" ref={this.wrapperRef}>
                    Hello!!!
                </div>
            </div>
           
        )
    }
}

export default ChatApp;