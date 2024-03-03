<template>
  <div class="container-input">
    <div class="input-group mb-3">
      <input type="text" class="form-control" 
      placeholder="Digite a ação Desejada" 
      aria-label="Recipient's username" 
      aria-describedby="button-addon2"
      v-model="acao"
      />
      <button type="button" class="btn btn-secondary" @click="buscarAcao">Buscar</button>
    </div>
  </div>
  <div class="stockVariations">
    <div class="ButtonsStockVariations">
      <div class="title-home">
        <h2>Explore o mercado</h2>
      </div>
      <div class="buttons">
        <span>Ordenar:</span>
          <button @click="variationActivated = 'ActionsHigh'">Em Alta</button>
          <button @click="variationActivated = 'ActionsLow'">Em Baixa</button>
      </div>
    </div>
    <keep-alive>
      <component :is="variationActivated"></component>
    </keep-alive>
  </div>
</template>

<script>
import ActionsLow from '../components/ActionsLow.vue'
import ActionsHigh from '../components/ActionsHigh.vue'
import { markRaw } from 'vue';
export default {
  data() {
    return {
      acao: null,
      variationActivated: markRaw(ActionsHigh),
    };
  },
  methods: {
    buscarAcao () {
      if(this.acao){
        this.$router.push({name: 'acao', params: {acao: this.acao}})
      }
    }
  },
  components: {
    ActionsLow,
    ActionsHigh
  }
};
</script>

<style scoped>
  .container-input {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    width: 100%;
  }
  .input-group {
    width: 50%;
  }
  .stockVariations{
    margin: auto;
    max-width: 1400px;
  }
  .title-home h2 {
    font-size: 1.7rem;
  }
  .ButtonsStockVariations {
    display: flex;
    justify-content: space-between;
    margin: 50px 50px;
  }
  .ButtonsStockVariations span{
    margin: auto 0;
    color: rgb(116, 115, 115);
  }
  .ButtonsStockVariations button {
    padding: 6px;
    width: 110px;
    background: #56adff;
    border: none;
    color: white;
    margin-left: 10px;
    border-radius: 20px;
  }
  .ButtonsStockVariations button:hover {
    background: #2e5c86;
  }
  @media screen and (max-width: 768px) {
    .container-input {
      margin-top: 50px;
    }
    .input-group {
      width: 70%;
    }
    .ButtonsStockVariations {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .buttons {
      margin-top: 20px;
    }
  }
</style>