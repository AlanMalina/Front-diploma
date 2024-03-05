import React, {Component} from 'react'
import './main_page.styles.css'
import Post from '../../components/post/post.component';
import postService from '../../service/post-service';



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
        console.log(response.data)
    }

    async componentDidMount(){
        await this.getPost()
        console.log(this.state.post)
    }
    
    render() {
        return (
            <div className='main-page-app'>
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