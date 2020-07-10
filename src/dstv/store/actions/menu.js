import { menuSuccess } from "@/dstv/transformation/menu.transform";
import { TYPES } from "../mutationTypes";
import { ENV, HEADER } from "@/dstv/constants/environment";
export default {
  getMenuData({ getters, commit }) {
    if (!getters.menuData.length) {
      commit(TYPES.MENU);
      fetch(ENV.MENU, HEADER())
        .then((res) => res.json())
        .then((data) => {
          if (data.length) commit(TYPES.MENU_SUCCESS, menuSuccess(data));
        });
    }
  },
};
