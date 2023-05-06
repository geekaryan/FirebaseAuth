// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//getting authentication
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeu2nTxEjypxArquz2cA5Occ4lJTFpkmw",
  authDomain: "fir-auth-fdffa.firebaseapp.com",
  projectId: "fir-auth-fdffa",
  storageBucket: "fir-auth-fdffa.appspot.com",
  messagingSenderId: "442625561035",
  appId: "1:442625561035:web:081499d38e16e87542a64e",
  measurementId: "G-JLWGCZHP9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
