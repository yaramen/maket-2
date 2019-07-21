import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import skills from './skills';
import lock from './lock';
import tooltip from './tooltip';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    user,
    skills,
    lock,
    tooltip
  }
});

window.store = store;

export default store;
