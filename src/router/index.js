import Vue from "vue";
import Router from "vue-router";
import ListExample from "@/components/Example/ListExample";
import ListDisabledExample from "@/components/Example/ListDisabledExample";
import CarouselExample from "@/components/Example/CarouselExample";
import NestedCarouselExample from "@/components/Example/NestedCarouselExample";
import GridExample from "@/components/Example/GridExample";
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
];
export default new Router({
  mode: "history",
  routes,
});
