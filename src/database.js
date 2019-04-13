/*eslint-disable*/
import Firebase from 'firebase';

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
export const usersRef = db.ref('users');
export const eventsRef = db.ref('events');
export const storageRef = app.storage().ref(); 
export const authRef = app.auth();