import Vue from "vue";
import App from "./App.vue";
import DstvApp from "@/dstv/App.vue";
import router from "./router";
import DstvRouter from "@/dstv/router";
import { store } from "@/dstv/store/store";
import { Plugin } from "vue-fragment";
Vue.use(Plugin);
Vue.config.productionTip = false;

const DSTV = true;

let AppModule = App;
let props = { router };
if (DSTV) {
  AppModule = DstvApp;
  props = { router: DstvRouter, store };
}

new Vue({
  ...props,
  render: (h) => h(AppModule),
}).$mount("#app");
