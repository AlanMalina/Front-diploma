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

const postPost = ( picture, content, appointer, goal, deadline, user_id) => {
    return axios.post(api + '/post', { 
        picture,
        content,
        appointer,
        goal,
        deadline,
        user_id
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data'
        }
    })
}

const postUser = (email, password, userName, userSurname) => {
    return axios.post(api + '/user', {
        email,
        password,
        userName,
        userSurname
    }).then((response) => {
        if(response.data.token){
            localStorage.setItem('token', JSON.stringify(response.data))
        }
        return response.data
    })
}


const postService = {
    getPost,
    getOne,
    postPost,
    postUser,
    getPic
}

export default postService;