import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApWc_MKIUWsTDp9MmR0wyXeWMRepQIUbA",
  authDomain: "prueba-twitch.firebaseapp.com",
  projectId: "prueba-twitch",
  storageBucket: "prueba-twitch.appspot.com",
  messagingSenderId: "524296765038",
  appId: "1:524296765038:web:fd327f69dc631be600307f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}