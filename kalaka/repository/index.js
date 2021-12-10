import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
    await AsyncStorage.setItem('@kalaka_jwt_token', token);
} 

export const getToken = async () => {
    return await AsyncStorage.getItem('@kalaka_jwt_token');
}

export const deleteToken = async () => {
    return await AsyncStorage.deleteItem('@kalaka_jwt_token');
}