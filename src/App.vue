<script setup>
import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
    } 
});
</script>

<template>
    <header>
      <nav>
        <router-link to="/">INICIO</router-link> |
        <router-link to="/ofimatica">Ofimática</router-link> |
        <router-link to="/programacion">Programación</router-link> |
        <router-link to="/sos">SOs</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link v-if="username != ''" to="/private">Administracion</router-link>
      </nav>
    </header>

  <main>
    <router-view></router-view>
  </main>

  <footer>
    &copy; Pablo Ortiz Gervilla
    <p>
        <a href="#">Politica de privacidad</a>
    </p>
    <p>
      <span>Correo: </span><a href="mailto:pablogervilla123@gmail.com">pablogervilla123@gmail.com</a><br>
    </p>
    <p>
      <span>Telefono: +34 132456798</span>
    </p>
</footer>

</template>

<style scoped>
  header{
    width: 100vw;
    margin: 2rem;
  }

  main{
    margin: 5rem;
  }
  
</style>
