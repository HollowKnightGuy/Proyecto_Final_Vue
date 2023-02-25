<script setup>
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "../firebase.js";
    import { ref } from "vue";
    import crearCurso from "./crearCurso.vue";
    import Ofimatica from '../components/Ofimatica.vue';
    import Programacion from '../components/Programacion.vue';
    import SOs from '../components/SOs.vue';

    let username = ref("");

    // FUNCION QUE DETECTA EL CAMBIO DE SESION DE USUARIO
    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        // authenticated = true;
        username.value = user.email;
        } 
    });

</script>


<template>
    <h1>Private Zone</h1>
    <h2>Hello {{ username }}</h2>


    <!-- METEMOS TODAS LAS VISTAS DE CADA CATEGORIA -->
    <crearCurso v-if="username === 'admin@admin.es'"></crearCurso>
    <Ofimatica></Ofimatica>
    <Programacion></Programacion>
    <SOs></SOs>
</template>