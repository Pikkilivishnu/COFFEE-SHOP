import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


try {
    
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("login-error");
    const loginBtn = document.getElementById("login-btn");
    const loading = document.getElementById("loading");

    errorMsg.textContent = "";
    errorMsg.style.display = "none";

    loginBtn.disabled = true;
    loading.style.display = "block";

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in:", user);

        // Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            console.log("User Data:", userDoc.data());
        } else {
            console.log("No user data found!");
        }

        // Redirect to Home Page
        window.location.href = "index.html";
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
        errorMsg.style.color = "red";
    } finally {
        loginBtn.disabled = false;
        loading.style.display = "none";
    }
});

} catch (error) {
    
}