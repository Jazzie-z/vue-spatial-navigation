import { TYPES } from "../mutationTypes";
import { ENV, HEADER } from "@/dstv/constants/environment";
import { transformSectionData } from "@/dstv/transformation/section.transform";
export default {
  getSectionData({ commit, state }, type) {
    if (!state.section[type]) {
      commit(TYPES.SECTION);
      fetch(ENV.LIVE_SECTION, HEADER())
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
