<template>
  <section>
    <div class="container">
      <div v-for="acao in acoes" :key="acao.stock" class="container-stock" @click="fetchAcao(acao)">
        <div class="content-stock">
          <div class="img-stock">
            <img :src="acao.logo" alt="logo" />
          </div>
          <div class="name-sigla-stock">
            <p>{{ acao.name }}</p>
            <span>{{ acao.stock }}</span>
          </div>
          <h6>PREÇO DO ATIVO</h6>
          <div class="preco-variacao">
            <h2>R$ {{ acao.close }}</h2>
            <span :class="chageAcao(acao.change)">{{ acao.change }} %</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchActionsHigh, fetchActionsLow } from "../services.js";


export default {
  name: "ActionsLow",
  data() {
    return {
      acoes: [],
    };
  },

  props: ['actionHigh'],

  watch: {
    actionHigh() {
      this.fetchActions();
      console.log(this.actionHigh)
    }
  },

  methods: {
    async fetchActions() {
      try {
        const acoesBuscadas = await this.fillActions();
        this.acoes = acoesBuscadas
        this.acoes.forEach((acao) => {
          acao.close = acao.close.toFixed(2);
          acao.change = acao.change.toFixed(2);
        })
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      }
    },
    fetchAcao (acao) {
      if(acao.stock){
        this.$router.push({name: 'acao', params: {acao: acao.stock}})
      }
    },

    chageAcao(change) {
      return change > 0 ? 'high' : 'low';
    },

    fillActions() {
      if (this.actionHigh) {
        return fetchActionsHigh();
      }
      return fetchActionsLow();
    },
  },
  created() {
    this.fetchActions();
  },
};
</script>

<style scoped>
img {
  width: 30px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.container-stock {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  width: 30%;
  cursor: pointer;
}
.container-stock:hover {
  box-shadow: #053558 0px 2px 8px;
}
.name-sigla-stock {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.name-sigla-stock span {
  color: rgb(116, 115, 115);
}
.preco-variacao {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.preco-variacao .high {
  color: green;
}

.preco-variacao .low {
  color: red;
}
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .container-stock {
    width: 90%;
  }
}
</style>