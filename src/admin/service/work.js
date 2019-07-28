import axios from '../request';

export default class ServiceReview {
  static getAll(userId) {
    return axios.get(`/works/${userId}`);
  }

  static add(data) {
    return axios.post('/works', data);
  }

  static remove(dataId) {
    return axios.delete(`/works/${dataId}`);
  }

  static update({formData, id}) {
    return axios.post(`/works/${id}`, formData);
  }
}
