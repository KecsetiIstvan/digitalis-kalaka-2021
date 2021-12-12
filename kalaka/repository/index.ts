import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token: any) => {
  await AsyncStorage.setItem("@kalaka_jwt_token", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("@kalaka_jwt_token");
};

export const deleteToken = async () => {
  return await AsyncStorage.removeItem("@kalaka_jwt_token");
};
