import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Public from "../views/Public.vue";
import Private from "../views/Private.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/public",
    name: "Public",
    component: Public
  },
  {
    path: "/private",
    name: "Private",
    component: Private
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
