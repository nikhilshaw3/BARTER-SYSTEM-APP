import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCpqpsysKq04mMQ-am3218VGxM1LQgkOjo",
  authDomain: "barter-a1b40.firebaseapp.com",
  projectId: "barter-a1b40",
  storageBucket: "barter-a1b40.appspot.com",
  messagingSenderId: "773294285289",
  appId: "1:773294285289:web:092d0aa3cddf2268e2ab78",
  measurementId: "G-Q6BJ4QBRW2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
