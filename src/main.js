import { createApp } from 'vue';
import App from './App.vue';

import Inicio from "@/components/Inicio.vue";
import Programacion from "@/components/Programacion.vue";
import Ofimatica from "@/components/Ofimatica.vue";
import SOs from "@/components/SOs.vue";
import Login from "@/components/Login.vue";
import Private from "@/components/Private.vue";
import detallesCursos from "@/components/detallesCursos.vue";

import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

import './assets/main.css';

let authenticated = false;


// DECLARAMOS LAS RUTAS DE NUESTRA APLICACION
const routes = [
{
    path: '/', 
    component: Inicio
},
{
    path: '/programacion',
    component: Programacion
},
{
    path: '/ofimatica',
    component: Ofimatica
},
{
    path: '/sos',
    component: SOs
},
{
    path:'/login',
    component: Login
},
{
    path:'/detallar/:id',
    component: detallesCursos
},
{
    path: '/private',
    component:Private,
    // COMPROBAMOS ANTES DE ENTRAR SI ESTAMOS AUTENTICADOS
    beforeEnter: (to, from) => {
        // reject the navigation
        return authenticated;
      },
}
];

// NOS CREAMOS EL ROUTER PARA REDIRECCIONAR
export const router = createRouter({
    history: createWebHistory(),
    routes
});


// FUNCION QUE DETECTA EL CAMBIO DE SESION DE USUARIO
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;
      authenticated = true;
    } else {
      authenticated = false;
      router.push("/");
    }
});

// INICIALIZAMOS NUESTRA APLICACION
var app = createApp(App);
app.use(router);
app.mount('#app');
