import { TYPES } from "../mutationTypes";

export default {
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
