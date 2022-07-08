<template>
  <div class="boxe">
    <ul class="pagination" v-if="paginaTotal > 1">
      <li v-for="pagina in paginaTotal" :key="pagina">
        <router-link class="li" :to="{ query: query(pagina) }">
          {{ pagina }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
    produtosTotal: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    paginaTotal() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
  },
};
</script>

<style scoped>
.boxe {
  grid-column: 1 / -1;
}
.pagination {
  margin-top: 30px;
  display: flex;  
  gap: 5px;
}
.pagination .li {
  padding: 10px 1px;
  width: 35px;
  text-align: center;
  display: block;
  font-weight: bold;
  font-size: 18px;
  border-radius: 4px;
}
.pagination .li:hover {
  background: #ebebeb;
}
.pagination .li.router-link-exact-active {
  background: #ebebeb;
}
</style>
