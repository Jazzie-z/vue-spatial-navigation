import { TYPES } from "../mutationTypes";
import { transformHomeData } from "@/dstv/transformation/home.transform";
import { ENV, HEADER } from "@/dstv/constants/environment";
export default {
  getHomeData({ commit, getters }) {
    if (!getters.homeData.length) {
      commit(TYPES.HOME);
      fetch(ENV.HOME, HEADER())
        .then((res) => res.json())
        .then((data) => {
          if (data.items)
            commit(TYPES.HOME_SUCCESS, transformHomeData(data.items));
          else commit(TYPES.HOME_ERROR, data);
        });
    }
  },
};
