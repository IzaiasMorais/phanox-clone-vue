<template>
  <div>
    <AddProducts class="add" />

    <h2 class="h2">Seus produtos</h2>

    <transition-group v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ListProducts :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletar(produto.id)">
            <img class="imagem" src="@/assets/remove.svg" alt="">
          </button>
        </ListProducts>
      </li>
    </transition-group>

    <PageLoading v-else />
  </div>
</template>

<script>
import AddProducts from "@/components/UserProducts/AddProducts.vue";
import { mapActions, mapState } from "vuex";
import ListProducts from "@/components/UserProducts/ListProducts.vue";
import PageLoading from "@/components/Globals/PageLoading.vue";
import { api } from "@/services";

export default {
  computed: {
    ...mapState(["login", "usuario", "usuario_produtos"]),
  },
  methods: {
    ...mapActions(["getUserProducts"]),
    deletar(id) {
      const confirmar = window.confirm("Dejesa remove este produto?");
      if (confirmar) {
        api.delete(`/produto/${id}`).then(() => {
          this.getUserProducts();
        }).catch(erro => {
          console.log(erro);
        })
      }
    },
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
  },
  components: { ListProducts, AddProducts, PageLoading },
};
</script>

<style scoped>
h2,
.add {
  margin-bottom: 30px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.deletar {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding:3px;
}
.deletar:hover {
  transform: scale(1.08);
  transition: all .1s;
}
</style>
