// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCeQk4S8MTyaVw1e8A1Eov6b_oLEIwBLjc",
    authDomain: "zmenkarija.firebaseapp.com",
    projectId: "zmenkarija",
    storageBucket: "zmenkarija.appspot.com",
    messagingSenderId: "479153250245",
    appId: "1:479153250245:web:0d36661599efa32ce8f5ac",
    measurementId: "G-ERBR97WQGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = registerForm['name'].value;
        const email = registerForm['email'].value;
        const password = registerForm['password'].value;
        const confirmPassword = registerForm['confirmPassword'].value;

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Gesli se ne ujemata. Poskusite znova.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: new Date()
            });

            console.log('User registered and added to Firestore:', user);
            // Redirect or show success message
        } catch (error) {
            console.error('Error registering:', error);
            // Show error message
        }
    });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            // Redirect or show success message
        } catch (error) {
            console.error('Error logging in:', error);
            // Show error message
        }
    });
}
