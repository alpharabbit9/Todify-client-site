// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZMXkDZzxT9NrEGDXsNn6UPpaxhzDg7EM",
  authDomain: "todify-d9abf.firebaseapp.com",
  projectId: "todify-d9abf",
  storageBucket: "todify-d9abf.firebasestorage.app",
  messagingSenderId: "511345523746",
  appId: "1:511345523746:web:5a084d618a02116dad9e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

