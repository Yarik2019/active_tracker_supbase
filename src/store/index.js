import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: null
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload ?  payload.user : null;
    },
  },
});

export default store;
