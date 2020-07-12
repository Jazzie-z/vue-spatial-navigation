import { TYPES } from "../mutationTypes";
import { ENV, HEADER } from "@/dstv/constants/environment";
import { transformSectionData } from "@/dstv/transformation/section.transform";
const URL = {
  livetv: ENV.LIVE_SECTION,
  catchup: ENV.CATCHUP_SECTION,
};
export default {
  getSectionData({ commit, state }, type) {
    if (!state.section[type]) {
      commit(TYPES.SECTION);
      fetch(URL[type], HEADER())
        .then((res) => res.json())
        .then((data) => {
          if (data.items)
            commit(TYPES.SECTION_SUCCESS, {
              data: transformSectionData(data.items),
              type,
            });
          else commit(TYPES.SECTION_ERROR, { error: data, type });
        });
    }
  },
};
