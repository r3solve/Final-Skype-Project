// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDG7Ito5r43hysEvCaw3PkcL5DlXUra-X8",
    authDomain: "skype-clone-72908.firebaseapp.com",
    projectId: "skype-clone-72908",
    storageBucket: "skype-clone-72908.appspot.com",
    messagingSenderId: "402903961441",
    appId: "1:402903961441:web:4667c507bd18a2721cbf20",
    measurementId: "G-2K9W504GLL"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore, firebaseConfig };
