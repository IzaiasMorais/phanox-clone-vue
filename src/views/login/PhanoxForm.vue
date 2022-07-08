<template>
 <transition
      ><form action="" class="form">        
        <slot name="title1"></slot>
        <slot name="title2"></slot>
        <slot name="title3"></slot>        
        
        <input id="nome" name="nome" type="text" placeholder="Nome" v-model="nome" required/>
        <input id="email" name="email" type="email" placeholder="Email"  v-model="email" required/>
        <input id="senha" name="senha" type="password" placeholder="Senha"  v-model="senha" required/>
        <input id="cep" name="cep" type="text" placeholder="Cep"  v-model="cep" @keyup="preencherCep()" required/>
        <input id="rua" name="rua" type="text" placeholder="Rua"  v-model="rua" required/>
        <input id="numero" name="numero" type="text" placeholder="Número"  v-model="numero" required/>
        <input id="bairro" name="bairro" type="text" placeholder="Bairro"  v-model="bairro" required/>
        <input id="cidade" name="cidade" type="text" placeholder="Cidade"  v-model="cidade" required/>
        <input id="estado" name="estado" type="text" placeholder="Estado"  v-model="estado" required/>

        <slot name="cadastro"></slot>
        <slot name="editar"></slot> 
        <slot name="finalizar"></slot>      
        
      </form></transition
    >
</template>

<script>
import { mapFields } from "@/helpers";
import { getCep } from "@/services";

export default {
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "rua",
        "cep",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ],
      base: "usuario",
      mutation: "UPDATE_USER",
    }),
  },
  methods: {
    preencherCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((r) => {
          this.rua = r.data.logradouro;
          this.bairro = r.data.bairro;
          this.cidade = r.data.localidade;
          this.estado = r.data.uf;
        });
      }
    },
  },
};
</script>

<style></style>
