import Vue from "vue";
import Router from "vue-router";
import Home from "@/dstv/components/Page/Home";
import Channels from "@/dstv/components/Page/Channels";
Vue.use(Router);

export const routes = [
  {
    path: "/home",
    alias: "/",
    component: Home,
  },
  {
    path: "/livetv",
    component: Channels,
  },
];
export default new Router({
  mode: "history",
  routes,
});
