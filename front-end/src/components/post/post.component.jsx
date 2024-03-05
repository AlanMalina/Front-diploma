import React, {Component} from 'react'
import './post.styles.css';

class Post extends Component{

    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='post-container'>
                <header className='post-header'>
                    <img className='avatar' src={`http://localhost:5000/${this.props.data.avatar}`}/>
                    {this.props.data.author}
                </header>
                <div className="content_post">
                    <img className='post-img' src={`http://localhost:5000/${this.props.data.picture}`}/>
                    <div className="post-describtion">
                        <h2>{this.props.data.title}</h2>
                        <p>{this.props.data.content}</p>
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
                    

                    {/* <button className='repost-btn footer-item-right'>
                        <img src='./img/Repost button.svg'/>
                    </button> */}
                    <button className='share-btn footer-item-right'>
                        <img src='./img/Share button.svg'/>
                    </button>
                </footer>
            </div>
        )
    }
}

export default Post;