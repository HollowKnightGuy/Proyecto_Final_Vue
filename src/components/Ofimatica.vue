<script setup>
import { useFirestore,useCollection } from 'vuefire'
import { collection} from "firebase/firestore";

import { onAuthStateChanged} from "firebase/auth";
import {ref} from "vue";
import {auth} from "../firebase.js"

let username=ref("");




onAuthStateChanged(auth, (user) => {
if (user) {
    const uid = user.uid;
    username.value=user.email;
}
});

const db = useFirestore()
const cursos = useCollection(collection(db, 'cursos'))

</script>
<template>
    <h1>Ofimática</h1>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Horas</th>
            <th>imagen</th>
            <th v-if="username!=''">Inscipción</th> 
        </tr>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria == 'ofimatica'">
                <td>{{ curso.nombre }}</td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/images/' + curso.imagen" width="50" height="50"></td>
                <td v-if="username!=''"><button>Incribirse</button></td>
            </tr>
        </tbody>
    </table>
</template>