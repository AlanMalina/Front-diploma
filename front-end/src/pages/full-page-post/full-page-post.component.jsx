import React, { Component} from 'react';
import './full-page-post.style.css';
import postService from '../../service/post-service';


class FullPagePost extends Component {
    constructor(props){
        super(props)
        this.state = {id: '', fullPost: null}
    }

    async getOne(){
        const url = window.location.href
        const id = url.split('/').pop()
        const response = await postService.getOne(id)
        this.setState({fullPost: response.data[0]})
        console.log(id)
        console.log(response.data[0])
    }

    componentDidMount(){
        this.getOne()        
    }

    render(){
        return(
            <div className='full-post-page-container'>
                <div className="img-block">
                <img className='fullpost-img' src={`http://localhost:5000/${this.state.fullPost?.picture}`}/>
                </div>
                
                <div className="info-block">
                    <div className="post-header">
                        <div className="user-block">
                            <img className='avatar' src='../img/kolobok.png'/>
                            <div className="name-and-time">
                                <p className='user-name'>Юра Сеатович</p>
                                <p className='post-time'>1w ago</p>
                            </div>
                        </div>
                        <div className="follow-btn">
                            +Follow
                        </div>
                    </div>
                    <div className='fullpost-description'>
                        {this.state.fullPost?.content}<br/>
                        <br/>
                        Goal: {this.state.fullPost?.goal}<br/>
                        <br/>
                        Appointer: {this.state.fullPost?.appointer}<br/>
                        <br/>
                        Deadline: {this.state.fullPost?.deadline}
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

            // <div className='full-post-page-container'>
            //     <div className="full-post-page-main">
            //         <div className='post-container'>
            //             <header className='post-header'>
            //                 <img className='avatar' src={`http://localhost:5000/${this.state.fullPost?.avatar}`}/>
            //                 {this.state.fullPost?.author}
            //             </header>
            //             <div className="post-content-block">
            //                 <img className='post-img' src={`http://localhost:5000/${this.state.fullPost?.picture}`}/>
            //                 <div className="fullpost-describtion">
            //                     <h2>{this.state.fullPost?.title}</h2>
            //                     <p className='fullpost-content'>{this.state.fullPost?.content}</p>
            //                 </div>
            //             </div>
            //             <footer className='post-footer'>
            //                 <button className='like-btn footer-item-left'>
            //                     <img src='./img/Like button.svg'/>
            //                 </button>
            //                 <button className='comment-btn footer-item-left'>
            //                     <img src='./img/Comment button.svg'/>
            //                 </button>

            //                 <div className="btn-donate-block footer-item">
            //                     <button className='donate-btn'>
            //                         Donate
            //                         <img src='./img/la_donate.svg'/>
            //                     </button>
            //                 </div>
            //                 <button className='share-btn footer-item-right'>
            //                     <img src='./img/Share button.svg'/>
            //                 </button>
            //             </footer>
            //         </div>
            //     </div>
            // </div>          
        )
    }
}

export default FullPagePost;

