import axios from "axios";
import Cookies from 'js-cookie'

const api = 'http://localhost:5000/api';

const getPost = () => {
    return axios.get(api + '/posts',
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    })
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
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

// const postUser = (email, password, userName, userSurname) => {
//     return axios.post(api + '/user', {
//         email,
//         password,
//         userName,
//         userSurname
//     }).then((response) => {
//         if(response.data.token){
//             localStorage.setItem('token', JSON.stringify(response.data))
//         }
//         return response.data
//     })
// }


const postUser = async (email, password, userName, userSurname) => {
    try {
      const response = await axios.post(api + '/user', {
        email,
        password,
        userName,
        userSurname
      });
  
      if (response.data.token) {
        // Зберігайте токен в куках
        Cookies.set('ACCESS_TOKEN', response.data.token, { expires: 30 * 24 * 60 * 60 * 1000 }); // 30 days
      }
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Перекиньте помилку, щоб обробити її на верхньому рівні
    }
  };


  const postFollowing = (user_id, username, following_user_id, following_username ) => {
    return axios.post(api + '/following',  
    { 
        user_id,
        username,
        following_user_id,
        following_username
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getFollowingCount = (id) => {
    return axios.get(api + `/followingCounts/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getPostsCount = (user_id) => {
    return axios.get(api + `/postsCount/${user_id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}
  

const postService = {
    getPost,
    getOne,
    postPost,
    postUser,
    postFollowing,
    getFollowingCount,
    getPostsCount,
    getPic
}

export default postService;