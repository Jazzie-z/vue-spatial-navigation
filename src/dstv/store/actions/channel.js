import { TYPES } from "../mutationTypes";
import { HEADER } from "@/dstv/constants/environment";
import { transformChannelData } from "@/dstv/transformation/channel.transform";
export default {
  getChannelData({ commit }, url) {
    commit(TYPES.CHANNEL);
    fetch(url, HEADER())
      .then((res) => res.json())
      .then((data) => {
        if (data.items)
            commit(TYPES.CHANNEL_SUCCESS, transformChannelData(data.items));
        else
        commit(TYPES.CHANNEL_ERROR, data);
      });
  },
};
