import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("price", (valor) => {
  valor = Number(valor);
  let tres = valor * 3;
  if (!isNaN(valor)) {
    return tres.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
