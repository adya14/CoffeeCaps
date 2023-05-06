// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwS3EU9-lNpTCBrPSP0psKvVW987H-yrs",
  authDomain: "community-portal-mern.firebaseapp.com",
  projectId: "community-portal-mern",
  storageBucket: "community-portal-mern.appspot.com",
  messagingSenderId: "529163848385",
  appId: "1:529163848385:web:b7264e39f8a9e335d6e240",
  measurementId: "G-B0YH6CTC4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

//const analytics = getAnalytics(app);