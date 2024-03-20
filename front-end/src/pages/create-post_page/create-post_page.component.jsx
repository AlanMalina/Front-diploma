import { Component } from "react"
import './create-post_page.styles.css'
import postService from "../../service/post-service";

class CreatePostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {post: [], title: '', picture: ''};
        this.postPost = this.postPost.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.pictureChange = this.pictureChange.bind(this);
    }

    async postPost(){
        console.log(this.state.picture)
        const formPhoto = new FormData()
        formPhoto.append('image', this.state.picture)
        console.log(formPhoto)
        const response = await postService.postPost('Siiiii', this.state.title, 'Наївся блох', this.state.picture, 'avatar')
        this.setState({post: response.data})

        console.log(response.data)
    }

    titleChange(e){
        const title = e.target.value
        this.setState({title: title})
        
    }

    pictureChange(e){
        const photo = e.target.files[0]
        this.setState({picture: photo})
        console.log(photo)
    }

    // avatarChange(e){
    //     const photo = e.target.files[0]
    //     this.setState({avatar: photo})
    //     console.log(photo) 
    // }


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
                            <input type="file" onChange={this.pictureChange}  className="btn-add-photo"/>
                            <img src="./img/add-photo.svg" className="add-photo-icon"/>
                        </div>)}
                    
                    
                    <input type="text" onChange={this.titleChange}  placeholder='Title:' className="post-title post-info"/>
                    <input type="text" placeholder='For whom:' className="for-whom post-info" />
                    <input type="text" placeholder="Sum:" className="sum post-info" />
                    <input type="text" placeholder="Deadline:" className="deadline post-info" />
                    <input type="text" placeholder="Cooperator:" className="cooperator post-info" />
                    <div>
                        <textarea type="text" placeholder="Description:" className="create-post-description" />
                    </div>
                    <button className="btn-create" onClick={this.postPost}>Create</button>
                </div>
            </div>
            
        )
    }
}

export default CreatePostPage;