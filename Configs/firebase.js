// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyD0v0IO72dskh0IUSWhaMtFz4dZ4qSBxqs",
  authDomain: "cloudchat-eb6a9.firebaseapp.com",
  projectId: "cloudchat-eb6a9",
  storageBucket: "cloudchat-eb6a9.appspot.com",
  messagingSenderId: "585652609238",
  appId: "1:585652609238:web:627a36abaf02719296e977",
  measurementId: "G-L7J5E537MX"

};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore, firebaseConfig };
