import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import skills from './skills';
import lock from './lock';
import tooltip from './tooltip';
import reviews from './reviews';
import works from './works';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    skills,
    lock,
    tooltip,
    reviews,
    works
  }
});

export default store;
