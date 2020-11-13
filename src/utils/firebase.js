import firebase from "firebase/app"


const firebaseConfig = {
    apiKey: "AIzaSyDY7cl5KWyNqrNmDw8P9IjjelJeJfJZXTg",
    authDomain: "cumplefirebase.firebaseapp.com",
    databaseURL: "https://cumplefirebase.firebaseio.com",
    projectId: "cumplefirebase",
    storageBucket: "cumplefirebase.appspot.com",
    messagingSenderId: "85732788503",
    appId: "1:85732788503:web:2f46a50cc456fcd649cf52"
  };

  export default firebase.initializeApp(firebaseConfig);