<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { router } from "../main.js";

let username = ref(""),
password = ref("");
const provider = new GoogleAuthProvider();

// LLEVA A CABO EL PROCESO DEL REGISTRO
function registration() {
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


// LLEVA A CABO EL PROCESO DEL LOGIN
function login() {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push("/private");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}


// LLEVA A CABO EL PROCESO DEL LOGIN CON GOOGLE
function loginGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      router.push("/private");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
</script>

<template>
  <label>Username: </label> <input type="text" v-model="username" /><br />
  <label>Password: </label> <input type="password" v-model="password" /><br />
  <button @click="registration">Register</button>
  <button @click="login">Login</button>
  <button @click="loginGoogle">Login Google</button>
</template>
