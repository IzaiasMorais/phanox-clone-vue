<template>
  <div>
    <div class="galeria">
      <h1>Você também pode gostar</h1>
      <div v-if="produtos && produtos.length" class="list">
        <div class="box" v-for="produto in produtos" :key="produto.id">
          <router-link :to="{ params: { produto: produto.id } }">
            <div class="elements">
              <img alt="" />
            </div>
            <p>{{ produto.nome }}</p>
            <span>${{ produto.preco }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { api } from "@/services.js";
import { serialize } from "@/helpers";

export default {
  data() {
    return {
      produtos: null,
      produtosPerPage: 10,
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
.galeria {
  max-width: 1400px;
  margin: 0 auto 100px auto;
  overflow: hidden;
  text-align: center;
  padding: 20px;
}
.galeria h1 {
  margin: 0px 0 50px 0;
}
.list {
  display: flex;
  gap: 15px;
  will-change: transform;
  /* animation: marquee 9s linear infinite; */
  white-space: nowrap;
}
.list:hover {
  animation-play-state: paused;
}
.list .box {
  transition: all 0.1s;
}
.list .box:hover {
  transform: scale(1.08);
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
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.list .box .elements {
  width: 250px;
  height: 250px;
  background: #ebebeb;
  border-radius: 10px;
  margin-bottom: 5px;
}
</style>
