import axios from "axios";

const api = 'http://localhost:5000/api';

const getPost = () => {
    return axios.get(api + '/posts')
}

const getOne = (id) => {
    return axios.get(api + `/posts/${id}`, 
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data'
        }
    })
}


const getPic = (picture) => {
    return axios.get(api + '/posts')
    // return axios.get(api + '/posts', {picture}, {
    //     headers:{
    //         'Accept' : '*/*',
    //         'Content-Type' : 'multipart/form-data'
    //     }
    // })
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
    getOne,
    postPost,
    getPic
}

export default postService;