
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/toastify";

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
            displayName: displayName,
        })
        toastSuccessNotify("Registered successfully!");
    } catch (error) {
        console.log(error)
    }

};


//! login
export const signIn = async (email, password, navigate) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
        toastSuccessNotify("Logged in successfully!");
    } catch (error) {
        toastErrorNotify(error.message);
    }
}


//! Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const { email, displayName, photoURL } = user;
            setCurrentUser({ email, displayName, photoURL })
        } else {
            setCurrentUser(false);
            console.log("çıkış yapıldı email, displayName, photoURL boş");
        }
    });
}


//! Logout
export const logout = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!");
};



//! Google ile girişi enable yap
export const signInWithGoogle = (navigate) => {

    const provider = new GoogleAuthProvider();
//! Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
        .then((result) => {
            navigate("/");
            toastSuccessNotify("Logged in successfully!");
        }).catch((error) => {
            console.log(error);
        });
}




export const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            toastWarnNotify("Please check your mail box!");
            // alert("Please check your mail box!");
        })
        .catch((err) => {
            toastErrorNotify(err.message);
            // alert(err.message);
            // ..
        });
};