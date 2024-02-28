<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="/">
          <img id="logo" src="../assets/imagens/logo.png.png" alt="" />
        </router-link>
      </div>
      <div class="itens">
        <a href="#">Ações</a>
        <a href="#">Fundos Imobiliários</a>
        <a href="#">BDRs</a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
    background: #053558;
}
nav {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.itens {
    margin-right: 20px;
}

.itens a {
    margin-right: 20px;
    text-decoration: none;
    color: white;
}
#logo {
  width: 327px;
  height: 144px;
}
</style>
