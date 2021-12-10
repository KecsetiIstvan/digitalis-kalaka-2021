import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
    await AsyncStorage.setItem('@storage_Key', token);
} 

export const getToken = async () => {
    return await AsyncStorage.getItem('@storage_Key');
}

export const deleteToken = async () => {
    return await AsyncStorage.deleteItem('@storage_Key');
}