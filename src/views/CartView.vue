<template>
  <div class="cart-wrapper" key="wrapper">
    <p>
      <button class="back" @click="toggle">
        <img src="@/assets/211686_back_arrow_icon.png" alt="" />
      </button>
      Seu carrinho <span> ({{ $store.state.list.length }} itens) </span>
    </p>
    <!-- LISTA DE PRODUTOS =============== -->
    <div key="lista-produtos" v-if="productList.length > 0">
      <ul class="product-list">
        <li
          class="product"
          v-for="(product, index) in productList"
          :key="index"
        >
          <div class="img-cart"><img src="@/assets/1.webp" alt="" /></div>
          <div class="content-cart">
            <div class="cart-price">
              <h2>{{ product.produto.nome }}</h2>
              <span> {{ product.produto.preco | price }}</span>
            </div>

            <div class="cart-add">
              <div class="quantity">
                <button @click="quantidade--">-</button>
                <p>1</p>
                <button @click="quantidade++">+</button>
              </div>
              <button @click="removeItem(product.id, index)" class="remove">
                <img src="@/assets/cancel.svg" alt="" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- FINALIZAR ================ -->
    <div key="finalizar" class="finalizar" v-if="productList.length > 0">
      <h2>
        Subtotal: <span>{{ productTotal | price }}</span>
      </h2>
      <button class="btn" @click="finalizarCompra">Finalizar compra</button>
    </div>
    <!-- CARINHO VAZIO ================== -->
    <div key="bag" class="bag" v-if="productList.length === 0">
      <img src="@/assets/shopping-bag.webp" alt="" />
      <p>Sua carrinho está vazinho.</p>
      <a href="/"><button class="btn" @click="toggle">Comprar itens</button></a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { api } from "@/services";

export default {
  data() {
    return {
      productTotal: "",
      productList: this.$store.state.list,
    };
  },
  watch: {
    productList() {
      var preco = 0;
      this.productList.forEach((i) => {
        preco = preco + Number(i.produto.preco);
        this.productTotal = preco;
      });
    },
  },
  methods: {
    ...mapMutations([
      "TOGGLE_CART",
      "POST_COMPRAS",
      "REMOVE_ITEM",
      "REMOVE_ITENS",
    ]),
    toggle() {
      this.TOGGLE_CART();
    },
    purge() {
      this.productList = [];
    },
    async removeItem(id, index) {
      this.REMOVE_ITEM(index);
      api.delete(`/carrinho/${id}`);
    },
    async finalizarCompra() {
      await this.POST_COMPRAS();
      await this.productList.map((r) => {
        api.delete(`/carrinho/${r.id}`);
      });
      await this.purge();
      await this.REMOVE_ITENS();
      await this.$router.push({ name: "compras" });
      this.TOGGLE_CART();
    },
  },
  created() {
    var preco = 0;
    this.productList.forEach((i) => {
      preco = preco + Number(i.produto.preco);
      this.productTotal = preco;
    });
  },
};
</script>

<style scoped>
.finalizar {
  position: absolute;
  background: #fff;
  width: 96%;
  bottom: 0px;
  height: 180px;
  padding: 30px 0;
}
.finalizar h2 {
  display: flex;
  justify-content: space-between;
  width: 470px;
  font-size: 22px;
  margin: 0 auto;
}
.finalizar button {
  max-width: 400px;
  margin-left: 80px;
}
.product-list {
  margin: 15px 0;
  padding: 20px 10px;
  max-width: 580px;
  overflow: auto;
  max-height: 70vh;
}
.product-list::-webkit-scrollbar {
  display: none;
}
.product {
  margin-bottom: 0px;
  padding: 20px;
  display: grid;
  grid-template-columns: minmax(100px, 150px) 1fr;
  gap: 30px;
}
.product img {
  max-width: 150px;
  background: #ebebeb;
  border-radius: 15px;
}
.product .cart-price {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}
.product .cart-price span {
  font-weight: bold;
  font-size: 20px;
}
.product .cart-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-height: 41px;   */
}
.product .cart-add .quantity {
  margin-top: 10px;
}
.product .cart-add .remove {
  width: 24px;
  height: 24px;
  background: none;
  cursor: pointer;
  background: none;
  border: none;
}
.product .cart-add .remove img {
  background: none;
  width: 24px;
}

.cart-wrapper p {
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.cart-wrapper .back {
  border: none;
  cursor: pointer;
  width: 40px;
  height: 25px;
  background: none;
}
.cart-wrapper .back img {
  width: 25px;
}
.cart-wrapper p span {
  color: #f02d34;
  margin-left: 10px;
}
.cart-wrapper .bag {
  max-width: 500px;
  margin: 40px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.cart-wrapper .bag .btn {
  width: 400px;
}
</style>
