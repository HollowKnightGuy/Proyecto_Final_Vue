<script setup>
import pie from './components/pie.vue';
import cabecera from './components/cabecera.vue';

import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  // Aquí obtén los datos
  // Cuando se hayan obtenido, establece loading en false después de 2 segundos
  setTimeout(() => {
    loading.value = false
  }, 2000)
})



</script>

<template>
   
  <cabecera></cabecera>

  <main>
    <div v-if="loading" class="contenedor-loader">
      <div class="loader"></div>
    </div>
    <div v-else="loading">
      <router-view></router-view>
    </div>
  </main>

  <pie></pie>

</template>

<style scoped>
  header{
    width: 100vw;
    margin: 2rem;
  }

 

  main{
    margin: 5rem;
  }


  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

img{
    width: 100%;
}
*, *::before, *::after{
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

img{
  width: 100%;
}

.contenedor_loader{
  background-color: #f3f3f3;
  margin: auto;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  transition: all 1.5s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader,
.loader::after,
.loader:before{
  margin: auto ;
  border-radius: 50%;
}

.loader{
  color: hsla(160, 100%, 37%, 1);
  font-size: 11px;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
}

.loader::after,
.loader::before{
  content: '';
  position: absolute;
}

.loader::before{
  width: 5.2em;
  height: 10.2em;
  background-color: #181818;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  transform-origin: 5.1em 5.1em;
  animation: girar 1.1s infinite ease-in-out;
  animation-delay: .8s;
}

.loader::after{
  width: 5.2em;
  height: 10.2em;
  background-color:#181818;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 5em;
  transform-origin: 0.1em 5.1em;
  animation: girar 1.1s infinite ease-in-out;
}

@keyframes girar{
  0%{
      transform: rotate(0deg);
  }
  100%{
      transform: rotate(360deg);
  }
}
  
</style>
