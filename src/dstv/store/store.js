import Vue from "vue";
import Vuex from "vuex";
import { TYPES } from "./mutationTypes";
import { transformHomeData } from "../transformation/home.transform";
Vue.use(Vuex);

const state = {
  home: {
    data: [],
    error: null,
  },
  error: null,
};
const getters = {
  homeData: (state) => state.home.data,
  homeLoading: (state) => state.home.loading,
  error: (state) => state.error,
};
const actions = {
  getHomeData({ commit, getters, dispatch }) {
    if (!getters.homeData.length) {
      commit(TYPES.HOME);
      fetch(
        "https://now.dstv.com/api/cs-mobile/editorial/v6/getEditorialsForHome;productId=1b09957b-27aa-493b-a7c9-53b3cec92d63;platformId=32faad53-5e7b-4cc0-9f33-000092e85950;packageId=3e6e5480-8b8a-4fd5-9721-470c895f91e2",
        {
          headers: {
            authorization: "aa56fa8a-fd0e-4b9b-b26e-b8acb8d40e30",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            dispatch("setHomeData", transformHomeData(data.items));
          }
        });
    }
  },
  setHomeData({ commit }, payload) {
    commit(TYPES.HOME_SUCCESS, payload);
  },
  setError({ commit }, payload) {
    commit(TYPES.ERROR, payload);
  },
  retryError({ commit, getters }) {
    getters.error.onRetry();
    commit(TYPES.ERROR_CLEAR);
  },
  clearError({ commit, getters }) {
    getters.error.onBack();
    commit(TYPES.ERROR_CLEAR);
  },
};
const mutations = {
  [TYPES.HOME](state) {
    state.home.loading = true;
  },
  [TYPES.HOME_SUCCESS](state, payload) {
    state.home = {
      data: payload,
    };
  },
  [TYPES.ERROR](state, payload) {
    state.error = payload;
  },
  [TYPES.ERROR_CLEAR](state) {
    state.error = null;
  },
};
export const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
