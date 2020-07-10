import { TYPES } from "../mutationTypes";

export default {
  [TYPES.MENU](state) {
    state.menu.loading = true;
  },
  [TYPES.MENU_SUCCESS](state, payload) {
    state.menu = {
      data: payload,
    };
  },
};
