import Vue from "vue";
import Router from "vue-router";
import ListExample from "@/examples/collections/ListExample";
import ListDisabledExample from "@/examples/collections/ListDisabledExample";
import CarouselExample from "@/examples/collections/CarouselExample";
import NestedCarouselExample from "@/examples/collections/NestedCarouselExample";
import GridExample from "@/examples/collections/GridExample";
import SampleApp from "@/examples/pages/SampleApp";
Vue.use(Router);

export const routes = [
  {
    path: "/list",
    displayName: "List",
    component: ListExample,
  },
  {
    path: "/listdisabled",
    displayName: "List with disabled items",
    component: ListDisabledExample,
  },
  {
    path: "/carousel",
    displayName: "Carousel",
    component: CarouselExample,
  },
  {
    path: "/nestedcarousel",
    displayName: "Nested Carousel",
    component: NestedCarouselExample,
  },
  {
    path: "/grid",
    displayName: "Grid",
    component: GridExample,
  },
  {
    path: "/app",
    displayName: "Sample App",
    component: SampleApp,
  },
  { path: "*", redirect: "/carousel" },
];
export default new Router({
  mode: "history",
  routes,
});
