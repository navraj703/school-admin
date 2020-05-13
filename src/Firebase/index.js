import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCV74F0meaanwEYevLrEusuX6OBHQkYW84",
    authDomain: "web-addmission.firebaseapp.com",
    databaseURL: "https://web-addmission.firebaseio.com",
    projectId: "web-addmission",
    storageBucket: "web-addmission.appspot.com",
    messagingSenderId: "785421443350",
    appId: "1:785421443350:web:6df57db01779b7e0503037",
    measurementId: "G-CTHRX84Q1T"
};
 
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth() ;
const user = firebase.auth().currentUser
export  { db , auth , user } ;
