// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tmrs-e584a.firebaseapp.com",
  projectId: "tmrs-e584a",
  storageBucket: "tmrs-e584a.appspot.com",
  messagingSenderId: "234330341729",
  appId: "1:234330341729:web:7a1868ad98626216eb8520"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);