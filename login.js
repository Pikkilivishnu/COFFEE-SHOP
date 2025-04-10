import { auth, signInWithEmailAndPassword } from "./firebase.js";
try {

  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");
    const loadingIndicator = document.getElementById("loading");

   try {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      loginError.textContent = "";
      loadingIndicator.style.display = "block";

      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ User logged in:", userCredential.user);

        loadingIndicator.style.display = "none";
        window.location.href = "index.html"; // Redirect after login
      } catch (error) {
        console.error("❌ Login failed:", error);
        loginError.textContent = error.message;
        loadingIndicator.style.display = "none";
      }
    });
   } catch (error) {
    
   }
  });
} catch (error) {

}
