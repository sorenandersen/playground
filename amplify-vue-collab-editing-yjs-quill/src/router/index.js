import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import DocumentList from "../views/DocumentList.vue";
import DocumentEdit from "../views/DocumentEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/users",
    name: "Users",
    component: Users
  },
  {
    path: "/:userId/docs",
    name: "DocumentList",
    props: true,
    component: DocumentList
  },
  {
    path: "/:userId/docs/:docId/edit",
    name: "DocumentEdit",
    props: true,
    component: DocumentEdit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
