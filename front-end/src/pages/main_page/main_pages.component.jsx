import React, {Component} from 'react'
import './main_page.styles.css'
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';
import { NavLink } from 'react-router-dom';
import FullPagePost from '../full-page-post/full-page-post.component';


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { post: [], followingCount: [], following: 0, followers: 0, postsCount: 0 };
        this.getPost = this.getPost.bind(this);
        this.getFollowingCount = this.getFollowingCount.bind(this);
        this.getPostsCount = this.getPostsCount.bind(this)
    }

    async getPost() {
        const response = await postService.getPost();
        this.setState({ post: response.data });
    }

    async getFollowingCount(){
        try{
            const response = await postService.getFollowingCount(this.props.user?.id);
            const { followers, following } = response.data.find(item => item.followers !== undefined);
            this.setState({ followingCount: response.data,
                following: following, followers: followers})
            // this.props.followingCount(response.data)
            // console.log(response.data)
            // console.log(response.data.filter(item => item.following_user_id === 44))
            // const filteredIds = response.data.filter(item => item.following_user_id === 44);
            // const followingUserIds = filteredIds.map(item => item.following_user_id);
            // console.log(followingUserIds);
        }
        catch(e){
            console.log(e)
        }
    }   

    async getPostsCount(){
        try{
            const response = await postService.getPostsCount(this.props.user?.id)
            this.setState({postsCount: response.data.postscount})
            console.log('posts count: ' + response.data.postscount)
        }
        catch(e){
            console.log("You have no post yet! " + e)
        }
    } 

    async componentDidMount() {
        await this.getPost();
        await this.getFollowingCount();
        await this.getPostsCount()
    }
    
    render() {
        return (
            <div className='main-page-app'>
                <div className="user-menu-main">
                    <div className="user-menu-header"></div>
                    {/* <img className="user-menu-avatar" src={`http://localhost:5000/${this.props.user?.avatar}`}/> */}
                    {this.props.user?.avatar ? 
                        (<div >
                            <img className="user-menu-avatar" src={`http://localhost:5000/${this.props.user?.avatar}`}/>
                        </div>
                        ) : (
                        
                        <div className="user-menu-avatar">
                            <img style={{width: '100%', borderRadius: '50%'}} src='../img/avatar_header_icon.svg' alt="" />
                        </div>
                    )}
                    <NavLink to='/my-profile' className='user-menu-userName'>
                        <div>
                            {this.props.user?.userName} {this.props.user?.userSurname}
                        </div>
                    </NavLink>
                    <div className="user-statistics">
                        <div className='posts-count'>
                            {this.state.postsCount}
                            <p>Current posts</p>
                        </div>
                            <div className="followers-count">
                                {this.state.followers}
                                <p>Followers</p>
                            </div>
                        
                        <div className="following-count">
                            {this.state.following}
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
                    {this.state.post.map((post) => (
                        <Post
                            key={post.id}
                            data={post}
                            setFullPostData={this.props.setFullPostData}
                            user={this.props.user}
                            followingCount={this.state.followingCount}
                            // otherProf={this.props.otherProf}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default MainPage