import { TYPES } from "../mutationTypes";

export default {
  [TYPES.CHANNEL](state) {
    state.channel = {
      loading: true,
    };
  },
  [TYPES.CHANNEL_SUCCESS](state, payload) {
    state.channel = {
      data: payload,
    };
  },
  [TYPES.CHANNEL_ERROR](state, payload) {
    state.channel = {
      error: payload,
    };
  },
};
