<template>
  <div class="home">
    <div class="section" key="box">
      <p>Beats solo</p>
      <h2>Wireless</h2>
      <h1>HEADPHONE</h1>
      <router-link to="/produtos/PP3">
        <button>Comprar headphone wireless</button>
      </router-link>

      <img src="@/assets/headphone.webp" alt="" />
    </div>
    <ProductsList />
  </div>
</template>

<script>
import ProductsList from "@/views/products/ProductsList.vue";

export default {
  components: { ProductsList },
  name: "HomeView",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
img {
  max-width: 100%;
}
.section {
  background: #dcdcdc;
  max-width: 1400px;
  height: 500px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  animation: ease 0.2s forwards;
}
.section p {
  margin-top: 60px;
  font-size: 20px;
  /* margin-bottom: 15px; */
}
.section h2 {
  font-size: 64px;
}
.section h1 {
  font-size: 160px;
  color: white;
}
.section button {
  background: #f02d34;
  border: none;
  padding: 15px 15px;
  color: white;
  border-radius: 15px;
  font-weight: 600;
  font-size: 18px;
  margin-top: 40px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
  transition: transform .2s;
}
.section button:hover {
  transform: translate3d(0, -5px, 0);
}
.section img {
  position: absolute;
  top: 0;
  right: 280px;
  width: 450px;
  cursor: pointer;
}
@keyframes ease {
  from {
    transform: translate3d(0, -20px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@media (max-width: 900px) {
  .section {
    margin: 0 20px;
  }
}
</style>
