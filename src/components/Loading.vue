<template>
  <div class="rotate-imagem">
    <img src="../assets/imagens/moeda.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style>
  @keyframes rotateAnimation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  .rotate-imagem img {
    width: 70px;
    transition: transform 0.5s ease-in-out;
    animation: rotateAnimation 2s linear infinite;
  }
</style>