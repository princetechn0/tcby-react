// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCobjgcNhr5xPLjzGh2cyIFEa2kJtekFiw",
  authDomain: "tcby-login.firebaseapp.com",
  projectId: "tcby-login",
  storageBucket: "tcby-login.appspot.com",
  messagingSenderId: "602909955861",
  appId: "1:602909955861:web:968f74ecbc9a612ccdbb1c",
  measurementId: "G-LTCXWW622T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
