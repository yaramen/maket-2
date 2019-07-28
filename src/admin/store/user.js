import ServiceUser from "../service/user";
import router from "../router"
import {globalCommit, withLock} from "../utils";
import axios from "../request";

export default {
  namespaced: true,
  state: {
    isAuth: false,
    userId: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem('token', token);
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      axios.defaults.headers["Authorization"] = ``;
      state.isAuth = false;
    },
    AUTH_ON: (state) => {
      state.isAuth = true
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId;
      localStorage.setItem('userId', userId);
      state.isAuth = true;
    }
  },
  actions: {
    auth({commit}, user) {
      withLock(commit, ServiceUser.login(user),
        (res => {
          commit('SET_TOKEN', res.data.token);
          withLock(commit, ServiceUser.checkToken(), res => {
            commit('SET_USER_ID', res.data.user.id);
            router.push('/');
          });
        })
      )
    },
    checkAuth({commit}) {
      withLock(commit, ServiceUser.checkToken(), res => {
        commit('SET_USER_ID', res.data.user.id);
        commit('AUTH_ON');
        router.push('/');
      });
    },
    logout({commit}) {
      commit('LOGOUT')
    }
  }
}
