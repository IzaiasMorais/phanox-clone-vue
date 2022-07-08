<template>
  <div>
    <PhanoxForm>
      <template v-slot:title1>
        <h1>Editar usuário</h1>
      </template>
      <template v-slot:editar>
        <button class="btn" @click.prevent="updateUser">
          Salvar alterações
        </button>
      </template>
    </PhanoxForm>
  </div>
</template>

<script>
import PhanoxForm from "@/views/login/PhanoxForm.vue";
import { api } from "@/services";

export default {
  components: { PhanoxForm },
  methods: {
    updateUser() {
      api
        .put(
          `/usuario/${this.$store.state.usuario.id}`,
          this.$store.state.usuario
        )
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "usuario" });
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 30px;
  font-weight: 500;
}
</style>
