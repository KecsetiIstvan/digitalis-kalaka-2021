import axios from "axios";
import { getToken, setToken } from "../repository";
import Toast from "react-native-toast-message";

const apiClient = axios.create({
  baseURL: "http://192.168.1.192:3000/api",
});

apiClient.interceptors.request.use(async (request) => {
  const token = await getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export const auth = async (email, password) => {
  const resp = await apiClient.post("/auth/login", { email: email, password: password }).catch((err) => {
    showToast(err);
    return;
  });
  if (resp) {
    return resp.data;
  }
  return undefined;
};

export const register = async (email, password, firstName, lastName) => {
  const resp = await apiClient
    .post("/auth/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    })
    .catch((err) => {
      showToast(err);
      return;
    });
  if (resp) {
    return resp.data;
  }
  return undefined;
};

export const me = async () => {
  const answer = await apiClient.get("/users/me").catch((err) => {
    showToast(err);
    return;
  });
  if (answer) {
    return answer.data;
  }
};

export const updateSettings = () => {
  return "asd";
};

export const updateLocation = async (longitude, latitude) => {
  const resp = await apiClient.patch("/map/my-location", { longitude, latitude }).catch((err) => {
    showToast(err);
    return;
  });
  if (resp) {
    return resp.data;
  }
};

export const getMap = async () => {
  const resp = await apiClient.get("/map").catch((err) => {
    showToast(err);
    return;
  });
  if (resp) {
    return resp.data;
  }
  return undefined;
};

export const getContacts = async () => {
  const answer = await apiClient.get("/users/me").catch((err) => {
    showToast(err);
    return;
  });
  if (answer) {
    return answer.data.contacts;
  }
}

export const getContact = async () => {

}

export const getEmergencyContacts = async () => {
  const answer = await apiClient.get("/users/me").catch((err) => {
    showToast(err);
    return;
  });
  if (answer) {
    return answer.data.emergencyContacts;
  }
}

export const getEmergencyContact = async () => {

}

export const deleteContact = () => {
  return "asd";
};

export const deleteEmergencyContact = () => {
  return "asd";
};

function showToast(error) {
  //console.log(error.response.data.message);
  Toast.show({
    type: "error",
    text1: error?.response?.data.message,
  });
}
