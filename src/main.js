import Vue from "vue";
import App from "./dstv/App.vue";
// import router from "./router";
import router from "./dstv/router";
export const focusHandler = new Vue();

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
