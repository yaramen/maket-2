import axios from '../request';

export default class ServiceReview {
  static getAll(userId) {
    return axios.get(`/reviews/${userId}`);
  }

  static add(data) {
    return axios.post('/reviews', data);
  }

  static remove(dataId) {
    return axios.delete(`/reviews/${dataId}`);
  }

  static update({formData, id}) {
    return axios.post(`/reviews/${id}`, formData);
  }
}
