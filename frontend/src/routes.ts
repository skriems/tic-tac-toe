import { createRouter, createWebHistory } from "vue-router";
import Home from "./view/pages/Home.vue";

const ROUTE_NAMES = {
  home: "home",
};

const routes = [{ name: ROUTE_NAMES.home, path: "/", component: Home }];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
