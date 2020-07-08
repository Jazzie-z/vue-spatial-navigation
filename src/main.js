import Vue from "vue";
import App from "./App.vue";
import DstvApp from "./dstv/App.vue";
import router from "./router";
import DstvRouter from "./dstv/router";
export const focusHandler = new Vue();
Vue.config.productionTip = false;

const DSTV = true;

let AppModule = App;
let routerModule = router;
if (DSTV) {
  AppModule = DstvApp;
  routerModule = DstvRouter;
}

new Vue({
  router: routerModule,
  render: (h) => h(AppModule),
}).$mount("#app");
