
//Module for firebase integration
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";
//import "firebase/compat/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBQQmJqvdpmHHHE2H7DwZv-IsTRsgudLWs", //this is test key you will get this key from firebase.
  authDomain: "finalnkproject.firebaseapp.com",
  databaseURL: "https://finalnkproject-default-rtdb.firebaseio.com",
  projectId: "finalnkproject",
  storageBucket: "finalnkproject.appspot.com",
  messagingSenderId: "37388285674",
  appId: "1:37388285674:web:a9d20d51a40de83f390993"
}

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};