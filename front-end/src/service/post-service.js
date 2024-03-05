import axios from "axios";

const api = 'http://localhost:5000/api';

const getPost = (req, res) => {
    return axios.get(api + '/posts')
}

const postPost = (author, title, content, picture, avatar) => {
    return axios.post(api + '/post', {
        author, 
        title, 
        content,
        picture,
        avatar
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const postService = {
    getPost,
    postPost
}

export default postService;