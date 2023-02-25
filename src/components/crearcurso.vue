<script setup>
  
    import { useFirestore,useCollection } from 'vuefire'
    import { collection,addDoc} from "firebase/firestore"; 
    import { getStorage, ref as refStrg, uploadBytes } from "firebase/storage";
    import { ref } from "vue";
    import { router } from "../main.js";

    const db = useFirestore()

    let file = ref ("");

    function uploadFile(){

        const storage = getStorage();
        const storageRef = refStrg(storage, file.value.files[0].name);
        uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
            console.log('Archivo subido');
        });
        
    }
    
    function nuevoCurso(){

        let categoria = document.getElementById("categoria").value;
        let nombre = document.getElementById("nombre").value;
        let horas = document.getElementById("horas").value;
        console.log(horas);
        let imagen = file.value.files[0].name;

        const docRef = addDoc(collection(db, "cursos"), {
            categoria: categoria,
            nombre: nombre,
            horas: horas,
            imagen: imagen
        });

        router.push('/'+categoria);

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
        <input type="number" min="20" max="999" name="horas" id="horas" require/><br><br>

        <label>Imagen: </label>
        <input type="file" name="file" id="file" ref="file" @change="uploadFile" require>
        <br><br>

        <button @click="nuevoCurso">Crear Curso</button>

    </fieldset>


</template>