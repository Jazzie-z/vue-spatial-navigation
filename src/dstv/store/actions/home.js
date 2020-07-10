import { TYPES } from "../mutationTypes";
import { transformHomeData } from "@/dstv/transformation/home.transform";
export default {
  getHomeData({ commit, getters }) {
    if (!getters.homeData.length) {
      commit(TYPES.HOME);
      fetch(
        "https://now.dstv.com/api/cs-mobile/editorial/v6/getEditorialsForHome;productId=1b09957b-27aa-493b-a7c9-53b3cec92d63;platformId=32faad53-5e7b-4cc0-9f33-000092e85950;packageId=3e6e5480-8b8a-4fd5-9721-470c895f91e2",
        {
          headers: {
            authorization: "aa56fa8a-fd0e-4b9b-b26e-b8acb8d40e30",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            commit(TYPES.HOME_SUCCESS, transformHomeData(data.items));
          }
        });
    }
  },
};
