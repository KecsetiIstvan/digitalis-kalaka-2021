import axios from 'axios';
import { getToken, setToken } from '../repository';
import Toast from 'react-native-toast-message';

const apiClient = axios.create({
    baseURL: 'http://192.168.1.192:3000/api'
});

axios.interceptors.request.use(async(request) => {
    const token = await getToken();
    if (token) {
        request.headers.common.Authorization = `Bearer ${account.token}`;
    }
    return request;
});

export const auth = async (email, password) => {
    const resp = await apiClient.post('/auth/login', { email: email, password: password}).catch(err => {showToast(err); return})
    if(resp) {
        return resp.data;
    }
    return undefined;
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
  console.log(error.response.data.message);
  Toast.show({
    type: 'error',
    text1: error.response.data.message
  });
}