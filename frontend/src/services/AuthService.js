import axios from "axios";
const url = "http://localhost:3001/api/";
export default {
  login(userData) {
    return axios
      .post(url + "login/", userData)
      .then((response) => response.data);
  },
  signUp(userData) {
    return axios
      .post(url + "register/", userData)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get(url + "users/").then((response) => response.data);
  },
};
