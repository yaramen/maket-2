import axios from "../request";

export default class ServiceUser {
  static login(user) {
    return axios.post('/login', user);
  }

  static checkToken() {
    return axios.get('/user');
  }
}
