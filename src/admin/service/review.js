import axios from '../request';

export default class ServiceReview {
  static getAll() {
    return axios.get('/reviews/147');
  }

  static add(data) {
    console.log(123);
    console.log(data);
    return axios.post('/reviews', data);
  }

  static remove(dataId) {
    return axios.delete(`/reviews/${dataId}`);
  }

  static update({formData, id}) {
    return axios.post(`/reviews/${id}`, formData);
  }
}
