import axios from "axios";
import { getToken, setToken } from "../repository";
import Toast from "react-native-toast-message";
import FormFormData, { getHeaders } from "form-data";

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

export const register = async (email, password, firstName, lastName, phone) => {
  const resp = await apiClient
    .post("/auth/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
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
    console.log(answer.data);
    return answer.data;
  }
};

export const updateMe = async (updatedUser) => {
  const answer = await apiClient.patch("/users/me", updatedUser).catch((err) => {
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

export const updateStatus = async (status, isLocationShared) => {
  const resp = await apiClient.patch("/map/my-status", { status, isLocationShared }).catch((err) => {
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

export const getContact = async (id) => {
  const answer = await apiClient.get(`/users/${id}`).catch((err) => {showToast(err);})
  if (answer) {
    return answer.data;
  }
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

export const uploadImage = async (uri) => {
  const raw = new FormData();
  raw.append("image", uri.split(",")[1]);
  const requestOptions = { method: "POST", body: raw };
  return fetch("https://api.imgbb.com/1/upload?key=14abb11202d912f451458d92840bcaf2", requestOptions).then((response) =>
    response.json()
  );

  /*
  let body = new FormFormData();
  //body.set("key", "14abb11202d912f451458d92840bcaf2");
  body.append("image", uri);
  const resp = await axios
    .post("https://api.imgbb.com/1/upload", undefined, {
      data: body,
      params: { key: "14abb11202d912f451458d92840bcaf2" },
    })
    .catch((err) => {
      console.log(err?.response);
      showToast(err);
      return;
    });
  if (resp) {
    console.log(resp);
    return resp.data;
  }*/
  return undefined;
};

function showToast(error) {
  //console.log(error.response.data.message);
  Toast.show({
    type: "error",
    text1: error?.response?.data.message,
  });
}
