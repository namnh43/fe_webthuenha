// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaHWMhN5v6RrhZuxYadMckgXH6S2cuclU",
    authDomain: "module6-case.firebaseapp.com",
    projectId: "module6-case",
    storageBucket: "module6-case.appspot.com",
    messagingSenderId: "1091328344110",
    appId: "1:1091328344110:web:08c2d8b6857fcdf3b85fbf",
    measurementId: "G-0RN4F8NE4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(initializeApp(firebaseConfig));