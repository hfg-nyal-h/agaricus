// src/store.js (Vue CLI 1.x & 2.x) oder src/store/index.js (Vue CLI 3.x or newer)

import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const getDefaultState = () => {
  return {
    token: "",
    user: {},
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    //login: ({ commit, dispatch }, { token, userId }) => {
    login: ({ commit }, { token, userId }) => {
      //login: ({ dispatch, commit }, { token, user }) => {
      //login: ({ commit, state }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", userId);
      // set auth header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //console.log(dispatch)
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
  },
});
