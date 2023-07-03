// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABAvqHY20oj0fRddA9IV0pwTJCij_Ulmo",
    authDomain: "socialmediapaf.firebaseapp.com",
    projectId: "socialmediapaf",
    storageBucket: "socialmediapaf.appspot.com",
    messagingSenderId: "136795794365",
    appId: "1:136795794365:web:27ee05b87c615a038a40d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;