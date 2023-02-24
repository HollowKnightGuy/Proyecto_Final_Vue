<script setup>
    import { ref } from "vue";
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from "../firebase.js";
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

    let username = ref(""), password=ref("");
    const provider = new GoogleAuthProvider();

    function registration(){
    createUserWithEmailAndPassword(auth, username.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
    });

    }

</script>

<template>
    
    <button @click="registration">Register</button>

</template>