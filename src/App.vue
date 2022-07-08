<template>
  <div id="app">
    <PhanoxHeader />

    <main id="main">
      <router-view />
    </main>

    <PhanoxFooter />

    <div class="cart-wrapper" v-if="$store.state.cart" @click="outsideClick">
      <CartView class="cart" />
    </div>
  </div>
</template>

<script>
import PhanoxHeader from "./components/Globals/PhanoxHeader.vue";
import PhanoxFooter from "./components/Globals/PhanoxFooter.vue";
import CartView from "./views/CartView.vue";
import { api } from "./services";
import { mapMutations } from "vuex";

export default {
  components: {
    PhanoxHeader,
    PhanoxFooter,
    CartView,
  },
  computed: {
    email() {
      return localStorage.getItem("email");
    },
  },
  methods: {
    ...mapMutations(["TOGGLE_CART", "ADD_ITEM"]),
    toggle() {
      this.TOGGLE_CART();
    },
    outsideClick(event) {
      if (event.target === event.currentTarget) {
        this.TOGGLE_CART();
      }
    },
    async fetchDatas() {
      await this.$store.dispatch("getUser", this.email);
      await api.get(`http://localhost:3000/carrinho`).then((r) => {
        this.ADD_ITEM(r.data);
      });
    },
  },
  created() {
    if (this.email) {
      this.fetchDatas();
    }
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}
#main {
  flex: 1;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1;
  color: #324d67;
  font-family: "Segoe UI", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: black;
  display: block;
}

/* INPUT GLOBAL STYLE ========================== */
input,
textarea {
  width: 430px;
  padding: 12px;
  border: 1.3px solid rgba(0, 0, 0, 0.09);
  box-shadow: none;
  border-radius: 6px;
  outline: none;
  font-size: 18px;
  margin-bottom: 10px;
  transform: none;
  display: block;
}
input:hover,
textarea:hover {
  border: 1.3px solid #f02d34;
}
input:focus,
textarea:hover {
  border: 1.3px solid #f02d34;
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
}
textarea {
  max-width: 430px;
}

/* BUTTON GLOBAL STYLE ========================= */
.btn {
  background: #f02d34;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  width: 100%;
  font-size: 18px;
  margin-top: 40px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
}
.btn:hover {
  transform: scale(1.04);
  background: #d7383d;
}

/* TRANSITION =============================== */
.v-enter,
.v-leave {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave {
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s;
}

/* CART ========================================== */
.cart-wrapper {
  width: 100vw;
  position: fixed;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
}
.cart {
  max-width: 600px;
  background: #fff;
  height: 100vh;
  position: relative;
  float: right;
  padding: 40px 20px;
}

/* QUANTITY ============================================ */
.quantity {
  display: flex;
  margin-bottom: 20px;
}
.quantity span {
  font-size: 19px;
  font-weight: 700;
  margin-right: 20px;
}
.quantity p {
  font-size: 19px;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
  width: 40px;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
}
.quantity button {
  height: 40px;
  width: 45px;
  border: 0.5px solid black;
  font-size: 19px;
  background: transparent;
  cursor: pointer;
}
</style>
