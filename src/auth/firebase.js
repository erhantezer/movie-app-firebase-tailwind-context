

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDw7kqgZ2lGMwSPTMJogdpnqVH6BPJMwkg",
    authDomain: "movie-app-context.firebaseapp.com",
    projectId: "movie-app-context",
    storageBucket: "movie-app-context.appspot.com",
    messagingSenderId: "866305567053",
    appId: "1:866305567053:web:678bca4b4d1c5c46902f04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


//! register
export const createUser = async (email, password, navigate, displayName) => {
    //! yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential);
        navigate("/")
        await updateProfile(auth.currentUser, {
            displayName
        })
    } catch (error) {
        console.log(error)
    }

};


//! login
export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
    }
}


//! Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { email, displayName, photoURL } = user;
            setCurrentUser({ email, displayName, photoURL })
        } else {
            alert("user empty")
        }
    });
}


//! Logout
export const logout = () => {
    signOut(auth)
}