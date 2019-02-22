import Firebase from 'firebase';
// var firebase = require("firebase/app");
// require("firebase/database");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCcY_PpY_1GlTurFOKL2rJCEBXuu3zq1UA",
	authDomain: "the-weekendr.firebaseapp.com",
	databaseURL: "https://the-weekendr.firebaseio.com",
	projectId: "the-weekendr",
	storageBucket: "the-weekendr.appspot.com",
	messagingSenderId: "94461914209"
};
var app = Firebase.initializeApp(config);

export const db = app.database();
export const userRef = db.ref('users');
export const storageRef = app.storage().ref();