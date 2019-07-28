import {tooltipShow, withLock} from "../utils";
import ServiceWork from "../service/work";

export default {
  namespaced: true,
  state: {
    works: [],
  },
  mutations: {
    SET_WORK: (state, works) => {
      state.works = works;
    },
    ADD_WORK: (state, work) => {
      state.works = [...state.works, work];
    },
    REMOVE_WORK: (state, workId) => {
      state.works = state.works.filter(work => work.id !== workId);
    },
    UPDATE_WORK: (state, work) => {
      state.works = state.works.map(currWork => {
        if(currWork.id === work.id) {
          return work
        }
        return currWork;
      });
    }
  },
  actions: {
    getAllWorks({commit}) {
      const userId = localStorage.getItem('userId');
      withLock(commit, ServiceWork.getAll(userId), response => {
        commit('SET_WORK', response.data);
      });
    },
    addNewWork({commit}, work) {
      withLock(commit, ServiceWork.add(work), response => {
        commit('ADD_WORK', response.data);
        tooltipShow(commit, 'success', 'Запись добавлена');
      });
    },
    removeWork({commit}, workId) {
      withLock(commit, ServiceWork.remove(workId), response => {
        commit('REMOVE_WORK', workId);
        tooltipShow(commit, 'success', 'Запись удалена');
      });
    },
    updateWork({commit}, data) {
      withLock(commit, ServiceWork.update(data), response => {
        commit('UPDATE_WORK', response.data.work);
        tooltipShow(commit, 'success', 'Запись обновлена');
      });
    }
  }
}
