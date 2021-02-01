import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCf5n48swRK4qjO1NlShR0P-7krTarrzAo",
    authDomain: "my-hotel-18d69.firebaseapp.com",
    databaseURL: "https://my-hotel-18d69.firebaseio.com",
    projectId: "my-hotel-18d69",
    storageBucket: "my-hotel-18d69.appspot.com",
    messagingSenderId: "862653243198",
    appId: "1:862653243198:web:602b3fcb4c0f19a155566f"
  };
  
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();

 