<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { ref } from 'vue';

let username=ref("");

// FUNCION QUE DETECTA EL CAMBIO DE SESION DE USUARIO
onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    username.value=user.email;
}
});


function cerrarSesion(){
    signOut(auth).then(() => {
        username='';
        location.reload()
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
@import '../assets/base.css';
header a{
    padding: 2rem;
  }

button{
    margin: 1rem;
    padding: 1rem;
    border: 0;
    border-radius: 1px;
    background-color: rgba(84, 84, 84, 0.65);
    color: hsla(160, 100%, 37%, 1);
    transition: color 0.5s, background-color 0.5s;

}button:hover{
    color: black;
    font-weight: 400;
    background-color: hsla(160, 100%, 37%, 1);
    transition: color 0.5s, background-color 0.5s;
}

</style>