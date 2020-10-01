import Vue from 'vue';
import Dev from './serve.vue';
import router from '@/examples/router'
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(Dev),
}).$mount('#app');
