import Vue from "vue";
import Router from "vue-router";
import Home from "@/dstv/components/Home";
Vue.use(Router);

export const routes = [
  {
    path: "/home",
    alias: "/",
    component: Home,
  },
];
export default new Router({
  mode: "history",
  routes,
});
