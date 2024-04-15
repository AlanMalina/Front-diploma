import axios from "axios";
import Cookies from 'js-cookie';

const api = 'http://localhost:5000/api';

// const logInUser = (email, password) => {
//     return axios.post(api + '/logIn', {
//         email,
//         password
//     }).then((response) => {
//         if(response.data.token){
//             localStorage.setItem('token', JSON.stringify(response.data));
//         }
//         return response.data
//     })

// }


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




const getUserProfile = (id) => {
    return axios.get(api + `/profile_auth/${id}`);
}



const loginService = {
    logInUser,
    getUserProfile,
}

export default loginService;