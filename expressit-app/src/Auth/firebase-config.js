// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKrO6atDQVIj-yJwYuu0HTSTzkwTz5ID0",
  authDomain: "expressit-34d36.firebaseapp.com",
  projectId: "expressit-34d36",
  storageBucket: "expressit-34d36.appspot.com",
  messagingSenderId: "30014289396",
  appId: "1:30014289396:web:b65a6fcd3652794247b5a1",
  measurementId: "G-4NDEK6BZG9"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const storage = getStorage(firebaseApp);