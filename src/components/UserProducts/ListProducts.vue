<template>
  <div class="produto" v-if="produto">
    <router-link :to="{ name: 'produto', params: { produto: produto.id } }">
      <img class="img" alt="" v-if="produto.fotos" :src="produto.fotos[0].src" />
      <p>Ver produto</p>
    </router-link>
    <div class="info">
      <h2 class="titulo">{{ produto.nome }}</h2>
      <slot></slot>
      <p class="preco">{{ produto.preco | price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["produto"],
};
</script>

<style scoped>
h2,
p {
  margin-bottom: 10px;
}
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 15px;
  position: relative;
}
.img {
  background: #f4f7fc;
  width: 180px;
  height: 100px;
  border: none;
  border-radius: 6px;
}
.preco {
  font-weight: 500;
}
</style>
