import React, {Component} from 'react'
import './post.styles.css';
import postService from '../../service/post-service';
import loginService from '../../service/login-service';
import { NavLink } from 'react-router-dom';
import PostDetails from '../post-details/post-details.component';


class Post extends Component{

    constructor(props){
        super(props)
        this.state = {openfull: false, formattedDeadline: '',
            followingUserIds: [], isFollow: null, profilePath: '', details: [],
            showDonateForm: false}
        this.getFullPost = this.getFullPost.bind(this)
        this.followHandler = this.followHandler.bind(this)     
        // this.displayDonateBlock = this.displayDonateBlock.bind(this)  
        this.displayDonateBlock = this.displayDonateBlock.bind(this);
        this.closeDonateForm = this.closeDonateForm.bind(this);
    }

    async getFullPost(){
        try{
            const response = await postService.getOne(this.props.data.id);
            const postData = response.data[0];
            this.props.setFullPostData(postData);
            console.log(response.data[0])
        }
        catch(e){
            console.log(e)
        }
        finally{
            const fullpostContainer = document.getElementById('full-post-page-container')
            if(this.state.openfull === false){
                fullpostContainer.style.zIndex = '1'
                fullpostContainer.style.display = 'flex'
                this.setState({openfull: true})
                console.log('State setted: ' + this.state.openfull) 
            }
        }
    }

    // async postFollower() {
    //     try{
    //         const response = await postService.postFollower(this.props.user?.id)
    //         this.setState({ following: response.data });
    //         const following = response.data
    //         this.props.followingCount(following);

    //         console.log(response.data)
    //     }
    //     catch(e){
    //         console.error(e)
    //     }
    //     finally{
    //         const followingBtn = document.getElementById('following-btn')
    //         if(this.state.followingBtn === false){
    //             followingBtn.style.display = 'none'
    //             this.setState({followingBtn: true})
    //             console.log(this.state.followingBtn)
    //         }
    //     }
        
    // }

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

    
    // displayDonateBlock() {
    //     const donateContainer = document.getElementById('post-details')
    //     const postDescription = document.getElementById('post-description')
    //     const postImg = document.getElementById('post-img')

    //     this.setState({ details: [this.props.data.link, this.props.data.extra_link,
    //         this.props.data.card, this.props.data.extra_card, this.props.data.iban, 
    //         this.props.data.extra_iban
    //     ] })

    //             donateContainer.style.display = 'flex'
    //             postDescription.style.display = 'none'
    //             postImg.style.display = 'none'
                // const { id } = postData; // Assuming data has an 'id' property
                // this.setState({ details: true })
            
            // else{
            //     donateContainer.style.display = 'none'
            //     postDescription.style.display = 'flex'
            //     postImg.style.display = 'flex'
            //     this.setState({details: false})
            // }
        
    // }

    displayDonateBlock() {
        this.setState({ showDonateForm: true });
    }

    closeDonateForm() {
        this.setState({ showDonateForm: false });
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.openfull !== this.state.openfull && this.state.openfull === true) {
            this.setState({ openfull: false});
        }
        // console.log(this.props.data)
        // if (prevProps.data !== this.props.data) {
        //     console.log('Updated post data:', this.props.data);
        // }
    }
    
    
    componentDidMount() {
        const deadlineISO = this.props.data?.deadline;
        if (deadlineISO) {
            const deadlineDate = new Date(deadlineISO); 
            const year = deadlineDate.getFullYear();
            const month = (deadlineDate.getMonth() + 1).toString().padStart(2, '0'); 
            const day = deadlineDate.getDate().toString().padStart(2, '0');
            const formattedDeadline = `${day}-${month}-${year}`;
            this.setState({formattedDeadline: formattedDeadline});
        }
    
        // console.log(this.props.data)
    }

    // componentDidMount() {
    //     const deadlineISO = this.props.data?.deadline;
    //     const deadlineDate = new Date(deadlineISO); 

    //     const year = deadlineDate.getFullYear();
    //     const month = (deadlineDate.getMonth() + 1).toString().padStart(2, '0'); 
    //     const day = deadlineDate.getDate().toString().padStart(2, '0');

    //     const formattedDeadline = `${day}-${month}-${year}`;
    //     this.setState({formattedDeadline: formattedDeadline});
        
    //     console.log(this.props.data)
    // }
       

    render(){
        return(
            // {this.props.user.role !== 'user' && 
            <div id='post-container' className='post-container'>
                <div className="post-header">
                    <div className="user-block">
                        
                        {this.props.data?.avatar ? 
                        (<div >
                            <img className='avatar' src={`http://localhost:5000/${this.props.data?.avatar}`}/>
                        </div>
                        ) : (
                        <div className="avatar">
                            <img style={{width: '100%', borderRadius: '50%'}} src='../img/avatar_header_icon.svg' alt="" />
                        </div>
                    )}
                        <div className="name-and-time">
                        {this.props.data?.user_id === this.props.user?.id ?
                            (
                                <NavLink to='/my-profile' className='user-name'>
                                    {this.props.data?.user_name} {this.props.data?.user_surname}
                                </NavLink>
                            ) : (
                                <NavLink to={`/public-profile/${this.props.data?.user_id}`} className='user-name'>
                                    {this.props.data?.user_name} {this.props.data?.user_surname}
                                </NavLink>
                            )}
                            <p className='post-time'>1тж тому</p>
                        </div>
                    </div>
                    {this.props.user.role === 'military' ? (
                        <div>
                        {this.props.user.id !== this.props.data.user_id &&
                            this.state.isFollow !== this.props.data?.user_id &&
                            !this.props.followingCount.some(item => item.following_user_id === this.props.data?.user_id) &&
                            (
                                <div id='following-btn' className='following-btn' onClick={this.followHandler}>
                                    +Стежити
                                </div>
                            )
                        }
                        </div>
                    ) : (
                        <div id='following-btn' className='following-btn' onClick={this.followHandler}>
                            +Стежити
                        </div>
                    )}
                    

                    
                </div>
                <div id='post-description' className="post-description">
                    <div className="content" onClick={this.getFullPost}>
                        {this.props.data?.content}                        
                    </div>
                    {this.props.data?.appointer !== '' && 
                        <div className='appointer'>
                            Отримувач: {this.props.data.appointer}
                        </div>}
                    {this.props.data?.goal !== '' &&
                        <div className="goal">
                            Ціль: {this.props.data.goal} грн
                        </div>}
                    {this.props.data?.deadline !== null &&
                        <div className="deadline">
                            Термін: {this.state.formattedDeadline}
                        </div>}                  
                </div>
                {this.props.data?.picture !== null &&
                    <img id='post-img' className='post-img' onClick={this.getFullPost} src={`http://localhost:5000/${this.props.data.picture}`}/>}
                <div className="post-footer">
                    <div className="like-block">
                        <img className='like-btn-icon' src="../img/like-btn.svg" alt="#" />
                        Лайк
                    </div>
                    <div className="comment-block">
                        <img className='comment-btn-icon' src="../img/comment icon.png" alt="#" />
                        Комент
                    </div>
                    <div onClick={this.displayDonateBlock} className="donate-block">
                        <img className='donate-btn-icon' src="../img/donate icon.svg" alt="" />
                        Донат
                    </div>
                    <div className="send-block">
                        <img className='send-btn-icon' src="../img/send icon.svg" alt="#" />
                        Поширити
                    </div>
                    <div className="repost-block">
                        <img className='repost-btn-icon' src="../img/repost-btn.svg" alt="#" />
                        Репост
                    </div>
                </div>
                
                {this.state.showDonateForm && (
                    <PostDetails
                        link={this.props.data.link}
                        extraLink={this.props.data.extra_link}
                        card={this.props.data.card}
                        extraCard={this.props.data.extra_card}
                        iban={this.props.data.iban}
                        extraIban={this.props.data.extra_iban}
                        closeForm={this.closeDonateForm}
                    />
                )}
                
            </div>
            
        
        )
    }
}

export default Post;