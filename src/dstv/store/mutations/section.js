import { TYPES } from "../mutationTypes";

export default {
  [TYPES.SECTION](state) {
    state.section = {
      ...state.section,
      loading: true,
    };
  },
  [TYPES.SECTION_SUCCESS](state, payload) {
    state.section = {
      ...state.section,
      loading: false,
      [payload.type]: { data: payload.data },
    };
  },
  [TYPES.SECTION_ERROR](state, payload) {
    state.section = {
      ...state.section,
      loading: false,
      [payload.type]: { error: payload.error },
    };
  },
};
