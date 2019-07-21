export default {
  state: {
    isLock: true
  },
  mutations: {
    LOCK_OFF: (state) => {
      state.isLock = false;
    },
    LOCK_ON: (state) => {
      state.isLock = true;
    },
  },
}
