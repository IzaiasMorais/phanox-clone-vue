<template>
  <div>
    <section v-if="logged">
      <nav class="sidenav">
        <ul>
          <li>
            <router-link :to="{ name: 'usuario' }">Produtos</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'compras' }">Compras</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'vendas' }">Vendas</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'editar' }">Editar usuário</router-link>
          </li>

          <button @click.prevent="deslogar">Deslogar</button>
        </ul>
      </nav>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </section>

    <PageLoading v-else />
  </div>
</template>

<script>
import PageLoading from "@/components/Globals/PageLoading.vue";
import { mapMutations } from "vuex";
export default {
  name: "UserView",
  data() {
    return {
      logged: true,
    };
  },
  components: { PageLoading },
  methods: {
    ...mapMutations(["CHANGE_TITLE"]),
    deslogar() {
      this.$store.dispatch("deslogarUser");
      this.$router.push("/login");
      localStorage.removeItem("email");
    },
  },
};
</script>

<style scoped>
section {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 20px;
  gap: 30px;
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
}
.sidenav {
  max-width: 200px;
}
.sidenav ul li a,
.sidenav ul button {
  padding: 10px;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}
.sidenav ul li a:hover,
.sidenav ul button:hover {
  color: #fff;
  background: #f02d34;
}
.sidenav ul button {
  width: 100%;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
}
.sidenav ul button:hover {
  background: #d12e34;
}
.sidenav ul li a.router-link-exact-active {
  background: #f02d34;
  color: #fff;
}
</style>
