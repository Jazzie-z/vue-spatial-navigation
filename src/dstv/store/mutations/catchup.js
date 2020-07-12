import { TYPES } from "../mutationTypes";

export default {
  [TYPES.CATCHUP](state) {
    state.catchup = {
      data: null,
      loading: true,
    };
  },
  [TYPES.CATCHUP_SUCCESS](state, payload) {
    state.catchup = {
      data: payload,
    };
  },
  [TYPES.CATCHUP_ERROR](state, payload) {
    state.catchup = {
      error: payload,
    };
  },
};
