import React, {Component} from 'react'
import './main_page.styles.css'
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';
import { NavLink } from 'react-router-dom';



class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {post: []}
        this.onClickHandler = this.onClickHandler.bind(this);
        this.getPost = this.getPost.bind(this)
    }

    onClickHandler(){
        let currentClass = this.state.activeClass === 'main-block' ? 'a1' : 'main-block'
        this.setState({ activeClass: currentClass})
    }

    async getPost(){
        const response = await postService.getPost()
        this.setState({post: response.data})
        // console.log(response.data)
    }

    async componentDidMount(){
        await this.getPost()
        // console.log(this.state.post)
    }
    
    render() {
        return (
            <div className='main-page-app'>
                <div className="user-menu-main">
                    <div className="user-menu-header"></div>
                    <img className="user-menu-avatar" src='./img/photofinish.png'/>
                    <NavLink to='/my-profile' className='user-menu-userName'>
                        <div>
                            Yura Shket
                        </div>
                    </NavLink>
                    <div className="user-statistics">
                        <div className='posts-count'>
                            5
                            <p>Current posts</p>
                        </div>
                        <div className="followers-count">
                            3000
                            <p>Followers</p>
                        </div>
                        <div className="following-count">
                            31
                            <p>Following</p>
                        </div>
                    </div>
                    <div className="services-block">
                        <button className='donate-history-btn services-btn'>
                            Donate history
                        </button> 
                        <button className='services-btn'>
                            Notifications    
                        </button> 
                        <button className='services-btn'>
                            Settings    
                        </button>   
                        <button className='services-btn'>
                            Premium post
                        </button>
                        <button className='services-btn'>
                            Support    
                        </button>          
                    </div>
                </div>
                <div className='main-block'>
                    {this.state.post.map((post, index) => (
                        <Post key={index} data={post}/>
                    ))}
                </div>
            </div>
        )
    }
}

export default MainPage