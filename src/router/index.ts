import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "about" */ "../views/Top.vue"),
  },
  {
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/logList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogList.vue"),
  },
  {
    path: "/logDetail/:id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogDetail.vue"),
  },
  {
    path: "/editLog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditLog.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
