import { createRouter, createWebHistory } from "vue-router";
import Home from "./view/pages/Home.vue";
import Login from "./view/pages/Login.vue";

const ROUTE_NAMES = {
  home: "home",
  login: "login",
};

const routes = [{ name: ROUTE_NAMES.home, path: "/", component: Home }];
const routes = [
  { name: ROUTE_NAMES.home, path: "/", component: Home },
  { name: ROUTE_NAMES.login, path: "/login", component: Login },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
