import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyA6nlMZKItEToLyFaZy8d4tSVNSY8M7Hs0",
    authDomain: "music-react-app.firebaseapp.com",
    databaseURL: "https://music-react-app.firebaseio.com",
    projectId: "music-react-app",
    storageBucket: "music-react-app.appspot.com",
    messagingSenderId: "193579057411",
    appId: "1:193579057411:web:99ca0a134b4cc5f2126936",
    measurementId: "G-8FKMV0YGVZ"
  };

//const firebaseApp = firebase.initializeApp(config);
firebase.initializeApp(config);

const db = firebase.firestore();
//const auth = firebase.auth();

export default db
