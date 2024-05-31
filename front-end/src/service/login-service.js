import axios from "axios";
import Cookies from 'js-cookie';

const api = 'http://localhost:5000/api';

const addUser = async (role, email, password, userName, userSurname) => {
    try {
      const response = await axios.post(api + `/addVolunteer/${role}`, {
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


const logInUser = (email, password) => {
    return axios.post(api + '/logIn', {
        email,
        password
    }).then((response) => {
        if(response.data.token){
            // Зберігайте токен в куках замість localStorage
            Cookies.set('ACCESS_TOKEN', response.data.token, { expires: 30 });
        }
        return response.data
    })

}


const getMyProfile = (id) => {
    return axios.get(api + `/profile_auth/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getPublicProfile = (id) => {
    return axios.get(api + `/publicProf/${id}`);
}


const updateUser = (id, username, usersurname, description, avatar) => {
    return axios.put(api + `/user/${id}` ,
    {
        username,
        usersurname,
        description,
        avatar
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    }).then((response) => {
        if(response.data.token){
            Cookies.set('ACCESS_TOKEN', response.data.token, { expires: 30 });
        }
        return response.data
    })
}



const loginService = {
    addUser,
    logInUser,
    getMyProfile,
    getPublicProfile,
    updateUser
}

export default loginService;