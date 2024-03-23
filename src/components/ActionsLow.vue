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
            <span>{{ acao.change }} %</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from "../services.js";
export default {
  name: "ActionsLow",
  data() {
    return {
      acoes: [],
    };
  },
  methods: {
    fetchActions() {
      api
        .get(
          `/quote/list?type=stock&sortBy=change&sortOrder=asc&limit=6&token=${import.meta.env.VITE_API_KEY}`
        )
        .then((response) => {
          this.acoes = response.data.stocks;
          this.acoes.forEach((element) => {
            element.close = element.close.toFixed(2);
            element.change = element.change.toFixed(2);
          });
        });
    },
    fetchAcao (acao) {
      if(acao.stock){
        this.$router.push({name: 'acao', params: {acao: acao.stock}})
      }
    }
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

.preco-variacao span {
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