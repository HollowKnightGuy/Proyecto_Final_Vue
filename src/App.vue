<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { ref } from 'vue';
import { signOut } from "firebase/auth";

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
        <router-link v-if="username == ''" to="/registro">Registro</router-link> 
        <button @click="cerrarSesion" v-if="username!=''" to="/">Cerrar sesion</button>
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
