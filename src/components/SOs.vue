<script setup>
    import { useCollection } from 'vuefire';
    import { collection, doc, deleteDoc} from "firebase/firestore";
    import { onAuthStateChanged} from "firebase/auth";
    import {ref} from "vue";
    import {auth, db} from "../firebase.js";

    let username=ref("");

    const cursos = useCollection(collection(db, 'cursos'));

    // FUNCION QUE DETECTA EL CAMBIO DE SESION DE USUARIO
    onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        username.value=user.email;
    }
    });


    // BORRA UN CURSO A PARTIR DE UN ID DE UN CURSO
    function borrarCurso(id){
        deleteDoc(doc(db, 'cursos', id));
    }

</script>


<template>
    <h1>SOs</h1>

    <table>
        <tr>
            <th>Nombre</th>
            <th>Horas</th>
            <th>imagen</th>
            <!-- CADA VEZ QUE HAGAMOS ESTE IF, COMPRUEBA SI SOMOS ADMIN -->
            <th v-if="username !=''">Inscipción</th> 
            <th v-if="username ==='admin@admin.es'">Administrar</th> 
        </tr>
        <tbody v-for="curso in cursos" :key="curso.nombre">
            <tr v-if="curso.categoria == 'SOs'">
                <td>
                    <RouterLink v-bind:to="'/detallar/' + curso.id">{{ curso.nombre }}</RouterLink>
                </td>
                <td>{{ curso.horas }}</td>
                <td><img v-bind:src="'/src/images/'+curso.imagen" width="50" height="50"></td>
                <td v-if="username !=''"><button>Incribirse</button></td>
                <td v-if="username ==='admin@admin.es'"><button @click='borrarCurso(curso.id)'>Eliminar</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style>

</style>