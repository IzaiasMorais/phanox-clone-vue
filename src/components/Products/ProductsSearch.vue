<template>
  <div>
    <form class="search">
      <h1>Produtos mais vendidos</h1>
      <p>Diversas opções de Alto-falantes</p>
      <div class="box">
        <input
          class="text"
          type="text"
          placeholder="Buscar..."
          v-model="busca"
        />
        <input
          class="submit"
          type="submit"
          value=""
          @click.prevent="searchProducts"
        />
        <img class="lupa" src="@/assets/search.svg" alt="" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busca: "",
    };
  },
  methods: {
    searchProducts() {
      this.$router.push({ query: { q: this.busca } });
    },
  },
};
</script>

<style>
.search {
  padding: 40px 0;
}
.search {
  margin: 0 auto;
  max-width: 600px;
  text-align: center;
}
.search h1 {
  color: #324d67;
  font-size: 40px;
  font-weight: 800;
}
.search p {
  color: #324d67;
  margin: 10px 0 15px 0;
}
.text {
  width: 600px;
  padding: 18px;
  border: none;
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  transition: transform 0.3s;
}
.text:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgb(30 60 90 / 20%);

}
.text:focus {
  transform: scale(1.1);
}
.text {
  border: none !important;
}
.box {
  position: relative;
}
.submit, .lupa {
  position: absolute;
  width: 25px;
  bottom: 15px;  
  border: none;
  cursor: pointer;
  right: 10px;
  max-width: 100%;
}
.submit {
  z-index: 1;
  width: 40px;
  height: 40px;
  right: 3px;
  border: none !important;
  top: 10px;
  box-shadow: none !important;
  background: transparent;
}
</style>
