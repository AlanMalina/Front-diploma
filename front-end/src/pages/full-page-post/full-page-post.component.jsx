import React, { Component} from 'react';
import './full-page-post.style.css';
import postService from '../../service/post-service';
import { NavLink } from 'react-router-dom';


class FullPagePost extends Component {
    constructor(props){
        super(props)
        this.state = {fullPost: null, followingUserIds: [], isFollow: null, followingCount: []}
        this.wrapperRef = React.createRef();
        this.closeFullpost = this.closeFullpost.bind(this)
        this.followHandler = this.followHandler.bind(this)
    }

    closeFullpost(e) {
        const fullpostContainer = document.getElementById('full-post-page-container')
        if (this.wrapperRef && this.wrapperRef.current.contains(e.target)) {
            fullpostContainer.style.zIndex = '-1'
            fullpostContainer.style.display = 'none'
            // console.log('Ref is working') 
        }else{
            // console.log('Ref is NOT working') 
        }
    }

    async followHandler(){
        try{
            const response = await postService.postFollowing(this.props.user.id,
                                            `${this.props.user.userName} ${this.props.user.userSurname}`, 
                                            this.props.data.user_id, 
                                            `${this.props.data.user_name} ${this.props.data.user_surname}` )
            this.setState({followingUserIds: response.data})
            this.setState({isFollow: response.data.following_user_id})
            
            console.log(response.data.following_user_id)
            // console.log(this.state.isFollow)  
            // console.log(this.props.data?.user_id)
            if(this.state.isFollow === this.props.data?.user_id){
                console.log('Yes, it is follow')
            }else{
                console.log('No, it is not follow')
            }
            
        }
        catch(e){
            console.log("You can't follow to this person twice!" + e)
        }

    }

    
   
    componentDidMount() {  
        document.addEventListener('mousedown', this.closeFullpost);
        // console.log(this.props.fullPostData)
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeFullpost);
    }

    render(){
        return(
            <div id='full-post-page-container' className='full-post-page-container' >
                <div id='fullpost-background' className="fullpost-background" ref={this.wrapperRef}></div>
                <div className="img-block">
                    <img className='fullpost-img' src={`http://localhost:5000/${this.props.fullPostData?.picture}`}/>
                </div>
                <div className="info-block">
                    <div className="post-header">
                        <div className="user-block">
                            <img className='avatar' src={`http://localhost:5000/${this.props.fullPostData?.avatar}`}/>
                            <div className="name-and-time">
                                <NavLink to='/users-profile' className='user-name'>{this.props.fullPostData?.user_name} {this.props.fullPostData?.user_surname}</NavLink>
                                <p className='post-time'>1w ago</p>
                            </div>
                        </div>
                    </div>
                    <div className='fullpost-description'>
                        <div className="fullpost-content">
                            {this.props.fullPostData?.content}
                        </div>
                        <div className="fullpost-goal">
                            Goal: {this.props.fullPostData?.goal}
                        </div>
                        <div className="fullpost-appointer">
                            Appointer: {this.props.fullPostData?.appointer}
                        </div>
                        <div className="fullpost-deadline">
                            Deadline: {this.props.fullPostData?.deadline}
                        </div>
                    </div>
                    <hr className='fullpost-hr'/>
                    <div className="fullpost-footer">
                        <div className="like-block">
                            <img className='like-btn-icon' src="../img/like-btn.svg" alt="#" />
                            Like
                        </div>
                        <div className="repost-block">
                            <img className='repost-btn-icon' src="../img/repost-btn.svg" alt="#" />
                            Repost
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FullPagePost;

