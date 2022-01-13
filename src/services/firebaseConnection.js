import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyD7hY5HsB7fbdOrHPBnCWWBUVP3JRHf3K4",
  authDomain: "system-order-311b7.firebaseapp.com",
  projectId: "system-order-311b7",
  storageBucket: "system-order-311b7.appspot.com",
  messagingSenderId: "13606211439",
  appId: "1:13606211439:web:a21444ad88925a45ab229a",
  measurementId: "G-PR2HF8VW0Q"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}


export default firebase;