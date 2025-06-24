// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaYCe1g5iWiblSaLE-ZIdEGrNkH4HjQ_o",
  authDomain: "eventconnect-be55e.firebaseapp.com",
  projectId: "eventconnect-be55e",
  storageBucket: "eventconnect-be55e.firebasestorage.app",
  messagingSenderId: "61851822321",
  appId: "1:61851822321:web:a8715548097404f76a2150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);