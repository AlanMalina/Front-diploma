import React, { Component } from "react";
import './side-bar.styles.css';


class SideBar extends Component {

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
        const sidebarContainer = document.getElementById('sidebar-container');
        const sidebar = document.getElementById('sidebar')

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            sidebar.style.right = '-100vw'      
        }
      }

    render() {
        return(
            <div id="sidebar-container" className='sidebar-container'>
                <div id="sidebar" className="sidebar" ref={this.wrapperRef}>
                    hello!!!!!!
                </div>
            </div>
           
        )
    }
}

export default SideBar;