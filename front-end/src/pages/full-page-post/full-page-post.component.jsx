import React, { Component} from 'react';
import './full-page-post.style.css';
import postService from '../../service/post-service';
import Post from '../../components/post/post.component';
import MyProfilePage from '../my_profile/my_profile.component';
import { useParams } from 'react-router-dom';


class FullPagePost extends Component {
    constructor(props){
        super(props)
        this.state = {id: '', fullPost: null}
    }

    async getOne(){
        const url = window.location.href
        const id = url.split('/').pop()
        const response = await postService.getOne(id)
        this.setState({fullPost: response.data})
        console.log(id)
        console.log(response.data)
    }

    componentDidMount(){
        this.getOne()        
    }

    render(){
        return(
            <div className='full-post-container'>
                {this.state.fullPost?._id}
                <header className='post-header'>
                    <img className='avatar' src={`http://localhost:5000/${this.state.fullPost?.avatar}`}/>
                    {this.state.fullPost?.author}
                </header>
                <div className="content_post">
                    <img className='post-img' src={`http://localhost:5000/${this.state.fullPost?.picture}`}/>
                    <div className="post-describtion">
                        <h2>{this.state.fullPost?.title}</h2>
                        <p>{this.state.fullPost?.content}</p>
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

export default FullPagePost;

