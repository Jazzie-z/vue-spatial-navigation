import { TYPES } from "../mutationTypes";
import { transformErrorData } from "../../transformation/error.transform";

export default {
  [TYPES.ERROR](state, payload) {
    state.error = transformErrorData(payload);
  },
  [TYPES.ERROR_CLEAR](state) {
    state.error = null;
  },
};
