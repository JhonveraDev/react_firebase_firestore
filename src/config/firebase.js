import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyA4vxcMoH08Rwaq1UtepHun3rCzud_dy64",
    authDomain: "fb-crud-react-cfd20.firebaseapp.com",
    projectId: "fb-crud-react-cfd20",
    storageBucket: "fb-crud-react-cfd20.appspot.com",
    messagingSenderId: "362763809180",
    appId: "1:362763809180:web:da9b0b6821a6a587d41859"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  
export const db = fb.firestore();

