import axios from "axios";
import Cookies from 'js-cookie'

const api = 'http://localhost:5000/api';

const createRequest = ( description, sum, deadline, user_id, picture ) => {
    return axios.post(api + '/createRequest', { 
        description,
        sum,
        deadline,
        user_id,
        picture
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getOwnReq = (id) => {
    return axios.get(api + `/getOwnReq/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    })
}

const getRequests = () => {
    return axios.get(api + '/getRequests',
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    })
}

const addVolunteerReq = (user_id, request_id) => {
    return axios.post(api + '/addVolunteerReq', {
        user_id,
        request_id
    },
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getAccept = (id) => {
    return axios.get(api + `/getAccept/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const getWaiting = (id) => {
    return axios.get(api + `/getWaiting/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    })
}

const finishRequest = (id) => {
    return axios.delete(api + `/finishReq/${id}`,
    {
        headers:{
            'Accept' : '*/*',
            'Content-Type' : 'multipart/form-data',
            "Authorization": Cookies.get('ACCESS_TOKEN')
        }
    });
}

const requestService = {
    createRequest,
    getOwnReq,
    getRequests,
    addVolunteerReq,
    getAccept,
    getWaiting,
    finishRequest
}

export default requestService;