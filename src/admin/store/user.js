import ServiceUser from "../service/user";
import router from "../router"
import {globalCommit, withLock} from "../utils";
import axios from "../request";

export default {
  namespaced: true,
  state: {
    isAuth: false,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem('token', token);
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      state.isAuth = true;
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      axios.defaults.headers["Authorization"] = ``;
      state.isAuth = false;
    },
    AUTH_ON: (state) => {
      state.isAuth = true
    }
  },
  actions: {
    auth({commit}, user) {
      withLock(commit, ServiceUser.login(user),
        (res => {
          console.log(res);
          commit('SET_TOKEN', res.data.token);
          router.push('/');
        })
      )
    },
    checkAuth({commit}) {
      withLock(commit, ServiceUser.checkToken(), res => {
          commit('AUTH_ON');
          router.push('/');
      });
    },
    logout({commit}) {
      commit('LOGOUT')
    }
  }
}
