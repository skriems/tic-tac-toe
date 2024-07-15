import { createRouter, createWebHistory } from "vue-router";
import Home from "./view/pages/Home.vue";
import Login from "./view/pages/Login.vue";
import Match from "./view/pages/Match.vue";

const ROUTE_NAMES = {
  home: "home",
  login: "login",
  match: "match",
};

const routes = [
  { name: ROUTE_NAMES.home, path: "/", component: Home },
  { name: ROUTE_NAMES.login, path: "/login", component: Login },
  { name: ROUTE_NAMES.match, path: "/matches/:id", component: Match },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
