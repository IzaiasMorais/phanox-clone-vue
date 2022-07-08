<template>
  <div class="header">
    <a href="/"><p>PHANOX</p></a>
    <div class="login">
      <router-link v-if="$store.state.login" to="/usuario">
        {{ nome }}
      </router-link>

      <router-link v-else to="/login">
        <a class="login-a" href="">Login</a>
      </router-link>

      <button class="cart-btn" @click="toggle()">
        <div class="count">
          <p>{{ $store.state.list.length }}</p>
        </div>
        <img src="@/assets/card.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "PhanoxHeader",

  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    },
    link() {
      if (this.$store.state.login) {
        return "/usuario";
      } else {
        return "/login";
      }
    },
  },
  methods: {
    ...mapMutations(["TOGGLE_CART"]),
    toggle() {
      this.TOGGLE_CART();
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  align-items: center;
}
a {
  text-decoration: none;
  color: black;
}
p {
  font-size: 18px;
}
.login {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 1.2rem;
}
.login .login-a:hover {
  color: #f02d34;
}
.cart-btn {
  border: none;
  background: 0;
  position: relative;
}
.count {
  position: absolute;
  background: red;
  width: 20px;
  height: 20px;
  padding: 0 0 2px 0;
  display: grid;
  align-items: center;
  border-radius: 50%;
  top: -5px;
  right: -10px;
}
.count p {
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}
</style>
