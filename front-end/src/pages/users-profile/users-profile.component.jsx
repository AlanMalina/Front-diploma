import React, {Component} from 'react'
import './users-profile.styles.css'
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';
import Cookies from 'js-cookie'
import loginService from '../../service/login-service';
import { useParams } from 'react-router-dom';

class PublicProfilePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            // userProfile: [], public_id: '', sort: false
            post_in_profile: [], sort: false, fullpost: false, userProfile: [], 
            followingCount: [], following: 0, followers: 0, postsCount: 0,
        avatar: '', description: '', username: '', usersurname: '', edit: false, updatedProf: []
        }
        this.ColumnSort = this.ColumnSort.bind(this)
        this.BlockSort = this.BlockSort.bind(this)
        this.getPublicProfile = this.getPublicProfile.bind(this)
    }

    ColumnSort(){
        const pageContainer = document.getElementById('my-profile-page-container')
        const mainBlock = document.getElementById('my-profile-page-main')
        const mainColumn = document.getElementById('my-profile-main-postsColumn')
        const sortContainer = document.getElementById('sort-container')

        if(this.state.sort === false){
            mainBlock.style.display = 'none';
            mainColumn.style.display = 'flex'
            pageContainer.style.overflow = 'auto'
            sortContainer.style.padding = '0.926vh 0 0.926vh'            
            this.setState({sort: true})
        }
    }

    BlockSort(){
        const pageContainer = document.getElementById('my-profile-page-container')
        const mainBlock = document.getElementById('my-profile-page-main')
        const mainColumn = document.getElementById('my-profile-main-postsColumn')


        if(this.state.sort === true){
            mainColumn.style.display = 'none'
            mainBlock.style.display = 'block';
            pageContainer.style.overflow = 'none'            
            this.setState({sort: false})
        }
    }

    async getFullPost(pic){
        const fullpostContainer = document.getElementById('full-post-page-container')
        if(this.state.fullpost === false){
            fullpostContainer.style.zIndex = '1'
            fullpostContainer.style.display = 'flex'
            this.setState({fullpost: true})
            this.props.setFullPostData(pic);
            console.log('State setted: ' + this.state.fullpost) 
        }
        
    }

    async getPublicProfile(){
        try{
            // const id = window.location.pathname.split('/')
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            const id = pathSegments[pathSegments.length - 1];
            this.setState({public_id: id})
            console.log(id);

            const response = await loginService.getPublicProfile(id)
            this.setState({userProfile: response.data})
            console.log(response.data);
        }
        catch(e){
            console.log(e)
        }
    }

    async getFollowingCount(){
        try{
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            const id = pathSegments[pathSegments.length - 1];
            const response = await postService.getFollowingCount(id);
            const { followers, following } = response.data.find(item => item.followers !== undefined);
            this.setState({ followingCount: response.data });
            this.setState({ following: following,
                 followers: followers})
            // console.log(response.data)
            // console.log(this.state.following)
        }
        catch(e){
            console.log(e)
        }
    }

    async getPostsCount(){
        try{
            const urlPath = window.location.pathname;
            const pathSegments = urlPath.split('/');
            const id = pathSegments[pathSegments.length - 1];
            const response = await postService.getPostsCount(id)
            this.setState({postsCount: response.data.postscount})
            // console.log('posts count: ' + response.data.postscount)
        }
        catch(e){
            console.log("You have no post yet! " + e)
        }
    } 

    componentDidUpdate(){
        if(this.state.fullpost === true){
            this.setState({ fullpost: false });
        }
    }

    async componentDidMount(){
        await this.getPublicProfile()
        await this.getFollowingCount()
        await this.getPostsCount()
    }

    render() {
        return (
            <div id='my-profile-page-container' className='my-profile-page-container'>
                <div id='sort-container' className="sort-container">
                    <button id='btn-block-sort' className='btn-block-sort' onClick={this.BlockSort}>
                        <img className='block-sort-icon' src="../img/block sort.svg" alt="" />
                    </button>
                    <button id='btn-column-sort' className='btn-column-sort' onClick={this.ColumnSort}>
                        <img className='column-sort-icon' src="../img/column sort.svg" alt="" />
                    </button>
                </div>

                <div id='my-profile-page-main' className='my-profile-page-main'>
                    <div id='my-profile-post-container' className="my-profile-post-container">
                        
                        {this.state.userProfile.map((pic, index ) => (
                            <div id='block-post' key={index} className="block-post" >
                                <img className='block-post-img' onClick={() => this.getFullPost(pic)} src={`http://localhost:5000/${pic.picture}`} alt="" />
                            </div>
                        ))}
                    </div>                    
                </div>

                
                <div id='my-profile-main-postsColumn' className="my-profile-main-postsColumn">
                    {this.state.userProfile.map((post, index) => (
                        <div key={index} id='column-post' className="column-post">
                            <Post data={post} 
                            followingCount={this.state.followingCount}
                            setFullPostData={this.props.setFullPostData}
                            user={this.props.user}
                             /> 
                        </div>
                    ))}

                </div>
            
                <div className="user-menu-profile-container">
                    
                    <div className="menu-profile-header">
                        <img id='check-edit-btn' className='check-edit-btn' onClick={this.updateUser} src="../img/check edit.svg" alt="" />
                        <img id='close-edit-btn' className='close-edit-btn' onClick={this.closeEdit} src="../img/close edit.svg" alt="" />               
                        {this.state.userProfile[0]?.avatar ? 
                            (<div >
                                <img src={`http://localhost:5000/${this.state.userProfile[0]?.avatar}`} className="menu-profile-avatar"/>
                            </div>) 
                            : 
                            (<div className="menu-profile-avatar">
                                <img className='profile-avatar-default' src='../img/avatar_header_icon.svg' alt="" />
                            </div>)}
                        
                        <div className="user-profileData">
                            <div id='menu-profile-userName' className="menu-profile-userName" >
                                {this.state.userProfile[0]?.user_name} {this.state.userProfile[0]?.user_surname}
                            </div>
                            <div className="profile-indicators">
                                <div className="current-posts">
                                    {this.state.postsCount} <br />
                                    current <br /> 
                                    posts
                                </div>
                                <div className="folowers">
                                    {this.state.followers} <br /> 
                                    Followers
                                </div>
                                <div className="following">
                                    {this.state.following} <br />
                                    Following
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="user-profile-description" >
                        {this.state.userProfile[0]?.description}
                    </div>
                    <textarea name="" id="input-edit-description" onChange={this.descriptionChange} defaultValue={this.props.user?.description} className='input-edit-description'></textarea>
                    {/* <div className="user-menu-buttons-block">
                        <div className="donate-history-btn">
                            Donate history
                        </div>
                        <div className="notifications-btn">
                            Notifications
                        </div>
                        <div className="settings-btn">
                            Settings
                        </div>
                        <div className="premium-pots-btn">
                            Premium post
                        </div>
                        <div className="support-btn">
                            Support
                        </div>
                    </div> */}
                </div>
            </div>
            
        )
    }
}

export default PublicProfilePage;