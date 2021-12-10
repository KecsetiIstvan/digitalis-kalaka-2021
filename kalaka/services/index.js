import axios from 'axios';
import { getToken, setToken } from '../repository';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(async(request) => {
    const token = await getToken();
    if (token) {
        request.headers.common.Authorization = `Bearer ${account.token}`;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(async(response) => {
    return response;
}, error => {
    // Any error, show error modal
    return Promise.reject(error);
});

export const auth = () => {
    return ('asd');
}

export const register = () => {
    return ('asd');
}

export const me = () => {
    return ('asd');
}
export const updateSettings = () => {
    return ('asd');
}

export const updateLocation = () => {
    return ('asd');
}

export const getMap = () => {
    return ('asd');
}

export const getFriends = () => {
    return ('asd');
}

export const addFriend = () => {
    return ('asd');
}

export const addContact = () => {
    return ('asd');
}

export const updateFriend = () => {
    return ('asd');
}

export const updateContact = () => {
    return ('asd');
}

export const deleteFriend = () => {
    return ('asd');
}

export const deleteContact = () => {
    return ('asd');
}