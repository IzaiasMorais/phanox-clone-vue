<template>
  <div v-if="vendas" class="box">
    <h1>Vendas</h1>
    <div class="produto-wrapper" v-for="(venda, index) in vendas" :key="index">
      <ListProducts :produto="venda.produto" v-if="venda">
        <p class="vendedor">
          <span>Comprador: </span> {{ venda.comprador_id }}
        </p>
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
      vendas: true,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getVendas() {
      api.get(`/compras?vendedor_id=${this.usuario.id}`).then((r) => {
        this.vendas = r.data;
      });
    },
  },
  watch: {
    login() {
      this.getVendas();
    },
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
  },
};
</script>

<style scoped></style>
