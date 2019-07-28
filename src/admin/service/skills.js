import axios from '../request';

export default class ServiceSkill {
  static getAllCategories(userId) {
    return axios.get(`/categories/${userId}`)
  }

  static addNewCategory(title) {
    return axios.post('/categories', {title});
  }

  static editCategory(category) {
    return axios.post(`/categories/${category.id}`, category);
  }

  static removeCategory(id) {
    return axios.delete(`/categories/${id}`)
  }

  static getSkills() {
    return axios.get('/skills/147');
  }

  static addNewSkill(skill) {
    return axios.post('/skills', skill);
  }

  static removeSkill(skillId) {
    return axios.delete(`/skills/${skillId}`);
  }

  static updateSkill(skill) {
    return axios.post(`/skills/${skill.id}`, skill);

  }
}
