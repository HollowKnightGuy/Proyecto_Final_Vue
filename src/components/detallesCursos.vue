<script setup>
import { useFirestore,useCollection } from 'vuefire';
import { collection} from "firebase/firestore";
import { jsPDF } from "jspdf";
const db = useFirestore();
const cursos = useCollection(collection(db, 'cursos'));

function genPdf(nombre, horas, img){
    let doc = new jsPDF();
    let logo = new Image();
    let descripcion = 'Descripcion: Lorem ipsum dolor sit amet ';
    logo.src = '../src/images/' + img;
    doc.text(20, 20, 'Nombre del curso: ' + nombre);
    doc.text(20, 40, 'Numero de horas del curso: ' + horas);
    doc.addImage(logo, 'png', 20, 50, 70, 70);
    doc.text(20, 140, descripcion);
    doc.save('Curso_' + nombre + '.pdf');
}

</script>

<template>
    
    
    <div v-for="curso in cursos" :key="curso.nombre">
        <h1 v-if="curso.id == $route.params.id">{{ curso.nombre }}</h1>
            <p v-if="curso.id == $route.params.id">
                <span>Nombre del curso: {{ curso.nombre }}</span><br><br>
                <span>Horas del curso: {{ curso.horas }}</span><br><br>
                <span><img v-bind:src="'/src/images/' + curso.imagen" width="50" height="50"></span><br><br>
                <span>Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt at et quia inventore, ipsa saepe officia nulla minus doloremque corporis neque error minima illo laborum eveniet numquam voluptatum ex a.</span><br><br>
                <span v-if="username!=''"><button>Incribirse</button></span>
                <span><router-link v-bind:to="'/' + curso.categoria">Volver</router-link></span>
                <span><button @click="genPdf(curso.nombre, curso.horas, curso.imagen)">Generar Pdf</button></span>
            </p>
        </div>


</template>