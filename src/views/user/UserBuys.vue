<template>
  <div v-if="compras" class="box">
    <h1>Compras</h1>
    <div
      class="produto-wrapper"
      v-for="(compra, index) in compras"
      :key="index"
    >
      <ListProducts :produto="compra.produto" v-if="compra">
        <p class="vendedor"><span>Vendedor: </span> {{ compra.vendedor_id }}</p>
      </ListProducts>
    </div>
  </div>
</template>

<script>
import ListProducts from "@/components/UserProducts/ListProducts.vue";
import { api } from "@/services";
import { mapState } from "vuex";

export default {
  components: { ListProducts },
  data() {
    return {
      compras: true,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getCompras() {
      api.get(`/compras?comprador_id=${this.usuario.id}`).then((r) => {
        this.compras = r.data;
      });
    },
  },
  watch: {
    login() {
      this.getCompras();
    },
  },
  created() {
    if (this.login) {
      this.getCompras();
    }
  },
};
</script>

<style scoped></style>
