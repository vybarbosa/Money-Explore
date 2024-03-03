<template>
  <div class="loading" v-if="acaoBuscada == null && mensagemErro == null">
    <Loading />
  </div>
  <div v-else v-for="acao in acaoBuscada" :key="acao.symbol" class="container">
    <div class="capa">
      <div class="name-stock">
        <h1>{{ acao.shortName }}</h1>
        <h2>{{ acao.symbol }}</h2>
      </div>
    </div>
    <div class="stock-information">
      <div class="price-current">
        <p>VALOR ATUAL</p>
        <h2>R$ {{ acao.regularMarketPrice }}</h2>
        <div class="variation-stock">
          <i v-if="acao.regularMarketChangePercent < 0" class="ti ti-arrow-down"></i>
          <i v-else class="ti ti-arrow-up"></i>
          <span>{{ acao.regularMarketChangePercent }}</span>
        </div>
      </div>
      <div class="price-current">
        <p>MIN. 52 SEMANAS</p>
        <h2 v-if="acao.fiftyTwoWeekLow != '0.00' ">R$ {{ acao.fiftyTwoWeekLow }}</h2>
        <h2 v-else > -- </h2>
      </div>
      <div class="price-current">
        <p>MAX. 52 SEMANAS</p>
        <h2 v-if="acao.fiftyTwoWeekHigh != '0.00' ">R$ {{ acao.fiftyTwoWeekHigh }}</h2>
        <h2 v-else>--</h2>
      </div>
      <div class="price-current">
        <p>VALORIZAÇÃO (52 SEM)</p>
        <h2 v-if="acao.fiftyTwoWeekHighChangePercent">{{ acao.fiftyTwoWeekHighChangePercent }} %</h2>
        <h2 v-else>--</h2>
      </div>
    </div>
    <div class="container-grafico">
      <div class="content">
        <h1>Atualização: (5 dias)</h1>
        <Line :data="data" :options="options" />
      </div>
    </div>
  </div>
  <div v-if="mensagemErro" class="mensagemErro">
      <h2>{{ mensagemErro }}!</h2>
  </div>
</template>

<script>
import { api } from "../services.js";
import Loading from "../components/Loading.vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  data() {
    return {
      acaoBuscada: null,
      mensagemErro: null,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Preço fechamento',
            backgroundColor: '#56adff',
            data: []
          }
        ]
      },
      options: {
        responsive: true
      }
    };
  },
  components: {
    Line,
    Loading
  },
  computed: {
    acao() {
      return this.$route.params.acao;
    },
  },
  methods: {
    fetchAcao() {
      api
        .get(`quote/${this.acao}?range=5d&interval=1d&token=${import.meta.env.VITE_API_KEY}`)
        .then((response) => {
          this.acaoBuscada = response.data.results;
          this.acaoBuscada.forEach((value) => {
            this.buscarHistorioAcoes(value.historicalDataPrice) 
            value.regularMarketPrice = value.regularMarketPrice.toFixed(2)
            value.regularMarketChangePercent = value.regularMarketChangePercent.toFixed(2)
            value.fiftyTwoWeekLow = value.fiftyTwoWeekLow.toFixed(2)
            value.fiftyTwoWeekHigh= value.fiftyTwoWeekHigh.toFixed(2)
            value.fiftyTwoWeekHighChangePercent = value.fiftyTwoWeekHighChangePercent.toFixed(2)
          });
        }).catch((error) => {
          if(error.response){
            this.mensagemErro = `Ativo ${this.acao} não foi encontrado`
          }
        });
    },
    buscarHistorioAcoes(acoes){
      this.data.labels = []
      this.data.datasets[0].data = []
      acoes.forEach((el) => {
        const data = new Date(el.date * 1000);
        const dia = data.getDate()
        const mes = data.getMonth() + 1
        const diaEMes = `${dia}/${mes}`
        this.data.labels.push(diaEMes)
        this.data.datasets[0].data.push(el.close)
      })
    },
  },
  created() {
    this.fetchAcao();
  },
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  position: relative;
}
.capa {
  background: white;
  height: 230px;
  width: 100%;
  background-image: url("../assets/imagens/grafico.png");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 70%;
  filter: grayscale(100%);
}
.name-stock {
  display: flex;
  flex-direction: row;
  padding: 60px;
}
.name-stock h2 {
  font-size: 1.3rem;
  color: rgb(167, 167, 167);
  margin: auto 0;
  margin-left: 30px;
}
.name-stock h1 {
  font-size: 1.8rem;
  margin: 0;
}
.stock-information {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  top: 60%;
  left: 0;
  width: 100%;
}
.price-current {
  background: #56adff;
  width: 220px;
  height: 130px;
  border-radius: 4px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
}
.price-current p, h2, span {
  margin: 0;
}

.container-grafico {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  margin-top: 60px;
  padding: 30px;
}
.content {
  width: 60%;
}
.content h1 {
  font-size: 1.7rem;
}
.loading {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.mensagemErro {
  display: flex;
  justify-content: center;
}
.mensagemErro h2 {
  margin-top: 20px;
}
@media screen and (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .name-stock {
    flex-direction: column;
    align-items: center;
  }
  .stock-information {
    position: static;
    flex-direction: column;
    align-items: center;
  }
  .price-current {
    width: 300px;
    margin-top: 20px;
  }
}
</style>