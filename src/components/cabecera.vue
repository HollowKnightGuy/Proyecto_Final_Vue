<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { ref } from 'vue';

let username=ref("");

onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    username.value=user.email;
}
});


function cerrarSesion(){
    signOut(auth).then(() => {
        username='';
        location.reload();
    }).catch((error) => {
    // An error happened.
    });
}
</script>

<template>

    <header>
        <nav>
          <router-link to="/">INICIO</router-link> 
          <router-link to="/ofimatica">Ofimática</router-link> 
          <router-link to="/programacion">Programación</router-link> 
          <router-link to="/sos">SOs</router-link> 
          <router-link v-if="username == ''" to="/login">Iniciar sesion</router-link> 
          <router-link v-if="username != ''" to="/private">Administracion</router-link> 
          <button @click="cerrarSesion" v-if="username!=''" to="/">Cerrar sesion</button>
        </nav>
      </header>
</template>

<style>

header a{
    padding: 2rem;
  }

</style>