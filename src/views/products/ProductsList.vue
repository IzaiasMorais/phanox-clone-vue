<template>
  <div>
    <ProductsSearch v-if="produtos" />

    <div v-if="produtos">
      <transition mode="out-in" name="scroll">
        <div v-if="produtos && produtos.length" class="list" key="key">
          <div class="box" v-for="produto in produtos" :key="produto.id">
            <router-link
              :to="{ name: 'produto', params: { produto: produto.id } }"
            >
              <div class="elements">
                <img alt="" src="@/assets/2.webp"/>
              </div>
              <p>{{ produto.nome }}</p>
              <span>{{ produto.preco | price}}</span>
            </router-link>
          </div>
          <ProductsPagination
            key="keys"
            :produtosTotal="produtosTotal"
            :produtosPorPagina="produtosPerPage"
          />
        </div>

        <div
          key="sem-resultados"
          class="no-results"
          v-else-if="produtos && produtos.length === 0"
        >
          <p>Busca sem resultados, tente usar outro termo</p>
        </div>
      </transition>
    </div>
    <PageLoading key="loading" v-else />
  </div>
</template>

<script>
import ProductsPagination from "../../components/Products/ProductsPagination.vue";
import { api } from "@/services.js";
import { serialize } from "@/helpers";
import ProductsSearch from "../../components/Products/ProductsSearch.vue";
import PageLoading from "../../components/Globals/PageLoading.vue";

export default {
  components: {
    ProductsPagination,
    ProductsSearch,
    PageLoading,
  },
  data() {
    return {
      produtos: null,
      produtosPerPage: 10,
      produtosTotal: 1,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPerPage}${query}`;
    },
  },
  methods: {
    getProducts() {
      api.get(this.url).then((response) => {
        this.produtosTotal = Number(response.headers["x-total-count"]);
        this.produtos = response.data;
      });
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
img {
  max-width: 100%;
}
span {
  color: black;
}
.list {
  display: grid;
  max-width: 1400px;
  padding: 0 45px;
  gap: 15px;
  margin: 0 auto;
  grid-template-columns: repeat(5, 1fr);
}
.list .box {
  transition: all 0.1s;
}
.list .box .elements {
  max-width: 250px;
  height: 250px;
  background: #ebebeb;
  border-radius: 10px;
  margin-bottom: 5px;
}
.list .box:hover {
  transform: scale(1.08);
}
.box:hover .elements {
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
}
.box p,
.box span {
  margin-bottom: 5px;
}
.box p {
  font-weight: 500;
  color: #324d67;
}
.box span {
  font-weight: bold;
}
.no-results {
  text-align: center;
}

/* TRANSITION =============================== */
.scroll-enter,
.scroll-leave {
  opacity: 0;
}
.scroll-enter {
  transform: translate3d(0, -50px, 0);
}
.scroll-leave {
  transform: translate3d(0, 50px, 0);
}
.scroll-enter-active,
.scroll-leave-active {
  transition: all .3s;
}
</style>
