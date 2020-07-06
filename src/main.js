import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export const focusHandler = new Vue();

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
