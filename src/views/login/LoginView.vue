<template>
  <div>
    <div key="conteiner">
      <transition-group name="ease">
        <div class="login" key="login">
          <h1>Iniciar Sessão</h1>
          <transition name="ease">
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
                v-model="login.senha"
                key="senha"
                placeholder="Senha"
                required
              />
              <a class="a1" href="" @click.prevent>Esqueceu a senha? </a>

              <button class="btn" type="submit" @click.prevent="logar">
                Fazer login
              </button>

              <a class="a2" href="" @click.prevent="cadastro = !cadastro"
                >Não tem uma conta? <span> Cadastre-se. </span>
              </a>
            </form>
          </transition>
        </div>

        <CadastroView v-if="cadastro" key="cadastro" class="cadastro">
        </CadastroView>
      </transition-group>
    </div>
  </div>
</template>

<script>
import CadastroView from "@/components/Globals/CadastroView.vue";
export default {
  data() {
    return {
      cadastro: false,
      login: {
        email: "",
        senha: "",
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push({ name: "usuario" });
      localStorage.setItem('email', this.login.email);
    },
  },
  components: { CadastroView },
};
</script>

<style scoped>
* {
  display: block;
}
span {
  display: inline;
  color: #f02d34;
}
.email {
  margin-bottom: 30px;
}
.login {
  max-width: 512px;
  margin: 10px auto 50px auto;
  background: #f8f8f9;
  padding: 40px;
  border-radius: 6px;
  border: 0.1px solid rgba(0, 0, 0, 0.09);
}
.login h1 {
  margin-bottom: 30px;
  font-weight: 500;
}
.login a {
  margin-top: 20px;
  color: #324d67;
  font-weight: 500;
}
.a1:hover {
  color: #f02d34;
}
.cadastro {
  margin-bottom: 100px;
}

/* TRANSITION =============================== */
.ease-enter,
.ease-leave {
  opacity: 0;
}
.ease-enter {
  transform: translate3d(0, -20px, 0);
}
.ease-leave {
  transform: translate3d(0, 20px, 0);
}
.ease-enter-active,
.ease-leave-active {
  transition: all 0.4s;
}
</style>
