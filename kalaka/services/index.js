import axios from 'axios';
import { getToken, setToken } from '../repository';
import Toast from 'react-native-toast-message';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(async(request) => {
    const token = await getToken();
    if (token) {
        request.headers.common.Authorization = `Bearer ${account.token}`;
    }
    return request;
});

axios.interceptors.response.use(async(response) => {
    return response;
}, error => {
    showToast(error); return;
});

export const auth = () => {
    return ('asd');
}

export const register = () => {
    return ('asd');
}

export const me = async () => {
    const answer = await axios.get('/me');
    if (answer) {
        return ('asd');
    } else {
        return 'aaa';
    }
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

function showToast(error) {
   console.log(error)
   Toast.show({
    type: 'error',
    text1: error.message
  });
}