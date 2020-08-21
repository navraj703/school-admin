import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "#######################",
    authDomain: "####################",
    databaseURL: "###################",
    projectId: "#################",
    storageBucket: "##################",
    messagingSenderId: "##################",
    appId: "###################",
    measurementId: "#####################"
};
 
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth() ;
const user = firebase.auth().currentUser
export  { db , auth , user } ;
