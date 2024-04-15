import React, {Component} from 'react';
import './test.styles.css'
import postService from '../../service/post-service';
import Post from '../../components/post/post.component';

class TestProfile extends Component{
    constructor(props){
        super(props)
        this.state = {userProfile: []}
        this.getProfile = this.getProfile.bind(this)
    }

    async getProfile() {
        try {
            const response = await postService.getPost();
            // this.setState({ userProfile: response.data });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async componentDidMount(){
       await this.getProfile();
    }

    render(){
        return(
            <div className='test-container'>
                {/* {this.state.userProfile.map((post, index) => (
                    <Post key={index} data={post}/> 
                ))} */}
            </div>
        )
    }
}

export default TestProfile;