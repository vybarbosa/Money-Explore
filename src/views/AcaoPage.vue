<template>
  <div v-if="acaoBuscada == null">
    <h1>Carregando...</h1>
  </div>
  <div v-else v-for="acao in acaoBuscada" :key="acao.symbol" class="container">
    <h1>{{ acao.longName }}</h1>
  </div>
</template>

<script>
import { api } from '../services.js'
export default {
  data () {
    return {
      acaoBuscada: null
    }
  },
  computed: {
    acao() {
      return this.$route.params.acao;
    },
  },
  methods: {
    fetchAcao() {
      api.get(`quote/${this.acao}?token=7BUD91zFaS2AcZwcmTxJq1`).then((response) => {
        this.acaoBuscada = response.data.results
        console.log(this.acaoBuscada)
      })
    }
  },
  created () {
    this.fetchAcao();
  }
};
</script>

<style>
</style>