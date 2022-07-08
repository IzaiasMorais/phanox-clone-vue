<template>
  <div>
    <PhanoxForm>
      <template v-slot:title2>
        <h1>Vamos começar?</h1>
      </template>
      <template v-slot:cadastro>
        <button class="cadastrar btn" @click.prevent="criarUsuario()">
          Cadastrar
        </button>
      </template>
    </PhanoxForm>
  </div>
</template>

<script>
import PhanoxForm from "./PhanoxForm.vue";

export default {
  methods: {
    async criarUsuario() {
      await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
      await this.$store.dispatch("getUser", this.$store.state.usuario.email);
      this.$router.push({ name: "usuario" });
    },
  },
  components: { PhanoxForm },
};
</script>

<style>
.form {
  max-width: 512px;
  margin: 0 auto;
  background: #f8f8f9;
  padding: 40px;
  border-radius: 6px;
  border: 0.1px solid rgba(0, 0, 0, 0.09);
}
.form input {
  margin-bottom: 15px;
}
.form button {
  margin: 10px 0 20px 0;
}
.form a {
  margin-top: 20px;
  color: #324d67;
  font-weight: 500;
}
.form span {
  display: inline;
  color: #f02d34;
}
::placeholder {
  color: #a3a3a3cb;
}
h1 {
  margin-bottom: 30px;
  font-weight: 500;
}
</style>
