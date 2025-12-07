import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyBGLvtMQpX76O3H8Z0PkJWeUuDCp2KwfM0',
    authDomain: 'tkmelati-1d8b6.firebaseapp.com',
    projectId: 'tkmelati-1d8b6',
    storageBucket: 'tkmelati-1d8b6.appspot.com',
    messagingSenderId: '566254071698',
    appId: '1:566254071698:web:fe2cd1714caf53e8f45b4b',
    measurementId: 'G-RZ7GP4BZF4'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
