export default {
  state: {
    type: "success",
    message: '123',
    isShow: false,
    timer: null,
    timeout: 3000
  },
  mutations: {
    SHOW_START: (state, {type, message}) => {
      if(state.timer) {
        clearTimeout(state.timer);
      }
      state.type = type;
      state.message = message;
      state.isShow = true;
      state.timer = setTimeout(() => {
        state.isShow = false;
      }, state.timeout);
    },
    SHOW_STOP: (state) => {
      state.isShow = false;
      if(state.timer) {
        clearTimeout(state.timer);
      }
    }
  },
  actions: {
    showTooltip({commit}, settings) {
      commit('SHOW_START', settings);
    },
    closeTooltip({commit}) {
      commit('SHOW_STOP');
    }
  }
}
