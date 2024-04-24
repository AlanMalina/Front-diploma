import React, { Component } from "react"
import './create-post_page.styles.css'
import postService from "../../service/post-service";

class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {post: [], content: '', picture: '', appointer: '', goal: '', deadline: '', id: ''};
        this.postPost = this.postPost.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
        this.appointerChange = this.appointerChange.bind(this);
        this.goalChange = this.goalChange.bind(this);
        this.deadlineChange = this.deadlineChange.bind(this);
    }

    async postPost(){
        console.log(this.state.picture)
        const formPhoto = new FormData()
        formPhoto.append('image', this.state.picture)
        console.log(formPhoto)
        const response = await postService.postPost(this.state.picture, this.state.content, this.state.appointer, this.state.goal, this.state.deadline, this.props.user?.id)
        this.setState({post: response.data})
        console.log(response.data)
        window.location.href = '/main'
    }

    contentChange(e){
        const content = e.target.value
        this.setState({content: content})
        
    }

    pictureChange(e){
        const photo = e.target.files[0]
        this.setState({picture: photo})
        console.log(photo)
    }

    appointerChange(e){
        const appointer = e.target.value
        this.setState({appointer: appointer})
    }
    goalChange(e){
        const goal = e.target.value
        this.setState({goal: goal})
    }
    deadlineChange(e){
        const deadline = e.target.value
        this.setState({deadline: deadline})
    }
    


    render() {
        return(
            <div className="create-post-app">
                <div className='create-post-container'>
                    <p className="title-to_add-photo">Add photo/video</p>
                    {this.state.picture ?(
                        <div className="add-photo">
                            <img src={URL.createObjectURL(this.state.picture)} className="added-img"/>
                            <input type="file" id="InputPhoto" onChange={this.pictureChange} className="btn-add-photo"/>
                        </div>
                    ):(
                        <div className="add-photo">
                            <input type="file" onChange={this.pictureChange} className="btn-add-photo"/>
                            <img src="./img/add-photo.svg" className="add-photo-icon"/>
                        </div>)}
                    
                    
                    <input type="text"   placeholder='Title:' className="post-title post-info"/>
                    <input type="text" onChange={this.appointerChange} placeholder='For whom:' className="for-whom post-info" />
                    <input type="text" onChange={this.goalChange} placeholder="Sum:" className="sum post-info" />
                    <input type="date" onChange={this.deadlineChange} placeholder="Deadline:" className="deadline-input post-info" />
                    <input type="text" placeholder="Cooperator:" className="cooperator post-info" />
                    <div>
                        <textarea type="text" onChange={this.contentChange} placeholder="Description:" className="create-post-description" />
                    </div>
                    <button className="btn-create" onClick={this.postPost}>Create</button>
                </div>
            </div>
            
        )
    }
}

export default CreatePostPage;