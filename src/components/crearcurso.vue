<script setup>
  
    import { collection,addDoc} from "firebase/firestore"; 
    import { getStorage, ref as refStrg, uploadBytes } from "firebase/storage";
    import { ref } from "vue";
    import { db } from '../firebase.js';
    import { router } from "../main.js";


    let file = ref ("");

    // SE ENCARGA DE SUBIR UN ARCHIVO AL STORAGE DEL FIREBASE
    function uploadFile(){

        const storage = getStorage();
        const storageRef = refStrg(storage, file.value.files[0].name);
        uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
            console.log('Archivo subido');
        });
    }
    
    // CREA UN NUEVO CURSO A PARTIR DE LOS DATOS DEL FORMULARIO
    function crearNuevoCurso(){

        let categoria = document.getElementById("categoria").value;
        let nombre = document.getElementById("nombre").value;
        let horas = document.getElementById("horas").value;
        console.log(horas);
        let imagen = file.value.files[0].name;

        // AÑADIMOS EL DOCUMENTO A LA COLECCION
        const docRef = addDoc(collection(db, "cursos"), {
            categoria: categoria,
            nombre: nombre,
            horas: horas,
            imagen: imagen
        });
        router.push('/' + categoria);
    }

    defineProps({
        categoria: String,
        nombre: String,
        horas: String,
        imagen: String
    })

</script>

<template>
    <fieldset>
        <h3>Nueva Curso: </h3><br>
        <label>Categoria: </label>
        <select name="categoria" id="categoria">
            <option value="programacion">Programación</option>
            <option value="SOs">Sistemas Operativos</option>
            <option value="ofimatica">Ofimatica</option>
        </select>
        <br><br>

        <label>Nombre: </label>
        <input type="text" name="nombre" id="nombre" require/><br><br>

        <label>Horas: </label>
        <input type="number" min="20" max="500" name="horas" id="horas" require/><br><br>

        <label>Imagen: </label>
        <input type="file" name="file" id="file" ref="file" require @change="uploadFile" >
        <br><br>

        <button @click="crearNuevoCurso">Crear Curso</button>
    </fieldset>
</template>