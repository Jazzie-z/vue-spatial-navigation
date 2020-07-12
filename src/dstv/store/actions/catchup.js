import { TYPES } from "../mutationTypes";
import { HEADER } from "@/dstv/constants/environment";
import { transformCatchupData } from "@/dstv/transformation/catchup.transform";
export default {
  getCatchupData({ commit }, url) {
    commit(TYPES.CATCHUP);
    fetch(url, HEADER())
      .then((res) => res.json())
      .then((data) => {
        if (data.items)
          commit(TYPES.CATCHUP_SUCCESS, transformCatchupData(data));
        else commit(TYPES.CATCHUP_ERROR, data);
      });
  },
};
