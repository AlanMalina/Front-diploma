import React, {Component} from 'react'
import './post.styles.css';
import { NavLink } from 'react-router-dom';

class Post extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props.data)
    }

    render(){
        return(
            <div className='post-container'>
                <div className="post-header">
                    <div className="user-block">
                        <img className='avatar' src='./img/kolobok.png'/>
                        <div className="name-and-time">
                            <p className='user-name'>Юра Сеатович</p>
                            <p className='post-time'>1w ago</p>
                        </div>
                    </div>
                    <div className="follow-btn">
                        +Follow
                    </div>
                </div>
                <div className="post-description">
                    <div className="content">
                        <h2>{this.props.data.content}</h2>
                    </div>
                    <div className='appointer'>
                        Appointer: {this.props.data.appointer}
                    </div>  
                    <div className="goal">
                        Goal: {this.props.data.goal}
                    </div>
                    <div className="deadline">
                        Deadline: {this.props.data.deadline}
                    </div>
                </div>
                <NavLink to={`/post/${this.props.data.id}`}>
                    <img className='post-img' src={`http://localhost:5000/${this.props.data.picture}`}/>
                </NavLink>
                <div className="post-footer">
                    <div className="like-block">
                        <img className='like-btn-icon' src="./img/like-btn.svg" alt="#" />
                        Like
                    </div>
                    <div className="repost-block">
                        <img className='repost-btn-icon' src="./img/repost-btn.svg" alt="#" />
                        Repost
                    </div>
                </div>
            </div>



            // <div className='post-container' >
            //     <header className='post-header'>
            //         <img className='avatar' src={`http://localhost:5000/${this.props.data.avatar}`}/>
            //         {this.props.data.author}
            //     </header>
            //     <div className="post-content-block">
            //         <NavLink to={`/post/${this.props.data._id}`}>
            //             <img className='post-img' src={`http://localhost:5000/${this.props.data.picture}`}/>
            //         </NavLink>
            //         <div className="post-describtion">
            //             <h2>{this.props.data.title}</h2>
            //             <p className='post-content'>{this.props.data.content}</p>
            //         </div>
            //     </div>
            //     <footer className='post-footer'>
            //         <button className='like-btn footer-item-left'>
            //             <img src='./img/Like button.svg'/>
            //         </button>
            //         <button className='comment-btn footer-item-left'>
            //             <img src='./img/Comment button.svg'/>
            //         </button>

            //         <div className="btn-donate-block footer-item">
            //             <button className='donate-btn'>
            //                 Donate
            //                 <img src='./img/la_donate.svg'/>
            //             </button>
            //         </div>
            //          <button className='share-btn footer-item-right'>
            //              <img src='./img/Share button.svg'/>
            //          </button>
            //      </footer>
            //  </div>
        )
    }
}

export default Post;