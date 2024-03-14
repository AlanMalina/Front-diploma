import React, {Component} from 'react'
import './post.styles.css';
import { NavLink } from 'react-router-dom';
import FullPagePost from '../../pages/full-page-post/full-page-post.component';

class Post extends Component{

    constructor(props){
        super(props)
        this.state = {idshka: ''}
        this.getId = this.getId.bind(this)
    }

    getId(){
        const postId = this.props.data._id
        this.setState({idshka: postId})
        console.log(postId)       
    }
    

    render(){
        return(
            <div className='post-container' >
                <header className='post-header'>
                    <img className='avatar' src={`http://localhost:5000/${this.props.data.avatar}`}/>
                    {this.props.data.author}
                </header>
                <div className="content_post">
                    <img onClick={this.getId} className='post-img' src={`http://localhost:5000/${this.props.data.picture}`}/>
                    <div className="post-describtion">
                        <h2>{this.props.data.title}</h2>
                        <NavLink onClick={this.getId} to={`/post/${this.props.data._id}`}>
                            <p>{this.props.data.content}</p>
                        </NavLink>
                    </div>
                </div>
                <footer className='post-footer'>
                    <button className='like-btn footer-item-left'>
                        <img src='./img/Like button.svg'/>
                    </button>
                    <button className='comment-btn footer-item-left'>
                        <img src='./img/Comment button.svg'/>
                    </button>

                    <div className="btn-donate-block footer-item">
                        <button className='donate-btn'>
                            Donate
                            <img src='./img/la_donate.svg'/>
                        </button>
                    </div>
                     <button className='share-btn footer-item-right'>
                         <img src='./img/Share button.svg'/>
                     </button>
                 </footer>
             </div>
        )
    }
}

export default Post;