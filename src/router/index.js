import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProdutoView from "../views/products/ProdutoView.vue";
import LoginView from "../views/login/LoginView.vue";
import UserView from "../views/user/UserView.vue";
import UserProducts from "../views/user/UserProducts.vue";
import UserEdit from "../views/user/UserEdit.vue";
import UserSells from "../views/user/UserSells.vue";
import UserBuys from "../views/user/UserBuys.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/produtos/:produto",
    name: "produto",
    component: ProdutoView,
    props: true,
  },
  {
    path: "/usuario",
    component: UserView,
    children: [
      {
        path: "/",
        name: "usuario",
        component: UserProducts,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UserSells,
      },
      {
        path: "compras",
        name: "compras",
        component: UserBuys,
      },
      {
        path: "editar",
        name: "editar",
        component: UserEdit,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
