import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
Vue.use(Vuex);

const state = {
  error: null,
  home: {
    data: [],
    error: null,
  },
  menu: {
    data: [],
    error: null,
  },
};

const getters = {
  error: (state) => state.error,
  homeData: (state) => state.home.data,
  homeLoading: (state) => state.home.loading,
  menu: (state) => state.menu,
  menuData: (state) => state.menu.data,
};

export const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
