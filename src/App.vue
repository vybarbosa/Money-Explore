<template>
  <div id="app">
    <TheHeader />
    <main id="main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import TheHeader from './components/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
body {
  background: #cecdcd;
  font-family: "Almarai", Helvetica, sans-serif;
}
</style>
