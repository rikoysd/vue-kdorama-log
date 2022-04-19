import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
    path: "/editLog/:id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditLog.vue"),
  },
  {
    path: "/doramaList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DoramaList.vue"),
  },
  {
    path: "/doramaDetail/:id",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DoramaDetail.vue"),
  },
  {
    path: "/watchList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/WatchList.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue"),
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterUser.vue"),
  },
  {
    path: "/myPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MyPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
