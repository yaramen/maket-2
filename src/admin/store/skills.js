import ServiceSkill from '../service/skills';
import {globalCommit, tooltipShow, withLock} from "../utils";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    SET_SKILLS: (state, res) => {
      const categories = res[0].data;
      const skills = res[1].data;
      state.categories = categories.map(category => {
        category.skills = skills.filter(skill => skill.category === category.id);
        return category;
      });
    },
    ADD_SKILL: (state, skill) => {
      state.categories = state.categories.map(el => {
        if(el.id === skill.category) {
          el.skills = [...el.skills, skill];
        }
        return el;
      })
    },
    REMOVE_SKILL: (state, skill) => {
      state.categories = state.categories.map(el => {
        if(el.id === skill.category) {
          el.skills = el.skills.filter(currSkill => currSkill.id !== skill.id)
        }
        return el;
      })
    },
    UPDATE_SKILL: (state, skill) => {
      state.categories = state.categories.map(el => {
        if(el.id === skill.category) {
          el.skills = el.skills.map(currSkill => {
            if(currSkill.id === skill.id) {
              return skill;
            }
            return currSkill;
          })
        }
        return el;
      })
    },
    ADD_CATEGORY: (state, category) => {
      console.log(category);
      category.skills = [];
      state.categories = [category, ...state.categories]
    },
    EDIT_CATEGORY: (state, category) => {
      state.categories = state.categories.map(el => {
        if(el.id === category.id) {
          el.category = category.title
        }
        return el;
      })
    },
    REMOVE_CATEGORY: (state, categoryId) => {
      state.categories = state.categories.filter(el => el.id !== categoryId);
    }
  },
  actions: {
    getSkills({commit}) {
      const categories =  ServiceSkill.getAllCategories();
      const skills = ServiceSkill.getSkills();
      Promise.all([categories, skills])
        .then(res => {
          commit('SET_SKILLS', res)
        });
    },
    addSkill({commit}, skill) {
      return withLock(commit, ServiceSkill.addNewSkill(skill), response => {
        commit('ADD_SKILL', response.data);
        tooltipShow(commit, 'success', 'Запись добавлена');
      })
    },
    removeSkill({commit}, skill) {
      withLock(commit, ServiceSkill.removeSkill(skill.id), response => {
        commit('REMOVE_SKILL', skill);
        tooltipShow(commit, 'success', 'Запись удалена');
      });
    },
    updateSkill({commit}, skill) {
      withLock(commit, ServiceSkill.updateSkill(skill), response => {
        commit('UPDATE_SKILL', skill);
        tooltipShow(commit, 'success', 'Запись обновлена');
      });
    },
    addCategory({commit}, category) {
      withLock(commit, ServiceSkill.addNewCategory(category), response => {
        commit('ADD_CATEGORY', response.data);
        tooltipShow(commit, 'success', 'Запись добавлена');
      });
    },
    editCategory({commit}, category) {
      withLock(commit, ServiceSkill.editCategory(category), response => {
        commit('EDIT_CATEGORY', category);
        tooltipShow(commit, 'success', 'Запись обновлена');
      });
    },
    removeCategory({commit}, categoryId) {
      withLock(commit, ServiceSkill.removeCategory(categoryId), response => {
        commit('REMOVE_CATEGORY', categoryId);
        tooltipShow(commit, 'success', 'Запись удалена');
      });
    }
  }
}
