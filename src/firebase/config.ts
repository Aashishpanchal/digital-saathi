// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANrhgh2TFneZStnp99wA2xKHOJU_RkrIY",
  authDomain: "digital-saathi-3b98b.firebaseapp.com",
  projectId: "digital-saathi-3b98b",
  storageBucket: "digital-saathi-3b98b.appspot.com",
  messagingSenderId: "105855045078",
  appId: "1:105855045078:web:2f1104a14debec4408a877",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
