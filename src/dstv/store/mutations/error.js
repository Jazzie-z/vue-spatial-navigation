import { TYPES } from "../mutationTypes";

export default {
  [TYPES.ERROR](state, payload) {
    state.error = payload;
  },
  [TYPES.ERROR_CLEAR](state) {
    state.error = null;
  },
};
