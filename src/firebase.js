import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBnukttrzxFIRWZKyw82kRJOQeAFUtOikw",
    authDomain: "tkmelati-935bd.firebaseapp.com",
    projectId: "tkmelati-935bd",
    storageBucket: "tkmelati-935bd.firebasestorage.app",
    messagingSenderId: "989409692636",
    appId: "1:989409692636:web:4b698a0e14e1cc2cd85d19",
    measurementId: "G-7PD8E8BX7N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
