import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQJToq0lbciyZmHrs1csZDFPosL8mc5MI",
    authDomain: "coffee-shop-app-1b7b7.firebaseapp.com",
    databaseURL: "https://coffee-shop-app-1b7b7-default-rtdb.firebaseio.com",
    projectId: "coffee-shop-app-1b7b7",
    storageBucket: "coffee-shop-app-1b7b7.appspot.com",
    messagingSenderId: "581037622584",
    appId: "1:581037622584:web:56a359ce9473a4b6c6edcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Set session persistence to LOCAL (Keeps user signed in after page refresh)
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("✅ Session persistence set to LOCAL");
    })
    .catch((error) => {
        console.error("❌ Error setting persistence:", error);
    });

export { auth, signInWithEmailAndPassword, db, ref, set, get, child, update, remove };
