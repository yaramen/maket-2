import Vue from 'vue';
import App from './App.vue'
import router from './router';
import store from './store';

window.testVue = new Vue({
  router,
  store,
  el: "#app-root",
  render: h => h(App)
});
