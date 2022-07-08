<template>
  <div>
    <h1>Adicionar Produto</h1>
    <form>
      <label for="nome">Nome</label>
      <input type="text" id="nome" name="nome" v-model="produto.nome" />

      <label for="preco">Preço (R$)</label>
      <input type="number" id="preco" name="preco" v-model="produto.preco" />

      <label for="foto">Fotos</label>
      <input type="file" id="fotos" name="fotos" ref="fotos" />

      <label for="descricao">Descrição</label>
      <textarea
        name="text"
        id="descricao"
        cols="30"
        rows="10"
        v-model="produto.descricao"
      ></textarea>

      <input
        type="button"
        class="btn"
        value="Adicionar produto"
        @click.prevent="addProduct"
      />
    </form>
  </div>
</template>

<script>
import { api } from "@/services";

export default {
  data() {
    return {
      produto: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false",
      },
    };
  },
  methods: {
    formatProducts() {
      this.produto.usuario_id = this.$store.state.usuario.id;
    },
    addProduct() {
      this.formatProducts();
      api.post("/produto", this.produto).then(() => {
        this.$store.dispatch("getUserProducts");
      });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
form {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
}
form label {
  width: 100px;
  display: inline-block;
  margin-bottom: 10px;
}
form input,
textarea {
  display: inline;
}
form .btn {
  grid-column: 2;
}
</style>
