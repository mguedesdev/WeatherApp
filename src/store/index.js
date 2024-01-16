import { createStore } from 'vuex';

export default createStore({
  state: {
    language: 'en',
    unit: 'imperial'
  },
  mutations: {
    SET_LANGUAGE(state, language) {
      state.language = language;
    },
    SET_UNIT(state, unit) {
      state.unit = unit;
    }
  }
});