<template>
  <div>
    <div class="login-modal-view" key="login" v-if="logg">
      <h1>Iniciar Sessão</h1>

      <form action="">
        <input
          type="text"
          class="email"
          v-model="login.email"
          key="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          class="senha"
          v-model="login.senha"
          key="senha"
          placeholder="Senha"
          required
        />
        <a class="a1" href="" @click.prevent>Esqueceu a senha? </a>

        <button class="btn" type="submit" @click.prevent="logUser">
         Finalizar compra
        </button>

        <p class="a2">
          Não tem uma conta? <a @click.prevent="toggle"> Cadastre-se. </a>
        </p>
      </form>
    </div>

    <PhanoxForm class="cadastro-utils" v-if="cadastro">
      <template v-slot:title3>
        <h1>Cadastre-se</h1>
      </template>
      <template v-slot:cadastro>
        <button class="finalizar btn" @click.prevent="createUser">
          Finalizar compra
        </button>
        <p>Já possui uma conta? <a @click.prevent="toggle">Entre</a></p>
      </template>
    </PhanoxForm>
  </div>
</template>

<script>
import PhanoxForm from "../../views/login/PhanoxForm.vue";
import { api } from "@/services";
import { mapState } from "vuex";

export default {
  data() {
    return {
      cadastro: false,
      logg: true,
      login: {
        email: "",
        senha: "",
      },
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
      };
    },
  },
  props: ["api"],
  methods: {
    toggle() {
      this.cadastro = !this.cadastro;
      this.logg = !this.logg;
    },
    buyNow() {
      if (this.$store.state.login) {
        api.post("/compras", this.compras).then(() => {
          this.$router.push({ name: "compras" });
        });
      }
    },
    async logUser() {
      await this.$store.dispatch("getUser", this.login.email);
      await this.buyNow();
    },
    async createUser() {
      try {
        await this.$store.dispatch("criarUsuario", this.$store.state.usuario);
        await this.$store.dispatch("getUser", this.$store.state.usuario.email);
        await this.buyNow();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { PhanoxForm },
};
</script>

<style scoped>
.email,
.senha {
  margin-bottom: 30px;
}
.login-modal-view h1 {
  margin-bottom: 30px;
  font-weight: 500;
}
.login-modal-view p,
.cadastro-utils p {
  margin-top: 20px;
  color: #324d67;
  font-weight: 500;
}
.login-modal-view p a,
.cadastro-utils p a {
  display: inline;
  color: #f23;
  cursor: pointer;
}
.cadastro-utils {
  position: fixed;
  top: 50px;
  right: 16px;
  left: 16px;
}
.cadastro-utils .finalizar {
  margin-bottom: 0;
}
</style>
