import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCybTZdzntYfeA0ddk0K-O1MmRK8WqGNU8",
  authDomain: "vue-project-9c8bf.firebaseapp.com",
  projectId: "vue-project-9c8bf",
  storageBucket: "vue-project-9c8bf.appspot.com",
  messagingSenderId: "959693013726",
  appId: "1:959693013726:web:82412ed289a78f1564384f"
  });

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
