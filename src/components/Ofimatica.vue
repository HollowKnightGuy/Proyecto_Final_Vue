<script setup>
import { useFirestore,useCollection } from 'vuefire'
import { collection, doc, deleteDoc} from "firebase/firestore";

import {onAuthStateChanged} from "firebase/auth";
import {ref} from "vue";
import {auth} from "../firebase.js"


const db = useFirestore();
const cursos = useCollection(collection(db, 'cursos'));

let username=ref("");


onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    username.value=user.email;
}
});

function borrarCurso(id){
    deleteDoc(doc(db, 'cursos', id));
}

</script>
<template>
    <h1>Ofimática</h1>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Horas</th>
            <th>imagen</th>
            <th v-if="username ==='admin@admin.es'">Inscipción</th> 
            <th v-if="username ==='admin@admin.es'">Administrar</th> 
        </tr>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria == 'ofimatica'">
                <td>
                    <RouterLink v-bind:to="'/detallar/' + curso.id">{{ curso.nombre }}</RouterLink>
                </td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/images/' + curso.imagen" width="50" height="50"></td>
                <td v-if="username  ===   'admin@admin.es'"><button>Incribirse</button></td>
                <td v-if="username  ===   'admin@admin.es'"><button @click='borrarCurso(curso.id)'>Eliminar</button></td>
            </tr>
        </tbody>
    </table>
</template>