<template>
  <div class="produto-view">
    <div class="produto-containter" v-if="api">
      <div class="box-image">
        <img src="@/assets/5.webp" alt="" />
        <div class="gallery">
          <img src="@/assets/7.webp" alt="" />
          <img src="@/assets/5.webp" alt="" />
          <img src="@/assets/4.webp" alt="" />
          <img src="@/assets/10.webp" alt="" />
        </div>
      </div>
      <div class="box-description">
        <h1>{{ api.nome }}</h1>
        <div class="reviews">⭐⭐⭐⭐⭐</div>
        <span class="details"> Detalhes: </span>
        <p>
          O jogo começa aqui. Com os fones de ouvido para jogos Immortal 1000D,
          não apenas jogue - sinta, viva e possua. Aumente o nível do seu jogo
          de áudio com som surround de 7.1 canais e Dolby Atmos que libera a
          fera vencedora dentro de você. Equipado com drivers de 50 mm, obtenha
          uma poderosa experiência de jogo em 360° como nenhuma outra.
        </p>
        <span class="preco"> {{ api.preco | price }} </span>
        <div class="quantity">
          <span>Quantidade:</span>
          <button @click="quantidade--">-</button>
          <p>{{ quantidade }}</p>
          <button @click="quantidade++">+</button>
        </div>
        <button class="add" @click="addCart">Adicionar ao carrinho</button>
        <button class="buy" @click="buyNow">Comprar agora</button>
      </div>
    </div>

    <ProductsGaleria v-if="api" />

    <PageLoading v-else />

    <div class="modal-login" v-if="finalizar" @click="outsideClick">
      <LoginUtils class="login-utils" :api="api" />
    </div>

    <div class="feedback" v-if="show">
      <img src="@/assets/check.png" alt="" />
      1 {{ api.nome }} adicionado
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";
import ProductsGaleria from "@/views/products/ProductsGaleria.vue";
import PageLoading from "@/components/Globals/PageLoading.vue";
import { mapMutations, mapState } from "vuex";
import LoginUtils from "@/components/Globals/LoginUtils.vue";

export default {
  data() {
    return {
      api: "",
      show: false,
      quantidade: 1,
      finalizar: false,
      number: Math.round(Math.random() * 10000000),
    };
  },
  computed: {
    ...mapState(["usuario"]),
    compras() {
      return {
        comprador_id: this.usuario.email,
        vendedor_id: this.api.usuario_id,
        produto: this.api,
        endereco: {
          cep: this.usuario.cep,
          rua: this.usuario.rua,
          numero: this.usuario.numero,
          bairro: this.usuario.bairro,
          cidade: this.usuario.cidade,
          estado: this.usuario.estado,
        },
        id: this.number,
      };
    },
  },
  props: ["produto"],
  methods: {
    ...mapMutations(["TOGGLE_CART", "ADD_ITEM", "SET_PRODUCT"]),
    async addCart() {
      await api.post("/carrinho", this.compras);
      await api.get(`http://localhost:3000/carrinho`).then((r) => {
        this.ADD_ITEM(r.data);
      });
      this.showAdded();
      this.number = Math.round(Math.random() * 10000000);
      console.log(this.number);
    },
    async buyNow() {
      if (this.$store.state.login) {
        await this.addCart();
        await this.TOGGLE_CART();
      } else {
        this.finalizar = !this.finalizar;
      }
    },
    getProducts() {
      api
        .get(`http://localhost:3000/produto/${this.produto}`)
        .then((response) => {
          this.api = response.data;
        });
    },
    showAdded() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1000);
    },
    outsideClick(event) {
      if (event.target === event.currentTarget) {
        this.finalizar = !this.finalizar;
      }
    },
  },
  created() {
    this.getProducts();
    window.scrollTo(0, "smooth");
  },
  components: { PageLoading, LoginUtils, ProductsGaleria },
};
</script>

<style scoped>
.modal-login {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 9999;
  top: 0;
}
.login-utils {
  width: 512px;
  margin: 0 auto;
  position: fixed;
  top: 200px;
  z-index: 1000000;
  display: flex;
  padding: 40px;
  background: #f8f8f9;
  right: 16px;
  left: 16px;
  border-radius: 6px;
  border: 0.1px solid rgba(0, 0, 0, 0.09);
}

.feedback {
  position: fixed;
  top: 16px;
  left: 16px;
  right: 16px;
  background: #fff;
  box-shadow: 0 4px 8px rgb(30 60 90 / 10%);
  padding: 15px 10px;
  max-width: max-content;
  text-align: center;
  margin: 0 auto;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  animation: show 0.3s forwards;
  z-index: 100000000;
}
.feedback img {
  width: 18px;
}
.feed-leave {
  opacity: 0;
}
.feed-leave-active {
  transition: all 1s;
}
@keyframes show {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
span {
  display: block;
}
button {
  cursor: pointer;
}
.produto-containter {
  max-width: 1400px;
  margin: 50px auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
.produto-containter .box-image img {
  max-width: 400px;
  background: #ebebeb;
  border-radius: 15px;
  margin-bottom: 24px;
  transition: background 0.3s;
}
.produto-containter .box-image img:hover {
  background: #f02d34;
}
.gallery {
  max-width: 400px;
  display: flex;
  gap: 10px;
}
.gallery > img {
  width: 70px;
  height: 70px;
  border-radius: 10px !important;
}
.box-description {
  grid-column: 2 / 4;
}
.box-description h1 {
  margin: 5px 0 10px 0;
}
.box-description .reviews {
  height: 21px;
  margin-bottom: 20px;
}
.box-description .details {
  font-weight: bold;
  margin-bottom: 10px;
}
.box-description p {
  line-height: normal;
  margin-bottom: 30px;
}
.box-description .preco {
  font-weight: 700;
  font-size: 26px;
  color: #f02d34;
  margin-bottom: 23px;
}
.add,
.buy {
  border: none;
  margin-right: 30px;
  padding: 15px 20px;
  max-width: 250px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.add:hover,
.buy:hover {
  transform: scale(1.1);
}
.add {
  background: transparent;
  border: 1px solid #f02d34;
  color: #f02d34;
}
.buy {
  background: #f02d34;
  color: #fff;
}
</style>
